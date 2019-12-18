// pages/catalogue/catalogue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],//获取数据
    active:0,//导航栏唯一标识符
    id:1005000,
    currentOne:{}
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
  onChange(e){
    this.setData({
      active:e.detail
    })
  },
  getClassify(id){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`category/currentaction?id=${id}`).then(res => {
      if(res.data){
        wx.hideLoading()
        this.setData({
          currentOne: res.data.data.currentOne,
        })
        console.log(res)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  choose(e){  //点击左侧导航栏
    let id = e.currentTarget.dataset.item
    this.getClassify(id)
  },
  skip(e){ //跳转分类导航商品列表
  // console.log(e)
    let id = e.currentTarget.dataset.item
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `../../pages/classify/classify?id=${id}&name=${name}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData() ,
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