/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var $p_id = $("#group_audio_page");
    //填充班级下拉菜单
    seq_no = $('#login_account_id').val();
    $.ajax({
        type: "post",
        url: '/grouping/class?seq_no='+seq_no,
        dataType: "json",
        data:{},
        success: function (data) {
            var clas_seq = data[0].class.split(";");
            for(var i=0;i<clas_seq.length;i++){
                var seq_noName = clas_seq[i];
                $.ajax({
                    type: "post",
                    url: '/grouping/className?seq_no='+seq_noName,
                    dataType: "json",
                    data:{},
                    success: function (data) {
                        debugger;
                        if(data.length >0){
                            $("#slc_class").append('<option value="'+data[0].key_id+'">'+data[0].key_val_cn+'</option>')
                        }
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                });
            }
        },
        error: function (data) {
            alert("系统错误");
        }
    });
    // 查询组下拉框
    $p_id.find('#slc_class').on("change",function (){
        $("#group_audio_form").empty();
        var seq_no = $p_id.find('#slc_class').val();
        $.ajax({
            type: "post",
            url: '/grouping/group?seq_no='+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    $("#group_audio_form").append('<div class="form-group " style="float: left;margin: -49px 0px 60px 92px;">'+
                        '<label class="control-label w-9">'+data[i].group+'</label>'+
                        '<div class="w-40 relative">'+
                        '<audio src="/upload/'+data[i].audio+'" style="margin:0px 0px -18px -8px;width: 510px;" controls="controls">您的浏览器不支持audio标签，请使用更新版本的浏览器。</audio>'+
                        '</div>'+
                        '<button data_url="'+data[i].audio+'" type="button" class="btn btn-success w-14 font-16 float-none ml-2 download" style="margin: 1px 0px 0px 110px;height: 32px;width: 80px;">下载</button>'+
                        '</div><br>');
                }
                $(".download").on("click",function(){
                    debugger;
                    var spid = $p_id.find(this).attr('data_url');
                    window.open("/upload/"+spid);
                })
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });
})





