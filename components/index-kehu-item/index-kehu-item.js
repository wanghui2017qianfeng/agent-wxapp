// components/index-kehu-item/index-kehu-item.js
import { kehuApi } from "../../api/kehu.js"
import {
  kehuCollectApi
} from "../../api/kehuCollect.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelCollect(e) {
      let userInfo = wx.getStorageSync('userInfo');
      let userId = userInfo.userid;
      let cusid = e.currentTarget.dataset.cusid;
      let model = {
        customerId: cusid,
        userId: userId

      }
      kehuCollectApi.cancelCollect(model).then(() => {
        wx.showToast({
          title: '取消关注',
        })
        this.triggerEvent('refresh')


      })

    },
    addCollect(e) {
      let userInfo = wx.getStorageSync('userInfo');
      let userId = userInfo.userid;
      let cusid = e.currentTarget.dataset.cusid;
      let model = {
        customerId: cusid,
        userId: userId

      }
      kehuCollectApi.addCollect(model).then(() => {
        wx.showToast({
          title: '关注成功'
        })
        this.triggerEvent('refresh')
      })

    },
    openPhone(e){
      let phone = e.currentTarget.dataset.phone;
      if (phone != null) {
        wx.makePhoneCall({
          phoneNumber: phone // 仅为示例，并非真实的电话号码
        })
      } else {
        wx.showToast({
          title: '暂无电话',
          icon: 'none',
          duration: 2000
        })
      }
    },
    goDetail(e) {
      console.log(this.data.list)
      let {id,name,cusno} = e.currentTarget.dataset;
      this.triggerEvent('goDetail', { id, name, cusno })

    },
  }
})