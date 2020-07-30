let obj = {
    data:{
        uuid:'805a8755-d565-473e-90ee-9d24771ddf47',
        products:[]
    },
    getData:function(){
        let vm = this;
        let url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`;
        axios
        .get(url)
        .then(function(res){
            vm.data.products = res.data.data;
            vm.render();
        })
        .catch(function(err){
            console.log('error',err);
        });
    },
    render:function(){
        let list = document.querySelector('.list');
        let products = this.data.products;
        let str ='';
        products.forEach(function(item){
            str +=`<li class="europe">
            <div class="top-content">
                <h2><a href="#">${item.title}</a></h2>
                <img src="${item.imageUrl[0]}" alt="">
                <p>${item.content}</p>
            </div>
            <div class="price">
                <span>特價$ ${item.price}</span>
                <span id= 'origin'>原價$ ${item.origin_price}</span>
            </div>
            </li>`;
        });
        list.innerHTML = str;
    }
};
obj.getData();
