$(function () {
  $("#link_reg").on("click", function () {
    $(".login_box").hide();
    $(".reg_box").show();
  });
  $("#link_login").on("click", function () {
    $(".reg_box").hide();
    $(".login_box").show();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    // 校验密码
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码 输入是否一致
    repwd: function (value) {
      var pwd = $(".reg_box [name=password]").val();
      if (value !== pwd) {
        return '两次密码不一致';
      }
    },
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功");
        $("#link_login").click();
      }
    )
  });
  // $("#form_login").submit(function (e) {
  //   // 阻止默认提交行为
  //   e.preventDefault();
  //   $.ajax({
  //     url: "/api/login",
  //     method: "POST",
  //     // 快速获取表单中的数据
  //     data: $(this).serialize(),
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layer.msg("登录失败！");
  //       }
  //       layer.msg("登录成功！");
  //       // 将登录成功得到的 token 字符串，保存到 localStorage 中
  //       localStorage.setItem("token", res.token);
  //       // 跳转到后台主页
  //       location.href = "/index.html";
  //     },
  //   });
  // });
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        // 将登录成功的token字符串,保存到localStorage中
        localStorage.setItem("token", res.token);
        //跳转到后台页面
        location.href = "/index.html";
      },
    });
  });
});
