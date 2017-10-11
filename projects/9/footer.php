<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-12 links">
                <a href="">Facebook</a>
                <a href="">Twitter</a>
                <a href="">Google+</a>
                <a href="">LinkedIn</a>
                <a href="">Behance</a>
                <a href="">Dribbble</a>
                <a href="">GitHub</a>
            </div>
        </div>
    </div>
</footer>







<!-- loading -- 



<section class="loading-overlay">

    <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    </div>

</section>


<!-- loading -->



    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
<!--    
<script>
        $(".main").height($(window).height())
</script>
-->
    <script>
        $(function(){
          var $ppc = $('.progress-pie-chart'),
            percent = parseInt($ppc.data('percent')),
            deg = 360*percent/100;
          if (percent > 50) {
            $ppc.addClass('gt-50');
          }
          $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
          $('.ppc-percents span').html(percent+'%');
        });
        $(function(){
          var $ppc = $('.progress-pie-chart2'),
            percent = parseInt($ppc.data('percent')),
            deg = 360*percent/100;
          if (percent > 50) {
            $ppc.addClass('gt-50');
          }
          $('.ppc-progress-fill2').css('transform','rotate('+ deg +'deg)');
          $('.ppc-percents2 span').html(percent+'%');
        });
        $(function(){
          var $ppc = $('.progress-pie-chart3'),
            percent = parseInt($ppc.data('percent')),
            deg = 360*percent/100;
          if (percent > 50) {
            $ppc.addClass('gt-50');
          }
          $('.ppc-progress-fill3').css('transform','rotate('+ deg +'deg)');
          $('.ppc-percents3 span').html(percent+'%');
        });
        $(function(){
          var $ppc = $('.progress-pie-chart4'),
            percent = parseInt($ppc.data('percent')),
            deg = 360*percent/100;
          if (percent > 50) {
            $ppc.addClass('gt-50');
          }
          $('.ppc-progress-fill4').css('transform','rotate('+ deg +'deg)');
          $('.ppc-percents4 span').html(percent+'%');
        });
    </script>
    <script src="js/plug.js"></script>
    <script src="js/wow.min.js"></script>
<script>new WOW().init();</script>
  </body>
</html>