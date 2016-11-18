/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var new_seq;
    var new_seq_no;
    var new_seq_val;
    var new_seq_push;
    var val_str = [];
    var name_str = [];

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
                        $("#slc_class").append('<option value="'+data[0].key_id+'">'+data[0].key_val_cn+'</option>')
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
    $p_id.find('#slc_class').on("change",function (){
        $("#slc_group").empty();
        $("#inGroup").empty();
        var seq_no = $p_id.find('#slc_class').val();
        debugger;
        $.ajax({
            type: "post",
            url: '/grouping/group?seq_no='+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    $("#slc_group").append('<option value="'+data[i].seq_no+'">'+data[i].group+'</option>')
                }
                if($("#slc_class").val() != 9999){
                    $("#slc_group").append('<option value="9999" name="opAddGroup">添加组</option>')
                }
                var seq_no_name = data[0].seq_no;
                $.ajax({
                    type: "post",
                    url: '/grouping/name?seq_no_name='+seq_no_name,
                    dataType: "json",
                    data:{},
                    success: function (data) {
                        for(var i=0;i<data.length;i++){
                            $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+data[i].seq_no+'" name="'+data[i].name+'" >'+data[i].name+'</a><br>')
                        }
                    },
                    error: function (data) {
                        alert("系统错误1");
                    }
                });
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });

    // 动态绑定去除组内事件
    $(document).on("click", ".name_out", function () {
        $(this).hide();
        debugger;
        var seq_name = $(this).attr('data_id');
        var name = $(this).attr('name');
        debugger;
        $("#outGroup").append('<a class="name_int" href="javascript:void(0)" style="cursor:pointer" data_id="'+seq_name+'" name="'+name+'">'+name+'</a><br>')
    });

    // 动态绑定添加组员事件
    $(document).on("click", ".name_int", function () {
        $(this).hide();
        debugger;
        var seq_name_in = $(this).attr('data_id');
        var name_in = $(this).attr('name');
        debugger;
        $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+seq_name_in+'" name="'+name_in+'">'+name_in+'</a><br>')
    });


    $p_id.find('#slc_group').on("change",function (){
        debugger;
        if($("#slc_group").val() == 9999){
            $p_id.find("#addGroup").modal('show');
            debugger;
        }
    });
    $("button[name='close']") .on("click",function (){
        debugger;
        $("#slc_group").empty();
        $("#inGroup").empty();
        var seq_no = $p_id.find('#slc_class').val();
        debugger;
        $.ajax({
            type: "post",
            url: '/grouping/group?seq_no='+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    $("#slc_group").append('<option value="'+data[i].seq_no+'">'+data[i].group+'</option>')
                }
                if($("#slc_class").val() != 9999){
                    $("#slc_group").append('<option value="9999" name="opAddGroup">添加组</option>')
                }
            },
            error: function (data) {
                alert("系统错误1");
            }
        });
    });
    $.ajax({
        type: "get",
        url: '/grouping/group_seq',
        async: false,
        dataType: "json",
        data:{},
        success: function (data) {
            new_seq=data[0].seq_no;
            new_seq_no = parseInt(new_seq);
            debugger;
        },
        error: function (data) {
            alert("系统错误2");
        }
    });
    $("#save_group") .on("click",function (){
        debugger;
        new_seq_val = new_seq_no+1;
        new_seq_push = val_str.push(new_seq_val);
        $("#slc_group").append('<option value="'+new_seq_val+'" selected = "selected">'+$p_id.find('#groupName').val()+'</option>')
        debugger;
        $("option[name='opAddGroup']").hide();
        debugger;
        $("#slc_group").append('<option value="9999" name="opAddGroup">添加组</option>')
        $p_id.find("#addGroup").modal('hide');
    });
});





