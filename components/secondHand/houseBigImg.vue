<template>
  <div id="houseBigImgs_list">
    <div class="houseBigImgs decscri container">
      <h4 class="index_5">房源图片</h4>
      <div class="houseBigImgs_cot ">
        <template v-for="(item,index) in list" v-if="index < num">
          <span :key="index">
            <img class="lazy_img"  src="~assets/img/default2.png" v-lazyload="item.imgUrl"
               @click="onHouseBigImgClick(index)">
            <i>{{item.imgType}}</i>
          </span>
        </template>
      </div>
      <div class="houseBigImgs_btn houseBigImgs_btn_more" style="display:block" v-if="fleg">
        <span @click="more()">查看更多房源图片</span>
      </div>
      <div class="houseBigImgs_btn houseBigImgs_btn_close" style="display:block" v-if="!fleg">
        <span @click="close()">收起更多房源图片</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 10,
      fleg: true,
      result: [],
      oldList: []
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  mounted() {

  },
  methods: {
    more() {
      this.num = this.num + 10
      if (this.num >= this.list.length) {
        this.fleg = false
      }
    },
    close() {
      this.num = 10
      this.fleg = !this.fleg
    },
    onHouseBigImgClick(idx) {
      this.$emit('houseBigImgClick', idx)
    }
  },
  watch: {

  }
}
</script>
