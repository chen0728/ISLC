/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var $p_id = $("#class_audio_page");
    var part = $("#menu_id").val();
    debugger;
    //根据账号角色得ajax请求
    if(part.indexOf("5")> -1){
        var ajax_url_ = '/class_audio/list'//教师
    }else if(part.indexOf("6")> -1){
        var ajax_url_ = '/class_audio/media'//学生
    }else{
        var ajax_url_ = '/class_audio/other'//其他
    }
    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });
    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });

    function init() {
        debugger;
        var params = { // 查询查询参数
            account_id:$("#login_account_id").val(),//账号
            number: $p_id.find('#audio_number').val(), // 编号
            name: $p_id.find('#class_name').val(), // 课程名
            up_timeS: $p_id.find('#search_s').val(), // 时间起
            up_timeE: $p_id.find('#search_e').val(), // 时间止
        };
        var table_src = $('#audio_Table'); // 定义指向
        var ajax_url = ajax_url_; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "number"},
            {"col_id": "name"},
            {"col_id": "up_time"},
        ]; // 定义表格数据列id
        debugger;
        var aoColumnDefs = [{
            "colIndex": 0,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 1,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 2,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 3,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.seq_no) {
                    if (full.seq_no) {
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a class="employee_edit" href="javascript:void(0)" id="dropLabel-2" data-id="'+full.seq_no+'">详情</a>' +
                            '</div>';
                    }
                }
                return retHtml;
            }

        }]; // 定义需要改变的列

        // 列表为空时的数据
        var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';
        // 绘画表格
        TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
    };
    //搜索后列表重构
    $("#employeeSeatchBut").on('click',function(){
        init();
    });
    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        debugger;
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }
    init();

    // 动态绑定编辑事件
    $(document).on("click",".employee_edit", function () {
        debugger;
        //查询详情 并自动填充
        $.ajax({
            type: "get",
            url: "/course_info/get?seq_no="+$(this).attr('data-id'),
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                $p_id.find("#audioAreaLab").html(data[0].name);
                $p_id.find("#dudio").html('<audio src="/upload/'+data[0].class_audio+'" style="margin: -18px 0px -8px 37px;width: 477px;" controls="controls">您的浏览器不支持audio标签，请使用更新版本的浏览器。</audio>');
                //$p_id.find("#class").html('<audio src="/upload/'+data[0].class_audio+'" style="margin-top: -6px;" controls="controls">您的浏览器不支持audio标签，请使用更新版本的浏览器。</audio>');
            },
            error: function (data) {
                alert("系统错误");
            }
        });
        //填充标题
        //$("#areaLab").html('资料详情');
        // 显示成功对话框
        debugger;
        $("#showAudioModal").modal('show');
    });
    //关闭
    $p_id.find("#play_audio_cancel").on("click",function(){
        $p_id.find("#dudio").html('');
    });
    $(".close").on('click',function(){
        $p_id.find("#dudio").html('');
    });

    $("select").select2({
        minimumResultsForSearch: Infinity   //隐藏下拉列表搜索框。Infinity可以数字替换，下拉列表项的最少条目数等于该数字时出现搜索框。
    }); // 美化下拉列表

    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

})





