// pages/cinema/cinema.js
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas:[],
    mycinemas: [
      { id: 0, 
        latitude: 37.503220377766, 
        longitude: 122.1193809154, 
        title: "横店影城(苏宁电器店)", 
        address: "山东省威海市环翠区和平路6号苏宁电器广场负1层",
        telephone: "(0631)3965678"
      },
      { id: 1, 
        latitude: 37.50803051716, 
        longitude: 122.11279463061, 
        title: "威海移动电影城",
        address: "威海市少年路4号(青少年宫北市，电影公司北门，大世界北门，西鑫城大厦西50米)",
        telephone: "(0631)5232510"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this;
        var BMap = new bmap.BMapWX({
          ak: 'B61195334f65b9e4d02ae75d24fa2c53'
        });
        var fail = function(data) {
          console.log(data);
        };
        var success = function(data) {
          wxMarkerData = data.wxMarkerData;
          console.log(wxMarkerData);
          that.setData({
            cinemas: wxMarkerData
          });
        }
        BMap.search({
            "query": '影院',
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
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