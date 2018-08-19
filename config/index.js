'use strict';
var production = require('../config/production');
var test = require('../config/test');
/**
 * 判断当前指示当前环境的常量返回对应配置
 * 默认返回开发环境的配置
 */
function config() {
    switch (process.env.NODE_ENV) {
        case 'production': return production; break;
        case 'test': return test; break;
        default: return production;
    }
}
console.log(process.env.NODE_ENV)
module.exports = config();