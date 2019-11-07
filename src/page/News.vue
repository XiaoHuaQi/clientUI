<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <banner></banner>
        <van-row>
            <van-col span="6">

                <!--分类筛选  开始-->
                <van-sidebar v-model="activeKey" >
                    <van-sidebar-item v-for="(item,index) in categoryList" :key="index" :title="item.title" @click="setCategory(item.value)" />
                </van-sidebar>
                <!--分类筛选  结束-->
                
            </van-col>
            <van-col span="18">

                <!--新闻列表  开始-->
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了"   @load="onLoad" >
                    <van-cell v-for="item in list" :key="item" :title="item" />
                </van-list>
                <!--新闻列表  结束-->

            </van-col>
        </van-row>


        <!--资讯  结束-->
        <companyfooter></companyfooter>
    </div>
</template>

<script>
    import banner from '../components/Banner'
    import companyfooter from '../components/Companyfooter'


    export default {
        components:{
            banner,
            companyfooter
        },
        data() {
            return {
                imgPath:localStorage.getItem('imgPath'),
                active: 2,
                showPicker: false,
                activeKey: 0,
                value: "",
                categoryList:[{"title":"国际新闻","id":1},{"title":"国际新闻","id":1}],
                list: [],
                loading: false,
                finished: false,
                currentPage:"",
                categoryId:""
            };
        },
        methods: {
            onClickLeft() {
                console.log('返回');
            },
            onClickRight() {
                console.log('按钮');
            },
            setCategory(id){
                console.log(id);
                this.currentPage=1;
                this.categoryId=id;
                //this.getData();
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            }

        },
        mounted() {


        }
    }
</script>
