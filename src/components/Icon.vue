<template>
  <svg class="icon">
    <use :xlink:href=" '#'+ name"></use>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
  @Component
  export default class Icon extends Vue {
    @Prop(String) name!: string;
  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>