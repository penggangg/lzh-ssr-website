<template>
  <div class="top">
    <div class="wrapper clearfix">
      <div class="logo">
        <a href="/" class="logoImg">
          <img src="~assets/img/logo.png" alt="丽兹行官网" title="丽兹行-北京高端公寓买卖平台" />
        </a>
        <span class="city">
          <a href="/" class="now">北京</a>
          |
          <a href="http://sh.lizihang.com/" target="_blank">上海</a>
        </span>
      </div>
      <div class="nav nav_shou">
        <div class="tel">
          <span>服务热线：400-888-9950</span>
          <!--
            <p>
              <a href="avascript:void(0)">登录</a>|<a href="avascript:void(0)">注册</a>
            </p>
            -->
        </div>
        <ul class="clearfix" style='position:relative' ref="nav" @mouseout='homeOut'>
          <li>
            <a href="/" class="current" @mouseover='homeHover(5)'>首页</a>
          </li>
          <li>
            <a href="/sh-esf"  @mouseover='homeHover(84)'>二手房</a>
          </li>
          <li class="Nocommission_cot"  @mouseover='homeHover(162)'>
            <a href="/sh-xf">新房</a>
            <span class="Nocommission" style="line-height:19px;">免佣金</span>
          </li>
          <li  @mouseover='homeHover(283)'>
            <a href="/sh-zl" >租房</a>
          </li>
          <li @mouseover='homeHover(368)'>
            <a href="/sh-overseas.html"  >海外豪宅</a>
          </li>
          <li class="pg_sale" @mouseover='homeHover(476)'>
            <a href="javascript:void(0)"  >卖房·出租</a>
          </li>
          <li class="pg_rent" @mouseover='homeHover(580)'>
            <a href="javascript:void(0)" >帮我找房</a>
          </li>
          <p class="current_line" style="left:5px" ref="current_line"></p>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {

    }
  },
  methods: {
    // 划过的小白条效果
    homeHover (position) {
      this.$refs.current_line.style.left = position + 'px'
    },
    homeOut () {
      let defaultPosition = 5
      defaultPosition = this.$store.state.headerType.ctlInfo === 'overseas' ? 368 : 5
      this.$refs.current_line.style.left = defaultPosition + 'px'
    }
  }
}
</script>
