import Vue from "vue";
import './plugins/vuetify'
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Axios from "axios";
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from "./App.vue";

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:1234'),
    vuex: {
      store,
      actionPrefix: "socket_",
      mutationPrefix: "SOCKET_"
    }
  })
);

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
