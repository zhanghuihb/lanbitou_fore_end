import ApiUrl from './api-url.js';
import * as Tool from './tool.js';
import { ToastPannel } from './component/toast/toast.js';
// 本地引入json数据
var provinces = require('./data/city.js')
//app.js
App({
  ToastPannel,
  onLaunch:function(){
    console.log('--- onLaunch ---');
    this.globalData.provinces = provinces.provinces;
    this.getAllCodes();
    this.getSystemInfo();

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
    xcxUserId: '',

    provinces: [],
    category: [],
    systemInfo: null,
    showMsg: ''
  },
  login(){
    Tool.login().then(data => {
      console.log("----", data, "----------");
      this.globalData.userInfo = data.loginInfo;
      this.globalData.unionId = data.loginInfo.unionId;
      this.globalData.xcxUserId = data.loginInfo.xcxUserId;

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
  },

  getAllCodes(){
    Tool.request(ApiUrl.lanbitou.getAllCodes,'','','').then(data => {
      this.globalData.category = data;
    })
  },

  getSystemInfo(){
    Tool.getSystemInfo().then(data => {
      this.globalData.systemInfo = data.systemInfo;
    })
  }
})