<template>
  <div class="home">
    <Head text="盘点扫描中" :left="left" :right="right"/>
    <Item text="条码" :code="barCode" placeholder="请输入条码" v-model="barCode"/>
    <Item text="数量" :code="number" placeholder="请输入数量" v-model="number"/>
    <button class="btn">确定</button>
    <div class="detail">
      <div>
        <div>扫描单 盘点-15020201</div>
        <div>货位</div>
        <div>品名 精密烦得很搜</div>
        <div>库存 666</div>
        <div>单位 卷</div>
      </div>
      <div>
        <div>条码 66666666666</div>
        <div>规格 大立科技覅及</div>
        <div>价格 666</div>
      </div>
    </div>
    <div class="total">
      <span>扫描数 666</span>
      <span>品项数 666</span>
      <span>总数量 666</span>
    </div>
    <GoodsList/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Item from '@/components/Item.vue';
  import Head from '@/components/Head.vue';
  import GoodsList from '@/components/GoodsList.vue';

  @Component({
    components: {GoodsList, Head, Item}
  })
  export default class Home extends Vue {
    left = false;
    right = false;
    barCode = '';
    number = '';
  }
</script>

<style lang="scss" scoped>

  .home {
    display: flex;
    flex-direction: column;

    .btn {
      background: rgb(22, 182, 234);
      margin: 8px 16px;
      padding: 6px 0;
      color: white;
    }

    .detail {
      margin: 0 16px;
      display: flex;
      align-items: center;
      background: rgb(245, 245, 245);

      div {
        margin: 4px 0;
      }
    }

    .total {
      background: rgb(245, 245, 245);
      margin: 8px 16px;
      padding: 8px 0;
      font-size: 20px;


      span {
        margin-right: 12px;
      }
    }
  }
</style>