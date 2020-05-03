<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 style="text-align: center;">Search strings application</h1>
      </el-header>
      <el-main v-loading.fullscreen.body.lock="isDatabaseClearing || isDatabaseLoading || isSearching">
        <el-col
          :xs="{span: 20, offset: 2}" 
          :md="{span: 12, offset: 6}"
        >
          <transition name="el-zoom-in-center" mode="out-in">
            <el-row v-if="!loading" type="flex" justify="center">
              <transition name="el-zoom-in-top" mode="out-in">
                <el-form
                  ref="searchForm"
                  v-if="!isDatabaseEmpty"
                  :model="searchForm"
                  :rules="searchFormRules"
                  @submit.native.prevent
                  :inline="true"
                  :disabled="loading"  
                >
                  <el-form-item>
                    <el-input
                      type="text"
                      placeholder="Search"
                      v-model.trim="searchForm.searchInput"
                      :maxlength="stringLength"
                      show-word-limit
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary" 
                      icon="el-icon-search"
                      @click="onSearchButtonClick"
                      :disabled="!searchForm.searchInput"
                    >
                      Search
                    </el-button>
                  </el-form-item>
                  <el-form-item style="margin-right: 0;">
                    <el-button
                      key="clear-button" 
                      type="danger"
                      @click="onClearButtonClick"
                      plain
                    >
                      Clear storage
                    </el-button>
                  </el-form-item>
                </el-form>
                <el-button
                  v-else
                  key="generate-button"
                  type="primary"
                  @click="onGenerateButtonClick"
                  plain
                >
                  Generate data
                </el-button>
              </transition>
            </el-row>
          </transition>
          <transition name="el-zoom-in-center" mode="out-in">
            <!-- <el-progress v-if="isGenerating" type="circle" :percentage="loadingPercentage" :status="status" :stroke-width="12"></el-progress> -->
            <el-row 
              v-if="searchCount !== null && !loading"
              type="flex" 
              justify="center"
            >
              <div class="search-result">
                <p><i class="el-icon-search"></i> Found <b>{{searchCount}} strings</b> starting with <b>"{{searchString}}"</b> (execution time {{'~' + Math.round(lastSearchDuration/1000) + 's'}})</p>
              </div>
            </el-row>
          </transition>
          <transition name="el-zoom-in-top">
            <el-row v-if="loading" type="flex" justify="center">
              <transition name="el-zoom-in-top" mode="out-in">
                <el-progress v-if="isGenerating" type="circle" :percentage="loadingPercentage" :status="status" :stroke-width="12"></el-progress>
              </transition>
            </el-row>
          </transition>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {mapActions, mapState, mapGetters} from 'vuex'
import {total, stringLength} from './utils/index'

export default {
  name: 'App',
  data() {
    return {
      stringLength: stringLength,
      searchFormRules: {

      },
      searchForm: {
        searchInput: ''
      }
    }
  },
  computed: {
    ...mapState({
      isGenerating: state => state.isGenerating,
      generatingCount: state => state.generatingCount,
      isSearching: state => state.isSearching,
      searchCount: state => state.searchCount,
      searchString: state => state.searchString,
      isDatabaseEmpty: state => state.isDatabaseEmpty,
      isDatabaseLoading: state => state.isDatabaseLoading,
      isDatabaseClearing: state => state.isDatabaseClearing,
      lastSearchDuration: state => state.lastSearchDuration,
      error: state => state.error
    }),
    ...mapGetters(['loading']),
    loadingPercentage() {
      const result = Math.round((this.generatingCount/total)*100)

      return result
    },
    status() {
      if(this.generatingCount === total) return 'success'
      else if(this.error) return 'exception'
      else return null
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    ...mapActions([
      'initApp', 
      'generateStrings', 
      'getStringsCount',
      'clearStorage'  
    ]),
    onClearButtonClick() {
      this.$confirm('This will clear the storage. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => this.clearStorage())
    },
    onGenerateButtonClick() {
      this.$confirm('This will generate 10**7 random strings with length 100 to your storage. This can take some time. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => this.generateStrings())
    },
    onSearchButtonClick() {
      this.getStringsCount({value: this.searchForm.searchInput, searchByValue: false})
    }
  },
  beforeMount() {
    this.initApp()
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html {
  min-height: 100%;
}
.search-result {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 8px 16px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
}
</style>
