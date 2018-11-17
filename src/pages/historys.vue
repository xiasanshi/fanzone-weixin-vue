<template>
    <div>
        <div v-for="item in historyList">
            <li v-for="each in item.userCouponDTOList">
                <coupon-temp :end-time="each.tcCouponDTO.useDurationEnd" :coupon-name="each.couponName"
                             :icon="each.couponIcon" :coupon-price="each.tcCouponDTO.couponPrice" end-text="已过期"
                             :discount-price="each.tcCouponDTO.discountPrice" :exp="each.tcCouponDTO.useCondition"
                             :buss-name="item.bussinessName" :ex-text="formatUseStatus(each.useStatus)"
                ></coupon-temp>
            </li>

        </div>
        <div style="height: 50px;width: 100%"></div>
    </div>
</template>

<script>
    import {Fanzone} from '../api/api'
    import {Indicator, Toast} from 'mint-ui';
    import CouponTemp from "../components/coupon/couponTemp";

    export default {
        name: "history",
        components: {CouponTemp},
        data() {
            return {
                list: [1, 2, 3],
                historyList: []
            }
        },
        methods: {
            toGroupon(id) {
                this.$router.push({name: 'preGroupon', path: '/preGroupon', params: {'id': id}});
            },
            toJoin(id) {
                this.$router.push({name: 'preJoin', path: '/preJoin', params: {'id': id}});
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
                        // Indicator.close()
                    } else {
                        // Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            formatUseStatus: function (val) {
                console.log(";;;;;;;;;;;;;;;;;"+ val)
                return val == 1 ? '待支付' : val == 2 ? '待使用' : val == 3 ? '已使用' : val == 4 ? '已过期' : ''
            }
        },
        filters: {
            formatGrouponType: function (val) {
                return val == '0' ? '【全民参与】' : '【老带新团】'
            },
            formatCouponStatus: function (val) {
                return val == 1 ? '待支付' : val == 2 ? '待使用' : val == 3 ? '已使用' : val == 4 ? '已过期' : ''
            }
        },
        mounted() {
            document.title = '历史订单'
            this.getHistoryList()
        }
    }
</script>

<style scoped>

</style>
