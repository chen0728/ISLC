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

    //查询个人资料列表
    router.get('/personal/list', function (req, res,next) {
        var account_id = req.query.account_id
        var sql = knex.select('*').from('data_info').where('status','!=',2).where('data_type','!=',4).where('account_id',account_id);
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
    router.get('/personal/get', function (req, res, next) {
        var pro = req.body;
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
    router.post('/personal/del', function (req, res, next) {
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
    router.post('/personal/insert', function (req, res, next) {
        var pro = req.body;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.up_time = mydate;
        var sql = knex('data_info').insert(pro);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //查询seq_no
    router.get('/personal/select', function (req, res, next) {
        var sql = knex.select('*').from('data_info').orderBy('seq_no','desc');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};