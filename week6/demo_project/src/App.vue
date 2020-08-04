<template>
  <div id="app">
    <div id="nav">
      <h1>未來建設</h1>
      <router-link to="/">首頁</router-link> |
      <router-link to="/about">關於未來</router-link> |
      <router-link to="/products">新案鑑賞</router-link> |
      <router-link to="/cart">預約看屋列表</router-link> |
      <router-link to="/coupons">優惠活動</router-link> |
      <router-link to="/admin/products">登入</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
