<template>
  <div>
    {{code}}
    <Item text="条码" :code="code" placeholder="请输入条码" v-model="code"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Item from '@/components/Item.vue';

  @Component({
    components: {Item}
  })
  export default class Home extends Vue {
    code = '';
  }
</script>

<style lang="scss" scoped>

</style>