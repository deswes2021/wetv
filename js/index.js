var itms, itmc, itmk;
var d1, d2, d3, d4, d5;
var urx = 'https://raw.githubusercontent.com/deswes2021/westv/main/script/indexk.js';
window.onload = function () {
    d1 = document.getElementsByTagName('body')[0];
    d1.style.backgroundColor = 'black';
    d1.style.margin = '0px';
    d1.style.padding = '0px';
    d1 = window.location.href;
    if (d1.indexOf('#') !== -1) {
        d1 = d1.split('#')[1];
        getk(d1);
    } else { getk('menu'); }
    return false;
}

function getk(op) {
    /*----------------------------------------------------*/
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :
        (window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null);
    if (!xhr) return;
    xhr.open("GET", urx, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            itmk = eval(xhr.responseText);
            setk(op);
        }
    };
    xhr.send();
    /*----------------------------------------------------*/
    return false;
}

function setk(op) {
    d1 = document.getElementsByTagName('body')[0];
    d2 = document.createElement('div');
    d2.style.position = 'absolute';
    d2.style.backgroundColor = 'black';
    d2.style.margin = '0px';
    d2.style.padding = '0px';
    d2.style.top = '10px';
    d2.style.left = '10px';
    d2.style.right = '10px';
    d2.style.bottom = '10px';
    d2.style.textAlign = 'center';
    d1.appendChild(d2);
    itmc = 0;
    itms = 0;
    /*----------------------------------------------------*/
    for (var i = 0; i < itmk.length; i++) {
        if (itmk[i].tipo === op){
            itmc++;
            d3 = document.createElement('input');
            d3.type = 'image';
            d3.id = itmc;
            d3.src = itmk[i].logo;
            d3.setAttribute('tipo',itmk[i].tipo);
            d3.setAttribute('url',itmk[i].url);           
            d3.className = 'knls';
            d3.style.margin = '10px';
            d3.style.padding = '0px';
            d3.style.width = '250px';
            d3.style.height = '180px';
            d3.style.border = '10px solid black';
            d2.appendChild(d3);
        }
    }    
    /*----------------------------------------------------*/
    if (itmc > 1){
        itms = 1;
        itsel();
    }
    return false;
}

function itsel(){
    var all = document.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == 'knls') { all[i].style.borderColor = 'black'; }
    }
    var d2 = document.getElementById(itms);
    if (d2) { d2.style.borderColor = 'lime'; }
    return false;
}