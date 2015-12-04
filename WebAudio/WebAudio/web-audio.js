﻿/// Web Audio
function WebAudio() { this.init() };

/// Web Audio Prototye
WebAudio.prototype = (function () {

    var context = {
        Version: "0.0.0.1"
        , WebAudio: new AudioContext()
        , navigator : window.navigator
        , request: new XMLHttpRequest()
        , buffer: null
        , mediaStream: null
        , recorder:null
    }

    context.navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
        );

    /// Init
    function Init() {
        var result = "Web Audio Initilaize! Version : " + context.Version;
        console.log(result);
        return result;
    }

    /// Play
    function Play(url)
    {
        context.request.open('get', url, true);
        context.request.responseType = 'arraybuffer';
        context.request.onload = requestOnload;
        context.request.send();
    }

    /// Record
    function Record() {
        context.navigator.getUserMedia(
            { audio: true }
            , function (localMediaStream)
            {
                context.mediaStream = localMediaStream;
                var mediaStreamSource = context.WebAudio.createMediaStreamSource(localMediaStream);
                context.recorder = new Recorder(mediaStreamSource
                    , {
                        workerPath: '/recorderjs/recorderWorker.js'
                    });
                context.recorder.record();
            }
            , function (err)
            {
                console.log('Not supported');
            });
    }

    /// Stop
    function Stop()
    {
        context.mediaStream.stop();
        context.recorder.stop();        
    }

    /// Record Play
    function RecordPlay()
    {
        context.recorder.exportWAV(function (blob) {
            var url = URL.createObjectURL(blob);
            Play(url);
        });
    }    
    
    /// Record Download
    function RecordDownload() {
        context.recorder.exportWAV(function (blob) {
            download(blob)
        });
    }

    // download
    function download(blob)
    {
        var fileName = new Date().toISOString();
        var fileExtention = ".wav";
        context.recorder.clear();
        Recorder.forceDownload(blob, fileName +fileExtention);
    }

    // requestOnload
    function requestOnload()
    {
        context.WebAudio.decodeAudioData(context.request.response, function (buffer) {
            context.buffer = buffer;
            playBuffer(context.buffer);
        }, errorCallback);
    }

    // play Buffer
    function playBuffer(buffer) {
        var source = context.WebAudio.createBufferSource();
        source.buffer = buffer;
        source.connect(context.WebAudio.destination);
        source.start(0);
    }

    // error Callback
    function errorCallback(data) {
        console.log(data);
    }

    /// Return Class
    return {
        version: context.Version,
        constructor: WebAudio
        , init: function () { Init(); }
        , context: function () { return context; }
        , play: function (url) { Play(url); }
        , record: function () { Record(); }
        , stop: function () { Stop(); }
        , recordPlay: function () { RecordPlay(); }       
        , recordDownload: function () { RecordDownload() }
    }
})();

/// Application Start
var webAudio = new WebAudio();