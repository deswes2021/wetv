var player,turl,license,clerkeys,nVol,DPlay;
var prm0, prm1, prm2, prm3, prm4;

$(document).on('contextmenu', function (ex) { ex.preventDefault(); });
$(document).on('ready', function () {
    $('body').css({ backgroundColor: 'black', margin: 0, padding: 0 });
    prm0 = window.location.href;
    prm1 = prm0.split('#')[1] || '';
    prm2 = prm0.split('#')[2] || '';
    prm3 = prm0.split('#')[3] || '';
    prm4 = prm0.split('#')[4] || '';
    if (['.mp4', '.m3u8'].some(ext => prm1.toLowerCase().endsWith(ext))) { setCLR(prm1); }
    else if (['.m3u8'].some(ext => prm1.toLowerCase().includes(ext))) { setCLR(prm1); }
    else if (['.ytb'].some(ext => prm1.toLowerCase().endsWith(ext))) { setYTB(prm1); }
    else if (['/activar'].some(ext => prm1.toLowerCase().endsWith(ext))) { setFRAME(prm1); }
    else { setERR('NO HAY CONTENIDO'); }
    return false;
});

/*--CONTROL ERROR--*/
function setERR(op) {
    $('body').empty();
    $('body').append('<div id="main"></div>');
    $('#main').css({
        position: 'absolute', backgroundColor: 'black', margin: 0, padding: 0, width: '100%', height: '100%',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
        userSelect: 'none', pointerEvent: 'none'
    });
    $('#main').append('<div id="player">' + op + '</div>');
    $('#player').css({
        backgroundColor: 'black', margin: 0, padding: 0, maxWidth: '95%', maxHeight: '95%', overflow: 'hidden',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', color: 'white',
        fontSize: '4vw', userSelect: 'none', pointerEvent: 'none', 'overflow-y': 'scroll', 'scrollbar-width': 'none'
    });
    document.onkeydown = null;
    document.onkeydown = function(ex){
        try {
            if (ex.key === 'Backspace' || ex.keyCode === 8) { window.location.replace('./index2.html#'+prm2); }
            else { ex.preventDefault(); }
        } catch (erx) { console.error('Error: ' + erx); }
    };
    return false;
}

/*--CONTROL INFO--*/
function sts(op){
    try {
        DPlay = document.getElementById('splay');
        DPlay.textContent = op;
        DPlay.style.display = 'block';
        clearTimeout(DPlay.timeout);
        DPlay.timeout = setTimeout(() => { DPlay.style.display = 'none'; }, 1500);
    } catch (erx) { console.error('Error: ' + erx); }    
    return false;
}

/*--SET PLAYER CLAPPR M3-M4--*/
function setCLR(op) {
    $('body').empty();
    $('body').append('<div id="main"><div id="player"></div></div>');
    $('#main').css({
        position: 'absolute', backgroundColor: 'black', margin: 0, padding: 0, width: '100%', height: '100%',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
        userSelect: 'none', pointerEvent: 'none'
    });
    /*---------------------------------------------------------------------------------------------*/
    $('body').append('<a id="splay"></a>');
    $('#splay').css({ position: 'absolute', top: '10px', right: '10px', zIndex: '999998', background: 'rgba(0,0,0,0)',
    color: 'lime', padding: '5px 10px', fontSize: '18px'});
    /*---------------------------------------------------------------------------------------------*/
    turl = op;/*-*/license = '';/*-*/clerkeys = '';
    try { clerkeys = window.atob(parm0.split("&tv=")[1]); } catch { clerkeys = '{"":""}'; }
    try { license = window.atob(parm0.split("&l=")[1]); } catch { license = ''; }
    player = new Clappr.Player({
        source: turl, parentId: '#player', preload: true, width: '100vw', height: '100vh',
        autoPlay: true, mute: false, volume: 100, recycleVideo: Clappr.Browser.isMobile,
        plugins: [HlsjsPlayback, LevelSelector],
        hlsjsConfig: { startLevel: -1, }  
    });
    const isFirstPlay = true;
    player.on(Clappr.Events.PLAYER_PLAY, () => {
        if (isFirstPlay) {
            try { player.core.mediaControl.disable(); } catch (error) { }
            try { player.setVolume(100); } catch (error) { }
            const iframe = document.querySelector("video");
            if (iframe) {
                iframe.style.position = "absolute";/*-*/iframe.style.objectFit = "fill";
                iframe.style.width = "100%";/*-*/iframe.style.height = "100%";                
                iframe.style.backgroundColor = 'black';/*-*/iframe.style.overflow = 'hidden';
                iframe.style.top = "0px";/*-*/iframe.style.left = "0px";                
            }
            isFirstPlay = false;
        } else { }
    });
    $('#player').css({
        position: 'absolute', backgroundColor: 'black', margin: '0', padding: '0', userSelect: 'none',
        pointerEvents: 'none', overflow: 'hidden', width: '100%', height: '100%'
    });
    player.on(Clappr.Events.PLAYER_ERROR, () => { setERR('FALLO LA CARGA DE DATOS'); });
    /*--------------------------------------------------------------------------------------------*/
    document.onkeydown = null;
    document.onclick = null;
    document.onclick = function(ex){
        if (player.isPlaying()) { player.pause();/*-*/sts('Pause'); } else { player.play();/*-*/sts('Play'); }}
    document.onkeydown = function(ex){
        try {
            if (ex.key === 'ArrowLeft' || ex.keyCode === 37) {
                player.seek(Math.max(player.getCurrentTime() - 10, 0));/*-*/sts('Rep: -10Seg'); }
            else if (ex.key === 'ArrowUp' || ex.keyCode === 38) {
                nVol = Math.min(player.getVolume() + 5, 100);/*-*/player.setVolume(nVol);/*-*/sts('Vol: ' + nVol + '%'); }
            else if (ex.key === 'ArrowRight' || ex.keyCode === 39) {
                player.seek(Math.max(player.getCurrentTime() + 10, 0));/*-*/sts('Rep: +10Seg'); }
            else if (ex.key === 'ArrowDown' || ex.keyCode === 40) {
                nVol = Math.min(player.getVolume() - 5, 100);/*-*/player.setVolume(nVol);/*-*/sts('Vol: ' + nVol + '%'); }
            else if (ex.key === 'Enter' || ex.keyCode === 13) {
                if (player.isPlaying()) { player.pause();/*-*/sts('Pause'); } else { player.play();/*-*/sts('Play'); } }
            else if (ex.key === 'Backspace' || ex.keyCode === 8) { window.location.replace('./index2.html#'+prm2); }
            else { ex.preventDefault(); }
        } catch (erx) { console.error('Error: ' + erx); }
    };
    return false;
}

/*--SET PLAYER CLAPPR YTB--*/
function setYTB(op) {
    $('body').empty();
    $('body').append('<div id="main"><div id="player"></div></div>');
    $('#main').css({
        position: 'absolute', backgroundColor: 'black', margin: 0, padding: 0, width: '100%', height: '100%',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
        userSelect: 'none', pointerEvent: 'none'
    });
    /*---------------------------------------------------------------------------------------------*/
    $('body').append('<a id="splay"></a>');
    $('#splay').css({ position: 'absolute', top: '10px', right: '10px', zIndex: '999998', background: 'rgba(0,0,0,0)',
    color: 'lime', padding: '5px 10px', fontSize: '18px'});
    /*---------------------------------------------------------------------------------------------*/
    turl = op.split('.')[0];/*-*/license = '';/*-*/clerkeys = '';
    try { clerkeys = window.atob(parm0.split("&tv=")[1]); } catch { clerkeys = '{"":""}'; }
    try { license = window.atob(parm0.split("&l=")[1]); } catch { license = ''; }
    player = new Clappr.Player({
        source: turl, parentId: '#player', preload: true, width: '100vw', height: '100vh',
        autoPlay: true, mute: false, volume: 100, recycleVideo: Clappr.Browser.isMobile,
        plugins: [YoutubePlugin, YoutubePluginControl,],
        youtube: { modestbranding: 1, controls: 0, }, 
    });
    const isFirstPlay = true;
    player.on(Clappr.Events.PLAYER_PLAY, () => {
        if (isFirstPlay) {
            try { player.core.mediaControl.disable(); } catch (error) { }
            try { player.setVolume(100); } catch (error) { }
            const iframe = document.querySelector("iframe");
            if (iframe) {
                iframe.style.position = "absolute";/*-*/iframe.style.objectFit = "fill";
                iframe.style.width = "100%";/*-*/iframe.style.height = "100%";                
                iframe.style.backgroundColor = 'black';/*-*/iframe.style.overflow = 'hidden';
                iframe.style.top = "0px";/*-*/iframe.style.left = "0px";                
            }
            isFirstPlay = false;
        } else { }
    });
    $('#player').css({
        position: 'absolute', backgroundColor: 'black', margin: '0', padding: '0', userSelect: 'none',
        pointerEvents: 'none', overflow: 'hidden', width: '100%', height: '100%'
    });
    player.on(Clappr.Events.PLAYER_ERROR, () => { setERR('FALLO LA CARGA DE DATOS'); });
    /*--------------------------------------------------------------------------------------------*/
    document.onkeydown = null;
    document.onclick = null;
    document.onclick = function(ex){
        if (player.isPlaying()) { player.pause();/*-*/sts('Pause'); } else { player.play();/*-*/sts('Play'); }}
    document.onkeydown = function(ex){
        try {
            if (ex.key === 'ArrowLeft' || ex.keyCode === 37) {
                player.seek(Math.max(player.getCurrentTime() - 10, 0));/*-*/sts('Rep: -10Seg'); }
            else if (ex.key === 'ArrowUp' || ex.keyCode === 38) {
                nVol = Math.min(player.getVolume() + 5, 100);/*-*/player.setVolume(nVol);/*-*/sts('Vol: ' + nVol + '%'); }
            else if (ex.key === 'ArrowRight' || ex.keyCode === 39) {
                player.seek(Math.max(player.getCurrentTime() + 10, 0));/*-*/sts('Rep: +10Seg'); }
            else if (ex.key === 'ArrowDown' || ex.keyCode === 40) {
                nVol = Math.min(player.getVolume() - 5, 100);/*-*/player.setVolume(nVol);/*-*/sts('Vol: ' + nVol + '%'); }
            else if (ex.key === 'Enter' || ex.keyCode === 13) {
                if (player.isPlaying()) { player.pause();/*-*/sts('Pause'); } else { player.play();/*-*/sts('Play'); } }
            else if (ex.key === 'Backspace' || ex.keyCode === 8) { window.location.replace('./index2.html#'+prm2); }
            else { ex.preventDefault(); }
        } catch (erx) { console.error('Error: ' + erx); }
    };
    return false;
}

/*--SET PLAYER IFRAME--*/
function setFRAME(op) {
    $('body').empty();
    $('body').append('<div id="main"><div id="player"></div></div>');
    $('#main').css({
        position: 'absolute', backgroundColor: 'black', margin: 0, padding: 0, width: '100%', height: '100%',
        overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center',
        userSelect: 'none', pointerEvent: 'auto'
    });
    turl = op;
    $('#player').append('<iframe ' +
        'id="frmplayer"' +
        ' allow="encrypted-media"' +
        ' src="' + turl + '"' +
        ' width="100%"' +
        ' height="100%"' +
        ' scrolling="no"' +
        ' frameBorder="0"' +
        ' allowfullscreen' +
        ' sandbox="allow-scripts allow-same-origin allow-top-navigation; allow-forms"' +
        //' sandbox="allow-top-navigation allow-scripts allow-forms"' +
        '></iframe>');
    $('#player').css({
        position: 'absolute', backgroundColor: 'black', margin: '0', padding: '0', userSelect: 'none',
        pointerEvents: 'none', overflow: 'hidden', width: '100%', height: '100%'
    });
    $('#frmplayer').css({
        position: 'absolute', backgroundColor: 'black', margin: '0', padding: '0', userSelect: 'none',
        pointerEvents: 'auto', overflow: 'auto', width: '100%', height: '100%'
    });
    /*--------------------------------------------------------------------------------------------*/
    document.onkeydown = null;
    document.onclick = null;
    document.onclick = function(ex){ }
    document.onkeydown = function(ex){
        try {
            if (ex.key === 'ArrowLeft' || ex.keyCode === 37) { }
            else if (ex.key === 'ArrowUp' || ex.keyCode === 38) { }
            else if (ex.key === 'ArrowRight' || ex.keyCode === 39) { }
            else if (ex.key === 'ArrowDown' || ex.keyCode === 40) { }
            else if (ex.key === 'Enter' || ex.keyCode === 13) { }
            else if (ex.key === 'Backspace' || ex.keyCode === 8) { window.location.replace('./index2.html#'+prm2); }
            else { ex.preventDefault(); }
        } catch (erx) { console.error('Error: ' + erx); }
    };
    return false;
}