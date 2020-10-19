<template>
  <div class="home">
    <Head text="盘点扫描中" :left="left" :right="right"/>
    <Item text="工号" :code="account" placeholder="请输入工号" v-model="account"/>
    <Item text="条码" :code="barcode" placeholder="请输入条码" v-model="barcode"/>
    <button class="btn" @click="inventory">确定</button>
    <div class="detail">
      <!--      <div class="left">-->
      <!--        <div>货位</div>-->
      <!--        <div>品名 精密烦得很搜</div>-->
      <!--        <div>库存 666</div>-->
      <!--        <div>单位 卷</div>-->
      <!--      </div>-->
      <!--      <div class="right">-->
      <!--        <div>条码 66666666666</div>-->
      <!--        <div>规格 大立科技覅及</div>-->
      <!--        <div>价格 666</div>-->
      <!--      </div>-->
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
    <GoodsList :current-good="currentGood"/>
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
    account = '';
    barcode = '';
    currentGood = {} as GoodsDetail;

    created() {
      this.currentGood = copy<GoodsDetail>({...HomeInitData});
    }

    inventory() {
      const value = {'creater': this.account, 'barcode': this.barcode};
      this.$store.dispatch(
        'getResponse',
        {url: '/sssoa/infogoods/query', method: 'POST', value: JSON.stringify(value)})
        .then(res => {
          console.log(res);
          const data = res.data.resultObj.map((i: Goods) => i.infodata)[0] as GoodsDetail;
          this.currentGood = copy<GoodsDetail>(data);
        });
    }
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