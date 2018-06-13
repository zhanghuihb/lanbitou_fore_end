import ApiUrl from '../../api-url.js';
import * as Tool from '../../tool.js';

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
    records: []
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
  }
})

// 查询消费记录
var currentPage = 1;
var getConsumerInfos = function(that){
  that.setData({
    hidden: false
  });

  const unionId = app.globalData.unionId;
  let param = {
    page: {
      currentPage: currentPage,
      pageSize: 20
    }
  }
  wx.showLoading({
    title: '数据加载中',
  })
  Tool.request(ApiUrl.lanbitou.getConsumerInfos, '', param, unionId)
    .then(data => {
      console.log('data',data);
      wx.hideLoading();
      var l = that.data.records;
      console.log('l=',l);
      // 格式化时间
      if (data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].consumerTime = time.formatTime(data.list[i].consumerTime / 1000, 'Y-M-D');
          l.push(data.list[i]);
        }
      }
      currentPage = data.currentPage + 1;
      console.log('currentPage', currentPage);
      that.data.records = l;
      that.setData({ records: that.data.records });
      that.setData({
        hidden: true
      });
    }, err => {
      wx.hideLoading();
    })
}
