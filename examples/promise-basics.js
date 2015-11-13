/**
 * Dependencies
 */
const argv    = require('yargs').argv;
const request = require('request');

/**
 * Setup
 */
var valid = true;
var host  = 'http://localhost:4000';
var path  = 'valid';

if (argv.invalid) {
  valid = false;
  path  = 'invalid';
}

/**
 * Module body
 */
function getJSON(uri) {
  return new Promise(function(resolve, reject) {
    request.get(uri, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

getJSON([host, path].join('/')).then(data => {
  return JSON.parse(data)
}).then(json => {
  console.log(json);
}).catch(err => {
  console.error(err);
});
