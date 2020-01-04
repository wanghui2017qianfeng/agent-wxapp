// pages/daikan-feedback/daikan-feedback.js
import {
  kehuControlApi
} from "../../api/kehuFollow.js"

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
    houseNames: [],
    houseIds: []
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
  del(e) {
    let index = e.currentTarget.dataset.index;
    console.log("index", index)
    let houseNames1 = this.data.houseNames;
    let houseIds1 = this.data.houseIds;
    let houseNames = [],
      houseIds = [];
    houseNames1.forEach((item, i) => {
      if (i != index) {
        houseNames.push(item)
        houseIds.push(houseIds1[i])
      }
    })
    // let houseNames = houseNames1.splice(index,1)
    // let houseIds = houseIds1.splice(index, 1)
    console.log(houseNames)
    this.setData({
      houseIds: houseIds,
      houseNames: houseNames
    })

  },

  save() {
    let model = {
      userId: this.data.userId,
      customerId: this.data.cusId,
      buyRent: this.data.buyRent,
      promotionType: this.data.promotionType,
      remark: this.data.remark,
      promotionMethods: 0,
      houseIds: this.data.houseIds,
      houseNames: this.data.houseNames
    }

    kehuControlApi.addFollow(model).then(res => {
      wx.showToast({
        title: '保存成功',
        icon: 'none'
      })
      this.setData({
        remark: '',
        houseIds:[],
        houseNames:[]
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("houseNames1111111111", this.data.houseNames)

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
    console.log("houseNames2222", this.data.houseNames)

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