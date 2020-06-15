function StopGap() {
    function deviceready() {
        // fire off deviceready
        var e = document.createEvent('Events');
        e.initEvent('deviceready', false, false);
        document.dispatchEvent(e);
    }

    window.PhoneGap = {};
    window.device = { phonegap: "In browser" };
    deviceready();
}