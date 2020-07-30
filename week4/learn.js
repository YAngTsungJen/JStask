//pagination
import pagination from './pagination.js';
import model from './model.js';
import model2 from './model2.js';

//全域註冊
Vue.component('pagination',pagination);
Vue.component('model',model);
Vue.component('model2',model2);


var app = new Vue({
    el: '#app',
    data: {  //資料結構定義出來
        products: [],
        tempProduct: {
            imageUrl:[],
        },
        pagination:{},
        token:'',
        api:{
            uuid:'805a8755-d565-473e-90ee-9d24771ddf47',
            apiPath:'https://course-ec-api.hexschool.io/api/',
        },
        loadingbtn:'',
        isNew: false,
        enabled: true,
    },
    methods:{
        getProducts(num = 1){
            console.log(num);
            const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(url).then(res => {
                console.log(res);
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;

                if(this.tempProduct.id ||this.isNew){
                    $('#productModal').modal('hide');
                    $('#delProductModal').modal('hide');
                    this.tempProduct = {imageUrl:[],};
                }
            });
        },
        signout() {
            document.cookie = `token =; expires =`;
            window.location = 'login.html';
        },
        delProduct() {}, //刪除資料
        updateData(){},
        openModal(isNew,item){                      //判斷openModal
        switch (isNew) {
            case 'new':                      //若為new
                this.tempProduct = {imageUrl:[]}; 
                this.isNew = true;         
                $('#productModal').modal('show');
                break;
            case 'edit':
                this.isNew = false;
                this.loadingbtn = item.id;
                const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/product/${item.id}`;//取得單一筆資料
                axios.get(url)
                .then(res => {
                    console.log(res);
                    this.tempProduct = res.data.data;
                    $('#productModal').modal('show');
                    this.loadingbtn = '';//清除
                });
                break;
            case 'delete':
                $('#delProductModal').modal('show');
                this.tempProduct = Object.assign({}, item);//淺層複製
                break;
            default:
                break;
        }
    },
    },
    created(){ //使用token做驗證
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)iscookie\s*=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.getProducts();
    },
});


