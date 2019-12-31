// pages/album/album.js

// import {
//   secondApi
// } from "../../api/second.js"
// import {
//   rentApi
// } from "../../api/rent.js"
// import {
//   buildApi
// } from "../../api/build.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeAct: 0,

    typeList: [{
      name: '全部',
      count: 0,
      imgs:[]
    }, {
      name: '观景图',
      count: 0,
        imgs: []

    }, {
      name: '小区图',
      count: 0,
        imgs: []

    }, {
      name: '鸟瞰图',
      count: 0,
        imgs: []

    }, {
      name: '配套设施',
      count: 0,
        imgs: []

    }, {
      name: '区位图',
      count: 0,
        imgs: []

    }, {
      name: '户型图',
      count: 0,
        imgs: []

    }]
  },
  thisType(e) {
    var thisIndex = e.currentTarget.dataset.index;
    console.log(thisIndex)
    this.setData({
      typeAct: thisIndex
    })
  },
  filterImage(imageList) {
    let typeList = this.data.typeList;
    typeList.forEach(item=>{
      imageList.forEach(item1=>{
        if (item.name == item1.picrkName){
          item.imgs.push(item1)
        }
      })
    })

    typeList[0].imgs = imageList
    this.setData({
      typeList: typeList
    })


  },
  onLoad: function(options) {
    let {
      id,
      type
    } = options;
       //  1楼盘 2二手房 3租房
    if (type == 2) {
      secondApi.getInfoById(id).then(res => {
        this.filterImage(res.houseImage)
      })
    }

    if (type == 3) {
      rentApi.getInfoById(id).then(res => {
        this.filterImage(res.houseImage)
      })
    }

    // if(type==1){
    //   buildApi.getImgs(id).then(res => {
    //     this.filterImage(res.houseImage)
    //   })
    // }



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