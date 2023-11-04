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
                      <h4 class="card-title">Edit upcomming event</h4>




                      <?php


                      if (isset($_GET['i'])) {


                      $id = $_GET['i'];

                      if (isset($_POST['submit'])) {

                       $a = $_POST['a'];

                       $b = $_POST['b'];

                      $c = $_POST['c'];

                      $d = $_POST['d'];



                      $f = $_FILES['image']['name'];

                      $temp_name = $_FILES['image']['tmp_name'];

                      move_uploaded_file($temp_name,"images/$f");

                      $query = "UPDATE events SET day='$a',month='$b',title='$c',description='$d',imagee='$f' WHERE id='$id'";

                      $run = $con -> query($query);

                      echo "<script> window.open('viewevent.php','_self') </script>";










                      }












                      $select_orders = "select * from events WHERE id='$id'";

                      $run_orders = mysqli_query($con,$select_orders);


                      while($row = mysqli_fetch_array($run_orders)){












                       ?>





































                      <form action="" method="POST" enctype="multipart/form-data">



                        <div class="form-group">
                          <label for="exampleInputName1">Day</label>
                          <input type="text" value="<?php echo $row['day']; ?>" name="a" class="form-control" id="exampleInputName1" placeholder="Write your course title here">
                        </div>
<br>

<div class="form-group">
<label for="monthSelect">Select a Month:</label>
<select class="form-control" name="b" id="monthSelect">
<option value="Jan">Jan</option>
<option value="Feb">Feb</option>
<option value="Mar">Mar</option>
<option value="Apr">Apr</option>
<option value="May">May</option>
<option value="Jun">Jun</option>
<option value="Jul">Jul</option>
<option value="Aug">Aug</option>
<option value="Sep">Sep</option>
<option value="Oct">Oct</option>
<option value="Nov">Nov</option>
<option value="Dec">Dec</option>
<option selected value="<?php echo $row['month']; ?>"><?php echo $row['month']; ?></option>
</select>
</div>

<br>
                        <div class="form-group">
                          <label for="exampleInputName1">Title</label>
                          <input type="text" value="<?php echo $row['title']; ?>" name="c" class="form-control" id="exampleInputName1" placeholder="Write your course sale price here">
                        </div>
<br>

                        <div class="form-group">
                          <label for="exampleInputName1">Description</label>
                          <input type="text" value="<?php echo $row['description']; ?>" name="d" class="form-control" id="exampleInputName1" placeholder="Write no of total students here">
                        </div>

<br>


                        <div class="form-group">
                          <label for="exampleInputName1">Course Image</label>
                        <input class="form-control"   type="file" name="image" value="">
                        </div>

                        <?php           }  } ?>

<center>
                        <button type="submit" name="submit" value="submit" class="btn btn-primary mr-2">Submit</button>
</center>
                      </form>
                    </div>
                </div>
              </div>
            </div>


          </div>














        <?php include("footer.php") ?>
