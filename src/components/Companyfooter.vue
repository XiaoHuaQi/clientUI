<template>
    <van-goods-action>
        <van-goods-action-icon class="footerBtn" icon="wap-home-o" text="首页" @click="goCompany" />
        <van-goods-action-icon class="footerBtn" icon="comment-o" text="资讯" @click="goNews" />
        <van-goods-action-icon class="footerBtn" icon="apps-o" text="产品" @click="goProduct" />
        <van-goods-action-icon class="footerBtn" icon="like-o" text="关于我们" @click="goAbout" />
        <van-goods-action-icon class="footerBtn" icon="star-o" text="官网" @click="goSuper" />
        <!--<van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />-->
    </van-goods-action>
</template>

<script>
    export default {
        data() {
            return {
                companyId:0,
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
                        path: '/Index'
                    })
                }
            },
        },
        mounted() {
            this.companyId = this.$route.query.companyId;

        }
    }
</script>

