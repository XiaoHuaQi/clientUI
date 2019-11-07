<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <banner></banner>
        <van-field readonly clickable label="分类" :value="value" placeholder="选择分类" @click="showPicker = true"  class="mgtop20" />

        <van-popup v-model="showPicker"  position="bottom">
            <van-row>
                <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight"
                />
            </van-row>
            <van-row>
                <van-col span="8">
                    <van-picker id="picker1" :columns="columns1" value-key="title" @change="pickerChange1" />
                </van-col>
                <van-col span="8">
                    <van-picker id="picker2" :columns="columns2" value-key="title" @change="pickerChange2" />
                </van-col>
                <van-col span="8">
                    <van-picker id="picker3" :columns="columns3" value-key="title" @change="pickerChange3" />
                </van-col>
            </van-row>
        </van-popup>

        <!--分类筛选  结束-->
        <!--推荐公司  开始-->
        <!-- <van-image  src="http://47.104.202.152//ftpnginx/company/a469eb2bef498bea282913ed39b8d5d6.jpg" fit="contain"  width="100%" height="100%"/>-->

        <!--推荐公司  结束-->
        <!--广告位  开始-->

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  class="mgtop20" >
            <van-grid :gutter="2" :column-num="2" v-for="item in list" :key="item" :title="item">
                <van-grid-item v-for="(item, index) in 8" :key="index">
                    <van-image src="http://47.104.202.152//ftpnginx/company/25c7e88f5a18879de61de538e8073caa.png" />
                    <van-tag plain type="primary" class="mgtop10">少年的你</van-tag>
                </van-grid-item>
            </van-grid>
        </van-list>

        <!--广告位  结束-->

        <!--资讯  结束-->
        <companyfooter></companyfooter>
    </div>
</template>

<script>
    import banner from '../components/Banner'
    import companyfooter from '../components/Companyfooter';


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
                value: "",
                columnsName1:"",
                columnsName2:"",
                columnsName3:"",
                columnsValue1:"",
                columnsValue2:"",
                columnsValue3:"",
                columns1: [
                    { title: '全部', value: 0 },
                    { title: '杭州', value: 1 },
                    { title: '宁波', value: 2 },
                    { title: '温州', value: 3 }
                ],
                columns2: [
                    { title: '全部', value: 0 },
                    { title: '杭州1', value: 11 },
                    { title: '宁波2', value: 12 },
                    { title: '温州3', value: 13 }
                ],
                columns3: [
                    { title: '全部', value: 0 },
                    { title: '杭州2', value: 21 },
                    { title: '宁波2', value: 22 },
                    { title: '温州2', value: 23 }
                ],
                list: [],
                loading: false,
                finished: false
            };
        },
        methods: {
            onClickLeft() {
                console.log('返回');
            },
            onClickRight() {
                console.log('按钮');
            },
            pickerChange1(picker, values) {
                console.log(values.title);
                console.log(values.value);
                this.columnsName1="";
                if (values.value!=0){
                    this.columnsName1=values.title;
                    this.value=this.columnsName1;
                }

            },
            pickerChange2(picker, values) {
                console.log(values.title);
                console.log(values.value);
                this.columnsName2="";
                if (values.value!=0){
                    this.columnsName2=values.title;
                    this.value=this.columnsName1+'>'+this.columnsName2;
                }

            },
            pickerChange3(picker, values) {
                console.log(values.title);
                console.log(values.value);
                this.columnsName3="";
                if (values.value!=0){
                    this.columnsName3=values.title;
                    this.value=this.columnsName1+'>'+this.columnsName2+'>'+this.columnsName3;
                }

            },onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 2; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 2) {
                        this.finished = true;
                    }
                }, 500);
            }

        },
        mounted() {


        }
    }
</script>
