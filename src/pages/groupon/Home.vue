<template>
    <div class="page" style="height: 100%">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <Footer ref="footer"></Footer>
    </div>
</template>

<script>
    import Footer from "../components/foot";
    import wxjs from "../common/wx"
    export default {
        components: {Footer},
        data() {
            return {
                sysName: 'FanZone',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        data() {
            return {
                transition: "slide-left"
            };
        },
        watch: {
            "$route"(to, from) {
                this.transition = this.checkDirecition(to.name, from.name) && "slide-left" || "slide-right";
                    // alert('ss')
                // this.$refs.footer.setSelected(to.name);

            }
        },
        methods: {
            checkDirecition(to, from) {
                let map = ["index", "foot", "happy", "join", "order", "preGroupon", "preJoin", "message"];
                return (map.indexOf(to) - map.indexOf(from)) > 0;
            },
            toFooter(){
                // alert('ss')
                // alert(this.$route.name)
                let name = this.$route.name
                if(name === undefined){
                    // alert(name)
                    return this.$router.push({name: 'groupon'});
                }
                // let param = name ? name : 'groupon'
                // alert(name)
                this.$refs.footer.setSelected(name);
            },
        },
        mounted(){
            this.toFooter()
            // wxjs.wx_share('聚汇', '', location.href)
            // this.$router.push({ name: 'index'});
        },

    }

</script>

<style lang="scss" scoped>
    @import "../assets/scss/min.scss";

    .mint-navbar .mint-tab-item.is-selected {
        color: #ff9933;
        border: 0;
    }
</style>
