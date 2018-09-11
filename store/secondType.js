export const state = () => ({
  counter: 0,
  seo: 'none',
  pageIndex: '',
  searchInfo: {
    city: '', // 城区
    busines: '', // 商圈
    price: '', // 售价
    room: '', // 居室
    area: '', // 面积
    features: [], // 特色
    toward: '', // 朝向
    decoration: '', // 装修
    product: '', // 产品
    purpose: '' // 用途
  },
  // 城区
  cityData: [],
  // 商圈
  businesData: [],
  // 居室
  roomData: [
    {
      districtId: 'h1',
      districtName: '一居'
    },
    {
      districtId: 'h2',
      districtName: '二居'
    },
    {
      districtId: 'h3',
      districtName: '三居'
    },
    {
      districtId: 'h4',
      districtName: '四居'
    },
    {
      districtId: 'h5',
      districtName: '五居及以上'
    }
  ],
  // 售价
  priceData: [
    {
      districtId: '0p0-tp1000',
      districtName: '1000万以下'
    },
    {
      districtId: '0p1000-tp1500',
      districtName: '1000-1500万'
    },
    {
      districtId: '0p1500-tp2000',
      districtName: '1500-2000万'
    },
    {
      districtId: '0p2000-tp3000',
      districtName: '2000-3000万'
    },
    {
      districtId: '0p3000-tp5000',
      districtName: '3000-5000万'
    },
    {
      districtId: '0p5000-tp20000000000',
      districtName: '5000万以上'
    }
  ],
  // 面积
  areaData: [
    {
      districtId: 'au0-ad100',
      districtName: '100㎡以下'
    },
    {
      districtId: 'au100-ad140',
      districtName: '100-140㎡'
    },
    {
      districtId: 'au140-ad180',
      districtName: '140-180㎡'
    },
    {
      districtId: 'au180-ad220',
      districtName: '180-220㎡'
    },
    {
      districtId: 'au220-ad280',
      districtName: '220-280㎡'
    },
    {
      districtId: 'au280-ad360',
      districtName: '280-360㎡'
    },
    {
      districtId: 'au360-ad420',
      districtName: '360-420㎡'
    },
    {
      districtId: 'au420-ad500',
      districtName: '420-500㎡'
    },
    {
      districtId: 'au500-ad20000000000',
      districtName: '500㎡及以上'
    }
  ],
  // 产品
  productData: [
    {
      districtId: 'cp1',
      districtName: '高档住宅'
    },
    {
      districtId: 'cp2',
      districtName: '叠拼别墅'
    },
    {
      districtId: 'cp3',
      districtName: '联排别墅'
    },
    {
      districtId: 'cp4',
      districtName: '独栋别墅'
    },
    {
      districtId: 'cp5',
      districtName: '双拼别墅'
    }
  ],
  // 朝向
  towardData: [
    {
      districtId: 'c1',
      districtName: '东'
    },
    {
      districtId: 'c2',
      districtName: '南'
    },
    {
      districtId: 'c3',
      districtName: '西'
    },
    {
      districtId: 'c4',
      districtName: '北'
    },
    {
      districtId: 'c10',
      districtName: '南北'
    }
  ],
  // 用途
  purposeData: [
    {
      districtId: 'y1',
      districtName: '住宅'
    },
    {
      districtId: 'y2',
      districtName: '商业'
    },
    {
      districtId: 'y3',
      districtName: '写字楼'
    }
  ],
  // 装修
  decorationData: [
    {
      districtId: 'z1',
      districtName: '毛坯'
    },
    {
      districtId: 'z2',
      districtName: '简装'
    },
    {
      districtId: 'z3',
      districtName: '精装'
    }
  ],
  // 特色
  featuresData: [
    {
      districtId: 'pa1',
      districtName: '满五'
    },
    {
      districtId: 'pb1',
      districtName: '满二'
    },
    {
      districtId: 'pc1',
      districtName: '全新房'
    },
    {
      districtId: 'pd1',
      districtName: '花园'
    },
    {
      districtId: 'pe1',
      districtName: '露台'
    },
    {
      districtId: 'pf1',
      districtName: '地暖'
    },
    {
      districtId: 'pg1',
      districtName: '恒温恒湿'
    },
    {
      districtId: 'ph1',
      districtName: '带泳池'
    },
    {
      districtId: 'pi1',
      districtName: '明厨明卫'
    },
    {
      districtId: 'pj1',
      districtName: '合院'
    },
    {
      districtId: 'pk1',
      districtName: '3D看房'
    }
  ],
  queryStr: {},
  keyword: '', // 搜索关键字
  busines: [], // 商圈
  featuresBind: [], // 特色
  priceCustom: {
    minPrice: null,
    maxPrice: null
  }, // 自定义售价
  areaCustom: {}, // 自定义面积
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: ''
})

export const getters = {
  searchResult: state => {
    let result = ''
    // 返回路由拼接规则
    for (let [k, v] of Object.entries(state.searchInfo)) {
      if (k !== 'features' && v) {
        result += `${v.districtId}_`
      } else if (k === 'features' && v.length > 0) {
        for (let item of v) {
          result += item.districtId
        }
        result += '_'
      }
    }
    result = result.slice(0, result.length - 1)
    /* if (result) {
      result += '/' + state.pageIndex
    } else {
      result += state.pageIndex
    } */
    return result
  },
  getPath: state => (id, name) => {
    // console.log('ceshi')

    let result = ''
    // 返回路由拼接规则
    for (let [k, v] of Object.entries(state.searchInfo)) {
      // if (k !== 'features' && name !== 'features' && v) {
      if (k !== 'features') {
        if (k === name) {
          result += `${id}_`
          // console.log('ceshi:  11  ' + result)
        } else {
          if (v) {
            result += `${v.districtId}_`
          }
        }
        // console.log('ceshi:  13  ' + result)
      } else if (k === 'features') {
        // console.log(v.find((item) => item.districtId === id))
        if (k === name) {
          let arr = []
          if (!v.find(item => item.districtId === id)) {
            arr = [id]
          }
          for (let item of v) {
            if (item.districtId !== id) {
              arr.push(item.districtId)
            }
          }
          arr = [...new Set(arr)]
          if (arr.length > 0) {
            result += `${arr.sort().join('')}_`
          }
          // console.log('ceshi:  21 ' + result)
        } else {
          // console.log('ceshi: 3 ' + result)
          if (v.length > 0) {
            for (let item of v) {
              result += item.districtId
            }
            result += '_'
          }
          // console.log('ceshi: 31 ' + result)
        }
      }
    }
    result = result.slice(0, result.length - 1)
    // 分页
    if (name === 'page' && result) {
      result += '/' + id
    } else {
      result += '/' + state.pageIndex
    }
    // query参数拼接
    result += '?'
    if (Object.keys(state.queryStr).length > 0) {
      for (let [k, v] of Object.entries(state.queryStr)) {
        result += `${k}=${v}&`
      }
    }
    return result.slice(0, result.length - 1)
  },
  getLimitPath: state => (name, id) => {
    // console.log('ceshi')

    let result = ''
    // 返回路由拼接规则
    for (let [k, v] of Object.entries(state.searchInfo)) {
      if (k !== 'features') {
        if (k !== name && v) {
          result += `${v.districtId}_`
        }
      } else if (k === 'features' && v.length > 0) {
        if (k !== name) {
          for (let item of v) {
            result += item.districtId
          }
          result += '_'
        } else {
          if (id) {
            let arr = []
            for (let item of v) {
              if (item.districtId !== id) {
                arr.push(item.districtId)
              }
            }
            arr = [...new Set(arr)]
            if (arr.length > 0) {
              result += `${arr.sort().join('')}_`
            }
          }
        }
      }
    }
    result = result.slice(0, result.length - 1)
    if (result) {
      result += '/' + state.pageIndex
    } else {
      result += state.pageIndex
    }
    // query参数拼接
    result += '?'
    if (Object.keys(state.queryStr).length > 0) {
      for (let [k, v] of Object.entries(state.queryStr)) {
        result += `${k}=${v}&`
      }
    }
    return result.slice(0, result.length - 1)
  },
  getComplex: (state, getters) => (source, name, value) => {
    let result = `/${source}/${getters.searchResult}`
    if (name === '综合') {
      if (state.queryStr.wd) {
        result += `?wd=${state.queryStr.wd}`
      }
      return result
    }
    if (name === '最新') {
      result += '?'
      if (state.queryStr.wd) {
        result += `wd=${state.queryStr.wd}&`
      }
      if (state.queryStr.soft && state.queryStr.soft !== 't') {
        result += `soft=t&`
      }
      if (!state.queryStr.soft) {
        result += `soft=t&`
      }
      return result.slice(0, result.length - 1)
    }
    if (name === '其他') {
      // console.log(value)
      // console.log(state.queryStr.soft.idOf(value))
      result += '?'
      if (state.queryStr.wd) {
        result += `wd=${state.queryStr.wd}&`
      }
      if (state.queryStr.soft && state.queryStr.soft === `${value}1`) {
        result += `soft=${value}2&`
      }
      if (state.queryStr.soft && state.queryStr.soft === `${value}2`) {
        result += `soft=${value}1&`
      }
      if (
        !state.queryStr.soft ||
        state.queryStr.soft === 't' ||
        !state.queryStr.soft.startsWith(value)
      ) {
        result += `soft=${value}1&`
      }
      return result.slice(0, result.length - 1)
    }
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  },
  changeSort(state, str) {
    state.seo += `_${str}`
  },
  /* 选择的筛选条件 begin */
  cityInfo(state, city) {
    state.searchInfo.city = city
  },
  businesInfo(state, busines) {
    // state.searchInfo.busines.districtId = busines.bizcircleId
    // state.searchInfo.busines.districtName = busines.bizcircleName
    if (busines) {
      state.searchInfo.busines = {
        districtId: busines.bizcircleId,
        districtName: busines.bizcircleName
      }
    }
    // state.searchInfo.busines = busines
  },
  priceInfo(state, price) {
    state.searchInfo.price = price
  },
  roomInfo(state, room) {
    state.searchInfo.room = room
  },
  areaInfo(state, area) {
    state.searchInfo.area = area
  },
  featuresInfo(state, feature) {
    // console.log(feature)
    state.searchInfo.features = feature
    // state.searchInfo.features.push(feature)
  },
  towardInfo(state, toward) {
    state.searchInfo.toward = toward
  },
  decorationInfo(state, decoration) {
    state.searchInfo.decoration = decoration
  },
  productInfo(state, product) {
    state.searchInfo.product = product
  },
  purposeInfo(state, purpose) {
    state.searchInfo.purpose = purpose
  },
  pageInfo(state, page) {
    state.pageIndex = page
  },
  /* 选择的筛选条件 end */
  /* 自定义售价和面积 begin */
  setPriceCustom(state, price) {
    state.priceCustom = price
  },
  setAreaCustom(state, area) {
    state.areaCustom = area
  },
  /* 自定义售价和面积 end */
  keyWord(state, keyword) {
    state.keyword = keyword
  },
  setQueryStr(state, query) {
    state.queryStr = query
  },
  setFeatures(state, feature) {
    state.featuresBind.push(feature)
  },
  /* 城区和商圈是动态请求接口获得数据 每次都请求城区,只有选择了城区才请求商圈数据 begin */
  setCityData(state, cityData) {
    state.cityData = cityData
  },
  setBusinesData(state, businesData) {
    state.businesData = businesData
  },
  /* 城区和商圈是动态请求接口获得数据 每次都请求城区,只有选择了城区才请求商圈数据 end */
  setMinPrice(state, minPrice) {
    state.minPrice = minPrice
  },
  setMaxPrice(state, maxPrice) {
    state.minPrice = maxPrice
  },
  setMinArea(state, minArea) {
    state.minArea = minArea
  },
  setMaxArea(state, maxArea) {
    state.maxArea = maxArea
  }
}

export const actions = {
  addPrams({ commit, state }, params) {
    // console.log('name  == ', params.name)
    let dataOption = state[params.name + 'Data']
    // console.log('dataOption')
    // console.log(dataOption)

    if (params.result && dataOption) {
      let id = ''
      let result = ''
      if (params.name === 'features') {
        // id = /(p[a-z]1)/ig.exec(params)
        id = params.result.match(/(p[a-z]1)/gi)

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
          params.name === 'city' || params.name === 'busines'
            ? Number.parseInt(params.result)
            : params.result
        result = dataOption.find(function(item) {
          if (params.name === 'busines') {
            // console.log(item)
            return item.bizcircleId === id
          } else {
            // console.log('districtId: ' + item.districtId)
            return item.districtId === id
          }
        })
        // 自定义售价

        if (!result) {
          if (params.name === 'price') {
            id = /0p(\d+)-tp(\d+)/gi.exec(params.result)
            // this.minPrice = Number.parseInt(id[1])
            // this.maxPrice = Number.parseInt(id[2])
            commit('setMinPrice', Number.parseInt(id[1]))
            commit('secondType/setMaxPrice', Number.parseInt(id[2]))
            result = {
              districtId: params.result,
              districtName: `${id[1]}-${id[2]}万`
            }
          }
          if (params.name === 'area') {
            id = /au(\d+)-ad(\d+)/gi.exec(params.result)
            commit('setMinArea', Number.parseInt(id[1]))
            commit('setMaxArea', Number.parseInt(id[2]))
            result = {
              districtId: params.result,
              districtName: `${id[1]}-${id[2]}㎡`
            }
          }
        }
      }

      commit(`${params.name}Info`, result)
    } else if (params.name === 'page' && params.result) {
      commit(`${params.name}Info`, params.result)
    }
  }
}
