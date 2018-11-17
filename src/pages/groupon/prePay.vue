<template>
    <div>
        <div v-for="item in historyList">
            <div style="height: 90px;margin-bottom: 5px" v-if="item.orderStatus === 'PREPAY'" class="bg_ff"
                 @click="toJoin(item)">
                <div style="float: left;padding: 10px">
                    <img style="height: 65px;width: 65px" :src="item.imageUrl"/>
                </div>
                <div style="padding: 10px 0 0 10px;" class="position_re">
                    <div style="font-size: 16px;color: #333333;margin-bottom: 10px">
                        限时专享 | {{item.grouponName}}
                    </div>
                    <div style="font-size: 12px;color: #666666">
                        {{item.orderStatus | formatGrouponStatus}}
                    </div>
                </div>
            </div>
        </div>
        <div style="height: 50px;width: 100%"></div>
    </div>
</template>

<script>
    import {getOrderList} from '../api/api'
    import {Indicator, Toast} from 'mint-ui';

    export default {
        name: "prePay",
        data() {
            return {
                list: [1, 2, 3],
                historyList: []
            }
        },
        methods: {
            getHistoryList() {
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                    'page': '0',
                    'size': '100',
                    'status': ['PREPAY']
                };
                Indicator.open("加载中...")
                getOrderList(para).then((res) => {
                    if (res.data.code == '2000') {
                        this.historyList = res.data.data.content;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            toGroupon(id) {
                this.$router.push({name: 'preGroupon', path: '/preGroupon', params: {'id': id}});
            },
            toJoin(val) {
                this.$router.push({
                    name: 'preJoin',
                    path: '/preJoin',
                    params: {'id': val.teamId, 'fail': 'yes', 'orderNo': val.orderNo}
                });
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
