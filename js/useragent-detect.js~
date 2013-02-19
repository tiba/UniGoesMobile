(function($) {
	$(document).ready(function(){
		var hashTag = window.location.hash;
		if(hashTag == 'ios'){
			$.cookie("agent",'ios');			
		}else if(hashTag == 'android'){
			$.cookie("agent",'android');			
		}else if(!$.cookie("agent")){
			$.cookie("agent",'android');			
		}		
		
		
		$('body').addClass($.cookie("agent"));
		
	}); 
		
 })(jQuery);