<template>
    <van-nav-bar class="backLine" title="标题" left-text="返回"  right-text="保存" left-arrow @click-left="onClickLeft" @click-right="onClickRight"></van-nav-bar>
</template>

<script>
    export default {
        methods: {
            onClickLeft() {
                console.log('返回');
            },
            onClickRight() {
                console.log('按钮');
            }
        }
    }
</script>

