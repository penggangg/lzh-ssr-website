<template>
  <div class="roomInfo" style="position: relative;">
    <h3 v-if="getBasicInfo.houseTitle" :title="getBasicInfo.houseTitle">
      {{getBasicInfo.houseTitle}}
    </h3>
    <h3 v-else-if="getBasicInfo.bedRooms" :title="getBasicInfo.bedRooms+'居室'">{{getBasicInfo.bedRooms}}居室</h3>
    <p class="icon clearfix share">
      <!--<a href="javascript:void(0)" class="icon1"></a>
                <a href="javascript:void(0)" class="icon2"></a>
                <a href="javascript:void(0)" class="icon3"></a>
                <a href="javascript:void(0)" class="icon4"></a>-->
      <a href="javascript:void(0)" class="pg_yuyue">
        <b class="yy"></b>
        预约看房
      </a>
      <a href="javascript:void(0)" class="pg_fx">
        <b class="fx"></b>
        分享
      </a>

    </p>
    <div id="qrcode" style="position: absolute;right: -8px;top: 100px;border:6px solid #fff ;display: none;"></div>
    <div class="pri">
      <h5>
        <i v-if="getBasicInfo.quotedPrice">{{getBasicInfo.quotedPrice}}万</i>
        <i v-else>--</i>
      </h5>
      <p>
        <span v-if="getBasicInfo.bareRoomPrice">
          {{getBasicInfo.bareRoomPrice}} 元/㎡
        </span>
        <span v-else>
          <b>单价：--</b>
        </span>
        <span>
          <b>税费及首付请联系豪宅顾问</b>
        </span>
      </p>
      <p>
        <span>
          <template v-if="getBasicInfo.houseType=='高档住宅'">
            {{getBasicInfo.houseType}}
            <template v-if="getBasicInfo.structure">
              /
            </template>
            <template v-if="getBasicInfo.structure=='loft'">
              复式
            </template>
            <template v-if="getBasicInfo.structure=='loft'">
              <template v-if="getBasicInfo.structure">
                {{getBasicInfo.structure}}
              </template>
              <template v-else>
                --
              </template>
            </template>
          </template>
          <template v-if="getBasicInfo.houseType=='联排别墅'||getBasicInfo.houseType=='双拼别墅'">
            {{getBasicInfo.houseType}}
            <template v-if="getBasicInfo.doorType">
              /{{getBasicInfo.doorType}}
            </template>
          </template>
          <template v-if="getBasicInfo.houseType=='叠拼别墅'">
            {{getBasicInfo.houseType}}
            <template v-if="getBasicInfo.stackType">
              /{{getBasicInfo.stackType}}
            </template>
          </template>
          <template v-if="getBasicInfo.houseType=='独栋别墅'">
            {{getBasicInfo.houseType}}
            <template v-if="getBasicInfo.isStanding=='是'">
              /类独栋
            </template>
          </template>
        </span>
        <span v-if="getBasicInfo.lookWay">
          {{getBasicInfo.lookWay}}
        </span>
        <span v-else>
          带看方式:--
        </span>
      </p>
    </div>
    <div class="buildPar">
      <ul class="clearfix">
        <li v-if="getBasicInfo.bedRooms&&getBasicInfo.livingRooms">
          {{getBasicInfo.bedRooms}} 室 {{getBasicInfo.livingRooms}} 厅
        </li>
        <li v-else-if="getBasicInfo.bedRooms&&!getBasicInfo.livingRooms">
          {{getBasicInfo.bedRooms}} 室 --
        </li>
        <li v-else-if="!getBasicInfo.bedRooms&&getBasicInfo.livingRooms">
          厅室：{{getBasicInfo.livingRooms}} 厅
        </li>
        <li v-else-if="!getBasicInfo.bedRooms&&!getBasicInfo.livingRooms">
          厅室：--
        </li>
        <li v-if="getBasicInfo.buildArea">
          {{getBasicInfo.buildArea}} ㎡
        </li>
        <li v-else>
          面积：--
        </li>
        <li v-if="getBasicInfo.orientation">
          {{getBasicInfo.orientation}}
        </li>
        <li v-else>
          朝向：--
        </li>
        <li v-if="getBasicInfo.fitmentType">
          {{getBasicInfo.fitmentType}}
        </li>
        <li v-else>
          装修状况：--
        </li>
      </ul>
      <ul class="clearfix">
        <template v-if="getBasicInfo.houseType=='高档住宅'">
          <li>
            <template v-if="getBasicInfo.floorType&&getBasicInfo.totalFloors">
              {{getBasicInfo.floorType}} / {{getBasicInfo.totalFloors}}
            </template>
            <template v-else-if="!getBasicInfo.floorType&&getBasicInfo.totalFloors">
              {{getBasicInfo.totalFloors}} 层
            </template>
            <template v-else-if="getBasicInfo.floorType&&!getBasicInfo.totalFloors">
              {{getBasicInfo.floorType}}
            </template>
            <template v-else>
              楼层：--
            </template>
          </li>
          <li>
            <template v-if="getBasicInfo.houseUse">
              {{getBasicInfo.houseUse}}
            </template>
            <template v-else>
              用途 -
            </template>
            /
            <template v-if="getBasicInfo.buildType">
              {{getBasicInfo.buildType}}
            </template>
            <template v-else>
              建筑 -
            </template>
          </li>
        </template>
        <template v-else-if="getBasicInfo.houseType!='高档住宅'">
          <li>
            <template v-if="getBasicInfo.beforeFew">
              前 {{getBasicInfo.beforeFew}}
            </template>
            <template v-if="getBasicInfo.beforeFew&&getBasicInfo.afterFew">
              /
            </template>
            <template v-if="getBasicInfo.afterFew">
              后 {{getBasicInfo.afterFew}}
            </template>
            <template v-if="!getBasicInfo.beforeFew&&!getBasicInfo.afterFew">
              <i class="ques" style="cursor: pointer;"></i>
            </template>
          </li>
          <template v-if="getBasicInfo.houseType=='叠拼别墅'">
            <li>
              <template v-if="getBasicInfo.totalFloors">
                共 {{getBasicInfo.totalFloors}}层
              </template>
              <template v-else>
                --
              </template>
            </li>
          </template>
          <template v-else-if="getBasicInfo.houseType!='叠拼别墅'">
            <li>
              <template v-if="getBasicInfo.upFloors">
                地上{{getBasicInfo.upFloors}}层
              </template>
              <template v-if="getBasicInfo.upFloors&&getBasicInfo.downFloors">
                /
              </template>
              <template v-if="getBasicInfo.downFloors">
                地下{{getBasicInfo.downFloors}}层
              </template>
              <template v-if="!getBasicInfo.upFloors&&!getBasicInfo.downFloors">
                --
              </template>
            </li>
          </template>
        </template>
        <li>
          <template v-if="getBasicInfo.distinctName">
            {{getBasicInfo.distinctName}}
          </template>
          <template v-else>
            城区：--
          </template>
        </li>
        <li>
          <template v-if="getBasicInfo.bizcircleName">
            {{getBasicInfo.bizcircleName}}
          </template>
          <template v-else>
            商圈：--
          </template>
        </li>
      </ul>
      <ul class="clearfix">
        <li v-if="getBasicInfo.resblockName" class="basicInfoResblockName" :title="getBasicInfo.resblockName">
          {{getBasicInfo.resblockName }}
        </li>
        <li v-else>
          楼盘名称：--
        </li>
        <li v-if="getBasicInfo.buildYear">
          {{getBasicInfo.buildYear }}年建成
        </li>
        <li v-else>
          建筑年代：--
        </li>
        <li v-if="getBasicInfo.projectLocation" class="basicInfoProjectLocation" :title="getBasicInfo.projectLocation">
          {{getBasicInfo.projectLocation}}
        </li>
        <li v-else>
          项目区位：--
        </li>
      </ul>
      <p class="label_details clearfix">
        <label v-if="getBasicInfo.fiveYears=='是'||getBasicInfo.fiveYearsAndOnly=='是'">满五</label>
        <label v-if="getBasicInfo.twoYears=='是'&&getBasicInfo.fiveYears=='否'">满五</label>
        <label v-if="getBasicInfo.isNewHouse=='是'">全新房</label>
        <label v-if="getBasicInfo.isGardensContains=='是'">花园</label>
        <label v-if="getBasicInfo.isTerracesContains=='是'">露台</label>
        <label v-if="getBasicInfo.takeHeatType=='是'">地暖</label>
        <label v-if="getBasicInfo.stableTemperature=='是'">恒温恒湿</label>
        <label v-if="getBasicInfo.isMingChef=='是'">明厨明卫</label>
        <label v-if="getBasicInfo.isCourtYard=='是'">合院</label>
        <label v-if="getBasicInfo.isSwimmingPoolContain=='是'">带泳池</label>
        <label v-if="getBasicInfo.isParkingSpace=='是'">带车位</label>
        <label v-if="getBasicInfo.isCarport=='是'">带车库</label>
      </p>
    </div>
    <template v-if="getConsultantList[0]&&getConsultantList[0].recommendPosition=='400700000001'">
      <dl class="clearfix">
        <dt>
          <a href="javascript:void(0)" style="cursor: default;">
            <img :src="getConsultantList[0].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'">
          </a>
        </dt>
        <dd>
          <div>
            <h5>{{getConsultantList[0].counselorName}}
              <b>{{getConsultantList[0].userLevel}}</b>
            </h5>
            <b>我是本房的日常维护人，对房源状况很熟悉。</b>
            <p class="maintainer">
              <strong>{{getConsultantList[0].bigCode}}</strong> 转
              <strong>{{getConsultantList[0].extCode}}</strong>
              <span class="four_sao">扫码拨号</span>
              <span class="triangle_x"></span>
              <span class="four_ewm" pkid="14524" style="display: inline;">
                <canvas width="70" height="70"></canvas>
              </span>
            </p>
            <b>您好，联系我时请告知是丽兹豪宅网看到的信息，谢谢！</b>
          </div>
        </dd>
      </dl>
    </template>
    <template v-else-if="getConsultantList[1]&&getConsultantList[1].recommendPosition=='400700000001'">
      <dl class="clearfix">
        <dt>
          <a href="javascript:void(0)" style="cursor: default;">
            <img :src="getConsultantList[1].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'">
          </a>
        </dt>
        <dd>
          <div>
            <h5>{{getConsultantList[1].counselorName}}
              <b>{{getConsultantList[1].userLevel}}</b>
            </h5>
            <b>我是本房的日常维护人，对房源状况很熟悉。</b>
            <p class="maintainer">
              <strong>{{getConsultantList[1].bigCode}}</strong> 转
              <strong>{{getConsultantList[1].extCode}}</strong>
              <span class="four_sao">扫码拨号</span>
              <span class="triangle_x"></span>
              <span class="four_ewm" pkid="14524" style="display: inline;">
                <canvas width="70" height="70"></canvas>
              </span>
            </p>
            <b>您好，联系我时请告知是丽兹豪宅网看到的信息，谢谢！</b>
          </div>
        </dd>
      </dl>
    </template>
    <template v-else-if="getConsultantList[2]&&getConsultantList[2].recommendPosition=='400700000001'">
      <dl class="clearfix">
        <dt>
          <a href="javascript:void(0)" style="cursor: default;">
            <img :src="getConsultantList[2].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'">
          </a>
        </dt>
        <dd>
          <div>
            <h5>{{getConsultantList[2].counselorName}}
              <b>{{getConsultantList[2].userLevel}}</b>
            </h5>
            <b>我是本房的日常维护人，对房源状况很熟悉。</b>
            <p class="maintainer">
              <strong>{{getConsultantList[2].bigCode}}</strong> 转
              <strong>{{getConsultantList[2].extCode}}</strong>
              <span class="four_sao">扫码拨号</span>
              <span class="triangle_x"></span>
              <span class="four_ewm" pkid="14524" style="display: inline;">
                <canvas width="70" height="70"></canvas>
              </span>
            </p>
            <b>您好，联系我时请告知是丽兹豪宅网看到的信息，谢谢！</b>
          </div>
        </dd>
      </dl>
    </template>
    <template v-else>
        <dl class="clearfix">
            <dt>
                <a href="javascript:void(0)" style="cursor: default;">
                    <img src="../../assets/img/toux.jpg" onerror="javascript:this.src='/static/img/toux.jpg'" />
                </a>
            </dt>
            <dd>
                <div>
                    <h5>--
                        <b></b>
                    </h5>
                    <b>我是本房的日常维护人，对房源状况很熟悉。</b>
                    <p>
                        <i></i>
                    </p>
                    <b>您好，联系我时请告知是丽兹豪宅网看到的信息，谢谢！</b>
                </div>
            </dd>
        </dl>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: ['getBasicInfo', 'getConsultantList']
}
</script>
<style scoped>
  .basicInfoResblockName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .basicInfoProjectLocation {
    width: 280px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
