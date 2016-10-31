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
    router.get('/role_info/list', function (req, res,next) {
        var sql = knex.select('*').from('role_info').where('status','!=',2)
        var params = req.query;
        if(params.seq_no){
            sql = sql.where('seq_no', params.seq_no);
        }
        if(params.role_name){
            sql = sql.where('role_name','like','%'+params.role_name+'%');
        }
        if(params.date1s){
            sql = sql.where('date1','>=',params.date1s);
        }
        if(params.date1e){
            sql = sql.where('date1','<=',params.date1e);
        }
        if(params.date2s){
            sql = sql.where('date2','>=',params.date2s);
        }
        if(params.date2e){
            sql = sql.where('date2','<=',params.date2e);
        }
        if(params.menu_id == 1){
            sql = sql.where('menu_id',';');
        }
        if(params.menu_id == 2){
            sql = sql.where('menu_id','!=',';');
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].date1 = moment(reply[i].date1).format('YYYY-MM-DD');
                    reply[i].date2 = moment(reply[i].date2).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });

    router.get('/role_info/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('role_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //更新
    router.post('/role_info/insert', function (req, res, next) {
        var pro = req.body;
        var seq_no = req.query.seq_no;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.date2 = mydate;
        var sql = knex('role_info').update(pro).where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //删除
    router.post('/role_info/del', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('role_info').update('status',2).where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //新建
    router.post('/role_info/ins', function (req, res, next) {
        var pro = req.body;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.date1 = mydate;
        pro.date2 = mydate;
        var sql = knex('role_info').insert(pro);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
};