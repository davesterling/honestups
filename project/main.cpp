#include <Arduino.h>

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char* ssid = "SCONET";
const char* password = "Kashmir786";

// Server URL
const char* serverName = "http://colibridatalogger.com/testdata/postapi.php";

// Sensor data variables
String deviceid = "123132";
int sensorOne = 11;
int sensorTwo = 22;
int sensorThree = 33;
int sensorFour = 44;

// Function to send HTTP POST request
void postData() {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Create JSON object
    StaticJsonDocument<200> doc;
    doc["deviceid"] = deviceid;
    doc["sensorOne"] = random(0,10);
    doc["sensorTwo"] = sensorTwo;
    doc["sensorThree"] = sensorThree;
    doc["sensorFour"] = sensorFour;

    // Serialize JSON to string
    String jsonData;
    serializeJson(doc, jsonData);
Serial.println(jsonData);
    // Specify content-type header
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    // Send HTTP POST request
    int httpResponseCode = http.POST(jsonData);

    // Check the returning code
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode); // Print return code
      Serial.println(response); // Print request response payload
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    // Free resources
    http.end();
  } else {
    Serial.println("Error in WiFi connection");
  }
}

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println(" connected!");
}

void loop() {
  // Post data every 5 seconds
  postData();
  delay(5000); // 5000 milliseconds delay
}
