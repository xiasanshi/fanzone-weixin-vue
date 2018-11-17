/**
* ----------------------------------------------------------
* 发起拼团页面
*
* @version  1.0
* @author shaqihe(shaqihecome@163.com)
*
* @module src/pages/weather
* ----------------------------------------------------------
*/
<template>
    <div class="page-weather page" style="height: 100%">
        <!--<page-header :pageType="pageType" />-->
        <mt-swipe :auto="4000" class="swipe" style="height: 180px;width: 100%">
            <!--<mt-swipe-item class="swipe-item1"></mt-swipe-item>-->
            <!--<mt-swipe-item class="swipe-item2"></mt-swipe-item>-->
            <mt-swipe-item class="swipe-item3" style="height: 180px;width: 100%"><img style="height: 180px;width: 100%"
                                                                                      src="../assets/images/hgcp.jpg"/>
            </mt-swipe-item>
        </mt-swipe>
        <div style="margin-top: 0px;">
            <div class="explain_info" style="background-color: #ffffff;padding: 10px">
                <div style="color: #333333;font-size: 16px"> &nbsp{{detail.option}} | {{detail.name}}</div>
                <div style="color: #FF0000;">
                    {{detail.groupType | formatGroupType}}
                    <!--<span></span>【老带新团】老用户可开团，新用户可参团/开团-->
                </div>
                <div style="color: #999999;">* 说明：需进店消费，核销</div>
                <div>
                    <span style="font-size: 18px;color: #FF0000">￥{{detail.activityPrice}}</span>
                    <s style="font-size: 14px;color: #999999">￥{{detail.salePrice}}</s>
                </div>
            </div>
            <div class="explain_info color_999" style="background-color: #EEFCEE;padding: 10px">
                <div style="color: #333333;font-size: 16px"> *拼团玩法</div>
                <div style="">1、选择商品，开团或拼团</div>
                <div style="">2、付款后邀请好友参团</div>
                <div style="">3、达到拼团人数，顺利开团</div>
                <div style="">4、若{{detail.grouponEffectiveTime}}小时内拼团不成功，全额退款</div>
            </div>
            <div class="explain_info" style="background-color: #ffffff;padding: 10px"
                 v-if="teamMap!==null">
                <div>
                    <mt-cell title="正在进行的拼团" :to="{name:'join'}" is-link>
                        <span class="color_groupon">更多</span>
                    </mt-cell>
                </div>
                <div class="pd_title" @click="toJoin(teamMap.id)">
                    <!--<img src="../assets/images/10.jpg">-->
                    <head-url :join-list="teamMap.joins"
                              style="width: 40px; height: 40px;border-radius: 40px;display: inline-block;float: left;"></head-url>
                    &nbsp;&nbsp;
                    <span style="font-size: 16px;color: #666666">{{teamMap.joins | formatCreate}}</span>&nbsp;
                    <span style="font-size: 10px;padding: 5px" class="color_groupon">{{teamMap.grouponNum}}人团</span>
                    <div style="font-size: 12px;color: #999999">
                        &nbsp;&nbsp;&nbsp;<span>还差</span><span
                            style="color: #ff0000">{{teamMap.joins | formatPeopCount(teamMap.grouponNum)}}</span><span>人开团</span>&nbsp;
                        <!--剩余<span>{{teamMap.endTime}}</span>-->
                        <!--{{teamMap.endTime}}-->
                        <div style="display: inline">
                            <count-down class="" :endTime="teamMap.endTime" endText="已经结束了"></count-down>
                        </div>
                    </div>
                    <div style="color: #ffffff;background-color: #FF9933;padding: 5px;font-size: 16px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: 1px;bottom: 20px">
                        {{teamMap.teamPrice}}元拼团
                    </div>
                </div>
            </div>
        </div>
        <div style="height: 50px"></div>
        <div style="position: fixed;bottom: 0px;height: 50px;background-color: #ffffff;width: 100%;text-align: center;line-height: 50px;border-top: #cccccc 1px">
            <div style="float: left;line-height: 50px;text-align: center;width: 40%;height: 50px;color: #FF0000;font-size: 25px">
                ￥{{detail.activityPrice}}
            </div>
            <div @click="toPay()"
                 style="float: left;height: 50px;background-color: #FF9933;color: #ffffff;line-height: 50px;text-align: center;width: 60%">
                发起拼团
            </div>
        </div>
        <to-home></to-home>
        <div style="height: 50px;width: 100%"></div>
    </div>
</template>

<script>
    import {getGrouponDetails, createPreGroupon, getTeamListByGroupId} from '../api/api'
    import countDown from '../components/countDown'
    import headUrl from '../components/headUrl'
    import citySelect from '../components/CitySelect';
    import {Indicator, Toast} from 'mint-ui';
    import wxjs from "../common/wx"
    import ToHome from "../components/toHome";

    export default {
        name: 'weather',
        data() {
            return {
                groupId: '',
                detail: {},
                teamMap: null
            }
        },
        components: {
            ToHome,
            citySelect, countDown, headUrl,
        },
        created() {
            // this.getWeather();
            console.log('created')
            this.groupId = this.$route.params.id;
            this.getTeamListByGroupId();
            console.log("ddddd")
        },
        mounted() {
            console.log('cmounted')
            document.title = '聚汇 - 开团';
            this.getGrouponDetails();
            wxjs.wx_share('聚汇 - 开团', '低价拼团', location.href)
        },
        methods: {
            toJoin(id) {
                this.$router.push({name: 'preJoin', path: '/preJoin', params: {'id': id}});
            },
            getGrouponDetails() {
                let param = {'grouponId': this.groupId}
                Indicator.open('加载中...');
                getGrouponDetails(param).then((res) => {
                    if (res.data.code == '2000') {
                        this.detail = res.data.data;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
                Indicator.close()
            },
            toPay() {
                wxjs.payPrepare()
                console.log("========开团========")
                sessionStorage.setItem('payType','Fanzone')
                sessionStorage.setItem('detail',JSON.stringify(this.detail))
                this.$router.push({name: 'payment', path: '/payment'});
                // let openid = sessionStorage.getItem('openid')
                // let param = {'grouponId': this.groupId, 'openid': openid}
                // Indicator.open('加载中...');
                // createPreGroupon(param).then((res) => {
                //     if (res.data.code == '2000') {
                //         // this.detail = res.data.data;
                //         let pay = res.data.data;
                //         this.onBridgeReady(pay.appId, pay.timeStamp, pay.nonceStr, pay.packAge, pay.paySign, location.href)
                //         Toast('提交成功');
                //         Indicator.close()
                //     } else {
                //         Toast(res.msg);
                //         Indicator.close();
                //     }
                // })
                // Indicator.close()
            },
            getTeamListByGroupId() {
                let param = {'grouponId': this.groupId}
                Indicator.open('加载中...');
                getTeamListByGroupId(param).then((res) => {
                    if (res.data.code == '2000') {
                        if (res.data.data === null) {
                            this.teamMap = res.data.data;
                        } else {
                            this.teamMap = res.data.data[0]
                            console.log("数据加载结束")
                        }
                        Indicator.close()
                    } else {
                        Indicator.close();
                        // Toast(res.data.msg);
                    }
                })
                // Indicator.close()
            },
            onBridgeReady: function (appId, timeStamp, nonceStr, pack, paySign, returnUrl) {
                console.log(appId + "\t" + timeStamp + "\t" + nonceStr + "\t" + pack + "\t" + paySign + "\t" + returnUrl)
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": appId, //公众号名称，由商户传入
                        "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
                        "nonceStr": nonceStr, //随机串
                        "package": pack,
                        "signType": "MD5", //微信签名方式：
                        "paySign": paySign //微信签名
                    },
                    function (res) {
                        //					alert(res[2])
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            pay()
                        } else {
                            // $("#submit").attr("disabled", false)
                            // $("#submit").css("background", "#28d2d7")
                            location.reload()
                        }

                    }
                );
            }

        },
        watch: {
            "$route"(to, from) {
                // alert('xx')
                let name = to.id
                // alert(name)
                console.log(name)
            }
        },
        filters: {
            formatGroupType: function (val) {
                return val == '0' ? '【全民参与】' : '【老带新团】老用户可开团，新用户可参团/开团'
            },
            formatTime: function (val) {
                let t = new Date(val);
                return t.getTime()
            },
            formatPeopCount: function (joins, num) {
                console.log("---------joins-------------")
                console.log(joins)
                for (let each in joins) {
                    if (joins[each].status !== 'FAIL') {
                        num = num - 1
                    }
                }
                return num
            },
            formatCreate: function (joins) {
                for (let each in joins) {
                    if (joins[each].isCreator) {
                        return joins[each].userName
                    }
                }
                return null
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../assets/scss/min.scss";

    .page-weather {
        /*padding-top: px2rem(88)!important;*/
        height: 100%;
        /*background-image: -webkit-linear-gradient(top,#0c264d 0%,#205d91 60%,#2568a1 100%);*/
        .page-weather-content {
            padding: px2rem(32) 0;
        }
    }

    .explain_info > div {
        margin-top: 10px;
    }

    .pd_title {
        padding-bottom: 18px;
        height: 40px;
        overflow: hidden;
        zoom: 1;
        position: relative;
        img {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            display: inline-block;
            float: left;
        }

        .pd-item-name {

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
</style>
