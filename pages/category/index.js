// pages/category/index.js

import { request } from "../../request/index";

//Page Object
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0 
  },
  Cates: [],
  //options(Object)
  onLoad: function (options) {
    this.getCates()
  },
  getCates() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res => {
      console.log(res)
      this.Cates = res.data.message

      let leftMenuList = this.Cates.map(v => v.cat_name);

      let rightContent = this.Cates[0].children

      this.setData({
        leftMenuList,
        rightContent
      })
    })
  }

});
