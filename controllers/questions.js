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
    router.get('/questions/list', function (req, res,next) {
        var sql = knex.select('*').from('questions_info').where('public',1).orWhere('account_id', 'P10000');
        var params = req.query;
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no);
        }
        if(params.question){
            sql = sql.where('question','like', '%'+params.question+'%');
        }
        if(params.score){
            sql = sql.where('score',params.score);
        }
        if(params.remarks){
            sql = sql.where('remarks','like', '%'+params.remarks+'%');
        }
        if(params.account_id){
            sql = sql.where('account_id','like', '%'+params.account_id+'%');
        }
        if(params.public){
            sql = sql.where('public',params.public);
        }
        if(params.status){
            sql = sql.where('status',params.status);
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



};