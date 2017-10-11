<footer id="footer">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="lang">
					<a href="">العربية</a>
					<a href="">English</a>
				</div><!-- copyrights -->
			</div><!-- col-xs-12 -->
			<div class="col-xs-12">
				<div class="copyrights">
					<a>جميع الحقوق محفوظة لـ شاليهات لدين  ©  2016</a>
				</div><!-- copyrights -->
			</div><!-- col-xs-12 -->
			<div class="col-xs-12">
				<div class="copyrights">
					<a href=""><img src="img/copyrights.png" alt="copyrights" class="img-responsive"></a>
				</div><!-- copyrights -->
			</div><!-- col-xs-12 -->
		</div><!-- row -->
	</div><!-- container -->
</footer><!-- footer -->


    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <!--datepicker-->
    <script src="js/jquery.datetimepicker.full.min.js"></script>
    <script>
    	jQuery.datetimepicker.setLocale('de');
		jQuery('#datetimepicker').datetimepicker({
		 i18n:{
		  de:{
		   months:[
		    'Januar','Februar','März','April',
		    'Mai','Juni','Juli','August',
		    'September','Oktober','November','Dezember',
		   ],
		   dayOfWeek:[
		    "So.", "Mo", "Di", "Mi", 
		    "Do", "Fr", "Sa.",
		   ]
		  }
		 },
		 timepicker:false,
		 format:'d.m.Y'
		});
    </script>
    <script src="js/owl.carousel.min.js"></script>
	<script type="text/javascript">
		var owl = $('.owl-carousel');
		$('.owl-carousel').owlCarousel({
			rtl:true,
			lazyLoad: true,
		    loop:true,
		    margin:10,
		    nav:false,
		    autoplay:true,
		    autoplayTimeout:2000,
		    autoplayHoverPause:true,
		    responsive:{
		        0:{
		            items:1
		        }
		    }
		});
		owl.on('mousewheel', '.owl-stage', function (e) {
		    if (e.deltaY>0) {
		        owl.trigger('next.owl');
		    } else {
		        owl.trigger('prev.owl');
		    }
		    e.preventDefault();
		});
		owl.owlCarousel();
		// Go to the next item
		$('.customNextBtn').click(function() {
		    owl.trigger('next.owl.carousel');
		})
		// Go to the previous item
		$('.customPrevBtn').click(function() {
		    // With optional speed parameter
		    // Parameters has to be in square bracket '[]'
		    owl.trigger('prev.owl.carousel', [300]);
		})
	</script>

  </body>
</html>