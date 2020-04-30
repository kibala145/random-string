<template>
  <div id="app">
    <h1>Random string app</h1>
    <p v-if="loading">
      loading
    </p>
    <p v-else>
      <!-- {{strings}} -->
    </p>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      loading: state => state.loading,
      strings: state => state.strings
    })
  },
  components: {
    // HelloWorld
  },
  methods: {
    ...mapActions(['initApp'])
  },
  mounted() {
    this.initApp()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p {
  animation-name: loading;
  animation-duration: 2s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes loading {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2);
  }
}
</style>
