// pages/my-house/my-house.js
const app = getApp()
import {
  resourceApi
} from "../../api/resource.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rentList: [],
    secondList: [],
    userId: '',
    rentPageNo: 1,
    rentPageSize: 5,
    secondPageNo: 1,
    secondPageSize: 5,
  },

  goDetailSecond(e) {
    let id = e.detail;
    wx.navigateTo({
      url: '/pages/second-detail/second-detail?id=' + id,
    })
  },

  goDetailRent(e) {
    let id = e.detail;

    wx.navigateTo({
      url: '/pages/rent-detail/rent-detail?id=' + id,
    })
  },

  getRentData() {
    let model = {
      userId: this.data.userId,
      pageNo: this.data.rentPageNo,
      pageSize: this.data.rentPageSize,
    }

    wx.showLoading({
      title: '正在加载',
      icon: 'none'
    })

    resourceApi.getRentHouse(model).then(res => {
      console.log("rentlist", res)
      this.setData({
        rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list)
      })
      wx.hideLoading()
    })

  },
  getSecondData() {
    let model = {
      userId: this.data.userId,
      pageNo: this.data.secondPageNo,
      pageSize: this.data.secondPageSize,
    }

    wx.showLoading({
      title: '正在加载',
      icon: 'none'
    })

    resourceApi.getSecondHouse(model).then(res => {
      console.log("secondlist", res)
      this.setData({
        secondList: this.data.secondPageNo == 1 ? res.list : this.data.secondList.concat(res.list)
      })
      wx.hideLoading()

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   userId:app.globalData.openid
    // })
this.getRentData()
    this.getSecondData()
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