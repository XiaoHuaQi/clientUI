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
                imgPath:localStorage.getItem('imgPath'),
                bannerImg: [],
            }
        },
        methods:{

        },mounted() {
            this.$axios.post('/mobile/api/website',null,{
                params: {
                    type:"MobileBanner"
                }
            }).then( res => {
                this.bannerImg=JSON.parse(res.data.data.details);
            });
        }
    }
</script>

