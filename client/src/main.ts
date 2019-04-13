import Vue from "vue";
import './plugins/vuetify'
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Axios from "axios";

import App from "./App.vue";

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
