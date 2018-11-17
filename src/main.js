import Vue from 'vue'
import App from './App'
import router from './router/router';
import VueRouter from 'vue-router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import store from "./store";
import './common/util/common.css'
import wxjs from './common/wx'
import 'assets/scss/iconfont/iconfont.css'
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)

Vue.use(Mint);
Vue.use(VueRouter)
// Vue.use(wxjs)
//开启debug模式
Vue.config.debug = true;
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // sessionStorage.setItem('businessId', 'hdl123')
    // sessionStorage.setItem('openid','oeeRzxLaCin4AcZ5_K7ie7S5KPng')
    // next()
    // sessionStorage.setItem('openid','oeeRzxLaCin4AcZ5_K7ie7S5KPng')
    // console.log('main')
    //微信授权登录
    let h = window.location.search
    if (h.indexOf('code=') >= 0) {
        var code = h.split('&')[0].split('=')[1]
        console.log('code: ' + code)
        sessionStorage.setItem('code', code)
    }
    // let code = sessionStorage.getItem('code')
    let openid = sessionStorage.getItem('openid')
    console.log('code: ' + code)
    // alert('openid:' + openid)
    if (!code && !openid) {
        let url = window.location.href
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx95721d88a471e1d1&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
    } else {
        console.log('getopenid1111')
        if (openid === null | openid === undefined | !openid) {
            console.log('getopenid')
            wxjs.getUserInfo(code)
        }
        next()
    }
})
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
