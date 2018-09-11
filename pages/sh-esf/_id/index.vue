<template>
  <div>
    <Second-detail :getBasicInfo="getBasicInfo"
                   :getResblockInfo="getResblockInfo"
                   :getRecommendList="getRecommendList"
                   :getTypeImgs="getTypeImgs"
                   :getBirdEyeImgs="getBirdEyeImgs"
                   :getConsultantList="getConsultantList"
                   v-if="!listShow"></Second-detail>
    <Second-list v-if="listShow"
                 fromSource="sh-esf"
                 :getDistrict="getDistrict"
                 :getBizcircle="getBizcircle"
                 :getHouseList="getHouseList"
                 :getProjectRecommend="getProjectRecommend"
                 :getSecondRecommend="getSecondRecommend"></Second-list>
  </div>
</template>
<script>
import SecondList from "~/components/secondHand/secondList.vue"
import SecondDetail from "~/components/secondHand/secondDetail.vue"
import axios from "~/plugins/axios"
export default {
  data() {
    return {
      currentView: 'SecondList'
    }
  },
  async asyncData({
    store, route, params, query, error, env
  }) {
    let listShow = true // 详情 列表页的开关
    listShow = !params.id.includes('html')
    console.log('fenye')
    console.log(params.current)
    // console.log(query.wd)
    // console.log(params.id)
    /* function addPrams2Store(params, name) {
      // let dataOption = searchData[name + "Data"]
      let dataOption = store.state.secondType[name + 'Data']
      if (params && dataOption) {
        let id = ""
        let result = ""
        if (name === "features") {
          // id = /(p[a-z]1)/ig.exec(params)
          id = params.match(/(p[a-z]1)/gi)

          result = []
          for (let k = 0; k < id.length; k++) {
            result.push(
              dataOption.find(function (item) {
                return item.districtId === id[k]
              })
            )
          }
        } else {
          id = name === "city" || name === "busines" ? Number.parseInt(params) : params
          result = dataOption.find(function (item) {
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

        store.commit(`secondType/${name}Info`, result)
      }
    } */
    if (listShow) {
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
      /*  let searchData = {
        // 城区
        cityData: store.state.secondType.cityData,
        // 商圈
        businesData: store.state.secondType.businesData,
        // 居室
        roomData: store.state.secondType.roomData,
        // 售价
        priceData: store.state.secondType.priceData,
        // 面积
        areaData: store.state.secondType.areaData,
        // 产品
        productData: store.state.secondType.productData,
        // 朝向
        towardData: store.state.secondType.towardData,
        // 用途
        purposeData: store.state.secondType.purposeData,
        // 装修
        decorationData: store.state.secondType.decorationData,
        // 特色
        featuresData: store.state.secondType.featuresData
      } */

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
      for (let i = 1; i <= 10; i++) {
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
        if (params.current && names[i - 1] === 'page') {
          store.dispatch('secondType/addPrams', {result: params.current, name: names[i - 1]})
        } else {
          store.dispatch('secondType/addPrams', {result: result[i], name: names[i - 1]})
        }
        // store.dispatch('secondType/addPrams', {result: result[i], name: names[i - 1]})
      }

      return {
        listShow: listShow,
        getBizcircle: store.state.secondType.businesData,
        getDistrict: store.state.secondType.cityData,
        getHouseList: getSecondHouseList.data.result.houseList, // 二手列表
        getProjectRecommend: getSecondHouseList.data.result.projectRecommend, // 新房推荐
        getSecondRecommend: getSecondHouseList.data.result.secondHandRecommend // 二手房推荐
        /*   // 城区
          cityData: searchData.cityData,
          // 商圈
          businesData: searchData.businesData,
          // 居室
          roomData: searchData.roomData,
          // 售价
          priceData: searchData.priceData,
          // 面积
          areaData: searchData.areaData,
          // 产品
          productData: searchData.productData,
          // 朝向
          towardData: searchData.towardData,
          // 用途
          purposeData: searchData.purposeData,
          // 装修
          decorationData: searchData.decorationData,
          // 特色
          featuresData: searchData.featuresData */
      }
    } else {
      // 详情
      let regex = /\d+/ig
      let result = regex.exec(params.id)
      if (result && result.length > 0) {
        let housedelId = result[0]

        // 二手详情接口参数
        // /landz-web-house/houseDetail/getHouseBasicInfo?cityCode=310000&housedelId=781587&userId=SHG18042614196
        /* , { params: {
          cityCode: 310000,
          housedelId: housedelId,
          userId: 'SHG18042614196'
        }} */

        let basicInfo = await axios.get(`${env.url}/landz-web-house/houseDetail/getHouseBasicInfo?cityCode=310000&housedelId=781587&userId=SHG18042614196`)

        let resblockId = basicInfo.data.result.resblockId
        let bedRooms = basicInfo.data.result.bedRooms
        let houseId = basicInfo.data.result.houseId
        let holderId = basicInfo.data.result.holderId
        let orgId = basicInfo.data.result.holderOrgId
        let resblockInfo = await axios.get(`${env.url}/landz-web-house/houseDetail/getResblockInfo?resblockId=${resblockId}`)
        let recommendList = await axios.get(`${env.url}/landz-web-house/houseDetail/getRecommendList?housedelId=${housedelId}`)
        let typeImgs = await axios.get(`${env.url}/landz-web-house/houseDetail/getTypeImgs?houseId=${houseId}`)
        let birdEyeImgs = await axios.get(`${env.url}/landz-web-house/houseDetail/getbirdEyeImgAndShowingCount?bedRooms=${bedRooms}&cityCode=310000&holderId=${holderId}&houseId=${houseId}&housedelId=${housedelId}&orgId=${orgId}&resblockId=${resblockId}`)
        let consultantList = await axios.get(`${env.url}/landz-web-house/tLeadShowing/getRecommendedConsultantList?housedelId=${housedelId}&site=400100000001&channel=400300000003`)
        console.log(333333, typeImgs)
        /*  let { resblockInfo, recommendList, typeImgs, birdEyeImgs, consultantList } = Promise.all([
          // 获取楼盘信息接口参数 ?resblockId=597860
          // /landz-web-house/houseDetail/getResblockInfo?resblockId=597860
          axios.get(`${env.url}/landz-web-house/houseDetail/getResblockInfo?resblockId=${resblockId}`),
          // 推荐列表接口参数
          // /landz-web-house/houseDetail/getRecommendList?housedelId=781587
          axios.get(`${env.url}/landz-web-house/houseDetail/getRecommendList?housedelId=${housedelId}`),
          // 查询户型图(详情页点击户型图时候调用)
          // /landz-web-house/houseDetail/getTypeImgs?cityCode=310000&houseId=15066809
          axios.get(`${env.url}/landz-web-house/houseDetail/getTypeImgs?cityCode=310000&housedelId=${housedelId}`),
          // 获取鸟瞰图
          // /landz-web-house/houseDetail/getbirdEyeImgAndShowingCount?
          // bedRooms=3&cityCode=310000&holderId=132883&houseId=15066809&housedelId=781587&orgId=19421&resblockId=597860
          axios.get(`${env.url}/landz-web-house/houseDetail/getbirdEyeImgAndShowingCount`, { params: {
            bedRooms: bedRooms,
            cityCode: 310000,
            holderId: holderId,
            houseId: houseId,
            housedelId: housedelId,
            orgId: orgId,
            resblockId: resblockId
          } }),
          // 获取推荐顾问
          // /landz-web-house/tLeadShowing/getRecommendedConsultantList?housedelId=781587&site=400100000001&channel=400300000003
          axios.get(`${env.url}/landz-web-house/tLeadShowing/getRecommendedConsultantList?housedelId=${housedelId}&site=400100000001&channel=400300000003`)

        ]) */

        // return { listShow: listShow, getBasicInfo: basicInfo.data.result, houseDetail: houseDetail.data.result }
        return {
          listShow: listShow,
          getBasicInfo: basicInfo.data.result,
          getResblockInfo: resblockInfo.data.result,
          getRecommendList: recommendList.data.result,
          getTypeImgs: typeImgs.data.result,
          getBirdEyeImgs: birdEyeImgs.data.result,
          getConsultantList: consultantList.data.result
        }
      }
    }
  },
  mounted () {
    this.lazyInit()
  },
  components: {
    SecondList,
    SecondDetail
  }
}
</script>

<style>

</style>

