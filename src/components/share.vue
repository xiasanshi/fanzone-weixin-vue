<template>
    <div :group-id="groupId" @click="toGroupon">
        <div class="phone_num" id="phone_num" @click="close_share()">
            <img src="../assets/images/icon/share10.png" width="100%"/>
        </div>
        <div class="position_fix"
             style="background-color: #FF9933;color: #ffffff;line-height: 50px;text-align: center;height: 50px;width: 100%">
            邀请好友
        </div>
    </div>
</template>

<script>
    import wxjs from '../common/wx'

    export default {
        name: "share",
        data() {
            return {
                id: ''
            }
        },
        props: {
            groupId: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.id = this.groupId
            // alert(this.id)
        },
        methods: {
            close_share() {
                document.getElementById('phone_num').style.display = 'none';
            },
            toGroupon() {
                // alert('ss')
                // alert(this.id)
                document.getElementById('phone_num').style.display = 'block';
                let url = location.href
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                console.log(userInfo.nickname + '邀请你参加' + this.detail.grouponName)
                wxjs.wx_share('聚汇 - 拼团', userInfo.nickname + '邀请你参加' + this.detail.grouponName, url)

            },
        }
    }
</script>

<style scoped>
    .phone_num {
        z-index: 99;
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(204, 204, 204, 0.5);
        padding: 10px;
    }
</style>
