<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <companyBanner></companyBanner>
        <!--信息  开始-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" class="mgtop20">
            {{company.abbreviation}}
        </van-divider>
        <van-cell-group>
            <van-cell title="全称" :value="company.fullName" />
            <van-cell title="联系电话" :value="company.hotline"  />
            <van-cell title="Email" :value="company.mailbox"  />
            <van-cell title="地址" :value="company.province+company.city+company.county"  />
            <van-cell title="详细地址" :value="company.address"  />
        </van-cell-group>
        <!--信息  结束-->
        <!--百度地图  开始-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" class="mgtop20">
            我们在这
        </van-divider>
        <div class="baidumap mgtop20 mgbottom50" id="allmap"></div>
        <!--百度地图  结束-->
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
                categoryId:"",
                company:{},
                point:{"lng":118.1589172680,"lat":24.4596209088}
            };
        },
        methods: {
            baiduMap() {
                var map = new BMap.Map('allmap'); // 创建地图实例
                console.log(this.company.point);
                var point = new BMap.Point(JSON. parse(this.company.point).lng,JSON. parse(this.company.point).lat); // 创建点坐标

                map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.MapTypeControl());
                //map.setMapStyle({ style: 'midnight' }) //地图风格

                var marker = new window.BMap.Marker(point); // 创建标注
                map.addOverlay(marker); // 将标注添加到地图中
                // 拼接html字符串
                var sContent = "<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+this.company.fullName+"</h4>"
                    + "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:1em'>地址："+this.company.province+this.company.city+this.company.county+this.company.address+"</p>"
                    + "</div>";
                //提示信息
                var infoWindow = new BMap.InfoWindow(sContent);
                // 鼠标移上标注点要发生的事
                marker.addEventListener('mouseover', function() {
                    this.openInfoWindow(infoWindow)
                });

                // 鼠标移开标注点要发生的事
                marker.addEventListener('mouseout', function() {
                    this.closeInfoWindow(infoWindow)
                });
            }

        },
        mounted() {
            this.companyId = this.$route.query.companyId;
            console.log("公司编号："+this.companyId);
            this.$axios.post('/company/api/companyInfo',null,{
                params: {
                    companyId:this.companyId
                }
            }).then( res => {
                console.log(res.data.data);
                this.company=res.data.data;
                this.baiduMap();
            });
            //this.baiduMap();
        }
    }
</script>
