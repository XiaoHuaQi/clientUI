<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <navbar></navbar>
        <div class="newCon">
            <div class="newTit">
                <h1>{{productInfo.title}}</h1>
                <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                    简介
                </van-divider>
                <div > {{productInfo.profiles}}  </div>

            </div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                产品详情
            </van-divider>
            <div class="con" v-html="productInfo.details"></div>
        </div>

        <!--资讯  结束-->
        <!--<companyfooter></companyfooter>-->
    </div>
</template>

<script>
    import navbar from '../components/Navbar'


    export default {
        components:{
            navbar
        },
        data() {
            return {
                imgPath:'http://47.104.202.152/',
                productInfo:{},
                companyId:"",
                productId:""
            };
        },
        methods: {

            getData(){
               // this.categoryList=[{"title":"全部资讯","id":0}];
                this.$axios.post('/company/api/productInfo',null,{
                    params: {
                        productId: this.productId
                    }
                }).then( res => {
                    console.log(res.data.data);
                    this.productInfo=res.data.data;
                    this.companyId=res.data.data.companyId;
                });
            },

        },
        mounted() {
            this.companyId = this.$route.query.companyId;
            this.productId = this.$route.query.productId;
            this.getData();
        }
    }
</script>
