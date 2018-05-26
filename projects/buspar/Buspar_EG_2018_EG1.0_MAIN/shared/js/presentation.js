/**********************************************************/
/* GSK Veeva Master Template - Presentation Functionality */
/**********************************************************/
/* File version              1.5                  */
/* Last modified             29/08/2017           */
/* Last modified by          T.T.                         */
/**********************************************************/

// --- CUSTOM TO THIS PRESENTATION --- //
$(document).ready(function() {

    if ($("#setAnimations").length) {
        // --- SET TEXT ON HOME PAGE BUTTON --- //
        if (window.sessionStorage.getItem('mtgskAnimations') === '1') {
            $('#setAnimations').text("Animations are On");
        } else {
            $('#setAnimations').text("Animations are Off");
        }

        com.gsk.mt.bindInteraction("#setAnimations", "tap", {}, function() {
            if (window.sessionStorage.getItem('mtgskAnimations') === '1') {
                window.sessionStorage.setItem('mtgskAnimations', '0');
                $('#setAnimations').text("Animations are Off");
                com.gsk.mt.debug("Animations are Off");
            } else {
                window.sessionStorage.setItem('mtgskAnimations', '1');
                $('#setAnimations').text("Animations are On");
                com.gsk.mt.debug("Animations are On");
            }
        });
    }

});
