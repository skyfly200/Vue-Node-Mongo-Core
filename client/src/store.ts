import Vue from "vue";
import Vuex, { Module } from "vuex";
import axios from "axios";

import Chat from './modules/chat';
import Auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat: Chat,
    auth: Auth
  },
  state: {
    connected: false,
    connections: 0,
    socketID: ""
  },
  mutations: {
    set_connections(state, c){
      state.connections = c;
    },
    set_connected(state, c){
      state.connected = c;
    },
    set_socket_id(state, id){
      state.socketID = id;
    }
  },
  actions: {
    socket_connect({commit}) {
      commit('set_connected', true);
    },
    socket_socket_id({commit, rootState}, data) {
      commit('set_socket_id', data);
      console.log(rootState.auth.getUser);
      //this.$socket.emit('register', data, username);
    },
    socket_disconnect({commit}) {
      commit('set_connected', false);
    },
    socket_connections({commit}, data) {
      commit('set_connections', data);
    }
  },
  getters : {
    connected: state => state.connected,
    connections: state => state.connections,
    socketID: state => state.socketID
  }
});
