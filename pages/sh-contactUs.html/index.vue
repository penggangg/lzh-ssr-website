<template>
  <div>
    <headers></headers>
    <div class="contact">
      <!-- 当前位置及搜索 -->
      <div class="locating container clearfix">
        <p>
          <a href="/">上海豪宅</a> >
          <a href="javascript:void(0)">联系我们</a>
        </p>
      </div>
      <!-- 公司首页联系我们 -->
      <div class="container clearfix">
        <ul class="leftNav">
          <li>
            <a href="/ahoutus.html">了解丽兹</a>
          </li>
          <li class="current">
            <a href="/sh-contactUs.html">联系我们</a>
          </li>
        </ul>
        <div class="linkCont">
          <div class="our">
            <p>总部地址：上海市浦东新区浦电路577号平安财富大厦107室</p>
            <span class="mapLoca"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headers from '~/components/headers'
export default {
  head() {
    return this.$setSeo('联系我们_丽兹行上海站联系地址，电话-丽兹行官网', '', '')
  },
  async asyncData({
    route,
    store
  }) {
    store.commit('headerType/urlInfo', route.path)
  },
  components: {
    headers
  }
}
</script>
<style>
  @import '../../assets/css/linkUS.css';
  @import '../../assets/css/timeLine.css';

</style>
