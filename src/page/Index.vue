<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="main">
            <div class="l menuBar">
                <van-sidebar v-model="activeKey" >
                    <van-sidebar-item v-for="(item,index) in categoryList" :key="index" :title="item.text" @click="setCategory(item.value)" />
                </van-sidebar>
            </div>
            <div class="l productBar">
                <van-grid  :border="true" :column-num="2">
                    <van-grid-item v-for="(item,index) in productList" :key="index" >
                        <van-image :src="imgPath+item.cover" @click="opening(item.id)"/>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="clear"></div>
        </div>

        <div class="page">
            <van-pagination v-model="currentPage" :page-count="pageCount" @change="handleCurrentChange"  mode="simple" />
        </div>

        <productPreview :images="images" :show="show" :title="title" ></productPreview>
    </div>
</template>

<script>
    import productPreview from '../components/ProductPreview'
    export default {
        components:{
            productPreview
        },
        data() {
            return {
                imgPath:localStorage.getItem('imgPath'),
                show: false,
                index: 0,
                activeKey: 0,
                categoryId:null,
                currentPage: 1,
                pageCount: 0,
                pageSize:6,
                categoryList:[],
                productList:[],
                productInfo:"",
                title:"",
                details: [],
                images: []
            };
        },

        methods: {
            getData(){
                this.$axios.post('/bedding/api/productList',null,{
                    params: {
                        categoryId:this.categoryId,
                        pageNum:this.currentPage,
                        pageSize:this.pageSize,
                    }
                }).then( res => {
                    console.log(res.data)
                    this.productList=res.data.data.productList.rows;
                    this.categoryList=res.data.data.categoryList;
                    this.currentPage=res.data.data.productList.currentPage;
                    this.pageSize=res.data.data.productList.pageSize;
                    this.pageCount=res.data.data.productList.pageCount;
                });
            },
            getProductInfo(id){
                this.$axios.post('/bedding/api/productInfo',null,{
                    params: {
                        productId:id
                    }
                }).then( res => {
                    console.log(res.data);
                    this.productInfo=res.data.data;
                    this.title=res.data.data.title;
                    if (this.productInfo!=null){
                        this.details=JSON.parse(res.data.data.details);
                    }
                    for (var i=0;i<this.details.length;i++){
                        this.images.push(this.imgPath+this.details[i]);
                    }
                });
            },
            setCategory(id){
                console.log(id);
                this.currentPage=1;
                this.categoryId=id;
                this.getData();
            },
            opening(id){
                this.images=[];
                this.getProductInfo(id);
                this.show=true;
            },
            onPreviewClose(){
                this.show=false;
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getData();
            },
        },
        mounted() {
            this.getData();

        }
    }
</script>
