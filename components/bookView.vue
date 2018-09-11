<template>
  <div>
    <div class="roomCont">
      <h5>输入手机号，豪宅顾问会
        <br>和您确认看房时间和行程安排：</h5>
      <input type="text" placeholder="请输入手机号" v-model="phone" class="txt">
      <input type="button" value="我要看房" class="btn" @click=submit>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  data () {
    return {
      phone: '',
      msg: ''
    }
  },
  methods: {
    submit () {
      axios.post('/api/landz-web-project/requirement/direct-find-house', {
        cityCode: 310000,
        userId: '',
        site: 400100000001,
        channel: 400300000002,
        sourcePage: 400200000002,
        phone: this.phone,
        requireType: 400400000006
      })
        .then((res) => {
          console.log(res.data.code)
          this.$emit('hidebookView')
          this.$emit('showMsg')
        })
    }
  },
  // var sourcePage='400200000001';//1 列表，首页  2 详情 3 搜索无结果
  // var channel='400300000001';//1 首页 2 一手 3 二手 4 租房 5 四合院
  created () {
    console.log(this.$store.state.todos.pgtest)
  }
}
</script>
<style scoped>
  .roomCont{
    padding: 0;
    text-align: center;
  }
  .roomCont h5 {
    font-size: 18px;
    font-family: "微软雅黑";
  }
  .roomCont>input {
    display: block;
    width: 300px;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    margin: 20px auto 0;
  }

  .roomCont>input.txt {
    background: #f3f3f3;
    text-indent: 16px;
  }

  .roomCont>input.btn {
    background: #330033;
    color: #fff;
  }
</style>

