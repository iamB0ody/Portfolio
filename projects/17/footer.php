<footer id="footer">
	<div class="container">
		<div class="row">

		<div class="col-md-4 col-sm-6">
			<div class="copyrights">
				<a>Copyright © 2016 Golden Explorer | All rights reseved</a>
			</div>
		</div>

		<div class="col-md-4 col-sm-6">
			<div class="social">
				<a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
				<a href=""><i class="fa fa-twitter" aria-hidden="true"></i></a>
				<a href=""><i class="fa fa-google-plus" aria-hidden="true"></i></a>
				<a href=""><i class="fa fa-youtube" aria-hidden="true"></i></a>
				<a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
				<a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
				<a href=""><i class="fa fa-rss" aria-hidden="true"></i></a>
			</div>
		</div>

		<div class="col-md-4 col-sm-12">
			<div class="develop">
				<a href="">
					<img src="img/develop.png" alt="develop by" class="img-responsive">
				</a>
			</div>
		</div>

		</div><!-- row -->
	</div><!-- container -->
</footer><!-- footer -->

    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    
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
		        },
		        600:{
		            items:3
		        },
		        1000:{
		            items:6
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