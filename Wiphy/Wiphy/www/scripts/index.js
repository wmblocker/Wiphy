// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    var url = "";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);


        navigator.geolocation.getCurrentPosition(function (success) {
            url = "http://api.openweathermap.org/data/2.5/weather?lat=" + success.coords.latitude + "&lon=" + success.coords.longitude + "&APPID=9e3a1b7302aa5d23fb0b7f430579fb37 "
            console.log(success.coords.latitude + " " + success.coords.longitude);
            $.getJSON(url)
                .done(function (results) {
                    displayWeather(results);
                });
        }, function (error) {
            console.log("error");
        });
    };

    function displayWeather(weather) {
        var temp = weather.main.temp - 273.15;
        temp = (temp * (9 / 5)) + 32;

        $("#weather").text(temp.toFixed(1) + "\xB0");
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();