<template>
  <div class="villa clearfix"
       id='HouseTypeInfo_view'>
    <div class="upPhoto">
      <div class="swiper-container"
           v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <template v-if="hasPic">
            <div class="swiper-slide"
                 v-for="(item, idx) in houseTypeInfo.houseTypePictureList"
                 :key="idx">
              <img :src="item.fileUrl" />
              <span v-if="item.floor">{{item.floor}}</span>
            </div>
          </template>
          <template v-else>
            <div class="swiper-slide">
              <img src="~assets/img/testImg.jpg" />
            </div>
          </template>
        </div>
        <div class="swiper-button-next swiper-button-white"
             @click="nextFunc"></div>
        <div class="swiper-button-prev swiper-button-white"
             @click="prevFunc"></div>
      </div>
      <a class="see_big"
         target="_blank" v-if="hasPic" @click="openPicBig">查看大图</a>
      <span class='page' v-if="hasPic">
        <i class='current_page'>{{currentIndex}}</i>
        <i>/</i>
        <i class='total_page'>{{houseTypeInfo.houseTypePictureCount}}</i>
      </span>
    </div>
    <div class="hxInfo">
      <h5 class="clearfix">
        <template v-if="houseTypeInfo.totalPrice">{{houseTypeInfo.totalPrice}}万</template>
        <b v-if="houseTypeInfo.saleStatus==='302700000001'">在售</b>
        <b v-else-if="houseTypeInfo.saleStatus==='302700000002'">待售</b>
        <b v-else-if="houseTypeInfo.saleStatus==='302700000003'">售罄</b>
        <p>
          <span v-if="houseTypeInfo.unitPrice">
            {{houseTypeInfo.unitPrice}}元/㎡
          </span>
          <b>（首付款及税费信息请咨询经纪人）</b>
        </p>
      </h5>
      <div class="hxNews">
        <p class="clearfix">
          <span v-if="houseTypeInfo.houseTypeStructure">{{houseTypeInfo.houseTypeStructure||'--'}}</span>
          <span>
            {{houseTypeInfo.buildArea||'--'}}
            <template v-if="houseTypeInfo.buildArea">㎡</template>
          </span>
          <span>
            <template v-if="houseTypeInfo.houseType==='联排别墅'||houseTypeInfo.houseType==='双拼别墅'||houseTypeInfo.houseType==='独栋别墅'">
              地上{{houseTypeInfo.upperFew||'--'}}层/地下{{houseTypeInfo.lowerFew||'--'}}层
            </template>
            <template v-else-if="houseTypeInfo.houseType==='叠拼别墅'">
              共{{(parseInt(houseTypeInfo.lowerFew)+parseInt(houseTypeInfo.upperFew))||'--'}}层
            </template>
            <template v-else-if="houseTypeInfo.houseType==='高档住宅'&&houseTypeInfo.structure==='平层'">
              1层
            </template>
            <template v-else-if="houseTypeInfo.houseType==='高档住宅'&&(houseTypeInfo.structure==='下跃'||houseTypeInfo.structure==='复式')">
              2层
            </template>
          </span>
        </p>
        <p v-if="houseTypeInfo.houseType!=='高档住宅'">
          <label>入户方向</label>：
          <b>{{houseTypeInfo.homeDirection||'--'}}</b>
        </p>
        <p v-if="houseTypeInfo.houseType==='高档住宅'">
          <label>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</label>：
          <b>{{houseTypeInfo.orientation||'--'}}</b>
        </p>
        <p v-if="houseTypeInfo.downGarageNumber+houseTypeInfo.upGarageNumber!==0">
          <label>车库数量</label>：
          <b>{{houseTypeInfo.downGarageNumber+houseTypeInfo.upGarageNumber}}个</b>
        </p>
        <p>
          <label>居&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室</label>：
          <b>
            {{houseTypeInfo.bedRooms}}室 {{houseTypeInfo.livingRooms}}厅 {{houseTypeInfo.washRooms}}卫 {{houseTypeInfo.kitchens}}厨
            <template v-if="houseTypeInfo.balconys!=='0'">{{houseTypeInfo.balconys}}阳台</template>
            <template v-if="houseTypeInfo.studyRooms!=='0'">{{houseTypeInfo.studyRooms}}书房</template>
            <template v-if="houseTypeInfo.gardens!=='0'">{{houseTypeInfo.gardens}}花园</template>
            <template v-if="houseTypeInfo.terraces!=='0'">{{houseTypeInfo.terraces}}露台</template>
            <template v-if="houseTypeInfo.nannyRooms!=='0'">{{houseTypeInfo.nannyRooms}}保姆间</template>
            <template v-if="houseTypeInfo.storeRooms!=='0'">{{houseTypeInfo.storeRooms}}储物间</template>
            <template v-if="houseTypeInfo.coatrooms!=='0'">{{houseTypeInfo.coatrooms}}衣帽间</template>
            <template v-if="houseTypeInfo.attic!=='0'">{{houseTypeInfo.attic}}阁楼</template>
            <template v-if="houseTypeInfo.swimmingPool!=='0'">{{houseTypeInfo.swimmingPool}}泳池</template>
          </b>
        </p>
      </div>
      <div class="labelBox">
        <label v-if="houseTypeInfo.saleModelType==='102300000001'">样板间可看</label>
        <label v-if="houseTypeInfo.isCourtyard==='102300000001'">合院</label>
        <template v-if="houseTypeInfo.houseTypeLabels">
          <label v-for="(item,index) in houseTypeInfo.houseTypeLabels"
                 :key="'houseTypeLabels'+index">{{item}}</label>
        </template>
      </div>
      <p v-if="houseTypeInfo.mainStructure"
         class="mainStructure">
        <span>户型描述&nbsp;&nbsp;:</span>
        <span>{{houseTypeInfo.mainStructure||'--'}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  props: {
    houseTypeId: String,
    prjInfoId: String
  },
  data() {
    return {
      currentIndex: 1,
      houseTypeInfo: {},
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mySwiper.eventsListeners.slideChange.push((e, b) => {
        this.currentIndex = this.mySwiper.realIndex + 1
      })
    })
  },
  computed: {
    hasPic() {
      let list = this.houseTypeInfo.houseTypePictureList
      return list === undefined || list.length > 0
    }
  },
  methods: {
    openPicBig() {
      window.open(this.houseTypeInfo.houseTypePictureList[this.mySwiper.realIndex].fileUrl, "_blank")
    },
    getDetail() {
      axios.post('/api/landz-web-project/houseType/getHouseTypeInfo', {
        cityCode: '310000',
        houseTypeId: this.houseTypeId,
        prjInfoId: this.prjInfoId
      })
        .then((res) => {
          console.log(res)
          this.houseTypeInfo = res.data.result
        })
    },
    nextFunc(e) {
      if (e.target.className.search('.disabled') > -1) {
        setTimeout(() => {
          this.mySwiper.slideTo(0)
        })
      }
    },
    prevFunc(e) {
      if (e.target.className.search('.disabled') > -1) {
        setTimeout(() => {
          this.mySwiper.slideTo(this.houseTypeInfo.houseTypePictureList.length - 1)
        })
      }
    }
  },
  created() {
    this.getDetail()
  }
}
</script>
<style scoped>
.villa {
  padding: 38px;
  background: #fff;
}

.villa .upPhoto {
  position: relative;
  float: left;
  width: 312px;
  height: 416px;
  overflow: hidden;
}
.villa .upPhoto .swiper-container {
  height: 100%;
}
.villa .upPhoto .swiper-button-white {
  position: absolute;
  top: 260px;
  width: 72px;
  height: 72px;
  background: url(~assets/img/icon.png) no-repeat;
  z-index: 5;
  zoom: 0.7;
}

.villa .upPhoto .swiper-button-prev {
  left: 10px;
  background-position: -30px -74px;
}

.villa .upPhoto .swiper-button-next {
  right: 10px;
  background-position: -109px -74px;
}
.villa .upPhoto img {
  display: block;
  height: 100%;
  width: 100%;
}
.villa .upPhoto > span.page {
  border-radius: 3px;
  position: absolute;
  right: 126px;
  line-height: 28px;
  top: 378px;
  background: rgba(51,0,51,0.8);
  color: #fff;
  padding: 0 5px;
  z-index: 1;
}
.villa .upPhoto img + span {
  border-radius: 3px;
  position: absolute;
  bottom: 10px;
  left: 5px;
  background: #330033;
  padding: 6px 20px;
  color: #fff;
}
.villa .upPhoto .swiper-button-next.swiper-button-disabled,
.villa .upPhoto .swiper-button-prev.swiper-button-disabled {
  pointer-events: initial;
  cursor: pointer;
  opacity: 1;
  pointer-events: inherit;
  pointer-events: unset;
}
.upPhoto ul.photoScro {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  white-space: nowrap;
}

.upPhoto ul.photoScro li {
  position: relative;
  float: left;
  width: 312px;
  height: 100%;
}

.upPhoto ul.photoScro li img {
  width: 100%;
  height: 416px;
}

.upPhoto ul.photoScro li a {
  position: absolute;
  bottom: 10px;
  right: 0;
  z-index: 6;
  width: 96px;
  height: 28px;
  line-height: 28px;
  background: #330033;
  color: #fff;
  text-align: center;
}

.villa .hxInfo {
  float: left;
  margin-left: 58px;
}

.villa .hxInfo h5 {
  font-size: 18px;
  color: red;
  border-bottom: 1px solid #330033;
}

.villa .hxInfo h5 > b {
  display: inline-block;
  padding: 0px 8px;
  height: 26px;
  line-height: 26px;
  margin-left: 4px;
  border-radius: 4px;
  background: #f5e8c3;
  font-size: 12px;
  color: #330033;
}

.villa .hxInfo h5 p {
  float: right;
  font-size: 12px;
  color: #333;
  margin-left: 66px;
  padding-bottom: 10px;
  text-align: right;
  vertical-align: middle;
}

.villa .hxInfo h5 p b {
  display: block;
  font-size: 12px;
  color: #a0a0a0;
}

.villa .hxInfo .hxNews {
  padding: 18px 0 0;
}

.villa .hxInfo .hxNews p {
  margin-bottom: 16px;
  font-size: 16px;
}

.villa .hxInfo .hxNews p:first-child {
  font-size: 18px;
}

.villa .hxInfo .hxNews p span {
  float: left;
  text-align: left;
  width: 33%;
  font-size: 15px;
}

.villa .hxInfo .hxNews p span:nth-of-type(2) {
  text-align: center;
}

.villa .hxInfo .hxNews p span:last-child {
  text-align: right;
}

.villa .hxInfo .hxNews p label {
  display: inline-block;
  width: 70px;
  color: #666;
}

.villa .hxInfo .hxNews p b {
  display: inline-block;
  color: #333;
  /*width:76%;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  margin-left: 2px;
}

.villa div.labelBox {
  padding-bottom: 10px;
  margin-top: 1%;
}

.villa div.labelBox label {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  margin-right: 15px;
  border: 1px solid #330033;
  color: #330033;
  font-size: 12px;
}

.villa div.labelBox label:last-child {
  margin-right: 0;
}
.photoScro span {
	border-radius: 3px;
	position: absolute;
	bottom: 10px;
	left: 5px;
	background: #330033;
	padding: 6px 20px;
	color: #fff;
}
.page {
	border-radius: 3px;
	position: absolute;
	right: 126px;
	line-height: 28px;
	top: 378px;
	background: rgba(51, 0, 51, 0.8);
	color: #fff;
	padding: 0 5px;
}
.hxInfo {
	width: 750px;
}
.mainStructure {
	width: 695px;
	font-size: 14px;
	color: #666;
	word-wrap: break-word;
	word-break: break-all;
}
.mainStructure span:first-child {
	display: inline-block;
	font-size: 16px;
	vertical-align: top;
}
.mainStructure span:last-child {
	display: inline-block;
	width: 600px;
	line-height: 24px;
}
.upPhoto a.see_big {
	position: absolute;
	bottom: 10px;
	right: 0;
	z-index: 6;
	width: 96px;
	height: 28px;
	line-height: 28px;
	background: rgba(51, 0, 51, 0.8);
	color: #fff;
	text-align: center;
	zoom: 1;
	top: 378px;
	border-radius: 3px;
}
</style>
