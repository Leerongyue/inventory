<template>
  <div class="item">
    <span>{{text}}</span>
    <input
      id="input"
      :placeholder="placeholder"
      type="text"
      :value="value"
      @input="$emit('input',$event.target.value)">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Item extends Vue {
    @Prop(String) text!: string;
    @Prop(String) value!: string;
    @Prop(String) placeholder?: string;

    focus() {
      const input = document.getElementById('input');
      if (input) {
        input.focus();
      }
    }

    mounted() {
      this.focus();
      setTimeout(() => {
        this.focus();
      }, 0);
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/reset";

  .item {
    display: flex;
    margin: 0 16px;
    padding: 10px 0;

    span {
      white-space: nowrap;
    }

    input {
      border: none;
      border-bottom: 1px solid $lineColor;
      flex-grow: 1;
      margin-left: 16px;
    }
  }
</style>