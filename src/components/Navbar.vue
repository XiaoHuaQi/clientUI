<template>
    <van-nav-bar class="backLine" left-text="返回"   left-arrow @click-left="onClickLeft" ></van-nav-bar>
</template>

<script>
    export default {
        methods: {
            onClickLeft() {
                console.log('返回');
                history.back();
            }
        }
    }
</script>

