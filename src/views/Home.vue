<template>
  <div class="home">
    <div class="stickyArea">
      <Head back="" text="盘点扫描中" :left="left" :right="right"/>
      <div class="barcodeItem">
        <span>条码</span>
        <input ref="barcodeInput" placeholder="请输入条码" type="text" v-model="barcode">
      </div>
      <div class="amountItem">
        <span>数量</span>
        <input ref="amountInput" placeholder="请输入数量" type="text" v-model="amount">
        <Button name="确定" @click.native="inventory"/>
      </div>
      <div class="detail">
        <div class="left">
          <div>
            条码 {{currentGood.barcode}}
          </div>
          <div class="goodsname">
            <span>品名</span>
            <span class="rightSpan">
            {{currentGood.goodsname}}
          </span>
          </div>
          <div>
            规格 {{currentGood.spec}}
          </div>
        </div>
        <ul>
          <li>价格 {{currentGood.retailprice}}</li>
          <li>单位 {{currentGood.unitname}}</li>
          <li>库存 {{currentGood.stocknum}}</li>
        </ul>
      </div>
      <div class="total">
        <span>扫描数 {{scanAmount}}</span>
        <span>品项数 {{kindAmount}}</span>
        <span>总数量 {{totalAmount}}</span>
      </div>
      <div class="thead">
        <span><strong>条码</strong></span>
        <span><strong>品名</strong></span>
        <span><strong>规格</strong></span>
        <span><strong>数量</strong></span>
      </div>
    </div>
    <div class="goodslist">
      <GoodsList :goods-list="goodsList"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import Item from "@/components/Item.vue";
  import Head from "@/components/Head.vue";
  import GoodsList from "@/components/GoodsList.vue";
  import {Goods, GoodsDetail} from "@/helper/type";
  import {copy} from "@/helper/copy";
  import {HomeInitData} from "@/helper/initData";
  import {message} from "ant-design-vue";
  import dayjs from "dayjs";
  import {pushGood} from "@/helper/pushGood";
  import Button from "@/components/Button.vue";
  import AV from "leancloud-storage";
  import {myFocus} from "@/helper/myFocus";

  @Component({
    components: {Button, GoodsList, Head, Item}
  })
  export default class Home extends Vue {
    left = false;
    right = false;
    barcode = "";
    amount = "";
    scanAmount = 0;
    kindAmount = 0;
    totalAmount = 0;
    currentGood = {} as GoodsDetail;
    goodsList = [] as GoodsDetail[];

    mounted() {
      myFocus(this.$refs.barcodeInput as HTMLInputElement);
    }

    created() {
      const div = document.querySelector(".stickyArea");
      if (div) {
        console.log(div.getBoundingClientRect());
      }

      this.$store.commit("getGoods");
      this.$store.commit("getAmount");
      const goodsArr = copy(this.$store.state.goodsList) as GoodsDetail[];
      const amountArr = goodsArr.map((i: GoodsDetail) => i.amount);
      const amountObj = copy(this.$store.state.amount);
      this.scanAmount = goodsArr.length === 0 ? 0 : amountObj.scanAmount;
      this.kindAmount = goodsArr.length;
      this.totalAmount = amountArr.length === 0 ? 0 : amountArr.reduce((sum, item) => sum + item);
      this.currentGood = goodsArr.length > 0 ? copy(goodsArr.shift()) : copy(HomeInitData);
      this.goodsList = copy<GoodsDetail>(this.$store.state.goodsList);
    }

    async inventory() {
      if (!this.barcode) {
        message.info("请输入条码", 0.5);
        myFocus(this.$refs.barcodeInput as HTMLInputElement);
        return;
      }
      if (!this.amount) {
        message.info("请输入数量", 0.5);
        myFocus(this.$refs.amountInput as HTMLInputElement);
        return;
      }
      const value = {creater: this.amount, barcode: this.barcode};
      const res = await this.$store.dispatch(
        "getResponse",
        {url: "/sssoa/infogoods/query", method: "POST", value: JSON.stringify(value)});
      await this.$store.dispatch(
        "getResponse",
        {url: "/sssoa/infogoods/query", method: "POST", value: JSON.stringify(value)});
      // console.log(JSON.stringify(res.data));
      // console.log(JSON.stringify(res.data.resultObj[0].infodata));
      if (res.data.err_msg === "无商品信息！") {
        message.info("无商品信息", 0.5);
        myFocus(this.$refs.barcodeInput as HTMLInputElement);
        this.barcode = "";
        this.amount = "";
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
          existedGood.createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss.000");
          this.goodsList.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        } else {//有商品记录，条码不同，品项数+1，商品列表+1
          this.kindAmount += 1;
          pushGood(this.goodsList, this.currentGood, this.amount);
        }
      }
      this.$store.commit("saveGood", {goodsList: this.goodsList});
      this.$store.commit("saveAmount", {
        amount: {
          scanAmount: this.scanAmount,
          kindAmount: this.kindAmount,
          totalAmount: this.totalAmount
        }
      });
      this.barcode = "";
      this.amount = "";
      myFocus(this.$refs.barcodeInput as HTMLInputElement);
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/home";
</style>