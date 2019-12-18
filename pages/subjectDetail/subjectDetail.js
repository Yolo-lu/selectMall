// pages/subjectDetail/subjectDetail.js
const app = getApp()
var WxParse = require('../../lib/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//传来的id
    data:{}
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(` topic/detailaction?id=${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          data: res.data,
          content: res.data.data.content
        })
        WxParse.wxParse('article', 'html', this.data.content, this, 0);
        // console.log(res)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    // console.log(this.data.id)
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