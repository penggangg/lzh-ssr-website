<template>
  <div @click='searchBlur'>
    <div class="head">
      <!-- 首页和海外豪宅的公共头部 -->
      <headerShou></headerShou>
      <div class="banner">
        <ul class="imgBox clearfix">
          <li></li>
        </ul>
      </div>
      <div class="search wrapper">
        <div class="searchCont">
          <img src="~assets/img/bannerSize.png" class="bannerSize" />
          <div class="search_form" style="position: relative;">
            <div class="genre clearfix">
              <ul class="clearfix">
                <li :class="{lei:searchType==='second'}" @click="searchChange(18,'second')">二手房</li>
                <li :class="{lei:searchType==='one'}" @click="searchChange(88,'one')">新房</li>
                <li :class="{lei:searchType==='rent'}" @click="searchChange(154,'rent')">租房</li>
                <span class="trans" ref="currentTrans"></span>
              </ul>
            </div>
            <div class="searchTerm">
              <input class="search_text" type="text" v-model="searchName" placeholder="请输入楼盘名称/区域" name="text" @focus='historyCotEvent'
                @keyup="autocomplete" />
              <input class="search_btn" type="button" value="搜索" @click='searchJump' />
              <div class="pg_search_pv" style="display:none"></div>
            </div>
            <!-- 搜索历史 -->
            <div class="history_cot" style="position: absolute;width: 96%;" v-show="historyShowCondition">
              <span class="pg_history">
                <i>搜索历史</i>
                <i class="clear_history" style="float: right;color: #009688;cursor: pointer;">清除历史</i>
              </span>
              <ul v-if="showHistory.length">
                <a target="_blank" v-for="(item,index) in showHistory" :href="`/sh-xf/?wd=${item}`">
                  <li class="pg_href">{{item}}</li>
                </a>
              </ul>
            </div>
          </div>
          <!-- 热门搜索 -->
          <p class="second_hot" v-show="searchType==='second'">大家都在搜：
            <a v-for="(item,index) in secondHandHot" :href="`/sh-esf/?wd=${item}`" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '新城国际'])">{{item}}</a>
          </p>
          <p class="one_hot" v-show="searchType==='one'">大家都在搜：
            <a v-for="(item,index) in oneHandHot" :href="`/sh-xf/?wd=${item}`" onclick="_hmt.push(['_trackEvent', '新房热门搜索', 'click', '恒大华府'])">{{item}}</a>
          </p>
          <p class="three_hot" v-show="searchType==='rent'">大家都在搜：
            <a v-for="(item,index) in rentHotHot" :href="`/sh-zl/?wd=${item}`" onclick="_hmt.push(['_trackEvent', '租赁热门搜索', 'click', '新城国际'])">{{item}}</a>
          </p>
          <ul v-if="secondAutocompelateList.length" class="autocompleteBox">
            <li v-for="(item,index) in secondAutocompelateList" :key="index" @click="onSelect(item)">{{item.resblockName}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 服务 -->
    <div class="server wrapper clearfix pg_server1" v-show="serverCondition">
      <dl>
        <dt class="overAll">
          <img src="~assets/img/indexIcon1.png" />
        </dt>
        <dd>
          <span>房源全面</span>别墅/公寓 覆盖全浦东豪宅</dd>
      </dl>
      <dl>
        <dt class="real">
          <img src="~assets/img/indexIcon2.png" />
        </dt>
        <dd>
          <span>真实可信</span>专人审核，真房源100%</dd>
      </dl>
      <dl>
        <dt class="serve">
          <img src="~assets/img/indexIcon3.png" />
        </dt>
        <dd>
          <span>专业服务</span>顾问平均掌握16个楼盘</dd>
      </dl>
      <dl>
        <dt class="highEnd">
          <img src="~assets/img/indexIcon4.png" />
        </dt>
        <dd>
          <span>专注豪宅</span>我们始终坚持 只做豪宅</dd>
      </dl>
    </div>
    <!-- 二手豪宅 -->
    <div class="mansion">
      <img src="~assets/img/bg.jpg">
      <div class="wrapper">
        <h3>
          <img src="~assets/img/two.png">
        </h3>
        <p>真实在售，看房无忧
          <a href="/sh-esf" target="_blank">更多&gt;</a>
        </p>
        <div class="imgShow clearfix">
          <dl v-for="(item,index) in secondHandRecommend" :key="index">
            <a :href="`/sh-esf/${item.housedelId}.html`" target="_blank">
              <dt>
                <img v-lazyload="item.titleImgUrl" :alt="`${item.resblockName}二手豪宅`" :title="`${item.resblockName}二手豪宅`" src="~assets/img/default2.png"
                />
              </dt>
              <dd>
                <p class="clearfix">
                  <span class="name">{{item.resblockName}}</span>
                  <b class="price">{{item.quotedPrice}}万</b>
                </p>
                <p class="clearfix">
                  <span>
                    4室3厅/ 287㎡
                  </span>
                  <b>高档住宅</b>
                </p>
              </dd>
            </a>
          </dl>
        </div>
      </div>
    </div>
    <!-- 一手豪宅 -->
    <div class="mansion">
      <div class="wrapper" style="width:1100px;">
        <h3>
          <img src="~assets/img/one.png">
        </h3>
        <p>精选免佣，信息透明
          <a href="/sh-xf" target="_blank">更多&gt;</a>
        </p>
        <div class="imgShow oneImgShow clearfix">
          <div class="left">
            <dl>
              <a :href="`/sh-xf/lp${projectRecommend[0].resblockId}-${projectRecommend[0].pkid}.html`" target="_blank">
                <dt>
                  <img src="~assets/img/default2.png" v-lazyload="projectRecommend[0].titleImg" :alt="`${projectRecommend[0].resblockName}${projectRecommend[0].houseType}`"
                    :title="`${projectRecommend[0].resblockName}${projectRecommend[0].houseType}`">
                </dt>
                <dd>
                  <p class="clearfix">
                    <span class="name">{{projectRecommend[0].resblockName}}</span>
                    <b class="price">{{projectRecommend[0].unitPriceMin ? projectRecommend[0].unitPriceMin +'元/㎡起' : ''}}</b>
                  </p>
                </dd>
              </a>
            </dl>
          </div>
          <div class="right">
            <dl>
              <a :href="`/sh-xf/lp${projectRecommend[1].resblockId}-${projectRecommend[1].pkid}.html`" target="_blank">
                <dt>
                  <img src="~assets/img/default2.png" v-lazyload="projectRecommend[1].titleImg" :alt="`${projectRecommend[1].resblockName}${projectRecommend[1].houseType}`"
                    :title="`${projectRecommend[1].resblockName}${projectRecommend[1].houseType}`" />
                </dt>
                <dd>
                  <p class="clearfix">
                    <span class="name">{{projectRecommend[1].resblockName}}</span>
                    <b class="price">{{projectRecommend[1].unitPriceMin ? projectRecommend[1].unitPriceMin +'元/㎡起' : ''}}</b>
                  </p>
                </dd>
              </a>
            </dl>
            <dl>
              <a :href="`/sh-xf/lp${projectRecommend[2].resblockId}-${projectRecommend[2].pkid}.html`" target="_blank">
                <dt>
                  <img src="~assets/img/default2.png" v-lazyload="projectRecommend[2].titleImg" :alt="`${projectRecommend[2].resblockName}${projectRecommend[2].houseType}`"
                    :title="`${projectRecommend[2].resblockName}${projectRecommend[2].houseType}`" />
                </dt>
                <dd>
                  <p class="clearfix">
                    <span class="name">{{projectRecommend[2].resblockName}}</span>
                    <b class="price">{{projectRecommend[2].unitPriceMin ? projectRecommend[2].unitPriceMin +'元/㎡起' : ''}}</b>
                  </p>
                </dd>
              </a>
            </dl>

          </div>
        </div>
      </div>
    </div>
    <!-- 豪宅顾问 -->
    <div class="mansion adviserBox">
      <div class="wrapper" style="width:1100px;">
        <h3>
          <img src="~assets/img/three.png">
        </h3>
        <p>服务为本 追求卓越</p>
        <div class="adviser clearfix adviser_bj">
          <dl v-for="(item,index) in consultantInfo" :key="index">
            <dt>
              <a href="javascript:void(0);" style="cursor: default;">
                <img class="lazy_img" src="~assets/img/toux.jpg" v-lazyload='item.userImgUrl'>
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);" style="cursor: default;">{{item.userName}}
                  <!--<b>带看王</b>-->
                </a>
                <p>
                  <label>服务商圈：</label>
                  <strong>{{item.bizcircleName}}</strong>
                </p>
                <p>
                  <label>熟悉楼盘：</label>
                  <strong>{{item.resblockName}}</strong>
                </p>
                <span>
                  {{item.bigCode}} 转 {{item.smallCode}}
                  <em class="footer_sao_index" @click="toggleQrcode(index)">扫码拨号</em>
                  <div class="triangle" style="display:block"></div>
                  <span v-show="item.show" class="four_ewm">
                    <!-- <vue-qr :logoSrc="logoSrc" :logoScale="0.2" :text="'http://www.lizihang.com/static/phone/index.html?pkid='+item.pkid" :size="80" :margin="0" >
                        </vue-qr> -->
                  </span>
                </span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!-- 服务 -->
    <div class="server wrapper clearfix pg_server2" style="margin-bottom: 80px;" v-show="!serverCondition">
      <dl>
        <dt class="overAll">
          <img src="~assets/img/indexIcon1.png" />
        </dt>
        <dd>
          <span>房源全面</span>别墅/公寓 覆盖全浦东豪宅</dd>
      </dl>
      <dl>
        <dt class="real">
          <img src="~assets/img/indexIcon2.png" />
        </dt>
        <dd>
          <span>真实可信</span>专人审核，真房源100%</dd>
      </dl>
      <dl>
        <dt class="serve">
          <img src="~assets/img/indexIcon3.png" />
        </dt>
        <dd>
          <span>专业服务</span>顾问平均掌握16个楼盘</dd>
      </dl>
      <dl>
        <dt class="highEnd">
          <img src="~assets/img/indexIcon4.png" />
        </dt>
        <dd>
          <span>专注豪宅</span>我们始终坚持 只做豪宅</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import headerShou from '~/components/headerShou'
import axios from '~/plugins/axios'
import localStore from '../util/localStore'
export default {
  data() {
    return {
      consultantInfo: [], // 写死的 定期更换的首页顾问信息
      logoSrc: require('../static/ewmMiddle.png'), // 二维码中间的logo
      serverCondition: false,
      searchType: 'second', // one second rent
      // 各个频道的热搜词
      oneHandHot: [],
      secondHandHot: [],
      rentHotHot: [],
      searchName: '',
      // 各个频道的搜索历史记录
      oneHistory: [],
      secondHistory: [],
      rentHistory: [],
      // 当前显示的历史内容的容器
      showHistory: [],
      historyShowCondition: false,
      secondAutocompelateList: []
    }
  },
  async asyncData({
    params,
    route,
    error,
    store,
    env
  }) {
    // url 的判断
    store.commit('headerType/urlInfo', route.path)
    return axios.get(`${env.url}/landz-web-project/home/getHotRecommend?cityCode=110000&userId=BJG180105116384`)
      .then((res) => {
        return {
          projectRecommend: res.data.result.projectRecommend, // 新房推荐
          secondHandRecommend: res.data.result.secondHandRecommend // 二手房推荐
        }
      })
  },
  components: {
    headerShou
  },
  created() {
    // 四个顾问的信息
    this.consultantInfo = [
      {
        userImgUrl: 'http://image.lizihang.com/group1/M00/0B/CD/rBAOKFlKEqWAaQ7iAAuuUInSBvg665.jpg.300x400.jpg',
        userName: '朱萍',
        bizcircleName: '东直门商圈/中央别墅区',
        resblockName: '格拉斯小镇/中粮瑞府',
        bigCode: '4008196609',
        smallCode: '99720',
        pkid: '142004',
        show: false
      },
      {
        userImgUrl: 'http://image.lizihang.com/group1/M00/0B/CD/rBAOKFlKEqWAaQ7iAAuuUInSBvg665.jpg.300x400.jpg',
        userName: '朱萍',
        bizcircleName: '东直门商圈/中央别墅区',
        resblockName: '格拉斯小镇/中粮瑞府',
        bigCode: '4008196609',
        smallCode: '99720',
        pkid: '142006',
        show: false
      },
      {
        userImgUrl: 'http://image.lizihang.com/group1/M00/0B/CD/rBAOKFlKEqWAaQ7iAAuuUInSBvg665.jpg.300x400.jpg',
        userName: '朱萍',
        bizcircleName: '东直门商圈/中央别墅区',
        resblockName: '格拉斯小镇/中粮瑞府',
        bigCode: '4008196609',
        smallCode: '99720',
        pkid: '142008',
        show: false
      },
      {
        userImgUrl: 'http://image.lizihang.com/group1/M00/0B/CD/rBAOKFlKEqWAaQ7iAAuuUInSBvg665.jpg.300x400.jpg',
        userName: '朱萍',
        bizcircleName: '东直门商圈/中央别墅区',
        resblockName: '格拉斯小镇/中粮瑞府',
        bigCode: '4008196609',
        smallCode: '99720',
        pkid: '142010',
        show: false
      }
    ]
    // 热搜词
    this.oneHandHot = ['融创滨江壹号', '露香园', '景瑞尚滨江', '汇京国际广场', '朗诗新西郊']
    this.secondHandHot = ['世茂滨江花园', '财富海景花园', '浦东星河湾', '仁恒河滨城', '汤臣湖庭']
    this.rentHotHot = ['世茂滨江花园', '盛大金磐', '财富海景花园', '仁恒河滨城', '汤臣高尔夫']
  },
  mounted() {
    // 判断是否首次进入
    if (localStore.getItem('first')) {
      this.serverCondition = false
    } else {
      this.serverCondition = true
      localStore.setItem('first', 1)
    }
    // 获取历史记录
    this.oneHistory = localStore.getItem('one') || []
    this.secondHistory = localStore.getItem('second') || []
    this.rentHistory = localStore.getItem('rent') || []
    this.showHistory = this.secondHistory
    this.lazyInit()
  },
  methods: {
    // 首页二维码的切换
    toggleQrcode: function (index) {
      this.consultantInfo[index].show = !this.consultantInfo[index].show
    },
    // 搜索栏目的切换
    searchChange: function (position, searchType) {
      this.$refs.currentTrans.style.left = position + 'px'
      this.searchType = searchType
      switch (this.searchType) {
        case 'one':
          this.showHistory = this.oneHistory
          break
        case 'second':
          this.showHistory = this.secondHistory
          break
        case 'rent':
          this.showHistory = this.rentHistory
          break
      }
      this.historyShowCondition = false
    },
    // 点击搜索进行页面跳转
    searchJump: function () {
      // 当 searchName 为空的时候(去除首尾空格) 根据  searchType 跳转到 /sh-xf /sh-esf /sh-zl 否则拼上wd?=name
      let searchName = this.searchName.replace(/\s+/g, '')
      if (!searchName) {
        switch (this.searchType) {
          case 'one':
            window.location.href = '/sh-xf'
            break
          case 'second':
            window.location.href = '/sh-esf'
            break
          case 'rent':
            window.location.href = '/sh-zl'
            break
        }
      } else {
        switch (this.searchType) {
          case 'one':
            this.oneHistory.unshift(searchName)
            this.oneHistory = Array.from(new Set(this.oneHistory))
            if (this.oneHistory.length > 5) {
              this.oneHistory.pop()
            }
            localStore.setItem(this.searchType, this.oneHistory)
            window.location.href = `/sh-xf?wd=${searchName}`
            break
          case 'second':
            this.secondHistory.unshift(searchName)
            this.secondHistory = Array.from(new Set(this.secondHistory))
            if (this.secondHistory.length > 5) {
              this.secondHistory.pop()
            }
            localStore.setItem(this.searchType, this.secondHistory)
            window.location.href = `/sh-esf?wd=${searchName}`
            break
          case 'rent':
            this.rentHistory.unshift(searchName)
            this.rentHistory = Array.from(new Set(this.rentHistory))
            if (this.rentHistory.length > 5) {
              this.rentHistory.pop()
            }
            localStore.setItem(this.searchType, this.rentHistory)
            window.location.href = `/sh-zl?wd=${searchName}`
            break
        }
      }
    },
    // 控制搜索历史的显示隐藏
    historyCotEvent: function () {
      if (this.showHistory.length) {
        this.historyShowCondition = true
      } else {
        this.historyShowCondition = false
      }
      if (this.searchName) {
        this.autocomplete()
      }
    },
    // 自动联想
    autocomplete: function () {
      if (this.searchName) {
        axios.get('/api/landz-web-house/secondHand/getAssociateResblock?cityCode=310000&resblockName=' + this.searchName)
          .then((res) => {
            if (res.status === 200) {
              this.secondAutocompelateList = res.data.suggestions.data
              this.historyShowCondition = false
            }
          })
      } else {
        this.secondAutocompelateList = []
      }
    },
    // 联想内容点击
    onSelect: function (item) {
      let src = ''
      switch (this.searchType) {
        case 'one':
          src = '/sh-xf/?wd=' + item.resblockName
          this.oneHistory.unshift(item.resblockName)
          this.oneHistory = Array.from(new Set(this.oneHistory))
          if (this.oneHistory.length > 5) {
            this.oneHistory.pop()
          }
          localStore.setItem(this.searchType, this.oneHistory)
          window.open(src, '_self')
          break
        case 'second':
          src = '/sh-esf/?wd=' + item.resblockName
          this.secondHistory.unshift(item.resblockName)
          this.secondHistory = Array.from(new Set(this.secondHistory))
          if (this.secondHistory.length > 5) {
            this.secondHistory.pop()
          }
          localStore.setItem(this.searchType, this.secondHistory)
          window.open(src, '_self')
          break
        case 'rent':
          src = '/sh-zl/?wd=' + item.resblockName
          this.rentHistory.unshift(item.resblockName)
          this.rentHistory = Array.from(new Set(this.rentHistory))
          if (this.rentHistory.length > 5) {
            this.rentHistory.pop()
          }
          localStore.setItem(this.searchType, this.rentHistory)
          window.open(src, '_self')
          break
      }
    },
    // 模拟搜索框的失去焦点
    searchBlur: function (e) {
      if (e.target.className === 'pg_href' || e.target.className === 'clear_history' || e.target.className === 'pg_history' || e.target.className === 'search_text') {

      } else {
        this.historyShowCondition = false
        this.secondAutocompelateList = []
      }
    }

  },
  // watch: {
  //   searchName: function () {
  //     this.autocomplete()
  //     console.log(this.secondAutocompelateList)
  //   }
  // },

  render(h) {
    console.log(h)
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
<style>
  @import '../assets/css/index.css';
  .autocompleteBox {
    width: 600px;
    max-height: 300px;
    overflow: scroll;
    position: absolute;
    top: 209px;
  }

  .autocompleteBox li {
    width: 580px;
    background: #fff;
    font-size: 16px;
    padding: 10px 0 10px 10px;
    cursor: pointer;
  }

  .autocompleteBox li:hover {
    background: #ccc;
  }
</style>
