function getJSON(uri) {
  return JSON.parse(request.get(uri));
};

try {
  var data = getJSON('https://json.service');
} catch (e) {
  console.error(err);
}
