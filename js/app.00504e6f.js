(function(t){function e(e){for(var r,o,s=e[0],c=e[1],u=e[2],g=0,f=[];g<s.length;g++)o=s[g],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/random-string/";var s=this["webpackJsonp"]=this["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},4360:function(t,e,n){"use strict";(function(t){var r=n("ed16"),a=n("b2aa"),i=new Worker(t);r["default"].use(a["a"]);var o=new a["a"].Store({state:{isGenerating:!1,generatingCount:null,isSearching:!1,searchCount:null,searchString:null,isDatabaseLoading:!1,isDatabaseEmpty:!1,isDatabaseClearing:!1,lastSearchDuration:null,error:null},getters:{loading:function(t){return t.isGenerating||t.isSearching||t.isDatabaseLoading}},mutations:{SET_IS_GENERATING:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.isGenerating=e},SET_GENERATING_COUNT:function(t,e){t.generatingCount=e},SET_IS_SEARCHING:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.isSearching=e},SET_SEARCH_COUNT:function(t,e){t.searchCount=e},SET_SEARCH_STRING:function(t,e){t.searchString=e},SET_IS_DATABASE_LOADING:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.isDatabaseLoading=e},SET_IS_DATABASE_EMPTY:function(t,e){t.isDatabaseEmpty=e},SET_IS_DATABASE_CLEARING:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.isDatabaseClearing=e},SET_LAST_SEARCH_DURATION:function(t,e){t.lastSearchDuration=e},SET_ERROR:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.error=e}},actions:{initApp:function(){i.postMessage({type:"getObjectStore"})},generateStrings:function(){i.postMessage({type:"makeRandomStrings"})},getStringsCount:function(t,e){var n=t.commit,r=e.value,a=void 0===r?null:r,o=e.searchByValue,s=void 0===o||o;n("SET_SEARCH_STRING",a),i.postMessage({type:"getRandomStringsCount",payload:{value:a,searchByValue:s}})},clearStorage:function(){i.postMessage({type:"clearStorage"})}},modules:{}});i.onmessage=function(t){o.commit(t.data.type,t.data.payload)},e["a"]=o}).call(this,n("70c1"))},"56d7":function(t,e,n){"use strict";n.r(e);n("5db0"),n("949c"),n("1759"),n("bfff");var r=n("ed16"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-container",[n("el-header",[n("h1",{staticStyle:{"text-align":"center"}},[t._v("Search strings application")])]),n("el-main",{directives:[{name:"loading",rawName:"v-loading.fullscreen.body.lock",value:t.isDatabaseClearing||t.isDatabaseLoading||t.isSearching,expression:"isDatabaseClearing || isDatabaseLoading || isSearching",modifiers:{fullscreen:!0,body:!0,lock:!0}}]},[n("el-col",{attrs:{xs:{span:20,offset:2},md:{span:12,offset:6}}},[n("transition",{attrs:{name:"el-zoom-in-center",mode:"out-in"}},[t.loading?t._e():n("el-row",{attrs:{type:"flex",justify:"center"}},[n("transition",{attrs:{name:"el-zoom-in-top",mode:"out-in"}},[t.isDatabaseEmpty?n("el-button",{key:"generate-button",attrs:{type:"primary",plain:""},on:{click:t.onGenerateButtonClick}},[t._v(" Generate data ")]):n("el-form",{ref:"searchForm",attrs:{model:t.searchForm,rules:t.searchFormRules,inline:!0,disabled:t.loading},nativeOn:{submit:function(t){t.preventDefault()}}},[n("el-form-item",[n("el-input",{attrs:{type:"text",placeholder:"Search",maxlength:t.stringLength,"show-word-limit":""},model:{value:t.searchForm.searchInput,callback:function(e){t.$set(t.searchForm,"searchInput","string"===typeof e?e.trim():e)},expression:"searchForm.searchInput"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search",disabled:!t.searchForm.searchInput},on:{click:t.onSearchButtonClick}},[t._v(" Search ")])],1),n("el-form-item",{staticStyle:{"margin-right":"0"}},[n("el-button",{key:"clear-button",attrs:{type:"danger",plain:""},on:{click:t.onClearButtonClick}},[t._v(" Clear storage ")])],1)],1)],1)],1)],1),n("transition",{attrs:{name:"el-zoom-in-center",mode:"out-in"}},[null===t.searchCount||t.loading?t._e():n("el-row",{attrs:{type:"flex",justify:"center"}},[n("div",{staticClass:"search-result"},[n("p",[n("i",{staticClass:"el-icon-search"}),t._v(" Found "),n("b",[t._v(t._s(t.searchCount)+" strings")]),t._v(" starting with "),n("b",[t._v('"'+t._s(t.searchString)+'"')]),t._v(" (execution time "+t._s("~"+Math.round(t.lastSearchDuration/1e3)+"s")+")")])])])],1),n("transition",{attrs:{name:"el-zoom-in-top"}},[t.loading?n("el-row",{attrs:{type:"flex",justify:"center"}},[n("transition",{attrs:{name:"el-zoom-in-top",mode:"out-in"}},[t.isGenerating?n("el-progress",{attrs:{type:"circle",percentage:t.loadingPercentage,status:t.status,"stroke-width":12}}):t._e()],1)],1):t._e()],1)],1)],1)],1)],1)},i=[],o=n("9dd2"),s=n("b2aa");n("8fdc"),n("018f"),n("d0a5"),n("7961");var c={},u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),l=Math.pow(10,7),g=100;u.forEach((function(t,e){return c[t]=e}));var f={name:"App",data:function(){return{stringLength:g,searchFormRules:{},searchForm:{searchInput:""}}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(s["d"])({isGenerating:function(t){return t.isGenerating},generatingCount:function(t){return t.generatingCount},isSearching:function(t){return t.isSearching},searchCount:function(t){return t.searchCount},searchString:function(t){return t.searchString},isDatabaseEmpty:function(t){return t.isDatabaseEmpty},isDatabaseLoading:function(t){return t.isDatabaseLoading},isDatabaseClearing:function(t){return t.isDatabaseClearing},lastSearchDuration:function(t){return t.lastSearchDuration},error:function(t){return t.error}})),Object(s["c"])(["loading"])),{},{loadingPercentage:function(){var t=Math.round(this.generatingCount/l*100);return t},status:function(){return this.generatingCount===l?"success":this.error?"exception":null}}),components:{},methods:Object(o["a"])(Object(o["a"])({},Object(s["b"])(["initApp","generateStrings","getStringsCount","clearStorage"])),{},{onClearButtonClick:function(){var t=this;this.$confirm("This will clear the storage. Continue?","Warning",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((function(){return t.clearStorage()}))},onGenerateButtonClick:function(){var t=this;this.$confirm("This will generate 10**7 random strings with length 100 to your storage. This can take some time. Continue?","Warning",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((function(){return t.generateStrings()}))},onSearchButtonClick:function(){this.getStringsCount({value:this.searchForm.searchInput,searchByValue:!1})}}),beforeMount:function(){this.initApp()}},p=f,h=(n("5c0b"),n("fa3c")),d=Object(h["a"])(p,a,i,!1,null,null,null),m=d.exports,S=n("4360"),b=n("65fe"),v=n.n(b);n("c69f");r["default"].use(v.a),r["default"].config.productionTip=!1,new r["default"]({store:S["a"],render:function(t){return t(m)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("63c7"),a=n.n(r);a.a},"63c7":function(t,e,n){},"70c1":function(t,e,n){t.exports=n.p+"js/0.921cb183.worker.js"},c69f:function(t,e,n){}});
//# sourceMappingURL=app.00504e6f.js.map