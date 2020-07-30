
var app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1586934917210,
                unit: '間',
                category: '雙人房',
                title: '溫馨的臥室',
                origin_price: 2000,
                price: 900,
                description: '想睡就睡',
                content: '就是要睡覺',
                is_enabled: 1,
                imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 55555444433,
                unit: '間',
                category: '單人房',
                title: '安靜的空間',
                origin_price: 1000,
                price: 500,
                description: '很適合冥想',
                content: '就是要一個人',
                is_enabled: 1,
                imageUrl: 'https://images.unsplash.com/photo-1584455333741-c8192566df82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            }],
        tempProduct: {},
    },
    methods: {
        getProducts(page = 1) {
            const vm = this;
            const api = `${apiPath}${uuid}/admin/storage/admin/ec/products?page=${page}`;
            //預設帶入token
            axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`;
            axios.get(api).then(function (res) {
                vm.products = res.data.data;//產品資料
                vm.pagination = res.data.meta.pagination;//頁籤資料
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        },
        updateData(){
            if(this.tempProduct.id){ //判斷暫存區有值
                let id = this.tempProduct.id; //宣告id 將暫存區資料傳入id
                console.log(this.tempProduct);//存到tempProduct暫存區
                let el;
                this.products.forEach((item,i)=>{ //一筆筆抓取products值
                    if(item.id ===id){            //若products 的id與暫存區一樣，
                        el =i;
                        // this.products[i] =this.tempProduct;      // 把暫存區資料傳入products
                    }
                    this.$set(this.products,el,this.tempProduct);
                });
        }else{                                   //判斷暫存區沒有值
            const id = new Date().getTime();    //unix timestamp 使用時間來作為 id
            this.tempProduct.id = id;           //將id 傳入暫存區
            this.products.push(this.tempProduct); //把暫存區資料 push到 products
        }
        this.tempProduct = {};                  //將暫存區清空
        $("#productModal").modal('hide');       //將 #productModal 隱藏
    },
    openModal(isNew,item){                      //判斷openModal
        switch (isNew) {
            case 'new':                         //若為new
                this.tempProduct = {};  //指向空物件，避免傳參考        
                $('#productModal').modal('show');
                break;
            case 'edit':
                this.tempProduct = Object.assign({}, item);//淺層複製
                $('#productModal').modal('show');
                break;
            case 'delete':
                $('#delProductModal').modal('show');
                this.tempProduct = Object.assign({}, item);//淺層複製
                break;
            default:
                break;
        }
    },
    delProduct() {//刪除資料
        if (this.tempProduct.id) {
            const id = this.tempProduct.id;
            this.products.forEach((item, i) => {
                if (item.id === id) {
                    this.products.splice(i, 1);
                    this.tempProduct = {};
                }
            });
        }
        $('#delProductModal').modal('hide');
    },
},
});
