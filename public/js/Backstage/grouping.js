/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var $p_id = $("#grouping_page");
    debugger;
    seq_no = $('#login_account_id').val();
    $.ajax({
        type: "post",
        url: '/grouping/class?seq_no='+seq_no,
        dataType: "json",
        data:{},
        success: function (data) {
            debugger;
            var clas_seq = data[0].class.split(";");
            debugger;
            for(var i=0;i<clas_seq.length;i++){
                seq_noName = clas_seq[i+1]
                $.ajax({
                    type: "post",
                    url: '/grouping/className?seq_no='+seq_noName,
                    dataType: "json",
                    data:{},
                    success: function (data) {
                        debugger;
                        for(var i=0;i<clas_seq.length-1;i++){
                            $("#slc_class").append('<option value="'+data[0].key_id+'">'+data[0].key_val_cn+'</option>')
                        }
                    },
                    error: function (data) {
                        alert("系统错误2");
                    }
                });
            }
        },
        error: function (data) {
            alert("系统错误1");
        }
    });
    $p_id.find("#addGroup").modal('show');
    $p_id.find('#slc_class').on("change",function (){
        //var asc = $p_id.find('#slc_class').val();
    });
    $p_id.find('#slc_group').on("change",function (){
        debugger;
        var info = $(this).attr("class");
        if(info == 'slc_group'){
            $p_id.find("#addgroup").modal('show');
        }
        //debugger;
        //$p_id.find('.addgroup').on("click",function (){
        //    debugger;
        //});
    });
});





