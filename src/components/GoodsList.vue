<template>
  <div class="table">
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
  </div>

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

  .table {
    margin: 0 16px;

    table {
      width: 100%;

      thead {
        background: rgb(217, 217, 217);
        line-height: 36px;
        text-align: center;

      }

      tbody {
        tr {
          border-bottom: 1px solid $lineColor;
          line-height: 32px;

          td {
            text-align: center;

            &:nth-child(1) {
              width: 35vw;
            }

            &:nth-child(2) {
              width: 35vw;
            }

            &:nth-child(3) {
              width: 15vw;
            }

            &:nth-child(4) {
              width: 15vw;
            }

          }
        }
      }
    }
  }


</style>