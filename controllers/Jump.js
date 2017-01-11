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


    /*********************前端*********************/


    /*********************后台*********************/

        //后台登陆页面
        //router.get('/', function (req, res) {
        //    res.render('Backstage/login',{code:0,text:""});
        //});
        //    router.get('/', function (req, res) {
        //        res.render('/index',{code:0,text:""});
        //    });
        // 首页
    router.get('/',filter.authorize, function (req, res) {
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        var Stamp = new Date();
        var mm_dd = (Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日";
        var Week = dayNames[Stamp.getDay()];
        res.render('Backstage/index',{
            login_account_id:req.session.account_id,
            menu_id:req.session.menu_id,
            username:req.session.username,
            mm_dd:mm_dd,
            Week:Week});
    });
    //后台登陆页面
    router.get('/login', function (req, res) {
        res.render('Backstage/login',{code:0,text:""});
    });
    //退出后台登录
    router.get('/logout', function (req, res) {
        req.session.destroy();
        res.render('Backstage/login',{code:0,text:""});
    });
    //后台首页
    router.post('/login', function (req, res) {
        var userInfo = req.body;
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        var Stamp = new Date();
        var mm_dd = (Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日";
        var Week = dayNames[Stamp.getDay()];
        knex.select('*').from('account').leftJoin('role_info', 'account.part', 'role_info.seq_no').where('account.account_id', userInfo.username).where('account.password', userInfo.password).then(function (reply) {
            if(reply.length == 1){
                var time = new Date();
                time = moment().format('YYYY-MM-DD HH:mm:ss');
                req.session.account_id = userInfo.username;
                req.session.menu_id = reply[0].menu_id;
                req.session.username = reply[0].name;
                return knex('operation_record').insert({
                    operator_id: reply[0].account_id,
                    operator_name: reply[0].name,
                    operation_type: '登录',
                    operat_time: time,
                    record_id: reply[0].account_id,
                    status: 1,
                    source: 1
                });

            }else{
                res.redirect('/');
            }
        }).then(function (reply) {
            res.redirect('/index');
        }).catch(function (err) {
            next(err);
        });
    });
    //前台登录验证
    router.post('/loginApp', function (req, res) {
        var userInfo = req.body;
        knex.select('*').from('account').where({account_id:userInfo.username,password:userInfo.password,part:userInfo.part}).then(function (reply) {
            if(reply.length == 1){
                req.session.account_id = userInfo.username;
                //res.send({user:reply[0],state:true});
                res.json({user:reply[0],state:true});
            }else{
                //res.send({user:null,state:false});
                res.json({user:null,state:false});
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //后台首页
    router.get('/index',filter.authorize, function (req, res) {
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        var Stamp = new Date();
        var mm_dd = (Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日";
        var Week = dayNames[Stamp.getDay()];
        res.render('Backstage/index',{
            login_account_id:req.session.account_id,
            menu_id:req.session.menu_id,
            username:req.session.username,
            mm_dd:mm_dd,
            Week:Week});
    });
    //后台首页
    router.get('/account_manage',filter.authorize, function (req, res) {
        res.render('Backstage/account_manage',{code:0,text:""});
    });
    //权限管理
    router.get('/role_manage',filter.authorize, function (req, res) {
        res.render('Backstage/role_manage',{code:0,text:""});
    });
    //数据字典
    router.get('/value_mapping',filter.authorize, function (req, res) {
        res.render('Backstage/value_mapping',{code:0,text:""});
    });
    //数据字典
    router.get('/course_manage',filter.authorize, function (req, res) {
        res.render('Backstage/course_manage',{code:0,text:""});
    });
    //操作日志
    router.get('/operation_record',filter.authorize, function (req, res) {
        res.render('Backstage/operation_record',{code:0,text:""});
    });
    //题目管理
    router.get('/questions_manage',filter.authorize, function (req, res) {
        res.render('Backstage/questions_manage',{code:0,text:""});
    });
    //题目管理
    router.get('/TLquestions_manage',filter.authorize, function (req, res) {
        res.render('Backstage/TLquestions_manage',{seq_no:req.query.seq_no});
    });
    //课程管理
    router.get('/course_add',filter.authorize, function (req, res) {
        res.render('Backstage/course_add',{seq_no:req.query.seq_no});
    });
    //课堂音频管理
    router.get('/class_audio',filter.authorize, function (req, res) {
        res.render('Backstage/class_audio',{seq_no:req.query.seq_no});
    });
    //学生分组管理
    router.get('/grouping',filter.authorize, function (req, res) {
        res.render('Backstage/grouping',{seq_no:req.query.seq_no});
    });
    //公共资料管理
    router.get('/public_information',filter.authorize, function (req, res) {
        res.render('Backstage/public_information',{seq_no:req.query.seq_no});
    });
    //个人资料管理
    router.get('/personal_information',filter.authorize, function (req, res) {
        res.render('Backstage/personal_information',{seq_no:req.query.seq_no});
    });
    //分组语音对话回顾
    router.get('/group_audio',filter.authorize, function (req, res) {
        res.render('Backstage/group_audio',{seq_no:req.query.seq_no});
    });
    //课堂多媒体资料回顾
    router.get('/class_media',filter.authorize, function (req, res) {
        res.render('Backstage/class_media',{seq_no:req.query.seq_no});
    });
    //课堂多媒体资料查看
    router.get('/media_player',filter.authorize, function (req, res) {
        res.render('Backstage/media_player',{seq_no:req.query.seq_no});
    });
    //文件上传
    //router.get('/media_player',filter.authorize, function (req, res) {
    //    res.render('Backstage/media_player',{seq_no:req.query.seq_no});
    //});
};