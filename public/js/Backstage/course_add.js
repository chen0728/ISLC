/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */
$(function () {
    var tempObj;
    var tempEmpObj;
    var num1;
    var new_num;
    var seq_data;
    var seq_no_chec;
    var seq_no_arr = new Array();
    var $p_id = $("#course_add_page");
    seq_no = $p_id.find("#seq_no").val()
    //查询详情 并自动填充
    $.ajax({
        type: "get",
        url: "/course_info/get?seq_no="+seq_no,
        dataType: "json",
        data: {},
        success: function (data) {
            init();
            $p_id.find("#class_name_").val(data[0].name);
            $p_id.find("#take_lass_").val(data[0].class);
            $p_id.find("#class_Time_").val(data[0].class_time);
            $p_id.find("#data_no").val(data[0].related_data);
            seq_data = data[0].related_data.split(";");
            //$p_id.find("#data_tbody").empty();
            for(var i=0;i<seq_data.length-1;i++){
                seq_nol=seq_data[i+1];
                $.ajax({
                    type: "get",
                    url: "/course_info/getl?seq_nol="+seq_nol,
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        $p_id.find("#data_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].name+
                            '<button type="button" class="close closefirst" data-dismiss="alert" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                        $(document).ready(function(){
                            $(".guanlian").mouseenter(function(){
                                $(this).find(".close").css("display","inherit");
                            });
                            $(".guanlian").mouseleave(function(){
                                $(this).find(".close").css("display","none");
                            });
                            $(".close").on('click',function(){
                                $(this).parent().remove();
                            });
                        });
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

    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });

    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });
//弹出框列表查询
    function init() {
        var params = { // 查询查询参数
            name: $p_id.find('#nameIn_').val(),
            up_timeS: $p_id.find('#search_s_').val(),
            up_timeE: $p_id.find('#search_e_').val(),
        };
        var table_src = $('#course_add_Table'); // 定义指向
        var ajax_url = '/course_add/list'; // 定义数据请求路径
        var pageSize = 5 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "name"},
            {"col_id": "number"},
            {"col_id": "up_time"},
        ]; // 定义表格数据列id
        var aoColumnDefs = [{
            "colIndex": 0,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center" style="padding: 0px 5px;">' + data + '</div></td>';
            }
        }, {
            "colIndex": 1,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center" style="padding: 0px 5px;">' + data + '</div></td>';
            }
        }, {
            "colIndex": 2,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center" style="padding: 0px 5px;">' + data + '</div></td>';
            }
        }, {
            "colIndex": 3,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.seq_no) {
                    retHtml = retHtml + "<td><div class='text-center' style='padding: 0px 5px;' data-id='"+full.seq_no+"'><input id='"+full.seq_no+"' name='related_data_qwe' type='checkbox' value='"+full.seq_no+"' class='add_zl' data-value='"+info+"'></div></td>";
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
    $("#SeatchBut").on('click',function(){
        init();

    });
    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        //勾选添加
        $p_id.find(".add_zl").on('click',function(){
            var seq_no = $(this).attr('value');
            seq_no_chec = $(this).attr('checked');
            if(seq_no_chec && seq_no_chec == 'checked'){
                var  abc = seq_no_arr.push(seq_no);
            }else{
                for(var i=0; i<seq_no_arr.length; i++)
                {
                    if(seq_no_arr[i] == seq_no)
                    {
                        seq_no_arr.splice(i,1);//删除方法
                        break;
                    }
                }
            }
        });
        //$p_id.find(".add_zl").on('click',function(){
        //    //var info = $(this).attr("data-value");
        //    //info = JSON.parse(info);
        //    //$p_id.find("#data_no").val($p_id.find("#data_no").val()+';'+info.seq_no);
        //    //$p_id.find("#data_tbody").append('<div class="form-control w-32" style="width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +info.name+'</div>');
        //    //$p_id.find(".close").trigger("click");
        //});

        return data;
    }
    init();




    //$p_id.find("#save_data").on('click',function(){
    //    $p_id.find("#data_tbody_").append('<div class="form-control w-32" style="width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].name+'</div>');
    //});

    $("select").select2({
        minimumResultsForSearch: Infinity   //隐藏下拉列表搜索框。Infinity可以数字替换，下拉列表项的最少条目数等于该数字时出现搜索框。
    });
//添加资料弹窗
    $p_id.find("#addData").on('click',function(){
        $p_id.find("#addDataModal").modal('show');
    });
    //弹窗确定
    $p_id.find("#new_data").on('click',function(){
        for(var i=0;i<seq_no_arr.length;i++){
            seq_nol=seq_no_arr[i];
            $.ajax({
                type: "get",
                url: "/course_info/getl?seq_nol="+seq_nol,
                dataType: "json",
                data: {},
                success: function (data) {
                    $p_id.find("#data_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].name+
                        '<button type="button" class="close closefirst" data-dismiss="alert" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                    $(document).ready(function(){
                        $(".guanlian").mouseenter(function(){
                            $(this).find(".close").css("display","inherit");
                        });
                        $(".guanlian").mouseleave(function(){
                            $(this).find(".close").css("display","none");
                        });
                        $(".close").on('click',function(){
                            $(this).parent().remove();
                        });
                    });
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        }
        var new_data = ';'+seq_no_arr.join(";")
        $p_id.find("#data_no").val($p_id.find("#data_no").val()+new_data);
        $p_id.find("#addDataModal").modal('hide');
    });

    $(document).ready(function(){
        $(".guanlian").mouseenter(function(){
            $(this).find(".close").css("display","inherit");
        });
        $(".guanlian").mouseleave(function(){
            $(this).find(".close").css("display","none");
        });
        $(".close").on('click',function(){
            $(this).parent().remove();
        });
    });

});










