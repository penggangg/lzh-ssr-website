<template>
  <!-- 搜索 -->
  <div class="serachHouse">
    <div class="container clearfix" style="position: relative;">
      <p class="nowL">
        <a href="/">上海豪宅</a> >
        <a href="/sh-esf/">二手豪宅{{searchInfo.city.districtId?'出售':''}}
                    </a>
        <a v-if="searchInfo.city.districtId" @mouseenter="showBusinessArea" :href="'/sh-esf/'+searchInfo.city.districtId" class="disN_a">
                        > {{searchInfo.city.districtName}}
                        <span>
                            <img style="width:13px;height:13px;margin-left:5px;" src="~/assets/img/down.png" alt="">
                        </span>
                    </a>
        <a v-if="searchInfo.busines.districtId" :href="'/sh-esf/'+searchInfo.city.districtId+'_'+searchInfo.busines.districtId" class="bizN_a">
                        >{{searchInfo.busines.districtName}}
                        <span>
                            <img style="width:13px;height:13px;margin-left:5px;" src="~/assets/img/down.png" alt="">
                        </span>
                    </a>
      </p>
      <ul class="disN pg_nav_city" ref="city">
        <li v-for="city in getDistrict" :key="city.districtId">
          <a :href="'/sh-esf/'+city.districtId">
          	{{city.districtName}}
            <span style="display:none">二手豪宅</span>
          </a>
        </li>
      </ul>
      <ul class="bizN pg_nav_area">
        <li v-for="item in getBizcircle" :key="item.bizcircleId">
          <a :href="'/sh-esf/'+searchInfo.city.districtId+'_'+item.bizcircleId">{{item.bizcircleName}}
                            <span style="display:none">二手豪宅</span>
                        </a>
        </li>
      </ul>
      <div class="reason clearfix">
        <div class="sear">
          <!-- :value="queryStr.wd" @input="updateKeyWord"   @focus="infocus" -->
          <input id='search' @focus="infocus" type="text" placeholder="请输入楼盘名称/区域" v-model="currentWord" @keyup.enter="updateKeyWord(currentWord)" />
          <!-- <input type="button" class="searicon" /> -->
          <a :href="'/sh-esf/?wd='+currentWord" class="searicon" @click="updateKeyWord(wd)"></a>
        </div>
        <div class="pg_search_pv" style="display:none"></div>
        <div v-if="isShowWord" class="history_cot" style="position: absolute;width: 781px;border: 1px solid #E2E2E2;box-sizing:content-box;padding-right: 3px;padding-top:10px;">
          <span class="pg_history">
                            <i>搜索历史</i>
                            <i class="clear_history" style="float: right;color: #333;cursor: pointer;">清除历史</i>
                            <img style="float: right;height: 16px;width: 15px;margin: 2px 5px 0 0;cursor:pointer" src='~/assets/img/garb.png' />
                        </span>
          <ul class="second" style="display: block;min-height: 40px;overflow: hidden;">
            <li class="pg_href" v-for="(item,index) in wordData" :key="index">
              <a class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self">{{item}}</a>
            </li>
            <!-- <a v-for="(item,index) in wordData" :key="index" class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self" onclick="_hmt.push([&quot;_trackEvent&quot;, &quot;二手房历史搜索&quot;,&quot;click&quot;, &quot;阳光花园别墅&quot;])"><li class="pg_href">{{item}}</li></a> -->
          </ul>
        </div>
        <div v-if="isAssociation" class="history_cot" style="position: absolute;width: 781px;border: 1px solid #E2E2E2;box-sizing:content-box;padding-right: 3px;padding-top:10px;">
          <ul class="second" style="display: block;min-height: 40px;overflow: hidden;">
            <li class="pg_href" v-for="(item,index) in associativeData" :key="index">
              <a class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self">{{item}}</a>
            </li>
            <!-- <a v-for="(item,index) in wordData" :key="index" class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self" onclick="_hmt.push([&quot;_trackEvent&quot;, &quot;二手房历史搜索&quot;,&quot;click&quot;, &quot;阳光花园别墅&quot;])"><li class="pg_href">{{item}}</li></a> -->
          </ul>
        </div>
      </div>
      <p class="searching">大家都在搜：
        <a href="/sh-esf/?wd=世茂滨江花园" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '世茂滨江花园'])">世茂滨江花园</a>
        <a href="/sh-esf/?wd=财富海景花园" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '财富海景花园'])">财富海景花园</a>
        <a href="/sh-esf/?wd=浦东星河湾" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '浦东星河湾'])">浦东星河湾</a>
        <a href="/sh-esf/?wd=仁恒河滨城" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '仁恒河滨城'])">仁恒河滨城</a>
        <a href="/sh-esf/?wd=汤臣湖庭" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '汤臣湖庭'])">汤臣湖庭</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex"
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      searchInfo: state => state.secondType.searchInfo,
      busines: state => state.secondType.busines,
      keyword: state => state.secondType.keyword,
      queryStr: state => state.secondType.queryStr,
      featuresBind: state => state.secondType.featuresBind
    }),
    ...mapGetters({
      searchResult: "secondType/searchResult",
      getPath: "secondType/getPath",
      getLimitPath: "secondType/getLimitPath",
      getComplex: "secondType/getComplex"
    }),
  },
 props: {
 	// 城区
    getDistrict: {
      type: Array,
      default: []
    },
    // 商圈
    getBizcircle: {
      type: Array,
      default: []
    }
  }, 

</script>
