// pages/my-kehu/my-kehu.js
const app = getApp()
import { kehuCollectApi } from "../../api/kehuCollect.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    rentPageNo: 1,
    buyPageNo: 1,
    pageSize: 5,
    lastPage: false,
    buyList: [],
    rentList: [],
    index: 0, //判断是求购 求租
  },

  changeTab(e) {
    let index = e.detail.index;
    this.setData({
      index: index
    })

  },
  getRentData() {
    let model = {
      pageNo: this.data.rentPageNo,
      pageSize: this.data.pageSize,
      type: 2,
      userId: this.data.userId,

    }
    wx.showLoading({
      title: '正在加载',
    })
    kehuCollectApi.getPage(model).then(res => {
      this.setData({
        rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list),
        lastPage: res.lastPage
      })
      wx.hideLoading()
    })
  },
  getBuyData() {
    let model = {
      pageNo: this.data.buyPageNo,
      pageSize: this.data.pageSize,
      type: 1,
      userId: this.data.userId,

    }
    wx.showLoading({
      title: '正在加载',
    })
    kehuCollectApi.getPage(model).then(res => {
      this.setData({
        buyList: this.data.rentPageNo == 1 ? res.list : this.data.buyList.concat(res.list),
        lastPage: res.lastPage
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userId: userInfo.userid
    })
    this.getBuyData()
    this.getRentData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})