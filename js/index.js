var itmC, itmS, itmO, itmU, itmK, itmD;
var prm0, prm1, prm2, prm3, prm4;
var dv1, dv2, dv3, dv4, dv5, sOff, sPos;
var d1, d2, d3, d4, d5;
var dpl, dpi, dti, dil, slt;

$(document).on('contextmenu', function (ex) { ex.preventDefault(); });
$(document).on('keydown', function (ex) {
    try {
        dpl = $('#player');
        dpi = dpl.children();
        dti = dpi.filter(function () { return $(this).position().top === dpi.first().position().top; });
        dil = dti.length;
        if (ex.key === 'ArrowLeft' || ex.keyCode === 37) { 
            itmS -= 1;
            ck();
        } else if (ex.key === 'ArrowUp' || ex.keyCode === 38) { 
            itmS -= dil;
            ck();
        } else if (ex.key === 'ArrowRight' || ex.keyCode === 39) {
            itmS += 1;
            ck();
        } else if (ex.key === 'ArrowDown' || ex.keyCode === 40) { 
            itmS += dil;
            ck();
        } else if (ex.key === 'Enter' || ex.keyCode === 13) {
            confDATA();
        } else if (ex.key === 'Backspace' || ex.keyCode === 8) {
            if (itmO !== 'menu') { 
                window.location.replace('./index.html');
            }
        } else { ex.preventDefault(); }
    } catch (erx) { console.error('Error: ' + erx); }
    return false;
});

function ck() {
    try {
        if (itmS > itmC) { itmS = itmC; } 
        else if (itmS < 1) { itmS = 1; }
        dv1 = $('#player');
        dv2 = $('.knl');
        dv3 = $('#' + itmS);
        dv2.css({ boxShadow: 'none' });
        dv3.css({ boxShadow: '-0.75vw -0.75vw 1px lime, 0.75vw 0.75vw 1px lime' });
        sOff = dv3.offset().top - dv1.offset().top;
        sPos = dv1.scrollTop() + sOff - dv1.height() / 2 + dv3.outerHeight() / 2;
        dv1.animate({ scrollTop: sPos }, 100);
        localStorage.setItem(dv3.attr('tipo'), itmS);
    } catch (erx) { console.error('Error: ' + erx); }
    return false;
}

$(document).on('ready', function () {
    $('body').css({ backgroundColor: 'black', margin: 0, padding: 0 });
    prm0 = window.location.href;
    prm1 = prm0.split('#')[1] || '';
    prm2 = prm0.split('#')[2] || '';
    prm3 = prm0.split('#')[3] || '';
    prm4 = prm0.split('#')[4] || '';
    if (['#'].some(ext => prm0.includes(ext))) { getKNL(prm1); }
    else { getKNL('menu'); }
    return false;
});

/*--CONTROL-MSJ-ERROR--*/
function setERR(op) {
    $('body').empty();
    $('body').append('<div id="main"></div>');
    $('#main').css({
        position: 'absolute', backgroundColor: 'black', margin: 0, padding: 0, width: '100%', height: '100%',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
        userSelect: 'none', pointerEvent: 'auto'
    });
    $('#main').append('<div id="player">' + op + '</div>');
    $('#player').css({
        backgroundColor: 'black', margin: 0, padding: 0, maxWidth: '95%', maxHeight: '95%', overflow: 'hidden',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', color: 'white',
        fontSize: '4vw', userSelect: 'none', pointerEvent: 'auto', 'overflow-y': 'scroll', 'scrollbar-width': 'none'
    });
    return false;
}

/*--CONTROL-GET-CANAL--*/
function getKNL(op) {
    try {
        itmD = localStorage.getItem('itmKLISt') || '';
        if (itmD !== '') {
            itmK = eval(mik);
            setKNL(op);
        } else {
            localStorage.setItem('itmKLISt', mik);
            itmK = eval(mik);
            setKNL(op);
        }
    } catch (erx) { console.error('Error: ' + erx); }
    return false;
}

/*--CONTROL SET CANAL--*/
function setKNL(op) {
    $('body').empty();
    $('body').append('<div id="main"></div>');
    $('#main').css({
        position: 'absolute', backgroundColor: 'black', margin: 0, padding: 0, width: '100%', height: '100%',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
        userSelect: 'none', pointerEvent: 'auto'
    });
    $('#main').append('<div id="player"></div>');
    $('#player').css({
        backgroundColor: 'black', margin: 0, padding: 0, maxWidth: '95%', maxHeight: '95%', overflow: 'hidden',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-start', color: 'white',
        userSelect: 'none', pointerEvent: 'auto', 'overflow-y': 'scroll', 'scrollbar-width': 'none'
    });
    try {
        itmO = op;
        itmC = 0;
        itmS = 0;
        itmK.forEach((ex) => {
            if (ex.url !== '' && ex.url !== null && ex.url !== undefined && ex.tipo == op) {
                itmC++;
                $('#player').append('<input type="image" class="knl" ' +
                    'id="' + itmC + '" tipo="' + ex.tipo + '" src="' + ex.logo + '" url="' + ex.url + '" ' +
                    'style="width:28vw;height:12vw;padding:0;margin:1vw;border-radius:1vw;border:1px solid black;" ' +
                    `onclick="itmS = $(this).attr('id'); ck(); confDATA();"` +
                    '>');
            }
        });
        if (itmC > 0) {
            slt = parseInt(localStorage.getItem(op), 10) || '';
            if (slt !== '' && slt !== null && slt !== undefined && slt > 0) {
                itmS = slt;
                ck();
            } else { 
                localStorage.setItem(op, 1);
                itmS = 1;
                ck();
            }
        } else { setERR('LISTA VACIA'); }
    } catch (erx) { console.error('Error: ' + erx); }
    return false;
}

/*--CONTROL OPT CANALES--*/
function confDATA() {
    d1 = $('#' + itmS).attr('url');
    d2 = $('#' + itmS).attr('tipo');
    if (['.mp4', '.m3u8', '.ytb', '/activar'].some(ext => d1.toLowerCase().endsWith(ext))) {
        window.location.replace('./player.html#' + d1 + '#' + d2);
    } else if (['actualizar'].some(ext => d1.toLowerCase().endsWith(ext))) {
        localStorage.removeItem('itmKLISt');
        window.location.replace('./index.html');
    } else if (['/', '.', ':'].some(ext => !d1.toLowerCase().includes(ext))) {
        window.location.replace('./index2.html#' + d1 + '#' + d2);
    } else { }
    return false;
}