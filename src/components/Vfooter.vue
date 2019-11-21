<template>
    <van-tabbar v-model="active">
        <van-tabbar-item name="Index" icon="wap-home-o" @click="goIndex" >首页</van-tabbar-item>
        <van-tabbar-item name="Video" icon="video-o" @click="goVideo">教学视频</van-tabbar-item>
        <van-tabbar-item name="Zodiac" icon="friends-o"  @click="goZodiac">合作伙伴</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        data() {
            return {
                active: "Index",
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
            goVideo(){
                if (this.$route.name!='Video') {
                    this.$router.push({
                        path: '/Video'
                    })
                }
            },
        },
        mounted() {
            this.active=this.$route.name;
        }
    }
</script>

