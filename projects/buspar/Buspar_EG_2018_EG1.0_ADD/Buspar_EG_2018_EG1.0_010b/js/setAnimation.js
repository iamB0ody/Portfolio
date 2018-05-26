// JavaScript Document

 jQuery.fn.setAnimation = function(className,delay,duration){

	
	
	
	 $(this).addClass(className);
	
	 $(this).css({'-webkit-animation-delay':delay+"s"});
	
	 $(this).css({'-webkit-animation-duration':duration+"s"});
	
	 $(this).css({'-webkit-animation-fill-mode':'both'});
	 
	
	
	}