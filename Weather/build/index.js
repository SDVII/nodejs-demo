"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = __importStar(require("yargs"));
var geocode_promise_1 = require("./geocode/geocode_promise");
var argv = yargs
    .help()
    .options({
    a: {
        demand: true,
        alias: "address",
        describe: "Address to be fetched",
        string: true
    }
})
    .alias("help", "h").argv;
var address = encodeURIComponent(argv.address);
//Using Request:
//let geocode = new Geocode();
//Using Axios
var geocode = new geocode_promise_1.GeocodeAxios();
geocode
    .geocodeAddress(address)
    .then(function (res) {
    console.log(JSON.stringify(res, undefined, 2));
    geocode
        .temperature(res.lat, res.lng)
        .then(function (res) {
        console.log(JSON.stringify(res, undefined, 2));
    })
        .catch(function (err) {
        console.error(err);
    });
})
    .catch(function (err) {
    console.error(err);
});
