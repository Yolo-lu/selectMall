// pages/new/new.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],//综合数据
    active:0 ,//综合0，价格1，分类2
    up:true,//默认顺序
    type:0,//新品0、人气1
  },
  comprehensive(){
    this.setData({
      active:0
    })
  },
  price(){
    this.setData({
      active: 1
    })
    this.getData()
  },
  order(){
    this.setData({
      up:!this.data.up
    })
    this.getData()
  },
  classify(){
    this.setData({
      active: 2
    })
    this.getData()
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
if(this.data.type===0){
  if (this.data.active * 1 === 0 || this.data.active * 1 === 2) {
    app.globalData.fly.get('/goods/goodsList?isNew=1').then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          data: res.data.data,
        })
        // console.log(res)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  }
  if (this.data.active * 1 === 1) {
    if (this.data.up) {
      app.globalData.fly.get('goods/goodsList?isNew=1&order=asc').then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            data: res.data.data,
          })
          // console.log(res)
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    } else {
      app.globalData.fly.get('goods/goodsList?isNew=1&order=desc').then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            data: res.data.data,
          })
          // console.log(res)
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    }
  }
}else{
  if (this.data.active * 1 === 0 || this.data.active * 1 === 2) {
    app.globalData.fly.get('goods/goodsList?isHot=1').then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          data: res.data.data,
        })
        // console.log(res)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  }
  if (this.data.active * 1 === 1) {
    if (this.data.up) {
      app.globalData.fly.get('goods/goodsList?isHot=1&order=asc').then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            data: res.data.data,
          })
          // console.log(res)
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    } else {
      app.globalData.fly.get('goods/goodsList?isHot=1&order=desc').then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            data: res.data.data,
          })
          // console.log(res)
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    }
  }
}
  },
  skip(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/goodDetail/goodDetail?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type*1
    })
    this.getData() 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})