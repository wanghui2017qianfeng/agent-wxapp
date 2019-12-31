// pages/msg/msg.js
import {msgApi} from "../../api/msg.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userId: '',
    pageNo: 1,
    pageSize: 10,
    lastPage:false,
  },
  getList() {
    wx.showLoading({
      title: '正在加载',
    })
    let model = {
      userId: this.data.userId,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize

    }
    return new Promise(ok => {
      msgApi.getInfoList(model).then(res => {
        this.setData({
          list: this.data.pageNo == 1 ? res.list : this.data.list.concat(res.list),
          lastPage: res.lastPage
        })
        wx.hideLoading()
        ok(res)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(msgApi)
this.getList()
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
loadInfinite(){
  let model = {
    userId: this.data.userId,
    pageNo: this.data.pageNo,
    pageSize: this.data.pageSize

  }
    msgApi.getInfoList(model).then(res => {
      this.setData({
        lastPage: res.lastPage
      })

      let pageNo = this.data.pageNo + 1;
      if (!res.lastPage) {//不是最后一页
        this.setData({
          list: this.data.pageNo == 1 ? res.list : this.data.list.concat(res.list),
          showSearch: true,
          pageNo: pageNo
        })
        this.loadInfinite()

      } else {
        wx.hideLoading()
      }
    })

},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '正在加载',
    })

    this.loadInfinite()

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    let pageNo = this.data.pageNo;

    if (!this.data.lastPage) {//不是最后一页
      this.setData({
        pageNo: pageNo + 1,
      })

      this.getList().then(res => {
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