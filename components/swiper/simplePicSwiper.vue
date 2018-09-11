<template>
  <div class="houseTypeInfo_view">
    <div class="swiper-container gallery-top"
         v-swiper:swiperTop="swiperTopOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(banner, idx) in banners"
             :key="idx">
          <img :src="banner.imgUrl">
        </div>
      </div>

      <div class="swiper-button-next swiper-button-white"
           ref="next"></div>
      <div class="swiper-button-prev swiper-button-white"
           ref="prev"></div>
      <div class="swiper-pagination pagination_cot"
           ref="pagination">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperTopOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      }
    }
  },
  props: {
    getTypeImgs: Object
  },
  computed: {
    banners() {
      return this.getTypeImgs.images
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
.houseTypeInfo_view img {
	display: block;
	width: 100%;
	height: 100%;
}
.houseTypeInfo_view .swiper-container {
	width: 421px;
	height: 560px;
}
.houseTypeInfo_view .swiper-button-prev,
.houseTypeInfo_view .swiper-button-next {
	position: absolute;
	top: 380px;
	width: 72px;
	height: 72px;
	background: url(~assets/img/icon.png) no-repeat;
	z-index: 5;
	zoom: 0.7;
}
.houseTypeInfo_view .swiper-button-prev {
	left: 10px;
	background-position: -30px -74px;
}
.houseTypeInfo_view .swiper-button-next {
	right: 10px;
	background-position: -109px -74px;
}
.houseTypeInfo_view .swiper-pagination{
  margin:auto;
  left:0;
  right:0;
}
</style>
