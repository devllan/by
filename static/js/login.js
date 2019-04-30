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
    if (login == '') {
        alert('请输入您的账号');
    } else if (pwd == '') {
        alert('请输入密码');
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
                    console.log(data)
                    var Data = data.successResult;
                    for (var i = 0; i < Data.length; i++) {
                        console.log('for');
                        var locqx = Data[i].is_permissions;
                        var user_code = Data[i].user_code;
                        console.log(Data[i].hos)
                        for (var j = 0; j < Data[i].hos.length; j++){
                            var id = Data[i].hos[j].id;
                            var logo = Data[i].hos[j].logo;
                            var hoscn = Data[i].hos[j].hos_name_cn;
                        }   
                        console.log(logo)
                        console.log(locqx)
                    }
                    window.sessionStorage.setItem("locqx", locqx);//当前用户权限
                    window.sessionStorage.setItem("user_code", user_code);//用户名？
                    window.sessionStorage.setItem("id", id);//医院id
                    window.sessionStorage.setItem("logo", logo);//医院logo  唯一标识？
                    window.sessionStorage.setItem("hoscn", hoscn);//医院名称
                    console.log(window.sessionStorage.getItem("user_code"));
                    console.log(window.sessionStorage.getItem("locqx"));
                    console.log(window.sessionStorage.getItem("id"));
                    console.log(window.sessionStorage.getItem("logo"));
                    window.location = '/api/ocr/val_tion_index/'
                } else if (data.ret_cd === 104) {
                    window.location = '/api/ocr/val_tion_login/'
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