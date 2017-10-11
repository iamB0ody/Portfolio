
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
    });
    $("#up").click(function(){
        $("#scu").attr({
            "direction" : "up"
        });
    });
    $("#down").click(function(){
        $("#scu").attr({
            "direction" : "down"
        });
    });
    $('#carousel-example-generic2').carousel({
        interval: false
    });