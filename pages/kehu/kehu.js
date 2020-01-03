// pages/kehu/kehu.js
import {kehuApi} from "../../api/kehu.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    buyList:[],
    rentList:[],
    cusName:'',
    buyPageNo:1,
    pageSize:5

  },
  goDetailBuy(e) {
    console.log("去买卖客户详情",e.detail)
    wx.navigateTo({
      url: '/pages/buy-kehu-detail/buy-kehu-detail?cusId='+e.detail.id+"&cusName="+e.detail.name+"&cusNo="+e.detail.cusno,
    })
  },
  goDetailRent(e) {
    wx.navigateTo({
      url: '/pages/rent-kehu-detail/rent-kehu-detail',
    })
  },

  getBuyList(){
    let model={
      cusName: this.data.cusName,
      pageNo: this.data.buyPageNo,
      buyOrRent:1,
      pageSize: 5,
      userId:this.data.userId
    }

    kehuApi.getPage(model).then(res=>{
      this.setData({
        buyList:res.list
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

    this.getBuyList()
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