<?php include("top.php"); ?>
<?php

if(isset($_GET['d'])){

$delete_id = $_GET['d'];

$delete_box = "delete from course where id='$delete_id'";

$run_delete = mysqli_query($con,$delete_box);

if($run_delete){



echo "<script>window.open('viewcourses.php','_self')</script>";

}


}


?>
