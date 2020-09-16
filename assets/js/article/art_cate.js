$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    //调用接口获取文章列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var index = ''
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })

    })
    //   添加文章列表
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章失败')
                }
                layer.msg('添加文章成功')
                initArtCateList()
                layer.close(index)
            }
        })

    })
    var indexEdit = ''
    //编辑文章列表
    $('body').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    //为修改按钮添加点击
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章列表失败')
                }
                layer.msg('更新文章列表成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    //删除功能
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('删除文章分类失败')
                }
                layer.msg('删除文章分类成功')
                initArtCateList()
            }
        })
    })









})