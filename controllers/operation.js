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
        var sql = knex.select('*').from('operation_record');
        var params = req.query;
        if(params.seq_no){
            sql = sql.where('seq_no','like','%' + params.seq_no + '%');
        }
        if(params.operator_name){
            sql = sql.where('operator_name','like','%' + params.operator_name + '%');
        }
        if(params.operation_type){
            sql = sql.where('operation_type',params.operation_type);
        }
        if(params.operat_time_s){
            params.operat_time_s = moment(params.operat_time_s);
            sql = sql.where('operat_time','<=',params.operat_time);
        }
        if(params.operat_time_e){
            params.operat_time_e = moment(params.operat_time_e);
            sql = sql.where('operat_time','>=',params.operat_time);
        }
        if(params.operator_part){
            sql = sql.where('operator_part',params.operator_part);
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