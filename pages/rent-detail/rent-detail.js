// pages/second-detail/second-detail.js
let app = getApp();
import {
  rentApi
} from "../../api/rent.js"
import {
  houseCollectApi
} from "../../api/houseCollect.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    isFocus: false,
    info: {},
    nowImgIndex: 1,

  },
  goGenjinRecord() {
    wx.navigateTo({
      url: '/pages/genjin-record/genjin-record?houseId=' + this.data.info.houseId + "&type=2",
    })
  },
  goGenjin() {
    wx.navigateTo({
      url: '/pages/genjin/genjin?houseId=' + this.data.info.houseId + '&houseName=' + this.data.info.houseName + '&houseNo=' + this.data.info.houseNo,
    })
  },
  toAlbum(e) {
    console.log("album", e)
    // var thisHouseId = e.currentTarget.dataset.id;
    //  1楼盘 2二手房 3租房
    wx.navigateTo({
      url: '/pages/album/album' + "?id=" + this.data.id + "&type=3",
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
    let houseId = this.data.info.houseId;
    let userId = this.data.userId;
    let isFocus = this.data.isFocus;
    let model = {
      userId: this.data.userId,
      houseId: houseId,
      sellOrRentId: this.data.id,
      type: 2
    }
    if (userId) { 
      if (isFocus) {
        houseCollectApi.cancelCollect(model).then(res => {
          wx.showToast({
            title: '取消成功',
          })
          this.setData({
            isFocus: false
          })
        })
      } else {
        houseCollectApi.addCollect(model).then(res => {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')

    this.setData({
      id: options.id,
      userId: userInfo.userid
    })


    let model = {
      userId: this.data.userId,
      id: options.id
    }

    rentApi.getDetailInfo(model).then(res => {
      this.setData({
        info: res,

      })
      
      if (this.data.userId) {
        this.setData({
          isFocus: res.isCollect == 1 ? true : false
        })

      }
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
      path: "/pages/second-detail/second-detail?id=" + this.data.id,
    }

  }
})