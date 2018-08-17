import axios from "axios";

class GeocodeAxios {
  geocodeAddress(address: string) {
    return new Promise((resolve, reject) => {
      let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
      axios
        .get(url)
        .then(res => {
          if (res.statusText === "ZERO_RESULTS") {
            reject("Cannot get address");
          }
          resolve({
            Address: `${res.data.results[0].formatted_address}`,
            lat: `${res.data.results[0].geometry.location.lat}`,
            lng: `${res.data.results[0].geometry.location.lng}`
          });
        })
        .catch(err => {
          reject("Cannot get address");
        });
    });
  }

  temperature(lat: string, lng: string) {
    return new Promise((resolve, reject) => {
      let url = `https://api.darksky.net/forecast/b1469152a290a79e817181eecce21583/${lat},${lng}?units=si`;
      axios
        .get(url)
        .then(res => {
          if (res.status == 200) {
            resolve({
              currentTemp: `${res.data.currently.temperature}`,
              apparentTemp: `${res.data.currently.apparentTemperature}`
            });
          }
        })
        .catch(err => {
          reject("Cannot fetch weather");
        });
    });
  }
}

export { GeocodeAxios };
