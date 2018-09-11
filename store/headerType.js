export const state = () => ({
  ctlInfo: '', // 频道 1 首页 2 一手 3 二手 4 租房 5 四合院
  actInfo: '', // 1 列表，首页  2 详情 3 搜索无结果
  sourcePage: 400200000001,
  channel: 400300000001
})
// url的判断
export const mutations = {
  urlInfo (state, content) {
    // 判断头部的高亮
    if (content.includes('/sh-xf')) {
      state.ctlInfo = 'onehand'
      state.sourcePage = content.includes('.html') ? 400200000002 : 400200000001
      state.channel = 400300000002
    } else if (content.includes('/sh-esf')) {
      state.ctlInfo = 'second'
      state.sourcePage = content.includes('.html') ? 400200000002 : 400200000001
      state.channel = 400300000003
    } else if (content.includes('/sh-zl')) {
      state.ctlInfo = 'rent'
      state.sourcePage = content.includes('.html') ? 400200000002 : 400200000001
      state.channel = 400300000004
    } else {
      state.ctlInfo = 'home'
      state.channel = 400300000001
      state.sourcePage = 400200000001
    }
  }
}
