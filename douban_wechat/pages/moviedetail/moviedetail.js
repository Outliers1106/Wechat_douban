// pages/moviedetail/moviedetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    movie: {},
    navData:[
    {text:'介绍'},
    {text:'海报'},
    {text:'短评'},
    {text:'评分'}
    ],
    currentTab:0,
    navScrollLeft:0,
    seatArray: [['1排', '2排', '3排', '4排', '5排', '6排', '7排', '8排'],
      ['1列', '2列', '3列', '4列', '5列', '6列', '7列', '8列', '9列', '10列']],
    seatIndex:[0,0],
    seat: '1排1列',
    date: '2019-09-20',
    time: '12:00',
    score: ['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分',],
    scoreindex:0,
    comment:'',




    /*
    test:[
    {id:'test1'},
     { id:'test2'}

    ]
    */

  },

  buyticket:function(e){
    console.log(e.target.dataset.time)
    console.log(e.target.dataset.date)
    console.log(e.target.dataset.movie)
    this.seat = (e.target.dataset.seat1+1) +'排' +(e.target.dataset.seat2+1)+'列'
    var ticketinfo = e.target.dataset.movie + ' ' + e.target.dataset.date + ' ' + e.target.dataset.time+' '+this.seat
    app.data.myticket.push(ticketinfo)
    console.log(app.data.myticket)
    console.log(this.seat)
  },
  submitscore:function(e){
    var scoreinfo=e.target.dataset.movie+' '+(parseInt(e.target.dataset.score)+1)+'分'
    app.data.myscore.push(scoreinfo)
    console.log(app.data.myscore)
  },
  inputtextarea:function(e){
    var value = e.detail.value;
    this.setData({
      comment:value
    })
  },
  submitcomment:function(e){
    var value=e.target.dataset.movie+' '+e.target.dataset.comment
    app.data.mycomment.push(value)
    console.log(app.data.mycomment)
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      scoreindex: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      seatIndex: e.detail.value
    })

  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /*
   * 切换导航标签
   */
switchNav(event){
  var cur = event.currentTarget.dataset.current;
  //每个tab选项宽度占1/4
  var singleNavWidth = this.data.windowWidth / 4;
  //tab选项居中                            
  this.setData({
    navScrollLeft: (cur - 2) * singleNavWidth
  })
  console.log("cur index",cur)
  if (this.data.currentTab == cur) {
    return false;
  } else {
    this.setData({
      currentTab: cur
    })
  }
},

  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 4;
    console.log("cur index", cur)
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    /*
    console.log(this.data.test[0].id)
    let ab=this.data.test
    ab[0].id='change'
    this.setData({ab})
    console.log(this.data.test)
    */
    wx.showLoading({ title: '拼命加载中...' })
    console.log("item.js params:",params)
    app.douban.findOne(params.id)
      .then(d => {
        this.setData({ title: d.title, movie: d })
        wx.setNavigationBarTitle({ title: d.title })
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
        console.error(e)
        wx.hideLoading()
      })

    //系统适配
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title })
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