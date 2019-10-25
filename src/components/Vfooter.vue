<template>
    <van-goods-action>
        <van-goods-action-icon class="footerBtn" icon="wap-home-o" text="首页" @click="onClickIcon" />
        <van-goods-action-icon class="footerBtn" icon="friends-o" text="合作伙伴" @click="onClickIcon" />
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
            onClickIcon() {
                console.log('点击图标');
            },
            onClickButton() {
                console.log('点击按钮');
            }
        },
        mounted() {


        }
    }
</script>

