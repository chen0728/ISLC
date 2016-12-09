/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var data_url;
    var new_seq;
    var new_seq_no;
    var new_num;
    var new_numb;
    var new_number;
    var $p_id = $("#personal_information_page");

    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });

    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });
    var account_id  = $('#login_account_id').val();
    debugger;
    function init() {
        debugger;
        var params = { // 查询查询参数
            name: $p_id.find('#name').val(),
            number: $p_id.find('#number').val(),
            data_type: $p_id.find('#data_type').val(),
            account_id: $p_id.find('#account_id').val(),
            up_timeS: $p_id.find('#up_timeS').val(),
            up_timeE: $p_id.find('#up_timeE').val(),
        };
        var table_src = $('#personal_Table'); // 定义指向
        var ajax_url = '/personal/list?account_id='+account_id; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "name"},
            {"col_id": "number"},
            {"col_id": "data_type"},
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
                if(full.data_type == 1){
                    return '<td><div class="text-center">文档</div></td>';
                }else if(full.data_type == 2){
                    return '<td><div class="text-center">音频</div></td>';
                }else{
                    return '<td><div class="text-center">视屏</div></td>';
                }

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
                var retHtml = '';
                if (full.seq_no) {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">编辑</a></li>' +
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>' +
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
        debugger;
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

    // 动态绑定编辑事件
    $(document).on("click", ".employee_edit", function () {
        debugger;
        seq_no = $(this).attr('data-id');
        //查询详情 并自动填充
        $.ajax({
            type: "get",
            url: "/personal/get?seq_no="+seq_no,
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                //$p_id.find("#type_detail").val(data[0].data_type);
                $p_id.find("#name_detail").val(data[0].name);

            },
            error: function (data) {
                alert("系统错误");
            }
        });
        //填充标题
        $("#areaLab").html('资料详情');
        // 显示成功对话框
        $("#detail").modal('show');
        //保存
        //$('#save_map').on('click', function () {
        //    var data = {
        //        key_id:$p_id.find("#keyLab").val(),
        //        key_val_cn:$p_id.find("#nameLab").val(),
        //    };
        //    debugger;
        //    $.ajax({
        //        type: "post",
        //        url: '/value_mapping/update?num1='+num1,
        //        dataType: "json",
        //        data: data,
        //        success: function (data) {
        //            debugger;
        //            alert("提交成功！");
        //            window.location.reload();
        //        },
        //        error: function (data) {
        //            alert("系统错误");
        //        }
        //    })
        //});
    });
    //删除
    $(document).on("click", ".employee_del", function () {
        seq_no = $(this).attr('data-id');
        $("#delMapModal").modal('show');
        debugger;
    });
    $('#del_infor').on('click', function () {
        debugger
        $.ajax({
            type: "post",
            url: '/personal/del?seq_no='+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                debugger;
                alert("删除成功！");
                window.location.reload();
            },
            error: function (data) {
                alert("系统错误");
            }
        })
    });
    //添加字典弹窗
    $('#addData').on('click', function () {
        debugger;
        $("#areaLab").html('添加资料');
        $('#detail').modal('show');
        debugger;
        $.ajax({
            type: "get",
            url: '/personal/select',
            dataType: "json",
            data:{},
            success: function (data) {
                debugger;
                new_seq=data[0].seq_no;
                new_seq_no = parseInt(new_seq);
                new_num=data[0].number;
                new_numb=new_num.substring(1,new_num.length);
                new_number = parseInt(new_numb);
            },
            error: function (data) {
                debugger;
                alert("系统错误");
            }
        });
        $('#save_map').on('click', function () {
            debugger;
            var radio1 = document.getElementById('radio1');
            var radio2 = document.getElementById('radio2');
            if(radio1.checked == true){
                pub = 2;
            }
            debugger;
            if(radio2.checked == true){
                pub = 1;
            }
            var A = A;
            var data = {
                seq_no:new_seq_no+1,
                public:pub,
                data_type: $p_id.find('#type_detail').val(),
                name: $p_id.find('#name_detail').val(),
                data_url:data_url,
                account_id:$('#login_account_id').val(),
                status:1,
            };
            debugger;
            $.ajax({
                type: "post",
                url: '/personal/insert',
                dataType: "json",
                data: data,
                success: function (data) {
                    debugger;
                    alert("提交成功！");
                    window.location.reload();
                },
                error: function (data) {
                    debugger;
                    alert("系统错误1");
                }
            })
        });
    });
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

})





