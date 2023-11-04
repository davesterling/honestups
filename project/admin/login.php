<?php include("db.php") ?>
<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Honest Ups</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendors/css/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- End layout styles -->
    <link rel="shortcut icon" href="https://honestups.com/media/HU-Logo" />
  </head>
  <body>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="row w-100 m-0">
          <div class="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div class="card col-lg-4 mx-auto">
              <div class="card-body px-5 py-5">
                <center>
                <img src="https://honestups.com/media/HU-Logo" alt="Logo" style="height:100px;" class="img-fluid " style="margin-bottom:40px;">
              </center>
                <form action="" method="POST" enctype="multipart/form-data">
                  <div class="form-group">
                    <label>Username </label>
                    <input type="text" name="a" class="form-control p_input">
                  </div>
                  <div class="form-group">
                    <label>Password </label>
                    <input type="text" name="b" class="form-control p_input">
                  </div>
                  <div class="form-group d-flex align-items-center justify-content-between">


                  </div>
                  <div class="text-center">
                    <button type="submit" name="submit" value="submit" class="btn btn-primary btn-block enter-btn">Login</button>
                  </div>


                </form>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
        </div>
        <!-- row ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- plugins:js -->
    <script src="assets/vendors/js/vendor.bundle.base.js"></script>
    <!-- endinject -->
    <!-- Plugin js for this page -->
    <!-- End plugin js for this page -->
    <!-- inject:js -->
    <script src="assets/js/off-canvas.js"></script>
    <script src="assets/js/hoverable-collapse.js"></script>
    <script src="assets/js/misc.js"></script>
    <script src="assets/js/settings.js"></script>
    <script src="assets/js/todolist.js"></script>
    <!-- endinject -->
  </body>
</html>

<?php


if (isset($_POST['submit'])) {


$a = $_POST['a'];

$b = $_POST['b'];


$query = "SELECT * FROM user WHERE name = '$a' AND pass = '$b'";

$run = $con -> query($query);

$rowcount=mysqli_num_rows($run);


if ($rowcount == "1") {

$_SESSION["admin"] = $a;
header("Location: index.php");

}else {



}







}













 ?>
