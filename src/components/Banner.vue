<template>
    <van-swipe :autoplay="3000" class="banner">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <van-image  :src="image" fit="contain"  width="100%" height="100%"/>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        data() {
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-3.jpg',
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
            }
        }
    }
</script>

