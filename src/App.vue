<template>
  <div id="app">
    <div class="theming-container ui container">
      <div class="ui menu">
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/pay" class="item" active-class="active">Pay</router-link>
        <router-link to="/payments" class="item" active-class="active">Payments List</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style lang="less">
  @import "assets/semantic-ui/semantic.min.css";
  #app {
    padding: 3em;
  }
</style>

<script>
  export default {
  }
</script>