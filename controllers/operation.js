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

    //查询操作记录列表
    router.get('/operation/list', function (req, res,next) {
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




};