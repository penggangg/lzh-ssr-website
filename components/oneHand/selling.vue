<template>
  <div class="buildNews">
    <!-- template 楼盘卖点 start -->
    <div class="buildSport container">
      <h4 class="index_7">楼盘卖点</h4>
      <div class="houseDet sellpoint">
        <ul class="intrLong">
          <li class="item" :title="resblockInfo.saleLocation">
            <label>地理优势</label>
            <b>{{resblockInfo.saleLocation||'--'}}</b>
          </li>
          <li class="item" :title="resblockInfo.saleTransport">
            <label>交通优势</label>
            <b>{{resblockInfo.saleTransport||'--'}}</b>
          </li>
          <li class="item" :title="resblockInfo.saleSuport">
            <label>配套优势</label>
            <b>{{resblockInfo.saleSuport||'--'}}</b>
          </li>
          <li class="item" :title="resblockInfo.saleGreen">
            <label>园林绿化</label>
            <b>{{resblockInfo.saleGreen||'--'}}</b>
          </li>
          <li class="item" :title="resblockInfo.saleBuildStyle">
            <label>景观亮点</label>
            <b>{{resblockInfo.saleBuildStyle||''}}</b>
          </li>
          <li class="item" :title="resblockInfo.saleSpecialValue">
            <label>楼盘特点</label>
            <b>{{resblockInfo.saleSpecialValue||'--'}}</b>
          </li>
        </ul>
      </div>
    </div>
    <!-- template 楼盘卖点 end -->
  </div>
</template>
<script>
export default {
  props: {
    resblockInfo: Object
  }
}
</script>
<style scoped>
.buildSport{
  padding: 30px 0;
}
.buildSport h4 {
  font-size: 18px;
  color: #303;
  font-weight: 700;
}
.buildSport .sellpoint {
  margin-top: 30px;
}
.houseDet ul.intrLong li {
  font-size: 14px;
}
.buildSport .sellpoint .item {
  margin-top: 18px;
}
.buildSport .sellpoint .item label {
  padding-right: 20px;
  font-weight: bold;
}
.buildSport .sellpoint .item b{
  width: 778px;
  white-space: normal;
  vertical-align: top;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
}
</style>

