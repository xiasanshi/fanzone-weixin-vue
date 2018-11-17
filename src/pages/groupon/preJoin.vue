/**
* ----------------------------------------------------------
* 参与拼团页面
*
* @version  1.0
* @author shaqihe(shaqihecome@163.com)
*
* @module src/pages/music
* ----------------------------------------------------------
*/
<template>
    <!-- 全局header -->
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
                        有效期至{{detail.groupon.activityEndTime}}
                    </div>
                    <div style="margin-top: 10px">
                        <span style="color: #ff0000;font-size: 20px">￥{{detail.groupon.activityPrice}}</span>&nbsp;<s
                            style="color: #999999;font-size: 14px">￥{{detail.groupon.salePrice}}</s>
                    </div>
                </div>
            </div>
        </div>
        <div style="height: 100px;padding: 10px;background-color: #ffffff;">
            <div>
                <span style="color: #FF9933;font-size: 18px">拼团中</span>&nbsp;
                <span style="color: #333333;font-size: 16px">已有{{num}}人参团</span>
            </div>
            <div>
                <div v-if="payTime !=='yes'" style="margin-top: 10px;color: #999999;font-size: 16px">
                    <span style="">距离结束还剩余</span>&nbsp;
                    <countDown :endTime="detail.endTime"></countDown>
                </div>
                <div v-else style="margin-top: 10px;color: #999999;font-size: 16px">
                    <span style="">距离关闭交易结束还剩余</span>
                    <countDown :endTime="payEndTime"></countDown>
                </div>
            </div>

            <div class="margin_top_10">
                <div style="padding-right: 10px;display: inline" v-for="each in detail.joins">
                    <div style="display: inline" v-if="each.status !== 'FAIL' ">
                        <img style="height: 40px;width: 40px;border-radius: 50%" :src="each.headUrl"/>
                    </div>
                </div>
            </div>

        </div>
        <div class="explain_info color_999" style="background-color: #ffffff;padding: 10px">
            <div style="color: #333333;font-size: 16px"> *拼团流程</div>
            <div style="">1、发起拼团或者参与好友的拼团</div>
            <div style="">2、在活动时间内邀请好友参团</div>
            <div style="">3、在活动时间内，达到拼团人数，顺利开团</div>
            <div style="color: #333333;">4、若活动结束拼团不成功，全额退款</div>
        </div>

        <div style="margin-top: 20px;padding: 10px">
            <h2>商品详情 </h2>
            <div>{{detail.groupon.description}}</div>

            <div>
                <img :src="detail.groupon.descriptionImg" style="width: 100%">
            </div>
        </div>
        <mt-swipe :auto="4000" class="swipe" style="width: 100%">
            <!--<mt-swipe-item class="swipe-item1"></mt-swipe-item>-->
            <!--<mt-swipe-item class="swipe-item2"></mt-swipe-item>-->
            <mt-swipe-item class="swipe-item3" style="width: 100%"><img style=";width: 100%"
                                                                        :src="require('../assets/images/hghdt.jpg')"/>
            </mt-swipe-item>
        </mt-swipe>
        <div style="height: 50px"></div>
        <div>
            <div style="position: fixed;bottom: 0px;height: 50px;background-color: #ffffff;width: 100%;text-align: center;line-height: 50px;border-top: #cccccc 1px">
                <div v-if="detail.status==='SUCC' && payStatus === '1'"
                     class="width_100 color_fff bg_groupon text_align_center" @click="toUse()">
                    拼团成功,去消费
                </div>
                <div v-else-if="detail.status==='SUCC' && payStatus !== '1'"
                     class="width_100 color_fff bg_groupon text_align_center" @click="toGroupon()">
                    拼团已经结束,重新开团
                </div>
                <div v-else-if="detail.status==='FAIL'" class="width_100 bg_groupon color_fff text_align_center"
                     @click="toGroupon()">
                    拼团失败，重新开团
                </div>
                <div v-else-if="payTime==='yes'" class="width_100 bg_groupon color_fff text_align_center"
                     @click="joinTeam()">
                    重新支付
                </div>
                <div v-else-if="payStatus === '1'">
                    <share :group-id="detail.id" :order-detail="detail" ></share>
                </div>
                <div v-else>
                    <div style="float: left;line-height: 50px;text-align: center;width: 40%;height: 50px;color: #FF0000;font-size: 25px">
                        ￥{{detail.groupon.activityPrice}}
                    </div>
                    <div @click="joinTeam()"
                         style="float: left;height: 50px;background-color: #FF9933;color: #ffffff;line-height: 50px;text-align: center;width: 60%">
                        参团
                    </div>
                </div>
            </div>
        </div>

        <to-home></to-home>
        <div style="height: 50px;width: 100%"></div>
    </div>
</template>
<script>
    import {PAGE_TYPE} from '../common/constant/constant'
    import {getTeamDetails, joinTeam} from '../api/api'
    import {Indicator, Toast} from 'mint-ui';
    import countDown from '../components/countDown'
    import ToHome from "../components/toHome";
    import Share from "../components/share";

    export default {
        name: 'music',
        data() {
            return {
                pageType: PAGE_TYPE.MUSIC,
                detail: {},
                teamId: '',
                payStatus: '',
                grouponText: '',
                num: 0,
                payTime: '',
                payEndTime: '',
                orderNo: ''
            }
        },
        created() {

        },
        methods: {
            toGroupon() {
                console.log("====================重新开团======================")
                let groupid = this.detail.grouponId;
                this.$router.push({name: 'preGroupon', path: '/preGroupon', params: {'id': groupid}});
            },
            toUse() {
                console.log("====================订单页======================")
                let groupid = this.detail.grouponId;
                this.$router.push({name: 'preUsing', path: '/preUsing', params: {'id': groupid}});
            },
            getTeamDetails() {
                let param = {'teamId': this.teamId}
                Indicator.open('加载中...');
                getTeamDetails(param).then((res) => {
                    if (res.data.code == '2000') {
                        this.detail = res.data.data;
                        this.formatPeopCount(this.detail.joins)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
                Indicator.close()
            },
            joinTeam() {
                sessionStorage.setItem('payType', 'join')
                console.log("========参团========")
                sessionStorage.setItem('detail', JSON.stringify(this.detail))
                this.$router.push({name: 'payment', path: '/payment'});
                // let openid = sessionStorage.getItem('openid')
                // let param = {'teamId': this.teamId, 'openid': openid}
                // Indicator.open('加载中...');
                // joinTeam(param).then((res) => {
                //     if (res.data.code == '2000') {
                //         this.detail = res.data.data;
                //         Indicator.close()
                //     } else {
                //         Toast(res.msg);
                //         Indicator.close();
                //     }
                // })
                // Indicator.close()
            },
            formatPeopCount: function (joins) {
                let _this = this
                let openid = sessionStorage.getItem('openid')
                for (let each in joins) {
                    if (joins[each].status !== 'FAIL') {
                        _this.num = _this.num + 1
                    }
                    if (joins[each].openid === openid && joins[each].status === 'GROUPING') {
                        _this.payStatus = '1'
                        console.log('----------paystatus:' + _this.payStatus)
                    }
                }
            }
        },
        mounted() {
            document.title = '聚汇 - 参团';
            // sessionStorage.setItem('orderNo',this.orderNo)
            this.teamId = this.$route.params.id;
            console.log('--------------------------c0c --' + this.teamId)
            this.getTeamDetails();
            console.log('--------------------------c1c --' + this.teamId)
            let fail = this.$route.params.fail;
            if (fail) {
                this.payTime = fail;
                this.orderNo = this.$route.params.orderNo
                let t = new Date();
                let times = t.getTime() + 30 * 60 * 1000 - 8 * 60 * 60 * 1000
                console.log('jiaoyijiesu: ' + new Date(times))
                this.payEndTime = new Date(times)
            }
            sessionStorage.setItem('orderNo',this.orderNo)
            console.log('--------------------------fail --' + this.$route.params.fail)

        },
        filters: {
            formatType: function (val) {
                return val == '0' ? '全民参与' : '老带新团'
            },
            /*  formatPeopCount: function (joins) {
                  let _this = this
                  let num = 0
                  let openid = sessionStorage.getItem('openid')
                  for (let each in joins) {
                      if (joins[each].status !== 'FAIL') {
                          num = num + 1
                      }
                      if (joins[each].openid === openid) {
                          _this.payStatus = '1'
                          console.log('----------paystatus:'+_this.payStatus)
                      }
                  }
                  return num
              }*/
        },
        components: {Share, ToHome, countDown,}
    }
</script>
<style lang="scss">
    @import "../assets/scss/min.scss";

    .page-music {
        /*padding-top: px2rem(88)!important;*/
    }

    .explain_info > div {
        margin-top: 10px;
    }
</style>

