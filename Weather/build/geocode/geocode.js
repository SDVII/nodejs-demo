"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var Geocode = /** @class */ (function () {
    function Geocode() {
    }
    Geocode.prototype.geocodeAddress = function (address) {
        return new Promise(function (resolve, reject) {
            request({
                url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + address,
                json: true
            }, function (error, response, body) {
                //pretty print JSON
                //console.log(JSON.stringify(body, undefined, 2));
                if (error) {
                    reject("Cannot connect to google");
                }
                else if (body.status === "ZERO_RESULTS") {
                    reject("Cannot get address");
                }
                else if (body.status === "OK") {
                    resolve({
                        Address: "" + body.results[0].formatted_address,
                        lat: "" + body.results[0].geometry.location.lat,
                        lng: "" + body.results[0].geometry.location.lng
                    });
                }
            });
        });
    };
    Geocode.prototype.temperature = function (lat, lng) {
        return new Promise(function (resolve, reject) {
            request({
                url: "https://api.darksky.net/forecast/b1469152a290a79e817181eecce21583/" + lat + "," + lng + "?units=si",
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve({
                        currentTemp: "" + body.currently.temperature,
                        apparentTemp: "" + body.currently.apparentTemperature
                    });
                }
                else {
                    reject("Cannot fetch weather");
                }
            });
        });
    };
    return Geocode;
}());
exports.Geocode = Geocode;
