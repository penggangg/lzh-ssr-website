<template>
  <div class="decscri container"
       style="position:relative;">
    <h4 class="index_4">周边分析</h4>
    <div class="periphery">
      <div class="left">
        <div :class="rimResblockClass"
             @click="rimResblock">周边楼盘</div>
        <div :class="rimPublicClass"
             @click="rimPublic">周边配套</div>
      </div>
      <div class="right">
        <div class="one">新房</div>
        <div class="sec">二手</div>
      </div>
    </div>
    <baidu-map v-if="!getBasicInfo.mapx" id="minMap" class="minMap"
                 :center="getBasicInfo.cityCode=='310000'?'上海':'北京'"
                 :zoom="15">
        <bm-local-search :keyword="getBasicInfo.resblockName"
                         :panel=false
                         :location="getBasicInfo.cityCode=='310000'?'上海':'北京'"
                         :auto-viewport="false"
                         @searchcomplete="minmapSeach"></bm-local-search>
    </baidu-map>
    <baidu-map v-if="rimResblockClass === 'current'"
               class="map"
               id="estateMap"
               :center="{
        lng: getBasicInfo.mapx,
        lat: getBasicInfo.mapy
      }"
               :zoom="15">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"
                     @ready="mapReady"></bm-navigation>
    </baidu-map>
    <template v-else>
      <baidu-map id="sendMap" class="map"
                 :center="{
        lng: getBasicInfo.mapx,
        lat: getBasicInfo.mapy
      }"
                 :zoom="15">
        <bm-marker :position="{lng: getBasicInfo.mapx,
        lat: getBasicInfo.mapy}">
        </bm-marker>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"
                       @ready="mapReady"></bm-navigation>
        <bm-local-search :keyword="keyword"
                         :panel=false
                         :auto-viewport="false"
                         @searchcomplete="mapSeach"></bm-local-search>
      </baidu-map>
      <div class="tabBox
             ">
        <ul class="aroundType
             ">
          <li :class="item.liClass"
              @click="publicClick(item,index)"
              v-for="(item,index) in public" :key="index"
              :data-key="item.list
             ">{{item.type}}</li>
        </ul>
        <ul class="itemTagBox
             clearfix
             ">
          <li v-for="(item,index) in selcetList"
              :key="index"
              @click="tagClick(item)"
              :class="keyword===item?'selectTag':''">{{item}}</li>
        </ul>
        <div class="aroundList">
          <ul class="itemBox">
            <li v-for="(item,index) in seachResult" @click="clickPoint(index)">
              <div class="contentBox">
                <div class="itemContent">
                  <span>
                    <i>{{index|to}}.</i>
                    <em>{{item.title}}</em>
                  </span>
                  <span>{{item.distance}}米</span>
                </div>
                <div class="itemInfo">{{item.address}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rimResblockClass: 'current',
      rimPublicClass: '',
      selcetList: ['地铁', '公交'],
      public: [
        {
          type: '交通',
          liClass: 'LOGCLICK selectTag',
          list: ['地铁', '公交']
        },
        {
          type: '教育',
          liClass: 'LOGCLICK',
          list: ['幼儿园', '小学', '初中', '高中', '大学']
        },
        {
          type: '医疗',
          liClass: 'LOGCLICK',
          list: ['医院', '药店']
        },
        {
          type: '生活',
          liClass: 'LOGCLICK',
          list: ['银行', '餐饮', '购物']
        },
        {
          type: '娱乐',
          liClass: 'LOGCLICK',
          list: ['公园', '运动健身']
        }
      ],
      seachResult: [],
      keyword: '地铁',
      newPoint: {},
      oldPoint: {},
      map: {}
    }
  },
  props: {
    getBasicInfo: {}
  },
  filters: {
    to(val) {
      return String.fromCharCode(64 + parseInt(val + 1))
    }
  },
  methods: {
    clickPoint(index) {
      document.getElementById('sendMap').getElementsByClassName('BMap_Marker BMap_noprint')[index + 1].click()
    },
    minmapSeach(result) {
      this.getBasicInfo.mapx = result.Br[0].point.lng
      this.getBasicInfo.mapy = result.Br[0].point.lat
    },
    mapSeach(result) {
      this.seachResult = result.Br
      this.seachResult.forEach((e) => {
        this.newPoint = e.point
        e.distance = parseInt(this.map.getDistance(this.newPoint, this.oldPoint))
      })
    },
    tagClick(e) {
      this.keyword = e
    },
    publicClick(item, index) {
      this.selcetList = item.list
      this.keyword = item.list[0]
      this.public.forEach((e, i) => {
        if (i === index) {
          e.liClass = 'LOGCLICK selectTag'
        } else {
          e.liClass = 'LOGCLICK'
        }
      })
    },
    rimPublic() {
      let arr = document.getElementsByClassName('maphouse')
      for (var i = 0; i < arr.length; i++) {
        console.log(document.getElementsByClassName('maphouse')[i])
        document.getElementsByClassName('maphouse')[i].style.display = 'none'
      }
      this.rimPublicClass = 'current'
      this.rimResblockClass = ''
    },
    rimResblock() {
      let arr = document.getElementsByClassName('maphouse')
      for (var i = 0; i < arr.length; i++) {
        console.log(document.getElementsByClassName('maphouse')[i])
        document.getElementsByClassName('maphouse')[i].style.display = 'block'
      }
      this.rimPublicClass = ''
      this.rimResblockClass = 'current'
    },
    mapReady({ BMap, map }) {
      this.oldPoint = {
        lat: this.getBasicInfo.mapy,
        lng: this.getBasicInfo.mapx
      }
      this.map = map
      this.customMap(BMap, map, this.getBasicInfo.bizcircleId, { mapX: this.getBasicInfo.mapx, mapY: this.getBasicInfo.mapy })
    }
  }
}
</script>
<style scoped>
/* 地图容器必须设置宽和高属性 */
.map {
	width: 100%;
	height: 442px;
}
.decscri h4 {
	font-size: 18px;
	color: #330033;
	margin-bottom: 30px;
	font-family: '\5FAE\8F6F\96C5\9ED1';
	font-weight: 700;
}
.periphery {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	margin-bottom: 22px;
	font-size: 14px;
	color: #333333;
	line-height: 1.2;
}
.periphery > .left {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
}
.periphery > .right {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	width: 110px;
	font-size: 12px;
	color: #999;
}
.periphery > .left .current {
	border-bottom: 2px solid;
	padding-bottom: 10px;
	color: #330033;
	font-weight: bold;
}
.periphery > .left div {
	margin-right: 30px;
	cursor: pointer;
}
.periphery > .right {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	width: 110px;
	font-size: 12px;
	color: #999;
}
.periphery .one,
.periphery .sec {
	position: relative;
}
.periphery .one,
.periphery .sec {
	position: relative;
}
.tabBox {
	position: absolute;
	top: 172px;
	right: 20px;
	width: 325px;
}
.tabBox .aroundType {
	width: 100%;
	height: 40px !important;
	font-size: 0;
	background-color: #fff;
	border-radius: 2px;
}
.tabBox .aroundType li.selectTag {
	position: relative;
	background: #fff;
	font-weight: bold;
	color: #65318e;
}
.tabBox .aroundType li {
	cursor: pointer;
	display: inline-block;
	width: 20%;
	line-height: 40px;
	text-align: center;
	background: #f5f5f6;
	color: #333333;
	font-size: 14px;
}
.tabBox .itemTagBox {
	background: #fff;
	padding: 15px 0;
}
.tabBox .itemTagBox li:not(:last-child) {
	border-right: 1px solid #ddd;
}
.tabBox .itemTagBox li.selectTag {
	color: #65318e;
}
.tabBox .itemTagBox li {
	width: 20%;
	float: left;
	text-align: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	cursor: pointer;
}
.aroundList {
	height: 275px;
	background: #fff;
	overflow-y: auto;
}
.aroundList .itemBox li {
	margin-bottom: 15px;
	cursor: pointer;
	padding: 5px 0;
}
.contentBox {
	padding: 0 25px;
}
.contentBox .itemContent {
	margin-bottom: 12px;
}
.contentBox .phoneNumber,
.contentBox .itemInfo {
	color: #666666;
}
.contentBox .itemInfo {
	margin-bottom: 10px;
}
.contentBox .itemContent span:last-child {
	float: right;
}
.mapMaker {
	position: absolute;
	left: 45%;
	top: 36px;
	width: 10px;
	height: 10px;
	border: 2px solid rgb(223, 10, 49);
	padding: 2px;
	background-color: rgb(223, 10, 49);
	background-clip: content-box;
	border-radius: 50%;
}
.minMap{
  height: 0;
  width: 0;
}
</style>
