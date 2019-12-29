//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [{
      src: '../../assets/img/ershoufang.png',
      text: '二手房',
      color: '#1ec84e',
    }, {
      src: '../../assets/img/ershou.png',
        text: '租房',
      color: '#ff8211',
    }, {
      src: '../../assets/img/kehu.png',
      text: '客户',
      color: '#239bfc',
    }, {
      src: '../../assets/img/daikan.png',
      text: '带看',
      color: '#4dd5b8',
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
