// pages/my-house/my-house.js
const app = getApp()
import {
  houseCollectApi
} from "../../api/houseCollect.js"
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
    rentLastPage: false,
    secondLastPage: false,
    index: 0, //判断是二手还是租房
  },
  changeTabIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
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
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {
      houseCollectApi.getRentPage(model).then(res => {
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
  getSecondData() {
    let model = {
      userId: this.data.userId,
      pageNo: this.data.secondPageNo,
      pageSize: this.data.secondPageSize,
    }

    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    return new Promise(ok => {
      houseCollectApi.getSecondPage(model).then(res => {
        this.setData({
          secondList: this.data.secondPageNo == 1 ? res.list : this.data.secondList.concat(res.list),
          secondLastPage: res.lastPage
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
      userId: userInfo.userid
    })
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

  loadInfiniteSecond() {
    let model = {
      userId: this.data.userId,
      pageNo: this.data.secondPageNo,
      pageSize: this.data.secondPageSize,
    }

    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })

    houseCollectApi.getSecondPage(model).then(res => {
      let pageNo = this.data.secondPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          secondList: this.data.secondPageNo == 1 ? res.list : this.data.secondList.concat(res.list),
          secondPageNo: pageNo,
          secondLastPage: res.lastPage

        })
        this.loadInfiniteSecond()

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
      userId: this.data.userId,
      pageNo: this.data.rentPageNo,
      pageSize: this.data.rentPageSize,
    }

    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    houseCollectApi.getRentPage(model).then(res => {
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
  onPullDownRefresh: function() {
    if (this.data.index == 0) { //二手房
      this.loadInfiniteSecond()
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
    if (this.data.index == 0) { //二手
      let pageNo = this.data.secondPageNo;

      if (!this.data.secondLastPage) { //不是最后一页
        this.setData({
          secondPageNo: pageNo + 1,
        })

        this.getSecondData().then(res => {
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