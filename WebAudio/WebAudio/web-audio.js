/// Web Audio
function WebAudio() { this.init() };

/// Web Audio Prototye
WebAudio.prototype = (function () {

    var context = {
        Version: "0.0.0.1"
        , WebAudio: new AudioContext()
    }

    /// Init
    function Init() {
        var result = "Web Audio Initilaize! Version : " + context.Version;
        console.log(result);
        return result;
    }
    return {
        version: context.Version,
        constructor: WebAudio
        , init: function () { Init(); }
        , context: function () { return context; }
    }
})();

/// Application Start
var webAudio = new WebAudio();