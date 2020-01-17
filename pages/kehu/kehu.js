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
    buyLastPage: false,
    rentPageNo: 1,
    rentLastPage: false,
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
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {
      kehuApi.getPage(model).then(res => {
        this.setData({
          buyList: this.data.buyPageNo == 1 ? res.list : this.data.buyList.concat(res.list),
          buyLastPage: res.lastPage
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
  getRentList() {
    let model = {
      cusName: this.data.cusNameRent,
      pageNo: this.data.rentPageNo,
      buyOrRent: 2,
      pageSize: 5,
      userId: this.data.userId
    }
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {
      kehuApi.getPage(model).then(res => {
        this.setData({
          rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list),
          rentLastPage: res.lastPage
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
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userId: userInfo.userid,
      cusNameBuy: options.activeTab == 0 ? options.cusName : '',
      cusNameRent: options.activeTab == 1 ? options.cusName : '',
      activeTab: options.activeTab,
      index: options.activeTab ? options.activeTab : 0,
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

  loadInfiniteBuy() {
    let model = {
      cusName: this.data.cusNameBuy,
      pageNo: this.data.buyPageNo,
      buyOrRent: 1,
      pageSize: 5,
      userId: this.data.userId
    }

    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })

    kehuApi.getPage(model).then(res => {

      let pageNo = this.data.buyPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          buyList: this.data.buyPageNo == 1 ? res.list : this.data.buyList.concat(res.list),
          buyPageNo: pageNo,
          buyLastPage: res.lastPage

        })
        this.loadInfiniteBuy()

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
  loadInfiniteRent() {
    let model = {
      cusName: this.data.cusNameRent,
      pageNo: this.data.rentPageNo,
      buyOrRent: 2,
      pageSize: 5,
      userId: this.data.userId
    }
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })

    kehuApi.getPage(model).then(res => {
      let pageNo = this.data.rentPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          rentList: this.data.rentPageNo == 1 ? res.list : this.data.rentList.concat(res.list),
          rentPageNo: pageNo,
          rentLastPage: res.lastPage

        })
        this.loadInfiniteRent()

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
  onPullDownRefresh: function () {
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
console.log("index",this.data.index)

    if (this.data.index == 0) { //求购
      let pageNo = this.data.buyPageNo;

      if (!this.data.buyLastPage) { //不是最后一页
        this.setData({
          buyPageNo: pageNo + 1,
        })

        this.getBuyList().then(res => {
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
    console.log("租房")
      let pageNo = this.data.rentPageNo;

      if (!this.data.rentLastPage) { //不是最后一页
        this.setData({
          rentPageNo: pageNo + 1,
        })

        this.getRentList().then(res => {
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