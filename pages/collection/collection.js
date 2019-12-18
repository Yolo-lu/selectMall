// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    collectGoodsList:[]
  },
  isCollect() {  //查看是否收藏
    app.globalData.fly.get(`collect/listAction?openId=${this.data.openId}`).then(res => {
      this.setData({
        collectGoodsList: res.data.collectGoodsList,
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
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
      openId:wx.getStorageSync("openId")
    })
    this.isCollect()
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