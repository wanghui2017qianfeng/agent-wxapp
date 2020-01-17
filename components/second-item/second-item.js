// components/second-item/second-item.js
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
    goDetail(e) {
      console.log(this.data.list)
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('goDetail', id)

    },
  }
})