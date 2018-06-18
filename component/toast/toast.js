// component/toast/toast.js
let toast_Data = {
  '_toast_.isHide': false,
  '_toast_.showMsg': ''
}

let toastPannel = {
  // toast 显示的方法
  show: function (data) {
    let self = this;
    this.setData({ '_toast_.isHide': true, '_toast_.showMsg': data });
    setTimeout(function () {
      self.setData({ '_toast_.isHide': false })
    }, 1000)
  }
}

function ToastPannel() {
  // 拿到当前页面对象
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  this.page = currentPage;
  // 小程序最新版吧原型链取消了
  Object.assign(currentPage, toastPannel);
  // 附加到page上，方便访问
  currentPage.toastPannel = this;
  // 把组件的数据合并到页面的data对象中
  currentPage.setData(toast_Data);
  return this;
}

// 将组件暴露出来
module.exports = {
  ToastPannel
}
