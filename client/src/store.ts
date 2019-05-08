import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    connected: false,
    connections: 0,
    token: localStorage.getItem('token') || '',
    user : {},
    conversations: [],
    contacts: []
  },
  mutations: {
    load_contacts(state, data){
      state.contacts = data.contacts;
    },
    load_conversations(state, data){
      state.conversations = data.conversations;
    },
    new_conversation(state, data){
      state.conversations.unshift(data.conversation);
    },
    set_convo_prop(state, data){
      let index = state.conversations.findIndex(c => data.id === c.id);
      state.conversations[index][data.property] = data[data.property];
    },
    delete_conversation(state, data){
      let index = state.conversations.findIndex(c => data.id === c.id);
      state.conversations.splice(index, 1);
    },
    new_message(state, data){
      let index = state.conversations.findIndex(c => data.id === c.id);
      state.conversations[index].messages.push(data.message);
      let newest = state.conversations.splice(index, 1);
      state.conversations.unshift(newest[0]);
    },
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
    set_connections(state, c){
      state.connections = c;
    },
    set_connected(state, c){
      state.connected = c;
    }
  },
  actions: {
    SOCKET_connect({commit}) {
      commit('set_connected', true);
    },
    SOCKET_disconnect({commit}) {
      commit('set_connected', false);
    },
    SOCKET_CONNECTIONS({commit}, data) {
      commit('set_connections', data);
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
    user: state => state.user,
    connected: state => state.connected,
    connections: state => state.connections
  }
});
