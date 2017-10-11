<?php include 'header.php'; ?>



<div class="container">




    <section class="search row">


        <div class="tabsmaneg">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a class="nobord" href="#data" aria-controls="data" role="tab" data-toggle="tab"><i class="fa fa-search"></i> بحث بالبيانات</a></li>
                <li role="presentation"><a href="#name" aria-controls="name" role="tab" data-toggle="tab">بحث باسم او رقم الملعب</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="data">
                    <form>
                        <div class="form-group col-xs-12">
                            <select class="form-control">
                               <optgroup>المدينة</optgroup>
                                <option>الرياض</option>
                                <option>جدة</option>
                                <option>المدينة المنورة</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                            <input type="text" class="form-control" id="datetimepicker3" placeholder="وقت وتاريخ الحجز">
                        </div>
                        <div class="form-group col-sm-6">
                            <input type="text" class="form-control" placeholder="حجم الملعب">
                        </div>
                        <span class="col-xs-12"><button type="button" class="btn btn-primary logbt">بحث</button></span>
                    </form>
                </div>
                <div role="tabpanel" class="tab-pane" id="name">
                    <form>
                        <div class="form-group col-sm-5">
                            <input type="text" class="form-control" placeholder="اسم الملعب">
                        </div>
                        <div class="col-sm-2" style="text-align: center;margin: 9px 0;font-size: 20px;">
                            <a style="color: white;">أو</a>
                        </div>
                        <div class="form-group col-sm-5">
                            <input type="number" class="form-control" placeholder="رقم الملعب">
                        </div>
                        <span class="col-xs-12"><button type="button" class="btn btn-primary logbt">بحث</button></span>
                    </form>
                </div>
            </div><!--tab-content-->
            <div class="col-xs-12">
                <div class="row">
                    <div class="col-xs-5 rightbt">
                        <a href="">تسجيل ملعب جديد </a>
                    </div>
                    <div class="col-xs-2"></div>
                    <div class="col-xs-5 leftbt">
                        <a href="">إضافة دوري جديد </a>
                    </div>
                </div>
            </div>

        </div><!--tabsmaneg-->


    </section><!--search-->



      
      
      
</div><!--container-->
    
      
      
      
      
    
      
      
      







<?php include 'footer.php'; ?>

