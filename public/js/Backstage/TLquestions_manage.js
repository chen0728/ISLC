/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var num1;
    var new_num;
    var $p_id = $("#TLquestions_manage_page");
    $(document).ready(function(){
        $(".timu").mouseenter(function(){
            $(this).css("border","2px solid #E9E9E4");
            $(this).find(".close").css("display","inherit");
        });
        $(".timu").mouseleave(function(){
            $(this).css("border","2px solid #FFF");
            $(this).find(".close").css("display","none");
        });
    });


});





