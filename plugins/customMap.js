import axios from '~/plugins/axios'

// 调用 estate()
export default (BMap, map, bizcircleId, currentPoint) => {
  // 复杂的自定义覆盖物
  function ComplexCustomOverlay(
    point,
    isCurrent,
    name,
    price,
    prjInfoId,
    resblockId,
    backgoundcolor,
    index
  ) {
    this._point = point
    this._name = name
    this._price = price
    this._backgoundcolor = backgoundcolor
    this._hovercolor = '#EE7800'
    this._isCurrent = isCurrent
    this._index = index
    this._prjInfoId = prjInfoId
    this._resblockId = resblockId
  }
  ComplexCustomOverlay.prototype = new BMap.Overlay()
  ComplexCustomOverlay.prototype.initialize = function(map) {
    this._map = map
    var url =
      this._backgoundcolor === '#65318E'
        ? '/sh-xf/lp' + this._resblockId + '-' + this._prjInfoId + '.html'
        : '/sh-esf/?wd=' + encodeURIComponent(this._name)
    // console.log(url);
    var div = (this._div = document.createElement('a'))
    div.href = url
    div.target = '_blank'

    div.className = 'maphouse maphouse' + this._index
    div.title = this._name
    div.style.position = 'absolute'
    // div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.zIndex = this._point.lat
    // div.style.background = "url(../static/img/blue.jpg) repeat-x 0 -33px";
    // div.style.height = "30px";
    div.style.padding = '7px 12px'
    div.style.background = this._backgoundcolor
    div.style.color = 'white'

    div.style.borderRadius = '3px'
    div.style.lineHeight = '30px'
    div.style.lineHeight = 1.4
    div.style.whiteSpace = 'nowrap'
    div.style.MozUserSelect = 'none'
    div.style.fontSize = '12px'
    div.style.cursor = 'pointer'
    // var span = this._span = document.createElement("span");
    // div.appendChild(span);
    // span.appendChild(document.createTextNode(this._text));
    // 楼盘名称
    var span1 = (this._span1 = document.createElement('span'))
    span1.title = this._name
    span1.style.display = 'inline-block'
    span1.style.marginRight = '8px'
    span1.style.verticalAlign = 'top'
    span1.style.maxWidth = '6em'
    span1.style.textOverflow = 'ellipsis'
    span1.style.overflow = 'hidden'
    // 当前楼盘楼盘名称加粗
    if (this._isCurrent) {
      span1.style.fontWeight = 'bold'
      div.style.zIndex = 1
    }

    div.appendChild(span1)
    span1.appendChild(document.createTextNode(this._name))
    // 楼盘价格
    var span2 = (this._span2 = document.createElement('span'))
    div.appendChild(span2)
    span2.appendChild(
      document.createTextNode(this._price ? this._price + '万' : '')
    )

    // 箭头三角
    var arrow = (this._arrow = document.createElement('div'))
    /* arrow.style.background = "url(../static/img/blue.jpg) no-repeat -8px -100px"; */
    arrow.className = 'arrow'
    arrow.style.width = '0'
    arrow.style.height = '0'
    arrow.style.borderTop = '8px solid ' + this._backgoundcolor
    arrow.style.borderRight = '8px solid transparent'
    arrow.style.borderLeft = '8px solid transparent'
    arrow.style.position = 'absolute'
    arrow.style.top = '100%'
    arrow.style.left = '50%'
    arrow.style.transform = 'translate(-50%,-50%)'

    arrow.style.overflow = 'hidden'
    div.appendChild(arrow)
    // 二手房在上面并且不是当前楼盘
    if (this._backgoundcolor === '#5780E0' && !this._isCurrent) {
      div.style.zIndex = this._index * 1 + 1
    }

    // 创建当前坐标
    if (this._isCurrent) {
      var currentImg = (this._currentImg = document.createElement('div'))
      currentImg.style.position = 'absolute'
      currentImg.style.left = '45%'
      currentImg.style.top = '36px'
      currentImg.style.width = '10px'
      currentImg.style.height = '10px'
      currentImg.style.border = '2px solid #DF0A31'
      currentImg.style.padding = '2px'
      currentImg.style.backgroundColor = '#DF0A31'
      currentImg.style.backgroundClip = 'content-box'
      currentImg.style.borderRadius = '50%'
      div.appendChild(currentImg)
    }
    // 埋点
    // var that = this
    // div.onclick = function() {
    //   var txt =
    //     that._backgoundcolor === '#65318E' ? '二手.周边.新房' : '二手.周边.二手'
    //   _hmt.push(['_trackEvent', txt, 'click', '点击次数'])
    // }

    map.getPanes().labelPane.appendChild(div)
    return div
  }
  ComplexCustomOverlay.prototype.draw = function() {
    var map = this._map
    var pixel = map.pointToOverlayPixel(this._point)

    // this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.left =
      pixel.x - parseInt(this._arrow.style.left) - 30 - 6 + 'px'
    this._div.style.top = pixel.y - 30 - 6 + 'px'

    if (this._isCurrent) {
      // console.log(this._div.style.top);
      this._div.style.top = this._div.style.top - 36 + 'px'
    }
  }
  ComplexCustomOverlay.prototype.addEventListener = function(event, fun) {
    this._div['on' + event] = fun
  }

  // 创建信息窗口
  function createInfoWindow(sideHouse) {
    function formatInfo(data, count, current, result) {
      var bgColor = data.belongType === '1' ? '#65318E' : '#5780E0'
      var flagTxt = data.belongType === '1' ? '新房' : '二手'
      var analysis =
        data.belongType === '1' ? '二手.周边.新房简介' : '二手.周边.二手简介'
      var houseType = data.belongType === '1' ? '在售户型' : '在售房源'
      var flag = data.belongType === '1' ? '个' : '套'
      var href =
        data.belongType === '1'
          ? '/sh-xf/lp' + data.resblockId + '-' + data.prjInfoId + '.html'
          : '/sh-esf/?wd=' + encodeURIComponent(data.resblockName)
      var imgUrl = data.fileUrl ? data.fileUrl : 'http://www.lizihang.com/static/img/default1.png'
      var salesCount = data.salesCount ? data.salesCount + flag : ''
      var quotedPrice = data.quotedPrice ? data.quotedPrice + '万' : ''
      var produceType = data.produceType ? data.produceType : ''
      var boderBottom =
        count === 2 && data.belongType === '1'
          ? 'border-bottom:1px solid #ddd;'
          : ''
      var tstr =
        "_hmt.push(['_trackEvent','" + analysis + "','click','点击次数'])"
      var line1 =
        '<a target="_blank" href="' +
        href +
        '" onclick="' +
        tstr +
        '"  style="display: flex;padding:14px 0;' +
        boderBottom +
        '">'
      var line2 = '<div style="position: relative;margin-right: 14px;">'
      var line3 = '<img src="' + imgUrl + '" alt="" width="114" height="76" />'
      var line4 =
        '<span class="housetype" style="position: absolute;top: 0;left: 0;width: 36px;height: 20px;background-color: ' +
        bgColor +
        ';font-size: 12px;color: #fff;text-align: center;line-height: 20px;">' +
        flagTxt +
        '</span>'
      var line5 = '</div><div>'
      var line6 =
        '<span style="display: block;font-size: 14px;line-height: 18px;color: #333333;">' +
        houseType +
        '&nbsp;:&nbsp;' +
        salesCount +
        '</span>'
      var line7 =
        '<span style="margin:10px 0;display: block;font-size: 14px;line-height: 18px;color: #333333;"><span style="display:inline-block;width:40px;white-space: nowrap;">报价&nbsp;:&nbsp;</span><span style="width: 91px; text-overflow: ellipsis; overflow: hidden;display: inline-block;white-space: nowrap;vertical-align: middle;" title="' +
        quotedPrice +
        '">' +
        quotedPrice +
        '</span></span>'
      var line8 =
        '<span style="display: block;font-size: 14px;line-height: 18px;color:#333333;">产品&nbsp;:&nbsp;' +
        produceType +
        '</span>'
      var line9 = '</div></a>'
      var str = [
        line1,
        line2,
        line3,
        line4,
        line5,
        line6,
        line7,
        line8,
        line9
      ].join('')

      // 只有一条数据新房或二手
      if (count === 1) {
        return '<div style="width: 262px;margin-top: -14px;">' + str + '</div>'
      } else {
        // 两条数据 新房
        if (current === 1) {
          return '<div style="width: 262px;margin-top: -14px;">' + str
        } else {
          // 二手房
          return result + str + '</div>'
        }
      }
    }

    var result = ''
    if (sideHouse.length === 1) {
      result = formatInfo(sideHouse[0], 1, 1, '')
    } else {
      result = formatInfo(sideHouse[0], 2, 1, '')
      result = formatInfo(sideHouse[1], 2, 2, result)
    }

    var iw = new BMap.InfoWindow(result, {
      width: 262,
      offset: new BMap.Size(15, -32)
    })
    return iw
  }

  // 下面开始尝试数组（这是后台输出的数据，这里只能静态写一些做演示。）

  function drawMap(currentPoint, result) {
    var getPoints = []
    var currentIndex = 0
    result.forEach(function(item, index) {
      getPoints.push(new BMap.Point(item.mapX, item.mapY))
      if (item.mapX === currentPoint.mapX && item.mapY === currentPoint.mapY) {
        currentIndex = index
      }
    })

    result.forEach(function(item, index, allArr) {
      // var analysis =
      //   item.belongType === '1'
      //     ? '点击新房' + item.resblockName
      //     : '点击二手' + item.resblockName
      var currentColor = item.belongType === '1' ? '#65318E' : '#5780E0'
      var myCompOverlay = new ComplexCustomOverlay(
        getPoints[index],
        currentIndex === index,
        item.resblockName,
        item.quotedPrice,
        item.prjInfoId,
        item.resblockId,
        currentColor,
        index
      ) // 这步是将覆盖物存到变量，以便下面使用。
      map.addOverlay(myCompOverlay)
      // closeInfoWindow()

      var _iw = createInfoWindow(item.sideResblockVos)
      var _marker = myCompOverlay // 当初存的覆盖物变量，这里派上用场了。

      var currentZIdex = 0
      _marker.addEventListener(
        'mouseenter',
        function(e) {
          // console.log('ceshi');
          // console.log($('.maphouse'+index).parent().css('z-index'));
          // console.log($('.maphouse'+index).parent());
          document.getElementsByClassName('maphouse' + index)[0].parentNode.style.zIndex = '601'
          // $('.maphouse' + index)
          //   .parent()
          //   .css('z-index', '601')
          if (e.target && e.target.className === 'maphouse maphouse' + index) {
            map.openInfoWindow(_iw, getPoints[index])
            currentZIdex = document.getElementsByClassName('maphouse' + index)[0].style.zIndex
            // $('.maphouse' + index).css({
            //   'background-color': '#EE7800',
            //   'z-index': allArr.length + 2
            // })
            removeClolr(result)
            document.getElementsByClassName('maphouse' + index)[0].parentNode.style.zIndex = allArr.length + 2
            document.getElementsByClassName('maphouse' + index)[0].parentNode.style.backgroundColor = '#EE7800'
            document.getElementsByClassName('maphouse' + index)[0].style.backgroundColor = '#EE7800'
            document.getElementsByClassName('maphouse' + index)[0].getElementsByClassName('arrow')[0].style.borderTopColor = '#EE7800'
            // let arrowArr = document.getElementsByClassName('maphouse' + index)[0].getElementsByClassName('arrow')
            // arrowArr.forEach(function(e, j) {
            //   document.getElementsByClassName('maphouse' + index)[0].getElementsByClassName('arrow')[j].style.borderTopColor =
            //     '#EE7800'
            // })
          }
        },
        false
      )

      _marker.addEventListener(
        'mouseleave',
        function(e) {
          if (e.target && e.target.className === 'maphouse maphouse' + index) {
            document.getElementsByClassName('maphouse' + index)[0].style.zIndex = currentZIdex
            // $('.maphouse' + index).css({ 'z-index': currentZIdex })
          }
        },
        false
      )
      _iw.addEventListener('close', function() {
        // console.log('信息框关闭');
        // var marker = $('.maphouse' + index)
        // marker.css('background-color', currentColor)
        // marker.find('.arrow').css('border-top-color', currentColor)
        removeClolr(result)
        // document.getElementsByClassName('maphouse' + index)[0].style.backgoundColor = currentColor
        // document.getElementsByClassName('maphouse' + index)[0].style.borderTopColor = currentColor
      })
    })
  }
  function removeClolr (arr) {
    arr.forEach((item, index) => {
      document.getElementsByClassName('maphouse' + index)[0].style.backgroundColor = 'rgb(87, 128, 224)'
      document.getElementsByClassName('maphouse' + index)[0].getElementsByClassName('arrow')[0].style.borderTopColor = 'rgb(87, 128, 224)'
    })
  }
  function estate() {
    var url = '/landz-web-house/houseDetail/getSideResblock'
    var data = {
      bizcircleId: bizcircleId,
      url: url
    }
    axios.get('/api/urlget.html', { params: data }).then(function(res) {
      let data = res.data.data.result
      console.log(1, res)
      if (data.length <= 0) {
        document.getElementById('estateMap').style.background =
          'url("~assets/img/map_default.png") no-repeat'
        let tipArr = document.getElementsByClassName('no_map_tips')
        tipArr.forEach((item, j) => {
          document.getElementsByClassName('no_map_tips')[j].style.display =
            'block'
        })
        // $('.no_map_tips').show()
      } else {
        document.getElementById('estateMap').style.background = 'nonde'
        // $('#estateMap').css({ background: 'none' })
        drawMap(currentPoint, data)
      }
    })
  }

  // 获取当前楼盘坐标
  // var mapX = $('.pg_mapx').text()
  // var mapY = $('.pg_mapy').text()
  // var currentPoint = {
  //   mapX: mapX,
  //   mapY: mapY
  // }

  // var mapBox = $('.mapBox')
  // var tabBox = $('.tabBox')
  // var mapImg2 = $('#mapImg2')
  // var estateMap = $('#estateMap')
  // tabBox.hide()
  // var btnOption = $('.periphery .left div')
  // btnOption.click(function() {
  //   btnOption.removeClass('current')
  //   $(this).addClass('current')
  //   var index = btnOption.index(this)
  //   if (index === 0) {
  //     mapBox.hide()
  //     mapBox.css({
  //       position: 'relative',
  //       left: ''
  //     })
  //     tabBox.hide()
  //     mapImg2.hide()
  //     estateMap.show()
  //     $('.periphery .right').show()
  //   } else {
  //     mapBox.show()
  //     mapBox.css({
  //       position: 'relative',
  //       left: ''
  //     })
  //     tabBox.show()
  //     mapImg2.show()
  //     estateMap.hide()
  //     $('.periphery .right').hide()
  //   }
  // })
  estate()
}
