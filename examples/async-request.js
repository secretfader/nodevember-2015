/**
 * Option #1:
 * Conflates input with output. Arguments as inputs,
 * some return value as a result... additional argument (callback)
 * that specifies how to return data.
 *
 * The callback isn't an input... it's mechanical. It relies
 * on an unenforcable contract with the caller. We can't enforce the
 * (err, data) convention without lots of additional tooling.
 *
 * It also doesn't work with traditional flow control constructs
 * in the language. Also: if JSON.parse fails, this error is uncatchable.
 */
function getJSON(uri, done) {
  request.get(uri, function(err, data) {
    if (err) return done(err);
    done(null, JSON.parse(data));
  });
}

/**
 * Option #2:
 * Let's try again. We wrap the JSON parsing bit in try/catch, which will
 * prevent parse errors from being thrown in the global scope. But
 * we still have to wrestle with the lack of compatibility with
 * flow control constructs... async.js, and tools like it, are our
 * only aid. We still have an unenforcable contract, on top of it all.
 *
 * But, there is a subtle bug: if the callback has an error, then
 * we may end up calling it twice, when in reality, the app should
 * probably crash and restart. This is important, especially if we
 * are logging errors, and/or require a reliable count of how often
 * issues occur.
 */
function getJSON(uri, done) {
  request.get(uri, function(err, data) {
    if (err) return done(err);
    try {
      done(null, JSON.parse(data));
    } catch(ex) {
      done(ex);
    }
  });
}

/**
 * Option #3:
 * This time, we wrap ONLY the JSON.parse statement inside try/catch.
 * That's better, right? Well, somewhat. We fixed the double callback
 * bug, we aren't working with understood flow control constructs,
 * but at least we fixed the error handling.
 */
function getJSON(uri, done) {
  request.get(uri, function(err, data) {
    if (err) return done(err);
    try {
      data = JSON.parse(data);
    } catch(ex) {
      return done(ex);
    }
    done(null, data);
  });
};

/**
 * Option #4:
 * Let's try once more. This time, we're scratching the surface of madness,
 * trying to go completely async.
 */
function parseJSON(json, done) {
  try {
    json = JSON.parse(json);
  } catch(ex) {
    done(ex);
  }
  done(null, data);
}

function getJSON(json, done) {
  request.get(uri, function(err, data) {
    if (err) return done(err);
    parseJSON(data, function(err, json) {
      if (err) return done(err);
      done(null, json);
    });
  });
}
