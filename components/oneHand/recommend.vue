<template>
  <div id="slider"
       class="bar-slide"
       style="position: absolute; top: 720px;">
    <div class="slidesell">
      <div class="title">新房免佣金，畅享多重服务</div>
            <div class="cus" v-if="result.length==1&&result[0].recommendPosition=='400700000003'">
                <div>
                    <img :src="result[0].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'" />
                </div>
                <div class="right">
                    <span>{{result[0].counselorName}}
                        <b>{{result[0].userLevel}}</b>
                    </span>
                    <p>我带看该项目多次，清楚项目特色</p>
                    <span>
                        <i></i>{{result[0].counselorMobile}}</span>
                </div>
            </div>
            <div class="cus"  v-if="result.length==2&&result[0].recommendPosition=='400700000002'">
                <div>
                    <img :src="result[0].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'"
                    />
                </div>
                <div class="right">
                    <span>{{result[0].counselorName}}
                        <b>{{result[0].userLevel}}</b>
                    </span>
                    <p>我在本司带看该项目最多，为您清晰介绍项目</p>
                    <span>
                      {{result[0].bigCode}}转{{result[0].extCode}}
                    </span>
                </div>
            </div>
            <div class="cus" v-if="result.length==2&&result[1].recommendPosition=='400700000002'">
                <div>
                    <img :src="result[1].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'"
                    />
                </div>
                <div class="right">
                    <span>{{result[1].counselorName}}
                        <b>{{result[1].userLevel}}</b>
                    </span>
                    <p>我在本司带看该项目最多，为您清晰介绍项目</p>
                    <span>
                      {{result[1].bigCode}}转{{result[1].extCode}}
                    </span>
                </div>
            </div>
            <div class="cus" v-if="result.length==2&&result[0].recommendPosition=='400700000003'">
                <div>
                    <img :src="result[0].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'"
                    />
                </div>
                <div class="right">
                    <span>{{result[0].counselorName}}
                        <b>{{result[0].userLevel}}</b>
                    </span>
                    <p>我带看该项目多次，清楚项目特色</p>
                    <span>
                        {{result[0].bigCode}}转{{result[0].extCode}}
                    </span>
                </div>

            </div>


            <div class="cus" v-if="result.length==2&&result[1].recommendPosition=='400700000003'">
                <div>
                    <img :src="result[1].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'"
                    />
                </div>
                <div class="right">
                    <span>{{result[1].counselorName}}
                        <b>{{result[1].userLevel}}</b>
                    </span>
                    <p>我带看该项目多次，清楚项目特色</p>
                    <span>
                      {{result[1].bigCode}}转{{result[1].extCode}}
                    </span>
                    <span class="four_ewm" pkid='result[1].pkid'>
                        <div class="footer_triangle"></div>
                    </span>
                </div>

            </div>

            <div class="cus" v-if="result.length==1&&result[0].recommendPosition=='400700000002'">
                <div>
                    <img :src="result[0].counselorHeadPortrait" onerror="javascript:this.src='/static/img/toux.jpg'" />
                </div>
                <div class="right">
                    <span href="javascript:void(0);" style="cursor: default;">{{result[0].counselorName}}
                        <b>{{result[0].userLevel}}</b>
                    </span>
                    <p style="visibility:hidden">我在本司带看该项目最多，为您清晰介绍项目</p>
                    <span>
                        <i></i>{{result[0].counselorMobile}}</span>
                </div>

            </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data () {
    return {
      result: []
    }
  },
  props: {
    resblockInfo: {}
  },
  mounted () {
    console.log(this.resblockInfo)
    let that = this
    axios.get(`/api/landz-web-project/tLeadShowing/getRecommendedConsultantList?resblockId=${this.resblockInfo.resblockId}&site=400100000001`).then((res) => {
      that.result = res.data.result
    })
  }
}
</script>

<style>

</style>
