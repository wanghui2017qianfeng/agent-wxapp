// pages/second/second.js
import {
  secondApi
} from "../../api/second.js"
import {
  cityApi
} from "../../api/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    houseName: '',
    areaId: '',
    circleId: '',
    startOffer: '',
    endOffer: '',
    bedroom: '',
    startConstructionArea: '',
    endConstructionArea: '',
    toward: '',
    level: '',
    decorate: '',
    floor: '',
    parking: '',
    entrust: '',
    other: '',
    sort: '',
    pageNum: 1,
    pageSize: 5,

    showSearch: true,
    areaTitle: '区域',
    offerText: '价格',
    bedroomText: '户型',
    offerList: [{
        text: '不限',
        value: 1,
        startOffer: '',
        endOffer: ''
      },
      {
        text: '50万以下',
        value: 2,
        startOffer: 0,
        endOffer: 50
      },
      {
        text: '50-100万',
        value: 3,
        startOffer: 50,
        endOffer: 100
      },
      {
        text: '100-150万',
        value: 4,
        startOffer: 100,
        endOffer: 150
      },
      {
        text: '150-200万',
        value: 5,
        startOffer: 300,
        endOffer: 200
      },
      {
        text: '200-300万',
        value: 6,
        startOffer: 200,
        endOffer: 300
      },
      {
        text: '300-500万',
        value: 7,
        startOffer: 300,
        endOffer: 500
      },
      {
        text: '500-1000万',
        value: 8,
        startOffer: 500,
        endOffer: 1000
      },
      {
        text: '1000-1500万',
        value: 9,
        startOffer: 1000,
        endOffer: 1500
      },
      {
        text: '1500万以上',
        value: 10,
        startOffer: 1500,
        endOffer: ''
      }
    ],
    bedroomList: [{
        text: '不限',
        value: ''
      },
      {
        text: '1室',
        value: 1
      },
      {
        text: '2室',
        value: 2
      },
      {
        text: '3室',
        value: 3
      },
      {
        text: '4室',
        value: 4
      },
      {
        text: '5室',
        value: 5
      },
      {
        text: '5室及以上',
        value: 6
      }
    ],
    coverList: [{
        name: '不限',
        startConstructionArea: '',
        endConstructionArea: ''

      },
      {
        name: '50平以内',
        startConstructionArea: 0,
        endConstructionArea: 50
      },
      {
        name: '50-70平',
        startConstructionArea: 50,
        endConstructionArea: 70
      },
      {
        name: '70-90平',
        startConstructionArea: 70,
        endConstructionArea: 90
      },
      {
        name: '90-110平',
        startConstructionArea: 90,
        endConstructionArea: 110
      },
      {
        name: '110-130平',
        startConstructionArea: 110,
        endConstructionArea: 130
      },
      {
        name: '130-150平',
        startConstructionArea: 130,
        endConstructionArea: 150
      },
      {
        name: '150-200平',
        startConstructionArea: 150,
        endConstructionArea: 200
      },

      {
        name: '200平以上',
        startConstructionArea: 200,
        endConstructionArea: ''
      }

    ],
    orientList: [{
        name: '不限',
        value: ''
      },
      {
        name: '东',
        value: 4
      },
      {
        name: '南',
        value: 1
      },
      {
        name: '西',
        value: 5
      },
      {
        name: '北',
        value: 2
      },
      {
        name: '东南',
        value: 8
      },
      {
        name: '东北',
        value: 7
      },
      {
        name: '西南',
        value: 9
      },
      {
        name: '西北',
        value: 10
      },
      {
        name: '南北',
        value: 3
      },
    ],
    levelList: [{
        name: '不限',
        value: ''
      },
      {
        name: 'A级',
        value: 1
      },
      {
        name: 'B级',
        value: 2
      },
      {
        name: 'C级',
        value: 3
      },

    ],
    floorList: [{
        name: '不限',
        value: ''
      },
      {
        name: '非一层',
        value: 1
      },
      {
        name: '非顶层',
        value: 2
      },
    ],
    parkingList: [{
        name: '不限',
        value: ''
      },
      {
        name: '无',
        value: 0
      },
      {
        name: '有',
        value: 1
      },
    ],
    entrustList: [{
        name: '不限',
        value: ''
      },
      {
        name: '钥匙委托',
        value: 1
      },
      {
        name: '授权委托',
        value: 2
      },
      {
        name: '实勘',
        value: 3
      },

    ],
    otherList: [{
        name: '不限',
        value: ''
      },
      {
        name: '满两年',
        value: 1
      },
      {
        name: '满五年',
        value: 2
      },
      {
        name: '唯一',
        value: 3
      },
      {
        name: '花园',
        value: 4
      },
      {
        name: '阁楼',
        value: 5
      },
      {
        name: '露台',
        value: 6
      },
      {
        name: '地下室',
        value: 7
      },

    ],

    decorateList: [{
        name: '不限',
        decorate: "",

      },
      {
        name: '毛坯',
        decorate: 1
      },
      {
        name: '简装',
        decorate: 2
      },
      {
        name: '精装',
        decorate: 3
      },
      {
        name: '豪装',
        decorate: 4
      },



    ],


    paixuList: [{
        text: '默认排序',
        value: 0,
      },
      {
        text: '录入时间',
        value: 1,
      }, {
        text: '价格从低到高',
        value: 2,
      }, {
        text: '价格从高到低',
        value: 3,
      }, {
        text: '面积从小到大',
        value: 4,
      },
      {
        text: '面积从大到小',
        value: 5,
      },

    ],

    areaList: [],
    circleList: [],
    offerActive: 0,
    typeActive: 0,
    bedActive: 0,
    paixu: 0,
    showContent: false,
    list: [],


    sortActNum: 0,
    areaActive: 0, //面积
    towardActive: 0,
    decorateActive: 0,
    levelActive: 0,
    floorActive: 0,
    parkActive: 0,
    entrustActive: 0,
    otherActive: 0,
    lastPage: false,
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search?type=1',
    })
  },
  chooseEntrust(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("委托", item, index)
    this.setData({
      entrustActive: index,
      entrust: item.value,
    })
  },

  chooseOther(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("其他", item, index)
    this.setData({
      otherActive: index,
      other: item.value
    })
  },

  choosePark(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("停车", item, index)
    this.setData({
      parkActive: index,
      parking: item.value
    })
  },

  chooseCover(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("面积", item, index)
    this.setData({
      areaActive: index,
      startConstructionArea: item.startConstructionArea,
      endConstructionArea: item.endConstructionArea
    })
  },
  chooseToward(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("朝向", item, index)
    this.setData({
      towardActive: index,
      toward: item.value
    })
  },
  chooseLevel(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("等级", item, index)
    this.setData({
      levelActive: index,
      level: item.value,
    })
  },
  chooseDecorate(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("装修", item, index)
    this.setData({
      decorateActive: index,
      decorate: item.value
    })
  },
  chooseFloor(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset;
    console.log("楼层", item, index)
    this.setData({
      floorActive: index,
      floor: item.value
    })
  },










  goDetail(e) {
    console.log("二手房", e.detail)
    wx.navigateTo({
      url: '/pages/second-detail/second-detail?id=' + e.detail,
    })
  },
  sure() {
    this.setData({
      showContent: false,
      pageNum: 1
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getData()
  },

  chooseBed(e) {
    let item = e.currentTarget.dataset.item
    console.log("居室", item)
    this.setData({
      bedActive: e.currentTarget.dataset.index,
      bedroom: item.value
    })
  },
  //
  chooseOffer(e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      offerActive: e.currentTarget.dataset.index,
      startOffer: item.startOffer,
      endOffer: item.endOffer,
    })
  },


  //点击下拉菜单关闭search
  clickDrop(e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      showSearch: false,
      showContent: true,
    })

    if (name == 'offer') {
      this.setData({
        searchActive: 1
      })

    }
    if (name == 'more') {
      this.setData({
        searchActive: 3
      })
    }
    if (name == 'bedroom') {
      this.setData({
        searchActive: 2
      })
    }
    if (name == 'area') {
      this.setData({
        searchActive: 0
      })
    }
    if (name == 'paixu') {
      this.setData({
        searchActive: 4
      })
    }
  },

  openShow() {
    this.setData({
      showSearch: true,

    })
  },
  tabThisPaixu(e) {
    let {
      item,
      index
    } = e.currentTarget.dataset
    console.log("点击", item, index)
    this.setData({
      sortActNum: index,
      sort: item.value,
      showContent: false,
      pageNum: 1
    })

    wx.showLoading({
      title: '正在加载',
    })

    this.getData()

  },
  clearPrice() {
    this.setData({
      startOffer: '',
      endOffer: '',
      showContent: false,
      offerActive:0,
    })
  },
  clearBed() {
    this.setData({
      bedroom: '',
      bedActive: 0,
      showContent: false,
    })

  },
  clearMore() {
    this.setData({
      areaActive: 0, //面积
      towardActive: 0,
      decorateActive: 0,
      levelActive: 0,
      floorActive: 0,
      parkActive: 0,
      entrustActive: 0,
      otherActive: 0,



      startConstructionArea: '',
      endConstructionArea: '',
      toward: '',
      level: '',
      decorate: '',
      floor: '',
      parking: '',
      entrust: '',
      other: '',
      showContent: false,

    })

  },
  //选择区
  tabThisArea(e) {
    console.log("区域")
    let thisIndex = e.currentTarget.dataset.index;
    let thisText = e.currentTarget.dataset.text;
    let areaId = e.currentTarget.dataset.id;
    this.setData({
      areaId: areaId,
      // areaTitle:text,
      areaActNum: thisIndex,
      circleActNum: ''

    })
    this.getCircleList(areaId)
  },
  //选择商圈
  tabThisCircle(e) {
    console.log("商圈")

    let thisIndex = e.currentTarget.dataset.index;
    let thisText = e.currentTarget.dataset.text;
    let circleId = e.currentTarget.dataset.id;
    this.setData({
      circleId: circleId,
      areaTitle: thisText,
      circleActNum: thisIndex,
      showContent: false,
      pageNum: 1
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getData()
  },
  getData() {
    let model = {
      userId: this.data.userId,
      houseName: this.data.houseName ? this.data.houseName:'',
      areaId: this.data.areaId,
      circleId: this.data.circleId,
      startOffer: this.data.startOffer,
      endOffer: this.data.endOffer,
      bedroom: this.data.bedroom,
      startConstructionArea: this.data.startConstructionArea,
      endConstructionArea: this.data.endConstructionArea,
      toward: this.data.toward,
      level: this.data.level,
      decorate: this.data.decorate,
      floor: this.data.floor,
      parking: this.data.parking,
      entrust: this.data.entrust,
      other: this.data.other,
      sort: this.data.sort,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    console.log("model", model)
    // wx.showLoading({
    //   title: '正在加载',
    // })
    return new Promise(ok => {
      secondApi.getPage(model).then(res => {
        console.log('结果', res)
        this.setData({
          list: this.data.pageNum == 1 ? res.list : this.data.list.concat(res.list),
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
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userId: userInfo.userid,
      houseName: options.houseName
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getCircleList(areaId) {
    cityApi.getCircle(areaId).then(res => {
      console.log("商圈列表", res)
      res.unshift({
        name: '不限',
        id: ''
      })
      this.setData({
        circleList: res,
      })
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userId: userInfo.userid
    })

    let city = wx.getStorageSync('city');

    cityApi.getArea(city.id).then(res => {
      console.log('q区域', res)
      res.unshift({
        name: '不限',
        id: ''
      })
      this.setData({
        cityId: city.id,
        areaList: res
      })
      this.getCircleList(res[0].id)
      wx.showLoading({
        title: '正在加载',
      })
      this.getData()
    })
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
      houseName: this.data.houseName,
      areaId: this.data.areaId,
      circleId: this.data.circleId,
      startOffer: this.data.startOffer,
      endOffer: this.data.endOffer,
      bedroom: this.data.bedroom,
      startConstructionArea: this.data.startConstructionArea,
      endConstructionArea: this.data.endConstructionArea,
      toward: this.data.toward,
      level: this.data.level,
      decorate: this.data.decorate,
      floor: this.data.floor,
      parking: this.data.parking,
      entrust: this.data.entrust,
      other: this.data.other,
      sort: this.data.sort,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    wx.showLoading({
      title: '正在加载',
    })
    secondApi.getPage(model).then(res => {
      let pageNum = this.data.pageNum + 1;
      if (!res.lastPage) { //不是最后一页
        this.setData({
          list: this.data.pageNum == 1 ? res.list : this.data.list.concat(res.list),
          pageNum: pageNum,
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
    this.loadInfinite()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageNum = this.data.pageNum;

    if (!this.data.lastPage) { //不是最后一页
      this.setData({
        pageNum: pageNum + 1,
      })
      wx.showLoading({
        title: '正在加载',
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