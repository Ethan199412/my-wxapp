// import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index";

Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
    test: { data: 1 }
  },
  Cates: [],
  //options(Object)
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if (!Cates) this.getCates()
    else {
      // 如果过期了
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
        return
      }

      this.Cates = Cates.data
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children

      this.setData({
        leftMenuList,
        rightContent,
        scrollTop: 0
      })
    }
  },
  async getCates() {
    // request({
    //   url: '/categories'
    // }).then(res => {

    //   this.Cates = res.data.message
    //   wx.setStorageSync('cates', { data: this.Cates, time: Date.now() })
    //   // 接口数据存缓存

    //   let leftMenuList = this.Cates.map(v => v.cat_name);

    //   let rightContent = this.Cates[0].children

    //   this.setData({
    //     leftMenuList,
    //     rightContent,
    //     scrollTop: 0
    //   })
    // })
    const res = await request({ url: '/categories' })
    this.Cates = res
    wx.setStorageSync('cates', { data: this.Cates, time: Date.now() })
    // 接口数据存缓存

    let leftMenuList = this.Cates.map(v => v.cat_name);

    let rightContent = this.Cates[0].children

    this.setData({
      leftMenuList,
      rightContent,
      scrollTop: 0
    })

  },

  handleItemTap(e) {
    const { index } = e.currentTarget.dataset

    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  },

  // 小程序有一个不一样的地方就是可以直接在对象上做更改
  handleChangeData() {
    const { test } = this.data
    test.data += 1
    this.setData({
      test
    })
  }

});
