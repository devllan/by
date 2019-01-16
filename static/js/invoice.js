var url = '/api/ocr/validation/async_result/';
// var url = './zuobiaonew.json';
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
            var nx = this.nextElementSibling.innerHTML;
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
// console.log(uuids);


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
        Flag: []
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
            var _this = this;
            // var srceach_details=JSON.parse(localStorage.srceach_details)  
            // var url='/api/ocr/validation/the_case_all/?business_id='+srceach_details.business_id+'&user_code='+localStorage.user_code;
            this.$http.post(url, Datas).then(function (data) {
                var DataMsg = data.data.successResult;
                for (i in DataMsg) {
                    console.log(DataMsg[i])
                    // _this.documentTypeList[i] = true;
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
                if (data.data.ret_cd !== 200) {
                    alert('请求出错，代码：' + data.data.ret_cd)
                    return;
                }
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
                    // for (var i = 0; i < coordinate_data.length; i++) {
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
                            // console.log((parseInt(Top_arr[j]) - parseInt(Height_arr[j])) / Yproportion);
                            // console.log((parseInt(Top_arr[j])/ Yproportion - parseInt(Height_arr[j])/ Yproportion) );
                            console.log(Height_arr[j])
                            console.log(parseInt(Top_arr[j]))
                            // Newdiv.style.top = (parseInt(Top_arr[j]) - parseInt(Height_arr[j])) / Yproportion + 'px';
                            // Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                            $(".imgButBox").append(Newdiv);
                        }
                        //鼠标离开删除展示框
                        ShowInput[j].addEventListener("mouseleave", function leave() {
                            $("div").remove("#ShowDiv");

                        });
                    }
                    // console.log(Top_arr)
                    // }
                }, 500)
                // console.log(Top_arr)
            }, function (err) {
                console.log(err);
            });
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
        //删除一条数据
        del: function (index) {
            console.log("delete");
            var index_id = index.index_id;
            var image_name = uuids;
            var user = document.getElementById("User_Name").innerHTML;
            var datas = {
                'index_id': index_id,
                'user': user,
                'image_name': image_name,
            }
            var datass = JSON.stringify(datas);
            var r = confirm("确定要删除一条原有数据吗？");
            if (r == true) {
                var url = "/api/ocr/validation/del_index_arr/";
                // var url = "./del.json";
                this.$http.post(url, datass).then(function (data) {
                    var _this = this;
                    console.log(data);
                    var DataMsg = data.data.successResult;
                    for (i in DataMsg) {
                        console.log(DataMsg[i])
                        // _this.documentTypeList[i] = true;
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
                    if (data.data.ret_cd !== 200) {
                        alert('请求出错，代码：' + data.data.ret_cd)
                        return;
                    }
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
                        // for (var i = 0; i < coordinate_data.length; i++) {
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
                                // console.log((parseInt(Top_arr[j]) - parseInt(Height_arr[j])) / Yproportion);
                                // console.log((parseInt(Top_arr[j])/ Yproportion - parseInt(Height_arr[j])/ Yproportion) );
                                console.log(Height_arr[j])
                                console.log(parseInt(Top_arr[j]))
                                // Newdiv.style.top = (parseInt(Top_arr[j]) - parseInt(Height_arr[j])) / Yproportion + 'px';
                                // Newdiv.style.top = Top_arr[j] / Yproportion + 'px';
                                $(".imgButBox").append(Newdiv);
                            }
                            //鼠标离开删除展示框
                            ShowInput[j].addEventListener("mouseleave", function leave() {
                                $("div").remove("#ShowDiv");
                            });
                        }
                        // console.log(Top_arr)
                        // }
                    }, 500)
                }, function (err) {
                    console.log(err);
                });
            } else if (r == false) {
                // console.log("false")
            }
            console.log(index);
        },
        //提交按钮点击事件
        submit: function () {
            console.log('submit');
            //取旧的值
            var hospital = document.getElementById("hospital");
            var name = document.getElementById("name");
            var age = document.getElementById("age");
            var sex = document.getElementById("sex");
            var report_time = document.getElementById("report_time");
            var check_time = document.getElementById("check_time");
            //科室
            var department = document.getElementById("department");
            //诊断
            var diagnose = document.getElementById("diagnose");
            //样本编号
            var sample_number = document.getElementById("sample_number");
            var index_number_total = document.getElementById("index_number_total");
            var index_number_defined = document.getElementById("index_number_defined");
            var shujv = app.RenderingData;
            console.log(app.RenderingData);
            console.log(app.RenderingData.index_arr);
            console.log(app.RenderingData.hospital.value);
            console.log(app.RenderingData.name.value);


            //取新增的值
            // var index_namei = document.getElementsByClassName("index_namei");
            // var index_normal_valuei = document.getElementsByClassName("index_normal_valuei");
            // var index_uniti = document.getElementsByClassName("index_uniti");
            // var index_valuei = document.getElementsByClassName("index_valuei");
            // var index_namei_arr = [];
            // var index_normal_valuei_arr = [];
            // var index_uniti_arr = [];
            // var index_valuei_arr = [];
            // for (var i = 0; i < index_namei.length; i++) {
            //     // console.log(index_namei[i].value)
            //     index_namei_arr.push(index_namei[i].value);
            //     index_normal_valuei_arr.push(index_normal_valuei[i].value);
            //     index_uniti_arr.push(index_uniti[i].value);
            //     index_valuei_arr.push(index_valuei[i].value);
            // }
            // console.log(index_namei_arr);
            // console.log(index_normal_valuei_arr);
            // console.log(index_uniti_arr);
            // console.log(index_valuei_arr);

            var r = confirm("确认提交数据吗？");
            if (r == true) {
                if (hospital.value.length == 0) {
                    alert('请填写医院');
                    // console.log("hospitalkong")
                } else if (name.value.length == 0) {
                    // console.log("namekong")
                    alert('请填写姓名');
                } else {
                    var url = '';
                    console.log(shujv);
                    this.$http.post(url, shujv).then(function (data) {
                        var _this = this;
                        console.log("post成功");
                    }, function (err) {
                        console.log(err);
                    });
                    alert("提交成功");
                    // console.log(app.RenderingData = {});
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
//删除一条数据
//  function del(obj) {
//     // console.log(obj.parentNode.parentNode.parentNode)
//     var del = obj;
//     console.log(del)
//     del.parentNode.parentNode.parentNode.removeChild(del.parentNode.parentNode);

// }
//创建一条数据
// function addlist(obj) {
//     // console.log(obj.parentNode.parentNode.parentNode)
//     var addlist = obj;
//     console.log(addlist);
//     var tbody = document.getElementById('tbody');
//     console.log(tbody);
//     var Newtr = document.createElement("tr");
//     var index_name = document.createElement("td");
//     var index_normal_value = document.createElement("td");
//     var index_unit = document.createElement("td");
//     var index_value = document.createElement("td");
//     Newtr.setAttribute("class", "Newtr");
//     index_name.setAttribute("class", "index_name");
//     index_normal_value.setAttribute("class", "index_normal_value");
//     index_unit.setAttribute("class", "index_unit");
//     index_value.setAttribute("class", "index_value");

//     // del.parentNode.parentNode.parentNode.removeChild(del.parentNode.parentNode);

// }