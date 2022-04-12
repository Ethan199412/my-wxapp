import { request } from "../../request/index"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    console.log(res)
    this.setData({
      goodsObj: res
    })
  }

})
