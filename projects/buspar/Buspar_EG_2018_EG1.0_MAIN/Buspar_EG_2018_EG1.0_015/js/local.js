// --- local.js --- //

$( document ).ready(function() {

	var myScroll = new iScroll('content');

	// --- CUSTOM ANIMATIONS - ANIMATED AND FLAT VERSIONS ---//
	if (window.sessionStorage.getItem('mtgskAnimations') === '1') {
		// --- ANIMATED ---//
		$('.pageAnimation').delay(500).animate({left:'968px', top:'top:260px'},2000);	
	} else {
		// --- FLAT ---//
		$('.pageAnimation').css({left:'968px', top:'top:260px'});
	}
				
});