
var user_code = document.querySelector('#User_Name').innerText;
var search_input = document.querySelector('#search_input').innerText;
console.log(user_code);
layui.use('table', function () {
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#test',
        method: 'post',
        where: {user: user_code, search_name: ''},
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.errorMsg, //解析提示文本
                "count": res.counts, //解析数据长度
                "data": res.successResult //解析数据列表
            };
        },
        height: 500,
        url:"/api/ocr/validation/retrieve/",
        // url: './history.json', //数据接口
        page: true //开启分页
            ,
        limit: 10,
        limits: [10, 20],
        cols: [
            [ //表头
                {
                    field: 'up_image_name',
                    title: '影像文件名',
                    width: '31%'
                }, {
                    field: 'update_tim',
                    title: '校验日期',
                    width: '12%'
                }, {
                    field: 'update_tim',
                    title: '校验时间',
                    width: '12%'
                }, {
                    field: 'auditor',
                    title: '操作员',
                    width: '10%'
                }, {
                    field: 'state',
                    title: '状态(校验完成:2)',
                    width: '10%'
                }, {
                    title: '操作',
                    fixed: 'right',
                    width: 80,
                    align: 'center',
                    toolbar: '#barDemo'
                }
            ]
        ]
    });
    //监听工具条
    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'detail') { //查看
            //do somehing
            console.log(data);

            var Datas = {
                'uuids': data.uuids,
                'image_name': data.image_name
            }

            var search_name = document.querySelector("#search_input").value;
            console.log(user_code);
            console.log(search_name);
            // var Datas = {
            //     'user': user_code,
            //     'search_name':search_name
            // };
            // 
            console.log("zhezhaosan");
            zhezhao.style.display = "none";
            again.style.display = "block";
            

            app.qingqiu(Datas);

            var bg = document.getElementById('search_bg');
            bg.style.display = 'none';
        } else if (layEvent === 'del') { //删除
            layer.confirm('真的删除行么', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if (layEvent === 'edit') { //编辑
            //do something

            //同步更新缓存对应的值
            obj.update({
                username: '123',
                title: 'xxx'
            });
        }
    });
});





//左侧列表数据请求
// var obj = new Object();


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
    // 
    console.log("zhezhaosan");
    // zhezhao.style.display = "none";
    again.style.display = "block";
    layui.use('table', function () {
        var table = layui.table;
    
        //第一个实例
        table.render({
            elem: '#test',
            method: 'post',
            where: {user: user_code, search_name: search_name},
            parseData: function (res) { //res 即为原始返回的数据
                return {
                    "code": 0, //解析接口状态
                    "msg": res.errorMsg, //解析提示文本
                    "count": res.counts, //解析数据长度
                    "data": res.successResult //解析数据列表
                };
            },
            height: 500,
            url:"/api/ocr/validation/retrieve/",
            // url: './history.json' //数据接口
                
            page: true //开启分页
                ,
            limit: 10,
            limits: [10, 20],
            cols: [
                [ //表头
                    {
                        field: 'up_image_name',
                        title: '影像文件名',
                        width: '31%'
                    }, {
                        field: 'update_tim',
                        title: '校验日期',
                        width: '12%'
                    }, {
                        field: 'update_tim',
                        title: '校验时间',
                        width: '12%'
                    }, {
                        field: 'auditor',
                        title: '操作员',
                        width: '10%'
                    }, {
                        field: 'state',
                        title: '状态(校验完成:2)',
                        width: '10%'
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 80,
                        align: 'center',
                        toolbar: '#barDemo'
                    }
                ]
            ]
        });
        //监听工具条
        table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象
    
            if (layEvent === 'detail') { //查看
                //do somehing
                console.log(data);
    
                var Datas = {
                    'uuids': data.uuids,
                    'image_name': data.image_name
                }
    
                var search_name = document.querySelector("#search_input").value;
                console.log(user_code);
                console.log(search_name);
                // var Datas = {
                //     'user': user_code,
                //     'search_name':search_name
                // };
                // 
                console.log("zhezhaosan");
                // zhezhao.style.display = "none";
                again.style.display = "block";
                
    
                app.qingqiu(Datas);
    
                var bg = document.getElementById('search_bg');
                bg.style.display = 'none';
            } else if (layEvent === 'del') { //删除
                layer.confirm('真的删除行么', function (index) {
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                    //向服务端发送删除指令
                });
            } else if (layEvent === 'edit') { //编辑
                //do something
    
                //同步更新缓存对应的值
                obj.update({
                    username: '123',
                    title: 'xxx'
                });
            }
        });
    });
    // }

}
again.onclick = function () {
    // window.history.back(-1);
    window.location = "/api/ocr/val_tion_history/";
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