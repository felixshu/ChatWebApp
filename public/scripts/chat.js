(function(){
	function size (width, height){
		this.width = width;
		this.height = height;
	}

	var smallSize = new size(600,$(window).height());

	function resizeWinTo(){
		window.resizeTo(smallSize.width,smallSize.height);
		window.focus();
	}

	$(function(){
		resizeWinTo();
		$(window).resize(function(){
			if($(window).width() > 600 || $(window).width() < 600 ){
				resizeWinTo();
			}
		});
	});
	
})();