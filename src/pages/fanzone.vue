/**
* ----------------------------------------------------------
* 活动列表
*
* @version  1.0
* @author shaqihe(shaqihecome@163.com)
*
* @module src/pages/happy
* ----------------------------------------------------------
*/
<template>
    <div class="page-happy page bg_ff">
        <!--<page-header :pageType="pageType" />-->
        <div style="height: 120px" class="bg_ff">
            <mt-swipe :auto="4000" class="swipe">
                <!--<mt-swipe-item class="swipe-item1"></mt-swipe-item>-->
                <!--<mt-swipe-item class="swipe-item2"></mt-swipe-item>-->
                <mt-swipe-item class="swipe-item3"><img src="../assets/images/hg.png"/></mt-swipe-item>
                <mt-swipe-item class="swipe-item3"><img src="../assets/images/hg.png"/></mt-swipe-item>
            </mt-swipe>
        </div>

        <!-- 首页列表 -->
        <nav class=" bg_ff" style="margin-top: 20px;height: 70px">
            <div class="text_align_center" style="width: 25%;float: left">
                <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                <div style="margin-top: 5px" class="name">预定</div>
            </div>
            <div @click="toGroupon()" class="text_align_center" style="width: 25%;float: left">
                <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                <div style="margin-top: 5px" class="name">拼团</div>
            </div>
            <div @click="toDynamic()" class="text_align_center" style="width: 25%;float: left">
                <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                <div style="margin-top: 5px" class="name">动态</div>
            </div>
            <div class="text_align_center" style="width: 25%;float: left" @click="toBuss()">
                <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                <div style="margin-top: 5px" class="name">全部</div>
            </div>
        </nav>
        <div class="bg_ff " style="height: 350px">
            <mt-cell style="font-weight: bold" title="推荐商家" :to="{name:'business'}" is-link>
                <span class="color_fanzone">更多</span>
            </mt-cell>
            <div class="buss col-6 bg_ff" style="" v-for="item in bussinessList.slice(0,4)"
                 @click="toShop(item.bussinessId,item.bussinessName)">
                <div style="padding-left:10px;padding-right: 10px;" class="bg_ff">
                    <img v-lazy="item.bussinessIcon" class="width_100"
                         style="height: 90px;">
                </div>
                <div class="" style="padding-left:10px;padding-right: 10px;margin-bottom: 10px">
                    <div class="bg_ff margin_top_10">
                        <div class="color_333 overflow-hide"
                             style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{item.bussinessName}}
                        </div>
                        <p class="fontsize_12 margin_top_5"
                           style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                            <span v-if="item.couponList.length>0" class="bg_groupon color_fff">券</span>
                            <span v-for="each in item.couponList" class="" style="display: inline">
                                {{each.couponPrice}}代{{each.couponPrice}};
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="bg_f0">
            <div style="height: 10px;width: 100%"></div>
            <div class="" style="margin-bottom: 2px">
                <mt-cell style="font-weight: bold;height: 48px;width: 100%" title="领优惠券" :to="{name:'coupon'}" is-link>
                    <span class="color_fanzone">更多</span>
                </mt-cell>
            </div>


            <li v-for="item in couponList" @click="toCouponDetail(item.bussinessDTO.bussinessId,item.couponId)">
                <coupon-temp :end-time="item.activityDurationEnd" :coupon-name="item.couponName"
                             :icon="item.couponIcon" :coupon-price="item.couponPrice"
                             :discount-price="item.discountPrice" :exp="item.useCondition"
                             :buss-name="item.bussinessDTO.bussinessName"
                ></coupon-temp>
            </li>
        </div>


        <!--<div class="customer">订单</div>-->
        <!--<load-more :loading="loading" @load="loadMore"/>-->
        <div style="font-size: 10px" class="color_999 text_align_center margin_top_15">-- 到底了哦 --</div>
        <div style="height: 60px;width: 100%"></div>
        <!--<Footer ref="footer"></Footer>-->
        <!--<go-top/>-->
    </div>

</template>

<script>

    import goTop from '../components/GoTop'
    import {HappyListCache} from '../cache/cache'
    import Footer from "../components/foot";
    import wxjs from "../common/wx"
    import {getAllGroupon, testPost, testPost1, testPost2, Fanzone} from "../api/api";
    import {Indicator, Toast, Lazyload} from 'mint-ui';
    import CouponTemp from "../components/coupon/couponTemp";

    export default {
        name: 'fanzone',
        data() {
            return {
                list: [1, 2, 3],
                businessId: 'hdl123',
                groupType: '0',
                grouponList: [],
                bussinessList: [],
                couponList: [],
                api: ''
            }
        },
        created() {
            // this.getHappyList();
            this.api = new Fanzone()
        },
        mounted() {
            // this.toFooter()
            // document.title = '聚汇'
            wxjs.wx_share('聚汇', '聚生活，汇服务', location.href)
            // this.businessId = sessionStorage.getItem('businessId')
            this.getAllBuss()
            this.getAllCoupon()
        },
        methods: {
            toFooter() {
                // alert('ss')
                this.$refs.footer.setSelected('fanzone');
            },
            getAllBuss() {
                let api = new Fanzone()
                Indicator.open('加载中...');
                api.getAllBuss().then((res) => {
                    if (res.data.code == '0') {
                        this.bussinessList = res.data.data.bussinessList;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            getAllCoupon() {
                Indicator.open('加载中...');
                this.api.getAllCoupon().then((res) => {
                    if (res.data.code == '0') {
                        this.couponList = res.data.data.allCouponList;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            toCouponDetail(businessId, couponId) {
                this.$router.push({
                    name: 'couponDetail',
                    path: '/couponDetail',
                    params: {'businessId': businessId, 'couponId': couponId}
                });
            },
            toBuss() {
                this.$router.push({name: 'business', path: '/business'});
            },
            toShop(businessId, businessName) {
                this.$router.push({
                    name: 'shop',
                    path: '/shop',
                    params: {'businessId': businessId, 'businessName': businessName}
                });
            },
            toDynamic() {
                this.$router.push({
                    name: 'dynamic',
                    path: '/dynamic'
                });
            },
            toGroupon() {
                // window.location.href='https://pintuan.fanzone.vip/groupon'
                this.$router.push({
                    name: 'groupon',
                    path: '/groupon'
                });
            }

        },
        components: {
            CouponTemp,
            Footer,
            goTop
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../assets/scss/min.scss";

    .page-happy {
        /*padding-top: px2rem(88)!important;*/
    }

    .mint-swipe {
        height: 120px;
    }

    .swipe {
        width: 100%;
        height: 120px;
        /*height: 100%;*/
        img {
            width: 100%;
            height: 150px;
        }
    }

    .swipe-item1 {
        height: 100%;
        width: 100%;
        background-image: url("http://image.so.com/v?q=%E7%81%AB%E9%94%85%E5%9B%BE%E7%89%87&src=tab_www&correct=%E7%81%AB%E9%94%85%E5%9B%BE%E7%89%87&cmsid=93351f969b85c1d10267cd1a66a34dbc&cmran=0&cmras=6&cn=0&gn=0&kn=50#multiple=0&gsrc=1&dataindex=184&id=c55f67e042c406c926d7aec6ee820f4c&prevsn=110&currsn=170&jdx=184&fsn=110");
    }

    .swipe-item2 {
        height: 100%;
        width: 100%;
        background-image: url("http://image.so.com/v?q=%E7%81%AB%E9%94%85%E5%9B%BE%E7%89%87&src=tab_www&correct=%E7%81%AB%E9%94%85%E5%9B%BE%E7%89%87&cmsid=93351f969b85c1d10267cd1a66a34dbc&cmran=0&cmras=6&cn=0&gn=0&kn=50#multiple=0&gsrc=1&dataindex=189&id=939dd707e08ae092399c855c074a1628&prevsn=110&currsn=170&jdx=189&fsn=110");
    }

    .page-happy－nav {
        margin-top: 20px;
        /*padding: 0 px2rem(40);*/
        height: px2rem(120);
        /*line-height: px2rem(88);*/
        background: #fff;
        border-top: 1px solid transparent;
        border-bottom: 1px solid #eaeaea;
        a {
            display: block;
            height: px2rem(88);
            line-height: px2rem(88);
            float: left;
            text-align: center;
            font-weight: 400;
            /*font-size: 14px;*/
            width: 49%;
            /*color: #333;*/
            &:hover {
                cursor: pointer;
            }
        }

        .activeType {
            cursor: pointer;
            border-bottom: 2px solid #ff9933;
            color: #ff9933;
        }
    }

    .happy-item {
        margin-top: 10px;
        /*background: #fff;*/
        padding: 0px 15px;

        .happy-item-title {
            padding-bottom: 18px;
            height: 40px;
            overflow: hidden;
            zoom: 1;
            img {
                width: 40px;
                height: 40px;
                border-radius: 40px;
                display: inline-block;
                float: left;
            }

            .happy-item-name {

                display: inline-block;
                width: 100px;
                height: 40px;
                float: left;
                color: #8F8F95;
                font-size: 16px;
                margin-left: 20px;
                line-height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .happy-item-content {
            border-radius: 20px;
            font-size: 16px;
            color: #464646;
            background: #ffffff;
            line-height: 150%;
            /*height: 250px;*/
            /*padding: 0 10px;*/
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            padding-bottom: 20px;
            img {
                /*margin-top: 10px;*/
                width: 100%;
                height: 160px;
                /*background-image: url("../assets/images/hgcp.jpg");*/
            }
        }

    }

    .buss {
        height: 150px;
        /*border-radius: 10px;*/
        /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);*/
        /*width: 33%;*/
        float: left;
        image[lazy=loading] {
            width: 100%;
            height: 100px;
            margin: auto;
        }
    }

    .overflow-hide {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>
