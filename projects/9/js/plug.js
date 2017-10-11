// loading


$(window).load(function()
{
    $("body").css("overflow","auto");
    
    $(".loading-overlay .sk-cube-grid").fadeOut(4000,
        function(){
            $(this).parent().fadeOut(1000,
                function(){
                    $(this).remove();
                });
        });
});