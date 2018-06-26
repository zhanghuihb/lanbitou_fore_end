import ApiUrl from '../../api-url.js';
import * as Tool from '../../tool.js';
import Util from '../../utils/util.js'

var wxCharts = require('../../utils/wxcharts.js')
var columnChart = null;
//index.js
//获取应用实例
const app = getApp()
// pages/statics/statics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonth: '',
    windowWidth : '320',
    index: 0,
    consumerDate:'',
    hiddenArr: [false, true],
    digest: '支出',
    count: '0',
    total: '0',
    categories: ['1', '2', '3', '4', '5', '6'],
    amountList: [15.25, 20, 45.36, 37, 66, 25],
    records: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentMonth = Util.getCurrentMonth(new Date());
    this.setData({
      windowWidth: app.globalData.systemInfo.windowWidth,
      currentMonth: currentMonth
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
    var currentMonth = Util.getCurrentMonth(new Date());
    this.setData({
      currentMonth: currentMonth
    })

    this.staticsConsumerInfoByMonth();
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
  
  bindDateChange: function (e) {
    this.setData({
      consumerDate: e.detail.value,
      currentMonth: e.detail.value
    })
    this.staticsConsumerInfoByMonth();
  },

/**
 * 控制显示隐藏
 */
  bindHiddenTap_income_default: function(e){
    var hiddenArr = [true, false]
    this.setData({
      hiddenArr: hiddenArr,
      digest: '收入'
    })
    this.staticsConsumerInfoByMonth();
  },
  bindHiddenTap_out_default: function (e) {
    var hiddenArr = [false, true]
    this.setData({
      hiddenArr: hiddenArr,
      digest: '支出'
    })
    this.staticsConsumerInfoByMonth();
  },
  
  /**
   * 查询月统计信息
   * 
   */
  staticsConsumerInfoByMonth: function(){
    var currentMonth = this.data.currentMonth + '-01';
    var digest = this.data.digest;
    if(digest == '支出'){
      digest = 2;
    }else if(digest == '收入'){
      digest = 1;
    }

    let param = {
      localDate: currentMonth,
      digest: digest
    }
    Tool.request(ApiUrl.lanbitou.staticsConsumerInfoByMonth, '', param, app.globalData.unionId, app.globalData.xcxUserId)
    .then(data => {
      if (data.amountList.length > 0) {
        for (var i = 0; i < data.amountList.length; i++) {
          data.amountList[i] = data.amountList[i] / 100;
        }
      }
      
      this.setData({
        count: data.count,
        total: data.totalAmount,
        categories: data.monthList,
        amountList: data.amountList,
        records: data.records
      })
      this.drawing();
    })
  },

  drawing: function(){
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true, // 是否动画展示
      categories: this.data.categories,
      series: [{
        name: '六个月对比图',
        data: this.data.amountList,
        format: function (val, name) {
          return '¥' + val.toFixed(2);
        },
        color: '#99FF99'
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0,
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration',
      },
      extra: {
        column: {
          width: 25,
          legendTextColor: 'red'
        }
      },
      width: this.data.windowWidth,
      height: 200,
    });
  }
})