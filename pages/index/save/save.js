import ApiUrl from '../../../api-url.js';
import * as Tool from '../../../tool.js';

// pages/index/save/save.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    citys: [],
    provincesIndex: 0,
    citysIndex: 0,
    parentCategory: [],
    parentCategoryCode: [],
    childCategory: [],
    childCategoryCode: [],
    parentIndex: 0,
    childIndex: 0,

    is_first_action: true,

    showMsg: '必填参数为空'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPannel();
    // 省份
    var globalProvinces = app.globalData.provinces;
    var provinces = [];
    for (var i = 0; i < globalProvinces.length; i++) {
      provinces.push(globalProvinces[i].name);
    }
    var citys = [];
    for (var j = 0; j < globalProvinces[this.data.provincesIndex].citys.length; j++) {
      citys.push(globalProvinces[this.data.provincesIndex].citys[j].name);
    }
    this.setData({ provinces: provinces, citys: citys });
    // 分类
    var globalCategory = app.globalData.category;
    var parentCategory = [];
    var parentCategoryCode = [];
    for (var a = 0; a < globalCategory.length; a++) {
      parentCategory.push(globalCategory[a].name);
      parentCategoryCode.push(globalCategory[a].code);
    }
    var childCategory = [];
    var childCategoryCode = [];
    for (var b = 0; b < globalCategory[this.data.parentIndex].codeList.length; b++) {
      childCategory.push(globalCategory[this.data.parentIndex].codeList[b].name);
      childCategoryCode.push(globalCategory[this.data.parentIndex].codeList[b].code);
    }
    this.setData({ parentCategory: parentCategory, childCategory: childCategory, parentCategoryCode: parentCategoryCode, childCategoryCode: childCategoryCode });
  },

  bindProvince: function (e) {
    this.setData({ provincesIndex: e.detail.value, citysIndex: this.data.citysIndex })
    var globalProvinces = app.globalData.provinces;

    var globalCitys = globalProvinces[this.data.provincesIndex].citys;
    var citys = [];
    for (var i = 0; i < globalCitys.length; i++) {
      citys.push(globalCitys[i].name);
    }
    this.setData({ citys: citys })
  },

  bindCity: function (e) {
    this.setData({
      citysIndex: e.detail.value
    })
  },

  formSubmit: function (e) {
    if (this.data.is_first_action){
      // 防止重复提交
      this.setData({ is_first_action:false});
      var value = e.detail.value;
      console.log("value", value);
      var warn = '';// 弹框提示内容
      var flag = true;// 弹框控制
      // 金额
      var amount = value.amount;
      if (amount == null || amount.length < 1) {
        warn = "金额不可为空";
      } else if (amount.indexOf(".") != -1 && amount.substring(amount.indexOf("."), amount.length).length > 3){
        warn = "金额不可为空或者小数点后最多两位";
      } else if (value.consumer == null || value.consumer.length < 1){
        warn = "消费者不可为空";
      } else if (value.consumerDate == null || value.consumerDate < 1){
        warn = "日期不可为空";
      } else if (value.consumerTime == null || value.consumerTime < 1) {
        warn = "时间不可为空";
      } else if (value.description == null || value.description < 1) {
        warn = "描述不可为空";
      }else {
        flag = false;// 验证通过
        let param = {
          userId: app.globalData.xcxUserId,
          province: this.data.provinces[value.province],
          city: this.data.citys[value.city],
          code: this.data.childCategoryCode[value.childCode],
          codeName: this.data.childCategory[value.childCode],
          parentCode: this.data.parentCategoryCode[value.parentCode],
          parentCodeName: this.data.parentCategory[value.parentCode],
          amount: value.amount * 100,
          consumer: value.consumer,
          consumerTime: value.consumerDate + " " + value.consumerTime,
          description: value.description
        }
        Tool.request(ApiUrl.lanbitou.addConsumerInfo, '', param, app.globalData.unionId)
          .then(data => {
            this.setData({ is_first_action: true });
            // 更新成功后，返回上级页面
            wx.navigateBack({
              delta: 1
            })
          }, err => {
            this.setData({ is_first_action: true });
          })
      }
      if (flag) {
        this.setData({ is_first_action: true });
        wx.showModal({
          title: '提示',
          content: warn 
        })
      }
    }
  },

  formReset: function () {
    console.log('form发生了reset事件')
  },

  bindParentCategory: function (e) {
    this.setData({ parentIndex: e.detail.value, childIndex: this.data.childIndex })
    var globalCategory = app.globalData.category;

    var globalChildCategory = globalCategory[this.data.parentIndex].codeList;
    var childCategory = [];
    var childCategoryCode = [];
    for (var i = 0; i < globalChildCategory.length; i++) {
      childCategory.push(globalChildCategory[i].name);
      childCategoryCode.push(globalChildCategory[i].code);
    }
    this.setData({ childCategory: childCategory, childCategoryCode: childCategoryCode });
  },

  bindChildCategory: function (e) {
    this.setData({
      childIndex: e.detail.value
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
      consumerDate: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      consumerTime: e.detail.value
    })
  }
})