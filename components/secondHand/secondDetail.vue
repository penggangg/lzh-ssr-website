<template>
  <div>
    <headers></headers>
    <!-- {{getResblockInfo}}<br> -->
    <!-- 面包屑 -->
    <div class="locating container clearfix">
      <p style="width: 1100px;">
        <a href="/">上海豪宅</a> &gt;
        <a href="/sh-esf/">二手房出售 </a>
        &gt;
        <a href="/sh-esf/310115">浦东新区二手豪宅</a>
        &gt;
        <a href="/sh-esf/310115_241">陆家嘴二手豪宅</a>
        &gt;
        <a href="javascript:void(0)">世茂滨江花园</a>
      </p>
    </div>
    <!-- 楼盘轮播图以及详细信息 -->
    <div class="roomBox container clearfix">
      <twoHandBlockPicSwiper :getResblockPictureList="getBasicInfo" @bigImgClick="shadowSwiperShow=true" @change="bigImgChange"></twoHandBlockPicSwiper>
      <!-- 右侧的楼盘详细信息 -->
      <room-info :getBasicInfo="getBasicInfo" :getConsultantList="getConsultantList"></room-info>

    </div>
    <!-- 分类标题 -->
    <div class="mod-warp">
      <div class="titleNav container clearfix">
        <h3 data-id="index_1" :class="floor=='index_1'?'current':''" @click="floorProstion('index_1')">房源描述</h3>
        <h3 data-id="index_2" :class="floor=='index_2'?'current':''" @click="floorProstion('index_2')">户型信息</h3>
        <!-- <h3 data-id="index_3">房源价值分析</h3> -->
        <h3 data-id="index_4" :class="floor=='index_4'?'current':''" @click="floorProstion('index_4')">周边分析</h3>
        <h3 data-id="index_5" :class="floor=='index_5'?'current':''" @click="floorProstion('index_5')">房源图片</h3>
        <h3 data-id="index_6" :class="floor=='index_6'?'current':''" @click="floorProstion('index_6')">楼盘信息</h3>
        <h3 data-id="index_7" :class="floor=='index_7'?'current':''" @click="floorProstion('index_7')">带看顾问</h3>
      </div>
    </div>
    <!-- 房源描述 -->
    <decscri :basicInfo="getBasicInfo"></decscri>
    <!-- 户型信息以及房源鸟瞰图 -->
    <house-info :birdEyeImgs="getBirdEyeImgs" :basicInfo="getBasicInfo" :getResblockInfo="getResblockInfo" :getTypeImgs="getTypeImgs"></house-info>
    <!-- 周边分析 -->
    <mapSecond :getBasicInfo="getBasicInfo"></mapSecond>
    <!-- 房源图片 -->
    <div id="houseBigImgs_list">
      <house-bigImg :list="getBasicInfo.images" @houseBigImgClick="onHouseBigImgClick"></house-bigImg>
    </div>
    <!-- 楼盘信息 -->
    <resblockInfo :getResblockInfo='getResblockInfo'></resblockInfo>
    <!-- 带看顾问 -->
    <Counsel :option="option" channel="400300000003"></Counsel>
    <!-- 相似二手房推荐 -->
    <!-- 顾问 -->
    <consultant :getConsultantList="ConsultantList"></consultant>
    <!-- 新房推荐 -->
    <!-- 遮罩轮播 -->
    <shadowSwiper :active="activePicIdx" :list="getBasicInfo.images" :visible.sync="shadowSwiperShow"></shadowSwiper>
  </div>
</template>
<script>
import twoHandBlockPicSwiper from '~/components/swiper/twoHandBlockPicSwiper'
import roomInfo from '~/components/secondHand/roomInfo'
import decscri from '~/components/secondHand/decscri'
import houseInfo from '~/components/secondHand/houseInfo'
import houseBigImg from '~/components/secondHand/houseBigImg'
import resblockInfo from '~/components/secondHand/resblockInfo'
import Counsel from '~/components/counsel'
import consultant from '~/components/secondHand/consultant'
import shadowSwiper from '~/components/swiper/shadowSwiper'
import mapSecond from '~/components/secondHand/mapSecond'
export default {
  data () {
    return {
      ConsultantList: [],
      floor: 'index_1',
      activePicIdx: 0,
      shadowSwiperShow: false,
      option: {
        url: '/api/landz-web-house/tLeadShowing/getLeadShowingList',
        params: {
          resblockId: '',
          site: '400100000001'
        }
      }
    }
  },
  methods: {
    onHouseBigImgClick(idx) {
      this.activePicIdx = idx
      this.shadowSwiperShow = true
    },
    bigImgChange(idx) {
      this.activePicIdx = idx
    },
    floorProstion (floor) {
      this.floor = floor
      var _id = document.getElementById(floor)
      console.log(_id.offsetTop)
      this.scroll_To(_id.offsetTop)
    },
    scroll_To (tarY) {
      var that = this // tarY 即滑动条顶端 距离页面最上面的距离
      var timer = setTimeout(function () {
        var currentY = document.documentElement.scrollTop
        // console.log(currentY)
        var step = 40 // 步长系数 即剩余的距离除以40 每1ms 移动一段距离
        if (tarY > currentY) { // tarY > currentY 即向下滚动
          let dist = Math.ceil((tarY - currentY) / step)
          let nextY = currentY + dist
          if (nextY < tarY) { // 向上滚动和向下滚动判定的区别 是这里！！
            window.scrollTo(0, nextY)
            that.scroll_To(tarY)
          } else {
            window.scrollTo(0, tarY)
            clearTimeout(timer)
          }
        } else { // tarY < currentY 即向上滚动
          let dist = Math.floor((tarY - currentY) / step)
          let nextY = currentY + dist
          if (nextY > tarY) {
            window.scrollTo(0, nextY)
            that.scroll_To(tarY)
          } else {
            window.scrollTo(0, tarY)
            clearInterval(timer)
          }
        }
      }, 1)
    }
  },
  components: {
    twoHandBlockPicSwiper,
    roomInfo,
    decscri,
    houseInfo,
    houseBigImg,
    resblockInfo,
    Counsel,
    shadowSwiper,
    consultant,
    mapSecond
  },
  mounted () {
    this.lazyInit()
  },
  created () {
    this.option.params.resblockId = this.getBasicInfo.resblockId
    this.ConsultantList = this.getConsultantList
  },
  //  二手详情,楼盘信息,二手详情推荐,户型图,鸟瞰图,推荐顾问
  props: ['getBasicInfo', 'getResblockInfo', 'getRecommendList', 'getTypeImgs', 'getBirdEyeImgs', 'getConsultantList']
}
</script>
<style>
@import "../../assets/css/imgScroll.css";
@import "../../assets/css/detailsStyle.css";
@import "../../assets/css/secDetails.css";
</style>
