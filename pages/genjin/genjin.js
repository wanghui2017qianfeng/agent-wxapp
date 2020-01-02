// pages/genjin/genjin.js
import {
  houseFollowApi
} from "../../api/houseFollow.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canSelect: false,
    userId: '',
    type: '',
    houseId: '',
    remark: '',
    houseName:'',
    houseNo:'',
    option1: [{
        text: "拜访",
        value: 1
      },
      {
        text: "电话",
        value: 2
      },
      {
        text: "微信",
        value: 3
      },
      {
        text: "短信",
        value: 4
      }, {
        text: "邮箱",
        value: 5
      }, {
        text: "其他",
        value: 6
      }
    ]

  },
  openSelect() {
    let select = this.data.canSelect;
    this.setData({
      canSelect: !select,
    })

  },
  chooseNeed(e) {
    let need = e.currentTarget.dataset.need;
    this.setData({
      canSelect: false,
      needsText: need.text,
      needs: need.value,
      type:need.value
    })

  },
  inputRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  save() {
    let model = {
      userId: this.data.userId,
      houseId: this.data.houseId,
      type: this.data.type,
      remark: this.data.remark,
    }
    houseFollowApi.addFollow(model).then(()=>{
      wx.showToast({
        title: '保存成功',
        icon:'none'
      })
      this.setData({
        remark:'',
        needsText:'',
        needs: '',
        type: ''
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('userInfo')

    this.setData({
      houseId: options.houseId,
      houseName:options.houseName,
      houseNo:options.houseNo,
      userId: userInfo.userid
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