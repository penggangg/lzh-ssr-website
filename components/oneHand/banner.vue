<template>
  <div class="onehandBox">
      <!-- template banner start -->
        <!-- 面包屑 -->
        <div class="locating container clearfix" style="padding-bottom:10px;">
          <p>
            <a href="/">上海豪宅</a> &gt;
            <a href="/sh-xf">一手豪宅出售</a> &gt;
            <a :href="'/sh-xf/'+resblockInfo.districtId">{{resblockInfo.districtName}}豪宅出售</a>&gt;
            <a :href="'/sh-xf/'+resblockInfo.districtId+'_'+resblockInfo.bizcircleId">{{resblockInfo.bizcircleName}}豪宅出售</a> &gt;
            <a :href="'/sh-xf/'+resblockInfo.resblockId+'-'+resblockInfo.prjInfoId+'.html'">{{resblockInfo.resblockName}}</a>
          </p>
        </div>
        <!-- 项目介绍 -->
        <div class="project container clearfix">
          <!-- <div class="proInfo_min">
            <span :class="showProInfo_min?'pg_min':'pg_min pg_min1'" @click="openProInfo">新房简介</span>
          </div> -->
          <div class="proInfo" id="proInfo_view" >
            <h4 :class="showProInfo_min?'proBtn proBtnShow':'proBtn'" @click="openProInfo">新房简介</h4>
            <div :class="showProInfo?'proCont clearfix':'proCont proContHide clearfix'">
              <b class="slide" @click="closeProInfo">×</b>
              <div class="selling">
                <span v-if="resblockInfo.isSale == '102300000001'">在售</span>
                <span v-if="resblockInfo.isSale !== '102300000001'">售罄</span>
                <h5>
                  <span class="name" :title="resblockInfo.resblockName">{{resblockInfo.resblockName}}</span>
                  <span class="nocommission">免佣金</span>
                </h5>
                <p>
                  <b v-show="resblockInfo.salePriceMin==resblockInfo.salePriceMax&&resblockInfo.salePriceMin&&resblockInfo.salePriceMax">{{resblockInfo.salePriceMin}}万</b>
                  <b v-show="resblockInfo.salePriceMin!==resblockInfo.salePriceMax">{{resblockInfo.salePriceMin?resblockInfo.salePriceMin:''}}{{resblockInfo.salePriceMin&&resblockInfo.salePriceMax?'~':''}}{{resblockInfo.salePriceMax?resblockInfo.salePriceMax:''}}{{resblockInfo.salePriceMin||resblockInfo.salePriceMax?'万':''}}</b>
                </p>
              </div>
              <div class="sellCont">
                <ul>
                  <li class="clearfix">
                    <label v-if="resblockInfo.isSelfGarden==102300000001">自带公园</label>
                    <label v-if="resblockInfo.isGardenHouse==102300000001">花园洋房</label>
                    <label v-if="resblockInfo.isCourtyard==102300000001">合院</label>
                    <label v-if="resblockInfo.isSelfBusiness==102300000001">自带商业</label>
                    <label v-if="resblockInfo.isLake==102300000001">临湖</label>
                    <label v-if="resblockInfo.isNewWind==102300000001">新风系统</label>
                    <label v-if="resblockInfo.stableTemperature==102300000001">恒温恒湿</label>
                    <label v-if="resblockInfo.isHotSpring==102300000001">温泉入户</label>
                  </li>
                  <li @click="lookMap(resblockInfo.mapX, resblockInfo.mapY, resblockInfo.resblockName, resblockInfo.cityCode, resblockInfo.projectLocation)" class="lookMap" :loacation="resblockInfo.projectLocation" :name="resblockInfo.resblockName" :qname="resblockInfo.projectLocation"
                    :data-mapx="resblockInfo.mapX" :data-mapy="resblockInfo.mapY">
                    <a href="javascript:void(0)" :title="resblockInfo.projectLocation">
                      <span>项目区位</span>：
                      <strong v-if="resblockInfo.projectLocation" class="pg_quwei">{{resblockInfo.projectLocation||'--'}}</strong>
                      <b>
                        <img v-if="resblockInfo.projectLocation" src="~assets/img/pg_quwei.png">
                      </b>
                    </a>
                  </li>
                  <li>
                    <span>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</span>：{{resblockInfo.houseTypeInfo}}</li>
                  <li>
                    <span>在售户型</span>：{{resblockInfo.mainHouseType}}</li>
                  <li>
                    <a href="javascript:void(0)" style="cursor:default">
                      <span>房屋用途</span>：{{resblockInfo.houseUseType}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="share">
            <a href="javascript:void(0)" class="pg_yuyue" @click="dialog.bookViewCondition = true">
              <b class="yy"></b>
              预约看房
            </a>
            <a href="javascript:void(0)" class="pg_fx" @click="showQrcode = !showQrcode">
              <b class="fx"></b>
              分享
            </a>
          </div>
          <p @click="dialog.oneHandBlockPicSwiperVisible=true" class="album">
            <span></span>
            楼盘相册 (
            <b v-if="getResblockPictureList.pictureCount">{{getResblockPictureList.pictureCount}}</b>
            <b v-else>0</b>张)
          </p>
          <div id="qrcode" v-show="showQrcode">
            <vue-qr id="logo" :logoSrc="logoSrc" :logoScale="0.3" :text="'http://m.sh.lizihang.com/sh-xf/lp'+resblockInfo.resblockId+'.html'" :size="100" :margin="0">
            </vue-qr>
          </div>
        </div>
        <ex-dialog :visible.sync="dialog.oneHandBlockPicSwiperVisible" background-color="#000"  width="1100px">
          <oneHandBlockPicSwiper :getResblockPictureList="getResblockPictureList" :defaulttype="1"></oneHandBlockPicSwiper>
        </ex-dialog>
        <!-- 地图 -->
        <ExDialog :visible.sync="dialog_lookMap" width="900px" height="600px">
          <mapLayer :mapx="mapx" :projectLocation="projectLocation" :mapy="mapy" :cityCode="cityCode" :resblockName="resblockName"></mapLayer>
        </ExDialog>
        <!-- 预约看房 -->
        <ExDialog :visible.sync="dialog.bookViewCondition" type='iform'>
          <bookView @hidebookView="dialog.bookViewCondition = false" @showMsg="dialog.alertMsg = true"></bookView>
        </ExDialog>
        <ExDialog :visible.sync="dialog.alertMsg" type='alert' content="预约成功" title="信息" :buttonClear=false @sure="closeMsg"></ExDialog>
      <!-- template banner end -->
    </div>
</template>
<script>
import bookView from '~/components/bookView'
import ExDialog from '~/components/exdialog'
import oneHandBlockPicSwiper from '~/components/swiper/oneHandBlockPicSwiper'
import mapLayer from '~/components/mapLayer'
export default {
  props: {
    resblockInfo: Object,
    getResblockPictureList: Object
  },
  data() {
    return {
      dialog_lookMap: false,
      resblockName: '',
      mapx: '',
      mapy: '',
      cityCode: '',
      projectLocation: '',
      dialog: {
        oneHandBlockPicSwiperVisible: false,
        bookViewCondition: false,
        alertMsg: false
      },
      logoSrc: require('../../static/ewmMiddle.png'), // 二维码中间的logo
      showProInfo_min: false,
      showProInfo: true,
      showQrcode: false
    }
  },
  methods: {
    lookMap(x, y, resblockName, cityCode, projectLocation) {
      this.mapx = x || ''
      this.mapy = y || ''
      this.resblockName = resblockName || ''
      this.cityCode = cityCode || ''
      this.projectLocation = projectLocation || ''
      this.dialog_lookMap = true
    },
    closeProInfo() {
      this.showProInfo_min = true
      this.showProInfo = false
    },
    openProInfo() {
      this.showProInfo = true
      this.showProInfo_min = false
    },
    closeMsg() {
      this.dialog.alertMsg = false
    }
  },
  components: {
    bookView,
    ExDialog,
    mapLayer,
    oneHandBlockPicSwiper
  }
}
</script>
<style>
.onehandBox{
  position: relative;
  width: 100%;
  height: 480px;
}
.locating {
  position: relative;
  padding-top: 10px;
  padding-bottom: 20px;
  z-index: 4;
}

.locating>p {
  float: left;
  margin-top: 6px;
}

.locating>p a {
  color: #330033;
}
.locating p{
  background: rgba(0,0,0,.5);
  line-height: 19px;
  border-radius: 2px;
  padding: 0 2px;
  margin:0;
  color: #fff
}
.locating p a{
  color: #fff;
  font-size: 12px;
}
.proInfo_min{
  width: 150px;
  color: #fff;
  height: 31px;
  position: absolute;
  border-radius: 5px;
}
.pg_min{
  position: absolute;
  width: 150px;
  height: 31px;
  display: inline-block;
  font-size: 14px;
  left: 0px;
  color: #fff;
  line-height: 31px;
  font-weight: bold;
  text-align: center;
  background:url(~assets/img/icon.png) no-repeat 0px -151px;
}
.project .proInfo {
    position: relative;
    float: left;
    width: 314px;
    height: 360px;
    overflow: hidden;
    font-size: 12px;
}

.project .proInfo .proBtn {
  position: absolute;
  top: 0;
  left: -139px;
  z-index: 4;
  width: 139px;
  height: 31px;
  line-height: 31px;
  background: url(~assets/img/icon.png) no-repeat 0px -151px;
  font-size: 14px;
  font-weight:bold;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: left 0.5s linear;
  /* Firefox 4 */
  -moz-transition:left 0.5s linear;
  /* Safari and Chrome */
  -webkit-transition:left 0.5s linear;
  /* Opera */
  -o-transition:left 0.5s linear;
}

.project .proInfo .proBtnShow {
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 4;
  width: 139px;
  height: 31px;
  line-height: 31px;
  font-weight:bold;
  background: url(~assets/img/icon.png) no-repeat 0px -151px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: left 0.5s linear;
  /* Firefox 4 */
  -moz-transition:left 0.5s linear;
  /* Safari and Chrome */
  -webkit-transition:left 0.5s linear;
  /* Opera */
  -o-transition:left 0.5s linear;
}

.project .proInfo .proCont {
  position: absolute;
  top: 0;
  /*left:-314px;*/
  left: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  transition: left 0.5s linear;
  /* Firefox 4 */
  -moz-transition:left 0.5s linear;
  /* Safari and Chrome */
  -webkit-transition:left 0.5s linear;
  /* Opera */
  -o-transition:left 0.5s linear;
}
.project .proInfo .proContHide{
  position: absolute;
  top: 0;
  /*left:-314px;*/
  left: -320px;
  z-index: 4;
  width: 100%;
  height: 100%;
  transition: left 0.5s linear;
  /* Firefox 4 */
  -moz-transition:left 0.5s linear;
  /* Safari and Chrome */
  -webkit-transition:left 0.5s linear;
  /* Opera */
  -o-transition:left 0.5s linear;
}

.project .proInfo .proCont > b.slide {
  position: absolute;
  top: 0;
  right: 4px;
  z-index: 5;
  line-height: 20px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

.proInfo .proCont .selling {
  position: relative;
  padding: 24px 0 16px 20px;
  background: rgba(51, 51, 51, 0.9);
  color: #fff;
}

.proInfo .proCont .selling > span {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  line-height: 22px;
  padding: 0 6px;
  background: #666;
  color: #fff;
}

.proInfo .proCont .selling h5 {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
  font-size: 20px;
  color: #fff;
  margin-bottom: 12px;
  margin-top: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.proInfo .proCont .selling h5 .name {
  display: inline-block;
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
}

.proInfo .proCont .selling h5 .nocommission {
  display: inline-block;
  width: 52px;
  height: 20px;
  background: #c72433;
  color: #fff;
  text-align: center;
  font-size: 14px;
  border-radius: 3px;
  margin-left: 8px;
  margin-top: 2px;
}

.proInfo .proCont .selling p b {
  font-size: 16px;
  color: #efdb9f;
  font-weight: bold;
}

.proInfo .proCont .sellCont {
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
}

.proInfo .proCont .sellCont ul {
  padding: 0 20px;
}

.proInfo .proCont .sellCont li {
  padding: 14px 0;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  font-family: '微软雅黑';
  color: #000;
}

.proInfo .proCont .sellCont li:last-child {
  border-bottom: 0;
}

.proInfo .proCont .sellCont li label {
  float: left;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  border: 1px solid #330033;
  font-size: 12px;
  color: #330033;
  margin-right: 10px;
  margin-bottom: 10px;
}

.proInfo .proCont .sellCont li label:last-child {
  margin-right: 0;
}

.proInfo .proCont .sellCont li a {
  display: block;
  font-family: '微软雅黑';
  color: #000;
}

.proInfo .proCont .sellCont li span {
  display: inline-block;
  width: 52px;
}

.proInfo .proCont .sellCont li i {
  display: inline-block;
  width: 13px;
  height: 17px;
  margin: 0 7px;
  background: url(~assets/img/icon.png) no-repeat;
  vertical-align: middle;
}

.proInfo .proCont .sellCont li i.qw {
  background-position: -184px -109px;
}

.proInfo .proCont .sellCont li i.cp {
  height: 13px;
  background-position: -201px -110px;
}

.proInfo .proCont .sellCont li i.zs {
  width: 12px;
  height: 12px;
  background-position: -185px -128px;
}

.proInfo .proCont .sellCont li i.bh {
  width: 13px;
  background-position: -201px -128px;
}

.proInfo .proCont .sellCont li b {
  float: right;
  color: #330033;
}
.proCont{
  left: 0px;
}

/*分享关注及预约看房*/
.project{
  height: 360px;
  position: relative;
  z-index: 4;
}

.project .share {
  position: absolute;
  top: 10px;
  right: 32px;
  padding: 3px 8px;
  background: rgba(0,0,0,1);
  border-radius: 5px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.project .share a {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #fff;
  z-index: 6;
}

.project .share a b {
  /*position: absolute; top:0px;left:25%;*/
  display: inline-block;
  width: 26px;
  height: 26px;
  background: url(~assets/img/icon.png) no-repeat;
  vertical-align: middle;
}

.pg_yuyue {
  width: 30px;
  overflow: hidden;
  transition: all 0.3s linear;
}

.pg_fx {
  width: 30px;
  overflow: hidden;
  transition: all 0.3s linear;
}

.project .share a:hover {
  width: 90px;
}

.project .share a b.gz {
  top: 6px;
  width: 24px;
  height: 21px;
  background-position: 0px -186px;
}

.project .share a b.yy {
  background-position: -26px -186px;
}

.project .share a b.fx {
  top: 3px;
  background-position: -56px -186px;
}

.project .share a span {
  font-size: 14px;
  color: #fff;
  opacity: 0;
}
/* 二维码 */
#qrcode{
  position: absolute;
  right: 31px;
  top: 42px;
  /* display: none; */
  border:6px solid #fff ;
  border-radius:2px;
}
/* 楼盘相册 */

.project p.album {
  position: absolute;
  bottom: 0;
  right: 15px;
  z-index: 10;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  font-size: 12px;
  cursor: pointer;
}

.project p.album span {
  display: inline-block;
  width: 19px;
  height: 15px;
  margin-top: 9px;
  margin-right: 10px;
  background: url(~assets/img/icon.png) no-repeat -185px -148px;
  vertical-align: top;
}
.lookMap img{
  margin-top:2px;
}

</style>
