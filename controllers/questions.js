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

    //查询题目列表
    router.get('/questions/list', function (req, res,next) {
        var sql = knex.select('*').from('questions_bank').where('public',1).where('status',1);
        var params = req.query;
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no);
        }
        if(params.question_name){
            sql = sql.where('question_name','like', '%'+params.question_name+'%');
        }
        if(params.score){
            sql = sql.where('score',params.score);
        }
        if(params.type){
            sql = sql.where('type',params.type);
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
        sql = sql.orWhere('account_id', req.session.account_id);
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no);
        }
        if(params.question_name){
            sql = sql.where('question_name','like', '%'+params.question_name+'%');
        }
        if(params.score){
            sql = sql.where('score',params.score);
        }
        if(params.remarks){
            sql = sql.where('remarks','like', '%'+params.remarks+'%');
        }
        if(params.type){
            sql = sql.where('type',params.type);
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

    //修改或新建听力题目
    router.get('/questions/new', function (req, res,next) {
        var params = req.query.params;
        var sql = knex('questions_bank');

        //修改
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no).update(params);
        } else {
            sql = sql.insert(params);
        }

        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //逻辑删除题目
    router.get('/questions/del', function (req, res,next) {
        var sql = knex('questions_bank').where('seq_no',req.query.seq_no).update('status',2);

        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //新建听力试题
    router.get('/questions/TLNew', function (req, res,next) {
        var question = req.query.question;
        var question_list = req.query.question_list;

        question.account_id = req.session.account_id;
        question.data1 = new data();
        var sql = knex('questions_bank').insert(qusetion);
        sql.then(function (reply) {

            var sql_ = knex('questions_info');
            for(var i =0;i<qusetion_list.length;i++){
                question_list[i].related_bank = reply[0];
                question_list[i].account_id = req.session.account_id;
                sql_ = sql_.insert(question_list[i]);
            }
            return sql_;
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};