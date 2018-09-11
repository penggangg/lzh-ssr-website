// 判断站点类型
let Site = {
  IsPC() {
    let userAgentInfo = navigator.userAgent
    let Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod"
    ]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  IsWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === "micromessenger") {
      return true
    } else {
      return false
    }
  }
}

let api = {
  IsSite() {
    if (Site.IsPC()) {
      if (this.IsWeiXin()) {
        return "400100000003"
      } else {
        return "400100000001"
      }
    } else {
      if (Site.IsWeiXin()) {
        return "400100000003"
      } else {
        return "400100000002"
      }
    }
  },
  setCookie(name, value) {
    let Days = 365
    let exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/"
  },
  getCookie(name) {
    let arr = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if ((arr = document.cookie.match(reg))) return unescape(arr[2])
    else return null
  }
}
export { api }
