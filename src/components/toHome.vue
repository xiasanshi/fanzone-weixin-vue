<template>
    <div class="home-icon" v-show="show" @click="toHome()">
        <img src="../assets/images/icon/home.png" class="width_100"/>
    </div>
</template>

<script>
    import tool from '../common/util/tool'

    export default {
        name: "toHome",
        data() {
            return {
                show: true,
                scrollTop: 0,
            }
        },
        created() {
            window.onscroll = (e) => {
                this.scrollTop = tool.getScrollTop()
            }
        },
        beforeDestory() {
            window.onscroll = null;
        },
        watch: {
            scrollTop(to, from) {
                if (to - from > 10) {
                    this.show = false;
                } else if (to - from < -10) {
                    this.show = true
                }
            }
        },
        methods: {
            toHome() {
                this.$router.push({name: 'fanzone', path: '/fanzone'});
            }
        }

    }
</script>

<style scoped>
    .home-icon {
        position: fixed;
        right: 20px;
        bottom: 100px;
        height: 50px;
        width: 50px;
        font-size: 50px;
        z-index: 9999;
        color: #68c59b;
        animation:myfirst 2s;
        -webkit-animation:myfirst 2s; /* Safari and Chrome */
    }
    @keyframes myfirst
    {
        from {right:-30px}
        to {right:20px}
    }

    @-webkit-keyframes myfirst /* Safari and Chrome */
    {
        from {right:-30px}
        to {right:20px}
    }
</style>
