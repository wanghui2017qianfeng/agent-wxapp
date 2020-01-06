// pages/search/search.js

import {
  secondApi
} from "../../api/second.js"
import {
  rentApi
} from "../../api/rent.js"

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    active1: 0,
    keyword: '',
    type: 1,
    secondHotList: [],
    rentHotList: [],
    buildHotList: [],

    secondHistoryList: [],
    rentHistoryList: [],
    kehuHistoryList: [],

    buyOrRent: "",
  },
  toRedirect(e) {
    wx.redirectTo({
      url: e.detail,
    })
  },

  handleDel() {

    let type = this.data.type;
    if (type == 1) { //清空 二手房

      wx.setStorage({
        key: 'secondHistoryList',
        data: [],
      })
      this.setData({
        secondHistoryList: []
      })
    }


    if (type == 2) { //清空 租房
      wx.setStorage({
        key: 'rentHistoryList',
        data: [],
      })
      this.setData({
        rentHistoryList: []
      })
    }

    if (type == 3) { //清空 客户
      wx.setStorage({
        key: 'kehuHistoryList',
        data: [],
      })
      this.setData({
        kehuHistoryList: []
      })
    }


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      rentHistoryList: wx.getStorageSync('rentHistoryList'),
      secondHistoryList: wx.getStorageSync('secondHistoryList'),
      kehuHistoryList: wx.getStorageSync('kehuHistoryList')

    })

    console.log("搜索框====", this.data.secondHistoryList)
    // type  1二手房  2租房 3.客户 
    let type = options.type
    this.setData({
      type: type,
      buyOrRent: options.buyOrRent ? options.buyOrRent : '',
    })
    if (type == 1) {
      this.setData({
        historyList: this.data.secondHistoryList
      })
    }else if(type==2){
      this.setData({
        historyList: this.data.rentHistoryList
      })
    }else if(type==3){
      this.setData({
        historyList: this.data.kehuHistoryList
      })
    }
    console.log("搜索页的his", this.data.historyList)
    console.log("optionszufang1", options.buyOrRent)





  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //二手历史


  
  

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})