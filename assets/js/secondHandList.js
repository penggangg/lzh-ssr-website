$(function () {
  var time, time1;
  // 城区商圈的显示隐藏
  $('body').on('mouseenter', '.disN_a', function () {
    if ($('.disN li').length != 0) {
      window.clearTimeout(time)
      $('.disN').show()
    }
  })
  $('body').on('mouseenter', '.disN', function () {
    if ($('.disN li').length != 0) {
      window.clearTimeout(time)
      $('.disN').show()
    }
  })
  $('body').on('mouseleave', '.disN_a', function () {
    time = setTimeout(function () {
      $('.disN').hide()
    }, 1000)
  })
  $('body').on('mouseleave', '.disN', function () {
    time = setTimeout(function () {
      $('.disN').hide()
    }, 1000)
  })

  $('body').on('mouseenter', '.bizN_a', function () {
    if ($('.bizN li').length != 0) {
      window.clearTimeout(time1)
      $('.bizN').show()
    }
  })
  $('body').on('mouseenter', '.bizN', function () {
    if ($('.bizN li').length != 0) {
      window.clearTimeout(time1)
      $('.bizN').show()
    }
  })
  $('body').on('mouseleave', '.bizN_a', function () {
    time1 = setTimeout(function () {
      $('.bizN').hide()
    }, 100)
  })
  $('body').on('mouseleave', '.bizN', function () {
    time1 = setTimeout(function () {
      $('.bizN').hide()
    }, 100)
  })
})
