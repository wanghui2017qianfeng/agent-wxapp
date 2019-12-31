// pages/second-detail/second-detail.js
let app = getApp();
// import {
//   secondApi
// } from "../../api/second.js"
// import {
//   focusApi
// } from "../../api/focus.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    openid: '',
    isFocus: false,
    info: {},
    nowImgIndex: 1,
    tagList: ['学区房', '学区房', '学区房'],
    markers: [{
      iconPath: '../../assets/img/callout.png',
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 25,
      callout: {
        content: '',
        color: "#333333",
        bgColor: "#ffffff",
        padding: 5,
        display: 'ALWAYS',
        textAlign: "center"
      },

    }]
  },
  goGenjinRecord() {
    wx.navigateTo({
      url: '/pages/genjin-record/genjin-record',
    })
  },
  goGenjin() {
    wx.navigateTo({
      url: '/pages/genjin/genjin',
    })
  },
  toAlbum(e) {
    var thisHouseId = e.currentTarget.dataset.id;
    //  1楼盘 2二手房 3租房
    wx.navigateTo({
      url: '/pages/album/album' + "?id=" + thisHouseId + "&type=2",
    })
  },
  swiperChange(e) {
    // 滑动轮播
    this.setData({
      nowImgIndex: e.detail.current + 1
    })
  },
  //分享
  share() {
    console.log("分享")
    wx.showShareMenu({
      withShareTicket: true
    })

  },
  //关注
  focus(e) {
    let houseId = e.currentTarget.dataset.id;
    let openid = this.data.openid;
    let isFocus = this.data.isFocus;
    if (openid) {//有openid才可以关注,否则去登陆
      if (isFocus) {
        focusApi.cancelFocus(openid, 2, houseId).then(res => {
          wx.showToast({
            title: '取消成功',
          })
          this.setData({
            isFocus: false
          })
        })
      } else {
        focusApi.addFocus(openid, 2, houseId).then(res => {
          wx.showToast({
            title: '关注成功',
          })
          this.setData({
            isFocus: true
          })
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
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
  goMore() {
    wx.navigateTo({
      url: '/pages/more-detail/more-detail?id=' + this.data.id,
    })

  },
  goBuildDetail(e) {
    let id = e.currentTarget.dataset.periodid;
    wx.navigateTo({
      url: '/pages/build-detail/build-detail?stageId=' + id,
    })
  },
  lookSecondMore() {
    wx.navigateTo({
      url: '/pages/second/second',
    })
  },
  goSecondDetail(e) {

    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/second-detail/second-detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          openid: res.data.openid
        })
        secondApi.getInfoById(options.id, res.data.openid).then(res => {
          console.log("详细", res)
          this.setData({
            info: res,
            "markers[0].latitude": res.stageLatitude,
            "markers[0].longitude": res.stageLongitude,
            "markers[0].callout.content": `${res.houseName}\n 坐标:${res.stageLongitude}, ${res.stageLatitude}`
          })
          //openid存在才去判断是否已关注
          console.log(this.data.openid)
          if (this.data.openid) {
            this.setData({
              isFocus: res.isFollow
            })

          }
        })
      },
    })


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

    return {
      title: this.data.info.houseName,
      path: "/pages/rent-detail/rent-detail?id=" + this.data.id,
    }

  }
})