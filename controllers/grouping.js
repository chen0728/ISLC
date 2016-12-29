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

    //关联查询组名
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
    //查询场景
    router.post('/grouping/remarks', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('grouping_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //查询未分组学生
    router.post('/grouping/groupOut', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('account')
            .where('class',seq_no).whereNull('grouping').orWhere('grouping','').where('class',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //查询未分组学生
    router.get('/grouping/save', function (req, res, next) {
        var in_group = req.query.in_group;
        var out_group = req.query.out_group;
        var seq_no_name = req.query.seq_no_name;
        var remarks = req.query.remarks;
        var sql = knex.select('*').from('account');
        var sql_ = knex.select('*').from('account');
        var sql_gro = knex.select('*').from('grouping_info').update('remarks',remarks).where('seq_no',seq_no_name);
        if(in_group){
            for(var i = 0; i<in_group.length; i++ ){
                sql = sql.orWhere('seq_no',in_group[i]);
            };
            sql = sql.update('grouping',seq_no_name);
        };
        if(out_group){
            for(var i = 0; i<out_group.length; i++ ){
                sql_ = sql_.orWhere('seq_no',out_group[i]);
            };
            sql_ = sql_.update('grouping','');
        }
        // 执行sql
        sql.then(function (reply) {
            return sql_;
        }).then(function (reply) {
            return sql_gro;
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //新建组
    router.post('/grouping/new', function (req, res, next) {
        var pro = req.body;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.date1 = mydate;
        var sql = knex('grouping_info').insert(pro);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //删除组
    router.post('/grouping/delGroup', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('grouping_info').update('class','').where('seq_no',seq_no);
        var sql_ = knex('account').update('grouping','').where('grouping',seq_no);
        // 执行sql
        // 执行sql
        sql.then(function (reply) {
            return sql_;
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};