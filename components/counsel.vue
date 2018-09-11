<template>
  <div class="decscri container seeBuild" v-if="result.tLeadShowingPageList.list.length != 0"
       id="seeBuild_view">
    <h4 class="clearfix index_6">带看顾问
      <p>客户看房
        <i>{{result.lookCounts}}</i>次</p>
    </h4>
    <div class="seeRec">
      <div v-for="(item,index) in result.tLeadShowingPageList.list"
           :key="item.counselorId">
        <span class="circle">
          <b v-if="index != result.tLeadShowingPageList.list.length-1"></b>
        </span>
        <ul class="clearfix">
          <li>{{item.leadLookTime}}</li>
          <li> <img class="lazy_img"
                 :src="item.counselorHeadPortrait"
                 :data-src="item.counselorHeadPortrait"
                 onerror="javascript:this.src='../../assets/img/toux.jpg'"> </li>
          <li>{{item.counselorName}}</li>
          <li>个人总带看{{item.leadLookCount}}次</li>
          <li class="width_265">
            <!-- <b></b> -->
            <strong>{{item.bigCode}}</strong> 转
            <strong>{{item.extCode}}</strong>
            <!-- <span class='four_sao' pkid='55113'>扫码拨号</span> -->
            <div class="triangle"></div>
            <span class="gunwen_ewm">
              <canvas width="80"
                      height="80"></canvas>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-box"
         id="secondPagation">
      <div class="layui-box layui-laypage layui-laypage-default"
           id="layui-laypage-0">
        <a v-if="result.tLeadShowingPageList.pageNum!=1"
           href="javascript:;"
           class="layui-laypage-next"
           @click="toPage(+result.tLeadShowingPageList.pageNum-1)"
           :data-page="+result.tLeadShowingPageList.pageNum-1">上一页</a>
        <template v-for="(item,index) in result.tLeadShowingPageList.navigatepageNums">
          <a :key="index"
            @click="toPage(item)"
             v-if="item != result.tLeadShowingPageList.pageNum"
             href="javascript:;"
             :data-page="item">{{item}}</a>
          <span v-else
                :key="index"
                class="layui-laypage-curr">
            <em class="layui-laypage-em"></em>
            <em>{{item}}</em>
          </span>
        </template>
        <a v-if="result.tLeadShowingPageList.pageNum!=result.tLeadShowingPageList.pages"
           href="javascript:;"
           @click="toPage(+result.tLeadShowingPageList.pageNum+1)"
           class="layui-laypage-next"
           :data-page="+result.tLeadShowingPageList.pageNum+1">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      currentPage: 1,
      result: {
        tLeadShowingPageList: {
          list: []
        }
      }
    }
  },
  props: {
    option: {},
    channel: ''
  },
  mounted() {
    this.getCounselList()
  },
  methods: {
    toPage(e) {
      this.currentPage = e
      this.getCounselList()
    },
    getCounselList() {
      let that = this
      let params = {}
      if (this.channel === '400300000002') {
        params = {
          resblockId: that.option.params.resblockId,
          site: that.option.params.site,
          currentPage: that.currentPage
        }
      } else if (this.channel === '400300000003') {
        params = {
          channel: that.channel,
          housedelId: that.option.params.resblockId,
          site: that.option.params.site,
          currentPage: that.currentPage
        }
      }
      axios.get(that.option.url, {
        params: params
      }).then((res) => {
        that.result = res.data.result
      })
    }
  },
  watch: {
    option() {
      this.getCounselList()
    }
  }
}
</script>

<style>
/*房源描述*/

.decscri {
  padding: 30px 0;
}

.decscri h4 {
  font-size: 18px;
  color: #330033;
  margin-bottom: 30px;
  font-family: "微软雅黑";
  font-weight: 700
}

.decscri h4 b.borderIcon {
  display: inline-block;
  width: 4px;
  height: 20px;
  background: #330033;
  margin-top: 4px;
  margin-right: 10px;
  vertical-align: top;
}

.decscri .infoCont dl {
  margin-bottom: 18px;
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.decscri .infoCont dl dt {
  display: inline-block;
  width: 32px;
  vertical-align: middle;
  margin-right: 14px;
}

.decscri .infoCont dl dt img {
  width: 100%;
  height: 32px;
}

.decscri .infoCont dl dd {
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: flex-start;
}

.decscri .infoCont dl dd span,
.decscri .infoCont dl dd b {
  display: inline-block;
  width: 900px;
  font-size: 14px;
}

.decscri .infoCont dl dd span {
  font-size: 14px;
  width: 56px;
  margin-right: 20px;
  color: #333;
  font-weight: bold;
}

.decscri .infoCont .more {
  width: 76px;
  margin: 0 auto;
  cursor: pointer;
}


/*户型信息*/


/* .buildNews{background:#f5f5f6;} */

.buildNews .decscri h4 span {
  display: inline-block;
  font-size: 14px;
  margin-left: 5px;
}

.buildNews .decscri h4 span i {
  color: #fe0019;
}
/*看房记录*/

.seeBuild h4 p {
  /* float: right; */
  display: inline-block;
  margin-left: 40px;
  font-size: 14px;
  color: #333;
}

.seeBuild h4 p i {
  color: #fe0019;
  margin: 0 4px;
  font-weight: bold;
}
.seeRec>div span.circle {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 12px;
  height: 12px;
  margin: 0px 34px 0 20px;
  background: url('~assets/img/timeline.png') no-repeat;
}
.seeRec>div span.circle b {
  position: absolute;
  top: 17px;
  left: 5px;
  height: 111px;
  border-left: 2px solid #DDD;
  vertical-align: middle;
}

.seeRec>div ul {
  display: inline-block;
  width: 1108px;
  padding: 27px 0;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

.seeRec>div ul li {
  display: inline-block;
  width: 208px;
  margin-right: -3px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.seeRec>div ul li.width_265 {
  width: 265px;
  position: relative;
  overflow: inherit;
  font-weight: bold;
}

.seeRec>div ul li.width_265 strong {
  font-weight: 600;
}

.seeRec>div ul li.width_265 .four_sao {
  display: inline-block;
  vertical-align: top;
  margin-top: 4px;
  font-size: 12px;
  border: 1px solid red;
  border-radius: 14px;
  padding: 1px 6px;
}

.seeRec>div ul li img {
  display: block;
  width: 60px;
  height: 80px;
  border-radius: 100%;
}

.seeRec>div ul li:last-child {
  color: #fe0019;
  font-size: 18px;
}

.seeRec>div ul li b {
  display: inline-block;
  width: 22px;
  height: 20px;
  margin-right: 14px;
  background: url(~assets/img/icon.png) no-repeat no-repeat 0px -76px;
  vertical-align: middle;
}

.seeBuild .page-box {
  padding-top: 30px;
  text-align: right;
}
</style>
