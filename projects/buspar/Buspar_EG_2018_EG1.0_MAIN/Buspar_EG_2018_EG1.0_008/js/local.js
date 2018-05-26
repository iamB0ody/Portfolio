// --- local.js --- //

$( document ).ready(function() {

	// --- CUSTOM ANIMATIONS - ANIMATED AND FLAT VERSIONS ---//
	if (window.sessionStorage.getItem('mtgskAnimations') === '1') {
		// --- ANIMATED ---//
		$('.pageAnimation').delay(500).animate({left:'968px', top:'top:260px'},2000);	
	} else {
		// --- FLAT ---//
		$('.pageAnimation').css({left:'968px', top:'top:260px'});
	}

	$('#b1').setAnimation('fadeInUpBig', 0.5, 0.3);
	$('#b2').setAnimation('fadeInUpBig', 0.8, 0.3);
	$('#b3').setAnimation('fadeInUpBig', 1.1, 0.3);
	$('#b4').setAnimation('fadeInUpBig', 1.4, 0.3);
	$('#b5').setAnimation('fadeInUpBig', 1.7, 0.3);
	$('#b6').setAnimation('fadeInUpBig', 2.0, 0.3);
	$('#b7').setAnimation('fadeInUpBig', 2.3, 0.3);
	$('#b8').setAnimation('fadeInUpBig', 2.6, 0.3);
	$('#b9').setAnimation('fadeInUpBig', 2.9, 0.3);
	$('#b10').setAnimation('fadeInUpBig', 3.2, 0.3);
				
});