$(document).ready(function(){
    $('div.row.bx div.col-xs-12 div.bx-wrapper div.bx-viewport').addClass( "slide1" );
    $('div.row.bx2 div.col-xs-12 div.bx-wrapper div.bx-viewport').addClass( "slide2" );
    $("[type=file]").on("change", function(){
        // Name of file and placeholder
        var file = this.files[0].name;
        var dflt = $(this).attr("placeholder");
        if($(this).val()!=""){
        $(this).next().text(file);
        } else {
        $(this).next().text(dflt);
        }
    });
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
});