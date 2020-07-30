<template>
    <div>
        <h2>管理後台的產品頁面</h2>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
      // token: ''
    }
  },
  props: ['token'],
  created () { // 使用token做驗證
    // this.token = document.cookie.replace(/(?:(?:^|.*;\s*)iscookie\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`
    this.$http.get(url).then(res => {
      this.products = res.data.data
    })
  }
}
</script>
