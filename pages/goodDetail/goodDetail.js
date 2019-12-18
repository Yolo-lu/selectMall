// pages/goodDetail/goodDetail.js
const app = getApp()
var WxParse = require('../../lib/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    data:{},
    openId:'',
    indicatorDots: true,//导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    list: [
      { title: "30天无忧退货", img: '../../images/circle.png' },
      { title: "48小时快速退款", img: '../../images/circle.png' },
      { title: "满88元免邮费", img: '../../images/circle.png' },
    ],
    show:false,//选择规格弹出层
    goods_desc:'',
    value:1,//进步器值
    collected:false,//收藏图标
    number:0,// 购物车数量
    price:0
  },
  shows(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(event) { //进步器
    this.setData({
      value: event.detail
    })  
  },
  skip(e) { //跳转详情
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/goodDetail/goodDetail?id=${id}`,
    })
  }, 
  getData() {  //商品详情
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/detailaction?id=${this.data.id}&openId=${this.data.openId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          data: res.data,
          goods_desc: res.data.info.goods_desc,
          collected: res.data.collected,
          price: res.data.info.retail_price
        })
        console.log(res)
        WxParse.wxParse('article', 'html', this.data.goods_desc, this, 0)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  collect(){  //收藏
    this.setData({
      collected: !this.data.collected
    })
    //post请求
    let collection={}
    collection.goodsId=this.data.id;
    collection.openId = this.data.openId
    app.globalData.fly.post('collect/addcollect',collection).then(res => {
        // this.setData({
        //   data: res.data,
        // })
        // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
 
  shopping(){
    wx.switchTab({
      url: '../../pages/shoppingCar/shoppingCar',
    })
  },
  shoppingcar() {  //加入购物车
    //post请求
    let shoppingcar = {}
    shoppingcar.goodsId = this.data.id;
    shoppingcar.number=this.data.value;
    shoppingcar.openId = this.data.openId
    app.globalData.fly.post('cart/addCart', shoppingcar).then(res => {
      if (res.data.data === "success"){
        this.isAdd()
      }
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  isAdd() {  //查看是否加入购物车
    app.globalData.fly.get(`cart/cartList?openId=${this.data.openId}`).then(res => {
      this.setData({
        number: res.data.data.length
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  buy(){
    let buy = {}
    buy.goodsId = this.data.id;
    buy.allPrise = this.data.value*this.data.price;
    buy.openId = this.data.openId
    app.globalData.fly.post(' order/submitAction', buy).then(res => {
      if (res.data.data === true) {
        // this.shoppingcar() 
        wx.switchTab({
          url: '../../pages/shoppingCar/shoppingCar',
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
      id:options.id,
      openId: wx.getStorageSync("openId")
    })
    this.getData()
    this.isAdd() 
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