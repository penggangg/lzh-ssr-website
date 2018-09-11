/* eslint-disable */
// 异步加载百度地图
if (process.BROWSER_BUILD) {
  // let lib=require('external_library')
  console.log(lib)
}
let MP = function (ak) {
  return new Promise(function (resolve, reject) {
    global.init = function () {
      resolve(global.BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
let api = {
  CommonMap: class {
    constructor () {
      this.local = ''
      this.detail = ''
      this.result_list = ''
      this.distance = []
      this.result_list_str = ''
    }
    // 创建地图
    createMap (_this, mapx, mapy, rename, fleg, element, locationName) {
      let zoom = fleg ? 17 : 16
      _this.$nextTick( () => {
        MP('6tYzTvGZSOpYB5Oc2YGGOKt8').then(BMap => {
          let map = new BMap.Map('allmap') // 创建Map实例
          this.detail = new BMap.Point(mapx, mapy) // 创建点坐标
          map.centerAndZoom(this.detail, zoom)
          locationName = element ? locationName || '公交' : locationName || '公交'  //周边搜索的默认值
          // 添加标尺
          this.addControl(BMap,map)
          //添加marker
          this.addMarker(BMap,rename,mapx,mapy,map)
          //周边的有无  通过fleg 来控制
          let that = this
          this.local = new BMap.LocalSearch(map, {
            renderOptions: {
              map: map,
              autoViewport: false,
              panel: "r-result"
            },
            //搜索面板的回调
            onSearchComplete:function(res){
              that.result_list=[];
              for(var i=0; i<res.getCurrentNumPois();i++){
                var poi = res.getPoi(i);
                that.result_list.push(poi)
              };
              if(element){
                that.mapResultList(mapx,mapy,map,element,BMap)
              };
            }
          });
          if (!fleg) {
            console.log(locationName)
            this.local.searchNearby(locationName, this.detail, 1000);
            this.local.disableFirstResultSelection(); //禁止第一个被选中
          }
        })
      })
    }
    // 添加标尺
    addControl (BMap,map) {
      var topLeftControl = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
      })
      var topLeftNavigation = new BMap.NavigationControl()
      map.addControl(topLeftControl)
      map.addControl(topLeftNavigation)
    }
    //自定义的marker
    addMarker (BMap,rename,mapx,mapy,map) {
      function ComplexCustomOverlay(point, text, mouseoverText) {
        this._point = point;
        this._text = text;
        this._overText = mouseoverText;
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay();
      ComplexCustomOverlay.prototype.initialize = function(maps) {
        this._map = maps;
        var div = this._div = document.createElement("div");
        div.style.position = "absolute";
        div.setAttribute('class','pMapMarker');
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.style.backgroundColor = "#5780E0";
        div.style.borderRadius='3px';
        div.style.color = "white";
        div.style.height = "18px";
        div.style.padding = "7px 12px";
        div.style.lineHeight = "18px";
        div.style.whiteSpace = "nowrap";
        div.style.MozUserSelect = "none";
        div.style.fontSize = "12px";
        var span = this._span = document.createElement("span");
        div.appendChild(document.createTextNode(this._text))
        div.appendChild(span);
        // span.appendChild(document.createTextNode(this._text));
        map.getPanes().labelPane.appendChild(div);
        return div;
      }
      ComplexCustomOverlay.prototype.draw = function() {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        var pMapMarker =  document.getElementsByClassName('pMapMarker')[0].offsetWidth +24;
        this._div.style.left = pixel.x - pMapMarker/2 + "px";
        this._div.style.top = pixel.y -50 + "px";
      }
      var txt = rename;
      var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(mapx, mapy), txt);
      map.addOverlay(myCompOverlay);
    }
    mapResultList (mapx,mapy,map,element,BMap){
      if(mapx){
        var point_current = new BMap.Point(mapx,mapy);
        var _that = this
        _that.result_list_str = ''
        if(_that.result_list.length){
          _that.result_list.forEach(function(item,key){
            var pointB = new BMap.Point(item.point.lng,item.point.lat);
            var distance=parseInt( map.getDistance(point_current,pointB));
            var _index=String.fromCharCode(64 + parseInt(key+1));
            _that.result_list_str+='<li><div class="contentBox"><div class="itemContent"><span><i>'+_index+'.</i><em>'+item.title+'</em></span><span>'+distance+'米</span></div><div class="itemInfo">'+item.address+'</div>';
            if(item.phoneNumber){
              _that.result_list_str+='<div class="phoneNumber">'+item.phoneNumber+'</div>'
            }
            _that.result_list_str+='</div></li>';
          });
        }else{
          _that.result_list_str='<li style="text-align:center;color:#333">暂无数据</li>'
        }
        document.getElementsByClassName(element)[0].innerHTML = _that.result_list_str;
      };
    }
  }
}
// export default MP
export {
  api
}
