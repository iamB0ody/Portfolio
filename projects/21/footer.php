<footer id="footer">
	<div class="container-fluid">
		<div class="container">

			<div class="row">
				<div class="col-sm-6">
					<div class="cats">
						<h1>أقسام الموقع</h1>
						<ul class="list-unstyled">
							<li><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> رابط نصي</a></li>
							<li><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> رابط نصي</a></li>
							<li><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> رابط نصي</a></li>
							<li><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> رابط نصي</a></li>
							<li><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> رابط نصي</a></li>
							<li><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> رابط نصي</a></li>
						</ul>
					</div><!-- cats -->
				</div><!-- col-sm-6 -->
				<div class="col-sm-6">
					<div class="social">
						<a href=""><i class="fa fa-rss" aria-hidden="true"></i></a>
						<a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
						<a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
						<a href=""><i class="fa fa-youtube" aria-hidden="true"></i></a>
						<a href=""><i class="fa fa-google-plus" aria-hidden="true"></i></a>
						<a href=""><i class="fa fa-twitter" aria-hidden="true"></i></a>
						<a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
					</div><!-- social -->
				</div><!-- col-sm-6 -->
			</div><!-- row -->
		</div><!-- container -->
	</div><!-- container-fluid -->
	<div class="container-fluid downfooter">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<div class="copyrights">
						<a>جميع الحقوق محفوظة لـ زفات  © 2016</a>
					</div><!-- copyrights -->
				</div><!-- col-sm-6 -->
				<div class="col-sm-6">
					<div class="developedby">
						<img src="img/developedby.png" alt="developed by" class="img-responsive">
					</div><!-- developedby -->
				</div><!-- col-sm-6 -->
			</div><!-- row -->
		</div>
	</div><!-- container-fluid downfooter -->
</footer><!-- #footer -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){

    		$(".login").click(function(){
    			$(".dropdownlogin").toggle();
    		});

    		$(".afterlogin").click(function(){
    			$(".dropdownmenu").toggle();
    		});

			if ( $("#collapse1").hasClass("in") || $("#collapse2").hasClass("in") || $("#collapse3").hasClass("in") || $("#collapse4").hasClass("in") || $("#collapse5").hasClass("in") ) {

    			$("h4.panel-title a i").removeClass("fa-chevron-up").addClass("fa-chevron-down");

    		}else{

    			$("h4.panel-title a i").removeClass("fa-chevron-down").addClass("fa-chevron-up");

    		}

    		$("h4.panel-title").click(function(){
    			if ( $("#collapse1").hasClass("in") || $("#collapse2").hasClass("in") || $("#collapse3").hasClass("in") || $("#collapse4").hasClass("in") || $("#collapse5").hasClass("in") ) {

    				$("h4.panel-title a i").removeClass("fa-chevron-up").addClass("fa-chevron-down");

	    		}else{

	    			$("h4.panel-title a i").removeClass("fa-chevron-down").addClass("fa-chevron-up");

	    		}
    		})

    	});
    </script>
  </body>
</html>