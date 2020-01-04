// components/search-item/search-item.js
import {
  secondApi
} from "../../api/second.js"
import {
  rentApi
} from "../../api/rent.js"

import { kehuApi} from "../../api/kehu.js"

let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,

    },
    buyOrRent:{
      type:Number
    },
    // type 2二手 3租房 1楼盘
    hotList: {
      type: Array,
      value: []
    },
    historyList: {
      type: Array,
      value: []
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    isInput: false,
    list: [],
    keyword: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //数组去重
    filterArr(arr) {
      let obj = {};
      arr = arr.reduce((cur, next) => {
        obj[next.title] ? "" : obj[next.title] = true && cur.push(next);
        return cur;
      }, []) //设置cur默认类型为数组，并且初始值为空的数组
      return arr
    },
    changeInput(e) {
      // type  1二手房  2租房 3客户 

      let keyword = e.detail.value;

      let city = wx.getStorageSync('city');
      let userInfo = wx.getStorageSync('userInfo');
      let userId = userInfo.userid;
      let cityId = city.id;

   
// 二手房
      if (this.data.type == 1) {
        secondApi.getPage({
          houseName: keyword,
          regionId: cityId,
          pageNum:1,
          pageSize:10,
          userId:userId
        }).then(res => {
          this.setData({
            list: this.filterArr(res.list),
            isInput: keyword ? true : false
          })
        })
      }


// 租房
      if (this.data.type == 2) {
        rentApi.getPage({
          houseName: keyword,
          regionId: cityId,
          pageNum: 1,
          pageSize: 10,
          userId: userId
        }).then(res => {
          this.setData({
            list: this.filterArr(res.list),
            isInput: keyword ? true : false
          })
        })
      }

      // 客户

      if (this.data.type == 3&&this.data.buyOrRent==1) {//求购客户
        kehuApi.getPage({
          cusName: keyword,
          pageNo: 1,
          pageSize: 10,
          userId: userId,
          buyOrRent:1
        }).then(res => {
          this.setData({
            list: this.filterArr(res.list),
            isInput: keyword ? true : false
          })
        })
      }

      if (this.data.type == 3 && this.data.buyOrRent == 2) {//求租客户
        kehuApi.getPage({
          cusName: keyword,
          pageNo: 1,
          pageSize: 10,
          userId: userId,
          buyOrRent:2
        }).then(res => {
          this.setData({
            list: this.filterArr(res.list),
            isInput: keyword ? true : false
          })
        })
      }

      console.log()

    },
    handleDel() {

      this.triggerEvent('handleDel')
    },
    onCheckClick(e) {
      console.log("点击")
      let {
        item,
        name
      } = e.currentTarget.dataset

      this.setData({
        keyword: name
      })

      // let historyList = app.globalData.historyList;
      // historyList.push(item)
      // app.globalData.historyList = this.filterArr(historyList)

     
      if (this.data.type == 1) { //二手
        this.triggerEvent('toRedirect', '/pages/second/second?houseName=' + name)
      }

      if (this.data.type == 2) { //租房
        wx.redirectTo({
          url: '/pages/rent/rent?houseName=' + name,
        })
      }

      if (this.data.type == 3&&this.data.buyOrRent==1 ) { //求购客户
        wx.redirectTo({
          url: '/pages/kehu/kehu?cusName=' + name+"&activeTab=0",
        })
      }
      if (this.data.type == 3 && this.data.buyOrRent == 2) { //求租客户
        wx.redirectTo({
          url: '/pages/kehu/kehu?cusName=' + name + "&activeTab=1",
        })
      }

    }
  }
})