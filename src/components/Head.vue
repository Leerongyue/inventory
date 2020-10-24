<template>
  <div class="head">
    <Icon name="left" :class="!left && 'leftHidden'" @click.native="goBack"/>
    <span><strong>{{text}}</strong></span>
    <Icon name="right" :class="!right && 'rightHidden'"/>
    <div class="deleteAll" @click="deleteAll">清空记录</div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {Component, Inject, Prop} from "vue-property-decorator";
  import Icon from "@/components/Icon.vue";

  @Component({
    components: {Icon}
  })
  export default class Head extends Vue {
    @Inject() readonly refresh!: () => void;
    @Prop(String) text!: string;
    @Prop(Boolean) left!: boolean;
    @Prop(Boolean) right!: boolean;
    @Prop(String) back!: string;

    goBack() {
      this.$router.push(this.back);
    }

    deleteAll() {
      this.$store.commit("deleteGoods");
      this.refresh();
    }
  }
</script>

<style lang="scss" scoped>
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(22, 182, 234);
    padding: 12px 16px;
    margin-bottom: 14px;
    position: relative;

    span {
      font-size: 24px;
      color: white;
    }

    svg {
      fill: white;

      &.leftHidden {
        visibility: hidden;
      }

      &.rightHidden {
        visibility: hidden;
      }
    }

    .deleteAll {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate(0, -50%);
      color: rgb(60, 236, 99);
    }
  }
</style>