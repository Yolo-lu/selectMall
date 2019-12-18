// pages/shoppingCar/shoppingCar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        title: "30天无忧退货",
        img: '../../images/circle.png'
      },
      {
        title: "48小时快速退款",
        img: '../../images/circle.png'
      },
      {
        title: "满88元免邮费",
        img: '../../images/circle.png'
      },
    ],
    openId: '',
    id:'',
    checked: false, //全选
    data: [], //购物车信息
    num: 0, //单选数量
    total:0,//总价
  },
  onChange(event) { // 全选
    this.setData({
      checked: !this.data.checked,
      total:0
    })   
    if (this.data.checked) {
      this.data.data.map(item => {
        item.choose = true;
        this.data.total = this.data.total + item.number * item.retail_price
      });
      this.setData({
        total:this.data.total
      })
    }
    this.setData({
      data: this.data.data
    })
    if (!this.checked) {
      this.data.data.map(item => {
        item.choose = false;
      });
    }
    
  },
  checkedOne(e) { //单选
  // console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.data[index].choose = !this.data.data[e.currentTarget.dataset.index].choose
    this.setData({
      data: this.data.data,
      num: 0,
      total:0
    });
    this.data.data.map(item=>{
      if(item.choose){
        this.data.num++
        this.data.total = this.data.total+item.number * item.retail_price
        this.setData({  //总价
          total: this.data.total
        })
      } 
    })
    this.setData({
      num: this.data.num
    })
    if (this.data.num === this.data.data.length) {
      this.setData({
        checked: true
      })
    }else {
      this.setData({
        checked: false
      })
    }
  },
  isAdd() { //查看是否加入购物车
    app.globalData.fly.get(`cart/cartList?openId=${this.data.openId}`).then(res => {
      res.data.data.map(item => {
        item.choose = false
        this.setData({
          id: item.id
        })
      })
      this.setData({
        data: res.data.data,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  delete(e){
    let index = e.currentTarget.dataset.index
    console.log(this.data.data[index].id)
    app.globalData.fly.get(`cart/deleteAction?id=${this.data.data[index].id}`).then(res => {
      if(res.data.data===true){
        this.isAdd() 
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  pay(e){  //跳转支付
    let arr = []
    this.data.data.map(item=>{
      if(item.choose){
        arr.push(item)
      }
    })
        wx.setStorageSync("order", arr)
    let total = e.currentTarget.dataset.total
    wx.navigateTo({
      url: `../../pages/pay/pay?total=${total}`,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openId: wx.getStorageSync("openId")
    })

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
    this.isAdd()
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