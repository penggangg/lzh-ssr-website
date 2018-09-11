<template>
  <div class="newImg clearfix seconeImg">
    <dl style="padding-bottom: 0;" v-for="(item,index) in hotRecommend">
      <a href="`/sh-esf/${item.housedelId}.html`" target="_blank">
        <dt>
          <img class="lazy_img" src="~assets/img/default2.png" :data-src="item.titleImgUrl" onerror="javascript:this.src='~assets/img/default2.png'"
            :alt="`${item.resblockName}二手豪宅出售`" :title="`${item.resblockName}二手豪宅出售`">
          <p class="price" style="padding:0 0 28px;">
            <span :title="item.resblockName">{{item.resblockName}}</span>
            <b>
              {{item.quotedPrice ? item.quotedPrice +'万' : ''}}
            </b>
          </p>
          <p>
            <span>
              {{item.rooms || ''}} {{item.rooms && item.buildArea ? '/' : '' }} {{item.buildArea ? item.buildArea +'㎡' : ''}} {{item.upFloors
              ? '/地上' + item.upFloors + '层' : ''}} {{item.downFloors ? '/地下' + item.downFloors + '层' : ''}}
            </span>
            <b>
              {{item.houseType}}
            </b>
          </p>
        </dt>
      </a>
    </dl>
  </div>
</template>
<script>
export default {
  props: ['hotRecommend']
}
</script>
