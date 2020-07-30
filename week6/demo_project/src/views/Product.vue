<template>
    <div>
        <h2>單一房間頁面</h2>
        <h3>{{product.title}}</h3>
        <h3>{{product.description}}</h3>
    </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    console.log(this.$route.params.id)
    const id = this.$route.params.id
    this.$http.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`)
      .then((response) => {
        console.log(response)
        this.product = response.data.data
        console.log(this.product)
      })
  }
}
</script>
