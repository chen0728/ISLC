/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */
$(function () {
    var $p_id = $("#media_player_page");
    //修改课程
    seq_no = $p_id.find("#seq_no").val();
    //查询详情 并自动填充
    $.ajax({
        type: "get",
        url: "/course_info/get?seq_no="+seq_no,
        dataType: "json",
        data: {},
        success: function (data) {
            //填充关联资料
            var seq_data = data[0].related_data.split(";");
            for(var i=0;i<seq_data.length;i++){
                var seq_no=seq_data[i];
                $.ajax({
                    type: "get",
                    url: "/course_info/getl?seq_no="+seq_no,
                    async: false,
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        var format_url;
                        var filedata
                        filedata = data[0].data_url.split(".")[data[0].data_url.split(".").length-1];
                        if('avi,AVI'.indexOf(filedata) > -1){format_url = 'avi'
                        }else if('css,CSS'.indexOf(filedata) > -1){format_url = 'css'
                        }else if('csv,CSV'.indexOf(filedata) > -1){format_url = 'csv'
                        }else if('doc,DOC,docx,DOCX'.indexOf(filedata) > -1){format_url = 'doc'
                        }else if('eml,EML'.indexOf(filedata) > -1){format_url = 'eml'
                        }else if('eps,EPS'.indexOf(filedata) > -1){format_url = 'eps'
                        }else if('html,HTML'.indexOf(filedata) > -1){format_url = 'html'
                        }else if('jpg,JPG,jpeg,JPEG'.indexOf(filedata) > -1){format_url = 'jpg'
                        }else if('mov,MOV'.indexOf(filedata) > -1){format_url = 'mov'
                        }else if('mp3,MP3'.indexOf(filedata) > -1){format_url = 'mp3'
                        }else if('pdf,PDF'.indexOf(filedata) > -1){format_url = 'pdf'
                        }else if('png,PNG'.indexOf(filedata) > -1){format_url = 'png'
                        }else if('ppt,PPT'.indexOf(filedata) > -1){format_url = 'ppt'
                        }else if('rar,RAR'.indexOf(filedata) > -1){format_url = 'rar'
                        }else if('raw,RAW'.indexOf(filedata) > -1){format_url = 'raw'
                        }else if('ttf,TTF'.indexOf(filedata) > -1){format_url = 'ttf'
                        }else if('txt,TXT'.indexOf(filedata) > -1){format_url = 'txt'
                        }else if('wav,WAV'.indexOf(filedata) > -1){format_url = 'wav'
                        }else if('xls,XLS,xlsx,XLSX'.indexOf(filedata) > -1) {format_url = 'xls'
                        }else{format_url = 'unknow'};
                        if(format_url == 'unknow'){
                            $p_id.find("#play_table").append('<div style="width:16%;float: left;margin-bottom: 10px" class="">'+
                                '<div style="text-align: center;cursor:pointer;margin:0px 0px 0px 34px;background-image:url(images/format_img/'+format_url+'.jpg);background-size: 100% 100%;width: 63px;height: 95px; " class="sstj1" data-id="'+data[0].seq_no+'"></div>'+
                                '<div style="width: 33px;height: 21px;position:absolute;z-index:1;margin: -93px 0 0 37px;font-size: 14px;overflow: hidden;color: #ffffff;font-family: fantasy;">'+filedata+'</div>'+
                                '<div style="text-align: center;margin:4px 0px 6px 0px;font-size:14px;cursor:pointer;white-space: nowrap;overflow: hidden;text-overflow: ellipsis" class="sstj1" data-id="'+data[0].seq_no+'">'+data[0].name+'</div>'+
                                '</div>');
                        }else{
                            $p_id.find("#play_table").append('<div style="width:16%;float: left;margin-bottom: 10px" class="">'+
                                '<div style="text-align: center;cursor:pointer;margin:0px 0px 0px 34px;background-image:url(images/format_img/'+format_url+'.jpg);background-size: 100% 100%;width: 63px;height: 95px; " class="sstj1" data-id="'+data[0].seq_no+'"></div>'+
                                '<div style="text-align: center;margin:4px 0px 6px 0px;font-size:14px;cursor:pointer;white-space: nowrap;overflow: hidden;text-overflow: ellipsis" class="sstj1" data-id="'+data[0].seq_no+'">'+data[0].name+'</div>'+
                                '</div>');
                        };
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                });
            }
            //动态绑定查看时间
            $(".sstj1").on("click",function(){
                $p_id.find("#playMediaModal").modal('show');
                $.ajax({
                    type: "get",
                    url: "/course_info/getl?seq_no="+$(this).attr("data-id"),
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        filedata = data[0].data_url.split(".")[data[0].data_url.split(".").length-1];
                        if('avi,AVI'.indexOf(filedata) > -1){format_url = 'avi'
                        }else if('css,CSS'.indexOf(filedata) > -1){format_url = 'css'
                        }else if('csv,CSV'.indexOf(filedata) > -1){format_url = 'csv'
                        }else if('doc,DOC,docx,DOCX'.indexOf(filedata) > -1){format_url = 'doc'
                        }else if('eml,EML'.indexOf(filedata) > -1){format_url = 'eml'
                        }else if('eps,EPS'.indexOf(filedata) > -1){format_url = 'eps'
                        }else if('html,HTML'.indexOf(filedata) > -1){format_url = 'html'
                        }else if('jpg,JPG,jpeg,JPEG'.indexOf(filedata) > -1){format_url = 'jpg'
                        }else if('mov,MOV'.indexOf(filedata) > -1){format_url = 'mov'
                        }else if('mp3,MP3,wav,WAV'.indexOf(filedata) > -1){
                            $p_id.find("#mediaAreaLab").css({'font-size': '29px','margin':'0px 0px 0px 0px'});
                            $p_id.find("#mediaAreaLab").html(data[0].name);
                            $p_id.find("#media").html('<audio src="'+data[0].data_url+'" style="margin: -18px 0px -8px 0px;width: 534px;" controls="controls">您的浏览器不支持audio标签，请使用更新版本的浏览器。</audio>');
                            $p_id.find("#videoButton").css('margin','0px 43px 0px 0px');
                        }else if('ogg,OGG,mp4,MP4,mpeg4,MPEG4,webm,WEBM'.indexOf(filedata) > -1){
                            $p_id.find("#mediaAreaLab").css({'font-size': '20px','margin':'-38px 0px 0px -46px'});
                            $p_id.find("#mediaAreaLab").html(data[0].name);
                            $p_id.find("#media").html('<video src="'+data[0].data_url+'" style="margin: -18px 0px -28px -50px;width: 648px;" controls="controls">您的浏览器不支持video标签，请使用更新版本的浏览器。</video>');
                            $p_id.find("#videoButton").css('margin','0px 43px -20px 0px');
                        }else if('pdf,PDF'.indexOf(filedata) > -1){format_url = 'pdf'
                        }else if('png,PNG'.indexOf(filedata) > -1){format_url = 'png'
                        }else if('ppt,PPT'.indexOf(filedata) > -1){format_url = 'ppt'
                        }else if('rar,RAR'.indexOf(filedata) > -1){format_url = 'rar'
                        }else if('raw,RAW'.indexOf(filedata) > -1){format_url = 'raw'
                        }else if('ttf,TTF'.indexOf(filedata) > -1){format_url = 'ttf'
                        }else if('txt,TXT'.indexOf(filedata) > -1){format_url = 'txt'
                        }else if('wav,WAV'.indexOf(filedata) > -1){format_url = 'wav'
                        }else if('xls,XLS,xlsx,XLSX'.indexOf(filedata) > -1) {format_url = 'xls'
                        }else{format_url = 'unknow'};
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                });
            });
        },
        error: function (data) {
            alert("系统错误");
        }
    });
    //关闭
    $p_id.find("#play_media_cancel").on("click",function(){
        $p_id.find("#media").html('');
    });
    $(".close").on('click',function(){
        $p_id.find("#media").html('');
    });
});










