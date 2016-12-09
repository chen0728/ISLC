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

    //查询课堂列表
    router.get('/course_manage/list', function (req, res,next) {
        var sql = knex.select('*').from('course_info').where('status','!=',2)
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].creat_time = moment(reply[i].creat_time).format('YYYY-MM-DD');
                    reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //删除
    router.post('/course_info/del', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('course_info').update('status',2).where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //查询详情
    router.get('/course_info/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('course_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD HH:MM:SS');
            }
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联资料查询
    router.get('/course_info/getl', function (req, res, next) {
        var seq_nol = req.query.seq_nol;
        var sql = knex.select('*').from('data_info').where('seq_no',seq_nol);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联题库查询
    router.get('/course_info/qusetion', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('questions_bank').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //资料列表弹窗查询
    router.get('/course_add/list', function (req, res,next) {
        var params = req.query;
        var sql = knex.select('*').from('data_info');
        sql.where('status','=',1)
        if(params.name){
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if(params.public) {
            sql = sql.where('public', params.public);
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        if(params.seq_data_arr){
            for(var i = 0; i<params.seq_data_arr.length; i++ ){
                sql = sql.where('seq_no','!=',params.seq_data_arr[i]);
            }
        };
        sql = sql.where('accouat_id',params.accouat_id).orWhere('public',1);
        sql.where('status','=',1)
        if(params.name){
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if(params.public) {
            sql = sql.where('public', params.public);
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        if(params.seq_data_arr){
            for(var i = 0; i<params.seq_data_arr.length; i++ ){
                sql = sql.where('seq_no','!=',params.seq_data_arr[i]);
            }
        };
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].up_time = moment(reply[i].up_time).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //查询seq_no
    router.get('/course_info/course_seq', function (req, res, next) {
        var sql = knex.select('*').from('course_info').orderBy('seq_no','desc');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};