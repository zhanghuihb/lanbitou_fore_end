import ApiUrl from './api-url.js';
import * as Tool from './tool.js';
//app.js
App({
  onLaunch:function(){
    console.log('--- onLaunch ---');
    this.login();
  },
  onShow: function(){
    
  },
  onReady(callback) {
    if (this.globalData.isReady) {
      callback(this.globalData.loginErr);
      return;
    }

    this.globalData.readyCallbackList.push(callback);
  },
  globalData: {
    loginErr: '',
    isReady: false,
    isLogining: false,
    readyCallbackList: [],

    userInfo: null,
    unionId: '',
  },
  login(){
    Tool.login().then(data => {
      console.log("----", data, "----------");
      this.globalData.userInfo = data.loginInfo;
      this.globalData.unionId = data.loginInfo.unionId

      this.globalData.readyCallbackList.forEach(cb => cb()); 
      this.globalData.isReady = true;
      this.globalData.isLogining = false;
    }, err => {
      console.log("+++++++++", err, "+++++++");

      this.globalData.loginErr = err;
      this.globalData.isReady = true;
      this.globalData.isLogining = false;
      console.log('login error:', err);

      if (err.code == -100) {
        wx.navigateBack();
      } else {
        this.globalData.readyCallbackList.forEach(cb => cb(err));
      }
    })
  }
})