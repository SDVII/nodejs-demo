let request = require("request");

class Geocode {
  geocodeAddress(address: string) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
          json: true
        },
        (error: any, response: any, body: any) => {
          //pretty print JSON
          //console.log(JSON.stringify(body, undefined, 2));

          if (error) {
            reject("Cannot connect to google");
          } else if (body.status === "ZERO_RESULTS") {
            reject("Cannot get address");
          } else if (body.status === "OK") {
            resolve({
              Address: `${body.results[0].formatted_address}`,
              lat: `${body.results[0].geometry.location.lat}`,
              lng: `${body.results[0].geometry.location.lng}`
            });
          }
        }
      );
    });
  }

  temperature(lat: string, lng: string) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `https://api.darksky.net/forecast/b1469152a290a79e817181eecce21583/${lat},${lng}?units=si`,
          json: true
        },
        (error: any, response: any, body: any) => {
          if (!error && response.statusCode == 200) {
            resolve({
              currentTemp: `${body.currently.temperature}`,
              apparentTemp: `${body.currently.apparentTemperature}`
            });
          } else {
            reject("Cannot fetch weather");
          }
        }
      );
    });
  }
}

export { Geocode };
