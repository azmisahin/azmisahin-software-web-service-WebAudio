/// Web Audio
function WebAudio() { this.init() };

/// Web Audio Prototye
WebAudio.prototype = (function () {

    var context = {
        Version: "0.0.0.1"
        , WebAudio: new AudioContext()
        , request: new XMLHttpRequest()
        , buffer:null
    }

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
        , play: function (url) { Play(url);}
    }
})();

/// Application Start
var webAudio = new WebAudio();