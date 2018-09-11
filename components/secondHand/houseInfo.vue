<template>
  <div class="buildNews"
       id="index_2">
    <div class="decscri container pg_huxing">
      <h4 class="index_2">户型信息
        <a href="/sh-esf/h3?wd=%E4%B8%96%E8%8C%82%E6%BB%A8%E6%B1%9F%E8%8A%B1%E5%9B%AD"
           target="_blank">
          <span>
            <i>{{birdEyeImgs.sameRoomCount}}</i>套同户型房源</span>
        </a>

        <span style="margin-left: 480px;font-size: 18px;color: #330033;text-decoration: none;font-weight:inherit;">房源鸟瞰图</span>
        <span class="housedelCode"
              style="float: right;color:#c2c2c2;margin-top:10px;">{{basicInfo.houseCode}}</span>
      </h4>
      <div class="newsCont clearfix">
        <div class="leftImg">
          <div class="smaImg">
            <template v-if="getTypeImgs.images && getTypeImgs.images[0]">
              <img class="pg_hx_img lazy_img"
                   style="width: 100%;height: 100%;cursor: pointer;"
                   src="~assets/img/testImg.jpg"
                   v-lazyload="getTypeImgs.images[0].imgUrl"
                   :alt="basicInfo.resblockName+'户型信息'"
                   :title="basicInfo.resblockName+'户型信息'"
                   @click="dialog.houseInfoPicSwiper = true">
              <b title="查看大图" @click="dialog.houseInfoPicSwiper = true"
                 class="img_btn"
                 style="display:block;">
                <img src="~assets/img/scale.png">
              </b>
            </template>
            <template v-else>
              <img class="pg_hx_img lazy_img"
                   style="width: 100%;height: 100%;"
                   src="~assets/img/testImg.jpg">
            </template>
          </div>
        </div>
        <div class="rightPoint"
             style="position: relative;">
          <div class="bird_location_x"
               style="display:none"></div>
          <div class="bird_location_y"
               style="display:none"></div>
          <img class="lazy_img"
               :src="birdEyeImgs.birdEye.url"
               :data-src="birdEyeImgs.birdEye.url"
               :alt="basicInfo.resblockName+'实勘图'"
               :title="basicInfo.resblockName+'实勘图'">
          <span class="pg_point"
                v-show="isShowLocation"
                style="position: absolute;left: 0;top: 0;background: red;color: #fff;padding: 3px;">房源所在位置</span>
        </div>
      </div>
    </div>
    <exdialog :visible.sync="dialog.houseInfoPicSwiper" :hasShadow="true"
              type="banner"
              width="1100px"
              height="560px">
      <simple-pic-swiper :getTypeImgs="getTypeImgs"></simple-pic-swiper>
    </exdialog>
  </div>
</template>
<script>
import exdialog from '~/components/exdialog'
import simplePicSwiper from '~/components/swiper/simplePicSwiper'
export default {
  data() {
    return {
      dialog: {
        houseInfoPicSwiper: false
      },
      isShowLocation: false,
      mapX: 0,
      mapY: 0
    }
  },
  props: ['basicInfo', 'birdEyeImgs', 'getTypeImgs'],
  mounted() {
    console.log(123123, this.getTypeImgs)
    if (this.birdEyeImgs.birdEye.map_X && this.birdEyeImgs.birdEye.map_Y) {
      this.isShowLocation = true
      this.mapX = Number(this.birdEyeImgs.birdEye.map_X) * 520 / 900
      this.mapY = Number(this.birdEyeImgs.birdEye.map_Y) * 390 / 675
    } else {
      this.isShowLocation = false
    }
  },
  components: {
    exdialog,
    simplePicSwiper
  }
}
</script>
