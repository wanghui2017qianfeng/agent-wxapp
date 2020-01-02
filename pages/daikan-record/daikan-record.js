// pages/second/second.js
import { kehuControlApi} from "../../api/kehuFollow.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSearch: true,
    dateTitle: '日期',
    typeTitle: '类型',
    typeIndex:0,
    userId:'',
    buyOrRent:1,
    pageNo:1,
    pageSize:5,
    startDate:'',
    endDate:''

  },
  goDaikanDetail(){
    wx.navigateTo({
      url: '/pages/daikan-detail/daikan-detail',
    })

  },
  sure() {
    this.setData({
      showContent: false
    })
  },
  clear() {
    this.setData({
      showContent: false
    })

  },
  chooseType(e) {
    let index = e.currentTarget.dataset.index

    this.setData({
      typeIndex: e.currentTarget.dataset.index,
    })
  },
 

 
  clickDrop(e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      showSearch: false,
      showContent: true,
    })

    if (name == 'type') {
      this.setData({
        searchActive: 1
      })

    }
  
    if (name == 'date') {
      this.setData({
        searchActive: 0
      })
    }
  
  },

  openShow() {
    this.setData({
      showSearch: true,

    })
  },
  getData(){
    let model={
      userId:this.data.userId,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      buyOrRent: this.data.buyOrRent,



    }
    kehuControlApi.geLookRecord(model).then(res=>{

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo= wx.getStorageSync('userInfo');
    this.setData({
      userId:userInfo.userid,
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