<template>
  <div class="home">
    <Head back="" text="盘点扫描中" :left="left" :right="right"/>
    <Item text="条码" :value="barcode" placeholder="请输入条码" v-model="barcode"/>
    <div class="itemWrapper">
      <Item @keypress.enter.native="inventory" text="数量" :value="amount" placeholder="请输入数量" v-model="amount"
            class="downItem"/>
      <Button name="确定" @click.native="inventory"/>
    </div>
    <div class="detail">
      <div>条码 {{currentGood.barcode}}</div>
      <div>品名 {{currentGood.goodsname}}</div>
      <div class="stockandprice">
        <span class="price">价格 {{currentGood.retailprice}}</span>
        <span>库存 {{currentGood.stocknum}}</span>
      </div>
      <div class="specandunit">
        <span class="unit">单位 {{currentGood.unitname}}</span>
        <span>规格 {{currentGood.spec}}</span>
      </div>
    </div>
    <div class="total">
      <span>扫描数 {{scanAmount}}</span>
      <span>品项数 {{kindAmount}}</span>
      <span>总数量 {{totalAmount}}</span>
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
  import {message} from 'ant-design-vue';
  import dayjs from 'dayjs';
  import {pushGood} from '@/helper/pushGood';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, GoodsList, Head, Item}
  })
  export default class Home extends Vue {
    left = false;
    right = false;
    barcode = '';
    amount = '';
    scanAmount = 0;
    kindAmount = 0;
    totalAmount = 0;
    currentGood = {} as GoodsDetail;
    goodsList = [] as GoodsDetail[];

    created() {
      this.$store.commit('getGoods');
      this.$store.commit('getAmount');
      const goodsArr = copy(this.$store.state.goodsList) as GoodsDetail[];
      const amountArr = goodsArr.map((i: GoodsDetail) => i.amount);
      const amountObj = copy(this.$store.state.amount);
      this.scanAmount = amountObj.scanAmount;
      this.kindAmount = goodsArr.length;
      this.totalAmount = amountArr.reduce((sum, item) => sum + item);
      this.currentGood = goodsArr.length > 0 ? copy(goodsArr.shift()) : copy(HomeInitData);
      this.goodsList = copy<GoodsDetail>(this.$store.state.goodsList);
    }

    inventory() {
      if (!this.barcode) {
        message.info('请输入条码', 0.5);
        return;
      }
      if (!this.amount) {
        message.info('请输入数量', 0.5);
        return;
      }
      const value = {creater: this.amount, barcode: this.barcode};
      this.$store.dispatch(
        'getResponse',
        {url: '/sssoa/infogoods/query', method: 'POST', value: JSON.stringify(value)})
        .then(res => {
          if (res.data.err_msg === '无商品信息！') {
            message.info('无商品信息', 0.5);
            return;
          }
          this.scanAmount += 1;
          this.totalAmount = this.totalAmount + parseInt(this.amount);
          const data = res.data.resultObj.map((i: Goods) => i.infodata)[0] as GoodsDetail;
          this.currentGood = copy<GoodsDetail>(data);
          const barcodeArr = copy(this.goodsList).map((i: GoodsDetail) => i.barcode);
          if (this.goodsList.length === 0) {//无商品记录，品项数+1，商品列表+1
            this.kindAmount = 1;
            pushGood(this.goodsList, this.currentGood, this.amount);
          } else {
            if (barcodeArr.includes(this.barcode)) {//有商品记录，条码重复，品项数不变，商品列表不变
              const existedGood = this.goodsList.filter((i: GoodsDetail) => i.barcode === this.currentGood.barcode)[0];
              existedGood.amount += parseInt(this.amount);
              existedGood.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss.000');
              this.goodsList.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            } else {//有商品记录，条码不同，品项数+1，商品列表+1
              this.kindAmount += 1;
              pushGood(this.goodsList, this.currentGood, this.amount);
            }
          }
          this.$store.commit('saveGood', {goodsList: this.goodsList});
          this.$store.commit('saveAmount', {
            amount: {
              scanAmount: this.scanAmount,
              kindAmount: this.kindAmount,
              totalAmount: this.totalAmount
            }
          });
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
      margin: 0 16px;

      .downItem {
        flex-grow: 1;
      }

      ::v-deep .item {
        margin-left: 0;
      }
    }

    .detail {
      margin: 0 16px;
      background: rgb(245, 245, 245);

      div {
        margin: 8px;
      }

      .stockandprice {
        .price {
          margin-right: 8px;
        }
      }

      .specandunit {
        .unit {
          margin-right: 8px;
        }
      }
    }


    .total {
      background: rgb(245, 245, 245);
      margin: 8px 16px;
      padding: 8px 0 8px 8px;
      font-size: 20px;

      span {
        margin-right: 12px;
      }
    }
  }
</style>