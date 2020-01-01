// pages/my/my.js
const app = getApp()
import {
  msgApi
} from "../../api/msg.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userId: '',
    info: {}
  },
  getData() {
    msgApi.getMyInfo(this.data.userId).then(res => {
      this.setData({
        info: res
      })
    })
  },
  goLogin(e) {
    var getUser = e.detail;
    var that = this;
    wx.login({
      success: (res) => {
        console.log("登录")
        if (res.code) {
          let loginCode = res.code
          wx.request({
            url: app.globalData.baseUrl + 'brokerInfo/authorize',
            method: 'post', //请求方式
            data: {
              js_code: loginCode,
              encrypted: getUser.encryptedData,
              iv: getUser.iv
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res1) => {
              console.log("经纪人登陆授权成功", res1.data.data.openid)
              let openid = res1.data.data.openid
              wx.request({
                url: app.globalData.baseUrl + 'brokerInfo/findByOpenId',
                method: 'post', //请求方式
                data: {
                  openid: openid
                },
                success: (res2) => {
                  console.log("经纪人信息", res2)
                },
                fail: (err2) => {
                  console.log("经纪人信息失败", err2)
                }
              })

            },
            fail: (err) => {
              console.log("经纪人登陆授权失败", err)
            }
          })
        }

      },
      fail: (err) => {
        console.log("登录失败", err)
      }

    })




    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })

  },
  goMyFoucsHouse() {
    wx.navigateTo({
      url: '/pages/my-house/my-house',
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