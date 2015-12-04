recordPlay.disabled = true;
recordDownload.disabled = true;
stopAudio.disabled = true;

recordAudio.onclick = function () {
    recordAudio.disabled = true;   
    stopAudio.disabled = false;
    webAudio.record();
}

stopAudio.onclick = function () {
    recordAudio.disabled = false;
    recordPlay.disabled = false;
    recordDownload.disabled = false;
    stopAudio.disabled = true;
    webAudio.stop();
}

recordPlay.onclick = function () {
    webAudio.recordPlay();
}

recordDownload.onclick = function () {
    webAudio.recordDownload();
}