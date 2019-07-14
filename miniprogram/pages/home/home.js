// pages/home/home.js
import Dialog from 'vant-weapp/dialog/dialog';
const db = wx.cloud.database(); // 初始化数据库
const app = getApp();

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
      .orderBy('date', 'desc')
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

  onDeletItem: function (event) {
    const { position, instance } = event.detail;
    const id = event.target.dataset.itemid;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          db.collection('todoList')
          .doc(id).remove()
          .then(res => {
            wx.startPullDownRefresh();
            instance.close();
          })
          .catch(err => {
            console.error(err)
          })
        });
        break;
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if (app.globalData.isHomePageUpdate) {
      wx.startPullDownRefresh();
      app.globalData.isHomePageUpdate = false;
    }
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