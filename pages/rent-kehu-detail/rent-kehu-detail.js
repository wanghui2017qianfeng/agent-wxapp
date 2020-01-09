// pages/buy-kehu-detail/buy-kehu-detail.js
import {
  kehuApi
} from "../../api/kehu.js"
import {
  kehuControlApi
} from "../../api/kehuFollow.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    info: {},
    cusId: '',
    cusName: '',
    cusNo: '',
    lookPageNo: 1,
    followPageNo: 1,
    pageSize: 5,
    lookList: [],
    followList: [],
    lookLastPage: false,
    followLastPage: false,
  index: 0, //判断是不是详情,跟进,带看
  },
  changeTab(e) {
    let index = e.detail.index
    this.setData({
      index: index
    })
    if (index == 0) {
      this.getData()
    } else if (index == 1) {
      this.getFollowList()
    } else if (index == 2) {
      this.getLookList()
    }

  },
  openPhone(e) {
    let phone = e.currentTarget.dataset.phone;
    if (phone != null) {
      wx.makePhoneCall({
        phoneNumber: phone // 仅为示例，并非真实的电话号码
      })
    } else {
      wx.showToast({
        title: '暂无电话',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getData() {
    kehuApi.getRentDetail(this.data.cusId).then(res => {
      this.setData({
        info: res
      })
    })


  },

  getFollowList() {
    let model = {
      customerId: this.data.cusId,
      pageNo: this.data.followPageNo,
      pageSize: this.data.pageSize
    }
    wx.showLoading({
      title: '加载中',
    })
    return new Promise(ok => {
      kehuControlApi.getFollowList(model).then(res => {
        this.setData({
          followList: this.data.followPageNo == 1 ? res.list : this.data.followList.concat(res.list),
          followLastPage: res.lastPage
        })
        wx.hideLoading()
      })
    })
  },

  getLookList() {
    let model = {
      customerId: this.data.cusId,
      pageNo: this.data.lookPageNo,
      pageSize: this.data.pageSize,
      userId: this.data.userId,

    }

    wx.showLoading({
      title: '加载中',
    })

    return new Promise(ok => {
      kehuControlApi.getLookList(model).then(res => {
        this.setData({
          lookList: this.data.lookPageNo == 1 ? res.list : this.data.lookList.concat(res.list),
          lookLastPage: res.lastPage
        })
        wx.hideLoading()
      })
    })
  },

  goGenjin() {
    console.log(this.data.cusNo, this.data.cusName, this.data.cusId)
    wx.navigateTo({
      url: '/pages/write-genjin/write-genjin?cusNo=' + this.data.cusNo + "&cusName=" + this.data.cusName + "&cusId=" + this.data.cusId + "&buyRent=2&promotionType=2"
    })

  },
  goFeedback() {
    wx.navigateTo({
      url: '/pages/daikan-feedback/daikan-feedback?cusNo=' + this.data.cusNo + "&cusName=" + this.data.cusName + "&cusId=" + this.data.cusId + "&buyRent=2&promotionType=1",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options1", options)
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      cusId: options.cusId,
      cusName: options.cusName,
      cusNo: options.cusNo,
      userId: userInfo.userid,

    })

    this.getData()
    this.getFollowList()
    this.getLookList()

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
  loadInfiniteFollow() {

    let model = {
      customerId: this.data.cusId,
      pageNo: this.data.followPageNo,
      pageSize: this.data.pageSize
    }
    wx.showLoading({
      title: '加载中',
    })
    kehuControlApi.getFollowList(model).then(res => {


      let followPageNo = this.data.followPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          followList: this.data.followPageNo == 1 ? res.list : this.data.followList.concat(res.list),
          followPageNo: followPageNo,
          followLastPage: res.lastPage

        })
        this.loadInfiniteFollow()

      } else {
        wx.hideLoading()
      }
    })
  },

  loadInfiniteLook() {
    let model = {
      customerId: this.data.cusId,
      pageNo: this.data.lookPageNo,
      pageSize: this.data.pageSize,
      userId:this.data.userId,
    }
    kehuControlApi.getLookList(model).then(res => {

      let lookPageNo = this.data.lookPageNo + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          lookList: this.data.lookPageNo == 1 ? res.list : this.data.lookList.concat(res.list),
          lookPageNo: lookPageNo,
          lookLastPage: res.lastPage

        })
        this.loadInfiniteLook()

      } else {
        wx.hideLoading()
      }
    })
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