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
    conversations: [
      {
        id: new Date(2018,11,28).getTime(),
        unread: false,
        title: "The Group",
        styles: {
          color: "default",
          density: "medium"
        },
        notifications: {
          state: true
        },
        created: new Date(2018,11,28),
        creator: "test",
        members: [
          {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
          {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
          {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"}
        ],
        messages: [
          { author: "test2", body: "This is a message from another user", timestamp: new Date(2018,11,28) },
          { author: "test", body: "This is a message you sent", timestamp: new Date(2019,2,22) },
          { author: "test2", body: "Another message from another user", timestamp: new Date(2019,3,20) },
          { author: "test", body: "Another from you", timestamp: new Date() }
        ]
      },
      {
        id: new Date(2019,4,3).getTime(),
        unread: true,
        title: "",
        styles: {
          color: "default",
          density: "medium"
        },
        notifications: {
          state: true
        },
        created: new Date(2019,4,3),
        creator: "test",
        members: [
          {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
          {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
        ],
        messages: [
          { author: "test", body: "Hey, whats up?", timestamp: new Date(2019,4,3) }
        ]
      },
      {
        id: new Date(2019,3,3).getTime(),
        unread: false,
        title: "",
        styles: {
          color: "default",
          density: "medium"
        },
        notifications: {
          state: true
        },
        created: new Date(2019,3,3),
        creator: "test3",
        members: [
          {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"},
          {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}
        ],
        messages: [
          { author: "test3", body: "Hola amigo", timestamp: new Date(2019,4,3) }
        ]
      }
    ],
    contacts: [
      {username: "test", avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"},
      {username: "test2", avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"},
      {username: "test3", avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"},
      {username: "test4", avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"},
      {username: "skyfly", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"}
    ]
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
      state.status = 'loading';
    },
    auth_success(state, data){
      state.status = 'success';
      state.token = data.token;
      state.user = data.user;
    },
    auth_error(state){
      state.status = 'error';
    },
    logout(state){
      state.status = '';
      state.token = '';
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
    SOCKET_connections({commit}, data) {
      commit('set_connections', data);
    },
    SOCKET_message({commit}, data) {
      commit('new_message', data);
    },
    SOCKET_conversation_updated({commit}, data) {
      commit('set_convo_prop', data);
    },
    SOCKET_new_conversation({commit}, data) {
      commit('new_conversation', data);
    },
    load_contacts: ({commit}, data) => {
      commit('load_contacts', data);
    },
    load_conversations: ({commit}, data) => {
      commit('load_conversations', data);
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
    connections: state => state.connections,
    contacts: state => state.contacts,,
    contact: (state) => (username) => {
      return state.contacts.find(c => c.username === username)
    },
    conversations: state => state.conversations,
    conversation: (state) => (id) => {
      return state.conversations.find(c => todo.id === id)
    }
  }
});
