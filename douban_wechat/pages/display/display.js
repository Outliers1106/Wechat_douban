// pages/display/display.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displays:[
      { key: 'in_theaters' },
    ],
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  loadMore() {
    if (!this.data.hasMore) return

    wx.showLoading({ title: '拼命加载中...' })
    this.setData({ subtitle: '加载中...' })

    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects) })
        } else {
          this.setData({ subtitle: d.title, hasMore: false })
        }
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常' })
        console.error(e)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //this.data.title = params.title || this.data.title
    //this.data.type = params.type || this.data.type

    this.loadMore()


    const tasks=this.data.displays.map(
      display=>{
        return app.douban.find(display.key,1,8).then(
          d=>{
            display.title=d.title
            display.movies=d.subjects
            console.log(display)
            console.log(d)
            return display
          }
        )
      }
    )

    Promise.all(tasks).then(displays => {
      this.setData({ displays: displays, loading: false })
      wx.hideLoading()
    })
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
    this.setData({ movies: [], page: 1, hasMore: true })
    this.loadMore()
      .then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})