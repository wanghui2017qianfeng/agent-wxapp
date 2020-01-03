// pages/daikan-feedback/daikan-feedback.js
import { kehuControlApi } from "../../api/kehuFollow.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cusName: '',
    cusNo: '',
    cusId: '',
    userId: '',
    remark: "",
    buyRent: '', //客户类型 买卖1 租赁2
    promotionType: '', //跟进类型 1带看 2跟进
    houseNames:[],
    houseIds:[]
  },

  inputRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  chooseHouse() {
    wx.navigateTo({
      url: '/pages/choose-daikan-house/choose-daikan-house?isSell=1',
    })
  },
  del() {

  },

  save() {
    let model = {
      userId: this.data.userId,
      customerId: this.data.cusId,
      buyRent: this.data.buyRent,
      promotionType: this.data.promotionType,
      remark: this.data.remark,
      promotionMethods:0,
    }

    kehuControlApi.addFollow(model).then(res => {
      wx.showToast({
        title: '保存成功',
        icon: 'none'
      })
      this.setData({
        remark: ''
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      cusName: options.cusName,
      cusNo: options.cusNo,
      cusId: options.cusId,
      buyRent: options.buyRent,
      promotionType: options.promotionType,
      userId: userInfo.userid,
    })
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