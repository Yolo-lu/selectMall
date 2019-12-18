// pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:'',
    order:[],
    openId:''
  },
  pay(){
       wx.showToast({
         title: `总计${this.data.total}元`,
         icon: "none"
       })
    this.data.order.map(item => {
      app.globalData.fly.get(`cart/deleteAction?id=${item.id}`).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
      })
  },
  address() {  //查看地址列表
    app.globalData.fly.get(`address/getListAction?openId=${this.data.openId}`).then(res => {
      this.setData({
        data: res.data.data,
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  skip(){  //收货地址
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      total:options.total,
      order:wx.getStorageSync("order"),
        openId: wx.getStorageSync("openId")
    })
    // console.log(this.data.order)
    
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
    this.address()
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