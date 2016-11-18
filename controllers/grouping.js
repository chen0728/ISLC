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

    //查询账号班级
    router.post('/grouping/class', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('account').where('account_id',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联查询班级名
    router.post('/grouping/className', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('value_mapping').where('num1',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //关联查询班级名
    router.post('/grouping/group', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('grouping_info').where('class',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //查询seq_no
    router.get('/grouping/group_seq', function (req, res, next) {
        var sql = knex.select('*').from('grouping_info').orderBy('seq_no','desc');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //关联查询学生
    router.post('/grouping/name', function (req, res, next) {
        var seq_no = req.query.seq_no_name;
        var sql = knex.select('*').from('account').where('grouping',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};