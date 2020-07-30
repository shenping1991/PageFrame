$(window).on("load,resize",function(){
	topbtn();
})
$(window).on("load",function(){
	$('.flexslider').flexslider({
                animation: "slide"
              });
})
$(window).resize(function(){
	resizeHeight();
});

$(document).ready(function(){
	resizeHeight();
	var topBtn = $('.TopBtn');
	topBtn.css("display","none");
	topBtn.click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	topbtn();
});

function topbtn(){
	var topBtn = $('.TopBtn');
	topBtn.hide();
	$(window).scroll(function(){
		var scrollT=topBtn.offset();
		if($(this).scrollTop()>10){
			$(".TopBtn").fadeIn();
		}
		else{

			$(".TopBtn").fadeOut();
		}
	})
}
function resizeHeight(){

};