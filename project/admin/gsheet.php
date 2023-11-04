<!DOCTYPE html>
<?php
session_start();

// Check if $_SESSION["admin"] is not set
if (!isset($_SESSION["admin"])) {
    // Redirect to the login page
    header("Location: login.php");
    exit; // Stop execution after redirection
}

// Continue with your code if $_SESSION["admin"] is set
?>

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
    <link rel="shortcut icon" href="https://honestups.com/media/HU-Logo" />
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
                    <h4 class="card-title text-primary">Google spread sheet</h4>

                  </center>
                    <div class="table-responsive">
                      <table class="table" >

                      </table>



                      <script>
      fetch('https://script.google.com/macros/s/AKfycbyNIJCGlZNop8tSsUI5zW33aSGOeWePEUHFh7myzdpWh1vEHqmTzuvCPejVqbAhHPJt/exec')
          .then(res => res.json())
          .then(data => {
              let uniqueRows = new Set(); // Initialize a Set to store unique rows
              let tr = data.content.reduce((prev, cur) => {
                  let rowStr = cur.join(""); // Join the row elements into a string
                  if (!uniqueRows.has(rowStr)) { // Check if the row is already in the Set
                      uniqueRows.add(rowStr); // Add the row to the Set
                      let td = cur.map(e => `<td>${e}</td>`);
                      return prev + `<tr>${td.join("")}</tr>`;
                  } else {
                      return prev; // Skip adding the row if it's already in the Set
                  }
              }, "\r");
              document.querySelector("table").innerHTML = tr;
          });
  </script>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
        <?php include("footer.php") ?>
