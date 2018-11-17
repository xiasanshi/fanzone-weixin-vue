<template>
    <div>
        <mt-search style="height: auto;"
                v-model="search_value"
                cancel-text="取消"
                placeholder="搜索"
                   @keyup.native.enter="getSearchCoupon">
        </mt-search>
        <div v-for="item in couponList" @click="toCouponDetail(item.bussinessDTO.bussinessId,item.couponId)">
            <coupon-temp :end-time="item.activityDurationEnd" :coupon-name="item.couponName"
                         :icon="item.couponIcon" :coupon-price="item.couponPrice"
                         :discount-price="item.discountPrice" :exp="item.useCondition" :buss-name="item.bussinessDTO.bussinessName"></coupon-temp>
        </div>

        <div style="font-size: 10px" class="color_999 text_align_center margin_top_15">-- 到底了哦 --</div>
        <div style="height: 60px;width: 100%"></div>
    </div>
</template>

<script>
    import CouponTemp from "../components/coupon/couponTemp";
    import {Fanzone} from "../api/api";
    import {Indicator, Toast, Lazyload} from 'mint-ui';
    export default {
        name: "coupon",
        components: {CouponTemp},
        data(){
            return {
                search_value : '',
                couponList: '',
            }
        },
        mounted(){
            document.title = '聚汇 - 优惠券'
            this.getAllCoupon()
        },
        methods:{
            getAllCoupon(){
                Indicator.open('加载中...');
                let api = new Fanzone()
                api.getAllCoupon().then((res) => {
                    if (res.data.code == '0') {
                        this.couponList = res.data.data.allCouponList;
                        console.log(this.couponList)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            getSearchCoupon() {
                let api = new Fanzone()
                console.log("search========")
                let para = {'name': this.search_value}
                Indicator.open('加载中...');
                api.searchBussAndShop(para).then((res) => {
                    if (res.data.code == '0') {
                        if(res.data.data.couponDTOList.length === 0){
                            Toast('啊偶，什么也么搜索到哦，换个词再试试。');
                            this.getAllCoupon()
                        }else{
                            this.couponList = res.data.data.couponDTOList;
                        }
                        console.log(this.businessList)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            toCouponDetail(businessId, couponId) {
                this.$router.push({
                    name: 'couponDetail',
                    path: '/couponDetail',
                    params: {'businessId': businessId, 'couponId': couponId}
                });
            },
        }
    }
</script>

<style scoped>

</style>
