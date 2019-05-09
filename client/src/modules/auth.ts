import { Module, VuexModule, Mutation, MutationAction, Action } from 'vuex-module-decorators';
import axios from "axios";

import {User} from '@/models/user';

@Module
export default class Auth extends VuexModule {
  status: string = '';
  token: string = localStorage.getItem('token') || '';
  user: User = new User();

  @Mutation auth_request(){
    this.status = 'loading';
  }

  @MutationAction({mutate: ['status', 'token', 'user']}) async load_session(data: object) {
    let {token, user} = data;
    return {status: 'success', token: token, user: user};
  }
  @MutationAction({mutate: ['status', 'token', 'user']}) async login(data: object) {
    this.context.commit('auth_request');
    try {
      const response: any = await axios({url: 'http://localhost:1234/users/login', data: data, method: 'POST' });
      const token = response.token;
      const user = response.user;
      // MUST be changed to store JWT in cookie for security!!!
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = token;
      return {status: "success", token: token, user: user};
    }
    catch(error) {
      console.log("error", error);
      return {status: "error", token: "", user: {}};
    }
  }
  @MutationAction({mutate: ['status', 'token', 'user']}) async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    return {status: "", token: "", user: {}};
  }

  @Action register(data: object) {
    axios({url: "http://localhost:1234/users/register", data: data, method: 'POST' })
    return;
  }

  get isLoggedIn() { return !!this.token };
  get authStatus() { return this.status };
  get getUser() { return this.user; }
}
