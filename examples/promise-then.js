/**
 * Dependencies
 */
const fetch = require('node-fetch');

/**
 * Module body
 */
function xform(res) {
  return new Promise((resolve, reject) => {
    res = Object.assign({}, res);
    res.notes = res.messages;
    resolve(res);  
  });
}

fetch('http://localhost:4000/valid')
.then(res => {
  return res.json()
})
.then(xform)
.then(json => {
  console.log(json)
})
.catch(err => {
  console.error(err)
})

