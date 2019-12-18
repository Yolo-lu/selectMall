// pages/classify/classify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    navData:[],//导航栏数据
    data:{},//商品列表详情
    name:'布艺软装',//导航栏唯一标识
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
        console.log(res)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  getdata(){  //分类导航
    app.globalData.fly.get(`/category/categoryNav?id=${this.data.id}`).then(res => {
      this.setData({
        navData: res.data.navData,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  change(e){
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
      id:options.id,
      name:options.name
    })
    this.getClassify(this.data.id),
    this.getdata()
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