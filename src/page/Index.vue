<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <banner></banner>

        <!--推荐公司  开始-->
        <van-grid :gutter="2" class="mgtop20" :column-num="2">
            <van-grid-item v-for="(item, index) in 8" :key="index">
                <van-image src="http://47.104.202.152/ftpnginx/company/a1d06c674d62a406ddc846aad537542f.png" />
                <van-tag plain type="primary" class="mgtop10">九木德文化传媒有限公司</van-tag>
            </van-grid-item>
        </van-grid>
        <!--推荐公司  结束-->
        <!--广告位  开始-->
        <van-image  src="http://47.104.202.152//ftpnginx/company/a469eb2bef498bea282913ed39b8d5d6.jpg" fit="contain"  width="100%" height="100%"/>
        <!--广告位  结束-->
        <!--资讯  开始-->
        <van-tabs v-model="active" animated class="mgtop20">
            <van-tab v-for="(item, index) in 8" :key="index" :title="'选项 ' + item">
                <van-cell-group>
                    <van-cell class="taleft" v-for="(itemList, indexList) in 5" :key="indexList" :title="'单元格单元格单元格单元格单元格单元格单'+itemList"  />
                </van-cell-group>
            </van-tab>
        </van-tabs>
        <!--资讯  结束-->
        <vfooter></vfooter>
    </div>
</template>

<script>
    import banner from '../components/Banner'
    import vfooter from '../components/Vfooter'
    export default {
        components:{
            banner,
            vfooter
        },
        data() {
            return {
                imgPath:localStorage.getItem('imgPath'),
                active: 2

            };
        },
        methods: {

        },
        mounted() {


        }
    }
</script>
