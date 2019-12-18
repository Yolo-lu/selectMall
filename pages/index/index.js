//index.js
//获取应用实例
const app = getApp()
import map from "../../lib/map"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},//获取首页数据
    flag:true,//控制搜索
    address:""
  },
getData(){
  app.globalData.fly.get('index/index').then(res => {
    this.setData({
      data:res.data
    })
    // console.log(res)
  }).catch(err => {
    console.log(err)
  });
},
  skipNew(e){ // 跳转新品首发
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `../../pages/new/new?type=${type}`,
    })
  },
  search(){
    this.setData({
      flag:false
    })
  },
  flag(e){
    this.setData({
      flag: e.detail
    })
  },
  showmodule(){
    wx.showModal({
      title: '特别提醒',
      content: '你已拒绝授权，可能无法正常使用该程序，请点击确定',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              this.location()
            },
            fail: (err) => {
              this.showmodule()
            }
          })
        }else{
          this.showmodule()
        }
      }
    })
  },
  location(){
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // console.log(res)
        let qqmapsdk = new map({
          key: 'WHABZ-XIK64-5UJU5-DRFAD-VFCXZ-4QBLZ'//此处使用你自己申请的key  
        });
        // 腾讯地图调用接口  
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: (res)=> {
            // console.log(res)
            this.setData({
              address: res.result.address_component.street_number
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
          }
        });
      },
      fail:(err)=>{
       this.showmodule()
      }
    })
  },
  address(){
    wx.navigateTo({
      url: '../../pages/location/location',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.setData({
      address: wx.getStorageSync("address")
    })
    // console.log(this.data.address)
    if (!this.data.address){
      this.location()
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