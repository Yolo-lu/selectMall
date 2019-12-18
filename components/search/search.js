// components/search/search.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value:"",
    flag:true,
    openId:"",
    data:{},//搜索相关
    hotFlag:true,//控制热门搜索
    keywords:[],//搜索关键字
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    cancel(e) {
      this.setData({
        flag: e.currentTarget.dataset.flag
      })
      this.triggerEvent("flag", this.data.flag)
    },
    searched(){
      wx.showLoading({
        title: '加载中',
      })
      app.globalData.fly.get(`search/indexaction?openId=${this.data.openId}`).then(res => {
        if(res.data){
          wx.hideLoading()
          this.setData({
            data: res.data
          })
        }
        
        console.log(res)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    },
    search(e){  //关键字搜索
    this.setData({
      value:e.detail,
    })
    if(this.data.value!==""){
      this.setData({
        hotFlag: false
      })
    }else{
      this.setData({
        hotFlag: true
      })
    }
      app.globalData.fly.get(`search/helperaction?keyword=${this.data.value}`).then(res => {
        this.setData({
          keywords: res.data.keywords,
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
    },
    choose(e){
      let name = e.currentTarget.dataset.name
      let id = e.currentTarget.dataset.id
      this.setData({
        value:name
      })
      wx.navigateTo({
        url: `../../pages/goodDetail/goodDetail?id=${id}`,
      })
      this.confirm()
    },
    skip(e){
      let name = e.currentTarget.dataset.name
      let id = e.currentTarget.dataset.id
      this.setData({
        value: name
      })
      wx.navigateTo({
        url: `../../pages/new/new?id=${id}`,
      })
      this.confirm()
    },
    choosed(e){
      let name = e.currentTarget.dataset.name
      this.setData({
        value: name
      })
      if (this.data.value !== "") {
        this.setData({
          hotFlag: false
        })
      } else {
        this.setData({
          hotFlag: true
        })
      }
      app.globalData.fly.get(`search/helperaction?keyword=${this.data.value}`).then(res => {
        this.setData({
          keywords: res.data.keywords,
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
      this.confirm()
    },
    confirm(){  //添加搜索历史
      let key={}
      key.keyword=this.data.value;
      key.openId=this.data.openId
      app.globalData.fly.post('search/addhistoryaction', key).then(res => {
        // this.setData({
        //   keywords: res.data.keywords,
        // })
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    },
    clear(){  //删除搜索
      let clear = {}
      clear.openId = this.data.openId
      wx.showModal({
        content: '是否确认清除搜索历史',
        success: (res) => {
          // console.log(res)
          if (res.confirm) {
            app.globalData.fly.post('search/clearhistoryAction', clear).then(res => {
              if (res.data.data === "清除成功") {
                this.searched()
              }
              // console.log(res)
            }).catch(err => {
              console.log(err)
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     
    }
  },
ready(){
  this.setData({
    openId: wx.getStorageSync("openId")
  })
  this.searched()
}
})
