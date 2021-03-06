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
    //资料列表查询（教师）
    router.get('/class_audio/list', function (req, res,next) {
        var sql = knex.select('*').from('course_info').where('status','!=',2).where('class_status',1);
        var params = req.query;
        if(params.account_id){
            sql = sql.where('account_id', params.account_id);
        }
        if(params.number) {
            sql = sql.where('number', params.number);
        }
        if(params.name) {
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD HH:mm');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //资料列表查询（学生）
    router.get('/class_audio/media', function (req, res,next) {
        var params = req.query;
        var infos={};
        knex.select('*').from('account').where('account_id',params.account_id).then(function (reply) {
            var sql = knex.select('*').from('course_info').where('status','!=',2).where('class_status',1);
            if(reply[0].class){
                sql = sql.where('class','like','%'+ reply[0].class+'%');
            }
            if(params.number) {
                sql = sql.where('number', params.number);
            }
            if(params.name) {
                sql = sql.where('name','like', '%'+params.name+'%');
            }
            if (params.up_timeS) {
                sql = sql.where('up_time', '>=', params.up_timeS);
            }
            if (params.up_timeE) {
                sql = sql.where('up_time', '<=', params.up_timeE);
            }
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].up_time = moment(reply[i].up_time).format('YYYY-MM-DD HH:mm');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //资料列表查询（其他）
    router.get('/class_audio/other', function (req, res,next) {
        var sql = knex.select('*').from('course_info').where('status','!=',2).where('class_status',1);
        var params = req.query;
        if(params.number) {
            sql = sql.where('number', params.number);
        }
        if(params.name) {
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].up_time = moment(reply[i].up_time).format('YYYY-MM-DD HH:mm');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //播放查询
    router.get('/class_audio/get', function (req, res, next) {
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