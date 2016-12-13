var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var Promise = require("bluebird");
var knex = require('../lib/common/mysqlClient').knex;
var BusinessError = require('../lib/common/errors/businessError');
var util = require('../lib/util.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filter = require('../lib/filter');
module.exports = function (app) {
    app.use('/', router);
    //资料列表查询
    router.get('/group_audio/list', function (req, res,next) {
        var sql = knex.select('*').from('data_info').where('status','!=',2);
        //var params = req.query;
        //if(params.number) {
        //    sql = sql.where('number', params.number);
        //}
        //if (params.up_timeS) {
        //    sql = sql.where('up_time', '>=', params.up_timeS);
        //}
        //if (params.up_timeE) {
        //    sql = sql.where('up_time', '<=', params.up_timeE);
        //}
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].up_time = moment(reply[i].up_time).format('YYYY-MM-DD HH:MM');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //播放查询
    router.get('/group_audio/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('data_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};