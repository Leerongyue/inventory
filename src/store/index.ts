import Vue from 'vue';
import Vuex from 'vuex';
import {request} from '@/helper/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async getResponse({commit}, payload) {
      return await request(payload.url, payload.method, payload.value);
    }
  },
  modules: {}
});
