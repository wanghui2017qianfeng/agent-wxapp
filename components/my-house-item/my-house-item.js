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
    isCheck:{//是否是选择带看房源
      type:Number,
      value:0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checked:0,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      console.log(this.data.list)
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('goDetail', id)

    },
    chooseHouse(e){
      this.setData({
        checked:e.currentTarget.dataset.index
      })

    }
  }
})
