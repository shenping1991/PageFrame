/*!
 * dsm v5.0 (http://www.huatusoft.com)
 * Copyright 2017 vamtoo
 * By vamtoo.yanhaojian
 */
layer.config({
    resize: false,
    isOutAnim: false,
    scrollbar: false,
    shade:0.1

});
var dsmDialog = {
    open: function(layerobj) {
        layer.open(layerobj);
    },
    toComfirm:function(title,obj,funyes,funcancel){

        layer.confirm(title,obj,funyes,funcancel);
    },

    msg:function(title){
        layer.msg(title, {
            skin: 'layui-layer-hui',
            time: 2000,
            area: ['260px','90px'],
            icon: 10,
            content:"<div class='sucTip-content'><span class='alert-txt sucTip-txt'>"+title+"</span></div> "
        });
    },

    // error:function(title){
    //     layer.msg(title, {
    //         skin: 'layui-layer-hui',
    //         time: 0,
    //         icon: 2,
    //
    //
    //     });
    // },
    error:function(content){
        layer.alert(content, {
            skin: 'layui-layer-hui',
            time: 0,
            area: ['260px'],
            icon: 11,
            title:false,
            shade: 0,
            btn:false,
            content:"<div class='failTip-content'><span class='alert-txt failTip-txt'>错误</span><p class='alert-con-notice'>"+content+"</p></div> "
        });
    },
    close:function(index){
        layer.close(index);
    }

}

$(function(){

    $('.dsm-select').selectpicker({});

    $("[data-toggle='popover']").popover();
    $('[data-toggle="tooltip"]').tooltip();
    $(document).on('click', '[data-ride="collapse"] a', function (e) {
        var $this = $(e.target), $active;
        $this.is('a') || ($this = $this.closest('a'));
        $active = $this.parent().siblings( ".active" );
        $active && $active.toggleClass('active').find('> ul:visible').slideUp(10);
        ($this.parent().hasClass('active') && $this.next().slideUp(10)) || $this.next().slideDown(10);
        $this.parent().toggleClass('active');
        $this.next().is('ul') && e.preventDefault();

    });
    $(document).on('click', '.js_closeBtn', function (e) {
        $(".dsm-admin").toggleClass("closed");
        if($(".dsm-admin").hasClass("closed")){
            $(".navbar>.nav").attr("data-ride","");
        }else{
            $(".navbar>.nav").attr("data-ride","collapse");
            //菜单处理
            // $('.menu>li>a.cur').click(function () {
            //     var show = !$(this).hasClass('on');
            //     var tr = $('.menu>li>a.cur.on');
            //     var sr = $('.menu .subnav a.cur.on');
            //     if (/^#?$/.test($(this).attr('href'))) {
            //         tr.removeClass('on').next('.subnav').hide();
            //         if (show) $(this).addClass('on').next('.subnav').fadeIn(200);
            //         return false;
            //     }
            //     tr.removeClass('on').next('.subnav').fadeOut(200);
            //     if (show) $(this).addClass('on').next('.subnav').fadeIn(200);
            //     sr.removeClass('on');
            // });
            // $('.menu .subnav a.cur').click(function () {
            //     $('.menu .subnav a.cur').removeClass('on');
            //     $(this).addClass('on');
            // });
        }
        $(".navitem").removeClass("active");
        $(".navitem ul").css("display","none");
        //$(".subnav").css("display","none");

    });
	/*按钮组中的搜索交互*/
    $(".btn-toolbar .searchbox .icon-search").hover(function(){
        $(this).parent().find(".dsm-input").addClass("on");
    },function(){
        $(this).parent().find(".dsm-input").removeClass("on");
        $(this).parent().find(".dsm-input").blur();
    });
	/*下拉弹出框交互*/
    $(".dsmdropdown-toggle").hover(function(){
        if($(this).hasClass('icon')){
            $(this).parent().parent().addClass("open");
        }else{
            $(this).parent().addClass("open");
        }
    },function(){
        if($(this).hasClass('icon')){
            $(this).parent().parent().removeClass("open");
        }else{
            $(this).parent().removeClass("open");
        }
    });
    $(".dropdown-div").hover(function(){
        $(this).parent().addClass("open");
    },function(){
        $(this).parent().removeClass("open");
    });
	/*按钮组中的搜索交互*/
    $(".btn-toolbar .searchbox .dsm-input").hover(function(){
        $(this).addClass("on");
    },function(){
        if($(this).val()==""){
            $(this).removeClass("on");
            $(this).blur();
        }
    });
	/*左侧导航缩小时交互*/
    $(".dsm-side .navitem a").hover(function(){
        var itemheights=51;

        var viewHeight=document.body.scrollHeight;
        var offsetTop=$(this).offset().top;

		/*为了防止出现的浮动框影响滚动条，暂时先特殊处理*/
        if($(this).hasClass('hoverspecial')){
            itemheights=280;
        }
        var objHeight=offsetTop-itemheights;
        $(".navhoverbox").css("top",objHeight+"px")
        if($(this).html()!=""){
            $(".navhoverbox").html($(this).next().prop("outerHTML")+'<div class="nav-cur-l"></div>').addClass("in");

        }

    },function(){
        $(".navhoverbox").removeClass("in");


    });

    $(".logininfo.dsmbgblue").hover(function(){

        //var viewWidth=document.body.scrollWidth;
        //var offsetTop=$(this).offset().top;
        //var objHeight=offsetTop
        //$(".hiduserbox").css("left",objHeight+"px")

        $(".hiduserbox").removeClass("hidden");

    },function(){
        $(".hiduserbox").addClass("hidden");

    });

	/*左侧导航缩小时交互*/
    $(".navhoverbox").hover(function(){
        $(this).addClass("in");

    },function(){
        $(this).removeClass("in");
    });
    $(".hiduserbox").hover(function(){
        $(this).removeClass("hidden");

    },function(){
        $(this).addClass("hidden");
    });
	/*人员选择器点击按钮弹出选择框*/
    $(document).on("click", ".js_choseUsersBtn", function(){
        var thisBtn=$(this);
        var sid=$(this).data("ushow");
        var html=$("#"+sid).html();
        var uid=$(this).data("uhidden");
        var gid=$(this).data("ghidden");
        var gflag=$(this).data("gcheckbox");

        dsmDialog.open({
            type: 2,
            area:['860px','590px'],
            title:"选择人员",
            content : "DsmUserPicker-Form.html",
            success: function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']];
                if(gflag=="1"){
                    iframeWin.initFirstDataBind(html,sid,uid,gid,true);
                }else{
                    iframeWin.initFirstDataBind(html,sid,uid,gid,false);
                }
            }
        });
    });
	/*左右选择器通用*/
    $(document).on("click", ".datachosebox .js_choseone", function(){
        var boxid=$(this).parent().parent().attr("id");
        addItemSelect($("#"+boxid+".datachosebox .cleft .itemone.active"),boxid);
    });

    $(document).on("click", ".datachosebox .js_delone", function(){
        var boxid=$(this).parent().parent().attr("id");
        delItemSelect($("#"+boxid+".datachosebox .cright .itemone.active"),boxid);

    });
    $(document).on("click", ".datachosebox .js_choseall", function(){

        var boxid=$(this).parent().parent().attr("id");
        addAllItem(boxid);
    });

    $(document).on("click", ".datachosebox .js_delall", function(){

        var boxid=$(this).parent().parent().attr("id");
        delAllItem(boxid);

    });

    $(document).on("dblclick", ".datachosebox .cleft .itemone", function(){

        var boxid=$(this).parent().parent().parent().parent().attr("id");
        addItemSelect($(this),boxid);
    });
    $(document).on("dblclick", ".datachosebox .cright .itemone.active", function(){

        var boxid=$(this).parent().parent().parent().parent().attr("id");
        delItemSelect($(this),boxid);

    });


    $(document).on("click", ".datachosebox .itembox .items .itemone", function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
	/*左右选择器通用结束*/
	/*水印显示位置交互*/

    $(document).on("click", ".sxzyset .chosepos", function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
	/*全选*/
    $(document).on("click", ".js_checkboxAll", function(){
        var vchecked=this.checked;
        $('[name='+$(this).data('allcheckfor')+']:checkbox').each(function(){
            this.checked=vchecked;
        });
    });



	/*水印显示位置交互结束*/
	/*人员选择器交互*/
    $(document).on("click", ".J_remove", function(){
        $(this).parent().parent().remove();
    });

    $(document).on("click", ".userPickerBody .js_choseuser", function(){

        $(".userPickerBody input:checked[name='uids']").each(function(){
            if($(".userPickerBody .chosedUser[data-selaccount='"+$(this).data("uaccount")+"']").length==0){
                $(".filter-selected-list").prepend(getSelectedUserHtml(1,$(this).val(),$(this).data("uname"),$(this).data("uaccount")));
            }
        });
    });

    $(document).on("click", ".userPickerBody .JS_grchooseok", function(){
        $(".userPickerBody  input:checked[name='gids']").each(function(){
            if($(".userPickerBody .chosedUser[data-selid='"+$(this).val()+"'][data-utype='2']").length==0){
                $(".filter-selected-list").prepend(getSelectedUserHtml(2,$(this).val(),$(this).data("uname")));
            }
        });
    });
    $(document).on("click", ".js_PickerUserAdd", function(){
        var index = parent.layer.getFrameIndex(window.name);
        callBackInitPickerUserData(this);
        parent.layer.close(index);

    });
    $(document).on("click", ".js_PickerUserClean", function(){
        $(".filter-selected-list").html("");
    });
	/*人员选择器交互结束*/
	/*报表详细左侧隐藏显示树*/
    $(document).on("click", ".js_showchartzree", function(){
        $(this).toggleClass("active");
        $('.mainbox').toggleClass("closed");
    });


});

function callBackInitPickerUserData(btn){
    var viewId=$(btn).data("ushow");
    var uhiddenId=$(btn).data("uhidden");
    var ghiddenId=$(btn).data("ghidden");
    if(parent.$("#"+viewId)!=null){
        parent.$("#"+viewId).html($(".filter-selected-list").html());
    }
    if(parent.$("#"+uhiddenId)!=null){
        parent.$("#"+uhiddenId).val(getUserIds());
    }
    if(parent.$("#"+ghiddenId)!=null){
        parent.$("#"+ghiddenId).val(getGroupIds());
    }
}

function getUserIds(){
    var ids="";
    $(".filter-selected-list .chosedUser[data-utype='1']").each(function(){
        if(ids==""){
            ids+=$(this).data("selid");
        }else{
            ids+=","+$(this).data("selid");
        }
    });
    return ids;
}
function getGroupIds(){
    var gids="";
    $(".filter-selected-list .chosedUser[data-utype='2']").each(function(){
        if(gids==""){
            gids+=$(this).data("selid");
        }else{
            gids+=","+$(this).data("selid");
        }
    });
    return gids;
}
function getUserView(){
    var views="";
    $(".filter-selected-list .chosedUser").each(function(){
        if(views==""){
            views+=$(this).find(".js_utext").html();
        }else{
            views+=","+$(this).find(".js_utext").html();
        }
    });
    return views;
}
function getSelectedUserHtml(type,uid,uname,uaccount){
	/*type 1:人员  2：组*/
    if(type==1){
        return '<dd><span class="chosedUser" data-utype="'+type+'" data-selid="'+uid+'" data-selaccount="'+uaccount+'" ><span class="utext js_utext">'+uname+'['+uaccount+']</span><em class="remove J_remove"><i class="btnicon icon icon-o-close"></i></em></span></dd>'
    }
    else{
        return '<dd><span class="chosedUser"  data-utype="'+type+'"  data-selid="'+uid+'" ><span class="js_utext">【'+uname+'】</span><em class="remove J_remove"><i class="btnicon icon icon-o-close"></i></em></span></dd>'
    }
}
function addItemSelect(t,id){
    var additem=$(t);
    if(additem!=null){
		/*如果是最后一个，则将上一个item添加active*/
        var nextnode=$(additem).next();
        if(nextnode.length==0){
            nextnode=$(additem).prev();
        }
        $(nextnode).addClass("active");
        var outerHtml=$(additem).removeClass("active").prop('outerHTML')
        $("#"+id+".datachosebox .cright .itembox .items").prepend(outerHtml);
        $("#"+id+".datachosebox .cright .itembox .items .itemone:first").addClass('active').siblings().removeClass('active');
        $(additem).remove();
    }
}

function delItemSelect(t,id){
    var delitem=$(t);
    if(delitem!=null){

        var nextnode=$(delitem).next();
        if(nextnode.length==0){
            nextnode=$(delitem).prev();
        }

        $(nextnode).addClass("active");
        var outerHtml=$(delitem).removeClass("active").prop('outerHTML')
        $("#"+id+".datachosebox .cleft .itembox .items").prepend(outerHtml);
        $("#"+id+".datachosebox .cleft .itembox .items .itemone:first").addClass('active').siblings().removeClass('active');
        $(delitem).remove();
    }

}
function addAllItem(id){
    var outerHtml=$(".datachosebox .cleft .itembox .items").html();
    $("#"+id+".datachosebox .cleft .itembox .items").html("");
    $("#"+id+".datachosebox .cright .itembox .items").prepend(outerHtml);
    $("#"+id+".datachosebox .cright .itembox .items .itemone").removeClass("active");
}
function delAllItem(id){

    var outerHtml=$(".datachosebox .cright .itembox .items").html();
    $("#"+id+".datachosebox .cright .itembox .items").html("");
    $("#"+id+".datachosebox .cleft .itembox .items").prepend(outerHtml);
    $("#"+id+".datachosebox .cleft .itembox .items .itemone").removeClass("active");
}

function showHiddenBox(obj,val,upickerClass){

    if($(obj).val()==val){
        $("."+upickerClass).removeClass('hidden');

    }else{
        $("."+upickerClass).addClass('hidden');
    }
}


//限制输入框为数字
function isNum(obj) {
    $(obj).val($(obj).val().replace(/[^0-9]/g, ''));
}

// 提示-弹框位于屏幕中间
function letDivCenter(divName){
    var top = ($(window).height() - $(divName).height())/2;
    // var width=($(divName).children(".alert-box").width())/2;
    var left = ($(window).width() -$(divName).width())/2;
    var scrollTop = $(document).scrollTop();
    var scrollLeft = $(document).scrollLeft();
    $(divName).css( {position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();
    $(".btn-failTip-close").css({position:'absolute','top' : top + scrollTop+5, left : left + scrollLeft+$(divName).width()+10 } ).show();
}

//提示-成功窗口
function oprSuccess(title) {
    //启动成功失败提示
    $(".sucTip").removeClass("hidden");
    $(".btn-failTip-close").addClass("hidden");
    letDivCenter($(".sucTip"));
    $(".sucTip-txt").html(title);
    setTimeout(function () {
        $(".sucTip").addClass("hidden");
    },2000);//成功提示两秒退出
}
//提示-失败窗口
function oprFail(title,id,notice) {
    $(".failTip").removeClass("hidden");
    $(".btn-failTip-close").removeClass("hidden");
    $(".failTip").attr("data-id",id);
     letDivCenter($(".alert-box"));
    $(".failTip-txt").html(title);//错误提示需手动关闭或者点击空白区域
    $(".alert-con-notice").html(notice);
}

$(document).on("click", function ()
{
    $(".failTip").addClass("hidden"); //点击的不是div或其子元素
});
$(".failTip").click(function (event)
{
    if (event && event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
});

//提示-关闭失败提示
$(document).on('click','.btn-failTip-close',function (e) {
    $(this).next(".failTip").addClass("hidden");
    $(".btn-failTip-close").addClass("hidden");
})
//窗体改变 弹框自适应居中
$(window).resize(function () {
    letDivCenter($(".alert-box"));
})

//判断是否有选项选中
function itemSelected_check(name){
    var chkIds = "";
    $("input[type='checkbox'][name='" + name + "']:checked").each(function () {
        var id = $(this).attr("value");
        chkIds = chkIds + ",{\"id\":\"" + id + "\"}";
    })
    chkIds = chkIds.substring(1, chkIds.length);
    return chkIds;
}
