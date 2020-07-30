new Vue({
    el: '#app',
    data:{
        user: {
            email: '',
            password: '',
        },
        apiPath:'https://course-ec-api.hexschool.io/api/',
    },
    //取得
    methods: {
        signin() {
            const api = `${this.apiPath}auth/login`;// api伺服器
            axios.post(api, this.user).then(function (res) { //抓 api撈email和 password
                    console.log(res);
                    const token = res.data.token; //定義 token
                    const expired = res.data.expired; //定義 到期日
                    //token 存取cookie
                    document.cookie = `iscookie = ${token}; expires = ${new Date(expired * 1000)}; path=/`;
                    window.location = 'learn.html';
                    //不能移到 post 外面，因為非同步的觀念，會變成先轉址，在執行post
                })
                .catch((error)=>console.log(error));
        },
        signout() {
            document.cookie = `token =; expires =`;
        },
    },
});       

