/*eslint no-undef: 0*/
const merge = require('webpack-merge')
const commonWebpack = require('./webpack/common')
const devWebpack = require('./webpack/development')
const prodWebpack = require('./webpack/production')

const TARGET = process.env.npm_lifecycle_event

module.exports = (TARGET === 'start' || !TARGET)
    ? merge(commonWebpack, devWebpack)
    : merge(commonWebpack, prodWebpack)
