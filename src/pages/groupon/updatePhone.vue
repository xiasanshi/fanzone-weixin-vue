<template>
    <div>
        <div class="margin_top_15 padding_LR_15">
            <p class="fontsize_18 color_groupon"><b>为了确保是您本人操作</b></p>
            <br>
            我们会发送验证码到您的手机：
            <!--<b>{{phone}}</b>-->
        </div>
        <div class="phone_num">
            <form action="" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
                  method="post">
                <b class="color_groupon">
                    请输入新手机号：
                </b>
                <input type="text" id="phoneNum" v-model="phone" v-bind:placeholder="'请输入您的手机号'" maxlength="11"/>
                <div>
                    <input v-model="code" v-bind:placeholder="'验证码'" id="code" style="max-width: 60%;"/>&nbsp;
                    <!--<span id="get_code" @click="getCode()" class="colorFz ">获取验证码</span>-->
                    <span @click="getCode()">
                        <count-down :end-text="textTime" :end-time="endTime" :callback="hideTime()"
                        ></count-down>
                    </span>

                </div>
                <input type="button" id="ssubmit" style="border: 0;border-radius: 5px;" class="bg_groupon color_fff"
                       @click="putPhoneNum()" value="提交"/>
            </form>
        </div>
    </div>
</template>

<script>
    import {Indicator, Toast, MessageBox} from 'mint-ui';
    import {getSMSCode, putPhone,Fanzone} from '../api/api'
    import countDown from '../components/countDown'

    export default {
        name: "updatePhone",
        components: {countDown},
        data() {
            return {
                phone: '',
                code: '',
                textTime: '获取验证码',
                endTime: '',
                api:''
            }
        },
        methods: {
            getCode() {
                let openid = sessionStorage.getItem('openid')
                if (this.phone === '' && this.phone.length !== 11) {
                    Toast("请检查输入手机号的格式")
                    return
                }
                let param = {'openid': openid, 'phone': this.phone}
                Indicator.open('加载中...');
                if (this.endTime === '') {
                    getSMSCode(param).then((res) => {
                        if (res.data.code == '2000') {
                            Toast("提交成功");
                            // this.grouponList = res.data.data;
                            let t = new Date()
                            this.endTime = t.getTime() + 1000 * 60
                            this.textTime = "重新获取验证码"
                            Indicator.close()
                        } else {
                            Indicator.close();
                            Toast(res.data.msg);
                        }
                    })
                }else{
                    Toast("稍后重试");
                    Indicator.close()
                }
            },
            hideTime() {
                this.endTime = ''
                this.textTime = "获取验证码"
            },
            putPhoneNum() {
                let openid = sessionStorage.getItem('openid')
                if (this.phone === '' && this.phone.length !== 11) {
                    Toast("请检查输入手机号的格式")
                    return
                }
                let param = {'openid': openid, 'phone': this.phone, 'code': this.code}
                Indicator.open('加载中...');
                putPhone(param).then((res) => {
                    if (res.data.code == '2000') {
                        Toast("提交成功");
                        // this.grouponList = res.data.data;
                        Indicator.close()
                        window.history.back()
                    } else {
                        Indicator.close();
                        Toast(res.data.msg);
                    }
                })
            }
        },
        mounted() {
            this.api = new Fanzone()
        }
    }
</script>

<style scoped>
    .head_fix {
        height: 45px;
        width: 100%;
        color: snow;
    }

    .head_fix div {
        border: 0;
        height: 100%;
        line-height: 45px;
    }

    .head_fix a > div {
        font-size: 20px;
    }

    input {
        border: 0;
        height: 40px;
    }

    .pay {
        border-radius: 5px;
        z-index: 99;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(204, 204, 204, 0.5);
        padding: 10px;
    }

    .pay button {
        border-radius: 5px;
        border: 0px;
    }

    .pay form {
        border-radius: 10px;
        background: snow;
        width: 90%;
        margin: auto;
        padding: 10px;
        margin-top: 100px;
    }

    .pay div:nth-child(1) {
        position: absolute;
        right: 45%;
        top: 400px;
        font-size: 20px;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        border: 1px solid #666666;
        line-height: 24px;
        margin: auto;
        text-align: center;
    }

    .pay form input {
        margin-top: 15px;
        width: 100%;
        height: 45px;
    }

    .phone_num form input:nth-child(3) {
        margin-top: 30px;
        width: 100%;
        height: 50px;
        background: forestgreen;
        border: 0;
    }

    .phone_num form {
        border-radius: 10px;
        background: snow;
        width: 90%;
        margin: auto;
        padding: 10px;
        margin-top: 60px;
    }

    .phone_num div:nth-child(1) {
        position: absolute;
        right: 45%;
        top: 400px;
        font-size: 20px;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        border: 1px solid #666666;
        line-height: 24px;
        margin: auto;
        text-align: center;
    }

    .phone_num form input {
        margin-top: 15px;
        width: 100%;
        height: 45px;
    }

    .phone_num form input:nth-child(3) {
        margin-top: 30px;
        width: 100%;
        height: 50px;
        background: forestgreen;
        border: 0;
    }
</style>
