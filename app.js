//app.js
const Fly = require('./lib/fly/wx.js')
const fly = new Fly()
fly.config.baseURL = "http://118.25.222.68:5757/heyushuo"
App({
  onLaunch: function () {
  var userInfo={
    openId:"cl1996yolocaicaialalalala"
  }
  let openId=userInfo.openId
  wx.setStorageSync("openId",openId)
  },
  globalData: {
    fly
  }
})