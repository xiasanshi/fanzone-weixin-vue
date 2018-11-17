<template>
    <div>
        <div>
            <div class="width_100 bg_FFF7EF position_re text_align_center" style="height:150px ">
                <img slot="icon" :src="headUrl" style="height: 80px;width: 80px;border-radius: 50%;"
                     class="margin_top_15"/>
                <div class="margin_top_10"><span>您好，</span><span>{{userName}}</span></div>
            </div>
            <div class="margin_top_10">
                <mt-cell title="心愿订单" :to="{name:'order'}"
                         is-link value=""></mt-cell>
                <mt-cell title="待消费订单" :to="{name:'order'}"
                         is-link value=""></mt-cell>
                <mt-cell title="待支付订单" :to="{name:'order'}"
                         is-link value=""></mt-cell>
                <mt-cell title="历史订单" :to="{name:'order'}"
                         is-link value=""></mt-cell>
                <!--<mt-cell title="修改手机号" :to="{name:'updatePhone'}"
                         is-link value=""></mt-cell>-->
            </div>
            <div class="margin_top_10">
                <mt-cell title="修改手机号" :to="{name:'updatePhone'}"
                         is-link :value="userInfo.handPhone"></mt-cell>
            </div>
            <div class="margin_top_10">
                <a href="http://wx.qingzhao.net.cn/wx/join_us.html" class="color_666">
                    <mt-cell title="商家入驻"
                             is-link></mt-cell>
                </a>
            </div>
            <!--<mt-index-list>-->
            <!--<mt-index-section index="">-->
            <!--<mt-cell title="心愿订单"></mt-cell>-->
            <!--<mt-cell title="待消费订单"></mt-cell>-->
            <!--<mt-cell title="历史订单"></mt-cell>-->
            <!--</mt-index-section>-->
            <!--</mt-index-list>-->

        </div>
        <div class="phone_num" id="phone_num" @click="close_share()">
            <img src="../assets/images/icon/share10.png" width="100%"/>
        </div>
        <div style="height: 60px;width: 100%"></div>
        <!--<Footer ref="footer"></Footer>-->
    </div>

</template>

<script>
    import Footer from "../components/foot";
    import {getUserInfo, getOrderList, getUserInfoByCode} from "../api/api";
    import wxjs from "../common/wx"
    import {Indicator, Toast} from 'mint-ui';

    export default {
        name: "order",
        components: {Footer},
        data() {
            return {
                userInfo: null,
                headUrl: '',
                userName: '',
                historyList: ''
            }
        },
        methods: {
            toFooter() {
                this.$refs.footer.setSelected('pay');
            },
            toGroupon(para) {
                // alert('ss')
                document.getElementById('phone_num').style.display = 'block';
                let url = location.href.replace('/customer', '/preJoin/') + para
                wxjs.wx_share('聚汇 - 拼团', '夏磊邀请你参加拼团3人套餐', url)

            },
            getUserInfo() {
                console.log('=====userinfo=====')
                let userInfo = sessionStorage.getItem('userInfo')
                let code = sessionStorage.getItem('code')
                if (userInfo === null && code) {
                    console.log(code)
                    sessionStorage.removeItem('code')
                    Indicator.open('加载中...')
                    getUserInfoByCode(code).then((res) => {
                        if (res.data.code == 0) {
                            this.userInfo = res.data.data;
                            this.headUrl = this.userInfo.headUrl
                            this.userName = this.userInfo.userName
                            if (userInfo !== null) {
                                sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                                sessionStorage.setItem('openid', this.userInfo.openid)
                            }
                            sessionStorage.removeItem('code')
                            console.log('openid: ' + sessionStorage.getItem('openid'))
                            Indicator.close()
                        } else {
                            Indicator.close();
                            userInfo = sessionStorage.getItem('userInfo')
                            if (userInfo === null) {
                                setTimeout(() => {
                                    location.reload();
                                }, 500);
                            }
                            this.userInfo = JSON.parse(userInfo)
                            console.log(this.userInfo)
                            this.headUrl = this.userInfo ? this.userInfo.headUrl : 'http://weixin.fanzone.vip/favicon.ico'
                            this.userName = this.userInfo ? this.userInfo.userName : '聚汇'
                            // Toast(res.data.msg);
                        }
                    })
                } else {
                    this.userInfo = JSON.parse(userInfo)
                    console.log(this.userInfo)
                    this.headUrl = this.userInfo ? this.userInfo.headUrl : 'http://weixin.fanzone.vip/favicon.ico'
                    this.userName = this.userInfo ? this.userInfo.userName : '聚汇'
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
                // Indicator.open("加载中...")
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
        filters: {
            formatGrouponType: function (val) {
                return val == '0' ? '【全民参与】' : '【老带新团】'
            },
        },
        mounted() {
            console.log('customer mouted')
            this.getUserInfo()
            // document.title = '聚汇 - 个人中心'
            // this.getHistoryList()
            wxjs.wx_share('聚汇 - 个人中心', '', location.href)
            // this.toFooter()
        },
        created() {
            console.log('customer created')
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
