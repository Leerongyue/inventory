import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'ant-design-vue/lib/message/style/css';

Vue.config.productionTip = false;
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
