

<footer class="footer">
	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-12">
				<a>From the bottom of my heart <i class="fa fa-heart" aria-hidden="true"></i> i thank you for visiting my site</a>
			</div><!-- row -->
	</div><!-- container-fluid downfooter -->
</footer><!-- #footer -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){

				//$('.skill').height($('.skill').width()).css({'padding':'30% 0'});
				var item = $('.item');
				for (var i = 0; i < item.length; i++) {
					item.each(function() {
						let num = $(this).find('.itemimage').attr('src').split('/');
						num = num[1].split('.');
						num = num[0];
						let preva = $(this).find('#Preview');
						let sorva = $(this).find('#Source');
						preva.attr('href', "projects/" + num);
						sorva.attr('href', "https://github.com/drmagnet0/OldPortfolio/tree/master/projects/" + num);
						//alert(num);
					});
				}

    	});
    </script>
  </body>
</html>
