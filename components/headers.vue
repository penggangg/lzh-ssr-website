<template>
  <!-- 顶部 -->
  <div class="levelHead">
    <div class="levelTop container clearfix">
      <div class="logo">
        <a href="/" class="logo_next">
          <img src="~assets/img/logo_next.png" alt="丽兹行官网" title="丽兹行-北京高端公寓买卖平台" />
        </a>
        <span>
          <a href="/" class="now">北京</a>|
          <a href="http://sh.lizihang.com/" target="_blank">上海</a>
        </span>
      </div>
      <ul class="nav clearfix">
        <li>
          <a href="/" :class="{current:$store.state.headerType.ctlInfo === 'home'}">首页</a>
        </li>
        <li>
          <a href="/sh-esf" :class="{current:$store.state.headerType.ctlInfo === 'second'}">二手房</a>
        </li>
        <li class="Nocommission_cot">
          <a href="/sh-xf" :class="{current:$store.state.headerType.ctlInfo=== 'onehand'}">新房</a>
          <span class="Nocommission">免佣金</span>
        </li>
        <li>
          <a href="/sh-zl" :class="{current:$store.state.headerType.ctlInfo=='rent'}">租房</a>
        </li>
        <li>
          <a href="/sh-overseas.html">海外豪宅</a>
        </li>
        <li class="pg_sale">
          <a href="javascript:void(0)" @click="dialog.saleOrRelease=true">卖房·出租</a>
        </li>
        <li class="pg_rent">
          <a href="javascript:void(0)" @click="dialog.findHouse=true">帮我找房</a>
        </li>
      </ul>
      <div class="tel">
        <span>服务热线：400-888-9950</span>
        <!--
          <p>
            <a href="avascript:void(0)">登录</a>|<a href="avascript:void(0)">注册</a>
          </p>
          -->
      </div>
    </div>
    <exdialog :visible.sync="dialog.saleOrLease" width="1200px" height="620px" type="banner">
      <saleOrLease></saleOrLease>
    </exdialog>
    <exdialog :visible.sync="dialog.findHouse" width="1200px" height="620px" type="banner">
      <findHouse></findHouse>
    </exdialog>
  </div>
</template>
<script>
import exdialog from '~/components/exdialog'
import saleOrLease from '~/components/saleOrLease'
import findHouse from '~/components/findHouse'
export default {
  data() {
    return {
      dialog: {
        saleOrLease: false,
        findHouse: false
      }
    }
  },
  components: {
    exdialog,
    saleOrLease,
    findHouse
  }
}
</script>
<style>
  @import '../assets/css/listStyle.css';

</style>
