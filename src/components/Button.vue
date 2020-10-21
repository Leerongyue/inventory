<template>
  <div>
    <button class="btn">{{name}}</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {
    @Prop(String) name!: string;
  }
</script>

<style lang="scss" scoped>
  .btn {
    background: rgb(22, 182, 234);
    color: white;
    width: 16vw;
    padding: 6px 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
</style>