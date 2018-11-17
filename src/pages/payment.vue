<template>
    <div class="page page-music" style="height: 100%">
        <div style="flex: 1;height: 100%">
            <coupon-temp :end-time="couponDetail.activityDurationEnd" :coupon-name="couponDetail.couponName"
                         :icon="couponDetail.couponIcon" :coupon-price="couponDetail.couponPrice"
                         :discount-price="couponDetail.discountPrice" :exp="couponDetail.useCondition"
                         :buss-name="couponDetail.bussinessDTO.bussinessName" :show-date="'false'"
                         :ex-text="''"></coupon-temp>

            <div class="reminder width100 bg_ff">
                <div class="reminder_head">
                    购买须知：
                </div>
                <div class="">
                    <ul>
                        <li>活动时间</li>
                        <li>{{couponDetail.activityDurationStart | formatDate}}至{{couponDetail.activityDurationEnd |
                            formatDate}}
                        </li>
                        <li>消费截至时间</li>
                        <li>{{couponDetail.useDurationEnd | formatDate}}</li>
                        <li>营业时间</li>
                        <li>9：00至22：00</li>
                        <li>注意事项</li>
                        <li>{{couponDetail.useCondition}} |
                            最多领取{{couponDetail.couponNumLimit | formatNum}}张
                        </li>
                    </ul>
                </div>
            </div>
            <div class="margin_top_10">
                <mt-cell :title="userInfo.handPhone | formatPhone" :to="{name:'updatePhone'}"
                         is-link :value="userInfo.handPhone"></mt-cell>
            </div>
            <to-home></to-home>
            <div class="phone_num" id="phone_num" @click="close_share()">
                <img src="../assets/images/icon/share10.png" width="100%"/>
            </div>
        </div>
        <div @click="toPay()" class="width_100 position_fix height_50 bg_groupon text_align_center"
             style="bottom: 0;color: #ffffff;line-height: 50px">
            微信支付 ￥{{couponDetail.couponPrice}}
        </div>
    </div>

</template>

<script>
    import {Indicator, Toast, MessageBox} from 'mint-ui';
    import wxjs from "../common/wx";
    import {joinTeam, createPreGroupon, Fanzone} from "../api/api";
    import ToHome from "../components/toHome";
    import CouponTemp from "../components/coupon/couponTemp";


    export default {
        name: "payment",
        components: {CouponTemp, ToHome},
        data() {
            return {
                couponDetail: {},
                userInfo: {},


            }
        },
        comments: {},
        methods: {
            close_share() {
                document.getElementById('phone_num').style.display = 'none';
            },
            toGroupon() {
                // alert('ss')
                document.getElementById('phone_num').style.display = 'block';
                let url = location.href.replace('/payment', '/preJoin/') + this.teamId
                wxjs.wx_share('聚汇 - 拼团', '夏磊邀请你参加' + this.couponDetail.couponName, url)
            },
            toPay() {
                wxjs.payPrepare();
                // let openid = sessionStorage.getItem('openid');
                // alert(openid)
                let api1 = new Fanzone()
                if (this.userInfo.handPhone && this.userInfo.handPhone !== null && this.userInfo.handPhone.length === 11) {
                    let param = {
                        'couponId': this.couponDetail.couponId,
                        'couponNum': 1,
                        'buyerOpenid': sessionStorage.getItem('openid'),
                        'buyerPhone': this.userInfo.handPhone,
                        'buyerName': this.userInfo.userName,
                        'couponPrice': this.couponDetail.couponPrice,
                        'orderAmount': this.couponDetail.couponPrice,
                        'returnUrl': 'xxx'
                    }
                    Indicator.open('加载中...');
                    api1.payment(param).then((res) => {
                        if (res.data.code == 0) {
                            this.prePayBill = res.data.data;
                            Indicator.close()
                            if (this.couponDetail.couponPrice & this.prePayBill.success == "领取成功") {
                                MessageBox.confirm('领取成功，点击确定查看优惠券').then(action => {
                                    setTimeout(() => {
                                        // window.location.href = window.location.href.replace('payment', 'preJoin/' + this.teamId)
                                        this.$router.push({name: 'order', path: '/order'});
                                    }, 500);
                                });
                            } else {
                                this.onBridgeReady(this.prePayBill.appId, this.prePayBill.timeStamp, this.prePayBill.nonceStr, this.prePayBill.packAge, this.prePayBill.paySign, location.href)
                            }

                        } else {
                            Toast(res.data.msg);
                            Indicator.close();
                            return
                        }
                    })
                    // Indicator.close()
                } else {
                    Toast('发起支付失败，请稍后重试！');
                    MessageBox.confirm('点击确定添加手机号').then(action => {
                        this.$router.push({name: 'updatePhone', path: '/updatePhone'});
                    });
                    return
                }
                Indicator.close();
                console.log(this.prePayBill)
                console.log("===================pay")
                // this.onBridgeReady(this.prePayBill.appId, this.prePayBill.timeStamp, this.prePayBill.nonceStr, this.prePayBill.packAge, this.prePayBill.paySign, location.href)
            },
            onBridgeReady: function (appId, timeStamp, nonceStr, pack, paySign, returnUrl) {
                console.log(appId + "\t" + timeStamp + "\t" + nonceStr + "\t" + pack + "\t" + paySign + "\t" + returnUrl)
                let self = returnUrl
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
                            MessageBox.confirm('支付成功，点击确定查看优惠券').then(action => {
                                // self.$router.push({ name: 'preJoin',path:'/preJoin',params:{'id':self.teamId}});

                                setTimeout(() => {
                                    // window.location.href = window.location.href.replace('payment', 'preJoin/' + this.teamId)
                                    self.$router.push({name: 'order', path: '/order'});
                                }, 500);
                            });
                        } else {
                            Toast('支付失败');
                            // alert(returnUrl.teamId)
                            self.$router.push({
                                name: 'couponDetail',
                                path: '/couponDetail',
                                params: {'businessId': businessId, 'couponId': couponId, 'fail': 'yes'}
                            });
                            // location.reload()
                        }

                    }
                );
            }
        },
        mounted() {
            document.title = '支付订单'
            this.type = sessionStorage.getItem('payType')
            if(!sessionStorage.getItem('couponDetail') && sessionStorage.getItem('couponDetail')==null){
                // Toast('当前页面不存在')
                this.$router.push({name: 'fanzone', path: '/fanzone'});
            }
            this.couponDetail = JSON.parse(sessionStorage.getItem('couponDetail'))
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            wxjs.wx_share('聚汇 - ' + this.couponDetail.couponName, '聚生活，汇服务', location.href.replace('payment','couponDetail')+'/'+this.couponDetail.bussinessDTO.bussinessId +'/'+this.couponDetail.couponId)
            // this.extractTime()
            // const _this = this
        },
        filters: {
            formatDate(time) {
                return wxjs.formatDate(time)
            },
            formatPhone(phone) {
                return phone == null ? '绑定手机号' : phone == '' ? '绑定手机号' : '修改手机号'
            },
            formatNum(num) {
                return num == '' ? 1 : num == null ? 1 : num
            }
        },
        watch: {}
    }
</script>

<style scoped>
    .phone_num {
        z-index: 99;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(204, 204, 204, 0.5);
        padding: 10px;
    }

    .reminder {
        padding: 10px;
        margin-top: 10px;
    }

    .reminder div:nth-child(1) {
        border-bottom: 1px solid #CCCCCC;
        height: 30px;
        line-height: 30px;
    }

    .reminder ul {
        padding: 0 10px;
        margin: 5px 15px;
    }

    .reminder ul > li {
        margin-top: 4px;
    }

    .reminder li:nth-child(2n+1) {
        margin-left: -20px;
        color: tomato;
        list-style-type: none;
        display: block;
    }

</style>
