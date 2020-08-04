<template>
  <div>
    <h2>這是管理頁面</h2>
          <div class="card position-fixed" style="width: 18rem;">
        <div class="card-header">
          <router-link to="/admin/product">新案列表</router-link>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <router-link to="/admin/coupons">優惠活動</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/admin/product">新案列表</router-link>
          </li>
        </ul>
      </div>
    <router-view :token="token" v-if="checkSuccess" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  created () { // 使用token做驗證
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)iscookie\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}auth/check`
      this.$http.post(api, {
        api_token: this.token
      })
        .then(res => {
          this.checkSuccess = true
        })
        .catch((error) => {
          console.log(error.response)
          this.$router.push('/login')
        })
    }
  }

}
</script>
