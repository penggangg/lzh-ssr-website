<template>
  <div class="roomImg mod18"
       @mouseenter="mouseenter"
       @mouseleave="mouseleave">
    <div class="picBox swiper-container gallery-top"
         v-swiper:swiperTop="swiperTopOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             @click="onBigImgClick(idx,banner)"
             v-for="(banner, idx) in banners"
             :key="idx">
          <img :src="banner.imgUrl">
        </div>
      </div>

      <div class="swiper-button-next swiper-button-white"
           ref="next"></div>
      <div class="swiper-button-prev swiper-button-white"
           ref="prev"></div>
      <span class="btn3D"
            @click="to3D">
        3D看房
      </span>
      <div class="swiper-pagination pagination_cot"
           ref="pagination">
      </div>
    </div>
    <div class="listBox swiper-container gallery-thumbs"
         v-swiper:swiperThumbs="swiperThumbsOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(banner, idx) in banners"
             :key="idx">
          <img :src="banner.imgUrl.replace('900x600','300x200')" />
          <span class="img_type">{{banner.imgType}}</span>
        </div>
        <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>
      </div>
      <div class="swiper-button-next swiper-button-black"></div>
      <div class="swiper-button-prev swiper-button-black"></div>
    </div>
    <!-- 3d看房 -->
    <exdialog :visible.sync="dialog.to3DdialogShow"
              width="1100px"
              height="560px"
              type='banner'>
      <iframe scrolling="auto"
              :src="getResblockPictureList.html5Url"
              width="100%"
              height="100%"
              style="border:0;"
              allowtransparency="true"
              onload="this.className='';"></iframe>
    </exdialog>
  </div>
</template>
<script>
import exdialog from '~/components/exdialog'
export default {
  data() {
    return {
      dialog: {
        to3DdialogShow: false
      },
      swiperTopOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        spaceBetween: 10,
        slidesPerView: 1,
        lazy: { loadPrevNext: !0, loadPrevNextAmount: 3 },
        pagination: { el: '.swiper-pagination',
          type: 'fraction',
          renderFraction(currentClass, totalClass) {
            return '<i class="page_type" ref="page_type"></i><span class="' + currentClass + '"></span>' +
              '/' +
              '<span class="' + totalClass + '"></span>'
          } }

      },
      swiperThumbsOption: {
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: !0,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  props: {
    getResblockPictureList: Object
  },
  computed: {
    banners() {
      return this.getResblockPictureList.images
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.swiperTop
      const swiperThumbs = this.swiperThumbs
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
      swiperTop.eventsListeners.slideChange.push(this.change)
      this.change()
    })
  },
  methods: {
    onBigImgClick(idx, banner) {
      this.$emit('bigImgClick', idx, banner)
    },
    mouseenter() {
      this.$refs['next'].style.display = 'block'
      this.$refs['prev'].style.display = 'block'
    },
    mouseleave() {
      this.$refs['next'].style.display = 'none'
      this.$refs['prev'].style.display = 'none'
    },
    change() {
      const txt = this.banners[this.swiperTop.realIndex].imgType
      this.$refs['pagination'].querySelectorAll('.page_type')[0].innerText = txt || ''
      this.$emit('change', this.swiperTop.realIndex)
    },
    to3D() {
      this.dialog.to3DdialogShow = true
    }
  },
  components: {
    exdialog
  }
}
</script>
<style scoped>
.swiper-slide {
	background-size: cover;
	background-position: center;
}
.swiper-slide img {
	display: block;
	height: 100%;
	width: 100%;
}
.gallery-thumbs img {
	width: 100%;
	height: 100%;
}
.gallery-thumbs .swiper-slide {
	width: 25%;
	height: 100%;
	opacity: 0.4;
	position: relative;
}
.gallery-thumbs .swiper-slide-active {
	opacity: 1;
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
.listBox {
	width: 615px;
	height: 81px;
	margin: 0 auto;
	position: relative;
	padding-top: 15px;
	overflow: hidden;
}
.btn3D {
	display: block;
	position: absolute;
	left: 20px;
	bottom: 20px;
	z-index: 999;
	cursor: pointer;
	width: 65px;
	height: 28px;
	font-size: 12px;
	color: rgba(51, 0, 51, 1);
	background: rgba(255, 255, 255, 1);
	box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
	border-radius: 3px;
	line-height: 28px;
}
.pagination_cot {
	display: inline-block;
	width: 83px;
	height: 30px;
	background: rgba(0, 0, 0, 0.7);
	line-height: 30px;
	border-radius: 3px;
	color: #fff;
	font-size: 14px;
}
.pagination_cot {
	margin: auto;
	left: 0;
	right: 0;
}
.img_type {
	position: absolute;
	background: rgba(0, 0, 0, 0.7);
	width: 100%;
	text-align: center;
	color: #fff;
	padding: 0.5px 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.gallery-thumbs .swiper-slide {
	height: 100%;
	opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
	opacity: 1;
}
</style>
