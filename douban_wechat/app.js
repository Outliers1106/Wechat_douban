//app.js

const wechat = require('./utils/wechat.js')

/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('./utils/douban.js')

const baidu = require('./utils/baidu.js')

App({
  /**
     * Global shared
     * 可以定义任何成员，用于在整个应用中共享
     */
  data: {
    name: 'Douban Movie',
    version: '0.1.0',
    currentCity: '威海',
    curLatitude: '37.50212',
    curLongitude:'122.12348',
    myticket:[
      {
        movie: '名侦探柯南',
        date: '2019-9-20',
        time: '12:00',
        seat: '1列1排'
      }
    ],
    myscore:[
      '名侦探柯南 10分',
    ],
    mycomment:[
      '名侦探柯南 非常好看，期待下一部',
    ],
    mycinemas: [
      {
        id: 0,
        latitude: 37.503220377766,
        longitude: 122.1193809154,
        title: "横店影城(苏宁电器店)",
        address: "山东省威海市环翠区和平路6号苏宁电器广场负1层",
        telephone: "(0631)3965678"
      },
      {
        id: 1,
        latitude: 37.50803051716,
        longitude: 122.11279463061,
        title: "威海移动电影城",
        address: "威海市少年路4号(青少年宫北市，电影公司北门，大世界北门，西鑫城大厦西50米)",
        telephone: "(0631)5232510"
      }
    ],
  },

  /**
   * WeChat API
   */
  wechat: wechat,

  /**
   * Douban API
   */
  douban: douban,

  /**
   * Baidu API
   */
  baidu: baidu,

  onLaunch: function () {
    wechat
      .getLocation()
      .then(res => {
        const { latitude, longitude } = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        this.data.currentCity = name.replace('市', '')
        console.log(`currentCity : ${this.data.currentCity}`)
      })
      .catch(err => {
        this.data.currentCity = '威海'
        console.error(err)
      })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})