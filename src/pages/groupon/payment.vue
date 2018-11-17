<template>
    <div class="page page-music" style="height: 100%">
        <div style="height: 120px;">
            <div style="background-color: #EEFCEE;height: 120px">
                <div style="float: left;padding: 10px">
                    <img style="height: 100px;width: 100px" :src="detail.imageUrl"/>
                </div>
                <div style="padding: 10px 0 0 10px;">
                    <div style="font-size: 18px;color: #333333;margin-bottom: 10px">
                        {{detail.grouponNum}}人团 | {{detail.grouponName}}
                    </div>
                    <div style="font-size: 14px;color: #666666">
                        有效期至{{activityEndTime }}
                    </div>
                    <div style="margin-top: 10px">
                        <span style="color: #ff0000;font-size: 20px">￥{{activityPrice}}</span>&nbsp;<s
                            style="color: #999999;font-size: 14px">￥{{salePrice}}</s>
                    </div>
                </div>
            </div>
            <div class="margin_top_15 padding_LR_15">
                <h3>注意事项</h3>
                1、需要进店消费
            </div>

        </div>
        <to-home></to-home>
        <div class="phone_num" id="phone_num" @click="close_share()">
            <img src="../assets/images/icon/share10.png" width="100%"/>
        </div>
        <div @click="toPay()" class="width_100 position_fix height_50 bg_groupon text_align_center"
             style="bottom: 0;color: #ffffff;line-height: 50px">
            微信支付 ￥{{activityPrice}}
        </div>
    </div>

</template>

<script>
    import {Indicator, Toast, MessageBox} from 'mint-ui';
    import wxjs from "../common/wx";
    import {joinTeam, createPreGroupon, prePay} from "../api/api";
    import ToHome from "../components/toHome";


    export default {
        name: "payment",
        components: {ToHome},
        data() {
            return {
                payId: '',
                detail: {},
                type: '',
                prePayBill: null,
                activityEndTime: '',
                salePrice: '',
                activityPrice: '',
                teamId: '',
                groupId: '',
                userInfo: '',
                orderNo:''

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
                wxjs.wx_share('聚汇 - 拼团', this.userInfo.nickname + '邀请你参加' + this.detail.grouponName, url)
            },
            toPay() {
                wxjs.payPrepare();
                let openid = sessionStorage.getItem('openid');
                // alert(openid)
                let orderNo = sessionStorage.getItem('orderNo')
                this.orderNo = orderNo
                if (this.type === 'groupon') {
                    let param = {'grouponId': this.groupId, 'openid': openid}
                    // alert(openid)
                    Indicator.open('加载中...');
                    createPreGroupon(param).then((res) => {
                        if (res.data.code == '2000') {
                            // this.detail = res.data.data;
                            // console.log("=========data============")
                            // console.log(res.data.data)
                            // console.log("=========data============")

                            this.prePayBill = res.data.data;
                            this.teamId = this.prePayBill.teamId
                            this.orderNo = this.prePayBill.OrderNo
                            this.onBridgeReady(this.prePayBill.appId, this.prePayBill.timeStamp, this.prePayBill.nonceStr, this.prePayBill.package, this.prePayBill.paySign, this)

                            // this.onBridgeReady(pay.appId, pay.timeStamp, pay.nonceStr, pay.packAge, pay.paySign, location.href)
                            Indicator.close()
                            // Toast('提交成功');
                        } else if (res.data.code == '4000') {
                            MessageBox.confirm('点击确定添加手机号').then(action => {
                                this.$router.push({name: 'updatePhone', path: '/updatePhone'});
                            });
                            Indicator.close();
                            return
                        } else {
                            Indicator.close();
                            Toast(res.data.msg);
                            return
                        }
                    })
                    // Indicator.close()
                } else if (orderNo && orderNo !== null && orderNo !== '' && orderNo !==undefined) {
                    let param = {'orderNo': orderNo, 'openid': openid}
                    console.log("===========prepay============")
                    Indicator.open('加载中...');
                    prePay(param).then((res) => {
                        if (res.data.code == '2000') {
                            this.prePayBill = res.data.data;
                            this.onBridgeReady(this.prePayBill.appId, this.prePayBill.timeStamp, this.prePayBill.nonceStr, this.prePayBill.package, this.prePayBill.paySign, this)
                            Indicator.close()
                        } else if (res.data.code == '4000') {
                            MessageBox.confirm('点击确定添加手机号').then(action => {
                                this.$router.push({name: 'updatePhone', path: '/updatePhone'});
                            });
                            Indicator.close();
                            return
                        } else {
                            Toast(res.data.msg);
                            Indicator.close();
                            return
                        }
                    })
                } else if (this.type === 'join') {
                    let param = {'teamId': this.teamId, 'openid': openid}
                    Indicator.open('加载中...');
                    joinTeam(param).then((res) => {
                        if (res.data.code == '2000') {
                            this.prePayBill = res.data.data;
                            this.onBridgeReady(this.prePayBill.appId, this.prePayBill.timeStamp, this.prePayBill.nonceStr, this.prePayBill.package, this.prePayBill.paySign, this)
                            Indicator.close()
                        } else if (res.data.code == '4000') {
                            MessageBox.confirm('点击确定添加手机号').then(action => {
                                this.$router.push({name: 'updatePhone', path: '/updatePhone'});
                            });
                            Indicator.close();
                            return
                        } else {
                            Toast(res.data.msg);
                            Indicator.close();
                            return
                        }
                    })
                    // Indicator.close()
                } else {
                    Toast('发起支付失败，请稍后重试！');
                    return
                }
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
                            MessageBox.confirm('支付成功，点击确定查看拼团信息').then(action => {
                                // self.$router.push({ name: 'preJoin',path:'/preJoin',params:{'id':self.teamId}});

                                setTimeout(() => {
                                    // window.location.href = window.location.href.replace('payment', 'preJoin/' + this.teamId)
                                    self.$router.push({name: 'preJoin', path: '/preJoin', params: {'id': self.teamId}});
                                }, 500);
                            });
                        } else {
                            Toast('支付失败');
                            // alert(returnUrl.teamId)
                            self.$router.push({
                                name: 'preJoin',
                                path: '/preJoin',
                                params: {'id': self.teamId, 'fail': 'yes', 'orderNo': self.orderNo}
                            });
                            // location.reload()
                        }

                    }
                );
            },
            extractTime() {
                if (this.type === 'join') {
                    this.activityEndTime = this.detail.groupon.activityEndTime;
                    this.salePrice = this.detail.groupon.salePrice;
                    this.activityPrice = this.detail.groupon.activityPrice;
                    this.teamId = this.detail.id
                    console.log("=============teamid=============")
                    console.log(this.teamId)
                } else if (this.type === 'groupon') {
                    this.activityEndTime = this.detail.activityEndTime;
                    this.salePrice = this.detail.salePrice;
                    this.activityPrice = this.detail.activityPrice;
                    this.detail.imageUrl = this.detail.imgId;
                    this.detail.grouponName = this.detail.name;
                    this.groupId = this.detail.id;
                    console.log("=============groupid=============")
                    console.log(this.groupId)
                }
            }
        },
        mounted() {
            document.title = '订单支付'
            if(!sessionStorage.getItem('detail') && sessionStorage.getItem('detail')==null){
                // Toast('当前页面不存在')
                this.$router.push({name: 'groupon', path: '/groupon'});
            }
            this.type = sessionStorage.getItem('payType')
            this.detail = JSON.parse(sessionStorage.getItem('detail'))
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            this.extractTime()
            const _this = this
        },
        filters: {},
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
</style>
