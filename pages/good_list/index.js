import { request } from "../../request/index"

// 上滑触底时加载下一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 0,
        value: '销量',
        isActive: false
      },
      {
        id: 0,
        value: '价格',
        isActive: false
      }
    ],
    goods: []
  },

  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams })
    console.log(res)
    this.totalPages = Math.ceil(res.total / this.QueryParams.pagesize)

    console.log({ totalPages: this.totalPages })
    this.setData({ goods: [...this.data.goods, ...res.goods] })
    wx.stopPullDownRefresh()
  },

  handleTabsItemChange(e) {
    console.log(e)
    const { index } = e.detail
    const { tabs } = this.data
    tabs.forEach((e, i) => {
      if (i == index) {
        e.isActive = true
        return
      }
      e.isActive = false
    })
    this.setData({
      tabs
    })
  },

  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      console.log('%c' + '没有下一页', 'color:red')
      wx.showToast({
        title: '没有下一页数据了',
      })
    }
    else {
      this.QueryParams.pagenum += 1
      console.log('%c' + '有下一页数据', 'color:red')
      this.getGoodsList()
    }
  },

  onPullDownRefresh(){
    console.log('往下滑动')
    this.setData({
      goods:[]
    })

    this.QueryParams.pagenum=1
    this.getGoodsList()
  }
})