// pages/my-kehu/my-kehu.js
const app = getApp()
import {
  resourceApi
} from "../../api/resource.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    rentPageNo: 1,
    buyPageNo: 1,
    pageSize: 5,
    buyLastPage: false,
    rentLastPage: false,
    buyList: [],
    rentList: [],
    index: 0,
  },
  changeTabIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  },
  goDetailBuy(e) {
    console.log("去买卖客户详情", e.detail)
    wx.navigateTo({
      url: '/pages/buy-kehu-detail/buy-kehu-detail?cusId=' + e.detail.id + "&cusName=" + e.detail.name + "&cusNo=" + e.detail.cusno,
    })
  },
  goDetailRent(e) {
    console.log("去租赁客户详情", e.detail)
    wx.navigateTo({
      url: '/pages/rent-kehu-detail/rent-kehu-detail?cusId=' + e.detail.id + "&cusName=" + e.detail.name + "&cusNo=" + e.detail.cusno,
    })
  },
  getRentData() {
    let model = {
      pageNo: this.data.rentPageNo,
      pageSize: this.data.pageSize,
      buyOrRent: 2,
      userId: this.data.userId,

    }
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {

      resourceApi.getList(model).then(res => {
        this.setData({
          rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list),
          rentLastPage: res.lastPage
        })
        wx.hideLoading()
        ok(res)
      })
    })
  },
  getBuyData() {
    let model = {
      pageNo: this.data.buyPageNo,
      pageSize: this.data.pageSize,
      buyOrRent: 1,
      userId: this.data.userId,

    }

    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {
      resourceApi.getList(model).then(res => {
        this.setData({
          buyList: this.data.buyPageNo == 1 ? res.list : this.data.buyList.concat(res.list),
          buyLastPage: res.lastPage
        })
        wx.hideLoading()
        ok(res)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  loadInfiniteBuy() {
    let model = {
      pageNo: this.data.buyPageNo,
      pageSize: this.data.pageSize,
      buyOrRent: 1,
      userId: this.data.userId,

    }

    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })

    resourceApi.getList(model).then(res => {
   
      let pageNo = this.data.buyPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          buyList: this.data.buyPageNo == 1 ? res.list : this.data.buyList.concat(res.list),
          buyPageNo: pageNo,
          buyLastPage: res.lastPage

        })
        this.loadInfiniteBuy()

      } else {
        wx.hideLoading()
      }
    })
  },
  loadInfiniteRent() {
    let model = {
      pageNo: this.data.rentPageNo,
      pageSize: this.data.pageSize,
      buyOrRent: 2,
      userId: this.data.userId,

    }
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })

    resourceApi.getList(model).then(res => {
      let pageNo = this.data.rentPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list),
          rentPageNo: pageNo,
          rentLastPage: res.lastPage

        })
        this.loadInfiniteRent()

      } else {
        wx.hideLoading()
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (this.data.index == 0) { //二手房
      this.loadInfiniteBuy()
      wx.stopPullDownRefresh()

    } else if (this.data.index == 1) { //租房
      this.loadInfiniteRent()
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.index == 0) { //求购
      let pageNo = this.data.buyPageNo;

      if (!this.data.buyLastPage) { //不是最后一页
        this.setData({
          buyPageNo: pageNo + 1,
        })

        this.getBuyData().then(res => {
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
    } else if (this.data.index == 1) { //租房
      let pageNo = this.data.rentPageNo;

      if (!this.data.rentLastPage) { //不是最后一页
        this.setData({
          rentPageNo: pageNo + 1,
        })

        this.getRentData().then(res => {
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})