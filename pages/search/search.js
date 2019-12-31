// pages/search/search.js

// import {
//   secondApi
// } from "../../api/second.js"
// import {
//   rentApi
// } from "../../api/rent.js"
// import {
//   buildApi
// } from "../../api/build.js"
// import {
//   hotApi
// } from "../../api/hot.js"
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    active1: 0,
    keyword: '',
    type: 2,
    secondHotList: [],
    rentHotList: [],
    buildHotList: [],

    secondHistoryList: [],
    rentHistoryList: [],
    buildHistoryList: [],



    icon1: {
      normal: '../../assets/img/home.png',
      active: '../../assets/img/home_on.png'
    },
    icon2: {
      normal: '../../assets/img/focus.png',
      active: '../../assets/img/focus_on.png'
    },
    icon3: {
      normal: '../../assets/img/my.png',
      active: '../../assets/img/my_on.png'
    },

  },

  onChangeTabbar(event) {
    this.setData({
      active1: event.detail
    });
    if (event.detail == 0) { //首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else if (event.detail == 1) { //关注
      wx.switchTab({
        url: '/pages/focus/focus'
      })
    } else {
      wx.switchTab({
        url: '/pages/my/my'
      })
    }

  },

  toRedirect(e) {


    wx.redirectTo({
      url: e.detail,
    })
  },
  onChange(e) {
    let {
      index,
      title
    } = e.detail;

    this.setData({
      active: index
    })
    if (index == 0) {
      this.setData({
        type: 2
      })
      hotApi.getHot(1).then(res => {
        this.setData({
          secondHotList: res,
          secondHistoryList: wx.getStorageSync('secondHistoryList') ? wx.getStorageSync('secondHistoryList') : []
        })
      })
    }

    if (index == 1) {
      this.setData({
        type: 3
      })
      hotApi.getHot(2).then(res => {
        this.setData({
          rentHotList: res,
          rentHistoryList: wx.getStorageSync('rentHistoryList') ? wx.getStorageSync('rentHistoryList') : []
        })
      })
    }


    if (index == 2) {
      this.setData({
        type: 1
      })
      hotApi.getHot(3).then(res => {
        this.setData({
          buildHotList: res,
          buildHistoryList: wx.getStorageSync('buildHistoryList') ? wx.getStorageSync('buildHistoryList') : []
        })
      })
    }
  },
  handleDel() {
    if (index == 0) {
      this.setData({
        type: 2
      })
      wx.setStorage({
        key: 'secondHistoryList',
        data: [],
      })
      this.setData({
        secondHistoryList: []
      })
    }

    if (index == 1) {
      this.setData({
        type: 3
      })
    
      wx.setStorage({
        key: 'rentHistoryList',
        data: [],
      })
      this.setData({
        rentHistoryList: []
      })
    }


    if (index == 2) {
      this.setData({
        type: 1
      })
      wx.setStorage({
        key: 'buildHistoryList',
        data: [],
      })
      this.setData({
        buildHistoryList: []
      })

    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type
    if (!type) {
      hotApi.getHot(1).then(res => {
        this.setData({
          secondHotList: res,
          secondHistoryList: wx.getStorageSync('secondHistoryList')
        })
      })
    }

    if (type == 1) { //楼盘
      this.setData({
        type: type,
        active: 2
      })
      hotApi.getHot(3).then(res => {
        this.setData({
          buildHotList: res,
          buildHistoryList: wx.getStorageSync('buildHistoryList')
        })
      })

    }

    if (type == 2) { //二手房
      this.setData({
        type: type,
        active: 0
      })
      hotApi.getHot(1).then(res => {
        this.setData({
          secondHotList: res,
          secondHistoryList: wx.getStorageSync('secondHistoryList')

        })
      })
    }

    if (type == 3) { //出租
      this.setData({
        type: type,
        active: 1
      })
      hotApi.getHot(2).then(res => {
        this.setData({
          rentHotList: res,
          rentHistoryList: wx.getStorageSync('rentHistoryList')

        })
      })
    }


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


    let historyList = wx.getStorageSync('historyList')
    this.setData({
      rentHistoryList: wx.getStorageSync('rentHistoryList'),
      secondHistoryList: wx.getStorageSync('secondHistoryList'),
      buildHistoryList: wx.getStorageSync('buildHistoryList')
      //  historyList: app.globalData.historyList
    })

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