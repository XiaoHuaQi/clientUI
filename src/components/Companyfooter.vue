<template>
    <van-tabbar v-model="active">
        <van-tabbar-item name="Company" icon="wap-home-o" @click="goCompany" >首页</van-tabbar-item>
        <van-tabbar-item name="News" icon="comment-o" @click="goNews">资讯</van-tabbar-item>
        <van-tabbar-item name="Product" icon="apps-o"  @click="goProduct">产品</van-tabbar-item>
        <van-tabbar-item name="About" icon="like-o"  @click="goAbout">关于我们</van-tabbar-item>
        <van-tabbar-item name="Index" icon="star-o"  @click="goSuper">官网</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        data() {
            return {
                companyId:0,
                active: "Company",
            }
        },methods: {
            goCompany() {
                if (this.$route.name!='Company') {
                    this.$router.push({
                        path: '/Company',
                        query:{
                            companyId:this.companyId
                        }
                    })
                }
            },
            goNews(){
                if (this.$route.name!='News') {
                    this.$router.push({
                        path: '/News',
                        query:{
                            companyId:this.companyId
                        }
                    })
                }
            },
            goProduct(){
                if (this.$route.name!='Product') {
                    this.$router.push({
                        path: '/Product',
                        query:{
                            companyId:this.companyId
                        }
                    })
                }
            },
            goAbout(){
                if (this.$route.name!='About') {
                    this.$router.push({
                        path: '/About',
                        query:{
                            companyId:this.companyId
                        }
                    })
                }
            },
            goSuper(){
                if (this.$route.name!='Index') {
                    this.$router.push({
                        path: '/Index',
                    })
                }
            },
        },
        mounted() {
            this.companyId = this.$route.query.companyId;
            this.active=this.$route.name;
        }
    }
</script>

