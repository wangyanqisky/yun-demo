// pages/home/home.js
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTodoList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 获取列表
   */
  getTodoList: function (callback) {
    const { todoList } = this.data;
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('todoList')
      .where({})
      .orderBy('_id', 'desc')
      .get()
      .then(res => {
      this.setData({
        todoList: res.data
      })
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  goToDetail: function (event) {
    console.log(event.target.dataset.todoid)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.startPullDownRefresh();
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
    this.getTodoList(function () {
      wx.stopPullDownRefresh();
    });
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