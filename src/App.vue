<template lang="html">
    <div>
        <transition :name="transition">
            <!--<router-view class="router-view"></router-view>-->
            <router-view class="router-view" v-wechat-title="$route.meta.title"></router-view>
        </transition>

    </div>
</template>

<script>
    import "./assets/scss/animation.scss";
    import "./assets/scss/base.scss";
    import "./assets/scss/icon/iconfont.css";
    import wxjs from "./common/wx"

    export default {
        name: 'app',
        data() {
            return {
                transition: "slide-left"
            };
        },
        watch: {
            "$route"(to, from) {
                this.transition = this.checkDirecition(to.name, from.name) && "slide-left" || "slide-right";
            }
        },
        methods: {
            checkDirecition(to, from) {
                let map = ["index", "fanzone", "order", "personal", "business", "shop", "coupon", "couponDetails", "payment", "pay", "dynamic", "payment", "message", "updatePhone"];
                return (map.indexOf(to) - map.indexOf(from)) > 0;
            },
        },
        mounted() {
            console.log('app mouted')
            // let openid = sessionStorage.getItem('openid')
            // if(!openid){
            //     wxjs.getUserInfo(sessionStorage.getItem('code'))
            //     // sessionStorage.setItem('openid','oSLzr0WiGMQKOANwX8MI8aTfGGGY')
            //
            // }

        },
        created() {
            console.log('app created')
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/min.scss";

    body {
        background: #f7f7f7;
    }

    .router-view {
        width: 100%;
        position: absolute;
        -webkit-transition: all .9s cubic-bezier(.55, 0, .1, 1);
        -moz-transition: all .9s cubic-bezier(.55, 0, .1, 1);
        -ms-transition: all .9s cubic-bezier(.55, 0, .1, 1);
        -o-transition: all .9s cubic-bezier(.55, 0, .1, 1);
        transition: all .9s cubic-bezier(.55, 0, .1, 1);
    }
</style>
