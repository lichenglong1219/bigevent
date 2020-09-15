$(function () {
    var form = layui.form;
    var layer = layui.layer
    //验证表单
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1~6个字符之间!'
            }
        }
    })
    initUserInfo()
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()

    })
    //点击 修改调用接口
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                console.log(res);
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo()
                initUserInfo()
            }
        })
    })








})