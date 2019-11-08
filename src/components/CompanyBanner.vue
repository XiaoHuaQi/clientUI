<template>
    <van-swipe :autoplay="3000" class="banner">
        <van-swipe-item v-for="(image, index) in bannerImg" :key="index">
            <van-image  :src="imgPath+image" fit="contain"  width="100%" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        data() {
            return {
                imgPath:'http://47.104.202.152/',
                bannerImg: [],
                companyId:""
            }
        },
        methods:{

        },mounted() {
            this.companyId = this.$route.query.companyId;
            this.$axios.post('/company/api/website',null,{
                params: {
                    type:"MobileBanner",
                    companyId:this.companyId
                }
            }).then( res => {
                //console.log(res.data.data.details);
                this.bannerImg=JSON.parse(res.data.data.details);
            });
        }
    }
</script>

