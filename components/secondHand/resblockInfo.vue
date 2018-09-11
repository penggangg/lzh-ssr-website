<template>
  <div class="buildNews"
       id="index_6">
    <div class="decscri container">
      <h4 class="index_6">楼盘信息
        <a :href="linkTo"
           target='_blank'>
          <span>出售房源
            <i> {{getResblockInfo.salesCount}} </i>套</span>
        </a>
      </h4>
      <div class="buildXX clearfix">
        <div class="buildScro"
             @mouseenter="mouseenter"
             @mouseleave="mouseleave">
          <div class="newsImg swiper-container"
               v-swiper:swiperTop="swiperTopOption">
            <div class="swiper-wrapper">
              <template v-if="getResblockInfo.imgs.length === 0">
                <div class="swiper-slide">
                  <img src="../../assets/img/default2.png" />
                </div>
              </template>
              <template v-else
                        v-for="(item,index) in getResblockInfo.imgs">
                <div class="swiper-slide"
                     :key="index">
                  <img class='lazy_img'
                       v-lazyload="item.fileUrl"
                       :src="item.fileUrl" />
                  <span class="suffix">
                    <template v-if="item.fileType == '1'">
                      实景图
                    </template>
                    <template v-if="item.fileType == '2'">
                      位置图
                    </template>
                    <template v-if="item.fileType == '3'">
                      效果图
                    </template>
                    <template v-if="item.fileType == '4'">
                      样板间
                    </template>
                  </span>
                </div>
              </template>
            </div>

            <div class="swiper-button-next"
                 ref="next"></div>
            <div class="swiper-button-prev"
                 ref="prev"></div>
          </div>
        </div>
        <div class="buildInfo">
          <ul>
            <li class="clearfix">
              <p>
                <span class="pg_resblockName">楼盘名称：</span>
                <b>
                  {{getResblockInfo.resblockName|def}}
                </b>
              </p>
              <p>
                <span>均&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
                <b>
                  {{[getResblockInfo.averagePrice, '元/㎡']|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p>
                <span>建筑类型：</span>
                <b>
                  {{getResblockInfo.constType|def}}
                </b>
              </p>
              <p>
                <span>建筑年代：</span>
                <b>
                  {{[getResblockInfo.buildYear, '年']|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p>
                <span>总&nbsp;户&nbsp;数&nbsp;：</span>
                <b>
                  {{[getResblockInfo.houseCount, '户']|def}}
                </b>
              </p>
              <p>
                <span>物&nbsp;业&nbsp;费&nbsp;：</span>
                <b>
                  {{[getResblockInfo.fee, '元/㎡/月']|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p>
                <span>占地面积：</span>
                <b>
                  {{[getResblockInfo.buildSpace, '㎡']|def}}
                </b>
              </p>
              <p>
                <span>建筑面积：</span>
                <b>
                  {{[getResblockInfo.buildArea, '㎡']|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p>
                <span>车位总数：</span>
                <b>
                  {{[getResblockInfo.carCount, '个']|def}}
                </b>
              </p>
              <p>
                <span>车位配比：</span>
                <b>
                  {{getResblockInfo.carRate|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p>
                <span>人车分流：</span>
                <b>
                  {{getResblockInfo.isSplit|def}}
                </b>
              </p>
              <p>
                <span>产品类型：</span>
                <b>
                  {{getResblockInfo.produceType|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p class="leng">
                <span class="vertical-align-top">开&nbsp;发&nbsp;商&nbsp;：</span>
                <b class="pg_right_item">
                  {{getResblockInfo.developers|def}}
                </b>
              </p>
            </li>
            <li class="clearfix">
              <p class="leng">
                <span class="vertical-align-top">物业公司：</span>
                <b class="pg_right_item">
                  {{getResblockInfo.propertyCompanies|def}}
                </b>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getResblockInfo: {}
  },
  data() {
    return {
      swiperTopOption: {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1
      },
      linkTo: ''
    }
  },
  filters: {
    def(value) {
      if (value) {
        let str
        let unit = ''
        if (Array.isArray(value)) {
          str = value[0]
          unit = value[1]
        } else {
          str = value
        }
        if (str === 0 || str === '0' || str === '0.00') {
          str = str.toString()
          return str + unit
        } else if (!str || str === '--') {
          return '--'
        } else {
          str = str.toString()
          return str + unit
        }
      } else {
        return '--'
      }
    }
  },
  mounted() {
    this.linkTo = '/sh-esf/?wd=' + encodeURI(this.getResblockInfo.resblockName)
    console.log(this.getResblockInfo)
  },
  methods: {
    mouseenter() {
      this.$refs['next'].style.display = 'block'
      this.$refs['prev'].style.display = 'block'
    },
    mouseleave() {
      this.$refs['next'].style.display = 'none'
      this.$refs['prev'].style.display = 'none'
    }
  }
}
</script>

<style scoped>
.newsImg {
}
.newsImg img {
	display: block;
	width: 100%;
	height: 100%;
}
.newsImg .suffix {
	position: absolute;
	background: rgba(0, 0, 0, 0.6);
	bottom: 12px;
	right: 12px;
	padding: 3px;
	color: #fff;
	border-radius: 3px;
}
.newsImg .swiper-button-next,
.newsImg .swiper-button-prev {
	position: absolute;
	top: 175px;
	width: 70px;
	height: 70px;
	background: url(~assets/img/icon.png) no-repeat no-repeat;
	z-index: 10;
	cursor: pointer;
	display: none;
}

.newsImg .swiper-button-prev {
	left: 10px;
	background-position: -31px -76px;
}

.newsImg .swiper-button-next {
	right: 10px;
	background-position: -109px -75px;
}
</style>
