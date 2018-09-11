<template>
  <div>
    <headers></headers>
    <!-- 搜索 -->
    <!-- :getDistrict="getDistrict" -->
    <search :getDistrict="getDistrict"
            :getBizcircle="getBizcircle"
            :fromSource="fromSource"
            ></search>
   
       <!-- 房源列表 -->
    <div v-if="getHouseList.list.length>0" class="contBox">
      <div class="container">
        <ul>
          <li class="contList clearfix" v-for="(house, index) in getHouseList.list" :key="index">
            <a :href="'/sh-esf/'+house.housedelId+'.html'" target="_blank" class="listImg">
              <img class='lazy_img' :src="house.titleImgUrl" :alt="house.bizcircleName+ house.resblockName+'二手豪宅出售'" :title="house.bizcircleName+ house.resblockName+'二手豪宅出售'" />
              <span class="preferred" v-if="house.isOptimalHouse === '102300000001'">丽兹优选</span>
              <button v-if="house.is720=='102300000001'" class="threeD">
                3D看房
              </button>
            </a>
            <div class="clearfix">
              <div class="leftSize">
                <h3>
                  <a :href="'/sh-esf/'+house.housedelId+'.html'" target="_blank" :title="house.houseTitle">{{house.houseTitle}}</a>
                </h3>
                <ul class="secondListShow">
                  <li>
                    <span>
                      居室：<i v-if="house.rooms">{{house.rooms}}</i>
                    </span>
                    <span>
                      建面：<i v-if="house.buildArea">{{house.buildArea}} ㎡</i>
                    </span>
                  </li>
                  <li>

                    <a :href="'/sh-esf/'+house.housedelId+'.html'" target="_blank">
                      楼盘：<i v-if="house.resblockName">{{house.resblockName}}</i>
                    </a>
                    <a :href="'/sh-esf/'+house.districtId+'_'+house.bizcircleId">
                      商圈：<i v-if="house.bizcircleName">{{house.bizcircleName}}</i>
                    </a>

                  </li>
                  <li>
                    <!-- 高档住宅 -->
                    <template v-if="house.houseType === '高档住宅'">
                      <span>产品：<i v-if="house.houseType">{{house.houseType}}</i></span>
                      <span>层数：
                        <i v-if="house.floorType">{{house.floorType}}</i>
                        <i v-if="house.totalFloors">/{{house.totalFloors}}层</i>
                        <i v-if="house.beforeFew" class="beforeAfterFew">前{{house.beforeFew}}后{{house.afterFew}}
                          <s class="question"></s>
                        </i>
                      </span>
                    </template>
                    <!-- 高档住宅end -->
                    <!-- 联排别墅 -->
                    <template v-if="house.houseType === '联排别墅'">
                      <span>产品：<i v-if="house.houseType">{{house.houseType}}</i>
                        <i v-if="house.doorType">-{{house.doorType}}</i>
                      </span>
                      <span>层数：
                        <i v-if="house.upFloors">地上{{house.upFloors}}层</i>
                        <i v-if="house.downFloors">/地下{{house.downFloors}}层</i>
                        <i v-if="house.beforeFew" class="beforeAfterFew">前{{house.beforeFew}}后{{house.afterFew}}
                          <s class="question"></s>
                        </i>
                      </span>
                    </template>
                    <!-- 联排别墅end -->
                    <!-- 独栋别墅||双拼别墅 -->
                    <template v-if="house.houseType=='独栋别墅'||house.houseType=='双拼别墅'">
                      <span>产品：<i v-if="house.houseType">{{house.houseType}}</i></span>
                      <span>层数：
                        <i v-if="house.upFloors"> 地上{{house.upFloors}}层</i>
                        <i v-if="house.downFloors">/地下{{house.downFloors}}层</i>
                        <i v-if="house.beforeFew" class="beforeAfterFew">前{{house.beforeFew}}后{{house.afterFew}}
                          <s class="question"></s>
                        </i>
                      </span>
                    </template>
                    <!-- 独栋别墅||双拼别墅end -->
                    <!-- 叠拼别墅 -->
                    <template v-if="house.houseType=='叠拼别墅'">
                      <span>产品：<i v-if="house.houseType">{{house.houseType}}</i>
                        <i v-if="house.stackType">-{{house.stackType}}</i>
                      </span>
                      <span>层数：
                        <i v-if="house.upFloors">地上{{house.upFloors}}层</i>
                        <i v-if="house.downFloors">/地下{{house.downFloors}}层</i>
                        <i v-if="house.beforeFew" class="beforeAfterFew">前{{house.beforeFew}}后{{house.afterFew}}
                          <s class="question"></s>
                        </i>
                      </span>
                    </template>
                    <!-- 叠拼别墅end -->
                  </li>
                </ul>
                <p class="label clearfix">
                  <label v-if="house.fiveYears=='102300000001'">满五</label>
                  <label v-if="house.twoYears=='102300000001'&&house.fiveYears=='102300000001'">满二</label>
                  <label v-if="house.isNewHouse=='102300000001'">全新房</label>
                  <label v-if="house.isGarden=='102300000001'">花园</label>
                  <label v-if="house.isTerrace=='102300000001'">露台</label>
                  <label v-if="house.isFloorHeating=='102300000001'">地暖</label>
                  <label v-if="house.stableTemperature=='102300000001'">恒温恒湿</label>
                  <label v-if="house.isMingChef=='102300000001'">明厨明卫</label>
                  <label v-if="house.isCourtyard=='102300000001'">合院</label>
                  <label v-if="house.isSwimmingPool=='102300000001'">带泳池</label>
                  <label v-if="house.isParkingSpace=='102300000001'">带车位</label>
                  <label v-if="house.isCarport=='102300000001'">带车库</label>
                </p>
              </div>
              <ul class="rightCern">
                <li>
                  <span>{{house.quotedPrice}}万</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <pagination :fromSource="fromSource" :pageIndex="getHouseList.pageNum" :pageSize="getHouseList.pageSize" :total="getHouseList.pages"></pagination>
        <!--  {if !empty($pages)}
       {$pages}
     {/if} -->
      </div>
    </div>
    <div v-else class="noFindH">
      <notHouse></notHouse>
    </div>

    <!-- 新房推荐 -->
    <div v-if="getProjectRecommend.length>0"
         class="newHouse">
      <div class="container clearfix"
           id="one_recommended_view">
        <h5>新房推荐</h5>
        <div class="newImg clearfix">
          <dl v-for="(house,index) in getProjectRecommend"
              :key="index"
              style="padding-bottom: 0;">
            <!-- href="/sh-xf/lp{$v['resblockId']}-{$v['pkid']}.html" -->
            <a :href="'/sh-xf/lp'+house.resblockId+'-'+house.pkid+'.html'"
               target="_blank">
              <dt>
                <img class='lazy_img'
                     :src='house.titleImg'
                     data-src="~/assets/img/default2.png"
                     :alt="house.resblockName+'一手豪宅'"
                     :title="house.resblockName+'一手豪宅'" />
                <p class="price"
                   style="padding:0 0 28px;">
                  <span>{{house.resblockName}}</span>
                  <b v-if="house.unitPriceMin"> {{house.unitPriceMin}}元/㎡起 </b>
                </p>
                <p style="width: 100%;position: absolute;bottom: 0px;color: #ccc;padding:5px 0">
                  <span> {{house.districtName}} / {{house.bizcircleName}} </span>
                  <b v-if="house.houseType"
                     title="">{{house.houseType}}</b>
                </p>
              </dt>
            </a>
          </dl>
        </div>
      </div>
    </div>
    <!-- 二手房推荐 -->
    <div v-if="getSecondRecommend.length>0&&getHouseList.list.length<=0"
         class="newHouse">
      <div class="container clearfix">
        <h5>二手豪宅推荐</h5>
        <div class="newImg clearfix seconeImg">
          <dl v-for="(house,index) in getSecondRecommend"
              :key="index"
              style="padding-bottom: 0;">
            <a :href="'/sh-esf/'+housedelId+'.html'"
               target="_blank">
              <dt>
                <img class='lazy_img'
                     :src='house.titleImgUrl'
                     data-src="~assets/img/default2.png"
                     :alt="house.resblockName+'二手豪宅出售'"
                     :title="house.resblockName+'二手豪宅出售'" />
                <p class="price"
                   style="padding:0 0 28px;">
                  <span>{{house.resblockName}}</span>
                  <b>{{house.quotedPrice}}万</b>
                </p>
                <p style="width: 100%;position: absolute;bottom: 0px;color: #ccc;padding:5px 0">
                  <span v-if="house.houseType=='高档住宅'">
                    <span v-if="house.rooms">{{house.rooms}}</span>
                    <span v-if="house.buildArea&&house.rooms">/</span>
                    <span>{{house.buildArea}}㎡</span>
                  </span>
                  <b>{{house.houseType}}</b>
                  <span v-if="house.houseType!='高档住宅'">

                    <span v-if="house.buildArea">{{house.buildArea}}㎡</span>
                    <span v-if="house.buildArea&&house.upFloors">/</span>
                    <span>地上{{house.upFloors}}层</span>
                    <span>/地下{{house.downFloors}}层</span>
                  </span>
                  <b>{{house.houseType}}</b>
                </p>
              </dt>
            </a>
          </dl>
        </div>
      </div>
    </div>
    <!-- {{featuresBind}} {{getHouseList}} -->
  </div>
</template>
<script>
import headers from "~/components/headers.vue"
import search from "~/components/searchInfo.vue"
import pagination from "~/components/page.vue"
export default {
  data() {
    return {
      result: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      // wd: '',
      isShow: false,
      isShowWord: false,
      isAssociation: false,
      associativeData: "",
      currentWord: "",
      wordData: ""
      // featuresBind: [],
    }
  },
  components: {
    headers,
    search,
    pagination
  },
  mounted () {
    this.lazyInit()
  },
  props: {
    getDistrict: {
      type: Array,
      default: []
    },
    getBizcircle: {
      type: Array,
      default: []
    },
    getHouseList: {
      type: Object,
      default: {}
    },
    getProjectRecommend: {
      type: Array,
      default: []
    },
    getSecondRecommend: {
      type: Array,
      default: []
    },
    fromSource: {
      type: String
    }
  }
}
</script>
<style>
@import '../../assets/css/secondHandList.css';
</style>
<style scoped>
.newHouse .newImg dl dt .price {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  background: linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.7));
  background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.7));
  background: -moz-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.7));
  background: -o-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.7));
}
/* 列表样式 */
a.listImg{
  position:relative;
}
.preferred {
  position: absolute;
  top: 15px;
  left: -5px;
  background: url(/assets/img/preferred.png) no-repeat;
  width: 76px;
  height: 32px;
  color: #EFDB9F;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
}
/* 三D看房 */
a.listImg>button.threeD{
  position: absolute;
  bottom:10px;
  right:10px;
  width: 65px;
  height: 28px;
  line-height: 28px;
  text-align:center;
  border:0;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.3);
  border-radius:3px;
  background: rgba(255,255,255,1);
  font-size: 12px;
  color: #303;
}
.contList>div .leftSize ul li{
  margin-bottom:17px;
}
.contList>div .leftSize .secondListShow li i{
  padding:0px;
  /* margin-right: */
}
.secondListShow li>span,
.secondListShow li>a{
  display:inline-block;
  width:250px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color:#474747;
}
.beforeAfterFew{
  margin-left:10px;
}
.contList>div .rightCern{
  margin-top:84px;
}
.contList>div .rightCern li span {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #f00018;
  margin-bottom: 10px;
}
</style>
