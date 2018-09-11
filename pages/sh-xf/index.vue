<template>
  <div>
    <headers></headers>
    <!-- 搜索框 -->
    <div class="serachHouse">
      <div class="container clearfix"
           style="position: relative;">
        <p class="nowL">
          <a href="/">上海豪宅</a> &gt;
          <a href="/sh-xf/">
            一手豪宅</a>
        </p>
        <ul class="disN pg_nav_city">
          <li>
            <a href="/sh-xf/110105">朝阳区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110108">海淀区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110101">东城区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110102">西城区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110113">顺义区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110114">昌平区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110112">通州区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110109">门头沟区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110115">大兴区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110228">密云县
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110106">丰台区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
          <li>
            <a href="/sh-xf/110111">房山区
              <span style="display:none;">豪宅出售</span>
            </a>
          </li>
        </ul>
        <ul class="bizN pg_nav_area"></ul>
        <div class="reason clearfix">
          <div class="sear">
            <input id="search"
                   type="text"
                   placeholder="请输入楼盘名称/区域"
                   value="">
            <input type="button"
                   class="searicon">
          </div>
          <div class="pg_search_pv"
               style="display:none"></div>
          <div class="history_cot">
            <span class="pg_history">
              <i>搜索历史</i>
              <i class="clear_history">清除历史</i>
              <img style="float: right;height: 16px;width: 15px;margin: 2px 5px 0 0;cursor:pointer"
                   src="~assets/img/garb.png"> </span>
            <ul class="second">

            </ul>
          </div>
          <a href="/activePage.html">购新房，他们为什么更愿意选择丽兹行&gt;</a>
        </div>
        <p class="searching">大家都在搜：
          <a href="/sh-xf/?wd=融创滨江壹号"
             onclick="_hmt.push(['_trackEvent', '新房热门搜索', 'click', '融创滨江壹号'])">融创滨江壹号</a>
          <a href="/sh-xf/?wd=露香园"
             onclick="_hmt.push(['_trackEvent', '新房热门搜索', 'click', '露香园'])">露香园</a>
          <a href="/sh-xf/?wd=景瑞尚滨江"
             onclick="_hmt.push(['_trackEvent', '新房热门搜索', 'click', '景瑞尚滨江'])">景瑞尚滨江</a>
          <a href="/sh-xf/?wd=汇京国际广场"
             onclick="_hmt.push(['_trackEvent', '新房热门搜索', 'click', '汇京国际广场'])">汇京国际广场</a>
          <a href="/sh-xf/?wd=朗诗新西郊"
             onclick="_hmt.push(['_trackEvent', '新房热门搜索', 'click', '朗诗新西郊'])">朗诗新西郊</a>
        </p>
      </div>
    </div>
    <!-- 删选条件 -->
    <div class="filter container">
      <div class="allfil">
        <dl>
          <dt>城区</dt>
          <dd>
            <a href="/sh-xf/"
               class="current">不限</a>
            <!-- <a onclick="_hmt.push(['_trackEvent', '新房城区','click','朝阳区'])" href="/sh-xf/110105">朝阳区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','海淀区'])" href="/sh-xf/110108">海淀区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','东城区'])" href="/sh-xf/110101">东城区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','西城区'])" href="/sh-xf/110102">西城区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','顺义区'])" href="/sh-xf/110113">顺义区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','昌平区'])" href="/sh-xf/110114">昌平区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','通州区'])" href="/sh-xf/110112">通州区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','门头沟区'])" href="/sh-xf/110109">门头沟区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','大兴区'])" href="/sh-xf/110115">大兴区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','密云县'])" href="/sh-xf/110228">密云县</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','丰台区'])" href="/sh-xf/110106">丰台区</a>
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','房山区'])" href="/sh-xf/110111">房山区</a> -->
            <a onclick="_hmt.push(['_trackEvent', '新房城区','click','海淀区'])"
               v-for="(item,index) in getDistrict"
               href="/sh-xf/110108"
               :key="index">{{item.districtName}}</a>
          </dd>
        </dl>
        <dl>
          <dt>售价</dt>
          <dd>
            <a href="/sh-xf/"
               class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '新房售价','click', '1000万以下'])"
               href="/sh-xf/0p0-tp1000">1000万以下</a>
            <a onclick="_hmt.push(['_trackEvent', '新房售价','click', '1000-1500万'])"
               href="/sh-xf/0p1000-tp1500">1000-1500万</a>
            <a onclick="_hmt.push(['_trackEvent', '新房售价','click', '1500-2000万'])"
               href="/sh-xf/0p1500-tp2000">1500-2000万</a>
            <a onclick="_hmt.push(['_trackEvent', '新房售价','click', '2000-3000万'])"
               href="/sh-xf/0p2000-tp3000">2000-3000万</a>
            <a onclick="_hmt.push(['_trackEvent', '新房售价','click', '3000-5000万'])"
               href="/sh-xf/0p3000-tp5000">3000-5000万</a>
            <a onclick="_hmt.push(['_trackEvent', '新房售价','click', '5000万以上'])"
               href="/sh-xf/0p5000-tp20000000000">5000万以上</a>
            <a class="pg_price">
              <input oninput="value=value.replace(/[^\d]/g,'')"
                     class="min_price"
                     type="text"
                     name="text"
                     maxlength="5"> -
              <input oninput="value=value.replace(/[^\d]/g,'')"
                     class="max_price"
                     type="text"
                     name="text"
                     maxlength="5"> 万
              <input style="display:none"
                     type="button"
                     value="确定">

              <input type="hidden"
                     value="/sh-xf/0p99999999998-tp99999999999">
            </a>
          </dd>
        </dl>
        <dl>
          <dt>产品</dt>
          <dd>
            <a href="/sh-xf/"
               class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '新房产品','click', '高档住宅'])"
               href="/sh-xf/cp1">高档住宅</a>
            <a onclick="_hmt.push(['_trackEvent', '新房产品','click', '叠拼别墅'])"
               href="/sh-xf/cp2">叠拼别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '新房产品','click', '联排别墅'])"
               href="/sh-xf/cp3">联排别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '新房产品','click', '双拼别墅'])"
               href="/sh-xf/cp4">独栋别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '新房产品','click', '独栋别墅'])"
               href="/sh-xf/cp5">双拼别墅</a>
          </dd>
        </dl>
        <dl>
          <dt>用途</dt>
          <dd>
            <a href="/sh-xf/"
               class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '新房用途','click', '住宅'])"
               href="/sh-xf/y1">住宅</a>
            <a onclick="_hmt.push(['_trackEvent', '新房用途','click', '商业'])"
               href="/sh-xf/y2">商业</a>
            <a onclick="_hmt.push(['_trackEvent', '新房用途','click', '写字楼'])"
               href="/sh-xf/y3">写字楼</a>
          </dd>
        </dl>
        <div class="otherTerm">
          <dl>
            <dt>居室</dt>
            <dd>
              <a href="/sh-xf/"
                 class="current">不限</a>
              <a onclick="_hmt.push(['_trackEvent', '新房居室','click', '一居'])"
                 href="/sh-xf/h1">一居</a>
              <a onclick="_hmt.push(['_trackEvent', '新房居室','click', '二居'])"
                 href="/sh-xf/h2">二居</a>
              <a onclick="_hmt.push(['_trackEvent', '新房居室','click', '三居'])"
                 href="/sh-xf/h3">三居</a>
              <a onclick="_hmt.push(['_trackEvent', '新房居室','click', '四居'])"
                 href="/sh-xf/h4">四居</a>
              <a onclick="_hmt.push(['_trackEvent', '新房居室','click', '五居及以上'])"
                 href="/sh-xf/h5">五居及以上</a>
            </dd>
          </dl>
          <dl>
            <dt>面积</dt>
            <dd>
              <a href="/sh-xf/"
                 class="current">不限</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '100㎡以下'])"
                 href="/sh-xf/au0-ad100">100㎡以下</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '100-140㎡'])"
                 href="/sh-xf/au100-ad140">100-140㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '140-180㎡'])"
                 href="/sh-xf/au140-ad180">140-180㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '180-220㎡'])"
                 href="/sh-xf/au180-ad220">180-220㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '220-280㎡'])"
                 href="/sh-xf/au220-ad280">220-280㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '280-360㎡'])"
                 href="/sh-xf/au280-ad360">280-360㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '360-420㎡'])"
                 href="/sh-xf/au360-ad420">360-420㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '420-500㎡'])"
                 href="/sh-xf/au420-ad500">420-500㎡</a>
              <a onclick="_hmt.push(['_trackEvent', '新房面积','click', '500㎡以上'])"
                 href="/sh-xf/au500-ad20000000000">500㎡及以上</a>
              <a class="pg_area">
                <input oninput="value=value.replace(/[^\d]/g,'')"
                       class="min_area"
                       type="text"
                       name="text"
                       maxlength="5"> -
                <input oninput="value=value.replace(/[^\d]/g,'')"
                       class="max_area"
                       type="text"
                       name="text"
                       maxlength="5"> ㎡
                <input type="button"
                       style="display:none"
                       value="确定">

                <input type="hidden"
                       value="/sh-xf/au99999999998-ad99999999999">
              </a>
            </dd>
          </dl>
        </div>
        <a href="javascript:void(0)"
           class="moreOther">点击收起 ∧</a>
      </div>
      <div class="selected">
        您已选择：
        <div class="choice clearfix">
          <b>格拉斯小镇</b>
          <a href="/sh-xf/">
            <i></i>
          </a>

        </div>
        <a href="/sh-xf"
           class="clear"
           style="margin-left: 20px;color: #c2c2c2;">清空条件</a>
      </div>
    </div>
    <!-- 找到房源 -->
    <div class="find container clearfix">
      <div>
        <h4>为您找到
          <b>{{count}}</b>个北京新楼盘</h4> |
        <p>
          <a href="/sh-xf/?wd=格拉斯小镇"
             class="current">综合</a>
          <a href="/sh-xf/?wd=格拉斯小镇&amp;sort=a1">看房热度
            <i></i>
          </a>
        </p>
      </div>
      <!--<a href="javascript:void(0)"><i></i>地图找房</a>-->
    </div>
    <!-- 新房房源列表 -->
    <div class="contBox"
         v-if="projectList.length">
      <div class="container">
        <ul>
          <li class="contList clearfix"
              v-for="item in projectList"
              :key="item.resblockId">
            <a style="position: relative;overflow: hidden;"
               :href="`/sh-xf/lp${item.resblockId}-${item.pkid}.html`"
               class="listImg"
               target="_blank">
              <img v-if="item.titleImg"
                   class="lazy_img"
                   :data-src="item.titleImg"
                   :src="item.titleImg"
                   @error="imgError"
                   :alt="`${item.resblockName}豪宅出售`"
                   :title="`${item.resblockName}豪宅出售`">
              <img v-if="!item.titleImg"
                   src="~assets/img/default1.png" />
              <span class="special"
                    v-if="item.isSpecial=='102300000001'">丽兹专场 </span>

            </a>
            <div class="clearfix">
              <div class="leftSize oneIdent">
                <h3>
                  <a :href="`/sh-xf/lp${item.resblockId}-${item.pkid}.html`"
                     target="_blank"
                     :title="item.resblockName">{{item.resblockName}}</a>
                  <b v-if="item.activity">{{item.activity}}</b>
                </h3>
                <ul>
                  <li style="display:flex">
                    <b class="dw"></b>
                    <i class="pg_districtName"
                       :title="item.districtName&&item.projectLocation?item.districtName+' | '+item.projectLocation:''">
                      <a href="/sh-xf/110112">
                        {{item.districtName}} {{item.districtName&&item.projectLocation?'|':''}} {{item.projectLocation}}
                      </a>
                    </i>
                    <a href="javascript:void(0)"
                       class="lookMap"
                       :loacation="item.projectLocation"
                       :name="item.resblockName"
                       :qname="item.projectLocation"
                       :data-mapx="item.mapX"
                       :data-mapy="item.mapY" @click="lookMap(item.mapX,item.mapY,item.resblockName,item.cityCode,item.projectLocation)">查看地图</a>
                  </li>
                  <li>
                    <b class="js"></b>
                    <i v-show="item.bedRoomOne>0">1居</i>{{item.bedRoomOne?'|':''}}
                    <i v-show="item.bedRoomTwo>0">2居</i>{{item.bedRoomTwo?'|':''}}
                    <i v-show="item.bedRoomThree>0">3居</i>{{item.bedRoomThree?'|':''}}
                    <i v-show="item.bedRoomFour>0">4居</i>{{item.bedRoomFour?'|':''}}
                    <i v-show="item.bedRoomFive>0">5居及以上</i>{{item.bedRoomFive?'|':''}}
                    <i v-show="item.areaMin==item.areaMax&&item.areaMax&&item.areaMin">{{item.areaMin}}㎡</i>
                    <i v-show="item.areaMin!==item.areaMax">{{item.areaMin?item.areaMin:''}}{{item.areaMin&&item.areaMax?'~':''}}{{item.areaMax?item.areaMax:''}}{{item.areaMin||item.areaMax?'㎡':''}}</i>
                  </li>
                  <li>
                    <b class="zz"></b>
                    <i>{{item.houseType}}</i>
                  </li>
                </ul>
                <p class="label clearfix">
                  <label v-if="item.isSale==102300000001">在售</label>
                  <label v-if="item.isSale==102300000002">售罄</label>
                  <label v-if="item.isSelfGarden==102300000001">自带公园</label>
                  <label v-if="item.isGardenHouse==102300000001">花园洋房</label>
                  <label v-if="item.isCourtyard==102300000001">合院</label>
                  <label v-if="item.isSelfBusiness==102300000001">自带商业</label>
                  <label v-if="item.isLake==102300000001">临湖</label>
                  <label v-if="item.isNewWind==102300000001">新风系统</label>
                  <label v-if="item.stableTemperature==102300000001">恒温恒湿</label>
                  <label v-if="item.isHotSpring==102300000001">温泉入户</label>
                </p>
              </div>
              <ul class="rightCern">
                <!--<li>加关注</li>-->
                <li>
                  <span v-show="item.salePriceMin==item.salePriceMax&&item.salePriceMin&&item.salePriceMax">{{item.salePriceMin}}万</span>
                  <span v-show="item.salePriceMin!==item.salePriceMax">{{item.salePriceMin?item.salePriceMin:''}}{{item.salePriceMin&&item.salePriceMax?'~':''}}{{item.salePriceMax?item.salePriceMax:''}}{{item.salePriceMin||item.salePriceMax?'万':''}}</span>
                  <b v-show="item.unitPriceMin==item.unitPriceMax&&item.unitPriceMin&&item.unitPriceMax">{{item.unitPriceMin}}元/㎡</b>
                  <b v-show="item.unitPriceMin!==item.unitPriceMax">{{item.unitPriceMin?item.unitPriceMin:''}}{{item.unitPriceMin&&item.unitPriceMax?'~':''}}{{item.unitPriceMax?item.unitPriceMax:''}}{{item.unitPriceMin||item.unitPriceMax?'元/㎡':''}}</b>
                </li>
                <li>客户看房{{item.totalShowingAmount}}次</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索无结果页面 -->
    <div class="noFindH"
         v-if="!projectList.length">
      <notHouse></notHouse>
    </div>
    <!-- 列表分页 -->
    <mo-paging :page-index="currentPage"
               :total="count"
               :page-size="pageSize">
    </mo-paging>
    <!-- 新房推荐 -->
    <div v-show="projectRecommend.length>0"
         class="newHouse first_newHouse">
      <div class="container clearfix"
           id="one_recommended_view">
        <h5>新房推荐</h5>
        <oneHandRec :projectRecommendList='projectRecommend'></oneHandRec>
        <!-- <div class="newImg clearfix">
          <dl style="padding-bottom: 0;"
              v-for="(item,index) in projectRecommend"
              :key="index">
            <a :href="`/sh-xf/lp${item.resblockId}-${item.pkid}.html`"
               target="_blank">
              <dt>
                <img v-show="item.titleImg"
                     :src="item.titleImg"
                     :alt="`${item.resblockName}一手豪宅`"
                     :title="`${item.resblockName}一手豪宅`" />
                <img v-show="!item.titleImg"
                     src="~assets/img/default2.png" />
                <p class="price">
                  <span> {{item.resblockName}}</span>
                  <b>
                    {{item.unitPriceMin?item.unitPriceMin+'元/㎡起 ':''}}
                  </b>
                </p>
                <p>
                  <span>
                    {{item.districtName?item.districtName:''}} {{item.districtName&&item.bizcircleName?"/":''}} {{item.bizcircleName?item.bizcircleName:''}}
                  </span>
                  <b title="{$v['houseType']}">{{item.houseType}}</b>
                </p>
              </dt>
            </a>
          </dl>
        </div> -->
      </div>
    </div>
    <!-- 二手豪宅推荐 -->
    <div v-show="secondHandRecommend.length>0"
         class="newHouse">
      <div class="container clearfix">
        <h5>二手豪宅推荐</h5>
        <secondHandRec :hotRecommend='secondHandRecommend'></secondHandRec>
        <!-- <div class="newImg clearfix seconeImg">
          <dl style="padding-bottom: 0;"
              v-for="(item,index) in secondHandRecommend"
              :key="index">
            <a :href="`/sh-esf/${item.housedelId}.html`"
               target="_blank">
              <dt>
                <img v-show="item.titleImgUrl"
                     :src="item.titleImgUrl"
                     :alt="`${item.resblockName}二手豪宅出售`"
                     :title="`${item.resblockName}二手豪宅出售`" />
                <img v-show="!item.titleImgUrl"
                     src="~assets/img/default2.png" />
                <p>
                  <span :title='item.resblockName'>{{item.resblockName}}</span>
                  <b>
                    {{item.quotedPrice?item.quotedPrice+'万 ':''}}
                  </b>
                </p>
                <p>
                  <span>
                    {{item.rooms?item.rooms:''}} {{item.rooms&&item.buildArea?"/":''}} {{item.buildArea?item.buildArea+'㎡':''}} {{item.upFloors?' /地上'+item.upFloors+'层':''}} {{item.downFloors?' /地下'+item.downFloors+'层':''}}
                  </span>
                  <b>{{item.houseType}}</b>
                </p>
              </dt>
            </a>
          </dl>
        </div> -->
      </div>
    </div>
    <ExDialog :visible.sync="dialog_lookMap" width="900px" height="600px">
      <mapLayer :mapx="mapx" :projectLocation="projectLocation" :mapy="mapy" :cityCode="cityCode" :resblockName="resblockName"></mapLayer>
    </ExDialog>
  </div>
</template>
<script>
import headers from '~/components/headers'
import MoPaging from '~/components/page'
import axios from '~/plugins/axios'
import notHouse from '~/components/notHouse'
import default2 from '~/assets/img/default2.png'
import mapLayer from '~/components/mapLayer'
import ExDialog from '~/components/exdialog'
import oneHandRec from '~/components/recommended/onehand'
import secondHandRec from '~/components/recommended/secondhand'
export default {
  data() {
    return {
      resblockName: '',
      mapx: '',
      mapy: '',
      cityCode: '',
      projectLocation: '',
      dialog_lookMap: false,
      pageSize: 20, // 每页显示20条数据
      currentPage: 1, // 当前页码
      projectList: ''
    }
  },
  async asyncData({ params, route, store, error, env }) {
    let data = {
      cityCode: '310000',
      sortType: '',
      site: '400100000001',
      pageSize: 20,
      currentPage: 1,
      userId: '',
      sortColumn: '',
      keyWord: ''
    }
    store.commit('headerType/urlInfo', route.path)
    let [getDistrict, projectList] = await Promise.all([
      axios.get(`${env.url}/landz-web-project/list/getDistrict?cityCode=310000`),
      axios.post(`${env.url}/landz-web-project/list/getProjectList`, data)
    ]).catch(err => {
      // error({ statusCode: 400, message: err })
      console.log(err)
    })
    return {
      getDistrict: getDistrict.data.result,
      projectList: projectList.data.result.projectPageInfo.projectList.list,
      count: projectList.data.result.projectPageInfo.projectList.total,
      projectRecommend: projectList.data.result.projectRecommend, // 新房推荐
      secondHandRecommend: projectList.data.result.secondHandRecommend// 二手房推荐
    }
  },
  components: {
    headers,
    MoPaging,
    notHouse,
    ExDialog,
    mapLayer,
    oneHandRec,
    secondHandRec
  },
  mounted() {
    this.lazyInit()
  },
  methods: {
    lookMap(x, y, resblockName, cityCode, projectLocation) {
      this.mapx = x
      this.mapy = y
      this.resblockName = resblockName
      this.cityCode = cityCode
      this.projectLocation = projectLocation
      this.dialog_lookMap = true
    },
    imgError(e) {
      console.log(e, default2)
      e.target.src = default2
    }
  }
}
</script>
<style>
@import '../../assets/css/oneList.css';
</style>
