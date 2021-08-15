const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('morgan')('dev');
const app = express();
const appDir = fs.realpathSync(process.cwd());

console.log(`Project root directory: ${appDir}`);

// WEBPACK-DEV-MIDDLEWARE (for development)
if (process.env.NODE_ENV === 'development') {
  // this will not run with 'npm start'.
  // this will only run with 'npm run start:dev2'.
  console.log('WEBPACK-DEV-MIDDLEWARE RUNNING...');

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackDevConfig = require('../webpack.dev');
  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler));
}

// MIDDLEWARES
app.use(logger); // logging
app.use(express.json()); // body-parsing

// ROUTES
// Add your routes here and uncomment. For example:
app.use('/api', require('./router/api'));
// ...
// */

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(appDir, 'dist/index.html'));
  }
  catch (err) {
    next(err);
  }
});

// STATIC-FILE SERVE
app.use(express.static(path.resolve(appDir, 'assets')));
app.use(express.static(path.resolve(appDir, 'src')));
app.use(express.static(path.resolve(appDir, 'dist')));

// FALLBACK HANDLER
app.get('*', (req, res, next) => {
  try {
    res.sendFile(path.resolve(appDir, 'src/fallback.html'));
  }
  catch (err) {
    next(err);
  }
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  console.log(err.stack);
  res.status(err.status ?? 500).send(err.message ?? 'Internal server error.');
});


module.exports = app;
