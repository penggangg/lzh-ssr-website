<template>
<div class="noResult">
  <h6>没有找到您要的内容，您可换个条件试试</h6>
  <p>手机号：
    <span>
      <input placeholder="请输入您的手机号" type="text" v-model="phone">
    </span>
  </p>
  <p style="text-align:center;color:#BABABA">
    我们承诺：保障客户隐私安全，绝不泄露客户任何信息！
  </p>
  <input value="一键省心找房" class="findH" type="button" @click="submit">
  <Exdialog :visible.sync="dialog.tipsMsgSuc" type='alert' content="预约成功" title="信息" :buttonClear=false @sure="close">
  </Exdialog>
  <Exdialog :visible.sync="dialog.tipsMsgErr" type='alert'  content="请输入电话" title="信息" :buttonClear=false @sure="close">
  </Exdialog>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import Exdialog from '~/components/exdialog'
export default {
  data () {
    return {
      phone: '',
      dialog: {
        tipsMsgErr: false,
        tipsMsgSuc: false
      }
    }
  },
  methods: {
    submit () {
      console.log(this.$store.state.headerType.ctlInfo, this.$store.state.headerType.channel, 111)
      if (this.phone) {
        let that = this
        axios.post('/api/landz-web-project/requirement/direct-find-house', {
          cityCode: 310000,
          userId: 'BJG180425113560',
          site: '400100000001',
          sourcePage: '400200000003',
          channel: this.$store.state.headerType.channel + '',
          phone: this.phone,
          requireType: '400400000005'
        })
          .then(function (response) {
            console.log(response)
            that.dialog.tipsMsgSuc = true
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.dialog.tipsMsgErr = true
      }
    },
    close() {
      this.dialog.tipsMsgErr = false
      this.dialog.tipsMsgSuc = false
    }
  },
  // var sourcePage='400200000001';//1 列表，首页  2 详情 3 搜索无结果
  // var channel='400300000001';//1 首页 2 一手 3 二手 4 租房 5 四合院
  created () {
    // console.log(this.$store.state.todos.pgtest)
  },
  components: {
    Exdialog
  }
}
</script>
<style>
p.layer-content{
  margin-bottom:0px !important;
}
</style>
<style scoped>
.noFindH .noResult p input[type=text] {
    width: 266px;
    height: 45px;
    line-height: 45px;
    border: none;
    text-indent: 20px;
    font-size: 14px;
    background: 0 0;
}
input.findH:hover{
  background:#330033;
}
.tips{
  padding:20px;
  text-align:right;
}
.tips p{
  text-align:left;
}
.tips button{
  width:56px;
  height: 28px;
  line-height: 28px;
  border:none;
  border-radius: 2px;
  background-color: #2e8ded;
  color:#fff;
  text-align:center;
}
</style>


