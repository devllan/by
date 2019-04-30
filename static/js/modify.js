//左侧列表数据请求
var user_code = document.querySelector('#User_Name').innerText;
console.log(user_code);
$.ajax({
    url: '/api/ocr/validation/supporting/',
    type: "get",
    data: {
        'user_code': user_code
    },
    //请求成功时的回调函数，info为后端返回的数据
    success: function (info) {
        console.log(info);
        var name = info.successResult;
        for (var i = 0; i < name.length; i++) {
            var img_name = name[i].image_name;
            var state = name[i].state;
            var audit_state = name[i].audit_state;
            var org_img = name[i].org_img; //原图名称
            var uuids = name[i].uuids;
            var user = name[i].user; //上传者
            var create_time = name[i].create_time; //上传时间
            var todolist = document.createElement("p");
            var ghost = document.createElement("p");
            var zhezhao = document.createElement("div");
            //判断各种情况，生成列表，现版本无需展示未跑完ocr的单据
            for (var j = 0; j < name.length; j++) {
                if (state === 1 && audit_state === 0) {
                    todolist.setAttribute("class", "state1");
                    todolist.setAttribute("title", "上传者：" + user + ";  原图名称:" + org_img + ";  上传时间:" + create_time);
                    todolist.innerText = img_name;
                    $("#state1ul").append(todolist);
                    ghost.setAttribute("class", "ghost");
                    ghost.innerText = uuids;
                    $("#state1ul").append(ghost);
                } else if (state === 0) {
                    todolist.setAttribute("class", "state0");
                    todolist.innerText = img_name;
                    $("#state0ul").append(todolist);
                }
            }
        }
    }
});


//定时刷新左侧列表栏
var listdiv = document.getElementsByClassName('listdiv');
console.log(listdiv)
//六秒一刷新
setInterval(function () {
    $.ajax({
        url: '/api/ocr/validation/supporting/',
        type: "get",
        data: {
            'user_code': user_code
        },
        //请求成功时的回调函数，info为后端返回的数据
        success: function (info) {
            console.log(info);
            var name = info.successResult;
            var listdiv = document.getElementById("listdiv");
            var state1ul = document.getElementById("state1ul");
            var state0ul = document.getElementById("state0ul");
            state1ul.innerHTML = "<li>&nbsp;&nbsp;待处理影像</li>";
            // state0ul.innerHTML = "<li>识别中</li>";
            console.log("remove");
            console.log(name);
            for (var i = 0; i < name.length; i++) {
                var img_name = name[i].image_name;
                var state = name[i].state;
                var audit_state = name[i].audit_state;
                var org_img = name[i].org_img;
                var uuids = name[i].uuids;
                var user = name[i].user; //上传者
                var create_time = name[i].create_time; //上传时间
                var todolist = document.createElement("p");
                var ghost = document.createElement("p");
                var zhezhao = document.createElement("div");
                //判断各种情况。
                for (var j = 0; j < name.length; j++) {
                    if (state === 1 && audit_state === 0) {
                        todolist.setAttribute("class", "state1");
                        todolist.setAttribute("title", "上传者：" + user + ";  原图名称:" + org_img + ";  上传时间:" + create_time);
                        todolist.innerText = img_name;
                        if (window.sessionStorage.getItem("wtlist") == img_name) {
                            todolist.style.background = "rgba(0,0,0,0.2)";
                        }
                        $("#state1ul").append(todolist);
                        ghost.setAttribute("class", "ghost");
                        ghost.innerText = uuids;
                        $("#state1ul").append(ghost);
                    } else if (state === 0) {
                        todolist.setAttribute("class", "state0");
                        todolist.innerText = img_name;
                        $("#state0ul").append(todolist);
                    }
                }
            }
            var state1 = document.querySelectorAll('.state1');
            var ghost = document.querySelectorAll('.ghost');
            console.log(state1);
            console.log(ghost);
            var uuids;
            // ste
            function idot() {
                for (i = 0; i < state1.length; i++) {
                    state1[i].onclick = function () {
                        console.log("dianjile");
                        uuids = this.innerHTML;
                        nx = this.nextElementSibling.innerHTML;
                        console.log(uuids);
                        console.log(nx);
                        Datas = {
                            'uuids': nx,
                            'image_name': uuids
                        }
                        for (j = 0; j < state1.length; j++) {
                            state1[j].style.background = "white"
                        }
                        window.sessionStorage.setItem("wtlist", uuids);
                        this.style.background = "rgba(0,0,0,0.2)";
                        console.log(window.sessionStorage.getItem("wtlist"));
                        console.log(Datas)
                        app.qingqiu(Datas);
                        var cloud22 = document.getElementById("cloud22");
                        var submit = document.getElementById("submit");
                        var addbtn = document.getElementById("addbtn");
                        submit.style.display = "none";
                        addbtn.style.display = "none";
                        console.log(cloud22);
                        cloud22.style.display = "block";
                        console.log(uuids)
                        var wtpic = document.getElementById("wtpic");
                        var wtpic1 = document.getElementById("wtpic1");
                        wtpic.innerText = '';
                        console.log(uuids)
                        wtpic1.innerText = '当前查看:';
                        wtpic.innerText = uuids;
                    };
                };
            }
            idot();
        }
    });
}, 6000)