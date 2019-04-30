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
            console.log("zhezhaosan");
            zhezhao.style.display = "none";
            again.style.display = "block";
            //发送请求
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
var btn = document.getElementById("search_btn");
var zhezhao = document.getElementById("search_bg");
var again = document.getElementById("again");
var user_code = document.querySelector('#User_Name').innerText;
console.log(user_code);
btn.onclick = function () {
    var search_name = document.querySelector("#search_input").value;
    console.log(user_code);
    console.log(search_name);
    console.log("zhezhaosan");
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
                console.log("zhezhaosan");
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
}
again.onclick = function () {
    window.location = "/api/ocr/val_tion_history/";
}