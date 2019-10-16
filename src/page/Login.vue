<template>
    <div class="wrap">
        <div class="head">
            <div class="title">登录</div>
        </div>
        <div class="main">
            <div class="loginBox">
                <div class="row">
                    <img :src="icon1" alt="">
                    <input type="text" placeholder="请输入账号" v-model="tel">
                </div>
                <div class="row">
                    <img :src="icon2" alt="">
                    <input type="password" placeholder="请输入密码" v-model="password">
                </div>
            </div>
            <div class="loginBtn">
                <input type="button" value="登录" @click="login">
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                tel:'',
                password:'',
                icon1:require('../assets/image/login/account.png'),
                icon2:require('../assets/image/login/psd.png'),

            }
        },
        methods:{
            login(){
                if(this.password && this.tel){
                    /*if(!(/^1[3456789]\d{9}$/.test(this.name))){
                        this.$messagebox.alert("亲，你填写的手机号码有误，请重填")
                        this.name=''
                        return false;
                    }
                    if(this.password.length<6){
                        this.$messagebox.alert("亲，密码至少6位或以上，请重填")
                        this.password=''
                        return false;
                    }*/
                    this.$axios.post('/bedding/api/login', null, {
                        params: {
                            password:this.password,
                            tel:this.tel
                        }
                    })
                        .then( res => {
                            console.log(res);
                            if(res.data.code==0){
                               /* localStorage.setItem('phone', this.tel)
                                localStorage.setItem('invite', res.data.data.inviteUser)
                                localStorage.setItem('time', res.data.data.lastLogin_time)*/
                                this.$router.push({
                                    path: '/Home'
                                })
                            }else{
                                this.$notify({ type: 'success', message: res.data.msg });
                            }
                        })
                }else {
                    this.$messagebox.alert("请输入账号或密码")
                }
            }
        }
    }
</script>

<style lang="less" src="../assets/less/Login.less" scoped></style>
