// pages/cart/index.js

import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";

getSetting
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    const address = wx.getStorageSync('address');

    const cart = wx.getStorageSync('cart') || []
    this.setCart(cart)

    this.setData({
      address
    })
    // const allChecked = cart

    // 查一下这个 every 的用法，平时没怎么用过
    // const allChecked = cart.length ? cart.every(e => e.checked) : false

  },
  // 设置购物车状态，重新计算底部数据
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0;
    let totalNum = 0;

    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false
      }
    })

    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
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

  handleItemChange(e) {
    const { id: goods_id } = e.currentTarget.dataset
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id == goods_id)
    // console.log({ goods_id, index })
    cart[index].checked = !cart[index].checked

    // 试图和数据都要更新
    this.setCart(cart)
  },
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked

    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  async handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset

    let { cart } = this.data
    const index = cart.findIndex(v => v.goods_id == id)

    if (cart[index].num == 1 && operation == -1) {
      const res = await showModal({ content: '您是否要删除？' })
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart)
      }
      return
    }


    // wx.showModal({
    //   title: '',
    //   content: '',
    //   success: (result) => {
    //     if (result.confirm) {
    //       cart.splice(index, 1);
    //       this.setCart(cart)
    //     }
    //     else if (result.cancel) {
    //       console.log('用户点取消')
    //     }
    //   },
    // });

    console.log(operation, id)

    cart[index].num += operation

    this.setCart(cart)
  },
  async handlePay() {
    const { address, totalNum } = this.data
    if (!address.userName) {
      await showToast({ title: '您还没有选择收货地址' })
      return
    }

    if (totalNum == 0) {
      await showToast({ title: '您还没有选购商品' })
      return
    }

    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }

})