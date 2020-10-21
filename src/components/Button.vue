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
    padding: 6px 12px;
    margin-bottom: 10px;
    white-space: nowrap;
  }
</style>