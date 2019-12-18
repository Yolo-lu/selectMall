// pages/addressEdit/addressEdit.js
const app = getApp()
import areaList from "../../lib/city/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,//复选框
    areaList: {},//选择城市
    showcity: false,//城市弹出层
    address:'',//展示省份区县
    openId:"",
    username:"",
    tel:'',
    detailAddress:'',
    addressId:'',
    num:0,//默认新建
  },
  onChange(e){
    this.setData({
      checked: e.detail
    });
  },
  changeName(e){  //输入框值变化
// console.log(e)
    if (e.currentTarget.dataset.value === "username"){
      this.setData({
        username:e.detail.value
      })
    }
    if (e.currentTarget.dataset.value === "tel") {
      this.setData({
        tel: e.detail.value
      })
    }
    if (e.currentTarget.dataset.value === "address") {
      this.setData({
        detailAddress: e.detail.value
      })
    }
  },
  changeCity() { // 点击城市
    this.setData({
      showcity: true
    })
  },
  confirmCity(e) {  //选择城市框确认
    this.setData({
      address: e.detail.values[0].name+ e.detail.values[1].name+e.detail.values[2].name,
      showcity: false
    })
    // console.log(this.data.address)
  },
  cancelCity() {  //点击城市框取消
    this.setData({
      showcity: false
    })
  },
  save(){
    //post请求
    let info = {}
    info.checked = this.data.checked;
    info.detailadress = this.data.detailAddress;
    info.address = this.data.address;
    info.userName = this.data.username;
    info.telNumber = this.data.tel;
    info.openId = this.data.openId
if(this.data.num===1){
  info.addressId = this.data.addressId
}
  app.globalData.fly.post('address/saveAction', info).then(res => {
    if (res.data.data === true) {
      wx.showToast({
        title: '保存成功',
      })
    }
    // console.log(res)
  }).catch(err => {
    console.log(err)
  });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num:options.num*1,
      areaList: areaList,
      openId: wx.getStorageSync("openId"),
      addresInfo: wx.getStorageSync("address")
    })
    if (wx.getStorageSync("address")){
      let addresInfo = wx.getStorageSync("address")
      this.setData({
        username: addresInfo.name,
        tel: addresInfo.mobile,
        address: addresInfo.address,
        detailAddress: addresInfo.address_detail,
        addressId: addresInfo.id
      })
    }
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