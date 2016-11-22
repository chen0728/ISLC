/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var new_seq;
    var new_seq_no;
    var new_seq_val;
    var new_seq_push;
    var val_str;
    var name_str;
    var seq_no_name;
    var num_in;
    var in_group;
    var num_out;
    var out_group;

    var $p_id = $("#grouping_page");
    //填充班级下拉菜单
    seq_no = $('#login_account_id').val();
    $.ajax({
        type: "post",
        url: '/grouping/class?seq_no='+seq_no,
        dataType: "json",
        data:{},
        success: function (data) {
            var clas_seq = data[0].class.split(";");
            debugger;
            for(var i=0;i<clas_seq.length;i++){
                var seq_noName = clas_seq[i+1];
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
        $("#slc_group").empty();
        $("#inGroup").empty();

        in_group = [];
        out_group = [];
        debugger;
        var seq_no = $p_id.find('#slc_class').val();
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
                    $("#slc_group").append('<option value="9999" name="opAddGroup" style="color: #54BB80;">添加组</option>')
                }
                seq_no_name = data[0].seq_no;
                //查询组内
                $.ajax({
                    type: "post",
                    url: '/grouping/name?seq_no_name='+seq_no_name,
                    dataType: "json",
                    data:{},
                    success: function (data) {
                        for(var i=0;i<data.length;i++){
                            $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+data[i].seq_no+
                                '" name="'+data[i].name+'" >'+data[i].name+'</a><br name="'+data[i].name+'">')
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
        //查询未分组学生
        $("#outGroup").empty();
        $.ajax({
            type: "post",
            url: '/grouping/groupOut?seq_no='+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    $("#outGroup").append('<a class="name_int" href="javascript:void(0)" style="cursor:pointer" data_id="'+data[i].seq_no+
                        '" name="'+data[i].name+'" >'+data[i].name+'</a><br name="'+data[i].name+'">')
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });

    // 动态绑定去除组内事件
    $(document).on("click", ".name_out", function () {
        var seq_name = $(this).attr('data_id');
        var name = $(this).attr('name');
        $('[name='+name+']').remove();
        $("#outGroup").append('<a class="name_int" href="javascript:void(0)" style="cursor:pointer" data_id="'+seq_name+'" name="'+name+
            '">'+name+'</a><br name="'+name+'">');
        out_group.push(seq_name);
        debugger;
    });

    // 动态绑定添加组员事件
    $(document).on("click", ".name_int", function () {
        debugger;
        var seq_name_in = $(this).attr('data_id');
        var name_in = $(this).attr('name');
        $('[name='+name_in+']').remove();
        $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+seq_name_in+'" name="'+name_in+
            '">'+name_in+'</a><br name="'+name_in+'">');
        in_group.push(seq_name_in);
        debugger;
    });

//动态绑定组下拉菜单change事件
    $p_id.find('#slc_group').on("change",function (){
        in_group = [];
        out_group = [];
        debugger;
        if($("#slc_group").val() == 9999){
            $p_id.find("#addGroup").modal('show');
        }else{
            $("#inGroup").empty();
            seq_no_name = $("#slc_group").val();
            $.ajax({
                type: "post",
                url: '/grouping/name?seq_no_name='+seq_no_name,
                dataType: "json",
                data:{},
                success: function (data) {
                    for(var i=0;i<data.length;i++){
                        $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+data[i].seq_no+'" name="'+data[i].name+'" >'+data[i].name+'</a><br name="'+data[i].name+'">')
                    }
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        }
    });
    //取消添加组后重新添加组
    $("button[name='close']") .on("click",function (){
        $("#slc_group").empty();
        $("#inGroup").empty();
        in_group = [];
        out_group = [];
        debugger;
        var seq_no = $p_id.find('#slc_class').val();
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
                    $("#slc_group").append('<option value="9999" name="opAddGroup" style="color: #54BB80;">添加组</option>')
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        });
    });
    //查询组seq_no
    $.ajax({
        type: "get",
        url: '/grouping/group_seq',
        async: false,
        dataType: "json",
        data:{},
        success: function (data) {
            new_seq=data[0].seq_no;
            new_seq_no = parseInt(new_seq);
        },
        error: function (data) {
            alert("系统错误");
        }
    });
    //确定新建组
    $("#save_group") .on("click",function (){
        new_seq_val = new_seq_no+1;
        new_seq_push = val_str.push(new_seq_val);
        seq_no_name = new_seq_val;
        $("#slc_group").append('<option value="'+new_seq_val+'" selected = "selected">'+$p_id.find('#groupName').val()+'</option>')
        $("option[name='opAddGroup']").hide();
        in_group = [];
        out_group = [];
        debugger;
        $("#slc_group").append('<option value="9999" name="opAddGroup" style="color: #54BB80;">添加组</option>')
        $p_id.find("#addGroup").modal('hide');
    });
    //确定
    $("#saveGroup") .on("click",function (){
        if(in_group.length == 0 && out_group.length == 0){
            alert("您未做任何分组操作！");
        }else{
            debugger;
            var obj = {
                seq_no_name:seq_no_name,
                in_group:in_group,
                out_group:out_group
            };
            $.ajax({
                type: "get",
                url: '/grouping/save',
                async: false,
                dataType: "json",
                data:obj,
                success: function (data) {
                    in_group = [];
                    out_group = [];
                    debugger;
                    alert("保存成功");
                },
                error: function (data) {
                    alert("系统错误2");
                }
            });
        };
    });
});





