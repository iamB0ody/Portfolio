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


                <h1>إضافة إعلان جديد</h1>
                <div class="line"></div>
                <div class="form-group forms">
                    <label for="exampleInputName2">عنوان الإعلان :</label><br>
                    <input type="text" class="form-control" id="exampleInputName2" maxlength="35" placeholder="ضع عنوان خدمة مختصر ومناسب لايقل عن 15 حرفا">
                </div><!--forms-->
                <div class="form-group forms">
                    <label for="exampleInputName2">تصنيف الإعلان :</label><br>
                    <select class="form-control" id="exampleInputName2">
                        <option>القسم الاول</option>
                        <option>القسم الثانى</option>
                        <option>القسم الثالث</option>
                        <option>القسم الرابع</option>
                        <option>القسم الخميس</option>
                    </select>
                </div><!--forms-->
                <div class="form-group forms">
                    <label for="exampleInputName2">وصف الإعلان :</label><br>
                    <textarea class="form-control" id="exampleInputName2" placeholder="اكتف وصف مطول عن الإعلان حتى يتسنى لمشاهديه بمعرفة كل التفاصيل"></textarea>
                </div><!--forms-->
                
                <div class="form-group forms custom-file-upload">
                    <label for="exampleInputFile">صور الإعلان :</label>
                    <input type="file" id="exampleInputFile file" class="exampleInputFile form-control" name="myfiles[]" multiple ><br>
                    <p class="help-block">يمكنك اختيار صورة واحدة أو عدة صور حسب احتياجات إعلانك .</p>
                    
                    <div class="images">
                        <ul class="list-unstyled">
                            <li>
                                <div class="imgbox">
                                    <a href=""><i class="fa fa-times"></i></a>
                                    <img class="img-responsive" src="img/ad.png">
                                </div><!--imgbox-->
                            </li>
                            <li>
                                <div class="imgbox">
                                    <a href=""><i class="fa fa-times"></i></a>
                                    <img class="img-responsive" src="img/ad.png">
                                </div><!--imgbox-->
                            </li>
                            <li>
                                <div class="imgbox">
                                    <a href=""><i class="fa fa-times"></i></a>
                                    <img class="img-responsive" src="img/ad.png">
                                </div><!--imgbox-->
                            </li>
                        </ul>
                    </div><!--images-->
                    
                </div><!--forms-->
                
                <div class="form-group forms">
                    <label for="exampleInputName2">باي مدينة يخص إعلانك :</label><br>
                    <select class="form-control" id="exampleInputName2">
                        <option>مكة</option>
                        <option>المدينة</option>
                        <option>الرياض</option>
                        <option>جدة</option>
                    </select>
                </div><!--forms-->
                <div class="subcent">
                    <button type="submit" class="btn btn-default addbt">إضافة إعلان</button>
                </div>
            </form>
        </div><!--row-->
    </div><!--container-->
</section><!--addad-->

    






<?php include 'footer.php'; ?>