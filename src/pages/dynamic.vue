<template>
    <div class="bg_f0">
        <mt-header title="商家动态">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>

        <div class="bg_ff" style="height: 80px;margin-bottom: 2px;padding: 5px" v-for="item in dynamicInfoList">
            <a v-bind:href="item.dynamicUrl" style="text-decoration: none;display: block">
                <div class="float_left">
                    <img :src="item.dynamicIcon | formatImg" class="coupon-img"/>
                </div>
                <div class="float_left" style="margin-left: 5px;">
                    <div class="fontsize_16 color_333 overflow-hide"
                         style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                        {{item.dynamicMsg}}
                    </div>
                    <div>{{item.bussinessName}}</div>
                </div>
            </a>

        </div>
    </div>
</template>

<script>
    import {Fanzone} from "../api/api";
    import wxjs from "../common/wx";
    import {Indicator, Toast, Lazyload} from 'mint-ui';

    export default {
        name: "dynamic",
        data() {
            return {
                dynamicInfoList: [],
            }
        },
        methods: {
            getDynamic() {
                let api = new Fanzone()
                Indicator.open('加载中...');
                api.getDynamic().then((res) => {
                    if (res.data.code == '0') {
                        this.dynamicInfoList = res.data.data.dynamicInfoList;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            }
        },
        mounted() {
            document.title = "商家动态"
            this.getDynamic()
            wxjs.wx_share('聚汇', '聚生活，汇服务', location.href)
        },
        filters:{
            formatImg(url){
                if(url===null | url==='' | !url){
                    return 'http://weixin.fanzone.vip/favicon.ico'
                }
                return url
            }
        }
    }
</script>

<style scoped>

</style>
