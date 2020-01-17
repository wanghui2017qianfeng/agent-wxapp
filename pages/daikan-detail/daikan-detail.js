// pages/daikan-detail/daikan-detail.js

import {
  kehuControlApi
} from "../../api/kehuFollow.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    userId:'',
    info:{
      cusName:'匹配',
      cusNo:'112233838',
      createStore:'新恒花园店',
      createPerson:'张思',
      buyOrRent:1,
      createTime:'2019-09-09',
      cusBedroomName:'1-2',
      cusPriceName:'100-2000',
      cusUsedName:'住宅',
      cusAreaName:'200-300',
      context:'测试时是',
      houseImg:'../../assets/img/img1.png'
    }

  },
getData(){
  let model={
    id:this.data.id
  }
  kehuControlApi.geLookDetail(model).then(res=>{
    this.setData({
      info:res
    })
  })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      id:options.id,
      userId:userInfo.userid
    })
    this.getData()

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