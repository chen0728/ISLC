/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var num1;
    var new_num;
    var $p_id = $("#class_media_page");
    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });

    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });

    function init() {
        var params = { // 查询查询参数
            //name: $p_id.find('#nameIn').val(),
        };
        var table_src = $('#media_Table'); // 定义指向
        var ajax_url = '/course_manage/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "name"},
            {"col_id": "number"},
            {"col_id": "class"},
            {"col_id": "number"},
            {"col_id": "name"},
            {"col_id": "class_time"},
        ]; // 定义表格数据列id
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
        }, {
            "colIndex": 3,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 4,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 5,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 6,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.seq_no) {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="media_player?seq_no='+full.seq_no+'" target="_blank" data-title="资料查看" data-toggle="modal">打开</a></li>' +
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">下载</a></li>' +
                        '</ul>' +
                        '</div>';
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
        //var dataAdd = 0;
        //var join =[];
        //for(var i=0;i<data.data.length;i++){
        //    var seq_data = data.data[i].related_data.split(";");
        //    for(var j=0;j<seq_data.length;j++){
        //        $.ajax({
        //            type: "get",
        //            url: "/course_info/getl?seq_no="+seq_data[j],
        //            dataType: "json",
        //            async: false,
        //            data: {},
        //            success: function (dataOut) {
        //                debugger;
        //                dataAdd++;
        //                 join.push({
        //                     data_seq_no:dataOut[0].seq_no,
        //                     data_number:dataOut[0].number,
        //                     data_name:dataOut[0].name,
        //                     data_type:dataOut[0].data_type,
        //                     number:data.data[i].number,
        //                     name:data.data[i].name,
        //                     class_time:data.data[i].class_time
        //                 })
        //            },
        //            error: function (data) {
        //                alert("系统错误");
        //            }
        //        });
        //    }
        //}
        //data = {
        //    data:join,
        //    draw:Math.ceil(dataAdd/10),
        //    recordsFiltered:dataAdd,
        //    recordsTotal:dataAdd,
        //}
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }
    init();


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





