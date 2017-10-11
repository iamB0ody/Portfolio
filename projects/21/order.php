<?php include 'header.php'; ?>









<div class="container orderpage">
	<div class="row">
		<div class="col-xs-12">
			<div class="orderhead">
				<h1>طلب زفة خاصة</h1>
			</div><!-- reghead -->
		</div><!-- col-xs-12 -->
	</div><!-- row -->
	<div class="row">
		<div class="col-xs-12">
			<div class="ordercontent row">
				<form action="" method="">

					<div class="form-group col-sm-12">
						<label for="ariesname">اسم العروسين</label>
						<input type="text" class="form-control" id="ariesname">
					</div><!-- form-group col-sm-12 -->

					<div class="form-group col-sm-12">
						<label for="poiatname">عنوان القصيدة</label>
						<input type="text" class="form-control" id="poiatname">
					</div><!-- form-group col-sm-12 -->

					<div class="form-group col-sm-12">
						<label for="poietwords">كلمات القصيدة</label>
						<textarea class="form-control" id="poietwords"></textarea>
					</div><!-- form-group col-sm-12 -->

					<div class="form-group col-sm-12">
						<label for="upsound" style="width:100%;">رفع مقطع صوتي للحن
							<div class="form-control" style="margin-top:15px;font-weight:normal;">إستعراض</div>
						</label>
						<input type="file" class="form-control" id="upsound">
					</div><!-- form-group col-sm-12 -->

					<div class="col-sm-6 minheight150">
						<h4>الإيقاع</h4>
						<ul class="list-unstyled">
							<li>
								<input type="radio" id="opti1" name="selector">
								<label for="opti1">بايقاع</label>
								<div class="check"></div>
							</li>
							<li>
								<input type="radio" id="opti2" name="selector">
								<label for="opti2">بدون ايقاع</label>
								<div class="check"><div class="inside"></div></div>
							</li>
						</ul>
					</div><!-- col-sm-6 minheight150 -->

					<div class="col-sm-6 minheight150">
						<h4>الكورال</h4>
						<ul class="list-unstyled">
							<li>
								<input type="radio" id="opti3" name="selector">
								<label for="opti3">يوجد</label>
								<div class="check"></div>
							</li>
							<li>
								<input type="radio" id="opti4" name="selector">
								<label for="opti4">لايوجد</label>
								<div class="check"><div class="inside"></div></div>
							</li>
						</ul>
					</div><!-- col-sm-6 minheight150 -->

					<div class="col-sm-6 minheight150">
						<h4>الأداء</h4>
						<ul class="list-unstyled">
							<li>
								<input type="checkbox" id="opti5" name="selector">
								<label for="opti5">أحد الموجودين بالموقع</label>
								<div class="check"></div>
							</li>
						</ul>
					</div><!-- col-sm-6 minheight150 -->

					<div class="col-sm-6 minheight150">
						<h4>الأنشودة</h4>
						<ul class="list-unstyled">
							<li>
								<input type="checkbox" id="opti6" name="selector">
								<label for="opti6">أحد الموجودين بالموقع</label>
								<div class="check"></div>
							</li>
						</ul>
					</div><!-- col-sm-6 minheight150 -->

					<div class="col-sm-6 minheight150">
						<h4>الموزع</h4>
						<ul class="list-unstyled">
							<li>
								<input type="checkbox" id="opti7" name="selector">
								<label for="opti7">أحد الموجودين بالموقع</label>
								<div class="check"></div>
							</li>
						</ul>
					</div><!-- col-sm-6 minheight150 -->

					<div class="col-sm-6 minheight150">
						<h4>الهندسة الصوتية</h4>
						<ul class="list-unstyled">
							<li>
								<input type="checkbox" id="opti8" name="selector">
								<label for="opti8">أحد الموجودين بالموقع</label>
								<div class="check"></div>
							</li>
						</ul>
					</div><!-- col-sm-6 minheight150 -->

					<div class="col-xs-12">
						<div class="regbtnsubmit">
							<button type="submit">تقديم الطلب</button>
						</div><!-- regbtnsubmit -->
					</div><!-- col-xs-12 -->

				</form>
			</div><!-- regcontent -->
		</div><!-- col-xs-12 -->
	</div><!-- row -->
</div><!-- container -->









<?php include 'footer.php'; ?>