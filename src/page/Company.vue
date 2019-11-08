<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <companyBanner></companyBanner>

        <!--推荐公司  开始-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            商品推荐
        </van-divider>
        <van-card v-for="(item, index) in productList" :key="index" :title="item.title" :thumb="imgPath+item.cover" />
        <!--推荐公司  结束-->
        <!--广告位  开始-->
        <!--<van-image  src="http://47.104.202.152//ftpnginx/company/a469eb2bef498bea282913ed39b8d5d6.jpg" fit="contain"  width="100%" height="100%"/>-->
        <!--广告位  结束-->
        <!--资讯  开始-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            咨询推荐
        </van-divider>
        <van-tabs v-model="active" animated class="mgtop20 mgbottom50">
            <van-tab v-for="(item, index) in newsCategoryList" :key="index" :title="item.title">
                <van-cell-group>
                    <van-cell class="taleft" v-for="(itemList, indexList) in item.params.newsList" :key="indexList" :title="itemList.title"  />
                </van-cell-group>
            </van-tab>
        </van-tabs>
        <!--资讯  结束-->
        <companyfooter></companyfooter>
    </div>
</template>

<script>
    import companyBanner from '../components/CompanyBanner'
    import companyfooter from '../components/Companyfooter'
    export default {
        components:{
            companyBanner,
            companyfooter
        },
        data() {
            return {
                imgPath:'http://47.104.202.152/',
                active: 0,
                companyId:0,
                newsCategoryList:[],
                productList:[]
            };
        },
        methods: {
            getData(){
                this.$axios.post('/company/api/home',null,{
                    params: {
                        companyId: this.companyId
                    }
                }).then( res => {
                        console.log(res.data.data);
                        this.newsCategoryList=res.data.data.newsCategoryList;
                        this.productList=res.data.data.productList;

                    });
            }
        },
        mounted() {
            this.companyId = this.$route.query.companyId;
            console.log("公司编号："+this.companyId)
            this.getData();
        }
    }
</script>
