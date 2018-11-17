<template>
    <span :join-list="joinList" :callback="callback" :img_url="img_url">
        <img :src="content" style="width: 100%"/>
    </span>
</template>

<script>
    export default {
        // name: "headUrl",
        data(){
            return {
                content: '',
            }
        },
        props:{
            joinList:[Object,Array],
            img_url:{
                type : String,
                default:'http://weixin.fanzone.vip/favicon.ico'
            }
        },
        mounted () {
            this.getURL(this.joinList)
        },
        methods:{
            getURL(join_list){
                // alert(join_list)
                console.log("==========order list==========")
                console.log(join_list)
                for(var each in join_list){
                    if(join_list[each].isCreator){
                        console.log("==========create==========")
                        this.content= join_list[each].headUrl
                        return
                    }
                }
                this.content = this.img_url
                return
            }
        }
    }
</script>

<style scoped>

</style>
