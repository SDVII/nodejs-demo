"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var GeocodeAxios = /** @class */ (function () {
    function GeocodeAxios() {
    }
    GeocodeAxios.prototype.geocodeAddress = function (address) {
        return new Promise(function (resolve, reject) {
            var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address;
            axios_1.default
                .get(url)
                .then(function (res) {
                if (res.statusText === "ZERO_RESULTS") {
                    reject("Cannot get address");
                }
                resolve({
                    Address: "" + res.data.results[0].formatted_address,
                    lat: "" + res.data.results[0].geometry.location.lat,
                    lng: "" + res.data.results[0].geometry.location.lng
                });
            })
                .catch(function (err) {
                reject("Cannot get address");
            });
        });
    };
    GeocodeAxios.prototype.temperature = function (lat, lng) {
        return new Promise(function (resolve, reject) {
            var url = "https://api.darksky.net/forecast/b1469152a290a79e817181eecce21583/" + lat + "," + lng + "?units=si";
            axios_1.default
                .get(url)
                .then(function (res) {
                if (res.status == 200) {
                    resolve({
                        currentTemp: "" + res.data.currently.temperature,
                        apparentTemp: "" + res.data.currently.apparentTemperature
                    });
                }
            })
                .catch(function (err) {
                reject("Cannot fetch weather");
            });
        });
    };
    return GeocodeAxios;
}());
exports.GeocodeAxios = GeocodeAxios;
