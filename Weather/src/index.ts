import * as yargs from "yargs";
import { Geocode } from "./geocode/geocode";
import { GeocodeAxios } from "./geocode/geocode_promise";

const argv = yargs
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

let address: string = encodeURIComponent(argv.address);

//Using Request:
//let geocode = new Geocode();

//Using Axios
let geocode = new GeocodeAxios();

geocode
  .geocodeAddress(address)
  .then((res: any) => {
    console.log(JSON.stringify(res, undefined, 2));
    geocode
      .temperature(res.lat, res.lng)
      .then((res: any) => {
        console.log(JSON.stringify(res, undefined, 2));
      })
      .catch(err => {
        console.error(err);
      });
  })
  .catch(err => {
    console.error(err);
  });
