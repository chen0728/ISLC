/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */
$(function () {
    var $p_id = $("#course_add_page");
    seq_no = $p_id.find("#seq_no").val()
    //查询详情 并自动填充
    $.ajax({
        type: "get",
        url: "/course_info/get?seq_no="+seq_no,
        dataType: "json",
        data: {},
        success: function (data) {
            $p_id.find("#class_name").val(data[0].name);
            $p_id.find("#take_lass").val(data[0].class);
            $p_id.find("#class_Time").val(data[0].class_time);
            var seq_data = data[0].related_data.split(";");
            debugger
            //$p_id.find("#data_tbody").empty();
            debugger;
            for(var i=0;i<seq_data.length-1;i++){
                seq_nol=seq_data[i+1];
                debugger;
                $.ajax({
                    type: "get",
                    url: "/course_info/getl?seq_nol="+seq_nol,
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        $p_id.find("#data_tbody").append('<div class="form-control w-32" style="width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].name+'</div>')
                        debugger;
                    },
                    error: function (data) {
                        alert("系统错误");
                    }
                });
        }
            debugger;
        },
        error: function (data) {
            alert("系统错误");
        }
    });

});










