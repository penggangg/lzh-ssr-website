<template>
  <div>
    <div class="top">
		<span class="icon"><img :src="imgSrc" alt=""></span>
		<div class="name">
			<span class="rename">{{resblockName}}</span>
			<span class="qname">{{projectLocation}}</span>
		</div>
	</div>
  <div class="map">
      <baidu-map v-if="!mapx" id="minMap" class="minMap"
                 :center="cityCode=='310000'?'上海':'北京'"
                 :zoom="15">
        <bm-local-search :keyword="resblockName"
                         :panel=false
                         :location="cityCode=='310000'?'上海':'北京'"
                         :auto-viewport="false"
                         @searchcomplete="minmapSeach"></bm-local-search>
    </baidu-map>
    <baidu-map id="sendMap" class="sendMap"
                 :center="{
        lng: mapx,
        lat: mapy
      }"
                 :zoom="15">
        <bm-marker :position="{lng: mapx,
        lat: mapy}">
        </bm-marker>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"
                       ></bm-navigation>
      </baidu-map>
  </div>
  </div>
</template>

<script>
import mapIcon from '~/assets/img/mapIcon.png'
export default {
  data () {
    return {
      imgSrc: mapIcon
    }
  },
  props: {
    resblockName: {
      type: String,
      default: ''
    },
    mapx: {
      type: String,
      default: ''
    },
    cityCode: {
      type: String,
      default: ''
    },
    mapy: {
      type: String,
      default: ''
    },
    projectLocation: {
      type: String,
      default: ''
    }
  },
  methods: {
    minmapSeach(result) {
      this.mapx = result.Br[0].point.lng
      this.mapy = result.Br[0].point.lat
    }
  }
}
</script>

<style scoped>
  .top {
    display: flex;
    height: 100px;
    border-bottom: 1px solid #ddd;
    align-items: center;
    width: 90%;
    margin: 0 auto;
}
.map{
  height: 460px;
  width: 90%;
   margin: 0 auto;
}
.minMap{
  width:0;
  height: 0;
}
.sendMap{
  height: 460px;
  width: 100%;
}
.icon img {
    border-radius: 50%;
    height: 70px;
    width: 70px;
}
.name {
    display: flex;
    margin-left: 20px;
    height: 70px;
    flex-direction: column;
    justify-content: space-around;
}
.name span.rename {
    font-size: 20px;
    font-weight: 700;
    color: #333;
}
.name span.qname {
    color: #666;
}
.name span {
    display: block;
}
</style>
