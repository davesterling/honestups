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
                      <h4 class="card-title">Add Course</h4>




                      <?php


                      if (isset($_GET['i'])) {


                      $id = $_GET['i'];

                      if (isset($_POST['submit'])) {

                       $a = $_POST['title'];

                       $b = $_POST['date'];

                      $c = $_POST['price'];

                      $d = $_POST['total'];

                      $e = $_POST['remaning'];

                      $f = $_FILES['image']['name'];

                      $temp_name = $_FILES['image']['tmp_name'];

                      move_uploaded_file($temp_name,"images/$f");

                      $query = "UPDATE course SET title='$a',enroll='$b',price='$c',totalstudent='$d',remaningseats='$e',imagee='$f' WHERE id='$id'";

                      $run = $con -> query($query);

                      echo "<script> window.open('viewcourses.php','_self') </script>";










                      }












                      $select_orders = "select * from course WHERE id='$id'";

                      $run_orders = mysqli_query($con,$select_orders);


                      while($row = mysqli_fetch_array($run_orders)){












                       ?>





































                      <form action="" method="POST" enctype="multipart/form-data">



                        <div class="form-group">
                          <label for="exampleInputName1">Course title</label>
                          <input type="text" value="<?php echo $row['title']; ?>" name="title" class="form-control" id="exampleInputName1" placeholder="Write your course title here">
                        </div>
<br>

                        <div class="form-group">
                          <label for="exampleInputName1">Last Enrollment Date</label>
                          <input type="date" value="<?php echo $row['enroll']; ?>" name="date" class="form-control" id="exampleInputName1" placeholder="Write your last enrollment date here">
                        </div>

<br>
                        <div class="form-group">
                          <label for="exampleInputName1">Course Price</label>
                          <input type="text" value="<?php echo $row['price']; ?>" name="price" class="form-control" id="exampleInputName1" placeholder="Write your course sale price here">
                        </div>
<br>

                        <div class="form-group">
                          <label for="exampleInputName1">Total students</label>
                          <input type="text" value="<?php echo $row['totalstudent']; ?>" name="total" class="form-control" id="exampleInputName1" placeholder="Write no of total students here">
                        </div>

<br>
                        <div class="form-group">
                          <label for="exampleInputName1">Remaning Seats</label>
                          <input type="text" value="<?php echo $row['remaningseats']; ?>" name="remaning" class="form-control" id="exampleInputName1" placeholder="Write no of total students here">
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
