//index.js
//获取应用实例
const app = getApp()
import {
  msgApi
} from "../../api/msg.js"
import {
  cityApi
} from "../../api/city.js"
Page({
  data: {
    locCity: '',
    userId: '',
    bobaoInfo: {}, //播报
    myInfo: {}, //顶部业绩
    infoList: [], //底部四个信息
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
  getBobao() {
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
  onLoad: function() {
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    this.setData({
      userId: userInfo.userid
    })
    this.getBobao()
    this.getFour()
    this.getMyInfo()

  },
  loadCurrentCity: function() {

    let that = this;
    let userInfo = wx.getStorageSync('userInfo')

    //看缓存里有没有城市,没有就进行获取当前位置//匹配不到就是深圳市
    let city = userInfo.city
    console.log("用户信息中的", city)

    if (!city) { //用户信息中没返回城市
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          console.log('location', res);
          var locationString = res.latitude + "," + res.longitude;
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              "key": "XNABZ-SZ6LD-CKS4Z-HELIK-57FYO-WXF6T",
              "location": locationString
            },
            method: 'GET',
            success: function(r) {

              that.setData({
                locCity: r.data.result.address_component.city,
              })
              cityApi.getAllCity().then(res => {
                console.log(res, that.data.locCity)
                let obj;
                res.forEach(item => {
                  if (item.deptName + '市' == that.data.locCity) { //能够匹配到当前地址
                    obj = item
                  }
                })

                if (!obj) {
                  res.forEach(item => {
                    if (item.deptName + '市' == '深圳市') { //不能够匹配到当前地址
                      obj = item
                    }
                  })
                }

                console.log("obj", obj)
                wx.setStorage({
                  key: 'city',
                  data: obj,
                })
              })

            }
          });
        }
      });


    } else { //用户信息中返回了城市
      cityApi.getAllCity().then(res => {
       
        let obj;
        res.forEach(item => {
          if (item.deptName + '市' == city) { //能够匹配到当前地址
            obj = item
          }
        })

        if (!obj) {
          res.forEach(item => {
            if (item.deptName + '市' == '深圳市') { //不能够匹配到当前地址
              obj = item
            }
          })
        }

        console.log("obj", obj)
        wx.setStorage({
          key: 'city',
          data: obj,
        })
      })
    }


  },
  onShow: function() {
    let city = wx.getStorageSync('city')
    if(!city.id){

      this.loadCurrentCity()

    }


  }

})