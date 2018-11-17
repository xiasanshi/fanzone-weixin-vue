/**
* ----------------------------------------------------------
* 商家
*
* @version  1.0
* @author xialei
*
* @module src/pages/shop
* ----------------------------------------------------------
*/
<template>
    <div class="page-happy page bg_ff">
        <!--<page-header :pageType="pageType" />-->
        <div style="height: 150px" class="bg_ff position_re">
            <mt-swipe :auto="4000" class="swipe">
                <!--<mt-swipe-item class="swipe-item1"></mt-swipe-item>-->
                <!--<mt-swipe-item class="swipe-item2"></mt-swipe-item>-->
                <mt-swipe-item class="swipe-item3"><img :src="bussinessInfo.bussinessIcon"/></mt-swipe-item>
                <!--<mt-swipe-item class="swipe-item3"><img src="../assets/images/hg.png"/></mt-swipe-item>-->
            </mt-swipe>

            <a v-bind:href="bussinessInfo.bussinessWechatUrl | filt_link"
               class="position_ab text_align_center width_100 overflow-hide1"
               style="display: block; background-color: rgba(205,201,201,0.6);bottom: 0;height: 40px;line-height: 40px;text-decoration: none">
                <span class="color_fff">{{bussinessInfo.bussinessName}}</span> <span style="display: inline;"
                                                                                     class="color_fff">关注公众号</span>
            </a>
        </div>
        <div class="buss_middle bg_ff">
            <div class="left_middle" style="line-height: 30px">
                <a v-bind:href="bussinessInfo.bussinessPosition">
                    <div class="" style="line-height: 30px;float: left;width: 25px">
                        <span class="icon_common icon iconfont icon-weizhi"
                              style="width: 100%;font-size: 25px"></span>
                    </div>
                    <div class="" style="line-height: 30px;float: left">
                        <span style=""> {{bussinessInfo.bussinessAddress}}</span>
                    </div>
                </a>
            </div>
            <div class="right_middle text_align_center" style="line-height: 30px">
                <a v-bind:href="'tel:'+bussinessInfo.telephone">
                    <span class="icon_common icon iconfont icon-dianhua2" style="width: 100%;font-size: 25px"></span>
                </a>
            </div>
        </div>
        <div class="bg_f0" style="width: 100%;height: 1px"></div>
        <!-- 首页列表 -->
        <nav class="page-happy－nav1 bg_ff color_666" style="height: 50px;margin-top: 20px;"
             v-if="bussinessInfo.businessUrl!==null">
            <a class="color_666" v-bind:href="bussinessInfo.businessUrl.orderUrl | filt_link">
                <div class="text_align_center" style="width: 20%;float: left">
                    <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                    <div style="margin-top: 5px" class="name">预定</div>
                </div>
            </a>
            <a class="color_666" v-bind:href="bussinessInfo.businessUrl.takeoutUrl | filt_link">
                <div class="text_align_center" style="width: 20%;float: left">
                    <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                    <div style="margin-top: 5px" class="name">外卖</div>
                </div>
            </a>
            <a class="color_666" v-bind:href="bussinessInfo.businessUrl.reserveUrl | filt_link">
                <div class="text_align_center" style="width: 20%;float: left">
                    <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                    <div style="margin-top: 5px" class="name">点餐</div>
                </div>
            </a>
            <a class="color_666" v-bind:href="bussinessInfo.businessUrl.queueUrl | filt_link">
                <div class="text_align_center" style="width: 20%;float: left" @click="toBuss()">
                    <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                    <div style="margin-top: 5px" class="name">排队</div>
                </div>
            </a>
            <a class="color_666">
                <div class="text_align_center" style="width: 20%;float: left" @click="toPay()">
                    <span class="icon_common icon iconfont icon-youhuiquan" style="width: 100%;font-size: 30px"></span>
                    <div style="margin-top: 5px" class="name">支付</div>
                </div>
            </a>
        </nav>
        <div class="bg_f0">
            <div style="height: 10px;width: 100%"></div>
            <div class="" style="margin-bottom: 2px">
                <mt-cell style="font-weight: bold;height: 48px;width: 100%" title="优惠信息">
                </mt-cell>
            </div>
            <li v-for="item in couponList" @click="toCouponDetail(bussinessInfo.bussinessId,item.couponId)">
                <coupon-temp :end-time="item.activityDurationEnd" :coupon-name="item.couponName"
                             :icon="item.couponIcon" :coupon-price="item.couponPrice"
                             :discount-price="item.discountPrice" :exp="item.useCondition"
                             :buss-name="bussinessInfo.bussinessName"
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
    import {getAllGrouponByBusinessId, testPost, testPost1, testPost2, Fanzone} from "../api/api";
    import {Indicator, Toast, Lazyload} from 'mint-ui';
    import CouponTemp from "../components/coupon/couponTemp";

    export default {
        name: 'shop',
        data() {
            return {
                list: [1, 2, 3],
                businessId: '',
                groupType: '0',
                grouponList: [],
                bussinessInfo: {},
                couponList: [],
                api: '',
                // businessName:''
            }
        },
        created() {
            // this.getHappyList();
            this.api = new Fanzone()
        },
        filters: {
            filt_link(value) {
                if (!value | value == undefined | value == null | value == '') {
                    return 'http://wx.qingzhao.net.cn/wx/null.html'
                }
                return value
            }
        },
        mounted() {
            // this.toFooter()
            // this.businessName = this.$route.params.businessName;

            this.businessId = this.$route.params.businessId;
            this.getAllCouponByBusinessId()
            document.title = '聚汇 - 商家'

            // this.businessId = sessionStorage.getItem('businessId')
            // this.getAllBuss()

        },
        methods: {
            toFooter() {
                // alert('ss')
                this.$refs.footer.setSelected('fanzone');
            },
            getAllCouponByBusinessId() {
                let para = {'bussinessId': this.businessId}
                Indicator.open('加载中...');
                this.api.getCouponByBusinessId(para).then((res) => {
                    if (res.data.code == '0') {
                        this.couponList = res.data.data.bussinessItemCouponList[0].couponList;
                        console.log(this.couponList)
                        this.bussinessInfo = res.data.data.bussinessItemCouponList[0]
                        console.log(this.bussinessInfo)
                        console.log("businessName: " + this.bussinessInfo.bussinessName)
                        wxjs.wx_share('聚汇 - ' + this.bussinessInfo.bussinessName, '聚生活，汇服务', location.href)
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
            getAllGroupon() {
                let param = {'businessId': this.businessId, 'groupType': 1}
                // let param = {'size': 100, 'page': 1}
                Indicator.open('加载中...');
                getAllGrouponByBusinessId(param).then((res) => {
                    // alert('ddd')
                    if (res.data.code == '2000') {
                        this.grouponList = res.data.data;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
                Indicator.close()
            },
            toPay() {
                this.$router.push({
                    name: 'pay',
                    path: '/pay',
                    params: {'businessId': this.businessId}
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

    page-happy－nav1 {
        margin-top: 20px;
        /*padding: 0 px2rem(40);*/
        height: px2rem(120);
        /*line-height: px2rem(88);*/
        background: #fff;
        border-top: 1px solid transparent;
        border-bottom: 1px solid #eaeaea;
        a {
            /*display: block;*/
            /*height: px2rem(88);*/
            /*line-height: px2rem(88);*/
            /*float: left;*/
            /*text-align: center;*/
            /*font-weight: 400;*/
            /*font-size: 14px;*/
            /*width: 49%;*/
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

    .buss_middle {
        width: 100%;
        height: 30px;
    }

    .buss_middle a img {
        float: left;
        width: 15px;
        padding: 0;
        overflow: hidden;
        margin-top: 6px;
    }

    .buss_middle img {
        width: 20px;
        padding: 0;
        overflow: hidden;
        margin-top: 7px;
    }

    .buss_middle a > div {
        float: left;
        text-decoration: none;
        color: #444444;
        line-height: 30px;
    }

    .left_middle {
        margin: auto;
        width: 90%;
        float: left;
        height: 100%;
    }

    .right_middle {
        float: left;
        width: 10%;
        height: 100%;
    }
</style>
