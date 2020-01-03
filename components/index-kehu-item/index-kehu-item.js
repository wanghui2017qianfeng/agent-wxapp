// components/index-kehu-item/index-kehu-item.js
import { kehuApi } from "../../api/kehu.js"

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
    openPhone(e){
      kehuApi.getContacts(e.currentTarget.dataset.id).then(res=>{
        console.log(res)
      })
    },
    goDetail(e) {
      console.log(this.data.list)
      let {id,name,cusno} = e.currentTarget.dataset;
      this.triggerEvent('goDetail', { id, name, cusno })

    },
  }
})