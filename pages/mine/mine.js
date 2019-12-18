// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        name: "我的订单",
        icon: "balance-list-o",
        path: "/pages/address/address"
      },
      {
        name: "优惠劵",
        icon: "medel-o",
        path: "/pages/address/address"
      },
      {
        name: "礼品卡",
        icon: "bill-o",
        path: "/pages/address/address"
      },
      {
        name: "我的收藏",
        icon: "like-o",
        path: "/pages/collection/collection"
      },
      {
        name: "我的足迹",
        icon: "eye-o",
        path: "/pages/address/address"
      },
      {
        name: "会员福利",
        icon: "vip-card-o",
        path: "/pages/address/address"
      },
      {
        name: "地址管理",
        icon: "location-o",
        path: "/pages/address/address"
      },
      {
        name: "账号安全",
        icon: "chat-o",
        path: "/pages/address/address"
      },
      {
        name: "联系客服",
        icon: "phone-circle-o",
        path: "/pages/address/address"
      },
      {
        name: "帮助中心",
        icon: "question-o",
        path: "/pages/address/address"
      },
      {
        name: "意见反馈",
        icon: "notes-o",
        path: "/pages/suggest/suggest"
      },
    ],
    user: {}
  },
  onGotUserInfo(e) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            user: e.detail.userInfo
          })
          wx.setStorageSync("user", this.data.user)
        } else {
          wx.showModal({
            title: '特别提醒',
            content: '你已拒绝授权登录，可能无法正常使用该程序，请再次点击登录',
            showCancel: false,
            success(res) {
              if (res.confirm) {}
            }
          })
        }
      }
    })
  },
  skip(e){
    let path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: path,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user: wx.getStorageSync("user")
    })
    console.log(this.data.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})