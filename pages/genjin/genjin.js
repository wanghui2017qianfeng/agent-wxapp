// pages/genjin/genjin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canSelect: false,

    option1:[
      {
        text:"拜访",value:0
      },
      {
        text: "电话", value: 1
      },
      {
        text: "微信", value: 2
      },
       {
        text: "短信", value: 3
      }, {
        text: "邮箱", value:4
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
      needs: need.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})