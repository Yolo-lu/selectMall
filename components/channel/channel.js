// components/channel/channel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    channel:{
      type:Array,
      value:()=>[]
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
      let id = e.currentTarget.dataset.item
      let name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: `../../pages/homeCatalogue/homeCatalogue?id=${id}&name=${name}`,
      })
    }
  }
})
