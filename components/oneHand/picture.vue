<template>
  <div class="buildSport container"
       id="picture_cot_view"
       total="40">
    <!-- template 楼盘相册 start -->
    <h4 class="index_2">楼盘相册</h4>
    <div class="picture clearfix">
      <dl :filetype="item.fileType"
          v-for="(item,index) in resblockPictureVoList"
          :key="index">
        <dt>
          <a href="javascript:void(0)">
            <img class="lazy_img"
                 src="~assets/img/default2.png"
                 v-lazyload="item.fileUrl"
                 :alt="`${resblockInfo.resblockName}楼盘相册`"
                 :title="`${resblockInfo.resblockName}楼盘相册`"
                 @click="picDialog(item.fileType)">
          </a>
        </dt>
        <dd class="pg1"
            v-if="item.fileType==1">新房现场图
          <span v-if="item.fileType==1">（{{getResblockPictureList.fileType1}}）</span>
          <span v-else-if="item.fileType==4">（{{getResblockPictureList.fileType4}}）</span>
          <span v-else-if="item.fileType==3">（{{getResblockPictureList.fileType3}}）</span>
          <span v-else-if="item.fileType==2">（{{getResblockPictureList.fileType2}}）</span>
        </dd>
        <dd class="pg1"
            v-else-if="item.fileType==2">楼盘位置图
          <span v-if="item.fileType==1">（{{getResblockPictureList.fileType1}}）</span>
          <span v-else-if="item.fileType==4">（{{getResblockPictureList.fileType4}}）</span>
          <span v-else-if="item.fileType==3">（{{getResblockPictureList.fileType3}}）</span>
          <span v-else-if="item.fileType==2">（{{getResblockPictureList.fileType2}}）</span>
        </dd>
        <dd class="pg1"
            v-else-if="item.fileType==3">新房效果图
          <span v-if="item.fileType==1">（{{getResblockPictureList.fileType1}}）</span>
          <span v-else-if="item.fileType==4">（{{getResblockPictureList.fileType4}}）</span>
          <span v-else-if="item.fileType==3">（{{getResblockPictureList.fileType3}}）</span>
          <span v-else-if="item.fileType==2">（{{getResblockPictureList.fileType2}}）</span>
        </dd>
        <dd class="pg1"
            v-else-if="item.fileType==4">样板间照片
          <span v-if="item.fileType==1">（{{getResblockPictureList.fileType1}}）</span>
          <span v-else-if="item.fileType==4">（{{getResblockPictureList.fileType4}}）</span>
          <span v-else-if="item.fileType==3">（{{getResblockPictureList.fileType3}}）</span>
          <span v-else-if="item.fileType==2">（{{getResblockPictureList.fileType2}}）</span>
        </dd>
      </dl>
    </div>
    <ex-dialog :visible.sync="dialog.oneHandBlockPicSwiperVisible"
               background-color="#000">
      <oneHandBlockPicSwiper :getResblockPictureList="getResblockPictureList"
                             :defaulttype="defaulttype"></oneHandBlockPicSwiper>
    </ex-dialog>
    <!-- template 楼盘相册 end -->
  </div>
</template>
<script>
import ExDialog from '~/components/exdialog'
import oneHandBlockPicSwiper from '~/components/swiper/oneHandBlockPicSwiper'
export default {
  props: {
    resblockPictureVoList: Array,
    resblockInfo: Object,
    getResblockPictureList: Object
  },
  data() {
    return {
      defaulttype: 1,
      dialog: {
        oneHandBlockPicSwiperVisible: false
      }
    }
  },
  components: {
    ExDialog,
    oneHandBlockPicSwiper
  },
  methods: {
    picDialog(filetype) {
      this.defaulttype = parseInt(filetype)
      console.log(99999, filetype)
      this.dialog.oneHandBlockPicSwiperVisible = true
    }
  }
}
</script>
<style scoped>
.buildSport{
  padding: 30px 0;
}
.buildSport h4 {
  font-size: 18px;
  color: #303;
  font-weight: 700;
}

.buildSport .picture dl {
  float: left;
  margin-top: 18px;
  margin-right: 20px;
  text-align: center;
}

.buildSport .picture dl:last-child {
  margin-right: 0;
}

.buildSport .picture dl dt,
.picture dl dt a,
.picture dl dt img {
  display: block;
  width: 195px;
  height: 130px;
}

.buildSport .picture dl dd {
  margin-top: 18px;
  font-size: 14px;
}
</style>
