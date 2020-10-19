import Vue from 'vue';
import Vuex from 'vuex';
import {request} from '@/helper/request';
import {GoodsDetail} from '@/helper/type';
import {copy} from '@/helper/copy';
import {setLocalStorage} from '@/helper/setLocalStorage';
import {getLocalStorage} from '@/helper/getLocalStorage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: [] as GoodsDetail[]
  },
  mutations: {
    saveGood(state, payload) {
      setLocalStorage('goodsList', JSON.stringify(payload.goodsList));
    },
    getGoods(state) {
      const res = getLocalStorage('goodsList');
      state.goodsList = res ? copy(JSON.parse(res)) : copy([]);
    }
  },
  actions: {
    async getResponse({commit}, payload) {
      return await request(payload.url, payload.method, payload.value);
    }
  },
  modules: {}
});
