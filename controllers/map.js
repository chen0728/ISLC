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

    //查询数据字典列表
    router.get('/value_mapping/list', function (req, res,next) {
        var sql = knex.select('*').from('value_mapping').where('data_status','!=',2)
        var params = req.query;
        if(params.num1){
            sql = sql.where('num1', params.num1);
        }
        if(params.type){
            sql = sql.where('type','like','%'+params.type+'%');
        }
        if(params.key_id){
            sql = sql.where('key_id',params.key_id);
        }
        if(params.key_val_cn){
            sql = sql.where('key_val_cn','like','%'+params.key_val_cn+'%');
        }
        if(params.date1S){
            sql = sql.where('date1','>=',params.date1S);
        }
        if(params.date1E){
            sql = sql.where('date1','<=',params.date1E);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].date1 = moment(reply[i].date1).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });

    //查询详情
    router.get('/value_mapping/get', function (req, res, next) {
        var pro = req.body;
        var num1 = req.query.num1;
        var sql = knex.select('*').from('value_mapping').where('num1',num1);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //更新
    router.post('/value_mapping/update', function (req, res, next) {
        var pro = req.body;
        var num1 = req.query.num1;
        var sql = knex('value_mapping').update(pro).where('num1',num1);
        var mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        var data_reply;
        sql.then(function (reply) {
            data_reply = reply;
            return knex('operation_record').insert({
                operator_id: req.session.account_id,
                operator_name: req.session.username,
                operation_type: '更新班级',
                operat_time: mydate,
                record_id: num1,
                status: 1,
            });
        }).then(function (reply) {
            res.json({data: data_reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //删除
    router.post('/value_mapping/del', function (req, res, next) {
        var num1 = req.query.num1;
        var sql = knex('value_mapping').update('data_status',2).where('num1',num1);
        var mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        var data_reply;
        sql.then(function (reply) {
            data_reply = reply;
            return knex('operation_record').insert({
                operator_id: req.session.account_id,
                operator_name: req.session.username,
                operation_type: '删除班级',
                operat_time: mydate,
                record_id: num1,
                status: 1,
            });
        }).then(function (reply) {
            res.json({data: data_reply});
        }).catch(function (err) {
            next(err);
        });
    });

    //新建
    router.post('/value_mapping/insert', function (req, res, next) {
        var pro = req.body;
        var mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.date1 = mydate;
        var sql = knex('value_mapping').insert(pro);
        var data_reply;
        sql.then(function (reply) {
            data_reply = reply;
            return knex('operation_record').insert({
                operator_id: req.session.account_id,
                operator_name: req.session.username,
                operation_type: '新建班级',
                operat_time: mydate,
                record_id: pro.num1,
                status: 1,
            });
        }).then(function (reply) {
            res.json({data: data_reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //查询num1
    router.get('/value_mapping/select', function (req, res, next) {
        var sql = knex.select('*').from('value_mapping').orderBy('num1','desc');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};