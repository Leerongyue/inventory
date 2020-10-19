<template>
  <div>
    <Head text="盘点扫描中" :left="left" :right="right"/>
    <Item text="条码" :code="barCode" placeholder="请输入条码" v-model="barCode"/>
    <Item text="数量" :code="number" placeholder="请输入数量" v-model="number"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Item from '@/components/Item.vue';
  import Head from '@/components/Head.vue';

  @Component({
    components: {Head, Item}
  })
  export default class Home extends Vue {
    left = false;
    right = false;
    barCode = '';
    number = '';

  }
</script>

<style lang="scss" scoped>

</style>