// pages/second/second.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSearch:true,
    areaTitle:'区域',
    offerText:'价格',
    bedroomText:'户型',
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
    orientList:[
      {name:'不限',value:''},
      {name:'东',value:4},
      { name: '南', value: 1 },
      { name: '西', value: 5 },
      { name: '北', value: 2 },
      { name: '东南', value: 8},
      { name: '东北', value: 7 },
      { name: '西南', value: 9 },
      { name: '西北', value: 10 },
      { name: '南北', value:3 },
    ],
    levelList:[
      { name: '不限', value: '' },
      {name:'A级',value:1},
      { name: 'B级', value: 2 },
      { name: 'C级', value: 3 },

    ],
    floorList:[
      { name: '不限', value: '' },
      { name: '非一层', value: 1 },
      { name: '非顶层', value: 2 },
    ],
    parkingList:[
      { name: '不限', value: '' },
      { name: '无', value: 0 },
      { name: '有', value: 1 },
    ],
    entrustList:[
      { name: '不限', value: '' },
      { name: '钥匙委托', value: 1 },
      { name: '授权委托', value:2 },
      { name: '实勘', value: 3 },

    ],
    otherList:[
      { name: '不限', value: '' },
      { name: '满两年', value: 1 },
      { name: '满五年', value: 2 },
      { name: '唯一', value: 3 },
      { name: '花园', value: 4 },
      { name: '阁楼', value: 5 },
      { name: '露台', value: 6 },
      { name: '地下室', value: 7 },

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

   
    paixuList:[
      {
        text:'默认排序',value:0,
      },
      {
        text: '录入时间', value: 1,
      }, {
        text: '价格从低到高', value: 2,
      }, {
        text: '价格从高到低', value: 3,
      }, {
        text: '面积从小到大', value:4,
      },
      {
        text: '面积从大到小', value:5,
      },

    ],
    areaList: [],
    circleList: [],
    offerActive:0,
    typeActive:0,
    bedActive:0,
    paixu:0,
    showContent: false,
    list:[0,0]
  },

  sure(){
    this.setData({
      showContent: false
    })
  },
  clear(){
    this.setData({
      showContent:false
    })

  },
  chooseBed(e){
    let item = e.currentTarget.dataset.item

    this.setData({
      bedActive: e.currentTarget.dataset.index,


    })
  },
  //
  chooseOffer(e){
    let item = e.currentTarget.dataset.item

    this.setData({
      offerActive: e.currentTarget.dataset.index,
     

    })
  },
  onPaixuClick(e) {
    let item = e.currentTarget.dataset.item
    console.log("item", item)
    this.setData({
      paixu: item.value + "", //必须是字符串
      showSearch: true

    })
  

 },
  onPaixuChange(e) {
    console.log("change", e)
    this.setData({
      paixu: e.detail
    });
  },
  //点击下拉菜单关闭search
  clickDrop(e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      showSearch: false,
      showContent:true,
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
        searchActive:4
      })
    }
  },

  openShow() {
    this.setData({
      showSearch: true,

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