<template>
  <div class="buildNews">
    <!-- template 楼盘信息 start -->
    <div class="buildSport container">
      <h4 class="index_4">楼盘信息</h4>
      <div class="houseDet">
        <ul class="all">

          <li class="keep clearfix">
            <span>
              <label>占地面积</label>：
              <b>
                {{resblockInfo.buildSpace ? resblockInfo.buildSpace + '㎡' : '--'}}
              </b>
            </span>
            <span>
              <label>建筑面积</label>：
              <b>
                {{resblockInfo.buildArea ? resblockInfo.buildArea + '㎡' : '--'}}
              </b>
            </span>
            <span>
              <label>建筑类型</label>：
              <b>
                {{resblockInfo.constType || '--'}}
              </b>
            </span>
          </li>
          <li class="keep clearfix">
            <span>
              <label>总&nbsp;&nbsp;户&nbsp;数</label>：
              <b>
                {{resblockInfo.houseCount ? resblockInfo.houseCount + '户' : '--'}}
              </b>
            </span>
            <span>
              <label>物&nbsp;&nbsp;业&nbsp;费</label>：
              <b>
                {{resblockInfo.propertyFee ? resblockInfo.propertyFee + '元/㎡/月' : '--'}}
              </b>
            </span>
            <span>
              <label>人车分流</label>：
              <b>
                {{resblockInfo.isSplit || '--'}}
              </b>
            </span>
          </li>

          <li class="keep clearfix">
            <span>
              <label>供暖方式</label>：
              <b>
                {{resblockInfo.giveHeatType || '--'}}
              </b>
            </span>
            <span>
              <label>采暖方式</label>：
              <b>
                {{resblockInfo.takeHeatType || '--'}}
              </b>
            </span>
            <span>
              <label>车&nbsp;&nbsp;位&nbsp;数</label>：
              <b class="carCount">
                {{resblockInfo.carCount || '--'}}
              </b>
            </span>
          </li>
          <li class="keep clearfix">
            <span>
              <label>开&nbsp;&nbsp;发&nbsp;商</label>：
              <b class="developerCompany" title="北京海港房地产开发有限公司">
                {{resblockInfo.developerCompany || '--'}}
              </b>
            </span>
          </li>
          <li class="keep clearfix">
            <span>
              <label>物业公司</label>：
              <b class="propertyCompany" title="鲁能物业管理有限公司">
                {{resblockInfo.propertyCompany || '--'}}
              </b>
            </span>
          </li>
          <div :class="showResblockMessage?'aa messageShow':'aa messageHide'">
            <li class="clearfix">
              <span>
                <label>建筑设计</label>：
                <b title="北京建筑设计研究院">
                  {{resblockInfo.buildDesign || '--'}}
                </b>
              </span>
              <span>
                <label>园林设计</label>：
                <b title="北京星河园林工程有限公司">
                  {{resblockInfo.landscapeDesign || '--'}}
                </b>
              </span>
              <span>
                <label>建筑年代</label>：
                <b>
                  {{resblockInfo.buildYear || '--'}}
                </b>
              </span>
            </li>
            <li class="clearfix">
              <span>
                <label>拿地时间</label>：
                <b>
                  {{resblockInfo.getAreaTime || '--'}}
                </b>
              </span>
              <span>
                <label>车&nbsp;&nbsp;位&nbsp;比</label>：
                <b class="carRate">
                  {{resblockInfo.carRate || '--'}}
                </b>
              </span>

            </li>
            <li class="clearfix">
              <span>
                <label>会&nbsp;&nbsp;&nbsp;&nbsp;所</label>：
                <b>
                  {{resblockInfo.clubName || '--'}}
                </b>
              </span>
            </li>
          </div>
          <a href="javascript:void(0)" :class="!showResblockMessage?'btn downIt':'btn upIt'" @click="resblockMessage"></a>
        </ul>
      </div>
    </div>
    <!-- template 楼盘信息 end -->
  </div>
</template>
<script>
export default {
  props: {
    resblockInfo: Object
  },
  data() {
    return {
      showResblockMessage: false
    }
  },
  methods: {
    resblockMessage() {
      this.showResblockMessage = !this.showResblockMessage
    }
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
.houseDet ul.all li span {
  float: left;
  margin-right: 20px;
  padding-top: 18px;
  font-size: 14px;
}

.houseDet ul.all li span:last-child {
  margin-right: 0;
}

.houseDet ul.all .aa{
  transition: height .2s linear;
  overflow: hidden;
}
.houseDet ul.all .messageShow{
  height: 111px;
}
.houseDet ul.all .messageHide{
  height: 0;
}
.houseDet ul li label {
  display: inline-block;
  width: 60px;
  color: #333;
  vertical-align: top;
}

.houseDet ul li b {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
  vertical-align: bottom;
}

.houseDet ul.all a.btn {
  display: block;
  width: 20px;
  height: 14px;
  margin: 0 auto 20px;
  background: url(~assets/img/icon.png) no-repeat;
  color: #999999;
}
.houseDet ul.all a.btn:hover {
  color: #333333;
}
.houseDet ul.all a.downIt {
  background-position: -147px -147px;
}
.houseDet ul.all a.downIt:after {
  /* 查看全部楼盘信息 */
  content: '\67e5\770b\5168\90e8\697c\76d8\4fe1\606f';
  position: relative;
  display: block;
  width: 120px;
  top: 0;
  left: -120px;
}
.houseDet ul.all a.upIt {
  background-position: -147px -160px;
}
.houseDet ul.all a.upIt:after {
  /* 点击收起 */
  content: '\70b9\51fb\6536\8d77';
  position: relative;
  display: block;
  width: 60px;
  top: 0;
  left: -60px;
}
.carCount,.carRate{
  vertical-align: middle;
}
.developerCompany,.propertyCompany{
  width:900px;
  white-space: normal;
  vertical-align: top;
}
</style>
