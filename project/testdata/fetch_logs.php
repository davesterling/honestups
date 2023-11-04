<?php
// Include database connection
include 'config.php';

// Set header for JSON response
header('Content-Type: application/json');

// Query to fetch data from logs table
$sql = "SELECT * FROM logs";
$result = $conn->query($sql);

$logs = [];

if ($result->num_rows > 0) {
    // Fetch each row and add to the logs array
    while($row = $result->fetch_assoc()) {
        $logs[] = $row;
    }
}

// Output the logs as JSON
echo json_encode($logs);

// Close the database connection
$conn->close();
?>
