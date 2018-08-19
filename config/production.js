'use strict';
/**
 * 生产环境配置文件
 */
var config = {
    env: 'production', //环境名称
    port: 3001,         //服务端口号

    host: 'https://vehicle.qingmiaojituan.com',
    mysql: {
        host: 'rm-bp12uie49m8m0v2w1.mysql.rds.aliyuncs.com',
        user: 'chebei_mall',
        password: 'PEA9UQPGwJ79Vc9DPt',
        database: 'chebei_mall',
        port: 3306
    },
    aliyun: {
        ak_id: 'LTAI3yQTscZkhejE',
        ak_secret: 'dR2rDjiG6falQDCwENmP7EGYxCbERS',
        oss: {
            bucket: 'vehicle-mall'
        }
    },
    baiduyun: {
        appID: '11383244',
        APIKey: 'GuYvRDeSMbumnYWxuerQ8idZ',
        SecretKey: 'v2kIT4UuvjV4P0SURP9Hr5O5i0DgjUTF'
    },
    face: 'https://dtplus-cn-shanghai.data.aliyuncs.com',
    mongodb: {
        //mongodb数据库配置
    },
    redis: {
        //redis数据库配置
    },

};
module.exports = config;



