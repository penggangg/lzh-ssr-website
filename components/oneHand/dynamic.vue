<template>
  <!-- 楼盘动态 -->
  <div class="contBor index_1">
    <!-- template 楼盘动态 start -->
    <div class="buildSport container">
      <h4>楼盘动态</h4>
      <div>
        <div class="sportCont" v-if="resblockDynamicList.length">
          <div class="sportList clearfix">
            <dl v-for="(item,index) in resblockDynamicList" :key="index">
              <dt>
                <img v-if="item.activityType =='302100000001'" src="~assets/img/icon_d1.png" />
                <img v-if="item.activityType =='302100000005'" src="~assets/img/icon_d2.png" />
              </dt>
              <dd>
                <div v-if="item.activityType == '302100000001'">
                  <h5>
                    <i v-if="item.activityName" class="overflow_hidden_width340" :title="item.activityName">{{item.activityName}}</i>
                    <span v-if="item.isLandzOnly =='102300000001'" class="vertical-align-top">丽兹独享</span>
                  </h5>
                  <p>
                    <span>专场时间：</span>
                    <span :title="item.specialTime" class="overflow_hidden">{{item.specialTime}}</span>
                  </p>
                  <p>
                    <span>邀约话术：</span>
                    <span :title="item.inviteWord" class="overflow_hidden">{{item.inviteWord}}</span>
                  </p>
                  <p>
                    <span>专场地点：</span>
                    <span :title="item.address" class="overflow_hidden">{{item.address}}</span>
                  </p>
                </div>
                <div v-if="item.activityType == '302100000005'">
                  <h5>
                    <i v-if="item.activityName" class="overflow_hidden_width340" :title="item.activityName">{{item.activityName}}</i>
                    <span v-if="item.isLandzOnly =='102300000001'" class="vertical-align-top">丽兹独享</span>
                  </h5>
                  <p title="{$v['activityInfo']}">
                    <span>优惠内容：</span>
                    <span :title="item.activityInfo" class="overflow_hidden">
                      {{item.activityInfo||'--'}}
                    </span>
                  </p>
                  <p v-if="item.webLabel">外网标签：{{item.webLabel}}</p>
                  <p>
                    <span>发布时间：</span>
                    <span :title="item.releaseTime" class="overflow_hidden">{{item.releaseTime}}</span>
                  </p>
                </div>
              </dd>
            </dl>
          </div>


        </div>
        <p class="noSport" v-if="!resblockDynamicList.length">
          <b></b>
          <span>咨询顾问，获取新房最新动态</span>
        </p>
      </div>
    </div>
    <!-- template 楼盘动态 end -->
  </div>
</template>
<script>
export default {
  props: {
    resblockDynamicList: Array
  }
}
</script>
<style scoped>
  .buildSport{
    border-bottom:1px solid #ddd;
    padding: 30px 0;
  }
  .buildSport h4 {
    font-size: 18px;
    color: #303;
    font-weight: 700;
  }
  .buildSport p.noSport {
    margin-top: 20px;
    text-align: center;
  }
  .buildSport p.noSport b {
    display: inline-block;
    width: 54px;
    height: 56px;
    background: url(~assets/img/icon.png) -75px -216px no-repeat;
    margin-right: 16px;
    vertical-align: middle;
  }
  .buildSport p.noSport span {
    display: inline-block;
    margin-top: 12px;
    vertical-align: middle;
    font-size: 16px;
    color: #666;
  }

  .buildSport {
  padding: 30px 0 30px;
}

.buildSport h4 {
  font-size: 18px;
  color: #330033;
  font-weight: 700;
}

.sportCont .sportList {
  border-bottom: 1px solid #ddd;
}

.sportCont .sportList:last-child {
  border: 0;
}

.sportCont .sportList dl {
  padding: 32px 0;
  width: 1180px;
}

.sportCont .sportList dl:first-child {
  margin-right: 100px;
}

.sportCont .sportList dl:nth-child(odd) {
  float: left;
}

/* .sportCont .sportList dl:nth-child(even){float:right;} */

.sportCont .sportList dl dt {
  float: left;
  margin-right: 10px;
  margin-top: 8px;
}

.sportCont .sportList dl dt img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.sportCont .sportList dl dd {
  float: left;
  width: 800px;
}

.sportCont .sportList dl dd h5 {
  font-size: 15px;
  height: 24px;
  line-height: 24px;
}

.sportCont .sportList dl dd h5 span {
  display: inline-block;
  width: 83px;
  height: 24px;
  line-height: 24px;
  background: url(~assets/img/icon.png) no-repeat -88px -186px;
  text-align: center;
  font-size: 12px;
  margin-left: 12px;
  text-shadow: 0px 0px 0px #ddd;
}

.sportCont .sportList dl dd p {
  width: 100%;
  max-height: 40px;
  line-height: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  color: #666;
}

.sportCont .sportList dl dd p .overflow_hidden {
  width: 700px;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: inline-block;
  display: -webkit-box;
}

.overflow_hidden_width340 {
  display: inline-block;
  max-width: 340px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
