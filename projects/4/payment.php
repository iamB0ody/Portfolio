<?php include 'header.php'; ?>





    
          <section class="logo-ads">
              <div class="container">
                  <div class="row">
                      <div class="col-sm-4 logo">
                        <a href="index.php"><img class="img-responsive" src="img/logo.png"></a>
                      </div>
                      <div class="col-sm-8 ads1">
                        <a href=""><img class="img-responsive" src="img/ads1.png"></a>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12 ads2">
                        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                          <!-- Indicators -->
                          <ol class="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                          </ol>

                          <!-- Wrapper for slides -->
                          <div class="carousel-inner" role="listbox">
                            <div class="item active">
                              <img class="img-responsive" src="img/ads2.png" alt="...">
                            </div>
                            <div class="item">
                              <img class="img-responsive" src="img/ads2.png" alt="...">
                            </div>
                            <div class="item">
                              <img class="img-responsive" src="img/ads2.png" alt="...">
                            </div>
                          </div>

                          <!-- Controls -->
                          <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                          </a>
                          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                          </a>
                        </div>
                      </div>
                  </div>
              </div>
          </section><!--logo-ads-->
          
          <section class="scroll">
              <div class="container">
                <div class="row">
                    <div class="col-md-1 col-sm-2 rig">
                        <a>الجديد</a>
                    </div> 
                    <div class="col-md-11 col-sm-10 bar">
                        <a href=""><marquee onmouseover="this.stop()" onmouseout="this.start()" direction="left">شريط متحرك آخر الاعلانات - شريط متحرك آخر الاعلانات - شريط متحرك آخر الاعلانات - </marquee></td>
</a>
                    </div>
                </div>
              </div>
          </section><!--scroll-->
          
          



<section class="paymentform">
    <div class="container">
        <div class="row">
            <div class="col-md-12 head">
                <h3>نموزج تأكيد التحويل البنكي</h3>
            </div>
            <form action="" method="" class="col-md-12 bankform">
                <div class="form-group">
                    <input type="text" class="form-control pholder" id="exampleInputName2" placeholder="الإسم">
                </div>
                <div class="form-group">
                    <input type="email" class="form-control pholder" id="exampleInputEmail1" placeholder="البريد الإلكترونى">
                </div>
                <div class="form-group">
                    <select>
                        <option class="firsch">مدة الإشتراك</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control pholder" id="exampleInputName2" placeholder="المبلغ الذى تم إيداعه">
                </div>
                <div class="form-group">
                    <select>
                        <option class="firsch">البنك المحول إليه</option>
                        <option>البنك المحول إليه</option>
                        <option>البنك المحول إليه</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control pholder" id="datetimepicker" placeholder="وقت وتاريخ ارسال الحوالة">
                </div>
                
                
                <div class="form-group subm">
                    <span class="col-sm-3">كود التحقيق</span>
                    <div class="col-sm-3">
                        <img class="img-responsive" src="img/capatch.png">
                    </div>
                    <input type="text" class="col-sm-3 form-control" id="exampleInputName2" placeholder="">
                    <div class="col-sm-1"></div>
                    <button type="submit" class="col-sm-2 btn btn-default">إرسال</button>
                </div>
            </form>
        </div><!--row-->
    </div><!--container-->
</section>






<?php include 'footer.php'; ?>