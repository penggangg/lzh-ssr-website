<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->
<template>
  <div>
    <!-- Swiper -->
    <div class="titleTab ">
      <h4 style="display:none"
          @click="currentFileType = 0"
          class="current"
          fileType=''>全部（
        <b>{{getResblockPictureList.fileType1 + getResblockPictureList.fileType4 +getResblockPictureList.fileType3 + getResblockPictureList.fileType2}}</b>张）</h4>
      <h4 fileType='1'
          @click="currentFileType = 1"
          :class="currentFileType === 1 ? 'current' : ''">新房现场图 （
        <b>{{getResblockPictureList.fileType1}}</b>张）</h4>
      <h4 fileType='4'
          @click="currentFileType = 4"
          :class="currentFileType === 4 ? 'current' : ''">样板间照片 （
        <b>{{getResblockPictureList.fileType4}}</b>张）</h4>
      <h4 fileType='3'
          @click="currentFileType = 3"
          :class="currentFileType === 3 ? 'current' : ''">新房效果图 （
        <b>{{getResblockPictureList.fileType3}}</b>张）</h4>
      <h4 fileType='2'
          @click="currentFileType = 2"
          :class="currentFileType === 2 ? 'current' : ''">楼盘位置图 （
        <b>{{getResblockPictureList.fileType2}}</b>张）</h4>
      <!--<h4>3D看房</h4>-->
    </div>
    <div class="swiper-container gallery-top"
         v-show="isShow"
         v-swiper:swiperTop="swiperTopOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(banner, idx) in banners"
             :key="idx">
          <img :src="banner">
        </div>
      </div>

      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
    <div class="swiper-container gallery-thumbs"
         v-show="isShow"
         v-swiper:swiperThumbs="swiperThumbsOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(banner, idx) in banners"
             :key="idx">
          <img :src="banner">
        </div>
        <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      ex_currentFileType: undefined,
      willTo_currentFileType: 1,
      asEdge: 0,
      swiperTopOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1
      },
      swiperThumbsOption: {
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        observer: true,
        observeParents: true
      }
    }
  },
  props: {
    getResblockPictureList: Object,
    defaulttype: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentFileType: {
      get() {
        return this.ex_currentFileType === undefined ? this.defaulttype : this.ex_currentFileType
      },
      set(val) {
        this.ex_currentFileType = val
      }
    },
    banners() {
      let currentFileType = this.currentFileType
      if (!(this.getResblockPictureList && this.getResblockPictureList.resblockPictureVoList)) return []
      let _banners = []
      this.getResblockPictureList.resblockPictureVoList.forEach((item, idx) => {
        if (currentFileType === parseInt(item.fileType)) {
          _banners.push(item.fileUrl)
        }
      })
      return _banners
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.swiperTop
      const swiperThumbs = this.swiperThumbs
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
      swiperTop.eventsListeners.touchStart.push((e) => {
        this.swiperTouchStart(e, swiperTop)
      })
      swiperTop.eventsListeners.touchEnd.push((e) => {
        this.swiperTouchEnd(e, swiperTop)
      })
    })
  },
  methods: {
    swiperTouchStart(e, swiper) {
      const currentFileTypeList = [1, 4, 3, 2]
      let ci = currentFileTypeList.indexOf(this.currentFileType)
      if (e.target.className.search('swiper-button-prev') > -1 && swiper.realIndex === 0) {
        this.willTo_currentFileType = ci === 0 ? 2 : currentFileTypeList[--ci]
        this.asEdge = 1
      } else if (e.target.className.search('swiper-button-next') > -1 && swiper.slides.length === swiper.realIndex + 1) {
        this.willTo_currentFileType = ci === 3 ? 1 : currentFileTypeList[++ci]
        this.asEdge = 2
      } else {
        this.asEdge = 0
      }
    },
    swiperTouchEnd(e, swiperTop) {
      if (this.asEdge > 0) {
        setTimeout(() => {
          this.currentFileType = this.willTo_currentFileType
          this.swiperTop.slideTo(0, 0, false)
        })
      }
    }
  }
}
</script>
<style scoped>
.titleTab {
	color: #fff;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	justify-content: space-around;
	-webkit-justify-content: space-around;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}
.titleTab h4.current {
	color: #efdb9f;
}
.swiper-container,
.titleTab {
	width: 687px;
	margin-left: auto;
	margin-right: auto;
}
.swiper-slide {
	background-size: cover;
	background-position: center;
}
.swiper-slide img {
	display: block;
	height: 100%;
}
.gallery-top {
	height: 458px;
}
.gallery-thumbs {
	height: 90px;
	box-sizing: border-box;
	padding: 10px 0;
}
.gallery-thumbs img {
	width: 100%;
	height: 100%;
}
.gallery-thumbs .swiper-slide {
	width: 25%;
	height: 100%;
	opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
	opacity: 1;
}
.titleTab h4 {
	cursor: pointer;
	padding: 19px 0;
	font-weight: 700;
	/* display: none; */
}
#huxing_view .imglist li {
	cursor: pointer;
}
.gallery-top .swiper-button-next {
	background: url(/assets/img/icon.png) no-repeat -109px -75px;
	width: 70px;
	height: 70px;
}
.gallery-top .swiper-button-prev {
	background: url(/assets/img/icon.png) no-repeat -31px -76px;
	width: 70px;
	height: 70px;
}
.gallery-thumbs .swiper-button-next {
	width: 12px;
	height: 30px;
	top: 68%;
	background: url(/assets/img/icon.png) no-repeat -202px -73px;
}
.gallery-thumbs .swiper-button-prev {
	width: 12px;
	height: 30px;
	top: 68%;
	background: url(/assets/img/icon.png) no-repeat -185px -73px;
}
.swiper-button-next.swiper-button-disabled,
.swiper-button-prev.swiper-button-disabled {
	pointer-events: initial;
	cursor: pointer;
	opacity: 1;
	pointer-events: inherit;
	pointer-events: unset;
}
</style>
