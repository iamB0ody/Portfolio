<footer>
    <div class="footerdown">
        <div class="container">
            <div class="row marup">
                <div class="col-xs-7 footright">
                    <a>جميع الحقوق محفوظة لموقع المنافسة الاول الملاعب 2015-2016</a>
                </div><!--footright-->
                <div class="col-xs-5 footleft">
                    <a href=""><img class="img-responsive" src="img/copyrights.png"> صمم بواسطة مؤسسة الياسر</a>
                </div><!--footright-->
            </div><!--row-->
        </div><!--container-->
    </div><!--footerdown-->
</footer>


<script type="text/javascript">
    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 24.470058, lng: 39.615961},
        zoom: 8
    });

    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        animation: google.maps.Animation.BOUNCE
    });
    var contentString = '<div id="content" style="dir:rtl; text-align:right;">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading"><h1>title here</h1>'+
        '<div id="bodyContent">'+
        '<p>description here</p>'+
        '</div>'+
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 250
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    }
</script>
<script async defer
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwW0pSfZcays884OZb1_WOE8NkUzGWPRM&callback=initMap">
</script>



<script src="js/jquery-1.11.3.min.js"></script>
<!-- bxSlider Javascript file -->
<script src="js/bx/jquery.bxslider.js"></script>
<!-- bxSlider CSS file -->
<link href="js/bx/jquery.bxslider.css" rel="stylesheet" />
<script>
$(document).ready(function(){
  $('.slider1').bxSlider({
    slideWidth: 200,
    minSlides: 2,
    maxSlides: 5,
    slideMargin: 10
  });
});
</script>
<script>
$(document).ready(function(){
  $('.slider2')
    .bxSlider({
    slideWidth: 200,
    minSlides: 2,
    maxSlides: 5,
    slideMargin: 10
  });
});
</script>
<script src="js/bootstrap.min.js"></script>
<script src="js/plug.js"></script>
<script src="js/wow.min.js"></script>
<script>new WOW().init();</script>


    <!-- this should go after your </body> -->
    <link rel="stylesheet" type="text/css" href="css/jquery.datetimepicker.css"/ >
    <script src="js/jquery.datetimepicker.full.min.js"></script>
    <script>jQuery('#datetimepicker').datetimepicker();</script>
    <script>jQuery('#datetimepicker2').datetimepicker();</script>
    <script>jQuery('#datetimepicker3').datetimepicker();</script>
    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/css/bootstrap-select.min.css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/js/bootstrap-select.min.js">     </script>
    <script>
    $('.selectpicker').selectpicker({
      style: 'btn-info',
      size: 4
    });
    </script>



  </body>
</html>