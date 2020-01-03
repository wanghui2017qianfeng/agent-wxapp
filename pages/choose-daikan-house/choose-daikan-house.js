// pages/choose-daikan-house/choose-daikan-house.js
import {
  kehuControlApi
} from "../../api/kehuFollow.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNo: 1,
    pageSize: 5,
    condition: '',
    userId: '',
    isSell: '',
    lastPage: false,
  },
  goSearch(){
// wx.navigateTo({
//   url: '/pages/search/search?type=',
// })
  },
  submit(){
    this.houseItem.submit()

  },

  getData() {
    let model = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      userId: this.data.userId,
      condition: this.data.condition,

    }

    wx.showLoading({
      title: '正在加载',
    })

    if (this.data.isSell == 1) { //获取出售资源
      return new Promise(ok => {
        kehuControlApi.getSecondPage(model).then(res => {
          this.setData({
            list: this.data.pageNo == 1 ? res.list : this.data.list.concat(res.list),
            lastPage: res.lastPage
          })

          wx.hideLoading()
          ok(res)
        })
      })
    } else { //获取出租资源
      return new Promise(ok => {

        kehuControlApi.getRentPage(model).then(res => {
          this.setData({
            list: this.data.pageNo == 1 ? res.list : this.data.list.concat(res.list),
            lastPage: res.lastPage
          })

          wx.hideLoading()
          ok(res)
        })
      })
    }



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('userInfo');
    console.log("userInfo", userInfo)
    this.setData({
      userId: userInfo.userid,
      isSell: options.isSell
    })
    this.getData()
    this.houseItem = this.selectComponent('#houseItem');
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
  loadInfinite() {
    let model = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      userId: this.data.userId,
      condition: this.data.condition,

    }

    wx.showLoading({
      title: '正在加载',
    })

    if (this.data.isSell == 1) { //获取出售资源
      kehuControlApi.getSecondPage(model).then(res => {
        let pageNo = this.data.pageNo + 1;
        if (!res.lastPage) { //不是最后一页
          this.setData({
            list: this.data.pageNo == 1 ? res.list : this.data.list.concat(res.list),
            pageNo: pageNo,
            lastPage: res.lastPage

          })
          this.loadInfinite()

        } else {
          wx.hideLoading()
        }
      })
    } else { //获取出租资源

      kehuControlApi.getRentPage(model).then(res => {
        let pageNo = this.data.pageNo + 1;
        if (!res.lastPage) { //不是最后一页
          this.setData({
            list: this.data.pageNo == 1 ? res.list : this.data.list.concat(res.list),
            pageNo: pageNo,
            lastPage: res.lastPage

          })
          this.loadInfinite()

        } else {
          wx.hideLoading()
        }
      })
    }


  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadInfinite()

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageNo = this.data.pageNo;

    if (!this.data.lastPage) { //不是最后一页
      this.setData({
        pageNo: pageNo + 1,
      })

      this.getData().then(res => {
        if (res.list.length == 0) {
          wx.showToast({
            title: '没有更多啦',
            icon: 'none',
            duration: 1000
          })
        }
      })
    } else {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})