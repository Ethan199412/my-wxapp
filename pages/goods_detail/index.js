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

  handlePreviewImage(e) {
    console.log(e)
    const { index } = e.currentTarget.dataset
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: urls[index],
      urls
    })
  },

  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];

    let index = cart.findIndex(e => e.goods_id == this.goodsObj.goods_id)

    console.log({ index, cart }, this.goodsObj)
    if (index == -1) {
      this.goodsObj.num = 1
      cart.push(this.goodsObj)
    }
    else {
      cart[index].num++
    }

    wx.setStorageSync('cart', cart)

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },

  async getGoodsDetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    // this.goodsObj = res

    console.log(res)
    const { goods_name, goods_price, goods_introduce, pics } = res

    this.goodsObj = res
    this.setData({
      goodsObj: {
        goods_name,
        goods_price,
        goods_introduce,
        pics
      }
    })
  }

})
