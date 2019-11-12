<template>
    <van-goods-action>
        <van-goods-action-icon class="footerBtn" icon="wap-home-o" text="首页" @click="goIndex" />
        <van-goods-action-icon class="footerBtn" icon="friends-o" text="合作伙伴" @click="goZodiac" />
        <!--<van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />-->
    </van-goods-action>
</template>

<script>
    export default {
        data() {
            return {

            }
        },methods: {
            goIndex() {
                if (this.$route.name!='Index') {
                    this.$router.push({
                        path: '/Index'
                    })
                }
            },
            goZodiac(){
                if (this.$route.name!='Zodiac') {
                    this.$router.push({
                        path: '/Zodiac'
                    })
                }
            },
        },
        mounted() {
            console.log(this.$route.name)

        }
    }
</script>

