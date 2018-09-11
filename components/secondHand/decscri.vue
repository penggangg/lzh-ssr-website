<template>
  <div class="decscri container" id="index_1">
    <h4 class="index_1">房源描述</h4>
    <div class="infoCont">
      <dl v-if="basicInfo.houseTypeDesc">
        <!--  <dt>
                    <img src="/static/img/descImg1.png" />
                </dt> -->
        <dd>
          <span>户型描述</span>
          <b>{{basicInfo.houseTypeDesc}}</b>
        </dd>
      </dl>
      <dl v-if="basicInfo.saleReason">
        <!--  <dt>
                    <img src="/static/img/descImg3.png" />
                </dt> -->
        <dd>
          <span>出售原因</span>
          <b>{{basicInfo.saleReason}}</b>
        </dd>
      </dl>
      <dl v-if="basicInfo.saleGreen">
        <!-- <dt>
                    <img src="/static/img/descImg2.png" />
                </dt> -->
        <dd>
          <span>景观特点</span>
          <b>{{basicInfo.saleGreen}}</b>
        </dd>
      </dl>
      <dl v-if="basicInfo.fitmentPoint">
        <!--  <dt>
                    <img src="/static/img/descImg5.png" />
                </dt> -->
        <dd>
          <span>装修特点</span>
          <b>{{basicInfo.fitmentPoint}}</b>
        </dd>
      </dl>
      <!--<p class="more">查看更多 ∨</p>-->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: ['basicInfo']
}
</script>

