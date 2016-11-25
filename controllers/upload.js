var express = require('express');
var router = express.Router();
var Grid = require('gridfs-stream');
var mongoClient = require('../lib/common/mongoClient');
var fs = require('fs');
var gm = require('gm');
var Busboy = require('busboy');
var uuid = require('node-uuid');
var  formidable = require('formidable');
var  fs = require('fs');
var  TITLE = 'formidable上传示例';
var  AVATAR_UPLOAD_FOLDER = '/upload/';
//var gfs = Grid(mongoClient.connection.db, mongoClient.mongoose.mongo);
module.exports = function (app) {
    app.use('/', router);

    router.get('/', function (req, res, next) {
        res.send('Hello');
    });

    router.get('/upload/:id', function (req, res, next) {
        var readstream = gfs.createReadStream({
            filename: req.params.id
        });
        res.set('Content-Type', 'image/jpeg');
        readstream.on('error', function (err) {
            next(err);
        }).pipe(res).on('end', function (res) {
        });
    });


    router.post("/upload", function (req, res, next) {
        var form = new formidable.IncomingForm();   //创建上传表单
        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

        form.parse(req, function(err, fields, files) {

            if (err) {
                res.locals.error = err;
                res.render('index', { title: TITLE });
                return;
            }

            var extName =files.Filedata.name.split(".")[1];  //后缀名.
            var avatarName = uuid.v1() + '.' + extName;
            var newPath = form.uploadDir + avatarName;

            console.log(newPath);
            fs.renameSync(files.Filedata.path, newPath);  //重命名
            res.json({date:avatarName})
        });

        /*var busboy = new Busboy({headers: req.headers, limits: {fileSize: 10000000}});
         var newfilename = uuid.v1()+ '.jpg';
         busboy.on('error', function (err) {
         res.end();
         }).on('file', function (fieldname, files, filename, encoding, mimetype) {

         var writestream = gfs.createWriteStream({
         filename: newfilename
         });
         file.pipe(writestream).on('end', function (err) {
         console.log(err);
         });

         console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);


         if (err) {
         res.locals.error = err;
         res.render('index', { title: TITLE });
         return;
         }

         file.on("end", function () {
         })
         }).on('finish', function (err) {
         res.json({date:newfilename})
         });
         req.pipe(busboy);*/
    })



    router.post("/upload/video", function (req, res, next) {
        var busboy = new Busboy({headers: req.headers, limits: {fileSize: 10000000}});

        var newfilename = uuid.v1()
        busboy.on('error', function (err) {
            res.end();
        }).on('file', function (fieldname, file, filename, encoding, mimetype) {
            var filetype =filename.substring(filename.lastIndexOf('.') + 1);
            newfilename = newfilename +'.'+filetype;
            var writestream = gfs.createWriteStream({
                filename: newfilename
            });
            file.pipe(writestream).on('end', function (err) {
                console.log(err);
            });

            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);





            file.on("end", function () {
            })
        }).on('finish', function (err) {
            res.json({date:newfilename})
        });
        req.pipe(busboy);
    })


    router.get('/release/app', function (req, res, next) {
        queryService.getReleaseFileSize().then(function (size) {
            res.setHeader('Content-Length', size.toString());

            var readstream = gfs.createReadStream({
                filename: 'fzr.apk'
            });
            readstream.on('error', function (err) {
                next(err);
            }).pipe(res).on('end', function (res) {
            });
        }).catch(next);
    });


    router.get('/release/appversion', function (req, res, next) {
        var readstream = gfs.createReadStream({
            filename: 'version.json'
        });
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        readstream.on('error', function (err) {
            next(err);
        }).pipe(res).on('end', function (res) {
        });
    });


};