// pages/cinema/cinema.js
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas:[],
    mycinemas: [],
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

        that.setData({
          mycinemas:app.data.mycinemas,
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