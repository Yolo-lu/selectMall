// pages/homeCatalogue/homeCatalogue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'居家',//导航栏唯一标识
    categoryList:[],//导航栏信息
    data: {}
  },
  getData() {
    app.globalData.fly.get('category/indexaction').then(res => {
      this.setData({
        categoryList: res.data.categoryList,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  getClassify(id) {  //导航栏商品详情
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/goods/goodsList?categoryId=${id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          data: res.data,
        })
        // console.log(res)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  change(e) {
    this.setData({
      name: e.currentTarget.dataset.name
    })
    let id = e.currentTarget.dataset.id
    this.getClassify(id)
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
      id: options.id,
      name: options.name
    })
    this.getData(),
    this.getClassify(this.data.id)
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