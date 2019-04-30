//清除session
var clear = document.getElementById('clear');
clear.onclick = function(){
    window.sessionStorage.clear();
    console.log('clear session')
}