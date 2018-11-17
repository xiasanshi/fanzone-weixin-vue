<template>
    <div class="bg_f0" style="padding: 30px">
        <div class="bg_ff position_re">
            <div>
                <mt-cell :title="grouponName" :to="{name:'preGroupon',path:'/preGroupon',id:grouponId}"
                         is-link value=""></mt-cell>
            </div>
            <div>
                <p>有效期至：2018-12-25</p>
                <p :to="'http://3gimg.qq.com/lightmap/v1/wxmarker/index.html?marker=coord:31.22155478628681,121.35416507720947;title:%E8%A7%A6%E6%91%B8%E9%A2%91%E9%81%93;addr:%E4%B8%AD%E5%9B%BD%E4%B8%8A%E6%B5%B7%E5%B8%82%E4%B8%8A%E6%B5%B7%E5%B8%82%E9%95%BF%E5%AE%81%E5%8C%BA%E5%8D%8F%E5%92%8C%E8%B7%AF1011%E5%8F%B7&referer=wexinmp_profile'">
                    地址：cccc</p>
                <div>
                    <h3>注意事项</h3>
                    <li>必须进店消费</li>
                </div>
            </div>
            <div style="height: 40px">
                <div style="height: 20px;width: 100%;border-bottom: 1px #cccccc">

                </div>
                <div class="bg_fff" style="height: 40px;width: 40px;position: absolute;left: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <circle cx="0" cy="20" r="20" stroke="black" stroke-width="0" fill="#f0f0f0" />
                    </svg>
                </div>
                <div class="bg_fff" style="height: 40px;width: 40px;position: absolute;right: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <circle cx="40" cy="20" r="20" stroke="black" stroke-width="0" fill="#f0f0f0" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderDetail",
        data() {
            return {
                orderId: ''
            }
        },
        methods: {},
        mounted() {
            document.title = '订单详情'
            wxjs.wx_share('聚汇 - '+ this.couponDetail.couponName, '聚生活，汇服务', location.href)
        }
    }
</script>

<style scoped>

</style>
