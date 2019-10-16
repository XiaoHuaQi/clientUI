<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div>
            <div class="l menuBar">
                <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)"  @click="goProductInfo()">新&nbsp;&nbsp;&nbsp;&nbsp;增</van-button>
                <van-sidebar v-model="activeKey" >
                    <van-sidebar-item v-for="(item,index) in categoryList" :key="index" :title="item.text" @click="setCategory(item.value)" />
                </van-sidebar>
            </div>
            <div class="l productBar">
                <van-grid  :border="true" :column-num="2">
                    <van-grid-item v-for="(item,index) in productList" :key="index" >
                        <van-image :src="imgPath+item.cover" @click="goProductInfo(item.id)"/>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="clear"></div>
        </div>

        <div class="page">
            <van-pagination v-model="currentPage" :page-count="pageCount" @change="handleCurrentChange"  mode="simple" />
        </div>

        <productPreview :images="images" :show="show" ></productPreview>

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
                currentPage: 1,
                pageCount: 0,
                pageSize:6,
                categoryId:0,
                productList:[],
                categoryList:[],
                images: []
            };
        },

        methods: {
            opening(){
                this.show=true;
            },
            onPreviewClose(){
                this.show=false;
            },
            goProductInfo(id){
                console.log(id)

                if (id==null||id==""||id==undefined){
                    this.$router.push({
                        path: '/ProductInfo'
                    })
                }else{
                    this.$router.push({
                        path: '/ProductInfo?productId='+id
                    })
                }

            },
            setCategory(id){
                this.currentPage=1;
                this.categoryId=id;
                this.getData();
            },
            getData(){
                this.$axios.post('/bedding/api/user/productList',null,{
                    params: {
                        categoryId:this.categoryId,
                        pageNum:this.currentPage,
                        pageSize:this.pageSize,

                    }
                }).then( res => {
                    this.productList=res.data.data.productList.rows;
                    this.categoryList=res.data.data.categoryList;
                    this.currentPage=res.data.data.productList.currentPage;
                    this.pageSize=res.data.data.productList.pageSize;
                    this.pageCount=res.data.data.productList.pageCount;
                });
            },handleCurrentChange(val) {
                this.currentPage=val;
                this.getData();
            },
        },mounted() {
            this.getData();
        }
    }
</script>
