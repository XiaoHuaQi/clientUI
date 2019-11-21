<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <banner></banner>

        <!--推荐公司  开始-->
        <van-grid :gutter="2" class="mgtop20" :column-num="2">
            <van-grid-item v-for="(item, index) in hotCompanyList" :key="index" @click="goCompany(item.id)">
                <van-image :src="imgPath+item.logo" />
                <van-tag plain type="primary" class="mgtop10">{{item.abbreviation}}</van-tag>
            </van-grid-item>
        </van-grid>
        <!--推荐公司  结束-->
        <!--广告位  开始-->
        <van-image  :src="imgPath+adSite8.details" fit="contain" class="mgtop20" width="100%" height="100%"/>
        <!--广告位  结束-->

        <!--推荐视频  开始-->
        <van-grid :gutter="2" class="mgtop20" :column-num="2">
            <van-grid-item v-for="(item, index) in hotVideoList" :key="index" @click="goVideoInfo(item.id)">
                <van-image :src="imgPath+item.cover" />
                <van-tag plain type="primary" class="mgtop10">{{item.name}}</van-tag>
            </van-grid-item>
        </van-grid>
        <!--推荐视频  结束-->

        <!--资讯  开始-->
        <van-tabs v-model="active" animated class="mgtop20 mgbottom50">
            <van-tab v-for="(item, index) in newsCategoryList" :key="index" :title="item.title">
                <van-cell-group>
                    <van-cell class="taleft" v-for="(itemList, indexList) in item.params.newsList" :key="indexList" :title="itemList.title"  @click="goNewsInfo(itemList.id)" />
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
                imgPath:'http://47.104.202.152/',
                active: 0,
                newsCategoryList:[],
                adSite8:{},
                hotCompanyList:[],
                hotVideoList:[],

            };
        },
        methods: {
            goCompany(id) {
                this.$router.push({
                    path: '/Company',
                    query:{
                        companyId:id
                    }
                })
            },
            goVideoInfo(id) {
                this.$router.push({
                    path: '/VideoInfo',
                    query:{
                        videoId:id
                    }
                })
            },
            goNewsInfo(id) {
                this.$router.push({
                    path: '/NewsInfo',
                    query:{
                        newsId:id
                    }
                })
            },
            getData(){
                this.$axios.post('/mobile/api/home',null)
                    .then( res => {
                        console.log(res.data.data);
                        this.newsCategoryList=res.data.data.newsCategoryList;
                        this.adSite8=res.data.data.adSite8;
                        this.hotCompanyList=res.data.data.hotCompanyList;
                        this.hotVideoList=res.data.data.hotVideoList;

                    });
            }
        },
        mounted() {
            this.getData();

        }
    }
</script>
