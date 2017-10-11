<?php include 'header-user.php'; ?>





<section class="addad">
    <div class="container">
        <div class="row">
            <form>
                
                <div class="erros">
                <div class="alert alert-danger" role="alert">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span class="sr-only">Error:</span>
                  عذرا لايمكن ترك اسم المستخدم فارغا
                </div><!--alert-->

                <div class="alert alert-success" role="alert">
                  <i class="fa fa-check"></i>
                  <span class="sr-only">Error:</span>
                    تم تغيير كلمة المرور بنجاح
                    <br>
                    <i class="fa fa-check"></i>
                  <span class="sr-only">Error:</span>
                    تم حفظ التعديلات بنجاح
                    <br>
                </div><!--alert-->
            </div><!--erros-->
                
                <h1>تعديل ملفك الشخصي</h1>
                <div class="line"></div>
                <div class="form-group forms">
                    <label for="exampleInputName2">اسم المستخدم :</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع اسم حقيقي لك ليستطيع مشاهدي الاإعلان التواصل معك به">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">البريد الإلكتروني :</label>
                    <input type="email" class="form-control" id="exampleInputName2" placeholder="ضع بريدك الإلكتروني">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">العنوان :</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع عوانك او العنوان الموجه للإعلانات">
                </div><!--forms-->
                
                
                <div class="form-group forms">
                    <label for="exampleInputName2">المدينة :</label>
                    <select class="form-control" id="exampleInputName2">
                        <option>جدة</option>
                        <option>الرياض</option>
                        <option>مكة</option>
                        <option>الندينة</option>
                    </select>
                </div><!--forms-->

                <div class="form-group forms">
                    <label for="exampleInputName2">الهاتف :</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع الهاتف الموجه إليه الإعلان">
                </div><!--forms-->
                
                
                <div class="fasel"></div><!--fasel-->
                
                
                <div class="form-group forms">
                    <label for="exampleInputName2">حسابك على فيس بوك :</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع رابط حسابك على موقع فيس بوك">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">حسابك على تويتر :</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع رابط حسابك على موقع تويتر">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">حسابك على جوجل بلس</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع رابط حسابك على جوجل بلس">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">موقعك الشخصي :</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="ضع رابط مباشر لموقعك الشخصي">
                </div><!--forms-->
                
                
                
                <div class="fasel"></div><!--fasel-->
                
                
                
                <div class="form-group forms">
                    <label for="exampleInputName2">كلمة المرور الحالية :</label>
                    <input type="password" class="form-control" id="exampleInputName2" placeholder="************">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">كلمة المرور الجديدة :</label>
                    <input type="password" class="form-control" id="exampleInputName2" placeholder="************">
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">تأكيد كلمة المرور الجديدة :</label>
                    <input type="password" class="form-control" id="exampleInputName2" placeholder="************">
                </div><!--forms-->
                
                
                <div class="subcent">
                    <button type="submit" class="btn btn-default addbt">حفظ</button>
                </div>
            </form>
        </div><!--row-->
    </div><!--container-->
</section><!--addad-->

    






<?php include 'footer.php'; ?>