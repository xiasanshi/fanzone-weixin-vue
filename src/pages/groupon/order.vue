<template>
    <div>
        <div>
            <div class="width_100 bg_FFF7EF position_re text_align_center" style="height:150px ">
                <img slot="icon" :src="headUrl" style="height: 80px;width: 80px;border-radius: 50%;"
                     class="margin_top_15"/>
                <div class="margin_top_10"><span>您好，</span><span>{{userName}}</span></div>
            </div>
            <div class="margin_top_10">
                <mt-cell title="心愿订单" :to="{name:'wish'}"
                         is-link value=""></mt-cell>
                <mt-cell title="待消费订单" :to="{name:'preUsing'}"
                         is-link value=""></mt-cell>
                <mt-cell title="待支付订单" :to="{name:'prePay'}"
                         is-link value=""></mt-cell>
                <mt-cell title="历史订单" :to="{name:'history'}"
                         is-link value=""></mt-cell>
                <!--<mt-cell title="修改手机号" :to="{name:'updatePhone'}"
                         is-link value=""></mt-cell>-->
            </div>


            <!--<mt-index-list>-->
            <!--<mt-index-section index="">-->
            <!--<mt-cell title="心愿订单"></mt-cell>-->
            <!--<mt-cell title="待消费订单"></mt-cell>-->
            <!--<mt-cell title="历史订单"></mt-cell>-->
            <!--</mt-index-section>-->
            <!--</mt-index-list>-->

            <div class="margin_top_10 bg_ff">
                <div>
                    <mt-cell title="正在进行的拼团" :to="{name:'join'}" is-link>
                        <span class="color_groupon">更多</span>
                    </mt-cell>
                </div>
                <div v-for="each in historyList">
                    <div style="height: 90px" class="border_top2" v-if="each.orderStatus === 'GROUPING'">
                        <div style="float: left;padding: 10px">
                            <img style="height: 70px;width: 70px" src="../assets/images/hgcp.jpg"/>
                        </div>
                        <div style="padding: 10px 0 0 10px;" class="position_re">
                            <div style="font-size: 16px;color: #333333;margin-bottom: 10px">
                                限时专享 | {{each.grouponName}}
                            </div>
                            <div style="font-size: 14px;color: #666666">
                                还差<span>2</span>人成团 &nbsp
                            </div>
                            <div @click="toGroupon(each.teamId)"
                                 style="position: absolute;right: 20px;padding: 5px;color: #ffffff;background-color: #FF9933;text-align: center;bottom:-25px;border-radius: 5px">
                                邀请好友
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="phone_num" id="phone_num" @click="close_share()">
            <img src="../assets/images/icon/share10.png" width="100%"/>
        </div>
        <div style="height: 50px;width: 100%"></div>
        <!--<Footer ref="footer"></Footer>-->
    </div>

</template>

<script>
    import Footer from "../components/foot";
    import {getUserInfo,getOrderList,getUserInfoByCode} from "../api/api";
    import wxjs from "../common/wx"
    import { Indicator,Toast} from 'mint-ui';

    export default {
        name: "order",
        components: {Footer},
        data() {
            return {
                userInfo: null,
                headUrl: '',
                userName: '',
                historyList:''
            }
        },
        methods: {
            toFooter() {
                this.$refs.footer.setSelected('pay');
            },
            toGroupon(para) {
                // alert('ss')
                document.getElementById('phone_num').style.display = 'block';
                let url = location.href.replace('/order','/preJoin/') + para
                wxjs.wx_share('聚汇 - 拼团', '夏磊邀请你参加拼团3人套餐', url)

            },
            getUserInfo() {
                console.log('=====userinfo=====')
                let userInfo = sessionStorage.getItem('userInfo')
                let code = sessionStorage.getItem('code')
                if(userInfo===null && code){
                    console.log(code)
                    sessionStorage.removeItem('code')
                    Indicator.open('加载中...')
                    getUserInfoByCode(code).then((res)=>{
                        if(res.data.code == '2000'){
                            this.userInfo = res.data.data;
                            this.headUrl = this.userInfo.headImgUrl
                            this.userName = this.userInfo.nickname
                            if(userInfo!==null){
                                sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                                sessionStorage.setItem('openid',this.userInfo.openId)
                            }
                            sessionStorage.removeItem('code')
                            console.log('openid: '+sessionStorage.getItem('openid'))
                            Indicator.close()
                        }else{
                            Indicator.close();
                            userInfo = sessionStorage.getItem('userInfo')
                            if(userInfo === null){
                                setTimeout(() => {
                                    location.reload();
                                },500);
                            }
                            this.userInfo = JSON.parse(userInfo)
                            console.log(this.userInfo)
                            this.headUrl = this.userInfo ? this.userInfo.headImgUrl : 'http://weixin.fanzone.vip/favicon.ico'
                            this.userName = this.userInfo ? this.userInfo.nickname : '聚汇'
                            // Toast(res.data.msg);
                        }
                    })
                }else{
                    this.userInfo = JSON.parse(userInfo)
                    console.log(this.userInfo)
                    this.headUrl = this.userInfo ? this.userInfo.headImgUrl : 'http://weixin.fanzone.vip/favicon.ico'
                    this.userName = this.userInfo ? this.userInfo.nickname : '聚汇'
                }

                // this.userInfo = JSON.parse(userInfo)
                // this.headUrl = this.userInfo.headImgUrl
                // this.userName = this.userInfo.nickname
                console.log('=====userend=====')

               /* let openid = sessionStorage.getItem('openid');
                let param = {'openid': openid}
                getUserInfo(param).then((res) => {

                    if (res.data.code === 0) {
                        // alert('ss')
                        this.userInfo = res.data.data.tcUser
                        this.headUrl = this.userInfo.headUrl
                        this.userName = this.userInfo.userName
                        // document.title = '聚汇 - '+this.userName+'订单'
                    }
                })*/
            },
            close_share() {
                document.getElementById('phone_num').style.display = 'none';
            },
            getHistoryList() {
                let para = {
                    'openid': sessionStorage.getItem('openid'),
                    'page': '0',
                    'size': '100',
                    'status': ['PAYED']
                };
                Indicator.open("加载中...")
                getOrderList(para).then((res) => {
                    if (res.data.code == '2000') {
                        this.historyList = res.data.data.content;
                        Indicator.close()
                    } else {
                        Indicator.close();
                        // Toast(res.data.msg);
                    }
                })
            },

        },
        filters:{
            formatGrouponType: function (val) {
                return val == '0' ? '【全民参与】' : '【老带新团】'
            },
        },
        mounted() {
            console.log('order mouted')
            this.getUserInfo()
            document.title = '聚汇 - 订单'
            this.getHistoryList()
            // wxjs.wx_share('聚汇 - 订单', '', location.href)
            // this.toFooter()
        },
        created(){
            console.log('order created')
        }

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
