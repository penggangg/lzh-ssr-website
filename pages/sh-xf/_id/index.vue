<template>
  <div>
    <oneDetail v-if="!listShow" :listShow="listShow" :resblockInfo="resblockInfo" :resblockDynamicList="resblockDynamicList"
      :getResblockPictureList="getResblockPictureList" :resblockPictureVoList="resblockPictureVoList" :districtId="districtId"
      :bizcircleId="bizcircleId" :resblockId="resblockId" :prjInfoId="prjInfoId"></oneDetail>
    <oneList v-if="listShow"></oneList>
  </div>
</template>
<script>
import oneList from "~/components/oneHand/oneList.vue"
import oneDetail from "~/components/oneHand/oneDetail.vue"
import axios from '~/plugins/axios'
export default {
  data() {
    return {}
  },
  async asyncData({
    params,
    error,
    store,
    route,
    env
  }) {
    // 控制 导航的type
    store.commit('headerType/urlInfo', route.path)
    let listShow = true // 详情 列表页的开关
    listShow = !params.id.includes('html')
    // 详情页面的接口
    let _data = params.id.split('-')
    let [resblockId, prjInfoId] = [_data[0].replace('lp', ''), _data[1].replace('.html', '')]
    let data = {
      cityCode: '310000',
      prjInfoId: prjInfoId,
      resblockId: resblockId,
      userId: '',
      source: 400100000001
    }
    let [resblockInfo, getResblockPictureList] = await Promise.all([
      // 楼盘基本信息
      axios.post(`${env.url}/landz-web-project/resblockInfo/getResblockDetails`, data),
      // 楼盘相册的图片
      axios.post(`${env.url}/landz-web-project/resblockInfo/getResblockPictureList`, {
        cityCode: '310000',
        prjInfoId: prjInfoId,
        resblockId: resblockId
      })
    ]).catch(err => {
      error({
        statusCode: 400,
        message: err
      })
    })
    // 楼盘相册的处理
    let resblockPictureVoList = []
    let [fileType1, fileType2, fileType3, fileType4] = [0, 0, 0, 0]
    for (const item of getResblockPictureList.data.result.resblockPictureVoList) {
      if (item.fileType === '1' && !fileType1) {
        fileType1 = 1
        resblockPictureVoList.push(item)
      } else if (item.fileType === '2' && !fileType2) {
        fileType2 = 1
        resblockPictureVoList.push(item)
      } else if (item.fileType === '3' && !fileType3) {
        fileType3 = 1
        resblockPictureVoList.push(item)
      } else if (item.fileType === '4' && !fileType4) {
        fileType4 = 1
        resblockPictureVoList.push(item)
      }
    }
    return {
      resblockInfo: resblockInfo.data.result.resblockInfo,
      resblockDynamicList: resblockInfo.data.result.resblockDynamicList,
      getResblockPictureList: getResblockPictureList.data.result,
      resblockPictureVoList: resblockPictureVoList,
      // 新房推荐
      // projectRecommendList: projectRecommendList,
      // 城区 商圈id
      districtId: resblockInfo.data.result.resblockInfo.districtId,
      bizcircleId: resblockInfo.data.result.resblockInfo.bizcircleId,
      // 楼盘id
      resblockId: resblockId,
      // 项目id
      prjInfoId: prjInfoId,
      listShow: listShow
    }
  },
  mounted () {
    this.lazyInit()
  },
  components: {
    oneList,
    oneDetail
  }
}
</script>

<style>


</style>
