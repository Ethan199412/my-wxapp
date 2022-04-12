//Page Object wx-page
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    swiperList: [],
    catesList: []
  },
  //options(Object)
  onLoad: function (options) {
    console.log('[p0] onLoad')
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log('[p1] result', result)
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  getSwiperList() {
    request({
      url: '/home/swiperdata',
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },

  getCateList() {
    request({
      url: '/home/catitems',
    }).then(result => {
      console.log('[p0.1] result', result)
      this.setData({
        catesList: result
      })
    })
  },

  getFloorList() {
    request({ url: '/home/floorData' }).then(
      result => {
        this.setData({
          floorList: result
        })
      }
    )
  }

});


