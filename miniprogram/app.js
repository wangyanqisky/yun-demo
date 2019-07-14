//app.js
App({
  onLaunch: function (options) {
    const that = this;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: "testcloud-z7380"
      })
    }

    // 查看是否授权
    wx.getSetting({
      success(settingRes) {
        // 已经授权
        if (settingRes.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(infoRes) {
              that.globalData.userInfo = infoRes.userInfo
              if (that.catchUserInfo) {
                that.catchUserInfo(infoRes.userInfo)
              }
              // 如果是旧用户就更新信息
              // wx.cloud.callFunction({
              //   name: 'createUser',
              //   data: {
              //     avatarUrl: infoRes.userInfo.avatarUrl,
              //     name: '',
              //     nickName: infoRes.userInfo.nickName,
              //     sex: infoRes.userInfo.gender
              //   }
              // })
            }
          })
        } else {
          wx.reLaunch({
            url: `/pages/login/login?back=${options.path.split('/')[1]}`
          })
        }
      }
    })

  },
  globalData: {
    userInfo: {}
  }
})
