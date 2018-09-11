<template>
  <div>
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
            <a :href="'/sh-esf/'+city.districtId">{{city.districtName}}
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
    <!-- 筛选条件 -->
    <div class="filter container">
      <div class="allfil">
        <dl>
          <dt>城区</dt>
          <dd>
            <a :href="'/'+fromSource+'/'+getLimitPath('city')" class="current">不限</a>
            <a v-for="(city,index) in getDistrict" :class="{current:city.districtId===searchInfo.city.districtId}" onclick="_hmt.push(['_trackEvent', '二手房城区','click','{$v['districtName']}'])" :key="index" @click="setCity(city)" :href="'/'+fromSource+'/'+getPath(city.districtId, 'city')">{{city.districtName}}</a>
          </dd>
        </dl>
        <dl v-if="getBizcircle.length">
          <dt>商圈</dt>
          <dd style="width:1070px">
            <a :href="'/'+fromSource+'/'+getLimitPath('busines')" class="current">不限</a>
            <a v-for="(busines,index) in getBizcircle" :key="index" :href="'/'+fromSource+'/'+getPath(busines.bizcircleId, 'busines')" :class="{current:busines.bizcircleId===searchInfo.busines.districtId}" onclick="_hmt.push(['_trackEvent', '二手房商圈','click',''])">{{busines.bizcircleName}}</a>
          </dd>
        </dl>
        <dl>
          <dt>居室</dt>
          <dd>
            <a :href="'/'+fromSource+'/'+getLimitPath('room')" :class="{current:!searchInfo.room.districtId}">不限</a>
            <a :href="'/'+fromSource+'/'+getPath(room.districtId, 'room')" v-for="(room,index) in roomData" :key="index" :class="{current:room.districtId===searchInfo.room.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click',''])">{{room.districtName}}</a>
            <!-- <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '一居'])" href="">一居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '二居'])" href="">二居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '三居'])" href="">三居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '四居'])" href="">四居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '五居'])" href="">五居及以上</a> -->
          </dd>
        </dl>
        <dl>
          <dt>售价</dt>
          <dd>
            <a :href="'/'+fromSource+'/'+getLimitPath('price')" :class="{current:!searchInfo.price.districtId}">不限</a>
            <a :href="'/'+fromSource+'/'+getPath(price.districtId, 'price')" v-for="(price,index) in priceData" :key="index" :class="{current:price.districtId===searchInfo.price.districtId}" onclick="_hmt.push(['_trackEvent', '二手房售价','click', '1000万以下'])">{{price.districtName}}</a>
            <div class="price_cot">
              <input type="text" v-model="minPrice" maxlength="5"> -
              <input type="text" v-model="maxPrice"> 万
              <a :href="'/'+fromSource+'/'+getPath(`0p${minPrice}-tp${maxPrice}`, 'price')" @click="addCustom('price')" v-show="minPrice&&maxPrice" class="price_btn">确认</a>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>面积</dt>
          <dd>
            <a :href="'/'+fromSource+'/'+getLimitPath('area')" :class="{current:!searchInfo.area.districtId}">不限</a>
            <a :href="'/'+fromSource+'/'+getPath(area.districtId, 'area')" v-for="(area,index) in areaData" :key="index" :class="{current:area.districtId===searchInfo.area.districtId}" onclick="_hmt.push(['_trackEvent', '二手房面积','click', '100㎡以下'])">{{area.districtName}}</a>
            <div class="price_cot">
              <input type="text" v-model="minArea" maxlength="5"> -
              <input type="text" v-model="maxArea">㎡
              <a :href="'/'+fromSource+'/'+getPath(`au${minArea}-ad${maxArea}`, 'area')" v-show="minArea&&maxArea" class="price_btn">确认</a>
            </div>
            <!-- <a class="area_cot">
              <input type="text" value="" maxlength=5/> -
              <input type="text" value="" maxlength=5/> ㎡
              <input type="button" value="确定" style="display: none;" class="area_btn" />
              <input type="hidden" value="">
            </a> -->
          </dd>
        </dl>
        <dl>
          <dt>产品</dt>
          <dd>
            <a :href="'/'+fromSource+'/'+getLimitPath('product')" :class="{current:!searchInfo.product.districtId}">不限</a>
            <a :href="'/'+fromSource+'/'+getPath(product.districtId, 'product')" v-for="(product,index) in productData" :key="index" :class="{current:product.districtId===searchInfo.product.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click','++'])">{{product.districtName}}</a>
            <!-- <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '高档住宅'])" href="">高档住宅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '叠拼别墅'])" href="">叠拼别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '联排别墅'])" href="">联排别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '独栋别墅'])" href="">独栋别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '双拼别墅'])" href="">双拼别墅</a> -->
          </dd>
        </dl>
        <transition name="slide-fade">
          <div class="otherTerm" v-if="isShow">
            <dl>
              <dt>朝向</dt>
              <dd>
                <a :href="'/'+fromSource+'/'+getLimitPath('toward')" :class="{current:!searchInfo.toward.districtId}">不限</a>
                <a :href="'/'+fromSource+'/'+getPath(toward.districtId, 'toward')" v-for="(toward,index) in towardData" :key="index" :class="{current:toward.districtId===searchInfo.toward.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click','++'])">{{toward.districtName}}</a>
              </dd>
            </dl>
            <dl>
              <dt>用途</dt>
              <dd>
                <a :href="'/'+fromSource+'/'+getLimitPath('purpose')" :class="{current:!searchInfo.purpose.districtId}">不限</a>
                <a :href="'/'+fromSource+'/'+getPath(purpose.districtId, 'purpose')" v-for="(purpose,index) in purposeData" :key="index" :class="{current:purpose.districtId===searchInfo.purpose.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click','++'])">{{purpose.districtName}}</a>
              </dd>
            </dl>
            <dl>
              <dt>装修</dt>
              <dd>
                <a :href="'/'+fromSource+'/'+getLimitPath('decoration')" :class="{current:!searchInfo.decoration.districtId}">不限</a>
                <a :href="'/'+fromSource+'/'+getPath(decoration.districtId, 'decoration')" v-for="(decoration,index) in decorationData" :key="index" :class="{current:decoration.districtId===searchInfo.decoration.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click',''])">{{decoration.districtName}}</a>
              </dd>
            </dl>
            <dl>
              <dt>特色</dt>
              <dd>
                <a :href="'/'+fromSource+'/'+getLimitPath('features')" :class="{current:!searchInfo.features.districtId}">不限</a>
                <!-- :href="'/'+fromSource+'/'+getPath(features.districtId, 'features')" -->
                <a :href="'/'+fromSource+'/'+getPath(features.districtId, 'features')" v-for="(features,index) in featuresData" :key="index" :class="{current:features.districtId===searchInfo.features.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click',''])" class="checkBox">
                  <input type="checkbox" :value="features.districtId" v-model="featuresBind" />{{features.districtName}}
                  <label :class="{filted:inFeatures(features.districtId)}"></label>
                </a>
              </dd>
            </dl>
          </div>
        </transition>
        <!-- <a href="javascript:void(0)" class="moreOther">更多筛选 ∨</a> -->
        <a href="javascript:void(0)" class="moreOther" @click="isShow = !isShow">{{isShow?'更多筛选 ∨':'点击收起 ∧'}}</a>
      </div>
      <div class="selected" v-if="keyword || searchResult.length>0">
        您已选择：
        <div class="choice clearfix">
          <a href="" v-if="keyword">{{keyword}}
                        <i></i>
                    </a>
          <a :href="'/'+fromSource+'/'+getLimitPath(key)" v-if="value && key!=='features'" v-for="(value, key, index) in searchInfo" :key="index">{{value.districtName}}
                        <i></i>
                    </a>
          <a :href="'/'+fromSource+'/'+getLimitPath('features', value.districtId)" v-if="value" v-for="(value, key, index) in searchInfo.features" :key="index">{{value.districtName}}
                        <i></i>
                    </a>
          <a href="/'+fromSource+'" class="clear" style="margin-left: 20px;color: #c2c2c2;">清空条件</a>
        </div>
      </div>
    </div>
    <!-- 找到房源 -->
    <div class="find container clearfix">
      <div>
        <h4>为您找到
                    <!-- {{getHouseList.total}} -->
                    <b></b>套上海豪宅</h4> |
        <p>
          <a :href="getComplex(fromSource,'综合')">综合</a>
          <a :href="getComplex(fromSource,'最新')">最新</a>
          <a :href="getComplex(fromSource,'其他','o')" key="售价">售价
                        <i></i>
                    </a>
          <a :href="getComplex(fromSource,'其他','m')" key="面积">面积
                        <i></i>
                    </a>
        </p>
      </div>
      <!--<a href="javascript:void(0)"><i></i>地图找房</a>-->
    </div>
  </div>
</template>
<script>
import axios from "~/plugins/axios"
import { mapState, mapGetters, mapMutations } from "vuex"
import localData from "../util/localStore"
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
      wordData: "",

      names: [
        "city",
        "busines",
        "price",
        "room",
        "area",
        "features",
        "toward",
        "decoration",
        "product",
        "purpose"
      ],

      // 城区
      cityData: [],
      // 商圈
      businesData: [],
      // 居室
      roomData: [{
        districtId: "h1",
        districtName: "一居"
      },
      {
        districtId: "h2",
        districtName: "二居"
      },
      {
        districtId: "h3",
        districtName: "三居"
      },
      {
        districtId: "h4",
        districtName: "四居"
      },
      {
        districtId: "h5",
        districtName: "五居及以上"
      }
      ],
      // 售价
      priceData: [{
        districtId: "0p0-tp1000",
        districtName: "1000万以下"
      },
      {
        districtId: "0p1000-tp1500",
        districtName: "1000-1500万"
      },
      {
        districtId: "0p1500-tp2000",
        districtName: "1500-2000万"
      },
      {
        districtId: "0p2000-tp3000",
        districtName: "2000-3000万"
      },
      {
        districtId: "0p3000-tp5000",
        districtName: "3000-5000万"
      },
      {
        districtId: "0p5000-tp20000000000",
        districtName: "5000万以上"
      }
      ],
      // 面积
      areaData: [{
        districtId: "au0-ad100",
        districtName: "100㎡以下"
      },
      {
        districtId: "au100-ad140",
        districtName: "100-140㎡"
      },
      {
        districtId: "au140-ad180",
        districtName: "140-180㎡"
      },
      {
        districtId: "au180-ad220",
        districtName: "180-220㎡"
      },
      {
        districtId: "au220-ad280",
        districtName: "220-280㎡"
      },
      {
        districtId: "au280-ad360",
        districtName: "280-360㎡"
      },
      {
        districtId: "au360-ad420",
        districtName: "360-420㎡"
      },
      {
        districtId: "au420-ad500",
        districtName: "420-500㎡"
      },
      {
        districtId: "au500-ad20000000000",
        districtName: "500㎡及以上"
      }
      ],
      // 产品
      productData: [{
        districtId: "cp1",
        districtName: "高档住宅"
      },
      {
        districtId: "cp2",
        districtName: "叠拼别墅"
      },
      {
        districtId: "cp3",
        districtName: "联排别墅"
      },
      {
        districtId: "cp4",
        districtName: "独栋别墅"
      },
      {
        districtId: "cp5",
        districtName: "双拼别墅"
      }
      ],
      // 朝向
      towardData: [{
        districtId: "c1",
        districtName: "东"
      },
      {
        districtId: "c2",
        districtName: "南"
      },
      {
        districtId: "c3",
        districtName: "西"
      },
      {
        districtId: "c4",
        districtName: "北"
      },
      {
        districtId: "c10",
        districtName: "南北"
      }
      ],
      // 用途
      purposeData: [{
        districtId: "y1",
        districtName: "住宅"
      },
      {
        districtId: "y2",
        districtName: "商业"
      },
      {
        districtId: "y3",
        districtName: "写字楼"
      }
      ],
      // 装修
      decorationData: [{
        districtId: "z1",
        districtName: "毛坯"
      },
      {
        districtId: "z2",
        districtName: "简装"
      },
      {
        districtId: "z3",
        districtName: "精装"
      }
      ],
      // 特色
      featuresData: [{
        districtId: "pa1",
        districtName: "满五"
      },
      {
        districtId: "pb1",
        districtName: "满二"
      },
      {
        districtId: "pc1",
        districtName: "全新房"
      },
      {
        districtId: "pd1",
        districtName: "花园"
      },
      {
        districtId: "pe1",
        districtName: "露台"
      },
      {
        districtId: "pf1",
        districtName: "地暖"
      },
      {
        districtId: "pg1",
        districtName: "恒温恒湿"
      },
      {
        districtId: "ph1",
        districtName: "带泳池"
      },
      {
        districtId: "pi1",
        districtName: "明厨明卫"
      },
      {
        districtId: "pj1",
        districtName: "合院"
      },
      {
        districtId: "pk1",
        districtName: "3D看房"
      }
      ]

      // featuresBind: [],
    }
  },
  /* props: ['getDistrict', 'getBizcircle'], */
  props: {
    getDistrict: {
      type: Array,
      default: []
    },
    getBizcircle: {
      type: Array,
      default: []
    },
    fromSource: {
      type: String
    }
  },
  mounted() {
    // this.getCity()
    // console.log('cdeshi word')
    // console.log(this.keyword)
    this.currentWord = this.keyword
  },
  methods: {
    ...mapMutations({
      cityInfo: "secondType/cityInfo",
      businesInfo: "secondType/businesInfo",
      priceInfo: "secondType/priceInfo",
      roomInfo: "secondType/roomInfo",
      areaInfo: "secondType/areaInfo",
      featuresInfo: "secondType/featuresInfo",
      towardInfo: "secondType/towardInfo",
      decorationInfo: "secondType/decorationInfo",
      productInfo: "secondType/productInfo",
      purposeInfo: "secondType/purposeInfo",
      keyWord: "secondType/keyWord",
      setQueryStr: "secondType/setQueryStr"
    }),
    showBusinessArea() {
      // console.log(this.$refs.city.style.display = 'block')
      this.$refs.city.style.display = "block"
    },
    hideBusinessArea() {
      this.$refs.city.style.display = "none"
    },
    addPrams2Store(params, name) {
      let dataOption = localData.getItem(name + "Proper")
      if (params && dataOption) {
        let id = ""
        let result = ""
        if (name === "features") {
          // id = /(p[a-z]1)/ig.exec(params)
          id = params.match(/(p[a-z]1)/gi)

          result = []
          for (let k = 0; k < id.length; k++) {
            result.push(
              dataOption.find(function(item) {
                return item.districtId === id[k]
              })
            )
          }
        } else {
          id =
            name === "city" || name === "busines"
              ? Number.parseInt(params)
              : params
          result = dataOption.find(function(item) {
            if (name === "busines") {
              // console.log(item)
              return item.bizcircleId === id
            } else {
              // console.log('districtId: ' + item.districtId)
              return item.districtId === id
            }
          })
          // 自定义售价

          if (!result) {
            if (name === "price") {
              id = /0p(\d+)-tp(\d+)/gi.exec(params)
              this.minPrice = Number.parseInt(id[1])
              this.maxPrice = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}万`
              }
            }
            if (name === "area") {
              id = /au(\d+)-ad(\d+)/gi.exec(params)
              this.minArea = Number.parseInt(id[1])
              this.maxArea = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}㎡`
              }
            }
          }
        }
        // console.log('售价')
        // console.log(result)
        // if (name === 'busines') {
        //   result = {
        //     districtId: result.bizcircleId,
        //     districtName: result.bizcircleName
        //   }
        // }
        this[name + "Info"](result)
      }
    },
    addCustom(name) {
      let result = { districtId: "", districtName: "" }
      if (name === "price") {
        result.districtId = `0p${this.minPrice}-tp${this.maxPrice}`
        result.districtName = `${this.minPrice}-${this.maxPrice}万`
        this[name + "Info"](result)
      }
      if (name === "area") {
        result.districtId = `au${this.minArea}-ad${this.maxArea}`
        result.districtName = `${this.minArea}-${this.maxArea}㎡`
        this[name + "Info"](result)
      }
    },
    setQuery(query) {
      this.setQueryStr(query)
    },
    inFeatures(id) {
      let _id = this.$route.params.id
      return _id ? _id.indexOf(id) !== -1 : false
    },
    updateKeyWord(val) {
      // console.log(localData.getItem("keyWordProper"))
      // console.log(val)
      let keyWordData = localData.getItem("keyWordProper")
        ? localData.getItem("keyWordProper") : []
      let word = keyWordData.find(function(item) {
        return item === val
      })
      if (!word) {
        keyWordData.unshift(val)
        localData.setItem("keyWordProper", keyWordData)
      }
      // console.log(localData.getItem('keyWordProper'))
      // localData.setItem('keyWordProper', this.features)
    },
    infocus() {
      this.isShowWord = true
      this.wordData = localData.getItem("keyWordProper")
    },
    outfocus() {
      this.isShowWord = !false
    },
    getAssociative(value) {
      // console.log(value)
      // ?cityCode=310000&type=二手房&resblockName=阳
      //  this.$axios.get(`/api/'+fromSource+'/getAssociateResblock.html`, {
      if (value) {
        axios
          .get(`/api/landz-web-house/secondHand/getAssociateResblock`, {
            params: {
              cityCode: 310000,
              type: "二手房",
              resblockName: value
            }
          })
          .then(res => {
            // console.log(res.data.suggestions.data)
            let data = res.data.suggestions.data
            if (data.length > 0) {
              this.isAssociation = true
              let arr = []
              data.forEach(function(item) {
                arr.push(item.resblockName)
              })
              this.associativeData = arr
            } else {
              this.isAssociation = false
            }
            this.$store.commit("secondType/keyWord", value)
          })
      } else {
        this.isAssociation = false
      }
    },
    getCity() {
      axios.get(`/api/landz-web-house/secondHand/getDistrict?cityCode=310000`).then(res => {
        // console.log('search')
        // console.log(res.data)
        this.getDistrict = res.data.result
      })
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
    wd: {
      get() {
        // return this.$store.state.keyword
        // console.log("key word 1")
        return this.keyword
      },
      set(value) {
        // console.log("key word 2")
        this.isShowWord = false
        this.isAssociation = true
        if (value && value !== this.keyword) {
          this.getAssociative(value)
        }
      }
    }
  },
  watch: {
    currentWord: function(val, oldVal) {
      // console.log("watch " + this.isAssociation)
      this.isShowWord = false
      // this.isAssociation = true
      if (val && val !== this.keyword) {
        this.getAssociative(val)
      } else {
        this.isAssociation = false
      }
    }
  }
}
</script>
<style>
@import "../assets/css/secondHandList.css";

</style>
