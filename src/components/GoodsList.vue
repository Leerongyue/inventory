<template>
  <table>
    <thead>
    <tr>
      <th>条码</th>
      <th>品名</th>
      <th>规格</th>
      <th>库存</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in goodsList" :key="index">
      <td>{{item.barcode}}</td>
      <td>{{item.goodsname}}</td>
      <td>{{item.spec}}</td>
      <td>{{item.stocknum}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {GoodsDetail} from '@/helper/type';

  @Component
  export default class GoodsList extends Vue {
    @Prop(Array) goodsList!: GoodsDetail[];
  }
</script>

<style lang="scss" scoped>

  table {
    margin: 0 16px;

    thead {
      background: rgb(217, 217, 217);
      line-height: 36px;
    }

    tr {
      td {
        text-align: center;
        max-width: 30vw;
      }
    }
  }

</style>