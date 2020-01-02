// components/search-item/search-item.js
import {
  secondApi
} from "../../api/second.js"
import {
  rentApi
} from "../../api/rent.js"
// import {
//   buildApi
// } from "../../api/build.js"
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,

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
        obj[next.houseName] ? "" : obj[next.houseName] = true && cur.push(next);
        return cur;
      }, []) //设置cur默认类型为数组，并且初始值为空的数组
      return arr
    },
    changeInput(e) {
      let keyword = e.detail.value;
      if (this.data.type == 2) {
        secondApi.getList({
          houseName: keyword
        }).then(res => {
          console.log("二手房", res)

          this.setData({
            list: this.filterArr(res.list),
            isInput: keyword ? true : false
          })
        })
      }


      if (this.data.type == 1) {
        buildApi.getSeachList({
          projectName: keyword
        }).then(res => {
          console.log("楼盘", res)
          let arr = JSON.parse(JSON.stringify(res.list).replace(/name/g, 'houseName'))
          this.setData({
            list: this.filterArr(arr),
            isInput: keyword ? true : false
          })
        })
      }

      if (this.data.type == 3) {
        rentApi.getList({
          houseName: keyword
        }).then(res => {
          console.log("出租", res)
          this.setData({
            list: this.filterArr(res.list),
            isInput: keyword ? true : false
          })
        })
      }


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
      console.log(e.currentTarget.dataset)
      this.setData({
        keyword: name
      })

      let historyList = app.globalData.historyList;
      historyList.push(item)
      app.globalData.historyList = this.filterArr(historyList)

      if (this.data.type == 1) { //楼盘
        wx.redirectTo({
          url: '/pages/build-list/build-list?projectName=' + name,
        })

      }
      if (this.data.type == 2) { //二手
        // wx.redirectTo({
        //   url: '/pages/second/second?houseName=' + name,
        // })
        this.triggerEvent('toRedirect', '/pages/second/second?houseName=' + name)

      }

      if (this.data.type == 3) { //租房
        wx.redirectTo({
          url: '/pages/rent/rent?houseName=' + name,
        })
      }
    }
  }
})