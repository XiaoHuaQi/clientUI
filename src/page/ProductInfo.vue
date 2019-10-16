<template>
    <div class="main">
        <van-nav-bar class="backLine" :title="title" left-text="返回"  right-text="保存" left-arrow @click-left="goHome" @click-right="saveData"></van-nav-bar>
        <div class="content">
            <van-cell-group>
                <van-field v-model="title" label="名称" type="textarea" placeholder="请输入名称" rows="1" autosize/>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="categoryId" label="分类"  :options="categoryList" autosize/>
                </van-dropdown-menu>
            </van-cell-group>

            <div class="cover">
                <van-image fit="contain" :src="imgPath+cover"  />
                <div class="actionLine">
                    <van-uploader class="uploadBtn" :after-read="afterRead" multiple>
                        <van-button icon="photo" type="info">上传图片</van-button>
                    </van-uploader>
                    <van-button icon="eye-o" type="primary"  class="reviewBtn" @click="onPreview">效果预览</van-button>
                </div>
            </div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                产品详情
            </van-divider>
            <div>
                <van-grid  :border="true" :column-num="2">
                    <van-grid-item v-for="(item,index) in details" :key="index">
                        <van-image :src="imgPath+item" @click="openMenu(item)" />
                    </van-grid-item>
                </van-grid>
            </div>
        </div>

        <productPreview :images="images" :show="show" :title="title" @onClose="onPreviewClose"></productPreview>

        <van-action-sheet v-model="optionMenu" :actions="actions" @select="onSelect" @cancel="onCancel" cancel-text="取消" />
        <van-overlay :show="showOverlay" @click="show = false" />
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
                showOverlay: false,
                optionMenu: false,
                index: 0,
                title:"",
                activeKey: 0,
                categoryId: "0",
                timeOutEvent:0,
                cover:"",
                currentId:null,
                productInfo:{},
                details:[],
                currentItem:"",
                imgs:"",
                categoryList: [
                    { text: '全部分类', value: "0" }
                ],
                actions: [
                    { name: '设置为封面', value: 2 },
                    { name: '删除', value: 3 }
                ],
                images: []
            };
        },

        methods: {
            goHome() {
                this.$router.push({
                    path: '/Home'
                })
            },
            openMenu(item){
                this.optionMenu=true;
                this.currentItem=item;
            },
            onCancel(){
                this.optionMenu=false;
            },
            onPreview(){
                this.images=[];
                for (var i=0;i<this.details.length;i++){
                    this.images.push(this.imgPath+this.details[i]);
                }
                this.show=true;
            },
            onPreviewClose(){
                this.show=false;
            },
            openDialoge(item){
                this.$dialog.confirm({
                    title: '确认设置为封面',
                }).then(() => {
                    this.cover=this.currentItem;
                }).catch(() => {
                    // on cancel
                    console.log(item);
                });
            },
            deleteDialoge(item){
                this.$dialog.confirm({
                    title: '确认删除',
                }).then(() => {
                    // on confirm
                    this.details = this.details.filter(
                        t => t != this.currentItem
                    );
                }).catch(() => {
                    // on cancel
                    console.log(item);
                });
            },
            onSelect(item) {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.optionMenu = false;
                if (item.value==2){//设置为封面
                    this.openDialoge(item);
                }else if (item.value==3){//删除
                    this.deleteDialoge(item);
                }

            },
            getData(){
                this.productInfo={};
                this.categoryList=[];
                this.details=[];
                this.$axios.post('/bedding/api/user/productInfo',null,{
                    params: {
                        id:this.currentId
                    }
                }).then( res => {

                    this.productInfo=res.data.data.productInfo;
                    this.categoryList=res.data.data.categoryList;
                    if (this.productInfo!=null){
                        this.title=res.data.data.productInfo.title;
                        this.cover=res.data.data.productInfo.cover;
                        this.categoryId=res.data.data.productInfo.category;
                        this.details=JSON.parse(res.data.data.productInfo.details);
                    }

                });
            },
            saveData(){
                this.showOverlay=true;
                this.imgs="$";
                for (var i=0;i<this.details.length;i++){
                    this.imgs=this.imgs+this.details[i]+"$";
                }
                this.$axios.post('/bedding/api/user/updateProduct',null,{
                    params: {
                        id:this.currentId,
                        cover:this.cover,
                        title:this.title,
                        categoryId:this.categoryId,
                        details:this.imgs
                    }
                }).then( res => {
                    this.showOverlay=false;
                    this.$toast(res.data.msg);
                    if (res.data.code==0){
                        this.goHome();
                    }

                });
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                let config = {
                    headers: { //添加请求头
                        'Content-Type': 'multipart/form-data'
                    }
                };
                let content = file.file;
                let params = new FormData();
                params.append('file',content);

                this.$axios.post('/bedding/api/user/upload',params,config)
                    .then((res) => {
                        // console.log(this);
                        // console.log(res.data.url);
                        // console.log(typeof this.details.unshift);
                        // //this.details.unshift(1);
                        this.details.unshift(res.data.url);
                    })

            }
        },
        mounted() {
            this.currentId = this.$route.query.productId;
            this.getData();
        }
    }
</script>
