//左侧列表数据请求
// var obj = new Object();
var user_code = document.querySelector('#User_Name').innerText;
console.log(user_code);
// obj['user_code'] = user_code;
// var Datas = JSON.stringify(obj);
$.ajax({
    url: '/api/ocr/validation/supporting/',
    // url:'./liebiao.json',
    type: "get",
    data: {'user_code':user_code},
    // dataType: "json",
    //请求成功时的回调函数，info为后端返回的数据
    success: function (info) {
        console.log(info);
        var name = info.successResult;
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
            //判断各种情况。
            for (var j = 0; j < name.length; j++) {
                // console.log(img_name[j]);
                if (state === 1) {
                    todolist.setAttribute("class", "state1");
                    todolist.innerText = img_name;
                    $(".state1ul").append(todolist);
                    ghost.setAttribute("class", "ghost");
                    ghost.innerText = uuids;
                    $(".state1ul").append(ghost);
                } else if (state === 0) {
                    todolist.setAttribute("class", "state0");
                    todolist.innerText = img_name;
                    $(".state0ul").append(todolist);
                    // ghost.setAttribute("class", "ghost");
                    // ghost.innerText = uuids;
                    // $(".state0ul").append(ghost);
                    // console.log(ghost.innerHTML);
                }
            }
        }
    }
});
// var uudis = document.getElementsByClassName("ghost").textContent;
// console.log(uudis);