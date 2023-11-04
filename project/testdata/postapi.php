<?php
// Include database connection
include 'config.php';

// Set header for JSON response
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data
    $json = file_get_contents('php://input');

    // Decode the JSON data
    $data = json_decode($json, true);

    // Check if JSON decoding succeeded
    if ($data === null) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
        exit();
    }

    // Extract data from JSON
    $deviceid = $data['deviceid'] ?? '';
    $sensorOne = $data['sensorOne'] ?? '';
    $sensorTwo = $data['sensorTwo'] ?? '';
    $sensorThree = $data['sensorThree'] ?? '';
    $sensorFour = $data['sensorFour'] ?? '';

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO logs (deviceid, sensorOne, sensorTwo, sensorThree, sensorFour) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $deviceid, $sensorOne, $sensorTwo, $sensorThree, $sensorFour);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to insert data"]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
