//代码因功能迭代，功能减少，会有冗余的部分
var url = '/api/ocr/validation/async_result/';
var state1 = document.querySelectorAll('.state1');
var ghost = document.querySelectorAll('.ghost');
console.log(state1);
console.log(ghost);
var cloud = document.getElementById("cloud");
var user = document.getElementById("User_Name").innerHTML;
var User = user;
var uuids;
var nx;
var Datas;
// 给左侧按钮添加点击查询单条详细信息事件
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
            var wtpic = document.getElementById("wtpic");
            var wtpic1 = document.getElementById("wtpic1");
            wtpic.innerText = '';
            console.log(uuids)
            wtpic1.innerText = '当前查看:';
            wtpic.innerText = uuids;
            console.log(Datas)
            app.qingqiu(Datas);
            var cloud22 = document.getElementById("cloud22");
            var submit = document.getElementById("submit");
            var addbtn = document.getElementById("addbtn");
            submit.style.display = "none";
            addbtn.style.display = "none";
            console.log(cloud22);
            cloud22.style.display = "block";
        };
    };
}
idot();
//vue
var dir = 0,
    der = 1;
var app = new Vue({
    el: '#app',
    data: {
        inData: {},
        RenderingData: {
            exihibitpic: ''
        } //最终渲染数据
        ,
        documentTypeList: {
            medical_report: false //影像报告，出入院报告
                ,
            medical_record_home: false //病案首页
                ,
            cost_listing: false //费用清单
                ,
            invoice: false //发票
                ,
            laboratory: false //化验单
                ,
            pres: false //处方单
                ,
            other: false //未知
        },
        Flag: [],
    },
    created: function () {
        console.log('created');
    },
    mounted: function () {
        console.log('mounted');
    },
    methods: {
        init: function () {},
        //发送请求
        qingqiu: function (Datas) {
            var cloud = document.getElementById('cloud');
            cloud.style.display = 'none';
            var _this = this;
            var Datas = Datas;
            this.$http.post(url, Datas).then(function (data) {
                var DataMsg = data.data.successResult;
                for (i in DataMsg) {
                    console.log(DataMsg[i])
                    console.log(_this.documentTypeList.laboratory = true)
                    console.log(_this.documentTypeList)
                    _this.RenderingData = DataMsg[0];
                    console.log(_this.RenderingData)
                    switch (i) {
                        case 'invoice':
                            _this.flagCutting(_this.RenderingData.flag);
                            break;
                        case 'cost_listing':
                            for (var i = 0; i < _this.RenderingData.cos_project_list.length; i++) {
                                _this.Flag.push(_this.RenderingData.cos_project_list[i].project_check_str.split('')[6]);
                            }
                            break;
                    }
                    break;
                }
                if (data.data.ret_cd == 103) {
                    alert('错误：103，您查询的此图片未识别出数据，图片名称' + data.data.successResult);
                    return;
                };
                console.log(Datas);
                console.log(_this.double)
                _this.inData = data.data.successResult;
                //随动框
                setTimeout(function () {
                    let ShowInput = document.getElementsByClassName("show");
                    var coordinate = data.data;
                    var coordinate_data = coordinate.successResult;
                    var Top_arr = [];
                    var Width_arr = [];
                    var Left_arr = [];
                    var Height_arr = [];
                    //取源图像的大小值
                    var
                        YWidth = document.getElementById('ImaGes').naturalWidth,
                        YHeight = document.getElementById('ImaGes').naturalHeight,
                        ImaGes = document.getElementById("ImaGes");
                    console.log(YWidth)
                    console.log(YHeight)
                    //页面内展示图像的div大小
                    console.log()
                    var NHeight = ImaGes.offsetHeight || ImaGes.clientHeight;
                    console.log(NWidth)
                    var NWidth = ImaGes.clientWidth || ImaGes.offsetWidth;
                    console.log(NHeight)
                    // 缩放比例   动态比例 根据比例调整展示框大小
                    var Wproportion = YWidth / NWidth; //X轴缩放比例
                    // console.log(Wproportion);
                    var Yproportion = YHeight / NHeight; //Y轴缩放比例
                    console.log(Yproportion);
                    // 循环赋值
                    console.log(coordinate_data)
                    var codte_data = coordinate_data[0].index_arr;
                    console.log(codte_data)

                    for (let j = 0; j < codte_data.length; j++) {
                        Top_arr.push(codte_data[j].top);
                        Left_arr.push(codte_data[j].left);
                        Width_arr.push(codte_data[j].width);
                        Height_arr.push(codte_data[j].height);
                        //鼠标进入显示展示框
                        ShowInput[j].onmouseover = function () {
                            var Newdiv = document.createElement("div");
                            Newdiv.setAttribute("id", "ShowDiv");
                            Newdiv.style.left = Left_arr[j] / Wproportion + 'px';
                            Newdiv.style.width = Width_arr[j] / Wproportion + 'px';
                            Newdiv.style.height = Height_arr[j] / Yproportion + 'px';
                            Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                            console.log(Height_arr[j])
                            console.log(parseInt(Top_arr[j]))
                            $(".imgButBox").append(Newdiv);
                        }
                        //鼠标离开删除展示框
                        ShowInput[j].addEventListener("mouseleave", function leave() {
                            $("div").remove("#ShowDiv");
                        });
                    }
                }, 500)
            }, function (err) {
                console.log(err);
            });
        },
        //关闭编辑数据上面的遮罩层，添加按钮和提交按钮显示出来
        offcloud: function () {
            console.log("offcloud");
            var cloud22 = document.getElementById("cloud22");
            var submit = document.getElementById("submit");
            var addbtn = document.getElementById("addbtn");
            submit.style.display = "block";
            addbtn.style.display = "block";
            console.log(cloud22);
            cloud22.style.display = "none";
        },
        //添加一条数据
        addlist: function () {
            console.log(app.RenderingData.index_arr);
            var index_arr = app.RenderingData.index_arr;
            index_arr.push({
                "index_value": "",
                "index_name": "",
                "height": "",
                "recognise": null,
                "index_flag": "",
                "index_normal_value": "",
                "width": "",
                "index_unit": "",
                "index_id": '',
                "top": "",
                "left": ""
            });
        },
        //删除一条数据，默认请求接口去删除库里的数据，如果是新添加的数据，index.id为空的话，直接删除。
        del: function (index) {
            console.log("delete");
            var index_id = index.index_id;
            var image_name = uuids;
            var nxx = nx;
            console.log(nxx);
            console.log(index)
            var datas = {
                'index_id': index_id,
                'uuids': nxx,
                'image_name': image_name,
            }
            var datass = JSON.stringify(datas);
            var id = index.index_id;
            console.log(id);
            if (id == "") {
                app.RenderingData.index_arr.pop();
            } else {
                var r = confirm("确定要删除一条原有数据吗？");
                if (r == true) {
                    var url = "/api/ocr/validation/del_index_arr/";
                    this.$http.post(url, datass).then(function (data) {
                        var _this = this;
                        console.log(data);
                        var DataMsg = data.data.successResult;
                        if (data.data.ret_cd == 200) {
                            for (i in DataMsg) {
                                console.log(DataMsg[i])
                                console.log(_this.documentTypeList.laboratory = true)
                                console.log(_this.documentTypeList)
                                _this.RenderingData = DataMsg[0];
                                console.log(_this.RenderingData);
                                switch (i) {
                                    case 'invoice':
                                        _this.flagCutting(_this.RenderingData.flag);
                                        break;
                                    case 'cost_listing':
                                        for (var i = 0; i < _this.RenderingData.cos_project_list.length; i++) {
                                            _this.Flag.push(_this.RenderingData.cos_project_list[i].project_check_str.split('')[6]);
                                        }
                                        break;
                                }
                                break;
                            }
                        } else if (data.data.ret_cd == 403) {
                            alert('您没有权限')
                        } else if (data.data.ret_cd !== 200) {
                            alert('请求出错，代码：' + data.data.ret_cd)
                            return;
                        }
                        if (data.data.ret_cd !== 200) {
                            alert('请求出错，代码：' + data.data.ret_cd)
                            return;
                        }
                        _this.inData = data.data.successResult;
                        //随动框，延迟500毫秒启动，否则会有bug
                        setTimeout(function () {
                            let ShowInput = document.getElementsByClassName("show");
                            var coordinate = data.data;
                            var coordinate_data = coordinate.successResult;
                            var Top_arr = [];
                            var Width_arr = [];
                            var Left_arr = [];
                            var Height_arr = [];
                            //取源图像的大小值
                            var
                                YWidth = document.getElementById('ImaGes').naturalWidth,
                                YHeight = document.getElementById('ImaGes').naturalHeight,
                                ImaGes = document.getElementById("ImaGes");
                            console.log(YWidth)
                            console.log(YHeight)
                            //页面内展示图像的div大小
                            console.log()
                            var NHeight = ImaGes.offsetHeight || ImaGes.clientHeight;
                            console.log(NWidth)
                            var NWidth = ImaGes.clientWidth || ImaGes.offsetWidth;
                            console.log(NHeight)
                            // 缩放比例   动态比例 根据比例调整展示框大小
                            var Wproportion = YWidth / NWidth; //X轴缩放比例
                            // console.log(Wproportion);
                            var Yproportion = YHeight / NHeight; //Y轴缩放比例
                            console.log(Yproportion);
                            // 循环赋值
                            console.log(coordinate_data)
                            var codte_data = coordinate_data[0].index_arr;
                            console.log(codte_data)
                            for (let j = 0; j < codte_data.length; j++) {
                                Top_arr.push(codte_data[j].top);
                                Left_arr.push(codte_data[j].left);
                                Width_arr.push(codte_data[j].width);
                                Height_arr.push(codte_data[j].height);
                                //鼠标进入显示展示框
                                ShowInput[j].onmouseover = function () {
                                    var Newdiv = document.createElement("div");
                                    Newdiv.setAttribute("id", "ShowDiv");
                                    Newdiv.style.left = Left_arr[j] / Wproportion + 'px';
                                    // Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                                    Newdiv.style.width = Width_arr[j] / Wproportion + 'px';
                                    Newdiv.style.height = Height_arr[j] / Yproportion + 'px';
                                    Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                                    console.log(Height_arr[j])
                                    console.log(parseInt(Top_arr[j]))
                                    $(".imgButBox").append(Newdiv);
                                }
                                //鼠标离开删除展示框
                                ShowInput[j].addEventListener("mouseleave", function leave() {
                                    $("div").remove("#ShowDiv");
                                });
                            }
                        }, 500)

                    }, function (err) {
                        console.log(err);
                    });
                } else if (r == false) {}
            };
            console.log(index);
        },
        //提交按钮点击事件
        submit: function () {
            console.log('submit');
            //取旧的值
            var hospital = document.getElementById("hospital");
            var name = document.getElementById("name");
            //所有的数据
            var shujv = app.RenderingData;
            console.log(app.RenderingData);
            console.log(app.RenderingData.index_arr);
            console.log(app.RenderingData.hospital.value);
            console.log(app.RenderingData.name.value);
            var Yuan = app.RenderingData;
            console.log(Yuan);
            var r = confirm("确认提交数据吗？");
            if (r == true) {
                if (hospital.value.length == 0) {
                    alert('请填写医院');
                } else if (name.value.length == 0) {
                    alert('请填写姓名');
                } else {
                    console.log(User);
                    console.log(Datas);
                    var url = '/api/ocr/validation/updata_data/?uuids=' + Datas.uuids + '&image_name=' + Datas.image_name + '&user=' + User;
                    console.log(url);
                    console.log(shujv);
                    this.$http.post(url, shujv).then(function (data) {
                        if (data.data.ret_cd == '403') {
                            alert("您没有权限");
                        } else if (data.data.ret_cd == '200') {
                            alert("提交成功");
                            console.log("post成功");
                        }
                        console.log(cloud);
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    });
                    var cloud = document.getElementById('cloud');
                    cloud.style.display = 'block';
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
                            state1ul.innerHTML = "<li>识别完成</li>";
                            state0ul.innerHTML = "<li>识别中</li>";
                            console.log("remove");
                            console.log(name);
                            for (var i = 0; i < name.length; i++) {
                                var img_name = name[i].image_name;
                                var state = name[i].state;
                                var audit_state = name[i].audit_state;
                                var org_img = name[i].org_img;
                                var uuids = name[i].uuids;
                                var todolist = document.createElement("p");
                                var ghost = document.createElement("p");
                                var zhezhao = document.createElement("div");
                                //判断各种情况。
                                for (var j = 0; j < name.length; j++) {
                                    if (state === 1) {
                                        todolist.setAttribute("class", "state1");
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
                            var state1 = document.querySelectorAll('.state1');
                            var ghost = document.querySelectorAll('.ghost');
                            console.log(state1);
                            console.log(ghost);
                            var uuids;
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
                                        console.log(Datas)
                                        app.qingqiu(Datas);
                                        var cloud22 = document.getElementById("cloud22");
                                        var submit = document.getElementById("submit");
                                        var addbtn = document.getElementById("addbtn");
                                        submit.style.display = "none";
                                        addbtn.style.display = "none";
                                        console.log(cloud22);
                                        cloud22.style.display = "block";
                                    };
                                };
                            }
                            idot();
                            console.log(app.RenderingData);
                        }
                    });
                }
            } else {
                console.log("postquxiao")
            }
        },
        flagCutting: function (flag) {
            this.Flag = flag.split('');
            return true
        },
        // 旋转效果
        direction: function (data) {
                var ImaGes = document.getElementsByClassName('imgButBox')[0];
                console.log(ImaGes);
                var wid = ImaGes.offsetHeight;
                var hei = ImaGes.offsetWidth;
                if (data) {
                    dir -= 90;
                    ImaGes.style.transition = 'ease .5s';
                    if (!((dir / 90) % 2 === 0)) {
                        ImaGes.style.width = '100%';
                    }
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                } else {
                    dir += 90;
                    ImaGes.style.transition = 'ease .5s';
                    if (!((dir / 90) % 2 === 0)) {
                        ImaGes.style.width = '100%';
                    }
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                }
            }
            //点击列表
            ,
        ListClick: function (Type, data) {
                var _this = this;
                for (var i in _this.documentTypeList) {
                    _this.documentTypeList[i] = false
                }
                _this.documentTypeList[Type] = true;
                _this.RenderingData = data;
                console.log(data);
                if (Type === 'invoice') {
                    _this.flagCutting(data.flag);
                }
            }
            // 放大效果
            ,
        enlarge: function (data) {
                var ImaGes = document.getElementsByClassName('imgButBox')[0];
                if (data) {
                    der += 0.3;
                    if (der > 3) {
                        der = 3
                    }
                    ImaGes.style.transition = 'ease .5s';
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                } else {
                    der -= 0.3;
                    if (der < 0.3) {
                        der = 0.3
                    }
                    ImaGes.style.transition = 'ease .5s';
                    ImaGes.style.transform = 'rotate(' + dir + 'deg) scale(' + der + ')';
                }
            }
            //鼠标 滑过 按钮组 效果
            ,
        suspensionTitle_block: function (e, bur, data, s) {
                var dom = document.getElementById('suspensionTitle');
                if (e === 'mot') {
                    dom.style.display = 'block';
                    if (bur === false) {
                        dom.style.display = 'none';
                    }
                }
                if (data === undefined) {
                    return
                }
                if (!bur) {
                    dom.style.display = 'none';
                }
                dom.firstElementChild.innerText = '姓名：' + data + ',医院：' + s;
                dom.style.left = e.clientX + 'px';
                dom.style.top = e.clientY + 'px';
                dom.style.display = 'block';
            }
            //删除
            ,
        dataDel: function (data) {
            console.log(data);
        },
        clr:function(index){
            console.log(index);
            index.value = '';
        }
    }
});
app.init();
//拖拽效果
function mos(event) {
    var movDom = document.getElementsByClassName('imgButBox')[0],
        _thisDom = event.path[0];
    var disL = movDom.offsetLeft,
        disT = movDom.offsetTop,
        X = event.clientX,
        Y = event.clientY;
    movDom.style.transition = '';
    document.onmousemove = function (eve) {
        movDom.style.left = disL + eve.clientX - X + 'px';
        movDom.style.top = disT + eve.clientY - Y + 'px';
    };
    document.onmouseup = function (eve) {
        document.onmousemove = function (eve) {
            return false;
        };
    };
    console.log(movDom.style.left)
};