<?php
include("db.php");
session_start();

if (isset($_POST['submit'])) {



$name = $_POST['name'];

$email = $_POST['email'];

$password = md5($_POST['password']);

$check = $_POST['check'];





$query = "SELECT * FROM users WHERE username = '$name' AND emaill = '$email'";

$run = $con -> query($query);

$rowcount=mysqli_num_rows($run);


if ($rowcount == "1") {



  $query = "SELECT * FROM users WHERE username = '$name' AND passwords = '$password'";

  $run = $con -> query($query);

  $rowcount2=mysqli_num_rows($run);


  if ($rowcount2 == "1") {


$_SESSION["admin"] = $name;
header("Location: index.php");




}else {



  $_SESSION["admin"] = $name;
  header("Location: index.php");



}



}else {


if ($check == "true") {


setcookie("user", "$name",time() + (86400 * 30),"/");

$query = "INSERT INTO users(username, emaill, passwords,yearr) VALUES('$name','$email','$password','$check')";

$run = $con -> query($query);




$_SESSION["admin"] = $name;
header("Location: index.php");

}else {


  $query = "INSERT INTO users(username, emaill, passwords,yearr) VALUES('$name','$email','$password','$check')";

  $run = $con -> query($query);




  $_SESSION["admin"] = $name;
  header("Location: index.php");




}














}
















}







 ?>
