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
                      <h4 class="card-title">Add Event</h4>

                      <form action="" method="POST" enctype="multipart/form-data">



                        <div class="form-group">
                          <label for="exampleInputName1">Event day</label>
                          <input type="text" name="day" class="form-control" id="exampleInputName1" placeholder="Write your Event day like 22">
                        </div>


<br>
<div class="form-group">
<label for="monthSelect">Select a Month:</label>
<select class="form-control" name="month" id="monthSelect">
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
</select>
</div>
<br>

                        <div class="form-group">
                          <label for="exampleInputName1">Event title</label>
                          <input type="text" name="title" class="form-control" id="exampleInputName1" placeholder="Write event title here">
                        </div>

                        <br>

                                                <div class="form-group">
                                                  <label for="exampleInputName1">Event Description</label>
                                                  <input type="text" name="description" class="form-control" id="exampleInputName1" placeholder="Write event description here">
                                                </div>





<br>

                        <div class="form-group">
                          <label for="exampleInputName1">Event Image</label>
                        <input class="form-control"  type="file" name="image" value="">
                        </div>

<center>
                        <button type="submit" name="submit" value="submit" class="btn btn-primary mr-2">Submit</button>
</center>
                      </form>
                    </div>
                </div>
              </div>
            </div>


          </div>







<?php




if (isset($_POST['submit'])) {

 $a = $_POST['day'];

 $b = $_POST['month'];

$c = $_POST['title'];

$d = $_POST['description'];



$f = $_FILES['image']['name'];

$temp_name = $_FILES['image']['tmp_name'];

move_uploaded_file($temp_name,"images/$f");

$query = "INSERT INTO events(day, month, title, description, imagee) VALUES('$a','$b','$c','$d','$f')";

$run = $con -> query($query);

echo "<script> window.open('viewevent.php','_self') </script>";










}













 ?>



















        <?php include("footer.php") ?>
