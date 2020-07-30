import router from '../router';
<template>
    <div>
        <h2>這是產品頁面</h2>
        <table>
          <tr v-for = "item in products" :key="item.id">
            <td>{{item.title}}</td>
            <td>{{item.origin_price}}</td>
            <td>
              <router-link :to="`/product/${item.id}`">連結</router-link>
            </td>
            <td>
              <button @click="goPage(item)">進入頁面</button>
            </td>
          </tr>
        </table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    goPage (item) {
      this.$router.push(`/product/${item.id}`)
    }
  },
  created () {
    console.log('uuid:', process.env.VUE_APP_UUID)
    this.$http.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`)
      .then((response) => {
        console.log(response)
        this.products = response.data.data
        console.log(this.products)
      })
  }
}
</script>
