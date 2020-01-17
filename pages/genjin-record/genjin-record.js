// pages/genjin-record/genjin-record.js
const app = getApp()
import {
  houseFollowApi
} from "../../api/houseFollow.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 5,
    houseId: '',
    type: '',
    list: [],
    lastPage: false,
  },
  getData() {
    let model = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      houseId: this.data.houseId,
      type: this.data.type,
    }
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {

      houseFollowApi.getPage(model).then(res => {
        this.setData({
          list: this.data.pageNum == 1 ? res.list : this.data.list.concat(res.list),
          lastPage: res.lastPage
        })
        wx.hideLoading();
        if (res.lastPage) {
          wx.showToast({
            title: '没有更多啦',
            icon: 'none',
            duration: 1000
          })
        }
        ok(res)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options", options)
    this.setData({
      houseId: options.houseId,
      type: options.type
    })
    this.getData()

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
  loadInfinite() {
    let model = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      houseId: this.data.houseId,
      type: this.data.type,
    }
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })

      houseFollowApi.getPage(model).then(res => {
        let pageNum = this.data.pageNum + 1;
        if (!res.lastPage) {//不是最后一页
          this.setData({
            list: this.data.pageNum == 1 ? res.list : this.data.list.concat(res.list),
            pageNum: pageNum,
            lastPage: res.lastPage
          })
          this.loadInfinite()

        } else {
          wx.hideLoading();
          if (res.lastPage) {
            wx.showToast({
              title: '没有更多啦',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  

    this.loadInfinite()

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageNum = this.data.pageNum;

    if (!this.data.lastPage) {//不是最后一页
      this.setData({
        pageNum: pageNum + 1,
      })

      this.getData().then(res => {
        if (res.list.length == 0) {
          wx.showToast({
            title: '没有更多啦',
            icon: 'none',
            duration: 1000
          })
        }
      })
    } else {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})