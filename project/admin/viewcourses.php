<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>The Dreams Academy</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="assets/vendors/jvectormap/jquery-jvectormap.css">
    <link rel="stylesheet" href="assets/vendors/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="assets/vendors/owl-carousel-2/owl.carousel.min.css">
    <link rel="stylesheet" href="assets/vendors/owl-carousel-2/owl.theme.default.min.css">
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- End layout styles -->
    <link rel="shortcut icon" href="assets/images/favicon.png" />
  </head>
  <body>
    <div class="container-scroller">
      <!-- partial:partials/_sidebar.html -->
    <?php include("side.php"); ?>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_navbar.html -->
      <?php include("top.php"); ?>
        <!-- partial -->
        <div class="main-panel">
          <div class="content-wrapper">



            <div class="row">
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>No of Courses</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">


                          <?php


                          $select_orders = "select * from course ";

                          $run_orders = mysqli_query($con,$select_orders);
                          $i=0;

                          while($row = mysqli_fetch_array($run_orders)){

                          $i++;



}

                           ?>

                        <h2 class="mb-0"><?php echo $i; ?></h2>

                        </div>
                        <h6 class="text-muted font-weight-normal">we offer <?php echo $i; ?> courses</h6>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i class="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Sales</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">

                          <?php


                          $select_orders = "select * from course ";

                          $run_orders = mysqli_query($con,$select_orders);
                          $a=0;


                          while($row = mysqli_fetch_array($run_orders)){

                          $a += $row['price'];




}

                           ?>

                          <h2 class="mb-0">RS <?php echo $a; ?></h2>

                        </div>
                        <h6 class="text-muted font-weight-normal">Revenue in total</h6>
                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i class="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <h5>Add New Course</h5>
                    <div class="row">
                      <div class="col-8 col-sm-12 col-xl-8 my-auto">
                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 class="mb-0">  <a href="addcourses.php" class="btn btn-lg btn-success">Add +</a> </h2>

                        </div>

                      </div>
                      <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <center>
                    <h4 class="card-title text-primary">On going courses</h4>

                  </center>
                    <div class="table-responsive">
                      <table class="table" >
                        <thead>
                          <tr>

                            <th> # </th>
                            <th> Title </th>
                            <th> Enrollment date </th>
                            <th> Price </th>
                            <th> Total student </th>
                            <th> Remaning seats </th>
                            <th> Image </th>
                            <th> Edit / Delete</th>
                          </tr>
                        </thead>
                        <tbody>



               <?php


               $select_orders = "select * from course ";

               $run_orders = mysqli_query($con,$select_orders);
               $i=0;

               while($row = mysqli_fetch_array($run_orders)){

$i++;



                ?>









                          <tr style="color:#fff;" >
                            <td> <?php echo $i; ?> </td>
                            <td> <?php echo $row['title']; ?> </td>
                            <td><?php echo $row['enroll']; ?>  </td>
                            <td> <?php echo $row['price']; ?>  </td>
                            <td> <?php echo $row['totalstudent']; ?> </td>

                            <td> <?php echo $row['remaningseats']; ?> </td>
                            <td>
                              <img src="images/<?php echo $row['imagee']; ?>" alt="image" />

                            </td>

                            <td>

                              <a href="ec.php?i=<?php echo $row['id']; ?>" class="btn btn-sm btn-primary btn-icon-text"> <i class="mdi mdi-border-color btn-icon-append"></i>
                              </a>
                              <br><br>
                              <a href="dc.php?d=<?php echo $row['id']; ?>" class="btn btn-sm btn-danger btn-icon-text"> <i class="mdi mdi-content-cut btn-icon-append"></i>
                              </a>


                            </td>

                          </tr>


<?php } ?>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
        <?php include("footer.php") ?>
