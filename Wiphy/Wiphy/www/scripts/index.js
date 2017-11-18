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
                    console.log(results);
                    getWeather(results);
                });
        }, function (error) {
            console.log("error");
        });
    };

    function getWeather(weather) {
        var tempKelvin = weather.main.temp;
        var tempCelcius = getTempCelcius(weather);
        var tempFarenheight = getTempFarenheight(weather);
        var wind = weather.wind;
        var humidity = weather.main.humidity;

        displayWeatherInfo(tempCelcius, tempFarenheight, tempKelvin, humidity, wind);
        coldWeather();
    }

    function displayWeatherInfo(celcius, farenheight, kelvin, humidity, wind) {
        $("#temp-celcius").text(celcius.toFixed(1) + "\xB0 C");
        $("#temp-kelvin").text("Kelvin: " + kelvin + "K");
        $("#temp-farenheight").text("Farenheight: " +farenheight.toFixed(1) + "\xB0 F");
        $("#humidity").text("Humidity: " +humidity);
        $("#wind").text("Wind: " + wind.speed + " mph");

    }

    function getTempCelcius(weather){
        var temp = weather.main.temp - 273.15;
        return temp;
    }

    function getTempFarenheight(weather) {
        var temp = weather.main.temp - 273.15;
        temp = (temp * (9 / 5)) + 32;
        return temp;
    }


    function coldWeather() {
        var url = "http://api.giphy.com/v1/gifs/search?q=cold&api_key=jcNZmURxlYtdcgYj0RBzh9VMcVtmJ0nu"

        $.getJSON(url)
            .done(function (results) {
                console.log(results);
                $.each(results.data, function (key, value) {
                    console.log(key + " " + value.images.original.url);
                    var carouselItem = $("<img class='img-fluid d-block w-100' style='height:50vh' src=" + value.images.original.url + " />"); 
                    $("#weather-image").append(carouselItem);
                })
                //var di = document.createElement("img");
                //img.setAttribute("src", results.data[0].images.original.url);
                //img.setAttribute("class", "img-fluid mx-auto");
                //$('#weather-image').append(img);
            });
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();