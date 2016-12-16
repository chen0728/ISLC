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

    //查询公共资料列表
    router.get('/Pinformation/list', function (req, res,next) {
        var sql = knex.select('*').from('data_info').where('status','!=',2).where('public',1);
        var params = req.query;
        if(params.name){
            sql = sql.where('name','like','%'+ params.name+'%');
        }
        if(params.number){
            sql = sql.where('number',params.number);
        }
        if(params.data_type){
            sql = sql.where('tata_type',params.data_type);
        }
        if(params.accouat_id){
            sql = sql.where('accouat_id',params.accouat_id);
        }
        if(params.up_timeS){
            sql = sql.where('up_time','>=',params.up_timeS);
        }
        if(params.up_timeE){
            sql = sql.where('up_time','<=',params.up_timeE);
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
    //查询个人资料列表
    router.get('/personal/list', function (req, res,next) {
        var sql = knex.select('*').from('data_info').where('status','!=',2).where('public',2);
        var params = req.query;
        if(params.name){
            sql = sql.where('name','like','%'+ params.name+'%');
        }
        if(params.number){
            sql = sql.where('number',params.number);
        }
        if(params.data_type){
            sql = sql.where('data_type',params.data_type);
        }
        if(params.account_id){
            sql = sql.where('account_id',params.account_id);
        }
        if(params.up_timeS){
            sql = sql.where('up_time','>=',params.up_timeS);
        }
        if(params.up_timeE){
            sql = sql.where('up_time','<=',params.up_timeE);
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

//查询详情
    router.get('/Pinformation/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('data_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //删除
    router.post('/Pinformation/del', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('data_info').update('status',2).where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //新建
    router.post('/Pinformation/insert', function (req, res, next) {
        var pro = req.body;
        pro.up_time = moment().format('YYYY-MM-DD HH:mm:ss');
        if(pro.number){
            var sql = knex('data_info').insert(pro);
        }else{
            var sql = knex('data_info').update(pro).where('seq_no',pro.seq_no);
        }
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //查询num1
    router.get('/Pinformation/select', function (req, res, next) {
        var sql = knex.select('*').from('data_info').orderBy('seq_no','desc');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};