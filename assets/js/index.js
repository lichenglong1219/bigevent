$(function () {
    // 调用函数,获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //做两件事
            //1.清除本地储存的数据
            localStorage.removeItem('token')
            //2.跳转页面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        //headers放在baseAPI里面方便带有/my/的接口调用
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        //把 complete函数放在baseAPI中.判断所有的请求
        //无论成功还是失败,都会调用complete回调函数,通过回调函数返回的值来确定是否调用成功
        // complete: function (res) {
        //     //在complete回调函数通过responseJSON拿到服务器响应回来的数据
        //     console.log(res.responseJSON);
        //     // 通过服务器响应回来的数据,判断身份认证是否成功
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //身份认证失败需要做的事情
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转登录页面
        //         location.href = '/login.html'
        //     }

        // }
    })
}
//渲染头像和昵称
function renderAvatar(user) {
    //获取用户的昵称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需设置头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文字头像
        $('.layui-nav-img').show()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).hide()


    }
} 