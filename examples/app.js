/**
 * Dependencies
 */
const path   = require('path');
const fs     = require('fs');
const app    = require('koa')();
const router = require('koa-router')();

/**
 * Setup
 */
app.use(require('koa-logger')());

function serve(filename) {
  return function*(next) {
    yield next;
    this.type = 'json';
    this.body = fs.createReadStream(
      path.join(__dirname, filename)
    );
  }
}

function error(code) {
  return function*(next) {
    this.status = code || 500;
  }
}

router.get(
  '/valid', 
  serve('valid.json')
);

router.get(
  '/invalid',
  serve('invalid.json')
);

router.get(
  '/valid/404', 
  serve('valid.json'), 
  error(404)
);

router.get(
  '/invalid/404',
  serve('invalid.json'),
  error(404)
);

router.get(
  '/valid/500',
  serve('valid.json'),
  error(500)
);

router.get(
  '/invalid/500',
  serve('invalid.json'),
  error(500)
);

/**
 * Mount router, boot.
 */
app.use(router.routes());

if (!module.parent) {
  app.listen(4000);
}

/**
 * Expose module.
 */
module.exports = app.callback();
