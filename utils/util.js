//数据转化  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 */
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


module.exports = {
  formatTime: formatTime,
  validateEmail: validateEmail,
  getCurrentMonth: getCurrentMonth
}



/**
* 通过正则来检验邮箱是否有效
*/
function validateEmail(email) {
  var reg = RegExp(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g)


  return reg.test(email)
}

/**
 * 获取当前年月，格式2018-06
 * 
 */
function getCurrentMonth(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  if(month < 10){
    return year + "-0" + month; 
  }
  return year + "-" + month;
}



