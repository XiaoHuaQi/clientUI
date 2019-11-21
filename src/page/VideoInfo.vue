<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <navbar></navbar>
        <div class="newCon videoCon">
            <div class="newTit">
                <h1>{{videoInfo.name}}</h1>
                <p > 来源：{{videoInfo.source}}  </p>
                <p  > 更新于：{{videoInfo.updateTime}}  </p>
                <p  > 播放量：{{videoInfo.countPlay}}  </p>

            </div>

        </div>
        <div class="con">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
        </div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            精彩推荐
        </van-divider>
        <!--推荐视频  开始-->
        <van-grid :gutter="2" class="mgtop20" :column-num="2">
            <van-grid-item v-for="(item, index) in hotVideoList" :key="index" @click="goVideoInfo(item.id)">
                <van-image :src="imgPath+item.cover" />
                <van-tag plain type="primary" class="mgtop10">{{item.name}}</van-tag>
            </van-grid-item>
        </van-grid>
        <!--推荐视频  结束-->
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
                videoPath:'http://47.104.202.152',
                videoInfo:{},
                hotVideoList:[],
                videoId:"",
                videoUrl:"",
                playerOptions: {
                    //播放速度
                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false,
                    // 默认情况下将会消除任何音频。
                    muted: false,
                    // 导致视频一结束就重新开始。
                    loop: false,
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto',
                    language: 'zh-CN',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [{
                        //类型
                        type: "video/mp4",
                        //url地址
                        //src: 'http://47.104.202.152/zx.mp4'
                        src:''
                    }],
                    //你的封面地址
                    poster: '',
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '努力加载中···',
                    width: document.documentElement.clientWidth,
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true
                    }
                }
            };
        },
        methods: {
            getData(){
                this.$axios.post('/boss/api/videoInfo',null,{
                    params: {
                        videoId: this.videoId
                    }
                }).then( res => {
                    console.log(res.data.data);
                    this.videoInfo=res.data.data.videoInfo;
                    this.videoUrl=this.videoPath+this.videoInfo.src;
                    this.hotVideoList=res.data.data.hotVideoList;
                    //console.log( this.videoUrl);
                    //this.initVideo();
                    //将url赋值给src
                    this.playerOptions['sources'][0]['src'] = this.videoUrl;
                    this.playerOptions['poster'] = this.imgPath+this.videoInfo.cover;
                });
            },
            goVideoInfo(id) {
                this.videoId = id;
                this.getData();
            },

        },
        mounted() {
            this.videoId = this.$route.query.videoId;
            this.getData();
        }
    }
</script>
