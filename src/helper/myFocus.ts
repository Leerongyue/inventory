import Vue from 'vue';

export const myFocus = (el: HTMLInputElement) => {
  Vue.nextTick(() => {
    el.focus();
  });
};