// components/my-house-item/my-house-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isRent: {
      type: Number,
      value: 0
    },
    isCheck: { //是否是选择带看房源
      type: Number,
      value: 0,
    },
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    houseNames: [],
    houseIds: [],

    result: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit() {
      console.log("提交选择", this.data.houseNames)

      var pages = getCurrentPages();
      var beforePage = pages[pages.length - 2];
      beforePage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        houseIds: this.data.houseIds, // 这里是修改了上一个页面数据:name
        houseNames: this.data.houseNames
      })


      wx.navigateBack({
        delta: 1,
      })



    },
    onChange(event) {
      console.log("event", event)
      let result = event.detail
     
      let houseIds = [],
        houseNames = [];
      result.forEach(item => {
        houseIds.push(item.split("-")[0])
        houseNames.push(item.split("-")[1])

      })

      this.setData({
        result: event.detail,
        houseNames: houseNames,
        houseIds: houseIds
      });
    },
    goDetail(e) {
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('goDetail', id)

    },
  }
})