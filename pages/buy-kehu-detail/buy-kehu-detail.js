// pages/buy-kehu-detail/buy-kehu-detail.js
import {
  kehuApi
} from "../../api/kehu.js"
import {
  kehuControlApi
} from "../../api/kehuFollow.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    cusId: '',
    cusName:'',
    cusNo:'',
    lookPageNo: 1,
    followPageNo: 1,
    pageSize: 5,
    lookList: [],
    followList: [],
    lookLastPage:false,
    followLastPage:false
  },
  openPhone(e){
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
  getData() {
    kehuApi.getBuyDetail(this.data.cusId).then(res => {
      this.setData({
        info: res
      })
    })


  },

  getFollowList() {
    let model = {
      customerId: this.data.cusId,
      pageNo: this.data.followPageNo,
      pageSize: this.data.pageSize
    }
    kehuControlApi.getFollowList(model).then(res => {
      this.setData({
        followList: this.data.followPageNo == 1 ? res.list : this.data.followList.concat(res.list),
        followLastPage: res.lastPage
      })
    })
  },

  getLookList() {
    let model = {
      customerId: this.data.cusId,
      pageNo: this.data.lookPageNo,
      pageSize: this.data.pageSize
    }
    kehuControlApi.getLookList(model).then(res => {
      this.setData({
        lookList: this.data.lookPageNo == 1 ? res.list : this.data.lookList.concat(res.list),
        lookLastPage: res.lastPage
      })
    })
  },

  goGenjin() {
    console.log(this.data.cusNo, this.data.cusName, this.data.cusId)
    wx.navigateTo({
      url: '/pages/write-genjin/write-genjin?cusNo=' + this.data.cusNo + "&cusName=" + this.data.cusName + "&cusId=" + this.data.cusId +"&buyRent=1&promotionType=2"
    })

  },
  goFeedback() {
    wx.navigateTo({
      url: '/pages/daikan-feedback/daikan-feedback?cusNo=' + this.data.cusNo + "&cusName=" + this.data.cusName + "&cusId=" + this.data.cusId +"&buyRent=1&promotionType=1",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options1",options)
    this.setData({
      cusId: options.cusId,
      cusName:options.cusName,
      cusNo:options.cusNo
    })

    this.getData()
    this.getFollowList()
    this.getLookList()

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