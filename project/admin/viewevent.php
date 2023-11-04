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




            <div class="row ">
              <div class="col-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <center>
                    <h4 class="card-title text-primary">Upcomming Events list</h4>

                  </center>
                    <div class="table-responsive">
                      <table class="table" >
                        <thead>
                          <tr>

                            <th> # </th>
                            <th> Day</th>
                            <th> Month </th>
                            <th> Event title </th>
                            <th> Description </th>

                            <th> Image </th>

                            <th> Edit / Delete</th>
                          </tr>
                        </thead>
                        <tbody>



               <?php


               $select_orders = "select * from events ";

               $run_orders = mysqli_query($con,$select_orders);
               $i=0;

               while($row = mysqli_fetch_array($run_orders)){

$i++;



                ?>









                          <tr style="color:#fff;" >
                            <td> <?php echo $i; ?> </td>
                            <td> <?php echo $row['day']; ?> </td>
                            <td><?php echo $row['month']; ?>  </td>
                            <td> <?php echo $row['title']; ?>  </td>
                            <td> <?php echo $row['description']; ?>  </td>

                            <td>
                              <img src="images/<?php echo $row['imagee']; ?>" alt="image" />

                            </td>

                            <td>

                              <a href="editevent.php?i=<?php echo $row['id']; ?>" class="btn btn-sm btn-primary btn-icon-text"> <i class="mdi mdi-border-color btn-icon-append"></i>
                              </a>
                              <br><br>
                              <a href="deleteevent.php?d=<?php echo $row['id']; ?>" class="btn btn-sm btn-danger btn-icon-text"> <i class="mdi mdi-content-cut btn-icon-append"></i>
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
