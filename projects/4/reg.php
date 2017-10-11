<?php include 'header.php'; ?>




<!-- pop up for user info -->
<div class="modal fade bs-example-modal-sm">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">هل نسيت كلمة المرور ؟</h4>
      </div>
      <div class="modal-body">
          <form>
            <div class="form-group">
                <input type="email" class="form-control" id="exampleInputName2" placeholder="قم بإدخال بريدك الإلكتروني" required>
            </div>
            <button type="submit" class="btn btn-default resbt">إسترجاع</button>
          </form>
        <p>سيتم توليد كلمة مرور جديدة وإرسالها إليك على البريد الإلكترونى , مرفقة برابط تغيير كلمة المرور الخاصه بك من لوحة التحكم</p>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- pop up for user info -->





<section class="logreg">
    
    <div class="container">
        <div class="row">
            

            <div class="alert alert-danger" role="alert">
              <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span class="sr-only">Error:</span>
              البريد أو كلمة المرور خطأ
            </div>
            
            <div class="alert alert-success" role="alert">
              <i class="fa fa-check"></i>
              <span class="sr-only">Error:</span>
              شكرا لتسجيلك معنا .. جاري تحويلك الى الصفحة الشخصية .
            </div>

            <section class="col-md-6 login">
                <h3>تسجيل الدخول</h3>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputName2" placeholder="اسم المستخدم" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputName2" placeholder="كلمة المرور" required>
                    </div>
                    <div class="checkbox">
                        <label>
                          <input type="checkbox" checked> تذكرني
                        </label>
                    </div>
                    <div class="form-group">
                        <a href="" data-toggle="modal" data-target=".bs-example-modal-sm">إستعادة كلمة المرور</a>
                    </div>
                    <button type="submit" class="btn btn-default logbt">دخول</button>
                </form>
            </section><!--login-->
            
            <section class="col-md-6 reg">
                <h3>تسجيل مستخدم جديد</h3>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputName2" placeholder="اسم المستخدم" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="exampleInputName2" placeholder="البريد الإلكترونى" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputName2" placeholder="كلمة المرور" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputName2" placeholder="تأكيد كلمة المرور" required>
                    </div>
                    <button type="submit" class="btn btn-default regbt">تسجيل</button>
                </form>
            </section><!--reg-->
            
        </div><!--row-->
    </div><!--container-->
    
</section><!--logreg-->
    






<?php include 'footer.php'; ?>