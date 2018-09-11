<template>
  <div>
    <Second-list fromSource="sh-esf"
                 :getDistrict="getDistrict"
                 :getBizcircle="getBizcircle"
                 :getHouseList="getHouseList"
                 :getProjectRecommend="getProjectRecommend"
                 :getSecondRecommend="getSecondRecommend"></Second-list>
  </div>
</template>
<script>
import SecondList from "~/components/secondHand/secondList.vue"
import axios from "~/plugins/axios"
export default {
  data() {
    return {

    }
  },
  async asyncData({
    store, route, params, query, error, env
  }) {
    // 列表逻辑
    let names = [
      "city",
      "busines",
      "price",
      "room",
      "area",
      "features",
      "toward",
      "decoration",
      "product",
      "purpose",
      "page"
    ]
    let regex = /(\d{6})?_?(\d{3})?_?(0p\d+-tp\d+)?_?(h\d)?_?(au\d+?-ad\d+)?_?((?:p[a-z]1)*)?_?(c\d+)?_?(z\d)?_?(cp\d)?_?(y\d)?_?(p\d)?/gi
    let result = regex.exec(params.id)
    let parm = {
      districtId: null, // 城区
      bizcircleId: null, // 商圈
      salePriceMin: null, // 售价
      salePriceMax: null,
      bedRooms: null, // 居室
      areaMin: null, // 面积
      areaMax: null,
      fiveYears: null, // 是否满五
      twoYears: null, // 是否满二
      isNewHouse: null, // 是否全新房
      orientation: null, // 朝向
      fitmentType: null, // 装修
      houseType: null, // 产品
      isFurnitureCompleted: null, // 家具
      isEletricalCompleted: null, // 家电
      isGarden: null, // 是否带花园
      isTerrace: null, // 是否带露台
      isFloorHeating: null, // 是否地暖
      stableTemperature: null, // 有无恒温恒湿
      isSwimmingPool: null, // 是否有泳池
      isMingChef: null, // 是否明厨明卫
      isChineseDecoration: null, // 中式装修
      isWesternDecoration: null, // 欧式装修
      isCanLookAnyTime: null, // 随时可看
      isCourtyard: null, // 是否合院
      is720: null, // 是否有720
      sortType: "",
      sortColumn: "",
      source: 400100000001,
      pageSize: 20,
      currentPage: "1",
      userId: "SHG18020730466",
      useType: null,
      keyWord: "",
      maxBuildArea: null,
      minBuildArea: null,
      maxQuotedPrice: null,
      minQuotedPrice: null,
      cityCode: "310000"
    }
    // 参数赋值
    for (let i = 1; i <= 11; i++) {
      console.log(result[i])
      if (result[i]) {
        switch (i) {
          case 1: // 城区
            parm.districtId = result[i]
            // store.commit('secondType/cityInfo', result[i])
            break
          case 2: // 商圈
            parm.bizcircleId = result[i]
            // store.commit('secondType/businesInfo', result[i])
            break
          case 3: // 售价
            let regex3 = /0p(\d+)-tp(\d+)/
            let result1Data = regex3.exec(result[i])
            parm.salePriceMin = result1Data[1]
            parm.salePriceMax = result1Data[2]
            break
          case 4: // 居室
            let regex4 = /h(\d+)/
            let result4Data = regex4.exec(result[i])
            parm.bedRooms = result4Data[1]
            break
          case 5: // 面积
            let regex5 = /au(\d+)-ad(\d+)/
            let result5Data = regex5.exec(result[i])
            parm.areaMin = result5Data[1]
            parm.areaMax = result5Data[2]
            break
          case 6: // 特色
            if (/pa1/.test(result[i])) {
              parm.fiveYears = "102300000001"
            }
            if (/pb1/.test(result[i])) {
              parm.twoYears = "102300000001"
            }
            if (/pc1/.test(result[i])) {
              parm.isNewHouse = "102300000001"
            }
            if (/pd1/.test(result[i])) {
              parm.isGarden = "102300000001"
            }
            if (/pe1/.test(result[i])) {
              parm.isTerrace = "102300000001"
            }
            if (/pf1/.test(result[i])) {
              parm.isFloorHeating = "102300000001"
            }
            if (/pg1/.test(result[i])) {
              parm.stableTemperature = "102300000001"
            }
            if (/ph1/.test(result[i])) {
              parm.isSwimmingPool = "102300000001"
            }
            if (/pi1/.test(result[i])) {
              parm.isMingChef = "102300000001"
            }
            if (/pj1/.test(result[i])) {
              parm.isCourtyard = "102300000001"
            }
            /* if (/pk1/.test(result[i])) {
                // 3D看房暂无
                parm.fiveYears = '102300000001'
              } */
            break
          case 7: // 朝向
            if (result[i]) {
              switch (result[i]) {
                case "c1":
                  parm.orientation = "100500000001"
                  break
                case "c2":
                  parm.orientation = "100500000002"
                  break
                case "c3":
                  parm.orientation = "100500000003"
                  break
                case "c4":
                  parm.orientation = "100500000004"
                  break
                case "c5":
                  parm.orientation = "100500000005"
                  break
              }
            }
            // parm.orientation = result[i]
            break
          case 8: // 装修
            if (result[i]) {
              switch (result[i]) {
                case "z1":
                  parm.fitmentType = "105900000001"
                  break
                case "z2":
                  parm.fitmentType = "105900000002"
                  break
                case "z3":
                  parm.fitmentType = "105900000003"
                  break
              }
            }
            // parm.fitmentType = result[i]
            break
          case 9:
            // 产品
            if (result[9] === 'cp1') {
              parm.houseType = '202900000001'
            }
            if (result[9] === 'cp2') {
              parm.houseType = '202900000002'
            }
            if (result[9] === 'cp3') {
              parm.houseType = '202900000003'
            }
            if (result[9] === 'cp4') {
              parm.houseType = '202900000004'
            }
            if (result[9] === 'cp5') {
              parm.houseType = '202900000005'
            }
            if (result[9] === 'cp6') {
              parm.houseType = '202900000006'
            }
            break
          case 10: // 用途 y1=117500000001,y2=117500000002,y3=117500000003
            if (result[i]) {
              switch (result[i]) {
                case "y1":
                  parm.useType = "117500000001"
                  break
                case "y2":
                  parm.useType = "117500000002"
                  break
                case "y3":
                  parm.useType = "117500000003"
                  break
              }
            }
            break
        }
      }
    }
    // 关键词
    store.commit("secondType/keyWord", query.wd)
    if (query.wd) {
      parm.keyWord = query.wd
    }

    // 排序
    switch (query.soft) {
      case "t":
        parm.sortType = "DESC"
        parm.sortColumn = "createdTime"
        break
      case "o1":
        parm.sortType = "ASC"
        parm.sortColumn = "quotedPrice "
        break
      case "o2":
        parm.sortType = "DESC"
        parm.sortColumn = "quotedPrice "
        break
      case "m1":
        parm.sortType = "ASC"
        parm.sortColumn = "buildArea"
        break
      case "m2":
        parm.sortType = "DESC"
        parm.sortColumn = "buildArea"
        break
      default:
        parm.sortType = ""
        parm.sortColumn = ""
        break
    }
    // , businessArea
    // ,axios.get(`${env.url}/landz-web-house/secondHand/getBizcircle?districtId=${result[1]}`)
    // 获取城区 和 二手列表数据
    let [getDistrict, getSecondHouseList] = await Promise.all([
      axios.get(`${env.url}/landz-web-house/secondHand/getDistrict?cityCode=310000`),
      axios.post(`${env.url}/landz-web-house/secondHand/getHouseList`, parm)
    ]).catch(err => {
      console.log('错误')
      error({ statusCode: 400, message: err })
    })

    // 保存城区数据
    store.commit('secondType/setCityData', getDistrict.data.result)

    // 如果选择了城区,去请求商圈数据
    if (result[1]) {
      let getBusines = await axios.get(`${env.url}/landz-web-house/secondHand/getBizcircle?districtId=${result[1]}`)

      // 处理商圈数据 统一格式 {districtId: 'id',districtName: '值'}
      let businesData = []
      getBusines.data.result.forEach(item => {
        businesData.push({ districtId: item.bizcircleId, districtName: item.bizcircleName })
      })

      store.commit('secondType/setBusinesData', businesData)
    }

    // 保存查询参数 ?wd=阳光花城&sort=t
    store.commit("secondType/setQueryStr", query)

    for (let i = 1; i <= 11; i++) {
      // addPrams2Store(result[i], names[i - 1])
      // console.log('名字   ==', names[i - 1])
      // store.dispatch('secondType/addPrams', { result: result[i], name: names[i - 1] })
      if (params.current && names[i - 1] === 'page') {
        store.dispatch('secondType/addPrams', { result: params.current, name: names[i - 1] })
      } else {
        store.dispatch('secondType/addPrams', { result: result[i], name: names[i - 1] })
      }
    }

    return {
      getBizcircle: store.state.secondType.businesData,
      getDistrict: store.state.secondType.cityData,
      getHouseList: getSecondHouseList.data.result.houseList, // 二手列表
      getProjectRecommend: getSecondHouseList.data.result.projectRecommend, // 新房推荐
      getSecondRecommend: getSecondHouseList.data.result.secondHandRecommend // 二手房推荐
    }
  },
  components: {
    SecondList
  },
  mounted() {
    this.lazyInit()
  }
}
</script>

<style>

</style>


