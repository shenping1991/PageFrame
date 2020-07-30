/*!
 * dsm v5.0 (http://www.huatusoft.com)
 * Copyright 2017 vamtoo
 * By vamtoo.yanhaojian dsm日志搜索
 */
$(function(){
	/*dsm日志搜索*/
	document.getElementById("search").onkeydown = keyDownSearch;
    function keyDownSearch(e) {
        
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            var id = $(".simulate-select.simulate-select-hover").attr("data-sim-obj");
            if (id!=null) {
                $("#" + id).find(".subfiter").click();
            }
        }
        return true;
    }
    //checkbox
    $(".checkb.fiterpara").click(function () {
        var objs = $(this).parent().find(".fiterpara");
        for (var i = 0; i < objs.length; i++) {
            var paradesc = objs[i].attributes["data-selected-desc"].nodeValue;
            var request = objs[i].attributes["data-request"].nodeValue;
            var paraval = objs[i].value;
            var showtext = $(this).parent().find("label").text();
            if (!$(objs).is(':checked')) {
                $('.J_remove[data-type="rolecheck-' + paraval + '-' + request + '"]').click();
            }
            else
            {
                
                $(".filter-selected-list").append('<dd><span class="filter-selected" data-value="' + paraval + '" data-para="' + request + '">' + paradesc +'<span class="fiter-value">'+ showtext + '</span><em class="remove J_remove" data-type="rolecheck-'+paraval+'-'+request+'"></em></span></dd>')

            }

        }
        $(".simulate-select").removeClass("simulate-select-hover");
        $(".simulate-list").addClass("ks-overlay-hidden");
        $(".J_remove").click(function () {
            removeFiter(this);
        });
        filter();

    });

    //普通输入框
    $(".subfiter").click(function () {
        var objs = $(this).parent().find(".fiterpara");

        if ($(objs[0]).hasClass("Wdate")) {

            var paradesc = objs[0].attributes["data-selected-desc"].nodeValue;
            var request = objs[0].attributes["data-request"].nodeValue;
            var paraval = objs[0].value;
            if (paraval == "") {
                paraval = '1990-01-01'
            }
            var paraval1 = objs[1].value;
            if (paraval1 == "") {
                paraval1 = '2098-01-01'
            }
            var _time = new Date(getDateDay(paraval)).pattern("yyyy-MM-dd");
            var _time1 = new Date(getDateDay(paraval1)).pattern("yyyy-MM-dd");
            if (_time > _time1) {
                alert("起始日期不得大于截止日期");
                return false;
            }
            $(".filter-selected-list").append('<dd><span class="filter-selected" data-value="' + paraval + '_' + paraval1 + '" data-para="' + request + '">' + paradesc +'<span class="fiter-value">'+paraval + '至' + paraval1 + '</span><em class="remove J_remove"></em></span></dd>')

        }
        else {
            for (var i = 0; i < objs.length; i++) {
                if (objs[i].tagName == "INPUT") {
                    var paradesc = objs[i].attributes["data-selected-desc"].nodeValue;
                    var request = objs[i].attributes["data-request"].nodeValue;
                    var paraval = objs[i].value;
                    $(".filter-selected-list").append('<dd><span class="filter-selected" data-value="' + paraval + '" data-para="' + request + '">' + paradesc +'<span class="fiter-value">'+ paraval + '</span><em class="remove J_remove"></em></span></dd>')
                }

            }
        }
        $(".simulate-select").removeClass("simulate-select-hover");
        $(".simulate-list").addClass("ks-overlay-hidden");
        $(".J_remove").click(function () {
            removeFiter(this);
        });
        filter();

    });
    $(".adddeptbtn").click(function () {
        var id = tree.getSelectedItemId();
        var depttext = tree.getSelectedItemText();
        var zidept = 0;
        if ($("#zidept").attr("checked") == true) {
            zidept = 1;
            depttext += "（包含子部门）";
        }
        $(".filter-selected-list").append('<dd><span class="filter-selected" data-value="' + id + '" data-para="deptid">所属部门:' +'<span class="fiter-value">'+ depttext + '</span><em class="remove J_remove"  data-dept-val="' + id + '"></em></span></dd>');
        $(".filter-selected-list").append('<dd data-dept-val="' + id + '" style="display:none;color:#ffffff;"><span class="filter-selected" data-value="' + zidept + '" data-para="zidept"><em class="remove J_remove"></em></span></dd>');

        $("#txt_Dept").val(id);
        $(".J_remove").click(function () {
            removeFiter(this);
        });
        $(".simulate-select").removeClass("simulate-select-hover");
        $(".simulate-list").addClass("ks-overlay-hidden");
        filter();


    });
    $(".J_remove").click(function () {
        removeFiter(this);
    });
	/*dsm日志搜索结束*/
});
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份                                                                                                                                                                                                                         
        "d+": this.getDate(), //日                                                                                                                                                                                                                              
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时                                                                                                                                                                                         
        "H+": this.getHours(), //小时                                                                                                                                                                                                                           
        "m+": this.getMinutes(), //分                                                                                                                                                                                                                           
        "s+": this.getSeconds(), //秒                                                                                                                                                                                                                           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度                                                                                                                                                                                                         
        "S": this.getMilliseconds() //毫秒                                                                                                                                                                                                                      
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
function getDateDay(_t) {
    var oDate = new Date(Date.parse(_t.replace(/-/g, "/")));
    var nMonth = oDate.getMonth() + 1;
    return oDate.getFullYear() + "/" + nMonth + "/" + oDate.getDate();
}
function removeFiter(obj) {
    
    if ($(obj).attr("data-dept-val") != null && $(obj).attr("data-dept-val") != null) {
        $(obj).parent().parent().next().remove();
    }
    else if ($(obj).attr("data-type") != null) {
        
        var typevale = $(obj).attr("data-type").split('-');
        if ($("input[name='" + typevale[2] + "'][value='" + typevale[1] + "']")!=null) {
            $("input[name='" + typevale[2] + "'][value='" + typevale[1] + "']").attr("checked", false);
        }
    } 
    $(obj).parent().parent().remove();
    filter();
}
var openobj;
$(".simulate-select").click(function () {
    var objid = $(this).attr("data-sim-obj");
    if (objid != openobj) {
        $(".simulate-select").removeClass('simulate-select-hover');
        $(".simulate-list").addClass("ks-overlay-hidden");
        $(this).addClass('simulate-select-hover')
        $("#" + objid).removeClass("ks-overlay-hidden");
        var offsetTop=$(this).position().top+27;
        var offsetLeft=$(this).position().left;

        $("#" + objid).css("top",offsetTop+"px");
        $("#" + objid).css("left",offsetLeft+"px");
    }
    else {
        openobj = objid;

        $(this).addClass("simulate-select-hover");
        $("#" + objid).removeClass("ks-overlay-hidden");
    }
});
$(document).bind('click', function () {
    $(".simulate-select").removeClass("simulate-select-hover");
    $(".simulate-list").addClass("ks-overlay-hidden");
});
$(".js_clearall").bind('click', function () {
	var allnode=$('.filter-selected').parent();
	$(allnode).remove();
	filter();
});
function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}
$(".simulate-list").bind('click', function (e) {
    stopPropagation(e);
});
$(".simulate-select").bind('click', function (e) {
    stopPropagation(e);
});
/*dsm日志搜索结束*/