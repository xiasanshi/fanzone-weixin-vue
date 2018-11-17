<template>
    <div>
        <div v-for="item in historyList">
            <coupon-temp :end-time="item.orderDetailList[0].useDurationEnd" :coupon-name="item.orderDetailList[0].couponName"
                         :icon="item.orderDetailList[0].couponIcon" :coupon-price="item.orderDetailList[0].couponPrice"
                         :discount-price="item.orderDetailList[0].discountPrice" :exText="'待支付'"
                         :buss-name="''"
            ></coupon-temp>
        </div>
        <div style="height: 50px;width: 100%"></div>
    </div>
</template>

<script>
    import {Fanzone} from '../api/api'
    import {Indicator, Toast} from 'mint-ui';
    import CouponTemp from "../components/coupon/couponTemp";

    export default {
        name: "prePay",
        components: {CouponTemp},
        data() {
            return {
                // list: [1, 2, 3],
                historyList: []
            }
        },
        methods: {
            getHistoryList() {
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                    // 'page': '0',
                    // 'size': '100',
                    // 'status': ['PREPAY']
                };
                let api = new Fanzone();
                // Indicator.open("加载中...")
                api.prePay(para).then((res) => {
                    if (res.data.code == 0) {
                        this.historyList = res.data.data.orderDTOList;
                        console.log(this.historyList[0].orderDetailList)
                        // Indicator.close()
                    } else {
                        // Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            toGroupon(id) {
                this.$router.push({name: 'preGroupon', path: '/preGroupon', params: {'id': id}});
            },
            toJoin(id) {
                this.$router.push({name: 'preJoin', path: '/preJoin', params: {'id': id, 'fail': 'yes'}});
            }
        },
        filters: {
            formatGrouponType: function (val) {
                return val == '0' ? '【全民参与】' : '【老带新团】'
            },
            formatGrouponStatus: function (val) {
                return val == 'REFUNDSED' ? '拼团失败已退款' : val == 'GROUPING' ? '待成团' : val == 'PREPAY' ? '代付款' : '待使用'
            }
        },
        mounted() {
            document.title = '待支付'
            this.getHistoryList()
        }
    }
</script>

<style scoped>

</style>
