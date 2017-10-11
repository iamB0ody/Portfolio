<?php include 'header.php'; ?>









<div class="container order2page">
	<div class="row">
		<div class="col-xs-12">
			<div class="order2head">
				<h1>طلب شراء المقطع</h1>
			</div><!-- order2head -->
		</div><!-- col-xs-12 -->
	</div><!-- row -->
	<div class="row">
		<div class="col-xs-12">
			<div class="order2content row">
				<form action="" method="">

					<div class="form-group col-sm-12">
						<label for="audioname">عنوان المقطع الصوتي المطلوب</label>
						<input type="text" class="form-control" id="audioname">
					</div><!-- form-group col-sm-12 -->

					<div class="form-group col-sm-12">
						<label for="numoftrans">رقم التحويل البنكي</label>
						<input type="number" class="form-control" id="numoftrans">
					</div><!-- form-group col-sm-12 -->

					<div class="form-group col-sm-12">
						<label for="moreinfo">يرجى إدراج تفاصيل التحويل كـ رقم الحوالة ومكان ووقت التحويل</label>
						<textarea class="form-control" id="moreinfo"></textarea>
					</div><!-- form-group col-sm-12 -->

					<div class="form-group col-sm-12">
						<label for="upsound" style="width:100%;">رفع صورة إيصال التحويل
							<div class="form-control" style="margin-top:15px;font-weight:normal;">إستعراض</div>
						</label>
						<input type="file" class="form-control" id="upsound">
					</div><!-- form-group col-sm-12 -->

					<div class="col-xs-12">
						<div class="order2btnsubmit">
							<button type="submit">إرسال</button>
						</div><!-- order2btnsubmit -->
					</div><!-- col-xs-12 -->

				</form>
			</div><!-- order2content -->
		</div><!-- col-xs-12 -->
	</div><!-- row -->
</div><!-- container -->









<?php include 'footer.php'; ?>