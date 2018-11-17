<template>
    <div>
        <div v-for="item in historyList">
            <div style="height: 90px;margin-bottom: 5px" class="bg_ff"  v-if="item.orderStatus !== 'SUCC'" @click="toJoin(item.teamId)" >
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
    import { Indicator,Toast} from 'mint-ui';
    export default {
        name: "wish",
        data() {
            return {
                list: [1, 2, 3],
                historyList: ''
            }
        },
        methods: {
            toGroupon(id){
                this.$router.push({ name: 'preGroupon',path:'/preGroupon',params:{'id':id}});
            },
            toJoin(id){
                this.$router.push({ name: 'preJoin',path:'/preJoin',params:{'id':id}});
            },
            getHistoryList() {
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                    'page': '0',
                    'size': '100',
                    'status': ['REFUNDSED']
                };
                Indicator.open("加载中...")
                getOrderList(para).then((res) => {
                    if (res.data.code == '2000') {
                        this.historyList = res.data.data.content;
                        console.log(this.historyList)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            }
        },
        filters: {
            formatGrouponType: function (val) {
                return val == '0' ? '【全民参与】' : '【老带新团】'
            },
            formatGrouponStatus: function (val) {
                return val == 'REFUNDSED' ? '拼团失败' : val == 'GROUPING' ? '待成团' : val == 'PREPAY' ? '代付款' : val == 'preUSING' ? '待使用' : val == 'FAIL' ? '拼团失败' : ''
            }
        },
        mounted() {
            document.title = '心愿订单'
            this.getHistoryList()
        }
    }
</script>

<style scoped>

</style>
