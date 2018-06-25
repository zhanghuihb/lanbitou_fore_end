// pages/personcenter/personcenter.js
import ApiUrl from '../../api-url.js';
import * as Tool from '../../tool.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalIncome: '',
    totalExpend: '',
    balance: '',
    userInfo:'',
    dataArr: [
      {
        icon: "/imgs/icon_notice.png",//图标
        title: "通知中心",//标题
        isShowRedDot: false,//是否显示红点
      },
      {
        icon: "/imgs/icon_setting.png",//图标
        title: "分类设置",//标题
        isShowRedDot: false,//是否显示红点
      },
      {
        icon: "/imgs/icon_help.png",//图标
        title: "关于烂笔头",//标题
        isShowRedDot: false,//是否显示红点
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({userInfo: app.globalData.userInfo});
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
    this.getAccountInfo();
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
  
  },
 /**
  * 查询账户信息
  */
  getAccountInfo() {
    Tool.request(ApiUrl.lanbitou.getAccountInfo, '', '', '', app.globalData.xcxUserId).then(data => {
      this.setData({ totalIncome: data.totalIncome, totalExpend: data.totalExpend, balance: data.balance });
    })
  }
})