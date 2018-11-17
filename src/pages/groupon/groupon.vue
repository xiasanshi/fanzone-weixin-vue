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
        <div style="height: 120px">
            <mt-swipe :auto="4000" class="swipe">
                <!--<mt-swipe-item class="swipe-item1"></mt-swipe-item>-->
                <!--<mt-swipe-item class="swipe-item2"></mt-swipe-item>-->
                <mt-swipe-item class="swipe-item3"><img src="../../assets/images/hg.png"/></mt-swipe-item>
                <mt-swipe-item class="swipe-item3"><img src="../../assets/images/hg.png"/></mt-swipe-item>
            </mt-swipe>
        </div>

        <!-- 首页列表 -->
        <!--<nav class="page-happy－nav">
            <div class="top-bar" style="height: 40px;font-size: 18px;">
                <a @click="changeType('0')" :class="{activeType: groupType == '0' }">
                    <span>全民参与</span>
                </a>
                <a @click="changeType('1')" :class="{activeType: groupType == '1' }">
                    <span>老带新团</span>
                </a>
            </div>
        </nav>-->
        <ul class="posts-list">
            <li v-for="item in grouponList" class="happy-item">

                <!--<div class="happy-item-title">-->
                <!--<img :src="randomImg()">-->
                <!--<p class="happy-item-name">-->
                <!--{{randomFont()}}-->
                <!--</p>-->
                <!--</div>-->
                <div class="happy-item-content margin_top_15">
                    <!--{{item.content}}-->
                    <!--<img :src="item.url" v-show='item.url'>-->
                    <!--<div class="img"></div>-->
                    <img slot="icon" style="border-radius: 20px 20px 0 0" :src="item.imgId"/>
                    <br/>
                    <div style="position: relative" class="padding_15">
                        <div>
                            <span style="font-size: 18px;color: #333333">{{item.name}} | {{item.option}}</span>
                        </div>
                        <div style="margin-top: 5px">
                            <span style="font-size: 20px;color: #FF0000">￥{{item.activityPrice}}</span>
                            <s>￥{{item.salePrice}}</s>
                            <div style="background-color: #FF0000;color:#ffffff;text-align: center;font-size: 10px;float: left;left: 50px;height: 20px;line-height: 20px;min-width: 30px">
                                {{item.grouponNum}}人团
                            </div>
                        </div>
                        <div @click="toGroupon(item.id)"
                             style="position: absolute;bottom: 1px;right: 10px;height: 30px;padding: 5px;color: #ffffff;background-color: #FF9933;text-align: center;line-height: 30px;font-size: 16px;border-radius: 5px">
                            去开团
                        </div>
                    </div>


                </div>
            </li>
        </ul>
        <!--<div class="order">订单</div>-->
        <!--<load-more :loading="loading" @load="loadMore"/>-->
        <div style="font-size: 10px" class="color_999 text_align_center margin_top_15">-- 到底了哦 --</div>
        <div style="height: 50px;width: 100%"></div>
        <!--<Footer ref="footer"></Footer>-->
        <!--<go-top/>-->
    </div>

</template>

<script>

    import goTop from '../../components/GoTop'
    // import {HappyListCache} from '../../../cache/cache'
    // import Footer from "../../components/foot";
    import wxjs from "../../common/wx"
    import {getAllGroupon, testPost, testPost1, testPost2} from "../../api/api";
    import {Indicator, Toast} from 'mint-ui';

    export default {
        name: 'groupon',
        data() {
            return {
                list: [1, 2, 3],
                businessId: 'hdl123',
                groupType: '0',
                grouponList: [],

            }
        },
        created() {
            // this.getHappyList();
        },
        mounted() {
            // this.toFooter()
            document.title = '聚汇 - 拼团'
            wxjs.wx_share('聚汇 - 拼团', '低价拼团', location.href)
            this.businessId = sessionStorage.getItem('businessId')
            this.getAllGroupon()
            /* let p = {
                 "button": [
                     {
                         "type": "view",
                         "name": "首页",
                         "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfb1bdfe740746055&redirect_uri=http://pi//://pintuan.fanzone.vip&res&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
                     },
                     {
                         "type": "view",
                         "name": "我的订单",
                         "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfb1bdfe740746055&redirect_uri=http://pi//://pintuan.fanzone.vip/order&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
                     }
                 ]
             };

             let para = {'menuJson':JSON.stringify(p)}
             let para1 = {'menuJson':p}
             console.log(para['menuJson'])
             testPost(para).then()
             // testPost(para).then()
             testPost1(para).then()
             testPost2(para).then()
             testPost1(para1).then()
             testPost2(para1).then()*/
        },
        methods: {
            toFooter() {
                // alert('ss')
                this.$refs.footer.setSelected('groupon');
            },
            toGroupon(id) {
                Toast("还未开放，敬请期待")
                // this.$router.push({name: 'preGroupon', path: '/preGroupon', params: {'id': id}});
            },
            changeType(val) {
                // this.css.color
                // alert(val)
                this.groupType = val;
                this.getAllGroupon()
                // this.page = 1;
            },
            getAllGroupon() {
                // let param = {'businessId':this.businessId,'groupType':this.groupType}
                let param = {'size': 1, 'page': 1}
                Indicator.open('加载中...');
                getAllGroupon(param).then((res) => {
                    // alert('ddd')
                    if (res.data.code == '2000') {
                        this.grouponList = res.data.data.content;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
                Indicator.close()
            }
        },
        components: {
            goTop
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../assets/scss/min.scss";

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
        padding: 0 px2rem(40);
        height: px2rem(88);
        line-height: px2rem(88);
        background: #fff;
        border-top: 1px solid transparent;
        border-bottom: 1px solid #eaeaea;
        a {
            display: block;
            height: px2rem(88);
            /*line-height: px2rem(88);*/
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

    .order {

    }
</style>
