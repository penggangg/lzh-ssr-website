<template>
  <div>
    <Second-detail v-if="!listShow"></Second-detail>
    <Second-list v-if="listShow"></Second-list>
  </div>
</template>
<script>
import SecondList from "~/components/secondHand/secondList.vue"
import SecondDetail from "~/components/secondHand/secondDetail.vue"
export default {
  data() {
    return {

    }
  },
  async asyncData({
    params,
    error,
    store,
    route,
    env
  }) {
    let listShow = true // 详情 列表页的开关
    listShow = !params.id.includes('html')
    return {
      listShow: listShow
    }
  },
  mounted () {
    this.lazyInit()
  },
  components: {
    SecondList,
    SecondDetail
  }
}
</script>

<style>


</style>
