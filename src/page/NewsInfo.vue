<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <navbar></navbar>
        <div class="newCon">
            <div class="newTit">
                <h1>{{newsInfo.title}}</h1>
                <p > 来源：{{newsInfo.resource}}  </p>
                <p  > 更新于：{{newsInfo.updateTime}}  </p>
                <p  > 阅读量：{{newsInfo.readingVolume}}  </p>

            </div>
            <div class="con" v-html="newsInfo.details"></div>
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
                newsInfo:{},
                companyId:"",
                newsId:""
            };
        },
        methods: {

            getData(){
               // this.categoryList=[{"title":"全部资讯","id":0}];
                this.$axios.post('/company/api/newsInfo',null,{
                    params: {
                        newsId: this.newsId
                    }
                }).then( res => {
                    console.log(res.data.data);
                    this.newsInfo=res.data.data;
                    this.companyId=res.data.data.companyId;
                });
            },

        },
        mounted() {
            this.companyId = this.$route.query.companyId;
            this.newsId = this.$route.query.newsId;
            this.getData();
        }
    }
</script>
