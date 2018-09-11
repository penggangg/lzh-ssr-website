<template>
  <div class="footer">
    <div class="foot">
      <ul class="footNav container">
        <li>
          <a href="javascript:void(0)" :class="{current:current===0}" @mouseover='footMouseOver(0)'>一手楼盘</a>
        </li>|
        <li>
          <a href="javascript:void(0)" :class="{current:current===1}" @mouseover='footMouseOver(1)'>二手楼盘</a>
        </li>|
        <li>
          <a href="javascript:void(0)" :class="{current:current===2}" @mouseover='footMouseOver(2)'>租赁房源</a>
        </li>|
        <li>
          <a href="/ahoutus.html" :class="{current:current===3}" target="_blank" @mouseover='footMouseOver(3)'>公司介绍</a>
        </li>|
        <li>
          <a href="/sh-contactUs.html" :class="{current:current===4}" target="_blank" @mouseover='footMouseOver(4)'>联系我们</a>
        </li>
        <!--<li><a href="javascript:void(0)">友情链接</a></li>-->
        <!--<span>服务热线：400-888-9950</span>-->
        <span class="ewm">
          <img src="~assets/img/ewm.jpg">
          <b>扫描关注丽兹豪宅公众号</b>
        </span>
      </ul>
      <ul class="locaNav_one" v-show="current===0">
        <li v-for="(item,index) in oneHandHot">
          <a href="`/sh-xf/?wd=${item}`" onclick="_hmt.push(['_trackEvent', '新房底部推荐', 'click', '钓云台'])">{{item}}</a>
        </li>
      </ul>
      <ul class="locaNav_two" v-show="current===1" >
        <li v-for="(item,index) in secondHandHot">
          <a href="`/sh-esf/?wd=${item}`" onclick="_hmt.push(['_trackEvent', '二手房底部推荐', 'click', '新城国际'])">{{item}}</a>
        </li>
      </ul>
      <ul class="locaNav_three" v-show="current===2" >
        <li v-for="(item,index) in rentHotHot">
          <a href="`/sh-zl/?wd=${item}`" onclick="_hmt.push(['_trackEvent', '租赁底部推荐', 'click', '新城国际'])">{{item}}</a>
        </li>
      </ul>
      <ul class="footspace" v-show="current===3||current===4">
      </ul>
    </div>
    <p class="copyright">
      <span>Copyright2012 </span>
      <span>北京丽兹行房地产顾问有限公司</span>
      <span>备案号 京ICP11032714号-3</span>
      <!--<span>站长统计</span>-->
    </p>
  </div>
</template>
<style>
  .footspace {
    height: 19px;
  }
</style>
<script>
export default {
  data () {
    return {
      current: 0,
      oneHandHot: ['融创滨江壹号', '露香园', '景瑞尚滨江', '汇京国际广场', '朗诗新西郊'],
      secondHandHot: ['汤臣高尔夫', '维诗凯亚', '仁恒河滨城', '世茂滨江花园', '浦东星河湾'],
      rentHotHot: ['世茂滨江花园', '盛大金磐', '财富海景花园', '仁恒河滨城', '汤臣高尔夫']
    }
  },
  methods: {
    footMouseOver (num) {
      this.current = num
    }
  }
}
</script>
