<template>
  <div class="home">
    <Head text="盘点扫描中" :left="left" :right="right"/>
    <Item text="条码" :code="barcode" placeholder="请输入条码" v-model="barcode"/>
    <div class="itemWrapper">
      <Item text="数量" :code="amount" placeholder="请输入数量" v-model="amount" class="downItem"/>
      <button class="btn" @click="inventory">确定</button>
    </div>
    <div class="detail">
      <div class="longDetail">
        <div>条码 {{currentGood.barcode}}</div>
        <div>品名 {{currentGood.goodsname}}</div>
        <div>拼音 {{currentGood.py}}</div>
        <div>时间 {{currentGood.createdate}}</div>
      </div>
      <div class="shortDetail">
        <div>价格 {{currentGood.retailprice}}</div>
        <div>规格 {{currentGood.spec}}</div>
        <div>库存 {{currentGood.stocknum}}</div>
        <div>单位 {{currentGood.unitname}}</div>
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

  @Component({
    components: {GoodsList, Head, Item}
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
      const amountObj = copy(this.$store.state.amount);
      this.scanAmount = amountObj.scanAmount;
      this.kindAmount = amountObj.kindAmount;
      this.totalAmount = amountObj.totalAmount;
      this.currentGood = goodsArr.length > 0 ? copy(goodsArr.pop()) : copy(HomeInitData);
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
          console.log(res);
          if (res.data.err_msg === '无商品信息！') {
            message.info('无商品信息', 0.5);
            return;
          }
          this.scanAmount += 1;
          this.totalAmount = this.totalAmount + parseInt(this.amount);
          const data = res.data.resultObj.map((i: Goods) => i.infodata)[0] as GoodsDetail;
          this.currentGood = copy<GoodsDetail>(data);
          this.goodsList.push(this.currentGood);
          const barcodeArr = copy(this.goodsList).map((i: GoodsDetail) => i.barcode);
          if (this.goodsList.length === 1) {
            this.kindAmount = 1;
          } else {
            if (!barcodeArr.includes(this.barcode)) {
              this.kindAmount += 1;
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
      display: flex;
      align-items: center;
      margin: 0 16px;
      background: rgb(245, 245, 245);

      .longDetail {
        width: 70vw;
        padding: 8px;

        div {
          padding: 4px 0;
        }
      }

      .shortDetail {
        width: 30vw;

        div {
          padding: 4px 0;
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