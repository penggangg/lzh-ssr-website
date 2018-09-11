<template>
  <div>
    <headers></headers>
    <!-- 顶部banner -->
    <banner :resblockInfo="resblockInfo" :getResblockPictureList="getResblockPictureList"></banner>
    <!-- 楼盘照片 -->
    <div class="oneHandFocus">
      <div class="banner_bac">
        <span :style="{background: 'url('+ getResblockPictureList.defaultPicture +') center center no-repeat' }"></span>
      </div>
    </div>
    <!-- 免佣金 -->
    <div class="nocommission container" style="margin-top:2px;margin-bottom:32px">
      <a href="/activePage.html" target="_blank">
        <img src="~assets/img/nocommission.png" alt="">
      </a>
    </div>
    <!-- 分类标题 -->
    <div class="titleNav container clearfix">
      <h3 data-id="index_1" class="current">楼盘动态</h3>
      <h3 data-id="index_2">楼盘相册</h3>
      <h3 data-id="index_7">楼盘卖点</h3>
      <h3 data-id="index_3">户型信息</h3>
      <h3 data-id="index_4">楼盘信息</h3>
      <!-- <h3 data-id="index_5">鸟瞰图</h3> -->
      <h3 data-id="index_5">周边配套</h3>
      <h3 data-id="index_6">带看顾问</h3>
    </div>
    <!-- 楼盘动态 -->
    <dynamic :resblockDynamicList="resblockDynamicList"></dynamic>
    <!-- 楼盘相册 -->
    <pictures :resblockPictureVoList="resblockPictureVoList" :resblockInfo="resblockInfo" :getResblockPictureList="getResblockPictureList"></pictures>
    <!-- 楼盘卖点 -->
    <selling :resblockInfo="resblockInfo"></selling>
    <!-- 户型信息 -->
    <house-info :resblockInfo="resblockInfo" :prjInfoId="prjInfoId" :resblockId="resblockId"></house-info>
    <!-- 楼盘信息 -->
    <resblock-info :resblockInfo="resblockInfo"></resblock-info>
    <!-- 推荐顾问 -->
    <!-- <recommend :resblockInfo="resblockInfo"></recommend> -->
    <!-- 周边配套 -->
    <mapOne :resblockInfo="resblockInfo"></mapOne>
    <!-- 看房记录 -->
    <Counsel :option="option" channel="400300000002"></Counsel>
    <!-- 新房推荐 -->
    <div class="newHouse newgetHotRecommend_cot first_newHouse">
      <div class="container clearfix">
        <h5>新房推荐</h5>
        <oneHandRec :projectRecommendList='projectRecommendList'></oneHandRec>
      </div>
    </div>
    <!-- 二手豪宅推荐 -->
    <div class="newHouse">
      <div class="container clearfix">
        <h5>二手房推荐</h5>
        <secondHandRec :hotRecommend='hotRecommend'></secondHandRec>
      </div>
    </div>
    <!-- 预约看房 -->
    <bookView v-show="bookViewCondition" @hidebookView="bookViewCondition = false"></bookView>
  </div>
</template>
<script>
import headers from '~/components/headers'
import oneHandRec from '~/components/recommended/onehand'
import secondHandRec from '~/components/recommended/secondhand'
import bookView from '~/components/bookView'
import axios from '~/plugins/axios'
import Counsel from '~/components/counsel'
import banner from '~/components/oneHand/banner'
import dynamic from '~/components/oneHand/dynamic'
import pictures from '~/components/oneHand/picture'
import selling from '~/components/oneHand/selling'
import houseInfo from '~/components/oneHand/houseInfo'
import resblockInfo from '~/components/oneHand/resblockInfo'
import recommend from '~/components/oneHand/recommend'
import mapOne from '~/components/oneHand/mapOne'
export default {
  head() {
    return this.$setSeo(
      `${this.resblockInfo.resblockName}楼盘_上海${this.resblockInfo.resblockName}新房房价_楼盘信息_地址_户型_周边配套|图片-丽兹行官网`,
      '上海楼盘信息，上海楼盘信息网，上海新开楼盘，上海高档住宅出售信息、上海别墅楼盘、上海豪宅楼盘',
      `上海豪宅新房出售-丽兹行官网为您提供上海一手豪宅别墅最新楼盘出售信息：${this.resblockInfo.resblockName}开盘信息，上海${this.resblockInfo.resblockName}新房房价、${this.resblockInfo.resblockName}信息、地址、户型以及周边配套、图片等。更多上海豪宅别墅新开楼盘信息就上丽兹行上海站`
    )
  },
  data() {
    return {
      option: {
        url: '/api/landz-web-project/tLeadShowing/getLeadShowingList',
        params: {
          resblockId: '',
          site: '400100000001'
        }
      },
      hotRecommend: [],
      projectRecommendList: [],
      bookViewCondition: false
    }
  },
  components: {
    headers,
    oneHandRec,
    secondHandRec,
    bookView,
    Counsel,
    banner,
    dynamic,
    pictures,
    selling,
    houseInfo,
    recommend,
    resblockInfo,
    mapOne
  },
  methods: {
    // 获取新房推荐
    getHotRecommend() {
      axios.post('/api/landz-web-project/resblockInfo/getHotRecommend', {
        cityCode: '310000',
        resblockId: this.resblockId,
        prjInfoId: this.prjInfoId,
        districtId: this.districtId,
        bizcircleId: this.bizcircleId
      })
        .then((res) => {
          console.log(res)
          this.hotRecommend = res.data.result
        })
    },
    // 二手房推荐
    getProjectRecommendList() {
      axios.post('/api/landz-web-project/list/getProjectRecommendList', {
        cityCode: '310000',
        resblockId: this.resblockId
      })
        .then((res) => {
          this.projectRecommendList = res.data.result
        })
    }
    // 初始化地图
    // 隐藏预约看房
    // hidebookView (message) {
    //   this.bookViewCondition =false
    // }
  },
  created() {
    this.option.params.resblockId = this.resblockId
    this.$nextTick(() => {
      // this.getHotRecommend()
    })
    this.getHotRecommend()
    this.getProjectRecommendList()
  },
  mounted () {
    this.lazyInit()
  },
  props: {
    listShow: Boolean,
    resblockInfo: Object,
    resblockDynamicList: Array,
    getResblockPictureList: Object,
    resblockPictureVoList: Array,
    districtId: Number,
    bizcircleId: Number,
    resblockId: String,
    prjInfoId: String,
    getHouseTypeList: Object
  }
}
</script>
<style>
  .oneHandFocus>div span {
    background: url('http://image.lizihang.com/group1/M00/0B/9D/rBAOJ1k-S0qEP1JFAAAAAHz5Dn4197.jpg.1920x480.jpg') center center no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1220px;
    height: 480px;
    background-size: cover;
  }

  .sellpoint li b {
    width: 778px;
    white-space: normal;
    vertical-align: top;
  }
  .oneHandFocus>div span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1220px;
    height: 480px;
    background-size: cover;
  }
  .titleNav {
    box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
    background: #fff;
    margin-bottom: 12px;
    border-bottom: none;
    margin-top:0;
  }
  .titleNav h3 {
    padding: 15px 0;
    float: left;
    font-size: 16px;
    cursor: pointer;
    width: 14.28%;
    height:auto;
    line-height: normal;
    text-align: center;
  }
  .titleNav h3.current{
    background: #303;
    color: #fff;
    font-weight: 700;
  }
</style>
