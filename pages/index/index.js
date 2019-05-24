import ApiUrl from '../../api-url.js';
import * as Tool from '../../tool.js';
import Util from '../../utils/util.js';

var time = require('../../utils/util.js');
//index.js
//获取应用实例
const app = getApp()

Page({

 /**
  * 页面的初始数据
  */
  data: {
    userInfo: '',
    unionId: '',
    records: [],

    localDate: '',

    top: '350',
    left: '0',
    windowWidth: '',
    windowHeight: '',
    showMsg: ''
  },

  /**
   * 页面渲染后执行
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.onReady(err => {
      if (err) {
        return;
      }
      var that = this;

      currentPage = 1;
      this.setData({
        records: [],
        showMsg: '',
        localDate: Util.getCurrentMonth(new Date()) + '-01'
      });
      getConsumerInfos(that);
    });
  },

  // 下拉
  onPullDownRefresh: function(){
    console.log('下拉');
    currentPage = 1;
    this.setData({
      records: [],
    });
    var that = this;
    getConsumerInfos(that);
  },
  // 上拉
  onReachBottom:function(){
    console.log('上拉');
    var that = this
    getConsumerInfos(that);
  },
  // 进入消费详情
  getConsumerInfoById: function(event){
    let consumerInfoId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'edit/edit?consumerInfoId=' + consumerInfoId,
    })
  },

  //拖动不超过规定范围
  setTouchMove: function (e) {  
    var systemInfo = app.globalData.systemInfo;
    let clientX = e.touches[0].clientX;
    let clientY = e.touches[0].clientY;
    if (clientX > 0 && clientY > 0){
      if (clientX < systemInfo.screenWidth - 40 && clientY < systemInfo.screenHeight - 150){
        this.setData({
          left: clientX,
          top: clientY
        })
      }
    }
  },

  // 记账
  addConsumerInfo: function(){
    wx.navigateTo({
      url: 'save/save'
    })
  }

})

// 查询消费记录
var currentPage = 1;
var getConsumerInfos = function(that){
  that.setData({
    hidden: false,
    showMsg: ''
  });

  const unionId = app.globalData.unionId;
  const xcxUserId = app.globalData.xcxUserId;
  var localDate = that.data.localDate;
  let param = {
    localDate: localDate,
    page: {
      currentPage: currentPage,
      pageSize: 100
    }
  }
  wx.showLoading({
    title: '数据加载中',
  })
  Tool.request(ApiUrl.lanbitou.getConsumerInfos, '', param, unionId, xcxUserId)
    .then(data => {
      wx.hideLoading();
      var l = that.data.records;
      // 格式化时间
      if (data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {
          // data.list[i].consumerTime = time.formatTime(data.list[i].consumerTime, 'Y-M-D');
          if(data.list[i].consumerTime != null){
            data.list[i].consumerTime = data.list[i].consumerTime.split("T")[0];
          }else{
            that.data.localDate = data.list[i].baseResultStatics.localDate;
            data.list[i].baseResultStatics.localDate = data.list[i].baseResultStatics.localDate.substring(0,7);
          }
          
          l.push(data.list[i]);
        }
      }
      currentPage = data.currentPage + 1;
      that.data.records = l;
      that.setData({ records: that.data.records, showMsg:'还没有记账，赶紧去记账吧!'});
      that.setData({
        hidden: true
      });
    }, err => {
      wx.hideLoading();
    })
}
