<template>
    <div style="position: fixed;bottom: 0" class="bg_ff width_100 border_top2 page">
        <!-- tab-container -->
        <!-- <mt-tab-container v-model="selected">
             <mt-tab-container-item id="Fanzone">
                 <Happy></Happy>
             </mt-tab-container-item>
             <mt-tab-container-item id="order">
                 <Join></Join>
             </mt-tab-container-item>
             <mt-tab-container-item id="pay">
                 <mt-cell v-for="n in 6" :title="'选项 ' + n" />
             </mt-tab-container-item>
         </mt-tab-container>-->
        <div style="width: 100%;height: 1px;background-color: #cccccc"></div>
        <mt-navbar v-model="selected" class="padding_0" style="padding: 5px;border-top: #cccccc 1px">
            <mt-tab-item id="fanzone" class="padding_0" style="padding: 0px">
                <!--<img slot="icon" :src="formatSrc('Fanzone')" width="24" height="24">-->
                <span class="icon iconfont icon-shouye-" style="width: 100%;font-size: 27px"></span>
                <!--<i slot="icon" class="icon iconfont">&#xe64f;</i>-->
                <div style="margin-top: 5px" class="name">首页</div>
            </mt-tab-item>
            <mt-tab-item id="order"  class="padding_0" style="padding: 0">
                <!--<img slot="icon" :src="formatSrc('order')" width="24" height="24">-->
                <!--参团-->
                <span class="icon iconfont icon-lishidingdan" style="width: 100%;font-size: 30px"></span>
                <!--<i slot="icon" class="icon iconfont">&#xe64f;</i>-->
                <div style="margin-top: 5px" class="name">订单</div>
            </mt-tab-item>
            <mt-tab-item id="personal" class="padding_0" style="padding: 0">
                <!--<img slot="icon" :src="formatSrc('customer')" width="24" height="24">-->
                <!--订单-->
                <span class="icon iconfont icon-geren" style="width: 100%;font-size: 30px"></span>
                <!--<i slot="icon" class="icon iconfont">&#xe64f;</i>-->
                <div style="margin-top: 5px" class="name">我的</div>
            </mt-tab-item>
        </mt-navbar>

    </div>
</template>

<script>


    export default {
        name: "footer",
        props: ['pageType'],
        data() {
            return {
                selected: 'fanzone'
            }

        },
        methods: {
            formatSrc(id) {
                if (id === this.selected) {
                    return require('../assets/images/icon/' + id + '-c.png')
                }
                return require('../assets/images/icon/' + id + '-d.png')
            },
            setSelected(para){
                // alert('sss')
                this.selected = para
            }
        },
        mounted(){
            // alert(this.selected)
        },
        watch: {
            selected: function (newp, oldp) {
                // alert('watch:'+newp)
                if(newp === 'order'){
                    this.$router.push({name: 'order'});
                }else if(newp === 'personal'){
                    this.$router.push({name: 'personal'});
                }else if(newp === 'fanzone'){
                    this.$router.push({name: 'fanzone'});
                }else{
                    // alert('dd')
                    console.log(newp)
                }
            },
            "$route"(to, from) {
                let name = to.name
                // alert(name)
                this.setSelected(name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/min.scss";

    .mint-navbar .mint-tab-item.is-selected {
        color: #20b6f9;
        border: 0;
    }
</style>
