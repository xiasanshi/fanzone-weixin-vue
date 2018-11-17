/**
* ----------------------------------------------------------
* pay
*
* @version  1.0
* @author xialei
* @email 15755372104@126.com
*
* @module src/pages/pay
* ----------------------------------------------------------
*/
<template>
    <div class="height_100"><div style="flex: 1;height: 100%">
        <mt-header fixed :title="bussinessInfo.bussinessName"></mt-header>
        <div style="width: 100%;height: 140px;padding-top: 10px;margin-top: 40px">
            <template>
                <router-link :to="'/shop/'+bussinessInfo.bussinessId">
                    <div style="height: 80px;width: 80px;" class="margin_0_auto">
                        <img v-bind:src="bussinessInfo.bussinessIcon" style="width: 100%;height: 100%" class=""/>
                    </div>
                    <div class="margin_0_auto width_100 text_align_center color_333" style="padding-top: 10px">
                        <h3 class="text_center font_size16 color666">{{bussinessInfo.bussinessName}}</h3>
                    </div>
                </router-link>
            </template>
        </div>
        <div style="width: 100%;height: 60px;margin-top: 10px;" class="bg_ff">
            <div style="height: 100%;font-size: 20px;" class="text_align_center col-2 margin_0_auto bg_snow">
                <span style="line-height: 60px;">￥</span>
            </div>
            <div class="col-10 bg_ff" style="">
                <input class="bg_ff" @onfocus="cover_input" maxlength="8" style="width: 100%;height:100%;font-size: 24px; height: 60px;border-width: 0;border-color: #999999;" v-model="totalFee" type="text" id="" v-bind:placeholder="'请输入需要支付的金额'" value="" />
            </div>
        </div>
        <!--<div class="margin_top_10">-->
            <!--<mt-checklist-->
                    <!--title="可使用优惠券"-->
                    <!--v-model="couponCode"-->
                    <!--:options="options">-->
            <!--</mt-checklist>-->
        <!--</div>-->
        <div style="height: 50px;width: 100%"></div></div>
        <!--<mt-field class="fontsize_18" label="￥" :placeholder="'请输入支付金额'" v-model="totalFee"></mt-field>-->
        <div @click="providersPay()" class="width_100 position_fix height_50 bg_groupon text_align_center"
             style="bottom: 0;color: #ffffff;line-height: 50px">
        <!--<div @click="providersPay()" class="width_100 height_50 bg_groupon text_align_center"-->
             <!--style="color: #ffffff;line-height: 50px;">-->
            微信支付 ￥{{total_price}}
        </div>
    </div>
</template>

<script>
    import wxjs from "../../common/wx";
    import {Provider, Fanzone} from '../../api/api'
    import {Indicator, Toast, Lazyload,MessageBox} from 'mint-ui';

    export default {
        name: "pay",
        data() {
            return {
                // list: [1, 2, 3],
                businessId: '',
                groupType: '0',
                grouponList: [],
                bussinessInfo: {},
                couponList: [],
                api: '',
                openid: '',
                totalFee: '',
                couponCode: [],//逗号分割
                total_price: 0.0,
                historyList:[],
                options:[],
                cover_input1:''
                // businessName:''
            }
        },
        methods: {
            pay() {

            },
            getAllCouponByBusinessId() {
                let para = {'bussinessId': this.businessId}
                let api = new Fanzone()
                Indicator.open('加载中...');
                api.getCouponByBusinessId(para).then((res) => {
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
            providersPay(){
                let pt = new Provider();
                if(!this.checkMoney()){
                    return
                }
                if((this.total_price === 0 && this.couponCode.length === 0)){
                    Toast('请输入正确的支付金额')
                    return
                }
                Indicator.open('加载中...');
                let couponCodeList = ''
                for(let i=0;i<this.couponCode.length;i++){
                    couponCodeList = couponCodeList + ',' + this.couponCode[i]
                }
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                        'totalFee' : this.total_price,
                        'couponCode': couponCodeList,
                        'businessId':this.businessId
                    }
                pt.pay(para).then((res) => {
                    if (res.data.code == '2000') {
                        if (res.data.code == '2000') {
                            this.prePayBill = res.data.data;
                            this.onBridgeReady(this.prePayBill.appId, this.prePayBill.timeStamp, this.prePayBill.nonceStr, this.prePayBill.packageValue, this.prePayBill.paySign, this)
                            Indicator.close()
                        } else {
                            Toast(res.data.msg);
                            Indicator.close();
                            return
                        }
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
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
                            MessageBox.confirm('支付成功，点击确定查看更多优惠').then(action => {
                                setTimeout(() => {
                                    // window.location.href = window.location.href.replace('payment', 'preJoin/' + this.teamId)
                                    self.$router.push({name: 'fanzone', path: '/fanzone'});
                                }, 500);
                            });
                        } else {
                            Toast('支付失败,请稍后再试');
                            // alert(returnUrl.teamId)
                            // location.reload()
                        }

                    }
                );
            },
            getHistoryList() {
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                    'flag': 2,
                    // 'page': '0',
                    // 'size': '100',
                    // 'status': ['PAYED', 'PREPAY', 'REFUNDSED']
                };
                let api = new Fanzone()
                // Indicator.open("加载中...")
                api.useCouponList(para).then((res) => {
                    if (res.data.code == 0) {
                        this.historyList = res.data.data.userCouponList;
                        this.getCodeOptions()
                        // Indicator.close()
                    } else {
                        // Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            getCodeOptions(){
                let times = new Date()
                let comTime = times.getTime()
                for(let i=0;i<this.historyList.length;i++){
                    console.log(this.historyList[i])
                    if(this.historyList[i].bussinessId === this.businessId){
                        let userCouponDTOList = this.historyList[i].userCouponDTOList
                        for(let j=0;j<userCouponDTOList.length;j++){
                            let t=new Date(userCouponDTOList[j].tcCouponDTO.useDurationEndTime).getTime()
                            if(userCouponDTOList[j].useStatus ===2 && comTime<t){
                                let tmp = {}
                                tmp['label'] = userCouponDTOList[j].couponName + '(满' + userCouponDTOList[j].lowestConsume + '可用)'
                                tmp['value'] = userCouponDTOList[j].couponCode
                                this.options.push(tmp)
                            }
                        }
                    }
                }
            },
            checkMoney(){
                console.log('check money: '+this.totalFee)
                if(this.totalFee === undefined | !this.totalFee | isNaN(this.totalFee)){
                    Toast('请输入正确的支付金额');
                    this.totalFee = ''
                    this.total_price = 0.0
                    return false
                }
                return true
            },
            cover_input(it){
                console.log('滚动条')
                window.scrollTo(0,100)
                // document.getElementById('inputs').scrollIntoView()

            },


        },
        mounted() {
            this.businessId = this.$route.params.businessId;
            console.log("businessId :" + this.businessId)
            this.getAllCouponByBusinessId()
            this.api = new Fanzone()
            this.openid = sessionStorage.getItem('openid')
            this.getHistoryList()
            this.cover_input1 = this.cover_input()
        },
        watch:{
            totalFee:function (newp,oldp) {
                if(this.checkMoney()){
                    this.total_price = newp
                }

            }
        }
    }
</script>

<style scoped>

</style>
