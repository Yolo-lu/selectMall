// pages/subject/subject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],//获取数据
    start: 1,// 默认第一页
  },
  getData() {
    app.globalData.fly.get(`topic/listaction?page=${this.data.start} `).then(res => {
      this.setData({
        data: this.data.data.concat(res.data.data),
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  skip(e) {
    let id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: `../../pages/subjectDetail/subjectDetail?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      start: this.data.start+1,
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})