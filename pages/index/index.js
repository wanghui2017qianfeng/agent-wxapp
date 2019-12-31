//index.js
//获取应用实例
const app = getApp()
import {msgApi} from "../../api/msg.js"
Page({
  data: {
    userId:'',
    bobaoInfo:{},//播报
    myInfo:{},//顶部业绩
    infoList:[],//底部四个信息
    list: [{
      src: '../../assets/img/ershoufang.png',
      text: '二手房',
      color: '#1ec84e',
    }, {
      src: '../../assets/img/ershou.png',
        text: '租房',
      color: '#ff8211',
    }, {
      src: '../../assets/img/kehu.png',
      text: '客户',
      color: '#239bfc',
    }, {
      src: '../../assets/img/daikan.png',
      text: '带看',
      color: '#4dd5b8',
    }]
  },
  goBuild(e) {
    let index = e.currentTarget.dataset.index;
    if (index == 0) { //二手房
      wx.navigateTo({
        url: '/pages/second/second',
      })
    }

    if (index == 1) { //租房
      wx.navigateTo({
        url: '/pages/rent/rent',
      })
    }

    if (index == 2) { //客户
      wx.navigateTo({
        url: '/pages/kehu/kehu',
      })
    }

    if (index == 3) { //带看
      wx.navigateTo({
        url: '/pages/daikan-record/daikan-record',
      })
    }

  },
  getBobao(){
    msgApi.getBobao().then(res => {
      this.setData({
        bobaoInfo: res
      })
    })
  },
  getFour() {
    msgApi.getFour(this.data.userId).then(res => {
      this.setData({
        infoList: res
      })
    })
  },
  getMyInfo() {
    msgApi.getMyInfo(this.data.userId).then(res => {
      this.setData({
        myInfo: res
      })
    })
  },
  onLoad: function () {
   this.getBobao()
    this.getFour()
    this.getMyInfo()
  
  },
  onShow:function(){
   
  }
 
})
