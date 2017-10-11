<?php include 'header-user.php'; ?>





<section class="addad">
    <div class="container">
        <div class="row">
            <h1>لوحة تحكم الإعلانات</h1>
            <div class="line"></div>

            <div class="erros">
                <div class="alert alert-danger" role="alert">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span class="sr-only">Error:</span>
                  عذرا هذا الإعلان مميز بالفعل
                </div><!--alert-->

                <div class="alert alert-success" role="alert">
                  <i class="fa fa-check"></i>
                  <span class="sr-only">Error:</span>
                  تم مسح الإعلان بنجاح
                    <br>
                    <i class="fa fa-check"></i>
                  <span class="sr-only">Error:</span>
                    الإعلان معلق حتى تتم الموافقه عليه من الإدارة
                    <br>
                </div><!--alert-->
            </div><!--erros-->

            <div class="row r1">
                <div class="col-md-12 table-responsive edu">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="row">#</th>
                                <th>عنوان الإعلان</th>
                                <th>تصنيف الإعلان</th>
                                <th>بلد الإعلان</th>
                                <th>نوع الإعلان</th>
                                <th>حالة الإعلان</th>
                                <th>تاريخ بداية الإعلان</th>
                                <th>تاريخ إنتهاء الإعلان</th>
                                <th></th>
                                <th>حذف</th>
                                <th>تعديل</th>
                                <th>تمييز</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>عمل دراسات وأبحاث لايتج ...</td>
                                <td>سباكين</td>
                                <td>الرياض</td>
                                <td>مجاني</td>
                                <td>مفعل</td>
                                <td>15/3/2015</td>
                                <td>15/4/2015</td>
                                <td></td>
                                <td><a href=""><i class="fa fa-times"></i></a></td>
                                <td><a href=""><i class="fa fa-pencil-square-o"></i></a></td>
                                <td><a href=""><i class="fa fa-star-o"></i></a></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>اعمال سيراميك للمحلات  ...</td>
                                <td>سيراميك</td>
                                <td>جدة</td>
                                <td>مميز</td>
                                <td>معلق</td>
                                <td>10/6/2015</td>
                                <td>10/8/2015</td>
                                <td></td>
                                <td><a href=""><i class="fa fa-times"></i></a></td>
                                <td><a href=""><i class="fa fa-pencil-square-o"></i></a></td>
                                <td><a><i class="fa fa-star"></i></a></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>عمل دراسات وأبحاث لايتج ...</td>
                                <td>دهانات</td>
                                <td>المدينة</td>
                                <td>مجاني</td>
                                <td>مغلق</td>
                                <td>-</td>
                                <td>-</td>
                                <td></td>
                                <td><a href=""><i class="fa fa-times"></i></a></td>
                                <td><a href=""><i class="fa fa-pencil-square-o"></i></a></td>
                                <td><a href=""><i class="fa fa-star-o"></i></a></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div><!--edu-->
            </div><!--row r1-->

            
        </div><!--row-->
    </div><!--container-->
</section><!--addad-->

    






<?php include 'footer.php'; ?>