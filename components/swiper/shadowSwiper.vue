<template>
  <transition name="bigImgBounce">
    <div class="bigImg"
         v-show="visible">
      <div class="bigImg_cot">
        <div class="swiper-container gallery-top1"
             v-swiper:swiperTopShadow="swiperTopOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
                 :style="{'background-image':'url('+banner.imgUrl+')'}"
                 v-for="(banner, idx) in banners"
                 :key="idx"></div>
          </div>

          <div class="swiper-pagination shadow-swiper-pagination" ref="pagination">
          </div>
        </div>
        <div class="swiper-container gallery-thumbs1"
             v-swiper:swiperThumbsShadow="swiperThumbsOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
                 :style="{'background-image':'url('+banner.imgUrl.replace('900x600','300x200')+')'}"
                 v-for="(banner, idx) in banners"
                 :key="idx">
              <span class="img_type">{{banner.imgType}}</span>
            </div>
          </div>
        </div>
        <!-- 四个按钮的自定义 -->
        <div class="gallery_thumbs_prev"> </div>
        <div class="gallery_thumbs_next"> </div>
        <div class="gallery_top1_prev"> </div>
        <div class="gallery_top1_next"> </div>
      </div>
      <div class="big_close"
           @click="close"></div>

    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      dialog: {
        to3DdialogShow: false
      },
      swiperTopOption: {
        navigation: {
          nextEl: '.gallery_top1_next',
          prevEl: '.gallery_top1_prev'
        },
        initialSlide: this.active,
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        loopedSlides: this.list.length,
        pagination: { el: '.shadow-swiper-pagination',
          type: 'fraction',
          renderFraction(currentClass, totalClass) {
            return '<i class="page_type" ref="page_type"></i><span class="' + currentClass + '"></span>' +
              '/' +
              '<span class="' + totalClass + '"></span>'
          } }
      },
      swiperThumbsOption: {
        loop: true,
        initialSlide: this.active,
        slidesPerView: 7,
        loopedSlides: this.list.length,
        touchRatio: 0.2,
        slideToClickedSlide: !0,
        spaceBetween: 10,
        navigation: {
          nextEl: '.gallery_thumbs_next',
          prevEl: '.gallery_thumbs_prev'
        }
      }
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    active: 0,
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    banners() {
      return this.list
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTopShadow = this.swiperTopShadow
      const swiperThumbsShadow = this.swiperThumbsShadow
      swiperTopShadow.controller.control = swiperThumbsShadow
      swiperThumbsShadow.controller.control = swiperTopShadow
      swiperTopShadow.eventsListeners.slideChange.push(this.change)
    })
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
      this.$nextTick(this.change)
    },
    active(val) {
      this.$nextTick(() => {
        this.swiperTopShadow.slideToLoop(val, 0)
      })
    }
  },
  methods: {
    change() {
      let banner = this.banners[this.swiperTopShadow.realIndex]
      if (!banner) return true
      const txt = banner.imgType
      this.$refs['pagination'].querySelectorAll('.page_type')[0].innerText = txt || ''
    },
    close() {
      this.$emit('update:visible', false)
    }
  },
  components: {
  }
}
</script>
<style scoped>
/* 2017/12/14 图片大图的轮播样式 */
.bigImg {
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.86);
	z-index: 10000;
}

.bigImg .swiper-container {
	margin-left: auto;
	margin-right: auto;
}

.bigImg .swiper-slide {
	background-size: cover;
	background-position: center;
}

.bigImg .gallery-top1 {
	height: 71vh;
	width: 100%;
}

.bigImg .gallery-thumbs1 {
	width: 100vh;
	height: 7.6vh;
	box-sizing: border-box;
	margin-top: 4.4vh;
}

.bigImg .gallery-thumbs1 .swiper-slide {
	height: 100%;
	opacity: 0.4;
	cursor: pointer;
}

.bigImg .gallery-thumbs1 .swiper-slide-active {
	opacity: 1;
}

.shadow-swiper-pagination{
	display: inline-block;
	width: 83px;
	height: 30px;
	background: rgba(0, 0, 0, 0.7);
	line-height: 30px;
	border-radius: 3px;
	color: #fff;
  font-size: 14px;
  margin: auto;
  left: 0;
  right:0;
}

.page_type {
	margin-right: 2px;
}

.bigImg_cot {
	width: 106.7vh;
	height: 83vh;
	position: absolute;
	background: rgba(0, 0, 0, 0.8);
	margin: auto;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}

.gallery_thumbs_next {
	position: absolute;
	width: 1.8vh;
	height: 7.6vh;
	bottom: 0;
	right: 0;
	background: url('~/assets/img/right.png') no-repeat;
	cursor: pointer;
	background-size: contain;
}

.gallery_thumbs_prev {
	position: absolute;
	bottom: 0;
	width: 1.8vh;
	height: 7.6vh;
	background: url('~/assets/img/left.png') no-repeat;
	cursor: pointer;
	background-size: contain;
}

.gallery_top1_prev {
	position: absolute;
	width: 36px;
	height: 62px;
	top: calc(50% - 87px);
	left: -110px;
	background: url('~/assets/img/big_left.png') no-repeat;
	cursor: pointer;
}

.gallery_top1_next {
	position: absolute;
	width: 36px;
	height: 62px;
	top: calc(50% - 87px);
	right: -110px;
	background: url('~/assets/img/big_right.png') no-repeat;
	cursor: pointer;
}

.big_close {
	position: absolute;
	width: 46px;
	height: 46px;
	right: 20px;
	top: 20px;
	background: url('~/assets/img/big_close.png') no-repeat;
	cursor: pointer;
}

.gallery-thumbs1 .swiper-button-next,
.gallery-thumbs1 .swiper-button-prev,
.gallery-top1 .swiper-button-prev,
.gallery-top1 .swiper-button-next {
	display: none;
}
.bigImgBounce-enter-active {
	transition: all 0.2s;
}
.bigImgBounce-leave-active {
	transition: all 0.2s;
}
.bigImgBounce-enter,
.bigImgBounce-leave-to {
	opacity: 0;
}
</style>
