<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <companyBanner></companyBanner>
        <van-row class="mgbottom40">
            <van-col span="6">

                <!--分类筛选  开始-->
                <van-sidebar v-model="activeKey" >
                    <van-sidebar-item v-for="(item,index) in categoryList" :key="index" :title="item.title" @click="setCategory(item.id)" />
                </van-sidebar>
                <!--分类筛选  结束-->

            </van-col>
            <van-col span="18">

                <!--新闻列表  开始-->
                <!--<van-list v-model="loading" :finished="finished" finished-text="没有更多了"    >
                    <van-cell v-for="item in newsList" :key="item" :title="item" />
                </van-list>-->
                <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                    {{finishedTip}}
                </van-divider>
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-cell v-for="(item, index) in newsList" :key="index" :title="'▶ '+item.title" class="newTitle" @click="goNewsInfo(item.id)"  ></van-cell>
                </van-pull-refresh>
                <!--新闻列表  结束-->

            </van-col>
        </van-row>


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
                showPicker: false,
                activeKey: 0,
                value: "",
                categoryList:[{"title":"全部资讯","id":0}],
                newsList: [],
                loading: false,//控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false,//控制下拉刷新的加载动画
                currentPage:"1",
                categoryId:"",
                companyId:"",
                pageSize:"1",
                finishedTip:"下拉加载更多~",
                isLoadCategory:false
            };
        },
        methods: {
            setCategory(id){
                this.categoryId=id;
                if (id==0){
                    this.categoryId="";
                }
                this.newsList=[];
                this.currentPage=1;
                this.getData();
            },
            getData(){
               // this.categoryList=[{"title":"全部资讯","id":0}];
                this.$axios.post('/company/api/news',null,{
                    params: {
                        categoryId: this.categoryId,
                        companyId: this.companyId,
                        pageNum: this.currentPage,
                        pageSize:this.pageSize
                    }
                }).then( res => {
                    //console.log(res.data.data)
                    this.newsList.unshift.apply(this.newsList,res.data.data.newsList.rows);
                    if (!this.isLoadCategory){
                        this.categoryList.push.apply(this.categoryList,res.data.data.categoryList);
                        this.isLoadCategory=true;
                    }
                    this.currentPage=res.data.data.newsList.currentPage;
                    this.pageSize=res.data.data.newsList.pageSize;
                    this.total=res.data.data.newsList.total;
                    this.isLoading = false;
                    let totalRecord=res.data.data.newsList.total;
                    let maxResult=res.data.data.newsList.pageSize;

                    let totalPage =  Math.ceil(totalRecord/ maxResult);
                    this.finishedTip="下拉加载更多~";
                    if (totalPage<=this.currentPage) {
                        this.currentPage=this.currentPage-1;
                        this.finished=true;
                        this.finishedTip="已无更多~"
                    }
                });
            },
            //下拉刷新
            onRefresh() {
                this.isLoading = false;
                this.finishedTip="正在玩命加载···"
                if (!this.finished){
                    this.currentPage=this.currentPage+1;
                    this.getData();
                }else{
                    this.finishedTip="已无更多~"
                }


            },
            goNewsInfo(id) {
                this.$router.push({
                    path: '/NewsInfo',
                    query:{
                        newsId:id
                    }
                })
            },
        },
        mounted() {
            this.companyId = this.$route.query.companyId;
            this.getData();
        }
    }
</script>
