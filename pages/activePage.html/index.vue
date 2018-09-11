<template>
  <div>
    <headers></headers>
    <div class="actCont">
      <span class="ban1"></span>
      <span class="ban2"></span>
      <span class="ban3"></span>
      <span class="ban4"></span>
      <span class="ban5"></span>
      <span class="ban6"></span>
    </div>
  </div>
</template>
<script>
import headers from '~/components/headers'
export default {
  head() {
    return this.$setSeo('丽兹行新房0佣金全新为您买好房_专业顾问陪你看房买房买好房-丽兹行官网上海站', '', '')
  },
  data () {
    return {

    }
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
   @import '../../assets/css/oneDetails.css';
</style>
