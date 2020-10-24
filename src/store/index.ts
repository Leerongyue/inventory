import Vue from "vue";
import Vuex from "vuex";
import {request} from "@/helper/request";
import {GoodsDetail} from "@/helper/type";
import {copy} from "@/helper/copy";
import {setLocalStorage} from "@/helper/setLocalStorage";
import {getLocalStorage} from "@/helper/getLocalStorage";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: [] as GoodsDetail[],
    amount: {scanAmount: 0, kindAmount: 0, totalAmount: 0}
  },
  mutations: {
    saveGood(state, payload) {
      setLocalStorage("goodsList", JSON.stringify(payload.goodsList));
    },
    getGoods(state) {
      const res = getLocalStorage("goodsList");
      state.goodsList = res ? copy(JSON.parse(res)) : copy([]);
    },
    deleteGoods(state) {
      window.localStorage.removeItem("goodsList");
      window.localStorage.removeItem("amount");
    },
    saveAmount(state, payload) {
      setLocalStorage("amount", JSON.stringify(payload.amount));
    },
    getAmount(state) {
      const res = getLocalStorage("amount");
      state.amount = res ? copy(JSON.parse(res)) : copy({scanAmount: 0, kindAmount: 0, totalAmount: 0});
    }
  },
  actions: {
    async getResponse({commit}, payload) {
      return await request(payload.url, payload.method, payload.value);
    }
  },
  modules: {}
});
