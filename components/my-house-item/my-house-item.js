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
    submit(){
      

    },
    onChange(event) {
      console.log("event", event)
      let result = event.detail
      this.setData({
        result: event.detail,

      });
      let houseIds = [],
        houseNames = [];
      result.forEach(item => {
        houseIds.push(item.split("-")[0])
        houseNames.push(item.split("-")[1])

      })


    },
    goDetail(e) {
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('goDetail', id)

    },
  }
})