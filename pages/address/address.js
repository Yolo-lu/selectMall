// pages/address/address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    data: [], //地址列表
    // address: '',//展示省份区县
    // openId: "",
    // username: "",
    // tel: '',
    // detailAddress: '',
    // addressId: '',
    // num: 0,//默认新建
  },
  addressEdit() {
    wx.removeStorageSync("address")
    wx.navigateTo({
      url: `../../pages/addressEdit/addressEdit?num=0`,
    })
  },
  address() { //查看地址列表
    app.globalData.fly.get(`address/getListAction?openId=${this.data.openId}`).then(res => {
      this.setData({
        data: res.data.data,
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  edit(e) {
    let data = e.currentTarget.dataset.item
    wx.setStorageSync("address", data)
    wx.navigateTo({
      url: `../../pages/addressEdit/addressEdit?num=1`,
    })
  },
  delete(e) {
    let index = e.currentTarget.dataset.index
    wx.showModal({
      content: "确认删除该地址",
      success: (res) => {
        if (res.confirm) {
          app.globalData.fly.get(`address/deleteAction?id=${this.data.data[index].id}`).then(res => {
            if (res.data.data) {
              this.address()
            }
            // console.log(res)
          }).catch(err => {
            console.log(err)
          });
        }
      }
    })

  },
  choose(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.data.splice(index, 1)
    this.data.data.unshift(arr[0])
    // console.log(this.data.data)
    this.setData({
      data: this.data.data
    })
    let item = e.currentTarget.dataset.item
    // console.log(item)
    let info = {}
    info.checked = true
    info.detailadress = item.address_detail;
    info.address = item.address;
    info.userName = item.name;
    info.telNumber = item.mobile;
    info.openId = this.data.openId
    info.addressId = item.id
    app.globalData.fly.post('address/saveAction', info).then(res => {
      if (res.data.data === true) {
        wx.showToast({
          title: '修改成功',
        })
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      openId: wx.getStorageSync("openId")
    })
    this.address()
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