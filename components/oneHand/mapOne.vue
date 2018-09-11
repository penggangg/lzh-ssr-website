<template>
  <div class="contBor">
    <div class="decscri container"
         style="position: relative;">
      <h4 class="index_5">周边配套</h4>
      <div class="mapBox"
           id="allmap">
      </div>
      <!-- <div id="r-result" style="position: absolute;top:149px;right: 0;width:200px"></div> -->
      <div class="tabBox">
        <div class="ground clearfix">
            <p class="clearfix">
                <span v-for="(item,index) in list" :class="item.className" v-bind:key="index" @click="clickItem(item,index)">{{item.name}}</span>
            </p>
        </div>
        <baidu-map v-if="!resblockInfo.mapx" id="minMap" class="minMap"
                 :center="resblockInfo.cityCode=='310000'?'上海':'北京'"
                 :zoom="15">
        <bm-local-search :keyword="resblockInfo.resblockName"
                         :panel=false
                         :location="resblockInfo.cityCode=='310000'?'上海':'北京'"
                         :auto-viewport="false"
                         @searchcomplete="minmapSeach"></bm-local-search>
    </baidu-map>
        <baidu-map id="sendMap" class="map"
                 :center="{
        lng: resblockInfo.mapx,
        lat: resblockInfo.mapy
      }"
                 :zoom="15">
        <bm-marker :position="{lng: resblockInfo.mapx,
        lat: resblockInfo.mapy}">
        </bm-marker>
        <bm-info-window :position="{lng: resblockInfo.mapx, lat: resblockInfo.mapy}"  :show="true">
          <span v-text="resblockInfo.resblockName">{{resblockInfo.resblockName}}</span>
        </bm-info-window>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"
                       @ready="mapReady"></bm-navigation>
      </baidu-map>
      </div>
      <div id="r-result"></div>
      <div id="mapImg2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          name: '公交',
          className: 'current'
        },
        {
          name: '地铁',
          className: ''
        },
        {
          name: '教育设施',
          className: ''
        },
        {
          name: '医院',
          className: ''
        },
        {
          name: '银行',
          className: ''
        },
        {
          name: '休闲娱乐',
          className: ''
        },
        {
          name: '购物',
          className: ''
        },
        {
          name: '餐饮',
          className: ''
        },
        {
          name: '运动健身',
          className: ''
        }
      ],
      keyword: '公交',
      map: {},
      BMap: {}
    }
  },
  props: {
    resblockInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    minmapSeach(result) {
      console.log(result.Br[0].point.lng, result.Br[0].point.lat)
      this.resblockInfo.mapx = result.Br[0].point.lng
      this.resblockInfo.mapy = result.Br[0].point.lat
    },
    clickItem(item, index) {
      this.list.forEach(e => {
        e.className = ''
      })
      this.list[index].className = 'current'
      this.keyword = item.name
      var local = new this.BMap.LocalSearch(this.map, {
        renderOptions: {map: this.map, panel: "r-result"}
      })
      local.search(this.keyword)
    },
    mapReady({ BMap, map }) {
      var local = new BMap.LocalSearch(map, {
        renderOptions: {map: map, panel: "r-result"}
      })
      local.search(this.keyword)
      this.map = map
      this.BMap = BMap
    }
  }
}
</script>

<style scoped>
.decscri {
    padding: 30px 0;
}
.container {
    width: 1180px;
    font-family: 微软雅黑;
    margin: 0px auto;
}
.decscri h4 {
    font-size: 18px;
    color: #303;
    margin-bottom: 30px;
    font-weight: 700;
}
.ground {
    border-bottom: 1px solid #303;
}
.ground p, .ground strong {
    margin-bottom: 20px;
}

.ground p span.current {
    color: #303;
    font-weight: 700;
    border-bottom: 2px solid #303;
}
.ground p span {
    float: left;
    margin-right: 30px;
    font-size: 16px;
    cursor: pointer;
    height: 32px;
}
.map{
  width: 100%;
  height: 442px;
}
#r-result{
  position: absolute;
  top: 149px;
  right: 0;
  width: 200px;
}
.minMap{
  width: 0;
  height: 0;
}
</style>
