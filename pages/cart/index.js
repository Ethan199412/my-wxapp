// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleChooseAddress() {
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"]
        if (scopeAddress == true || scopeAddress == undefined) {
          wx.chooseAddress({
            success: res => {
              console.log(res)
            }
          })
        }
        else {
          wx.openSetting({
            success: (res1) => {
              wx.chooseAddress({
                success: res2 => {
                  console.log(res2)
                }
              })
            },

          });

        }
      },
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})