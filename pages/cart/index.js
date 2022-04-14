// pages/cart/index.js

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";

getSetting
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },

  onShow() {
    const address = wx.getStorageSync('address');

    this.setData({
      address
    })
  },

  async handleChooseAddress() {
    const res1 = await getSetting();

    const scopeAddress = res1.authSetting['scope.address']

    if (scopeAddress == false)
      await openSetting();

    const address = await chooseAddress()
    console.log(address)

    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    wx.setStorageSync('address', address);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})