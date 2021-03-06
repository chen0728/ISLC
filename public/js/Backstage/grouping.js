/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var new_seq;
    var new_seq_push;
    var seq_no;
    var seq_no_name;
    var in_group = [];
    var out_group = [];
    var remarksB;
    var remarksN;

    var $p_id = $("#grouping_page");
    //填充班级下拉菜单
    var account_id = $('#login_account_id').val();
    $.ajax({
        type: "get",
        url: '/grouping/select?account_id='+account_id,
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
            alert("系统错误");
        }
    });
    // 查询组下拉框
    $p_id.find('#slc_class').on("change",function (){
        $("#slc_group").empty();
        $("#inGroup").empty();
        $("#scene").val('');
        seq_no_name = ''
        in_group = []
        out_group = [];
        seq_no = $p_id.find('#slc_class').val();
        $.ajax({
            type: "post",
            url: '/grouping/group?seq_no='+seq_no+'&account_id='+account_id,
            dataType: "json",
            data:{},
            success: function (data) {
                debugger;
                for(var i=0;i<data.length;i++){
                    $("#slc_group").append('<option value="'+data[i].seq_no+'">'+data[i].group+'</option>')
                }
                if($("#slc_class").val() != 9999){
                    $("#slc_group").append('<option id="newGroup" value="9999" name="opAddGroup" style="color: #54BB80;">添加组</option>')
                }
                debugger;
                if(data.length>0){
                    seq_no_name = data[0].student;
                    remarksB = data[0].remarks;
                    $p_id.find('#scene').val(data[0].remarks);
                }
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
                            in_group.push(data[i].seq_no);
                        }
                    },
                    error: function (data) {
                        alert("系统错误");
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
            url: '/grouping/groupOut?seq_no='+seq_no+'&account_id='+account_id,
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
        //var Sin = in_group.indexOf(seq_name);
        //if(Sin != -1){
        //    in_group.splice(Sin,1)
        //};
        for(var i=0;i<in_group.length;i++){
            if(in_group[i] == seq_name){in_group.splice(i,1)};
        }
    });

    // 动态绑定添加组员事件
    $(document).on("click", ".name_int", function () {
        var seq_name_in = $(this).attr('data_id');
        var name_in = $(this).attr('name');
        $('[name='+name_in+']').remove();
        $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+seq_name_in+'" name="'+name_in+
            '">'+name_in+'</a><br name="'+name_in+'">');
        in_group.push(seq_name_in);
        //var Sout = out_group.indexOf(seq_name_in);
        //if(Sout != -1){
        //    out_group.splice(Sout,1)
        //};
        for(var i=0;i<out_group.length;i++){
            if(out_group[i] == seq_name_in){out_group.splice(i,1)};
        }
    });
    //添加组
    $p_id.find('#slc_group').on("click",function (){
        debugger;
        if($("#slc_group").val() == 9999){$p_id.find("#addGroup").modal('show');}
    });
    //动态绑定组下拉菜单change事件
    $p_id.find('#slc_group').on("change",function (){
        in_group = [];
        out_group = [];
        seq_no_name = '';
        if($("#slc_group").val() == 9999){
            $p_id.find("#addGroup").modal('show');
        }else{
            $("#inGroup").empty();
            $.ajax({
                type: "post",
                url: '/grouping/remarks?seq_no='+$("#slc_group").val(),
                dataType: "json",
                async: false,
                data:{},
                success: function (data) {
                    debugger;
                    if(data.length>0){
                        seq_no_name = data[0].student;
                        remarksB = data[0].remarks;
                        $p_id.find('#scene').val(data[0].remarks);
                    }
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
            $.ajax({
                type: "post",
                url: '/grouping/name?seq_no_name='+seq_no_name,
                dataType: "json",
                data:{},
                success: function (data) {
                    debugger;
                    for(var i=0;i<data.length;i++){
                        $("#inGroup").append('<a class="name_out" href="javascript:void(0)" style="cursor:pointer" data_id="'+data[i].seq_no+'" name="'+data[i].name+'" >'+data[i].name+'</a><br name="'+data[i].name+'">')
                        in_group.push(data[i].seq_no);
                    }
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
            //查询未分组学生
            $("#outGroup").empty();
            $.ajax({
                type: "post",
                url: '/grouping/groupOut?seq_no='+seq_no+'&account_id='+account_id,
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
        }
    });
    //取消添加组后重新添加组
    $("button[name='close']") .on("click",function (){
        $("#slc_group").empty();
        $("#inGroup").empty();
        seq_no_name = '';
        out_group = [];
        seq_no = $p_id.find('#slc_class').val();
        $.ajax({
            type: "post",
            url: '/grouping/group?seq_no='+seq_no+'&account_id='+account_id,
            dataType: "json",
            data:{},
            success: function (data) {
                debugger;
                for(var i=0;i<data.length;i++){
                    $("#slc_group").append('<option value="'+data[i].seq_no+'">'+data[i].group+'</option>')
                }
                if($("#slc_class").val() != 9999){
                    $("#slc_group").append('<option id="newGroup" value="9999" name="opAddGroup" style="color: #54BB80;">添加组</option>')
                }
                debugger;
                if(data.length>0){
                    seq_no_name = data[0].student;
                    remarksB = data[0].remarks;
                    $p_id.find('#scene').val(data[0].remarks);
                }
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
                        alert("系统错误");
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
            url: '/grouping/groupOut?seq_no='+seq_no+'&account_id='+account_id,
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

    //确定新建组
    $("#save_group") .on("click",function (){
        $("option[name='opAddGroup']").hide();
        $p_id.find("#addGroup").modal('hide');
        out_group = [];
        $("#inGroup").empty();
        var data = {
            class:$p_id.find('#slc_class').val(),
            group:$p_id.find('#groupName').val(),
            account_id:account_id,
            status:1,
        };
        debugger;
        $.ajax({
            type: "post",
            url: '/grouping/new',
            dataType: "json",
            data: data,
            success: function (data) {
                debugger;
                $("#slc_group").append('<option value="'+data.data[0]+'" selected = "selected">'+$p_id.find('#groupName').val()+'</option>'+
                    '<option id="newGroup" value="9999" name="opAddGroup" style="color: #54BB80;">添加组</option>')
                $("#scene").val('');
                alert("提交成功！");
            },
            error: function (data) {
                alert("系统错误");
            }
        });
        //查询未分组学生
        $("#outGroup").empty();
        $.ajax({
            type: "post",
            url: '/grouping/groupOut?seq_no='+seq_no+'&account_id='+account_id,
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
    //删除组
    $("#delGroup") .on("click",function (){
        if($("#slc_group").val()){
            $p_id.find("#SureDelGroup").modal('show');
            $("#sureDel") .on("click",function (){
                $.ajax({
                    type: "post",
                    url: '/grouping/delGroup?seq_no='+$p_id.find('#slc_group').val(),
                    dataType: "json",
                    data:{},
                    success: function (data) {
                        alert("删除成功");
                        window.location.reload();
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                })
            });
        }else{
            alert("请选择班级及需要删除的组！");
        };
    });
    //重置
    $("#reset") .on("click",function (){
        window.location.reload();
    });
    //确定
    $("#saveGroup") .on("click",function (){
        if(in_group.length == 0 && out_group.length == 0 && remarksB == $p_id.find('#scene').val()){
            alert("您未做任何分组操作！");
        }else{
            var obj = {
                seq_no:$p_id.find('#slc_group').val(),
                in_group:in_group.join(','),
                remarks:$p_id.find('#scene').val()
            };
            debugger;
            $.ajax({
                type: "get",
                url: '/grouping/save',
                async: false,
                dataType: "json",
                data:obj,
                success: function (data) {
                    in_group = [];
                    out_group = [];
                    alert("保存成功");
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        };
    });
});





