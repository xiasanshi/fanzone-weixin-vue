<template>
    <div>
        <mt-search style="height: auto;"
                   v-model="search_value"
                   cancel-text="取消"
                   placeholder="搜索"
                   @keyup.native.enter="getSearchBuss">
        </mt-search>
        <div v-for="item in businessList" @click="toShop(item.bussinessId,item.bussinessName)">
            <business-temp :buss-name="item.bussinessName" :icon="item.bussinessIcon" :addr="item.bussinessAddress"
                           :coupon-list="item.couponList"></business-temp>
        </div>

        <div style="font-size: 10px" class="color_999 text_align_center margin_top_15">-- 到底了哦 --</div>
        <div style="height: 60px;width: 100%"></div>
    </div>
</template>

<script>
    import BusinessTemp from "../components/business/businessTemp";
    import {Fanzone} from "../api/api";
    import {Indicator, Toast, Lazyload} from 'mint-ui';

    export default {
        name: "business",
        components: {BusinessTemp},
        data() {
            return {
                search_value: '',
                businessList: '',

            }
        },
        mounted() {
            // document.title = '聚汇 - 商家'
            this.getAllBuss()
        },
        methods: {
            getAllBuss() {
                let api = new Fanzone()
                Indicator.open('加载中...');
                api.getAllBuss().then((res) => {
                    if (res.data.code == '0') {
                        this.businessList = res.data.data.bussinessList;
                        console.log(this.businessList)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            getSearchBuss() {
                let api = new Fanzone()
                console.log("search========")
                let para = {'name': this.search_value}
                Indicator.open('加载中...');
                api.searchBussAndShop(para).then((res) => {
                    if (res.data.code == '0') {
                        if(res.data.data.bussinessList.length === 0){
                            Toast('啊偶，什么也么搜索到哦，换个词再试试。');
                            this.getAllBuss()
                        }else{
                            this.businessList = res.data.data.bussinessList;
                        }
                        console.log(this.businessList)
                        Indicator.close()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            },
            toShop(businessId, businessName) {
                this.$router.push({
                    name: 'shop',
                    path: '/shop',
                    params: {'businessId': businessId, 'businessName': businessName}
                });
            }
        }
    }
</script>

<style scoped>
    .mint-searchbar {
        position: relative;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #20b6f9;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 8px 10px;
        z-index: 1;
    }
</style>
