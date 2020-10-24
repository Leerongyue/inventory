<template>
  <table>
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
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import {GoodsDetail} from "@/helper/type";

  @Component
  export default class GoodsList extends Vue {
    @Prop(Array) goodsList!: GoodsDetail[];

    edit(item: GoodsDetail) {
      const {barcode, goodsname, spec, amount} = item;
      this.$router.push({path: "edit", query: {barcode, goodsname, spec, amount: amount.toString()}});
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/reset";

  table {
    margin: 0 16px;

    tbody {
      tr {
        border-bottom: 1px solid $lineColor;
        line-height: 48px;
        display: table;
        width: 100%;
        table-layout: fixed;

        td {
          text-align: center;
          white-space: nowrap;
          padding: 0 4px;

          &:nth-child(1) {
            width: 35%;
            overflow-x: auto;
          }

          &:nth-child(2) {
            width: 35%;
            overflow-x: auto;
          }

          &:nth-child(3) {
            width: 15%;
            overflow-x: auto;
          }

          &:nth-child(4) {
            width: 15%;
            overflow-x: auto;
          }

        }
      }
    }
  }


</style>