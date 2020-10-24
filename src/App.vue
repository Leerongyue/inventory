<template>
  <div id="app">
    <router-view v-if="isAlive"/>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Provide} from "vue-property-decorator";

  @Component
  export default class App extends Vue {
    @Provide() refresh = this.reload;
    isAlive = true;

    reload() {
      this.isAlive = false;
      this.$nextTick(() => {
        this.isAlive = true;
      });
    }
  }
</script>

<style lang="scss">
  @import "src/style/reset";
  @import "src/style/helper";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $font-hei;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
    /*background: #f5f5f5;*/
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
