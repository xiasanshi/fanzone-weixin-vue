<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="preUse">待使用</mt-tab-item>
            <mt-tab-item id="prePay">待支付</mt-tab-item>
            <mt-tab-item id="all">全部订单</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" class="margin_top_10">
            <mt-tab-container-item id="preUse">
                <pre-using></pre-using>
            </mt-tab-container-item>
            <mt-tab-container-item id="prePay">
                <pre-pay></pre-pay>
            </mt-tab-container-item>
            <mt-tab-container-item id="all">
               <history></history>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import PreUsing from "./preUsing";
    import PrePay from "./prePay";
    import History from "./historys";
    export default {
        name: "order",
        data() {
            return {
                selected: 'preUse'
            }

        },
        components: {History, PrePay, PreUsing}
    }
</script>

<style scoped>

</style>
