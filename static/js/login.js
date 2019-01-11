// var submit = document.querySelector('.submit');
// $(submit).click(function () {
//     var login = $('input[name="login"]').val();
//     var pwd = $('input[name="pwd"]').val();
//     // console.log(submit)
//     var obj = new Object();
//     obj['user_code'] = login;
//     obj['user_key'] = pwd;
//     var Datas = JSON.stringify(obj);
//     console.log(Datas)
//     $.ajax({
//         type: 'post',
//         url: "/api/ocr/val_visualization/",
//         data: Datas,
//         success: function (info) {
//             if (info.ret_cd === 403) {
//                 alert('登陆失败')
//             } else if (info.ret_cd === 200) {
//                 alert('登陆成功')
//                 window.location = '/api/ocr/val_tion_index/'
//             }
//         }
//     })
// })


$(document).keypress(function (e) {
    // 回车键事件  
    if (e.which == 13) {
        $('.submit').click();
    }
});
$('input[name="pwd"]').focus(function () {
    $(this).attr('type', 'password');
});
$('input[type="text"]').focus(function () {
    $(this).prev().animate({
        'opacity': '1'
    }, 200);
});
$('input[type="text"],input[type="password"]').blur(function () {
    $(this).prev().animate({
        'opacity': '.5'
    }, 200);
});
var open = 0;
//非空验证
$('.submit').click(function () {
    var login = $('input[name="login"]').val();
    var pwd = $('input[name="pwd"]').val();
    // var code = $('input[name="code"]').val();
    if (login == '') {
        ErroAlert('请输入您的账号');
    } else if (pwd == '') {
        ErroAlert('请输入密码');
    } else {
        //认证中..
        var obj = new Object();
        obj['user_code'] = login;
        obj['user_key'] = pwd;
        console.log(login)
        console.log(pwd)
        var Datas = JSON.stringify(obj);
        $.ajax({
            type: 'POST',
            url: '/api/ocr/val_visualization/',
            data: Datas,
            success: function (data) {
                if (data.ret_cd === 403) {
                    alert('无权登录');
                } else if (data.ret_cd === 200) {
                    window.location = '/api/ocr/val_tion_index/'
                } else if (data.ret_cd === 104) {
                    window.location = '/api/ocr/validation_logout/'
                    alert('认证失败');
                } else {
                    alert('登录失败');
                }
            },
            error: function (err) {
                alert('请求失败');
            }
        });
    }
})