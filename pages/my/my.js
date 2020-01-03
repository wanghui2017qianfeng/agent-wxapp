// pages/my/my.js
const app = getApp()
import {
  msgApi
} from "../../api/msg.js"
import {cityApi} from "../../api/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userId: '',
    info: {},
    avatar:'',
    openid: '',
    cityList:[]
  },
  getData() {
    msgApi.getMyInfo(this.data.userId).then(res => {
      this.setData({
        info: res
      })
    })
  },
  logout(){
    this.setData({
      isLogin:false,
      info:{},

    })
  wx.setStorage({
    key: 'userInfo',
    data: {},
  })
  },
  goLogin(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  goMyFoucsHouse() {
    wx.navigateTo({
      url: '/pages/my-focus-house/my-focus-house',
    })
  },
  goMyFoucsKehu() {
    wx.navigateTo({
      url: '/pages/my-focus-kehu/my-focus-kehu',
    })
  },
  //我的房源资源
  goMyHouse() {
    wx.navigateTo({
      url: '/pages/my-house/my-house',
    })
  },
  //我的客户资源
  goMyKehu() {
    wx.navigateTo({
      url: '/pages/my-kehu/my-kehu',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
getAllCity(){
  cityApi.getAllCity().then(res=>{
    console.log("res",res)
    this.setData({
      cityList:res
    })
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
    let that = this;

    let userInfo = wx.getStorageSync('userInfo')
    console.log("my页面userInfo", userInfo)
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        let userInfo = res.data
        console.log("结果", userInfo.userid)

        // if (userInfo && userInfo.openid)
          that.setData({
         
            avatar: userInfo.avatarUrl,
            phone: userInfo.phoneNumber,
            openid: userInfo.openid,
            userId: userInfo.userid,
            isLogin: true
          })
        console.log("userId", that.data.userId)
    that.getData()


      },
      fail: (err) => {
        console.log("失败", err)
      }
    })

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