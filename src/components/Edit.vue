<template>
  <div class="edit">
    <Head :left="left" :right="right" text="商品编辑" back="/home"/>
    <Item text="条码" :value="barcode" v-model="barcode" @input.native="onChange"/>
    <Item text="品名" :value="goodsname" v-model="goodsname" @input.native="onChange"/>
    <Item text="规格" :value="spec" v-model="spec" @input.native="onChange"/>
    <Item text="数量" :value="amount" v-model="amount" @input.native="onChange"/>
    <Button @click.native="removeGood" name="删除商品"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Head from '@/components/Head.vue';
  import Item from '@/components/Item.vue';
  import Button from '@/components/Button.vue';
  import {GoodsDetail} from '@/helper/type';
  import {copy} from '@/helper/copy';

  @Component({
    components: {Button, Item, Head}
  })
  export default class Edit extends Vue {
    left = true;
    right = false;
    barcode = '';
    goodsname = '';
    spec = '';
    amount = '';

    created() {
      this.$store.commit('getGoods');
      this.barcode = this.$route.query.barcode as string;
      this.goodsname = this.$route.query.goodsname as string;
      this.spec = this.$route.query.spec as string;
      this.amount = this.$route.query.amount as string;
    }

    removeGood() {
      const goodsList = copy(this.$store.state.goodsList);
      const current = goodsList.filter((i: GoodsDetail) => i.barcode === this.barcode)[0];
      const index = goodsList.indexOf(current);
      goodsList.splice(index, 1);
      this.$store.commit('saveGood', {goodsList});
      this.$router.push('/home');
    }

    onChange() {
      const goodsList = this.$store.state.goodsList;
      const current = goodsList.filter((i: GoodsDetail) => i.barcode === this.barcode)[0] as GoodsDetail;
      current.goodsname = this.goodsname;
      current.spec = this.spec;
      current.amount = parseInt(this.amount);
      this.$store.commit('saveGood', {goodsList});
    }
  }
</script>

<style lang="scss" scoped>
  .edit {
    text-align: center;

    ::v-deep .btn {
      width: 25vw;
      margin-top: 8px;
    }
  }
</style>