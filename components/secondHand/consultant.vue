<template>
  <div v-if="getConsultantList.length!=0">
    <span :class="conIcon"
          @click="showOut"
          v-if="conIconShow">
      <img src="../../assets/img/consult2.png" />
    </span>
    <div :class="consult">
      <div class="container clearfix">
        <b class="close"
           @click="close()">×</b>
        <div class="cus"
             v-if="getConsultantList[0]&&getConsultantList[0].recommendPosition=='400700000002'">
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img :src="getConsultantList[0].counselorHeadPortrait"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">{{getConsultantList[0].counselorName}}</a>
                <p>我是本房的日常维护人，对房源情况很熟悉</p>
                <span>
                  {{getConsultantList[0].bigCode}} 转 {{getConsultantList[0].extCode}}
                  <b class="footer_sao">扫码拨号</b>
                </span>
                <span class='four_ewm'
                      :pkid='getConsultantList[0].pkid'>
                  <div class="footer_triangle"></div>
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="cus"
             v-else-if="getConsultantList[1]&&getConsultantList[1].recommendPosition=='400700000002'">
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img :src="getConsultantList[1].counselorHeadPortrait"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">{{getConsultantList[1].counselorName}}</a>
                <p>我是本房的日常维护人，对房源情况很熟悉</p>
                <span>
                  {{getConsultantList[1].bigCode}} 转 {{getConsultantList[1].extCode}}
                  <b class="footer_sao">扫码拨号</b>
                </span>
                <span class='four_ewm'
                      :pkid='getConsultantList[1].pkid'>
                  <div class="footer_triangle"></div>
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="cus"
             v-else-if="getConsultantList[2]&&getConsultantList[2].recommendPosition=='400700000002'">
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img :src="getConsultantList[2].counselorHeadPortrait"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">{{getConsultantList[2].counselorName}}</a>
                <p>我是本房的日常维护人，对房源情况很熟悉</p>
                <span>
                  {{getConsultantList[2].bigCode}} 转 {{getConsultantList[2].extCode}}
                  <b class="footer_sao">扫码拨号</b>
                </span>
                <span class='four_ewm'
                      :pkid='getConsultantList[2].pkid'>
                  <div class="footer_triangle"></div>
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="cus"
             v-else>
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img src="../../assets/img/toux.jpg"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">--</a>
                <p>我是本房的日常维护人，对房源情况很熟悉</p>
                <span>
                  <i></i>
                </span>
              </div>
            </dd>
          </dl>
        </div>

        <div class="cus"
             v-if="getConsultantList[0]&&getConsultantList[0].recommendPosition=='400700000003'">
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img :src="getConsultantList[0].counselorHeadPortrait"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">{{getConsultantList[0].counselorName}}</a>
                <p>我带客户看房多次，明晰客户的看房评价</p>
                <span>
                  {{getConsultantList[0].bigCode}} 转 {{getConsultantList[0].extCode}}
                  <b class="footer_sao">扫码拨号</b>
                </span>
                <span class='four_ewm'
                      :pkid='getConsultantList[0].pkid'>
                  <div class="footer_triangle"></div>
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="cus"
             v-else-if="getConsultantList[1]&&getConsultantList[1].recommendPosition=='400700000003'">
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img :src="getConsultantList[1].counselorHeadPortrait"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">{{getConsultantList[1].counselorName}}</a>
                <p>我带客户看房多次，明晰客户的看房评价</p>
                <span>
                  {{getConsultantList[1].bigCode}} 转 {{getConsultantList[1].extCode}}
                  <b class="footer_sao">扫码拨号</b>
                </span>
                <span class='four_ewm'
                      :pkid='getConsultantList[1].pkid'>
                  <div class="footer_triangle"></div>
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="cus"
             v-else-if="getConsultantList[2]&&getConsultantList[2].recommendPosition=='400700000003'">
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img :src="getConsultantList[2].counselorHeadPortrait"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">{{getConsultantList[2].counselorName}}</a>
                <p>我带客户看房多次，明晰客户的看房评价</p>
                <span>
                  {{getConsultantList[2].bigCode}} 转 {{getConsultantList[2].extCode}}
                  <b class="footer_sao">扫码拨号</b>
                </span>
                <span class='four_ewm'
                      :pkid='getConsultantList[2].pkid'>
                  <div class="footer_triangle"></div>
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="cus"
             v-else>
          <dl class="clearfix">
            <dt>
              <a href="javascript:void(0);"
                 style="cursor: default;">
                <img src="../../assets/img/toux.jpg"
                     onerror="javascript:this.src='../../assets/img/toux.jpg'" />
              </a>
            </dt>
            <dd>
              <div>
                <a href="javascript:void(0);"
                   style="cursor: default;">--</a>
                <p>我带客户看房多次，明晰客户的看房评价</p>
                <span>
                  <i></i>
                </span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conIconShow: true,
      consult: 'consult hideAnima',
      conIcon: 'conIcon',
      consult_flag: 1
    }
  },
  props: {
    getConsultantList: {
      type: Array,
      default: []
    }
  },
  methods: {
    showOut() {
      this.conIconShow = false
      this.consult = 'consult showAnima'
    },
    close() {
      this.consult = 'consult hideAnima'
      this.conIcon = 'conIcon showBtnL'
      this.conIconShow = true
      this.consult_flag = 0
    },
    onScroll() {
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolled > 700 && this.consult_flag) {
        this.conIconShow = false
        this.consult = 'consult showAnima'
      } else if (this.consult === 'consult showAnima') {
        this.consult = 'consult hideAnima'
        this.conIcon = 'conIcon showBtnL'
        this.conIconShow = true
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
    })
    // let that = this
    // window.addEventListener("scroll", function (e) {
    //   var t = document.documentElement.scrollTop || document.body.scrollTop
    //   if (t > 700) {
    //     if (that.consult_flag) {
    //       that.conIconShow = false
    //       that.consult = 'consult showAnima'
    //     }
    //   } else {
    //     if (that.consult == 'consult showAnima') {
    //       that.consult = 'consult hideAnima'
    //       that.conIcon = 'conIcon showBtnL'
    //       that.conIconShow = true
    //     }
    //   }
    // })
  }
}
</script>

<style scoped>
.decscri h4 {
    font-size: 18px;
    color: #303;
    margin-bottom: 30px;
    font-weight: 700;
}
</style>
