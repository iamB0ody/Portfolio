<footer> 
    <div class="container-fluid footerdn">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 footerright">
                    <a>جميع الحقوق محفوظة لـ مدرسة ابن تيمية الإبتدائية للبنين بالنخيل © 2016</a>
                </div><!--footerright-->
                <div class="col-sm-6 footerleft">
                    <a href=""><img src="img/copyrights.png" alt="" class="img-responsive"></a>
                </div><!--footerleft-->
            </div><!--row-->
        </div><!--container-->
    </div><!--footerdn-->
</footer>

















    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function(){
            $('.searchsocial form a').click(function(){
                $('.searchsocial form input').slideToggle(300);
            });
            $('.carousel').carousel({
               interval: false
            })
        });    
    </script>
  </body>
</html>