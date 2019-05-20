const { merge } = require('lodash');
const ENV = process && process.env.NODE_ENV || 'development';
const envConf = require('./' + ENV);

export const config = merge({
  env: ENV,
  server: {
    api: 'http://172.16.6.253:1000'
  }
}, envConf.config);
