//左侧列表数据请求
// var obj = new Object();
var user_code = document.querySelector('#User_Name').innerText;
console.log(user_code);

// obj['user_code'] = user_code;
// var Datas = JSON.stringify(obj);
var btn = document.getElementById("search_btn");
var zhezhao = document.getElementById("search_bg");
var again = document.getElementById("again");
var user_code = document.querySelector('#User_Name').innerText;
console.log(user_code);

// console.log(search_name.value);

btn.onclick = function () {

    var search_name = document.querySelector("#search_input").value;
    console.log(user_code);
    console.log(search_name);
    // var Datas = {
    //     'user': user_code,
    //     'search_name':search_name
    // };
    // if (search_name == "") {
    //     alert("您还未输入查询内容");
    // } else {
        console.log("zhezhaosan");
        zhezhao.style.display = "none";
        again.style.display = "block";
        $.ajax({
            url: "/api/ocr/validation/retrieve/",
            // url: "./liebiao.json",
            type: "post",
            data: {
                'user': user_code,
                'search_name': search_name
            },
            success: function (info) {
                // var Appdiv = document.getElementById("app");
                // Appdiv.style.display = "block";
                console.log(info);
                var name = info.successResult;
                if (name == []) {
                    alert("查询结果为空");
                    var zhezhao = document.getElementById("search_bg");
                    var again = document.getElementById("again");
                    zhezhao.style.display = "block";
                    again.style.display = "none";
                }
                for (var i = 0; i < name.length; i++) {
                    var img_name = name[i].image_name;
                    var state = name[i].state;
                    var audit_state = name[i].audit_state;
                    var org_img = name[i].org_img;
                    var uuids = name[i].uuids;
                    // console.log(name);
                    // console.log(img_name);
                    // console.log(state);
                    // console.log(audit_state);
                    // console.log(uuids);
                    var todolist = document.createElement("p");
                    var ghost = document.createElement("p");
                    var zhezhao = document.createElement("div");
                    //判断各种情况。
                    for (var j = 0; j < name.length; j++) {
                        // console.log(img_name[j]);
                        if (state === 1) {
                            todolist.setAttribute("class", "state1");
                            todolist.innerText = img_name;
                            $("#state1ul").append(todolist);
                            ghost.setAttribute("class", "ghost");
                            ghost.innerText = uuids;
                            $("#state1ul").append(ghost);
                        } else if (state === 0) {
                            // zhezhao.setAttribute("id", "zhezhao");
                            todolist.setAttribute("class", "state0");
                            todolist.innerText = img_name;
                            $("#state0ul").append(todolist);
                            // ghost.setAttribute("class", "ghost");
                            // ghost.innerText = uuids;
                            // $(".state0ul").append(ghost);
                            // console.log(ghost.innerHTML);
                        }
                    }
                }
                console.log("hihihihihihihi")
                var state1 = document.querySelectorAll('.state1');
                var ghost = document.querySelectorAll('.ghost');
                console.log(state1);
                console.log(ghost);
                var cloud = document.getElementById("cloud");
                var user = document.getElementById("User_Name").innerHTML;
                var User = user;
                var uuids;
                var nx;
                // ste
                console.log(state1)

                function idot() {
                    for (i = 0; i < state1.length; i++) {
                        state1[i].onclick = function () {
                            console.log("dianjile");
                            uuids = this.innerHTML;
                            nx = this.nextElementSibling.innerHTML;
                            console.log(uuids);
                            console.log(nx);
                            var Datas = {
                                'uuids': nx,
                                'image_name': uuids
                            }
                            console.log(Datas)
                            app.qingqiu(Datas);
                            // ShowDiv(nx, uuids);
                        };
                    };
                }
                idot();
            }
        })
    // }

}
again.onclick = function () {
    // window.history.back(-1);
    window.open("/api/ocr/val_tion_history/");
}

// $.ajax({
//     // url: '/api/ocr/validation/supporting/',
//     url: './liebiao.json',
//     type: "get",
//     data: {
//         'user_code': user_code
//     },
//     // dataType: "json",
//     //请求成功时的回调函数，info为后端返回的数据
//     success: function (info) {
//         // var Appdiv = document.getElementById("app");
//         // Appdiv.style.display = "block";
//         console.log(info);

//         var name = info.successResult;
//         for (var i = 0; i < name.length; i++) {
//             var img_name = name[i].image_name;
//             var state = name[i].state;
//             var audit_state = name[i].audit_state;
//             var org_img = name[i].org_img;
//             var uuids = name[i].uuids;
//             // console.log(name);
//             // console.log(img_name);
//             // console.log(state);
//             // console.log(audit_state);
//             // console.log(uuids);
//             var todolist = document.createElement("p");
//             var ghost = document.createElement("p");
//             var zhezhao = document.createElement("div");
//             //判断各种情况。
//             for (var j = 0; j < name.length; j++) {
//                 // console.log(img_name[j]);
//                 if (state === 1) {
//                     todolist.setAttribute("class", "state1");
//                     todolist.innerText = img_name;
//                     $("#state1ul").append(todolist);
//                     ghost.setAttribute("class", "ghost");
//                     ghost.innerText = uuids;
//                     $("#state1ul").append(ghost);
//                 } else if (state === 0) {
//                     // zhezhao.setAttribute("id", "zhezhao");
//                     todolist.setAttribute("class", "state0");
//                     todolist.innerText = img_name;
//                     $("#state0ul").append(todolist);
//                     // ghost.setAttribute("class", "ghost");
//                     // ghost.innerText = uuids;
//                     // $(".state0ul").append(ghost);
//                     // console.log(ghost.innerHTML);
//                 }
//             }
//         }
//     }
// });


//定时刷新左侧列表栏
var listdiv = document.getElementsByClassName('listdiv');
console.log(listdiv)
// listdiv.location.reload()
// setInterval(function () {
//     // $(".listdiv").load(location.href+" .listdiv");
//     $.ajax({
//         // url: '/api/ocr/validation/supporting/',
//         url: './liebiao.json',
//         type: "get",
//         data: {
//             'user_code': user_code
//         },
//         // dataType: "json",
//         //请求成功时的回调函数，info为后端返回的数据
//         success: function (info) {
//             console.log(info);
//             var name = info.successResult;
//             var listdiv = document.getElementById("listdiv");
//             var state1ul = document.getElementById("state1ul");
//             var state0ul = document.getElementById("state0ul");
//             // console.log(state1ul);
//             state1ul.innerHTML = "<li>识别完成</li>";
//             state0ul.innerHTML = "<li>识别中</li>";
//             console.log("remove");
//             console.log(name);
//             for (var i = 0; i < name.length; i++) {
//                 var img_name = name[i].image_name;
//                 var state = name[i].state;
//                 var audit_state = name[i].audit_state;
//                 var org_img = name[i].org_img;
//                 var uuids = name[i].uuids;
//                 var todolist = document.createElement("p");
//                 var ghost = document.createElement("p");
//                 var zhezhao = document.createElement("div");
//                 //判断各种情况。
//                 for (var j = 0; j < name.length; j++) {
//                     // console.log(img_name[j]);
//                     if (state === 1) {
//                         todolist.setAttribute("class", "state1");
//                         todolist.innerText = img_name;
//                         $("#state1ul").append(todolist);
//                         ghost.setAttribute("class", "ghost");
//                         ghost.innerText = uuids;
//                         $("#state1ul").append(ghost);
//                     } else if (state === 0) {
//                         // zhezhao.setAttribute("id", "zhezhao");
//                         todolist.setAttribute("class", "state0");
//                         todolist.innerText = img_name;
//                         $("#state0ul").append(todolist);
//                         // ghost.setAttribute("class", "ghost");
//                         // ghost.innerText = uuids;
//                         // $(".state0ul").append(ghost);
//                         // console.log(ghost.innerHTML);
//                     }
//                 }
//             }
//             var state1 = document.querySelectorAll('.state1');
//             var ghost = document.querySelectorAll('.ghost');
//             console.log(state1);
//             console.log(ghost);
//             var uuids;
//             // ste
//             function idot() {
//                 for (i = 0; i < state1.length; i++) {
//                     state1[i].onclick = function () {
//                         console.log("dianjile");
//                         uuids = this.innerHTML;
//                         var nx = this.nextElementSibling.innerHTML;
//                         console.log(uuids);
//                         console.log(nx);
//                         var Datas = {
//                             'uuids': nx,
//                             'image_name': uuids
//                         }
//                         console.log(Datas)
//                         app.qingqiu(Datas);
//                         // ShowDiv(nx, uuids);
//                     };
//                 };
//             }
//             idot();
//         }
//     });

// }, 6000)