<template>
  <div class="newImg clearfix" id="newgetHotRecommend_cot">
    <dl style="padding-bottom: 0;" v-for="(item,index) in projectRecommendList">
      <a :href="`/sh-xf/lp${item.resblockId}-${item.pkid}.html`" target="_blank">
        <dt>
          <img class="lazy_img" :data-src="item.titleImg" src="~assets/img/default2.png" onerror="javascript:this.src='~assets/img/default2.png'"
            :alt="`${item.resblockName}一手豪宅`" :title="`${item.resblockName}一手豪宅`">
          <p class="price">
            <span :title="item.resblockName">{{item.resblockName}}</span>
            <b>
              {{item.unitPriceMin ? item.unitPriceMin + '元/㎡起' : ''}}
            </b>
          </p>
          <p>
            <span>
              {{item.districtName || ''}} {{item.districtName&&item.bizcircleName ? '/' : ''}} {{item.bizcircleName || ''}}
            </span>
            <b :title="item.houseType">{{item.houseType || ''}}</b>
          </p>
        </dt>
      </a>
    </dl>
  </div>
</template>
<script>
export default {
  props: ['projectRecommendList']
}
</script>
