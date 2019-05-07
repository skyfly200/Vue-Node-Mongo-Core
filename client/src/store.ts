import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    socketConnected: false,
    socketMessage: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, data){
      state.status = 'success'
      state.token = data.token
      state.user = data.user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    setSocketState(state, s){
      state.socketConnected = s;
    },
    socket_message(state, m){
      state.socketMessage = m;
    }
  },
  actions: {
    SOCKET_MESSAGE(state, message) {
      commit('socket_message', message);
    },
    load_session: ({commit}, data) => {
      let {token, user} = data;
      commit('auth_success', {token, user});
    },
    login: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({url: 'http://localhost:1234/users/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          // MUST be changed to store JWT in cookie for security!!!
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', {token, user})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        });
      });
    },
    register: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({url: "http://localhost:1234/users/register", data: user, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    logout: ({commit}) => {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
});
