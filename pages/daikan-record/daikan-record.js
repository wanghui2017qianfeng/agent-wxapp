// pages/second/second.js
import {
  kehuControlApi
} from "../../api/kehuFollow.js"
import {
  formatTime
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSearch: true,
    dateTitle: '日期',
    typeTitle: '类型',
    typeIndex: 0,
    userId: '',
    buyOrRent: '',
    pageNo: 1,
    pageSize: 5,
    startDate: '',
    endDate: '',
    showStart: false,
    showEnd: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    miniDate: new Date(2018, 1, 1).getTime(),
    list: [],
    lastPage:false,
  },
  openStart() {
    this.setData({
      showStart: true,
    })
  },
  openEnd() {
    this.setData({
      showEnd: true,
    })
  },
  onClose() {
    this.setData({
      showStart: false,
      showEnd: false,
    })
  },
  onInputStart(event) {
    this.setData({
      currentDate: event.detail,
      startDate: formatTime(event.detail),
      showStart: false

    });


  },
  onInputEnd(event) {
    this.setData({
      currentDate1: event.detail,
      endDate: formatTime(event.detail),
      showEnd: false
    });


  },
  goDaikanDetail(e) {
    wx.navigateTo({
      url: '/pages/daikan-detail/daikan-detail?id=' + e.currentTarget.dataset.id,
    })

  },
  sure() {
    this.setData({
      showContent: false
    })
    this.getData()
  },
  clearDate() {
    this.setData({
      showContent: false,
      startDate: '',
      endDate: ''
    })
    this.getData()
  },
  clearType() {
    this.setData({
      showContent: false,
      buyOrRent: '',
    })
    this.getData()

  },
  chooseType(e) {
    // 1是购看 2是租看
    let index = e.currentTarget.dataset.index
    this.setData({
      typeIndex: e.currentTarget.dataset.index,
      buyOrRent: index
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
  getData() {
    let model = {
      userId: this.data.userId,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      buyOrRent: this.data.buyOrRent,
    }
    return new Promise(ok => {
      kehuControlApi.geLookRecord(model).then(res => {
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
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userId: userInfo.userid,
    })

    this.getData()

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
      userId: this.data.userId,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      buyOrRent: this.data.buyOrRent,
    }
  
      kehuControlApi.geLookRecord(model).then(res => {
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




  },  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '正在加载',
    })
    this.loadInfinite();
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