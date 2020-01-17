// pages/login/login.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    userName: ''

  },

  inputPhone(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })

  },
  goLogin(e) {
    var getUser = e.detail;
    var that = this;
  
        wx.login({
          success: (res00) => {
            wx.login({
              success: (res) => {
                if (res.code) {
                  let loginCode = res.code;
                  let appId = 'wx0f5bf6eab087ad79';
                  let secret = 'a30003246dedd23bb747003beb5a864a'
                  wx.request({
                    url: app.globalData.baseUrl + 'brokerInfo/authorize',
                    method: 'post', //请求方式
                    data: {
                      js_code: loginCode,
                   
                    },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                    success: (res1) => {
                      if (res1.data.result) {
                        console.log("经纪人登陆授权成功", res1.data.data.openid)
                        let openid = res1.data.data.openid;

                        wx.request({
                          url: app.globalData.baseUrl + 'brokerInfo/verify',
                          method: 'post', //请求方式
                          data: {
                            openid: openid,
                            password: that.data.password,
                            userName: that.data.userName
                          },
                          header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                          },
                          success: (res3) => {
                            if (res3.data.result) {
                              console.log("账号密码登陆成功", res3.data.data);
                              let userInfo={
                                userid: res3.data.data,
                                avatarUrl: getUser.userInfo.avatarUrl

                              }

                            //   let userInfo2 = res3.data.data;
                              wx.setStorage({
                              key: 'userInfo',
                              data: userInfo,
                            })
                       
                            wx.switchTab({
                              url: '/pages/my/my',
                            })

                            } else {
                              wx.showToast({
                                title: res3.data.errorMessage,
                                icon: 'none'
                              })
                            }



                          },
                          fail: (err3) => {
                            console.log("账号密码登陆失败", err3)
                          }
                        })
                      } else {
                        wx.showToast({
                          title: '未获得openid',
                          icon: 'none'
                        })
                      }










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
          }
        })
   






    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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
    return {
      title: '租售系统小程序',
      path: '/pages/login/login'
    }
  }
})