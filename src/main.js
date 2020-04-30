import Vue from 'vue'
import App from './App.vue'
import store from './store'
// Dev only
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// Styles
import './assets/scss/index.scss'

Vue.config.productionTip = false

const requireComponent = require.context(
  // The relative path of the components folder
  './components/base',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /\.(vue)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .splice(-2, 1)
        // .replace(/\.\w+$/, '')
    )
  )


  // Register component globally
  Vue.component(
    componentConfig.default.name || componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

/*loading svg icons*/
const svgs = require.context('!svg-sprite-loader!./assets/icons', false, /.*\.svg$/);
svgs.keys().forEach(svgs);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
