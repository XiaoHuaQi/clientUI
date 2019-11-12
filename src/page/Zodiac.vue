<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <banner></banner>
        <van-field readonly clickable label="分类" :value="categoryValue" placeholder="分类选择" @click="showPicker = true" />

        <van-popup v-model="showPicker"  position="bottom">
            <van-row>
                <van-nav-bar title="分类选择" left-text="取消" right-text="查询" left-arrow @click-left="onClickLeft" @click-right="onClickRight"
                />
            </van-row>
            <van-row>
                <van-col span="8">
                    <van-picker id="picker1" :columns="category1" value-key="title" @change="pickerChange1" />
                </van-col>
                <van-col span="8">
                    <van-picker id="picker2" :columns="category2" value-key="title" @change="pickerChange2" />
                </van-col>
                <van-col span="8">
                    <van-picker id="picker3" :columns="category3" value-key="title" @change="pickerChange3" />
                </van-col>
            </van-row>
        </van-popup>

        <!--分类筛选  结束-->
        <!--推荐公司  开始-->
       <!-- <van-image  src="http://47.104.202.152//ftpnginx/company/a469eb2bef498bea282913ed39b8d5d6.jpg" fit="contain"  width="100%" height="100%"/>-->

        <!--推荐公司  结束-->
        <!--广告位  开始-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            {{finishedTip}}
        </van-divider>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="mgbottom50">
            <van-cell v-for="(item, index) in companyList" :key="index"  :class="(index==companyList.length-1)&&(companyList.length%2!=0)? 'zodiacCellCl':'zodiacCellFl'" @click="goCompany(item.id)">
                <van-image :src="imgPath+item.logo" class="zodiacLogo"/>
                <van-tag plain type="primary" class="mgtop10">{{item.fullName}}</van-tag>
            </van-cell>
        </van-pull-refresh>

        <!--广告位  结束-->

        <!--资讯  结束-->
        <vfooter></vfooter>
    </div>
</template>

<script>
    import banner from '../components/Banner'
    import vfooter from '../components/Vfooter';


    export default {
        components:{
            banner,
            vfooter
        },
        data() {
            return {
                imgPath:'http://47.104.202.152/',
                active: 2,
                showPicker: false,
                categoryValue: "",
                category1:[
                    { title: '全部', id: 0 }
                ],
                category2:[
                    { title: '全部', id: 0 }
                ],
                category3:[
                    { title: '全部', id: 0 }
                ],
                categoryName1:"",
                categoryName2:"",
                categoryName3:"",
                categoryValue1:"",
                categoryValue2:"",
                categoryValue3:"",
                categoryIds:"",
                list: [],
                loading: false,//控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false,//控制下拉刷新的加载动画
                currentPage:1,
                total:0,
                pageSize:8,
                totalPage: 0,
                companyList:[],
                finishedTip:"下拉加载更多~"
            };
        },
        methods: {
            onClickLeft() {
                this.showPicker=false;
            },
            onClickRight() {
                this.showPicker=false;
                this.categoryIds="";
                if (this.categoryValue3!=0&&this.categoryValue3!=undefined) {
                    this.categoryIds=this.categoryValue3;
                }else if (this.categoryValue2!=0&&this.categoryValue2!=undefined) {
                    this.categoryIds=this.categoryValue2;
                }else if (this.categoryValue1!=0&&this.categoryValue1!=undefined) {
                    this.categoryIds=this.categoryValue1;
                }
                console.log(this.categoryValue1+" > "+this.categoryValue2+" > "+this.categoryValue3);
                console.log(this.categoryIds);
                this.companyList=[];
                this.currentPage=1;
                this.getData();
            },
            pickerChange1(picker, values) {

                /*console.log("=====");
                console.log(values.title);
                console.log(values.id);
                console.log(values.child);*/
                this.categoryValue1=values.id;
                this.categoryName1="";
                this.categoryName2="";
                this.categoryValue2=0;
                this.category2=[
                    { title: '全部', id: 0 }
                ];
                this.categoryName3="";
                this.categoryValue3=0;
                this.category3=[
                    { title: '全部', id: 0 }
                ];
                this.categoryValue="";
                if (values.id!=0){
                    this.categoryName1=values.title;
                    this.categoryValue=this.categoryName1;
                    this.category2.push.apply(this.category2,values.child);
                }

            },
            pickerChange2(picker, values) {
                /*console.log(values.title);
                console.log(values.id);*/

                this.categoryValue2=values.id;
                this.categoryName2="";
                this.categoryName3="";
                this.categoryValue3=0;
                this.category3=[
                    { title: '全部', id: 0 }
                ];
                this.categoryValue=this.categoryName1;
                if (values.id!=0){
                    this.categoryName2=values.title;
                    this.categoryValue=this.categoryValue+' > '+this.categoryName2;
                    this.category3.push.apply(this.category3,values.child);
                }

            },
            pickerChange3(picker, values) {
                // console.log(values.title);
                // console.log(values.id);
                this.categoryName3="";
                this.categoryValue3=values.id;
                this.categoryValue=this.categoryName1+' > '+this.categoryName2;
                if (values.id!=0){
                    this.categoryName3=values.title;
                    this.categoryValue=this.categoryValue+' > '+this.categoryName3;
                }

            },
            getCategory(parId){
                this.$axios.post('/mobile/api/getCompanyCategory',null,{
                    params: {
                        parId: parId
                    }
                    }).then( res => {
                        //console.log(res.data.data);
                        this.category1.push.apply(this.category1,res.data.data);

                    });
            },
            goCompany(id) {
                this.$router.push({
                    path: '/Company',
                    query:{
                        companyId:id
                    }
                })
            },
            getData(){

                this.$axios.post('/mobile/api/companyPage',null,{
                    params: {
                        categoryIds: this.categoryIds,
                        pageNum: this.currentPage,
                        pageSize:this.pageSize
                    }
                }).then( res => {
                   // this.companyList.push.apply(res.data.data.rows,this.companyList);
                    this.companyList.unshift.apply(this.companyList,res.data.data.rows);
                    this.currentPage=res.data.data.currentPage;
                    this.pageSize=res.data.data.pageSize;
                    this.total=res.data.data.total;
                    this.isLoading = false;
                    let totalRecord=res.data.data.total;
                    let maxResult=res.data.data.pageSize;

                    let totalPage =  Math.ceil(totalRecord/ maxResult);
                    this.finishedTip="下拉加载更多~";
                    console.log(this.currentPage);
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
                    console.log("onRefresh");
                    this.currentPage=this.currentPage+1;
                    this.getData();
                }else{
                    this.finishedTip="已无更多~"
                }


            },

        },
        mounted() {
            this.getCategory(0);
            this.getData();

        }
    }
</script>
