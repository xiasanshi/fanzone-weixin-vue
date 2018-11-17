<template>
    <div>
        <div v-for="item in teamList">
            <div style="height: 90px;margin-bottom: 5px" class="bg_ff">
                <div style="float: left;padding: 10px">
                    <img style="height: 65px;width: 65px" src="../assets/images/hgcp.jpg"/>
                </div>
                <div style="padding: 10px 0 0 10px;" class="position_re">
                    <div style="font-size: 16px;color: #333333;margin-bottom: 10px">
                        {{item.groupType | formatType}} | {{item.grouponName}}
                    </div>
                    <div style="font-size: 12px;color: #666666">
                        还差<span>{{item.remainingNum}}</span>人成团 &nbsp;<span>
                        <count-down class="" :endTime="item.endTime" endText="已经结束了"></count-down>
                    </span>
                    </div>
                    <div style="margin-top: 10px">
                        <span style="color: #ff0000;font-size: 18px">￥{{item.teamPrice}}</span>&nbsp;<s style="color: #999999;font-size: 12px">￥{{item.salePrice}}</s>
                    </div>
                    <div @click="toJoin(item.id)" style="position: absolute;right: 20px;padding: 5px;color: #ffffff;background-color: #FF9933;text-align: center;bottom:3px;border-radius: 5px">
                        参团
                    </div>
                </div>
            </div>
        </div>
        <div style="height: 50px;width: 100%"></div>
        <!--<Footer ref="footer"></Footer>-->
    </div>

</template>

<script>
    import wxjs from "../common/wx"
    import Footer from "../components/foot";
    import countDown from '../components/countDown'
    import {getTeamListByBusinessId} from '../api/api'
    import { Indicator,Toast} from 'mint-ui';
    export default {
        name: "join",
        components: {Footer,countDown},
        data(){
            return{
                list:[1,2,3],
                teamList:[],
                businessId:''
            }
        },
        methods:{
            toFooter(){
                this.$refs.footer.setSelected('join');
            },
            toJoin(id) {
                this.$router.push({name: 'preJoin', path: '/preJoin', params: {'id': id}});
            },
            getTeamListByBusinessId(){
                let param = {'businessId': this.businessId}
                Indicator.open('加载中...');
                getTeamListByBusinessId(param).then((res) => {
                    if (res.data.code == '2000') {
                        this.teamList = res.data.data;
                        Indicator.close()
                    } else {
                        Toast(res.data.msg);
                        Indicator.close();
                    }
                })
                Indicator.close()
            }
        },
        mounted(){
            document.title = '聚汇 - 参团'
            wxjs.wx_share('聚汇 - 订单', '', location.href)
            this.businessId = sessionStorage.getItem('businessId')
            this.getTeamListByBusinessId()
            // this.toFooter()
        },
        filters:{
            formatType: function (val) {
                return val == '0' ? '全民参与' : '老带新团'
            }
        }

    }

</script>

<style scoped>

</style>
