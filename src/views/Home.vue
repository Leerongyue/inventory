<template>
  <div class="home">
    <Head text="盘点扫描中" :left="left" :right="right"/>
    <Item text="条码" :code="barcode" placeholder="请输入条码" v-model="barcode"/>
    <div class="itemWrapper">
      <Item text="数量" :code="amount" placeholder="请输入数量" v-model="amount" class="downItem"/>
      <button class="btn" @click="inventory">确定</button>
    </div>
    <div class="detail">
      <div>条码 {{currentGood.barcode}}</div>
      <div>品名 {{currentGood.goodsname}}</div>
      <div>拼音 {{currentGood.py}}</div>
      <div>价格 {{currentGood.retailprice}}</div>
      <div>规格 {{currentGood.spec}}</div>
      <div>库存 {{currentGood.stocknum}}</div>
      <div>单位 {{currentGood.unitname}}</div>
    </div>
    <div class="total">
      <span>扫描数 666</span>
      <span>品项数 666</span>
      <span>总数量 666</span>
    </div>
    <GoodsList :goods-list="goodsList"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Item from '@/components/Item.vue';
  import Head from '@/components/Head.vue';
  import GoodsList from '@/components/GoodsList.vue';
  import {Goods, GoodsDetail} from '@/helper/type';
  import {copy} from '@/helper/copy';
  import {HomeInitData} from '@/helper/initData';

  @Component({
    components: {GoodsList, Head, Item}
  })
  export default class Home extends Vue {
    left = false;
    right = false;
    barcode = '';
    amount = '';
    currentGood = {} as GoodsDetail;
    goodsList = [] as GoodsDetail[];

    created() {
      this.$store.commit('getGoods');
      this.currentGood = copy<GoodsDetail>({...HomeInitData});
      this.goodsList = copy(this.$store.state.goodsList);
    }

    inventory() {
      const value = {'creater': this.amount, 'barcode': this.barcode};
      this.$store.dispatch(
        'getResponse',
        {url: '/sssoa/infogoods/query', method: 'POST', value: JSON.stringify(value)})
        .then(res => {
          const data = res.data.resultObj.map((i: Goods) => i.infodata)[0] as GoodsDetail;
          this.currentGood = copy<GoodsDetail>(data);
          this.goodsList.push(this.currentGood);
          this.$store.commit('saveGood', {goodsList: this.goodsList});
        });
    }
  }
</script>

<style lang="scss" scoped>

  .home {
    display: flex;
    flex-direction: column;

    .itemWrapper {
      display: flex;
      align-items: center;

      .downItem {
        flex-grow: 1;
      }

      .btn {
        background: rgb(22, 182, 234);
        color: white;
        width: 16vw;
        padding: 6px 0;
        margin-right: 16px;
        margin-bottom: 10px;
      }
    }


    .detail {
      margin: 0 16px;
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