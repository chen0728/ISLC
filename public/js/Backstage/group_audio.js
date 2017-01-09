/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var $p_id = $("#group_audio_page");
    var account_id = $('#login_account_id').val();
    var part = $("#menu_id").val();
    debugger;
    if(part.indexOf("5")> -1 || part.indexOf("6")> -1){
        var ajax_url = '/grouping/select?account_id='+account_id;
    }else{
        var ajax_url = '/grouping/classOther';
    }
    //填充班级下拉菜单
    $.ajax({
        type: "get",
        url: ajax_url,
        dataType: "json",
        data:{},
        success: function (data) {
            debugger;
            if(data.length >0){
                for(var i=0;i<data.length;i++){
                    $("#slc_class").append('<option value="'+data[i].num1+'">'+data[i].key_val_cn+'</option>')
                }
            };
        },
        error: function (data) {
            alert("系统错误6");
        }
    });
    // 查询组音频列表
    $p_id.find('#slc_class').on("change",function (){
        $("#group_audio_form").empty();
        var seq_no = $p_id.find('#slc_class').val();
        if(part.indexOf("5")> -1){
            var ajax_url_ = '/grouping/group?seq_no='+seq_no+'&account_id='+account_id;
        }else{
            var ajax_url_ = '/grouping/group_seq?seq_no='+seq_no;
        }
        $.ajax({
            type: "post",
            url:ajax_url_,
            dataType: "json",
            data:{},
            success: function (data) {
                debugger;
                if(data && data.length>0){
                    $p_id.find("#remide").html('如遇下载失败，请优先尝试IE浏览器');
                    $p_id.find("#remide").css({'float':'right','margin':'-8px 103px 10px 0px'});
                    for(var i=0;i<data.length;i++){
                        if(data[i].audio){
                            $("#group_audio_form").append('<div class="form-group " style="float: left;margin: -49px 0px 60px 92px;">'+
                                '<label class="control-label w-9">'+data[i].group+'</label>'+
                                '<div class="w-40 relative">'+
                                '<audio src="/upload/'+data[i].audio+'" style="margin:0px 0px -18px -8px;width: 510px;" controls="controls">您的浏览器不支持audio标签，请使用更新版本的浏览器。</audio>'+
                                '</div>'+
                                '<button data_url="'+data[i].audio+'" type="button" class="btn btn-success w-14 font-16 float-none ml-2 download" style="margin: 1px 0px 0px 110px;height: 32px;width: 80px;">下载</button>'+
                                '</div><br>');
                        }else{
                            $("#group_audio_form").append('<div class="form-group " style="float: left;margin: -49px 0px 60px 92px;">'+
                                '<label class="control-label w-9">'+data[i].group+'</label>'+
                                '<div class="w-40 relative" style="margin-top: 7px" >无</div>'+
                                '</div><br>');
                        };
                    }
                }else{
                    $p_id.find("#remide").html('该班级未添加任何分组');
                    $p_id.find("#remide").css({'float':'left','margin':'-5px 0px 0px 10px'});
                }
                $(".download").on("click",function(){
                    debugger;
                    var spid = $p_id.find(this).attr('data_url');
                    window.open("/upload/"+spid);
                })
            },
            error: function (data) {
                alert("系统错误3");
            }
        });
    });
})





