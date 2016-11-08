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

    //查询角色权限列表
    router.get('/course_manage/list', function (req, res,next) {
        var sql = knex.select('*').from('course_info').where('status','!=',2)
        var params = req.query;
        if(params.name){
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if(params.number){
            sql = sql.where('number',params.number);
        }
        if(params.class){
            sql = sql.where('class',params.class);
        }
        if(params.creat_timeS){
            sql = sql.where('creat_time','>=',params.creat_timeS);
        }
        if(params.creat_timeE){
            sql = sql.where('creat_time','<=',params.creat_timeE);
        }
        if(params.class_timeS){
            sql = sql.where('class_time','>=',params.class_timeS);
        }
        if(params.class_timeE){
            sql = sql.where('class_time','<=',params.class_timeE);
        }
        if(params.class_status){
            sql = sql.where('class_status',params.class_status);
        }

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
    //查询数据引用
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
    //资料列表弹窗查询
    router.get('/course_add/list', function (req, res,next) {
        var sql = knex.select('*').from('data_info').where('status','!=',2)
        var params = req.query;
        if(params.name){
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if(params.number) {
            sql = sql.where('number', params.number);
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        if(params.seq_no){
            for(var i=0; i<seq_no.length; i++)
            {
                sql = sql.where('seq_no','!=',params.seq_no[i]);
            }
        }
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

};