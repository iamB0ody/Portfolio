<?php include 'header.php'; ?>









<div class="container regpage">
	<div class="row">
		<div class="col-xs-12">
			<div class="reghead">
				<h1>التسجيل</h1>
			</div><!-- reghead -->
		</div><!-- col-xs-12 -->
	</div><!-- row -->
	<div class="row">
		<div class="col-xs-12">
			<div class="regcontent row">
				<form action="" method="">

					<div class="form-group col-sm-6">
						<label for="fullname">الإسم بالكامل</label>
						<input type="text" class="form-control" id="fullname">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="username">اسم المستخدم</label>
						<input type="text" class="form-control" id="username">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="email">البريد الإلكتروني</label>
						<input type="email" class="form-control" id="email">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="email2">تأكيد البريد الإلكتروني</label>
						<input type="email" class="form-control" id="email2">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="phone">جوال</label>
						<input type="number" class="form-control" id="phone">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="pass">كلمة المرور</label>
						<input type="password" class="form-control" id="pass">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="pass2">تأكيد كلمة المرور</label>
						<input type="password" class="form-control" id="pass2">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="country">الدولة</label>
						<input type="text" class="form-control" id="country">
					</div><!-- form-group col-sm-6 -->

					<div class="form-group col-sm-6">
						<label for="city">المدينة</label>
						<input type="text" class="form-control" id="city">
					</div><!-- form-group col-sm-6 -->

					<div class="col-sm-6">
						<div class="checkbox">
							<label for="checkbox">
								<input type="checkbox" id="checkbox"> الموافقة على سياسة الخدمة
							</label>
						</div><!-- checkbox -->
					</div><!-- form-group col-sm-6 -->

					<div class="col-xs-12">
						<div class="regbtnsubmit">
							<button type="submit">تسجيل</button>
						</div><!-- regbtnsubmit -->
					</div><!-- col-xs-12 -->

				</form>
			</div><!-- regcontent -->
		</div><!-- col-xs-12 -->
	</div><!-- row -->
</div><!-- container -->









<?php include 'footer.php'; ?>