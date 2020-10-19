<template>
  <div class="item">
    <span>{{text}}</span>
    <input
      :placeholder="placeholder"
      type="text"
      :value="code"
      @input="$emit('input',$event.target.value)">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Item extends Vue {
    @Prop(String) text!: string;
    @Prop(String) code!: string;
    @Prop(String) placeholder!: string;
  }
</script>

<style lang="scss" scoped>
  @import "src/style/reset";

  .item {
    display: flex;
    margin: 0 16px;
    padding: 10px 0;

    input {
      border: none;
      border-bottom: 1px solid $lineColor;
      flex-grow: 1;
      margin-left: 16px;
    }
  }
</style>