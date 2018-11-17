<template>
    <div class="height_100">
        <div style="flex: 1;height: 100%">
            <coupon-temp :end-time="couponDetail.activityDurationEnd" :coupon-name="couponDetail.couponName"
                         :icon="couponDetail.couponIcon" :coupon-price="couponDetail.couponPrice"
                         :discount-price="couponDetail.discountPrice" :exp="couponDetail.useCondition"
                         :buss-name="couponDetail.bussinessDTO.bussinessName" :ex-text="''"
                         :show-date="'false'"></coupon-temp>

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
        </div>
        <to-home></to-home>
        <div style="position: fixed;bottom: 0px;height: 50px;background-color: #ffffff;width: 100%;text-align: center;line-height: 50px;border-top: #cccccc 1px">
            <div>
                <div style="float: left;line-height: 50px;text-align: center;width: 40%;height: 50px;color: #FF0000;font-size: 25px">
                    ￥{{couponDetail.couponPrice}}
                </div>
                <div @click="toPay()" class="bg_groupon"
                     style="float: left;height: 50px;color: #ffffff;line-height: 50px;text-align: center;width: 60%">
                    支付
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CouponTemp from "../components/coupon/couponTemp";
    import {Fanzone} from "../api/api"
    import {Indicator, Toast, Lazyload} from 'mint-ui';
    import ToHome from "../components/toHome";
    import wxjs from "../common/wx"

    export default {
        name: "couponDetails",
        components: {ToHome, CouponTemp},
        data() {
            return {
                couponDetail: {},
                userInfo: {},
                bussinessId: '',
                couponId: ''
            }
        },
        methods: {
            getCouponDetail() {
                // console.log("dddddddddddddddddddddd")
                let api1 = new Fanzone()
                console.log('ssssssssssssss')
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                    'couponId': this.couponId,
                    'bussinessId': this.bussinessId
                }
                Indicator.open('加载中...');
                // console.log("dddddddddddddddddddddd")
                api1.getCouponDetail(para).then((res) => {
                    if (res.data.code == '0') {
                        this.couponDetail = res.data.data.orderCouponList[0];
                        this.userInfo = res.data.data.tcUserDTO
                        wxjs.wx_share('聚汇 - ' + this.couponDetail.couponName, '聚生活，汇服务', location.href)
                        console.log(this.couponList)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            toPay() {
                sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                sessionStorage.setItem('couponDetail', JSON.stringify(this.couponDetail))
                console.log("=======================pay")
                this.$router.push({name: 'payment', path: '/payment'});
            }
        },
        mounted() {
            this.couponId = this.$route.params.couponId;
            this.bussinessId = this.$route.params.businessId;
            console.log('couponId:' + this.couponId)
            console.log('bussinessId:' + this.bussinessId)
            // console.log("dddddddddddddddddddddd")
            this.getCouponDetail()
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
        }
    }
</script>

<style scoped>
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
