var locqx = window.sessionStorage.getItem("locqx");
console.log(locqx)
//超管不可以上传
if (locqx == 1) {
    var upload = document.getElementById('lodall');
    upload.style.display = 'none';
    alert("您的账户类型不支持上传");
}
var fun1, type_id_txt, purpose = new purpose(),
    type_id = purpose.GetQueryString('type'),
    data_list_obj = new Object(),
    _this = null;
var Suffix = '';
var files_type = 'img';
var upload_Url = '/api/ocr/validation/async_analysis/';
/*
 * 判断当前上传类型
 * */
switch (type_id) {
    case '100005':
        type_id_txt = '单证上传';
        break;
    case '1000':
        type_id_txt = '发票(北京)上传';
        break;
    case '1001':
        type_id_txt = '处方单上传';
        break;
    case '1002':
        type_id_txt = '化验单上传';
        break;
    case '100001':
        type_id_txt = '体检报告上传';
        break;
    case '1004':
        type_id_txt = '影响检查报告上传';
        break;
    case '1003':
        type_id_txt = '出、入院记录上传';
        break;
    case '1005':
        type_id_txt = '病案首页上传';
        upload_Url = '/api/ocr/validation/async_analysis/';
        break;
    case '1006':
        type_id_txt = '费用清单上传';
        upload_Url = '/api/ocr/validation/async_analysis/';
        break;
    case '1007':
        type_id_txt = '病理报告';
        break;
    case '100006':
        type_id_txt = 'ZIP包上传<span style="color:red;">*（包内图片需为 JPG PNG格式）</span>';
        Suffix = 'ZIP'; //定义 限制 上传类型
        break;
    case '100002':
        type_id_txt = 'PDF文件上传';
        Suffix = 'PDF'; //定义 限制 上传类型
        files_type = '';
        upload_Url = '/api/ocr/validation/async_analysis/';
        break;
}
// 显示 上传类型
// 需要提交的 参数 type：类型 user_code：账户名
data_list_obj['type'] = 1002;
var user_code = document.querySelector('#User_Name').innerText;
console.log(user_code);
data_list_obj['user_code'] = user_code;
console.log(data_list_obj['user_code']);
var logo = window.sessionStorage.getItem("logo");
data_list_obj['logo'] = logo;
// 提交的
data_list_obj_ = JSON.stringify(data_list_obj);
var files;
try {
    parent.closeALL_layer();
} catch (err) {
    console.log(err);
}
var l = 1;
var k = 1;
/*
 * layer上传方法
 * */
layui.use('upload', function () {
    var $ = layui.jquery,
        upload = layui.upload;
    //多文件列表示例
    var demoListView = $('#demoList'),
        uploadListIns = upload.render({
            elem: '#testList',
            url: upload_Url,
            accept: files_type,
            exts: Suffix,
            multiple: true,
            auto: false,
            data: {
                'type':1002,
                'user_code':user_code,
                'logo':logo,
                'the_user_id': (function () {
                    var zhi = document.getElementById('BT_inp'+ k).value;
                    console.log(zhi)
                    k++;
                    return zhi
                }),
            },
            bindAction: '#testListAction',
            field: 'im_id',
            number: '10',
            choose: function (obj) {
                _this = this;
                files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                //读取本地文件
                obj.preview(function (index, file, result) {
                    var tr;
                    window_files['0'] = file
                    var sso = new Object();
                    var ss = getImgURL(file);
                    sso['a'] = ss;
                    console.log(file)
                    // if (type_id == '100002') {
                    tr = $(['<tr id="upload-' + index + '">', '<td onclick="See(\'' + sso.a + '\')" style="curser:pointer;">' + file.name + '</td>', '<td>' + '<input id="BT_inp' + l + '"value="' + l++ + '">' + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>', '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
                    // } else {
                    //     tr = $(['<tr id="upload-' + index + '">', '<td>' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>', '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
                    // }
                    //单个重传
                    tr.find('.demo-reload').on('click', function () {
                        obj.upload(index, file);
                    });
                    //删除
                    tr.find('.demo-delete').on('click', function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    });
                    demoListView.append(tr);
                });
            },
            before: function (obj) {
                layer.load(); //上传loading
                var BT_inp = document.getElementById('BT_inp'+ k);
                console.log(BT_inp);
                k=1;
                console.log($('#BT_inp1').val());  
            },
            done: function (res, index, upload) {
                if (res.errorMsg == "user_code is None") {
                    layer.msg('登录错误或登录过期 2 秒后返回登录界面');
                    setTimeout(function () {
                        parent.url_login();
                    }, 2000)
                }
                layer.closeAll();
                if (res.errorMsg === '') { //上传成功
                    var tr = demoListView.find('tr#upload-' + index),
                        tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html(''); //清空操作
                    return delete this.files[index]; //删除文件队列已经上传成功的文件
                }
                this.error(index, upload);
            },
            error: function (index, upload) {
                var tr = demoListView.find('tr#upload-' + index),
                    tds = tr.children();
                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
            }
        });
    See = function (index) {
        console.log(index)
        layer.open({
            type: 1 //此处以iframe举例
                ,
            title: '预览',
            area: ['50%', '70%'],
            shade: 0.2,
            maxmin: true,
            offset: [ //为了演示，随机坐标
                '25%', '25%'
            ],
            content: "<img src='" + index + "' style='width:100%;'>",
            btn: ['关闭'] //只是为了演示
                ,
            btn1: function () {
                layer.closeAll();
            },
            zIndex: layer.zIndex //重点1
                ,
            success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
    };
    /*
     * 上传方法，判断如果为 案件上传方式 则直接使用当前方法
     * */
    fun1 = function () {
        var fe = new FormData();
        var index = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        if (!files) {
            layer.closeAll();
            layer.msg('请选择图片！');
            return;
        } else {
            $('#testListAction').click();
        }
    }
});