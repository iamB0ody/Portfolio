<footer id="footer">
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<a>جميع الحقوق محفوظة لـ شركة أمجاد التيسير للتمويل © 2016</a>
			</div>
			<div class="col-sm-6">
				<a href="" target=""><img src="img/copyrights.png" alt="copyrights" class="img-responsive"></a>
			</div>
		</div>
	</div>
</footer>

    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plug.js"></script>
    <script src="js/wow.min.js"></script>
	<script>new WOW().init();</script>
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
		            items:2
		        },
		        1000:{
		            items:3
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
	<script type="text/javascript">
		$(".search button").click(function(){
			$(".search input").toggleClass('hove',3000000);
		});
	</script>
  </body>
</html>