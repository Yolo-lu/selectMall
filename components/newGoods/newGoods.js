// components/newGoods/newGoods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Goods:{
      type: Array,
      value: () => []
    },
    Goods:{
      type: Array,
      value: () => []
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
    skip(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../../pages/goodDetail/goodDetail?id=${id}`,
      })
    }
  }
})
