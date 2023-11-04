<?Php
$host_name = "localhost";
$database = "u669770046_testdb"; // Change your database name
$username = "u669770046_testuser";          // Your database user id 
$password = "#Test00998";          


//error_reporting(0);// With this no error reporting will be there
//////// Do not Edit below /////////

$conn = mysqli_connect($host_name, $username, $password, $database);

if (!$conn) {
    echo "Error: Unable to connect to MySQL.<br>";
    echo "<br>Debugging errno: " . mysqli_connect_errno();
    echo "<br>Debugging error: " . mysqli_connect_error();
    exit;
}
?>