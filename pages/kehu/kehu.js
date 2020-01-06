// pages/kehu/kehu.js
import {
  kehuApi
} from "../../api/kehu.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    buyList: [],
    rentList: [],
    cusName: '',
    buyPageNo: 1,
    buyLastPage:false,
    rentPageNo:1,
    rentLastPage:false,
    pageSize: 5,
    activeTab: 0,
    cusNameRent: '',
    cusNameBuy: '',
    index: 0,
  },
  changeTabIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  },
  goSearchBuy() {
    wx.navigateTo({
      url: '/pages/search/search?type=3&buyOrRent=1',
    })
  },
  goSearchRent() {
    wx.navigateTo({
      url: '/pages/search/search?type=3&buyOrRent=2',
    })
  },
  goDetailBuy(e) {
    console.log("去买卖客户详情", e.detail)
    wx.navigateTo({
      url: '/pages/buy-kehu-detail/buy-kehu-detail?cusId=' + e.detail.id + "&cusName=" + e.detail.name + "&cusNo=" + e.detail.cusno,
    })
  },
  goDetailRent(e) {
    wx.navigateTo({
      url: '/pages/rent-kehu-detail/rent-kehu-detail?cusId=' + e.detail.id + "&cusName=" + e.detail.name + "&cusNo=" + e.detail.cusno,
    })
  },

  getBuyList() {
    let model = {
      cusName: this.data.cusNameBuy,
      pageNo: this.data.buyPageNo,
      buyOrRent: 1,
      pageSize: 5,
      userId: this.data.userId
    }

    kehuApi.getPage(model).then(res => {
      this.setData({
        buyList: this.data.buyPageNo == 1 ? res.list : this.data.buyList.concat(res.list),
        buyLastPage: res.lastPage
      })
    })

  },
  getRentList() {
    let model = {
      cusName: this.data.cusNameRent,
      pageNo: this.data.rentPageNo,
      buyOrRent: 2,
      pageSize: 5,
      userId: this.data.userId
    }

    kehuApi.getPage(model).then(res => {
      this.setData({
        rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list),
        rentLastPage: res.lastPage
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userId: userInfo.userid,
      cusNameBuy: options.activeTab == 0 ? options.cusName : '',
      cusNameRent: options.activeTab == 1 ? options.cusName : '',
      activeTab: options.activeTab,
      index: options.activeTab ? options.activeTab:0,
    })
    this.getBuyList()
    this.getRentList()
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