$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  //统一为有权限的接口添加headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  //全局挂载complete函数
  options.complete = function (res) {
    //在complete回调函数通过responseJSON拿到服务器响应回来的数据
    // console.log(res.responseJSON);
    // 通过服务器响应回来的数据,判断身份认证是否成功
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      //身份认证失败需要做的事情
      //强制清空token
      localStorage.removeItem('token')
      //强制跳转登录页面
      location.href = '/login.html'
    }
  }
});
