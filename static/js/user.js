var locqx = window.sessionStorage.getItem("locqx"); //当前用户权限
var user_code = window.sessionStorage.getItem("user_code"); //用户名
var hospital_id = window.sessionStorage.getItem("id"); //医院ID
var hoscncn = window.sessionStorage.getItem("hoscn"); //医院名称
var qx;
console.log(locqx);
console.log(user_code);
if (locqx == 1) {
    var val = document.getElementById('val');
    val.innerText = '管理员';
    qx = 2;
    console.log(locqx);
} else if (locqx == 2) {
    var hostab = document.getElementById('hos');
    hostab.style.display = "none";
    var val = document.getElementById('val');
    val.innerText = '普通用户';
    qx = 3;
    console.log(locqx);
    // var child1 = document.getElementById("ssyy");
    // var child = document.getElementById("select2");
    // child.parentNode.removeChild(child);
    // child1.parentNode.removeChild(child1);
} else if (locqx == 3) {
    var deluser = document.getElementById('deluser');
    var adduser = document.getElementById('adduser');
    var hostab = document.getElementById('hos');
    deluser.style.display = "none";
    adduser.style.display = "none";
    hostab.style.display = "none";
    console.log(locqx);
}
console.log("login");
var regd = document.querySelector('#zcregd');
console.log(regd);
//医院id列表
var addusertab = document.getElementById('adduser');
console.log(addusertab)
var hosary = [];
var hosary1 = [];
addusertab.onclick = function () {
    if (locqx == 1) {
        $.ajax({
            url: '/mob_user/hos/queryset_hos/',
            // url: './hos.json',
            type: "post",
            data: '',
            success: function (info) {
                console.log(info);
                console.log(info);
                var name = info.successResult;
                var childs = document.getElementsByClassName('option');
                for (var j = childs.length - 1; j >= 0; j--) {
                    childs[j].parentNode.removeChild(childs[j]);
                }
                for (var i = 0; i < name.length; i++) {
                    console.log(name[i]);
                    hosary[i] = name[i].hos_name_cn;
                    hosary1[i] = name[i].id;
                    console.log(hosary);
                    console.log(hosary1);
                    var select2 = document.getElementById('select2');
                    console.log(select2);
                    console.log('for');
                    var option = document.createElement("option");
                    option.setAttribute("class", "option");
                    option.setAttribute("value", name[i].id);
                    option.innerText = name[i].hos_name_cn;
                    // console.log(hosary[h]);
                    $('#select2').append(option);
                }
            }
        });
    } else if (locqx == 2) {
        console.log(hoscn)
        var childs = document.getElementsByClassName('option');
        for (var j = childs.length - 1; j >= 0; j--) {
            childs[j].parentNode.removeChild(childs[j]);
        }
        var select2 = document.getElementById('select2');
        console.log(select2);
        console.log('for');
        var option = document.createElement("option");
        option.setAttribute("class", "option");
        option.setAttribute("value", hospital_id);
        option.innerText = hoscncn;
        // console.log(hosary[h]);
        $('#select2').append(option);
    }
}
//注册账号
regd.onclick = function () {
    console.log('beidianle');
    var login = document.querySelector('#zcname').value;
    var pwd = document.querySelector('#zcpwd').value;
    // var qx = document.querySelector('#select').value;
    var qx2 = document.querySelector('#select2').value;
    var pwd2 = document.querySelector('#zcpwd2').value;
    // var yx = document.querySelector('#zcyx').value;
    // var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    //     str = yx;
    // var tf = pattern.test(str);
    // console.log(tf);
    if (login == '') {
        alert("您还未填写账户名");
    } else if (qx == 'wxz') {
        alert('您还未选择账户类型');
    } else if (pwd == '') {
        alert('您还未填写密码');
    } else if (pwd2 == '') {
        alert('您还未确认密码');
    } else if (qx2 == '') {
        alert('您还未选择医院');
    } else if (pwd != pwd2) {
        alert('两次输入的密码不一致');
    } else {
        var obj = new Object();
        obj['username'] = login;
        obj['password'] = pwd;
        obj['password2'] = pwd2;
        // obj['email'] = yx;
        obj['state'] = qx;
        obj['id'] = qx2;
        console.log(login);
        console.log(pwd);
        // var Datas = JSON.stringify(obj);
        console.log(qx);
        $.ajax({
            type: 'post',
            url: '/mob_user/add_mob_user/',
            // url: './adduser.json',
            data: obj,
            success: function (data) {
                if (data.errorMsg == 'Username exists') {
                    alert('此用户名已被占用');
                } else if (data.ret_cd == 500) {
                    alert('服务器错误');
                } else if (data.ret_cd == 403) {
                    alert('您没有权限');
                } else if (data.ret_cd == 200) {
                    var clogin = document.querySelector('#zcname');
                    var cpwd = document.querySelector('#zcpwd');
                    var cpwd2 = document.querySelector('#zcpwd2');
                    clogin.value = '';
                    cpwd.value = '';
                    cpwd2.value = '';
                    console.log(data);
                    alert('注册完成');
                }
            },
            error: function (err) {
                alert('请求失败');
            }
        });
    }
};
//修改密码
var xgregd = document.querySelector('#xgregd');
xgregd.onclick = function () {
    console.log('beidianle');
    var login = document.querySelector('#xgname').value;
    var pwd = document.querySelector('#xgpwd').value;
    var pwd2 = document.querySelector('#xgpwd2').value;
    if (login == '') {
        alert("您还未填写现有的密码");
    } else if (pwd == '') {
        alert('您还未填写新的密码');
    } else if (pwd != pwd2) {
        alert('两次输入密码不一致');
    } else {
        var obj = new Object();
        obj['oldpassword'] = login;
        obj['newpassword1'] = pwd;
        console.log(login);
        console.log(pwd);
        console.log(obj);
        // var Datas = JSON.stringify(obj);
        console.log(obj);
        var Datas = {
            'oldpassword': login,
            'newpassword1': pwd
        }
        console.log(Datas)
        $.ajax({
            type: 'post',
            url: '/mob_user/changepwd/',
            // url: './changepwd.json',
            data: Datas,
            success: function (data) {
                console.log(data);
                if (data.ret_cd == 102) {
                    alert("原密码错误:" + data.errorMsg)
                } else if (data.ret_cd == 101) {
                    alert("未输入原密码:" + data.errorMsg);
                } else if (data.ret_cd == 200) {
                    var dlogin = document.querySelector('#xgname');
                    var dpwd = document.querySelector('#xgpwd');
                    var dpwd2 = document.querySelector('#xgpwd2');
                    dlogin.value = '';
                    dpwd.value = '';
                    dpwd2.value = '';
                    alert('修改完成，跳回到登录页面');
                    // window.sessionStorage.clear();
                    // console.log('clear session')
                    // window.location = '/api/ocr/val_tion_login/'
                    // window.location = './login.html'
                } else if (data.ret_cd == 500) {
                    alert('服务器错误:' + data.errorMsg)
                } else if (data.retcd == 403) {
                    alert('您没有权限:' + data.errorMsg)
                }

            },
            error: function (err) {
                alert('请求失败');
            }
        });
    }
};
//账户列表渲染，所有账户列表以及删除
var deluser = document.getElementById('deluser');
console.log(deluser);
deluser.onclick = function deluser() {
    console.log(user_code)

    $.ajax({
        url: '/mob_user/queryset_mob_user/',
        // url: './deluser.json',
        type: "post",
        data: '',
        success: function (info) {
            console.log(info);
            var name = info.successResult;
            console.log(name);
            var tbtable = document.getElementById('tbtable');
            console.log(tbtable);
            var elements = document.getElementsByClassName('newtr');
            for (var j = elements.length - 1; j >= 0; j--) {
                elements[j].parentNode.removeChild(elements[j]);
            }
            for (var i = 0; i < name.length; i++) {
                var username = name[i].username,
                    delid = name[i].id,
                    isid = name[i].is_permissions,
                    is_permissions = name[i].is_permissions,
                    last_login = name[i].last_login,
                    deltrue = name[i].login_permissions,
                    email = name[i].email,
                    hos = name[i].hos_name_cn;
                var tduser = document.createElement("td");
                var tdtime = document.createElement("td");
                var tdhos = document.createElement("td");
                var tdqx = document.createElement("td");
                var phone = document.createElement("td");
                var tdemail = document.createElement("td");
                var deltruetd = document.createElement("td");
                var tsqx = document.createElement("a");
                var usertr = document.createElement("tr");
                var alink = document.createElement("a");
                var delgost = document.createElement('span');
                var delgost3 = document.createElement('span');
                usertr.setAttribute("id", "tr" + i);
                usertr.setAttribute("class", "newtr");
                $("#tbtable").append(usertr);
                //用户名
                tduser.setAttribute("class", "tduser");
                tduser.innerText = username;
                $("#tr" + i).append(tduser);

                //用户权限
                tdqx.setAttribute("class", "tdqx");
                if (is_permissions == '1') {
                    tdqx.innerText = '超级管理';
                } else if (is_permissions == '2') {
                    tdqx.innerText = '管理账户';
                } else if (is_permissions == '3') {
                    tdqx.innerText = '普通账户';
                }
                $("#tr" + i).append(tdqx);
                //账户状态:是否被删除
                deltruetd.setAttribute("class", "deltruetd");
                if (deltrue == true) {
                    deltruetd.innerText = '正常使用';
                } else if (deltrue == false) {
                    deltruetd.innerText = '已删除';
                }
                $("#tr" + i).append(deltruetd);
                //上次登录时间
                // tdtime.setAttribute("class", "tdtime");
                // if (last_login == 'None') {
                //     tdtime.innerText = "----:--:-- --:--:--"
                // } else {
                //     tdtime.innerText = last_login;
                // }

                // $("#tr" + i).append(tdtime);
                //电话
                phone.setAttribute("class", "phone");
                phone.innerText = '';
                $("#tr" + i).append(phone);

                //医院所属
                tdhos.setAttribute("class", "tdhos");
                tdhos.innerText = hos;
                $("#tr" + i).append(tdhos);

                tdemail.setAttribute("id", "tdemail" + i);
                $("#tr" + i).append(tdemail);
                //权限提升
                tsqx.setAttribute("href", "javascript:;");
                tsqx.setAttribute("class", "ts");
                tsqx.innerText = '提升';
                $("#tdemail" + i).append(tsqx);
                console.log(is_permissions);
                delgost3.setAttribute("class", "delgost3");
                delgost3.innerText = is_permissions;
                $("#tdemail" + i).append(delgost3);
                //删除
                alink.setAttribute("href", "javascript:;");
                alink.setAttribute("class", "delete");
                alink.innerText = '删除';
                $("#tdemail" + i).append(alink);
                delgost.setAttribute("class", "delgost");
                delgost.innerText = delid;
                $("#tdemail" + i).append(delgost);

            };
            //删除一条账户
            var del = document.querySelectorAll('.delete');
            console.log(del);

            function idot() {
                for (i = 0; i < del.length; i++) {
                    del[i].onclick = function () {
                        console.log("dianjile");
                        console.log(this);
                        // var delgost = document.querySelectorAll('delete');
                        del = this.innerHTML;
                        delgostid = this.nextElementSibling.innerHTML;
                        var r = confirm("确定要删除吗？");
                        if (r == true) {
                            // var url = "./del.json";
                            var url = "/mob_user/mob_user_delete/";
                            var datas = {
                                'id': delgostid,
                            }
                            // var datass = JSON.stringify(datas);
                            $.ajax({
                                url: url,
                                type: "post",
                                data: datas,
                                success: function (info) {
                                    if (info.ret_cd == '101') {
                                        alert('该账户id不存在');
                                    } else if (info.ret_cd == '200') {
                                        alert('删除成功');
                                        console.log(info);
                                        //刷新
                                        deluser();
                                        console.log(datas);
                                    } else if (info.ret_cd == '403') {
                                        alert('您的权限不足');
                                    } else {
                                        alert('请求出错，错误：' + info.errorMsg)
                                        window.location.reload();
                                    }
                                    // var _this = this;
                                    // console.log(_this);
                                    // var parent = _this.parentNode;
                                    // console.log(parent);
                                }
                            })
                        }
                    };
                };
            }
            idot();
            //提升等级
            var ts = document.querySelectorAll('.ts');
            console.log(ts);

            function idotts() {
                for (i = 0; i < ts.length; i++) {
                    ts[i].onclick = function () {
                        console.log("dianjile");
                        console.log(this);
                        // var delgost = document.querySelectorAll('delete');
                        ts = this.innerHTML;
                        is_permissions = this.nextElementSibling.innerHTML;
                        user_id = this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
                        if (is_permissions == 2) {
                            alert('您不能提升管理用户');
                        } else if (is_permissions == 3) {
                            // console.log(user_id,is_permissions)
                            var r = confirm("确定要提升权限吗？");
                            if (r == true) {
                                // var url = "./del.json";
                                var url = "/mob_user/Empower_user/";
                                is_permissions = parseInt(is_permissions) + -1;
                                var datas = {
                                    'user_id': user_id,
                                    'is_permissions': is_permissions
                                }
                                // var datass = JSON.stringify(datas);
                                $.ajax({
                                    url: url,
                                    type: "post",
                                    data: datas,
                                    success: function (info) {
                                        if (info.ret_cd == '101') {
                                            alert('该账户id不存在');
                                        } else if (info.ret_cd == '200') {
                                            alert('提升成功');
                                            console.log(info);
                                            //刷新
                                            deluser();
                                            console.log(datas);
                                        } else if (info.ret_cd == '403') {
                                            alert('您的权限不足');
                                        } else {
                                            alert('请求出错，错误：' + info.errorMsg)
                                            window.location.reload();
                                        }
                                        // var _this = this;
                                        // console.log(_this);
                                        // var parent = _this.parentNode;
                                        // console.log(parent);
                                    }
                                })
                            }
                        }

                    };
                };
            }
            idotts();
        }
    });
}
//用户管理查询
var ssyh_btn = document.getElementById("ssyh_btn");
ssyh_btn.onclick = function deluser() {
    console.log(user_code);
    var ssyh_inp = document.getElementById("ssyh_inp").value;
    console.log(ssyh_inp);
    $.ajax({
        url: '/mob_user/queryset_mob_user/',
        // url: './deluser.json',
        type: "post",
        data: {
            name: ssyh_inp
        },
        success: function (info) {
            console.log(info);
            var name = info.successResult;
            console.log(name);
            var tbtable = document.getElementById('tbtable');
            console.log(tbtable);
            var elements = document.getElementsByClassName('newtr');
            for (var j = elements.length - 1; j >= 0; j--) {
                elements[j].parentNode.removeChild(elements[j]);
            }
            for (var i = 0; i < name.length; i++) {
                var username = name[i].username,
                    delid = name[i].id,
                    isid = name[i].is_permissions,
                    is_permissions = name[i].is_permissions,
                    last_login = name[i].last_login,
                    deltrue = name[i].login_permissions,
                    email = name[i].email,
                    hos = name[i].hos_name_cn;
                var tduser = document.createElement("td");
                var tdtime = document.createElement("td");
                var tdhos = document.createElement("td");
                var tdqx = document.createElement("td");
                var phone = document.createElement("td");
                var tdemail = document.createElement("td");
                var deltruetd = document.createElement("td");
                var tsqx = document.createElement("a");
                var usertr = document.createElement("tr");
                var alink = document.createElement("a");
                var delgost = document.createElement('span');
                var delgost3 = document.createElement('span');
                usertr.setAttribute("id", "tr" + i);
                usertr.setAttribute("class", "newtr");
                $("#tbtable").append(usertr);
                //用户名
                tduser.setAttribute("class", "tduser");
                tduser.innerText = username;
                $("#tr" + i).append(tduser);

                //用户权限
                tdqx.setAttribute("class", "tdqx");
                if (is_permissions == '1') {
                    tdqx.innerText = '超级管理';
                } else if (is_permissions == '2') {
                    tdqx.innerText = '管理账户';
                } else if (is_permissions == '3') {
                    tdqx.innerText = '普通账户';
                }
                $("#tr" + i).append(tdqx);
                //账户状态:是否被删除
                deltruetd.setAttribute("class", "deltruetd");
                if (deltrue == true) {
                    deltruetd.innerText = '正常使用';
                } else if (deltrue == false) {
                    deltruetd.innerText = '已删除';
                }
                $("#tr" + i).append(deltruetd);
                //上次登录时间
                // tdtime.setAttribute("class", "tdtime");
                // if (last_login == 'None') {
                //     tdtime.innerText = "----:--:-- --:--:--"
                // } else {
                //     tdtime.innerText = last_login;
                // }

                // $("#tr" + i).append(tdtime);
                //电话
                phone.setAttribute("class", "phone");
                phone.innerText = '';
                $("#tr" + i).append(phone);

                //医院所属
                tdhos.setAttribute("class", "tdhos");
                tdhos.innerText = hos;
                $("#tr" + i).append(tdhos);

                tdemail.setAttribute("id", "tdemail" + i);
                $("#tr" + i).append(tdemail);
                //权限提升
                tsqx.setAttribute("href", "javascript:;");
                tsqx.setAttribute("class", "ts");
                tsqx.innerText = '提升';
                $("#tdemail" + i).append(tsqx);
                console.log(is_permissions);
                delgost3.setAttribute("class", "delgost3");
                delgost3.innerText = is_permissions;
                $("#tdemail" + i).append(delgost3);
                //删除
                alink.setAttribute("href", "javascript:;");
                alink.setAttribute("class", "delete");
                alink.innerText = '删除';
                $("#tdemail" + i).append(alink);
                delgost.setAttribute("class", "delgost");
                delgost.innerText = delid;
                $("#tdemail" + i).append(delgost);

            };
            //删除一条账户
            var del = document.querySelectorAll('.delete');
            console.log(del);

            function idot() {
                for (i = 0; i < del.length; i++) {
                    del[i].onclick = function () {
                        console.log("dianjile");
                        console.log(this);
                        // var delgost = document.querySelectorAll('delete');
                        del = this.innerHTML;
                        delgostid = this.nextElementSibling.innerHTML;
                        var r = confirm("确定要删除吗？");
                        if (r == true) {
                            // var url = "./del.json";
                            var url = "/mob_user/mob_user_delete/";
                            var datas = {
                                'id': delgostid,
                            }
                            // var datass = JSON.stringify(datas);
                            $.ajax({
                                url: url,
                                type: "post",
                                data: datas,
                                success: function (info) {
                                    if (info.ret_cd == '101') {
                                        alert('该账户id不存在');
                                    } else if (info.ret_cd == '200') {
                                        alert('删除成功');
                                        console.log(info);
                                        //刷新
                                        deluser();
                                        console.log(datas);
                                    } else if (info.ret_cd == '403') {
                                        alert('您的权限不足');
                                    } else {
                                        alert('请求出错，错误：' + info.errorMsg)
                                        window.location.reload();
                                    }
                                    // var _this = this;
                                    // console.log(_this);
                                    // var parent = _this.parentNode;
                                    // console.log(parent);
                                }
                            })
                        }
                    };
                };
            }
            idot();
            //提升等级
            var ts = document.querySelectorAll('.ts');
            console.log(ts);

            function idotts() {
                for (i = 0; i < ts.length; i++) {
                    ts[i].onclick = function () {
                        console.log("dianjile");
                        console.log(this);
                        // var delgost = document.querySelectorAll('delete');
                        ts = this.innerHTML;
                        is_permissions = this.nextElementSibling.innerHTML;
                        user_id = this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
                        if (is_permissions == 2) {
                            alert('您不能提升管理用户');
                        } else if (is_permissions == 3) {
                            // console.log(user_id,is_permissions)
                            var r = confirm("确定要提升权限吗？");
                            if (r == true) {
                                // var url = "./del.json";
                                var url = "/mob_user/Empower_user/";
                                is_permissions = parseInt(is_permissions) + -1;
                                var datas = {
                                    'user_id': user_id,
                                    'is_permissions': is_permissions
                                }
                                // var datass = JSON.stringify(datas);
                                $.ajax({
                                    url: url,
                                    type: "post",
                                    data: datas,
                                    success: function (info) {
                                        if (info.ret_cd == '101') {
                                            alert('该账户id不存在');
                                        } else if (info.ret_cd == '200') {
                                            alert('提升成功');
                                            console.log(info);
                                            //刷新
                                            deluser();
                                            console.log(datas);
                                        } else if (info.ret_cd == '403') {
                                            alert('您的权限不足');
                                        } else {
                                            alert('请求出错，错误：' + info.errorMsg)
                                            window.location.reload();
                                        }
                                        // var _this = this;
                                        // console.log(_this);
                                        // var parent = _this.parentNode;
                                        // console.log(parent);
                                    }
                                })
                            }
                        }

                    };
                };
            }
            idotts();
        }
    });
}
//医院列表
var hos = document.getElementById('hos');
console.log(hos);
hos.onclick = function delhoss() {
    console.log(user_code)
    $.ajax({
        url: '/mob_user/hos/queryset_hos/',
        // url: './hos.json',
        type: "post",
        data: '',
        success: function (info) {
            console.log(info);
            var name = info.successResult;
            console.log(name);
            var tbtable2 = document.getElementById('tbtable2');
            console.log(tbtable2);
            var elements = document.getElementsByClassName('newtr');
            for (var j = elements.length - 1; j >= 0; j--) {
                elements[j].parentNode.removeChild(elements[j]);
            }
            for (var i = 0; i < name.length; i++) {
                var namecn = name[i].hos_name_cn,
                    nameen = name[i].hos_name_en,
                    id = name[i].id,
                    hos_username = name[i].user_name;
                var namecntd = document.createElement("td");
                var nameentd = document.createElement("td");
                var hosatd = document.createElement("td");
                var hos_user = document.createElement("td");
                var user_pho = document.createElement("td");
                var hostr = document.createElement("tr");
                var hosa = document.createElement("a");
                var delhos = document.createElement('span')

                hostr.setAttribute("id", "hostr" + i);
                hostr.setAttribute("class", "newtr");
                $("#tbtable2").append(hostr);
                //医院名称
                namecntd.setAttribute("class", "namecn");
                namecntd.innerText = namecn;
                $("#hostr" + i).append(namecntd);
                //名称缩写
                nameentd.setAttribute("class", "nameen");
                nameentd.innerText = nameen;
                $("#hostr" + i).append(nameentd);
                //管理员名称
                hos_user.setAttribute("class", "hos_user");
                hos_user.innerText = hos_username;
                $("#hostr" + i).append(hos_user);
                //联系电话（暂时为空）
                user_pho.setAttribute("class", "user_pho");
                user_pho.innerText = '';
                $("#hostr" + i).append(user_pho);
                //删除按钮
                hosatd.setAttribute("class", "hosatd" + i);
                $("#hostr" + i).append(hosatd);

                hosa.setAttribute("class", "delete2");
                hosa.innerText = '删除';
                $(".hosatd" + i).append(hosa);

                delhos.setAttribute("class", "delhos");
                delhos.innerText = id;
                $(".hosatd" + i).append(delhos);
            };
            //删除一条账户
            var del = document.querySelectorAll('.delete2');
            console.log(del);

            function idot2() {
                for (i = 0; i < del.length; i++) {
                    del[i].onclick = function () {
                        console.log("dianjile");
                        console.log(this);
                        // var delgost = document.querySelectorAll('delete');
                        del = this.innerHTML;
                        delgostid = this.nextElementSibling.innerHTML;
                        var r = confirm("确定要删除吗？");
                        if (r == true) {
                            // var url = "./del.json";
                            var datas = {
                                'id': delgostid,
                            }
                            $.ajax({
                                url: '/mob_user/hos/delete_hos/',
                                // url: './hos.json',
                                type: "post",
                                data: datas,
                                success: function (info) {
                                    if (info.ret_cd == '101') {
                                        alert('该医院id不存在');
                                    } else if (info.ret_cd == '200') {
                                        alert('删除成功');
                                        console.log(info);
                                        //刷新
                                        delhoss();
                                        console.log(datas);
                                    } else if (info.ret_cd == '403') {
                                        alert('您的权限不足');
                                    } else {
                                        alert('请求出错，错误：' + info.errorMsg)
                                        window.location.reload();
                                    }
                                }
                            })
                        }
                    };
                };
            }
            idot2();
        }
    });
}
//增加医院
var addhos_a = document.getElementById('addhos_a');
addhos_a.onclick = function addhos() {
    var hoscn = document.getElementById('hoscn').value;
    var hosen = document.getElementById('hosen').value;
    console.log(hoscn);
    if (hoscn == '') {
        alert('您还没有填写医院名称');
    } else if (hosen == '') {
        alert('您还没有填写英文名称');
    } else {
        $.ajax({
            type: 'post',
            url: '/mob_user/hos/add_hos/',
            // url: './hos.json',
            data: {
                hos_name_cn: hoscn,
                hos_name_en: hosen,
            },
            success: function (data) {
                console.log(data);
                if (data.ret_cd == 102) {
                    alert('此医院已经存在')
                } else if (data.ret_cd == 200) {
                    alert('增加成功');
                    console.log(data);
                    var name = data.successResult;
                    console.log(name);
                    var tbtable2 = document.getElementById('tbtable2');
                    console.log(tbtable2);
                    var elements = document.getElementsByClassName('newtr');
                    for (var j = elements.length - 1; j >= 0; j--) {
                        elements[j].parentNode.removeChild(elements[j]);
                    }
                    for (var i = 0; i < name.length; i++) {
                        var namecn = name[i].hos_name_cn,
                            nameen = name[i].hos_name_en,
                            id = name[i].id,
                            hos_username = name[i].user_name;
                        var namecntd = document.createElement("td");
                        var nameentd = document.createElement("td");
                        var hosatd = document.createElement("td");
                        var hos_user = document.createElement("td");
                        var user_pho = document.createElement("td");
                        var hostr = document.createElement("tr");
                        var hosa = document.createElement("a");
                        var delhos = document.createElement('span')

                        hostr.setAttribute("id", "hostr" + i);
                        hostr.setAttribute("class", "newtr");
                        $("#tbtable2").append(hostr);
                        //医院名称
                        namecntd.setAttribute("class", "namecn");
                        namecntd.innerText = namecn;
                        $("#hostr" + i).append(namecntd);
                        //名称缩写
                        nameentd.setAttribute("class", "nameen");
                        nameentd.innerText = nameen;
                        $("#hostr" + i).append(nameentd);
                        //管理员名称
                        hos_user.setAttribute("class", "hos_user");
                        hos_user.innerText = hos_username;
                        $("#hostr" + i).append(hos_user);
                        //联系电话（暂时为空）
                        user_pho.setAttribute("class", "user_pho");
                        user_pho.innerText = '';
                        $("#hostr" + i).append(user_pho);
                        //删除按钮
                        hosatd.setAttribute("class", "hosatd" + i);
                        $("#hostr" + i).append(hosatd);

                        hosa.setAttribute("class", "delete2");
                        hosa.innerText = '删除';
                        $(".hosatd" + i).append(hosa);

                        delhos.setAttribute("class", "delhos");
                        delhos.innerText = id;
                        $(".hosatd" + i).append(delhos);
                    };
                    //删除一条账户
                    var del = document.querySelectorAll('.delete2');
                    console.log(del);

                    function idot2() {
                        for (i = 0; i < del.length; i++) {
                            del[i].onclick = function () {
                                console.log("dianjile");
                                console.log(this);
                                // var delgost = document.querySelectorAll('delete');
                                del = this.innerHTML;
                                delgostid = this.nextElementSibling.innerHTML;
                                var r = confirm("确定要删除吗？");
                                if (r == true) {
                                    // var url = "./del.json";
                                    var datas = {
                                        'id': delgostid,
                                    }
                                    $.ajax({
                                        url: '/mob_user/hos/delete_hos/',
                                        // url: './hos.json',
                                        type: "post",
                                        data: datas,
                                        success: function (data) {
                                            if (data.ret_cd == '101') {
                                                alert('该医院id不存在');
                                            } else if (data.ret_cd == '200') {
                                                alert('删除成功');
                                                console.log(data);
                                                //刷新
                                                delhoss();
                                                console.log(datas);
                                            } else if (data.ret_cd == '403') {
                                                alert('您的权限不足');
                                            } else {
                                                alert('请求出错，错误：' + data.errorMsg)
                                                window.location.reload();
                                            }
                                        }
                                    })
                                }
                            };
                        };
                    }
                    idot2();
                }

            },
            error: function (err) {
                alert('请求失败');
            }
        });

    }

}