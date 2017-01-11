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

    //查询用户列表
    router.get('/account/list', function (req, res,next) {
        var sql = knex.select('*').from('account');
        var params = req.query;
        if(params.name){
            sql = sql.where('name','like','%' + params.name + '%');
        }
        if(params.account_id){
            sql = sql.where('account_id','like','%' + params.account_id + '%');
        }
        if(params.sex){
            sql = sql.where('sex',params.sex);
        }
        if(params.part){
            sql = sql.where('part',params.part);
        }
        if(params.year){
            sql = sql.where('year',params.year);
        }
        if(params.class){
            sql = sql.where('class',params.class);
        }
        if(params.status){
            sql = sql.where('status',params.status);
        }
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql);
        }).then(function (reply) {
            if (reply) {
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });

    //修改或新建用户
    router.get('/account/new', function (req, res,next) {
        var params = req.query.params;
        var sql = knex('account');

        var time = new Date();
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        var record_info = {
            operator_id: req.session.account_id,
            operator_name: req.session.username,
            record_id: params.account_id,
            operat_time: time,
            status: 1,
            source: 1
        };

        //修改
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no).update(params);
            record_info.operation_type = '修改用户信息';

        } else {
            sql = sql.insert(params);
            params.regTime = moment().format('YYYY-MM-DD HH:mm:ss');
            record_info.operation_type = '添加用户信息';
        }

        sql.then(function (reply) {
            return knex('operation_record').insert(record_info);
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //逻辑删除用户
    router.get('/account/del', function (req, res,next) {
        var sql = knex('account').where('seq_no',req.query.seq_no).update('status',2);

        sql.then(function (reply) {
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex.raw("INSERT INTO operation_record (operator_id,operator_name,operation_type,record_id,operat_time,status,source)" +
                " VALUES ('"+req.session.account_id+"','"+req.session.username+"','删除用户信息',(SELECT account_id FROM account WHERE seq_no = '"+req.query.seq_no+"'),'"+time+"',1,1)")
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //逻辑恢复用户
    router.get('/account/recovery', function (req, res,next) {
        var sql = knex('account').where('seq_no',req.query.seq_no).update('status',1);

        sql.then(function (reply) {
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex.raw("INSERT INTO operation_record (operator_id,operator_name,operation_type,record_id,operat_time,status,source)" +
                " VALUES ('"+req.session.account_id+"','"+req.session.username+"','恢复用户信息',(SELECT account_id FROM account WHERE seq_no = '"+req.query.seq_no+"'),'"+time+"',1,1)")
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //用户重置密码
    router.get('/account/resetPassword', function (req, res,next) {
        var sql = knex('account').where('seq_no',req.query.seq_no).update('password',123456);

        sql.then(function (reply) {
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex.raw("INSERT INTO operation_record (operator_id,operator_name,operation_type,record_id,operat_time,status,source)" +
                " VALUES ('"+req.session.account_id+"','"+req.session.username+"','重置用户密码',(SELECT account_id FROM account WHERE seq_no = '"+req.query.seq_no+"'),'"+time+"',1,1)")
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });



};