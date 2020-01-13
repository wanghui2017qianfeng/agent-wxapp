// pages/maifangchuzu/maifangchuzu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
	canToIndex: false,
    array:['出售','出租'],
    index:0,
    moblie:null, //手机号
    call:1, //称呼
    surname:'', //姓名
    business:1, //需求
    expected_price:null, //期望价格
    residential_name:'', //小区名称
    residential_address:'', //具体地址
    tipShow:false, //提交成功后的提示

	},
	backToindex: function () {
		wx.switchTab({
			url: '../index/index'
		})
	},
  //提交信息
  entrustBtn(){
    let openid = wx.getStorageSync('openid')
    if (this.data.moblie != null){
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.moblie))) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
      }else{
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        var _this = this;
        wx.request({
          url: app.globalData.baseUrl + 'index.php?r=houseinfo/user_business',
          method: 'POST',
          data: {
            city: app.globalData.city,
            Openid: openid,
            moblie: this.data.moblie,
            surname: this.data.surname,
            call: this.data.call,
            business: this.data.business,
            expected_price: this.data.expected_price,
            residential_name: this.data.residential_name,
            residential_address: this.data.residential_address
          },
          dataType: 'json',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data.Code)
            _this.onLoad()
            _this.setData({
              index: 0,
              moblie: null, //手机号
              call: 1, //称呼
              surname: '', //姓名
              business: 1, //需求
              expected_price: null, //期望价格
              residential_name: '', //小区名称
              residential_address: '', //具体地址
            })
            wx.hideLoading()
            if(res.data.Code == 10000){
                _this.setData({
                  tipShow:true
                })
                setTimeout(function(){
                  _this.setData({
                    tipShow: false
                  })
                 
                },3000)
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    }else{
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
    }
  },
  //具体地址
  residentialAddressInput(e){
    this.setData({
      residential_address: e.detail.value
    })
  },
  //小区名称
  residentialNameInput(e){
    this.setData({
      residential_name: e.detail.value
    })
  },
  //期望价格
  expectedPriceInput(e){
    this.setData({
      expected_price: parseFloat(e.detail.value)
    })
  },
  //需求
  bindPickerChange(e){
    this.setData({
      business: parseInt(e.detail.value) + 1,
      index: e.detail.value
    })
  },
  //称呼
  callSelect(e){
    this.setData({
      call: parseInt(e.currentTarget.dataset.call)
    })
  },
  //姓名
  surnameInput(e){
    this.setData({
      surname:e.detail.value
    })
  },
  //手机号
  moblieInput(e){
    // console.log(e)
    this.setData({
      moblie: parseInt(e.detail.value)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log('1========1')
	  if (options.homeinfo == 1) {
		  this.setData({
			  canToIndex: true
		  })
	  }
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
		  title: "卖房出租",
		  desc: "卖房出租",
		  path: '/' + this.route + '?homeinfo=1' // 路径，传递参数到指定页面。
	  }
  }
})