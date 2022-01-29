//Page Object wx-page
import { request } from '../../request/index'
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
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },

  getCateList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    }).then(result => {
      console.log('[p0.1] result', result)
      this.setData({
        catesList: result.data.message
      })
    })
  },

  getFloorList() {
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floorData' }).then(
      result => {
        this.setData({
          floorList: result.data.message
        })
      }
    )
  }

});


