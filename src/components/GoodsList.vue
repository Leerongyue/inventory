<template>
  <table>
    <thead>
    <tr>
      <th>条码</th>
      <th>品名</th>
      <th>规格</th>
      <th>数量</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in goodsList" :key="index" @click="edit(item)">
      <td>{{item.barcode}}</td>
      <td>{{item.goodsname}}</td>
      <td>{{item.spec}}</td>
      <td>{{item.amount}}</td>
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

    edit(item: GoodsDetail) {
      const {barcode, goodsname, spec, amount} = item;
      this.$router.push({path: 'edit', query: {barcode, goodsname, spec, amount: amount.toString()}});
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/reset";

  table {
    margin: 0 16px;

    thead {
      background: rgb(217, 217, 217);
      line-height: 36px;
      text-align: center;
      display: table;
      table-layout: fixed;

      tr {
        white-space: nowrap;

        th {
          &:nth-child(1) {
            width: calc(33vw - 8px);
          }

          &:nth-child(2) {
            width: calc(33vw - 8px);
          }

          &:nth-child(3) {
            width: calc(17vw - 8px);
          }

          &:nth-child(4) {
            width: calc(17vw - 8px);
          }
        }
      }
    }

    tbody {
      display: block;
      height: 60vw;
      overflow-y: auto;

      tr {
        border-bottom: 1px solid $lineColor;
        line-height: 48px;
        display: table;
        width: 100%;
        table-layout: fixed;

        td {
          text-align: center;
          white-space: nowrap;

          &:nth-child(1) {
            width: calc(33vw - 8px);
            overflow-x: auto;
          }

          &:nth-child(2) {
            width: calc(33vw - 8px);
            overflow-x: auto;
          }

          &:nth-child(3) {
            width: calc(17vw - 8px);
            overflow-x: auto;
          }

          &:nth-child(4) {
            width: calc(17vw - 8px);
            overflow-x: auto;
          }

        }
      }
    }
  }


</style>