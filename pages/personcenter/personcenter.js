// pages/personcenter/personcenter.js
import ApiUrl from '../../api-url.js';
import * as Tool from '../../tool.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOpinionModal: false,
    opinionContent: '', 
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
        icon: "/imgs/icon_opinion.png",//图标
        title: "意见及建议",//标题
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
  },

  /**
   * 进入通知中心
   */
  stepToNext: function(event){
    var id = event.currentTarget.id;
    var userId = app.globalData.xcxUserId;
    
    if (id == 0) {// id == 0 进入通知中心
      wx.navigateTo({
        url: '../notice/notice?userId=' + userId,
      })
    } else if (id == 1) {// id == 1 进入意见及建议
      this.setData({
        showOpinionModal: true
      })
    } else {// id == 2 进入关于烂笔头
      wx.navigateTo({
        url: '../introduce/introduce',
      })
    }
  },

  // 监听输入内容
  handleInput(e) {
    this.setData({
      opinionContent: e.detail.value
    })
  },

  // 关闭意见及建议modal
  handleCancel() {
    this.setData({
      opinionContent: '',
      showOpinionModal: false
    })
  },

  // 点击modal的确认按钮
  handleConfirm() {
    if (!this.data.opinionContent) {
      wx.showToast({
        title: '留言内容不能为空',
        icon: 'none'
      })
      return;
    }
    let userInfo = app.globalData.userInfo;
    let userId = app.globalData.xcxUserId;
    let param = {
      content: this.data.opinionContent,
    }
    Tool.request(ApiUrl.user.saveOpinion, '', param, '',userId)
      .then(res => {
        this.setData({
          showOpinionModal: false,
          opinionContent: ''
        })
      }, err => {
        console.log(err)
      })
  },
})