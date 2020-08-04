<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="text-right">
        <button type="button" class="btn btn-primary">新增房間</button>
      </div>
      <div class="row justify-content-end">
        <div class="table-responsive col-8">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th width="140">分類</th>
                <th width="180">產品名稱</th>
                <th width="140"></th>
                <th width="180">額外服務</th>
                <th width="140">原價</th>
                <th width="140">售價</th>
                <th width="180">設施服務</th>
                <th width="140">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in products" :key=" item.id">
                <th scope="row">{{item.category}}</th>
                <td>{{item.title}}</td>
                <td></td>
                <td></td>
                <td>{{item.origin_price}}</td>
                <td>{{item.price}}</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" disabled :checked="item.enabled" />
                    <span class="slider round"></span>
                  </label>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="openModal('edit', item)"
                      :disabled="loadingbtn === item.id"
                    >
                      加入
                      <span
                        class="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                        v-if="loadingbtn === item.id"
                      ></span>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="openModal('delete',item)"
                    >取消</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 分頁元件 -->
      <pagination class="justify-content-center" :pages="pagination" @update="getProducts"></pagination>
      <!-- 刪除元件 -->
      <DelProducts :temp-product="tempProduct" @delete="getProducts"></DelProducts>
    </div>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import DelProducts from '../../components/backend/DelProducts'

import $ from 'jquery'
export default {
  data () {
    return {
      isLoading: true,
      products: [],
      tempProduct: {
        imageUrl: []
      },
      pagination: [],
      loadingbtn: '',
      isNew: false,
      enabled: true
    }
  },
  components: {
    Pagination,
    DelProducts
  },
  methods: {
    getProducts (num = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        console.log(res)
        this.isLoading = false
        this.products = res.data.data
        this.pagination = res.data.meta.pagination
        if (this.tempProduct.id || this.isNew) {
          $('#productModal').modal('hide')
          $('#delProductModal').modal('hide')
          this.tempProduct = { imageUrl: [] }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    openModal (isNew, item) { //  判斷openModal
      switch (isNew) {
        case 'new': { //  若為new
          this.tempProduct = { imageUrl: [] }
          this.isNew = true
          $('#productModal').modal('show')
          break
        }
        case 'edit': {
          this.isNew = false
          this.loadingbtn = item.id
          const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}` //  取得單一筆資料
          this.$http.get(url)
            .then(res => {
              console.log(res)
              this.tempProduct = res.data.data
              $('#productModal').modal('show')
              this.loadingbtn = '' //  清除
            })
          break
        }
        case 'delete':
          $('#delProductModal').modal('show')
          this.tempProduct = Object.assign({}, item) //  淺層複製
          break
        default:
          break
      }
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
