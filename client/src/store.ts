import Vue from "vue";
import Vuex, { Module } from "vuex";
import axios from "axios";

import Chat from './modules/chat';
import User from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat: Chat,
    user: User
  },
  state: {
    connected: false,
    connections: 0
  },
  mutations: {
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
    }
  },
  getters : {
    connected: state => state.connected,
    connections: state => state.connections
  }
});
