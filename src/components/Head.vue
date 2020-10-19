<template>
  <div class="head">
    <Icon name="left" :class="!left && 'leftHidden'"/>
    <span><strong>{{text}}</strong></span>
    <Icon name="right" :class="!right && 'rightHidden'"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class Head extends Vue {
    @Prop(String) text!: string;
    @Prop(Boolean) left!: boolean;
    @Prop(Boolean) right!: boolean;
  }
</script>

<style lang="scss" scoped>
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(22, 182, 234);
    padding: 12px 16px;
    margin-bottom: 8px;
    position: sticky;
    top: 0;
    left: 0;
    
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
  }
</style>