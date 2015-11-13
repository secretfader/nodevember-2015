/**
 * Dependencies
 */
const request = require('request');

/**
 * Module body
 */
function query(city) {
  return new Promise((resolve, reject) => {
    request.get('//mixdownapi.co', {
      q: {
        city: city
      }
    }, (err, res, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
}

function* run() {
  var cities = [
    'chicago',
    'nashville',
    'los angeles',
    'austin'
  ];

  cities = cities.map(city => {
   query(city)
  });

  return yield Promise.all(cities);
}
