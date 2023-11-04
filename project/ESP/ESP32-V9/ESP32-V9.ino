int Device_ON_Sound = 4;
int Device_OFF_Sound = 7;
int SUCCESS_Rep_Sound = 1;
int FAILURE_Rep_Sound = 2;
int Rest_Page_Sound = 8;
int Countdown_Page_Sound = 3;
int Counter_Page_Sound = 3;
int Result_Page_Sound = 5;

int O1_Upper_distance = 30, O1_Lower_distance = 5;//cm
int O2_Upper_distance = 35, O2_Lower_distance = 5;
int O3_Upper_distance = 40, O3_Lower_distance = 5;
int O4_Upper_distance = 45, O4_Lower_distance = 5;
int O5_Upper_distance = 50, O5_Lower_distance = 5;

// ---- Include Libraries ----
#include "Arduino.h"
#include <Adafruit_NeoPixel.h>
#include "DFRobotDFPlayerMini.h"
#include "NewPing.h"

// Hook up HC-SR04 with Trig to Arduino Pin 9, Echo to Arduino pin 10
#define TRIGGER_PIN 32
#define ECHO_PIN 33

// Maximum distance we want to ping for (in centimeters).
#define MAX_DISTANCE 400
#define WAVE_THRESHOLD 20  // Adjust based on your environment and sensor placement
#define DEBOUNCE_DELAY 200  // Time to wait before considering another wave
#define BTN_PIN 25

// NewPing setup of pins and maximum distance.
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);
DFRobotDFPlayerMini myDFPlayer;


// ---- Define NeoPixel LED Strip ----
#define PIN_WS2812B  23   // ESP32 pin that connects to WS2812B
#define NUM_PIXELS     12  // The number of LEDs (pixels) on WS2812B

Adafruit_NeoPixel ws2812b(NUM_PIXELS, PIN_WS2812B, NEO_GRB + NEO_KHZ800);

// ---- Define Pin Constants ----
const int Btn = 25;

// ---- Objects and Variables ----
float duration, distance;
int limit = 1;
int Lower_limit, Upper_limit;
bool Start = false, flag_L = false, flag_U = false, U = false, L = false, mid_U = false, mid_L = false;
int REPS, range;
bool flagBtn = true;
unsigned long prevmlsBtn;
short result = -1;

unsigned long startTime = millis();
unsigned long targetTime = startTime + 2000; // 2 seconds in milliseconds
unsigned long targetTime1 = startTime + 5000; // 5 seconds in milliseconds
unsigned long previousMillis = 0;
const unsigned long interval = 50;  // Interval in milliseconds

int Max_distance = 200;
int Min_distance = 3;

int Reps_Count = 0;
int Failed_Reps = 0;
int Total_Reps = 0;
int Reps_Goal = 100;

int Set1 = 0, Set2 = 0, Set3 = 0;
char Data;
bool Set_Btn = false;
bool screen_start = false;
bool lock_1 = false;
bool HeightSys = false;
bool lock_2 = true;

// Variables for time settings
unsigned int goalMinutes = 0;
unsigned int goalSeconds = 0;
const unsigned int predefinedMinutes = 1;
const unsigned int predefinedSeconds = 15;
unsigned int secondaryMinutes = 0;
unsigned int secondarySeconds = 0;
const int maxLaps = 100; // Maximum number of laps
unsigned int lapTimesMinutes[maxLaps] = {0}; // Array to store minutes for each lap
unsigned int lapTimesSeconds[maxLaps] = {0}; // Array to store seconds for each lap
unsigned int numLaps = 0;
const unsigned int predefinedNumLaps = 12;
unsigned int currentLap = 0;
unsigned int elapsedMinutes ;
unsigned int elapsedSeconds ;
unsigned long elapsedTime ;
int PaceOn;
int PaceOff;
unsigned int LastlapTimeInSeconds;

// Button state variables
bool buttonPressed = false;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;

// State variable to track which function to execute
int state = 0;

// Flags to control the process flow
bool startProcessW = false;
bool startProcessJ = false;

// Variables to detect hand wave
unsigned long lastWaveTime = 0;
bool handWaveDetected = false;
bool handWave_Btn = false;

// Timer variables
unsigned long startTimeW = 0;
unsigned long lastUpdateTime = 0; // To track the last update time for 1-second intervals
bool timerRunning = false;
unsigned int intervalW = 0;

unsigned int getDistanceToLaps() {
  unsigned int distance = getDistance();
  if (distance <= 4) {
    return 1;
  } else if (distance <= 8) {
    return 2;
  } else if (distance <= 12) {
    return 3;
  } else if (distance <= 16) {
    return 4;
  } else if (distance <= 20) {
    return 5;
  } else if (distance <= 24) {
    return 6;
  } else if (distance <= 28) {
    return 7;
  } else if (distance <= 32) {
    return 8;
  } else if (distance <= 36) {
    return 9;
  } else if (distance <= 40) {
    return 10;
  } else if (distance <= 44) {
    return 11;
  } else if (distance <= 48) {
    return 12;
  } else if (distance <= 52) {
    return 13;
  } else if (distance <= 56) {
    return 14;
  } else if (distance <= 60) {
    return 15;
  } else if (distance <= 74) {
    return 16;
  } else if (distance <= 78) {
    return 17;
  } else if (distance <= 82) {
    return 18;
  } else if (distance <= 86) {
    return 19;
  } else if (distance <= 90) {
    return 20;
  } else if (distance <= 94) {
    return 21;
  } else if (distance <= 98) {
    return 22;
  } else if (distance <= 102) {
    return 23;
  } else if (distance <= 106) {
    return 24;
  }else if (distance <= 110) {
    return 25;
  } 
  else {
    return 50;  // Default or error value
  }
}

unsigned int getDistanceToMinutes() {
  unsigned int distance = getDistance();
  if (distance <= 10) {
    return 0;
  } else if (distance <= 20) {
    return 1;
  } else if (distance <= 30) {
    return 2;
  } else if (distance <= 40) {
    return 3;
  } else if (distance <= 50) {
    return 4;
  } else if (distance <= 60) {
    return 5;
  } else if (distance <= 70) {
    return 6;
  } else if (distance <= 80) {
    return 7;
  } else if (distance <= 90) {
    return 8;
  } else if (distance <= 100) {
    return 9;
  }
  else {
    return 10;  // Default or error value
  }
}

unsigned int getDistanceToSeconds() {
  unsigned int distance = getDistance();
  if (distance <= 10) {
    return 0;
  } else if (distance <= 20) {
    return 5;
  } else if (distance <= 30) {
    return 10;
  } else if (distance <= 40) {
    return 15;
  } else if (distance <= 50) {
    return 20;
  } else if (distance <= 60) {
    return 25;
  } else if (distance <= 70) {
    return 30;
  } else if (distance <= 80) {
    return 35;
  } else if (distance <= 90) {
    return 40;
  } else if (distance <= 100) {
    return 45;
  } else if (distance <= 110) {
    return 50;
  } else if (distance <= 120) {
    return 55;
  } else {
    return 0;  // Default or error value
  }
}


// ---- Function Prototypes ----
void setup();
void loop();
void Read_Serial();
void Nextion(int dist, int Ulimit, int Llimit, int reps, int failed_reps, int total_reps);
void Read_Button();
void Get_Distance();
void Rest_page();
void setColor(int red, int green, int blue);


void setup()  // Start of setup:
{
  // ---- Initialize Serial Communication ----
  Serial.begin(9600);  // Begin serial communication.
  ws2812b.begin(); // INITIALIZE WS2812B strip object (REQUIRED)
  ws2812b.clear();

  delay(1000);  // We sometimes take several readings of the period to average. Since we don't have any readings
  // stored we need a high enough value in micros() so if divided is not going to give negative values.
  // The delay allows the micros() to be high enough for the first few cycles.

  // Nextion 2.4" Basic Display:
  // I am going to change the Serial baud to a faster rate (optional):
  //Serial.print("baud=115200");  // Set new baud rate of nextion to 115200, but is temporal. Next time nextion is
  // power on, it will restore to default baud of 9600.
  // To take effect, make sure to reboot the arduino (resetting arduino is not enough).
  // If you want to change the default baud, send the command as "bauds=115200", instead of "baud=115200".
  // If you change default, everytime the nextion is power on is going to have that baud rate.
  Serial.write(0xff);           // We always have to send this three lines after each command sent to nextion.
  Serial.write(0xff);
  Serial.write(0xff);
  //Serial.end();          // End the serial communication of baud=9600.
  //Serial.begin(115200);  // Start serial communication at baud=115200.

  Serial2.begin(9600);

  // ---- Set Pin Modes ----
  pinMode(Btn, INPUT_PULLUP);

    Serial.println();
    Serial.println(F("DFRobot DFPlayer Mini Demo"));
    Serial.println(F("Initializing DFPlayer ... (May take 3~5 seconds)"));
    if (!myDFPlayer.begin(Serial2)) {  //Use softwareSerial to communicate with mp3.
      Serial.println(F("Unable to begin:"));
      Serial.println(F("1.Please recheck the connection!"));
      Serial.println(F("2.Please insert the SD card!"));
  //    while (true) {
  //      delay(0);  // Code to compatible with ESP8266 watch dog.
  //    }
      Serial.println(F("DFPlayer Mini online."));
  
      myDFPlayer.volume(30);  //Set volume value. From 0 to 30
    }
}  // End of setup.





void loop()  // Start of loop:
{
  startTime = millis();
  unsigned long currentMillis = millis();
  targetTime = startTime + 2000;
  targetTime1 = startTime + 5000;
  
  Read_Serial();
  if(!startProcessW)
  Read_Button();
  if(startProcessJ){
  
  Get_Distance();
  if (Start == true && millis() - previousMillis > 200)
  { Nextion();
    //Serial.print("In nection");
    previousMillis = millis();
  }
  }

    if (startProcessW) {
    // Process for setting the time and laps
    if (handWave_Btn) {
  detectHandWave();
  if (handWaveDetected) {
      lapTimesMinutes[currentLap] = secondaryMinutes;
      lapTimesSeconds[currentLap] = secondarySeconds;
      updateLapDisplay();
      currentLap++;

      if(currentLap == numLaps)
      {timerRunning = false;
      Serial.print("page 14");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
      state = 5;}
      //Serial.print("Current Lap: ");
      //Serial.println(currentLap);
      if(state == 4)
      {
      Serial.print("n4.val=");
      Serial.print(currentLap);
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
      secondaryMinutes = 0;
      secondarySeconds = 0;

      // Check pace after completing a lap
      checkPace();
      }
    // Reset the flag
    handWaveDetected = false;
  }
  }
  else {
  handleSetLapsAndTimeProcess();
  }
    
  }
 

  if (state == 4 && !timerRunning) {
    startTimer();
  }

  if (timerRunning) {
    checkTimer();
  }
  if(state == 5)
  {   Serial.print("t0");
      Serial.print(".txt=\"Lap : ");
      Serial.print(currentLap);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      
      for (int i = 0; i < currentLap; i++) {
      unsigned long lapTimeInSeconds = lapTimesMinutes[i] * 60 + lapTimesSeconds[i];
       if(lapTimeInSeconds < interval)
         {
          PaceOn++;
         }else {
          PaceOff++;
         }
        if(LastlapTimeInSeconds == 0)
        LastlapTimeInSeconds = lapTimeInSeconds;

        if(LastlapTimeInSeconds > lapTimeInSeconds)
        {
          LastlapTimeInSeconds = lapTimeInSeconds;
        }
      }
      Serial.print("t1");
      Serial.print(".txt=\"ON Pace : ");
      Serial.print(PaceOn);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("t2");
      Serial.print(".txt=\"OFF Pace : ");
      Serial.print(PaceOff);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      PaceOn  = 0 ;
      PaceOff = 0 ;

      Serial.print("t3");
      Serial.print(".txt=\"Best Time : ");
      Serial.print(LastlapTimeInSeconds);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("t4");
      Serial.print(".txt=\"Total Time : ");
      Serial.print(elapsedMinutes);
      Serial.print(" : ");
      Serial.print(elapsedSeconds);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      unsigned int Total_Time = (elapsedTime / 1000);
      unsigned int avg_time = Total_Time/currentLap;

      Serial.print("t5");
      Serial.print(".txt=\"Avg Time : ");
      Serial.print(avg_time);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

  }
}  // End of loop.

// Function to read serial data
void Read_Serial() {
  if (Serial.available() > 0)  // If data is available from serial communication
  {
    char Data = Serial.read();  // Read a character from serial port
    //Serial.println(Data);       // Write the character to the serial monitor
    sendData(Data);             // Call function to process the received data
  }
}

void sendData(char data_from_display) {
  if (data_from_display == 'W') { // Perform actions based on received data
      startProcessW = true;
      startProcessJ = false;
      Serial.print("page 13");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
      state = 0;
    } else if (data_from_display == 'J') {
      startProcessW = false;
      startProcessJ = true;
    } 
    if(startProcessW){
     if (data_from_display == 'Q') {
      if (state == 0) {
        numLaps = predefinedNumLaps;
        Serial.print("page 11");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        state = 1;
      } else {
        goalMinutes = predefinedMinutes;
        goalSeconds = predefinedSeconds;
        Serial.print("page 12");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        state = 3;
      }
    } else if (data_from_display == 'E' && state == 4) {
      //Serial.print("Goal reached manually with E.");
      timerRunning = false;
      Serial.print("page 14");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
      state = 5;
    }else if (data_from_display == 'H') {
        handWave_Btn =! handWave_Btn;
        if(handWave_Btn)
        {
        Serial.print("b1.txt=\"Button\"");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        }else {
        Serial.print("b1.txt=\"HandWave\"");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        }
    }
    else if (data_from_display == 'R') {
     state=0;
     startProcessW = false;
     startProcessJ = false;
     handWave_Btn = false;
     Serial.print("page 0");
     Serial.write(0xff);
     Serial.write(0xff);
     Serial.write(0xff);
    }
    }

  if(startProcessJ){

  if (data_from_display == 'A') {
    Lower_limit = O1_Lower_distance;
    flag_L = true;
    Upper_limit = O1_Upper_distance;
    limit = 2;
    lock_1 = true;
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    flag_U = true;

    lock_1 = true;
    flag_U = true;

  }

  if (data_from_display == 'B') {
    Lower_limit = O2_Lower_distance;
    flag_L = true;
    Upper_limit = O2_Upper_distance;
    limit = 2;
    lock_1 = true;
    flag_U = true;
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
  }

  if (data_from_display == 'C') {
    Lower_limit = O3_Lower_distance;
    flag_L = true;
    Upper_limit = O3_Upper_distance;
    limit = 2;
    lock_1 = true;
    flag_U = true;
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
  }

  if (data_from_display == 'D') {
    Lower_limit = O4_Lower_distance;
    flag_L = true;
    Upper_limit = O4_Upper_distance;
    limit = 2;
    lock_1 = true;
    flag_U = true;
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
  }

  if (data_from_display == 'E') {
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    Lower_limit = O5_Lower_distance;
    flag_L = true;
    Upper_limit = O5_Upper_distance;
    limit = 2;
    lock_1 = true;
    flag_U = true;
  }
  if (data_from_display == 'R') {
    REPS = 0;
    Reps_Count = 0;
    Failed_Reps = 0;
    Total_Reps = 0;
    Set1 = 0;
    Set2 = 0;
    Set3 = 0;
    limit = 2;
    flag_L = true;
    lock_1 = true;
    flag_U = true;
    lock_2 = true;
    data_from_display = 'S';
  }
  if (data_from_display == 'S') {
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.print("page 3");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    myDFPlayer.play(Countdown_Page_Sound);
    startTime = millis();
    targetTime = startTime + 2000;
    targetTime1 = startTime + 5000;
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    while (millis() < targetTime1) {
    }
    Serial.print("page 4");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n7.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Set1);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n8.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Set2);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n9.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Set3);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    myDFPlayer.play(Counter_Page_Sound);
    lock_1 = false;
    screen_start = true;
    flag_U = true;
  }
  if (data_from_display == 'Z') {
    HeightSys = true;
  }
  if (data_from_display == 'Y') {
    HeightSys = false;
  }
  }

}

void Nextion() {
  int Dis1 = map(distance, Min_distance, Max_distance, 0, 100);

  if (screen_start == false && HeightSys == false) {
    Serial.write(0xff);  // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("j0.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Dis1);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("j1.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Dis1);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);


    Serial.print("n0.val=");      // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print((int)distance);  // Send remaped value.
    Serial.write(0xff);           // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n5.val=");    // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Upper_limit);  // Send remaped value.
    Serial.write(0xff);         // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n6.val=");    // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Lower_limit);  // Send remaped value.
    Serial.write(0xff);         // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
  }
  if (lock_1 == true && flag_U == true && lock_2 == true) {
    startTime = millis();
    targetTime = startTime + 2000;
    targetTime1 = startTime + 5000;
    while (millis() < targetTime) {

    }
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("page 3");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    myDFPlayer.play(Countdown_Page_Sound);
    startTime = millis();
    targetTime = startTime + 2000;
    targetTime1 = startTime + 5000;
    while (millis() < targetTime1) {
    }
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("page 4");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.print("n7.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Set1);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n8.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Set2);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n9.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Set3);       // Send remaped value.
    Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
     myDFPlayer.play(Counter_Page_Sound);
    lock_1 = false;
    screen_start = true;
  }
  if (screen_start == true && lock_1 == false) {

    Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n1.val=");   // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Reps_Count);  // Send remaped value.
    Serial.write(0xff);        // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n2.val=");    // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Failed_Reps);  // Send remaped value.
    Serial.write(0xff);         // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n5.val=");   // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
    Serial.print(Total_Reps);  // Send remaped value.
    Serial.write(0xff);        // We always have to send this three lines after each command sent to the nextion display.
    Serial.write(0xff);
    Serial.write(0xff);
  }
  //-----------------------------------------------------------
}


void Read_Button() {
  result = Btn_state();

  if (result == 1) {
    if (Start != true) {
      Start = true;
      limit = 0;
      myDFPlayer.play(Device_ON_Sound);  // change the number 0 with Device ON track number
      Serial.println("\tDevice ON!\t");
      Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);
    } else if (limit == 0 && HeightSys == false) {
      Lower_limit = distance;
      limit = 1;
      flag_L = true;
      //Serial.println((String) "Lower Limit Set to :" + Lower_limit);
      // delay(1000);
      Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);
    }

    else if (limit == 1 && HeightSys == false) {
      Upper_limit = distance;
      limit = 2;
      lock_1 = true;
      flag_U = true;
      //Serial.println((String) "Upper Limit Set to :" + Upper_limit);

    } else if (limit == 2) {
      if (Set2 != 0)
        limit = 3;
      Set_Btn = true;  //---------------------Bool For set variables in line 324
      //delay(1000);
    } else if (limit == 3) {
      lock_1 = true;
      lock_2 = false;
      Serial.print("page 5");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
      Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n1.val=");   // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
      Serial.print(Reps_Count);  // Send remaped value.
      Serial.write(0xff);        // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n2.val=");    // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
      Serial.print(Failed_Reps);  // Send remaped value.
      Serial.write(0xff);         // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n5.val=");   // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
      Serial.print(Total_Reps);  // Send remaped value.
      Serial.write(0xff);        // We always have to send this three lines after each command sent to the nextion display.
      Serial.write(0xff);
      Serial.write(0xff);
      limit = 0;
      myDFPlayer.play(Result_Page_Sound);  // change the number 0 with page 5 track number
    }

  } else if (result == -1) {
    Start = false;
    Serial.println("\tDevice OFF!\t");
    myDFPlayer.play(Device_OFF_Sound);  // change the number 0 with Device Off track number
  }
}

int Btn_state() {
  int state = 0;
  if (digitalRead(Btn) == LOW && flagBtn == true) {
    flagBtn = false;
    prevmlsBtn = millis();

  } else if (digitalRead(Btn) == HIGH && flagBtn == false) {
    flagBtn = true;

    if (millis() - prevmlsBtn < 1000) {
      state = 1;
    } else if (millis() - prevmlsBtn < 2000) {
      state = -1;
    }
  }
  return state;
}



void Get_Distance() {
  if (Start == true) {
    distance = sonar.ping_cm();
    delay(10);
    //-----------------------Receiving command from Screen------------------

    if (flag_L == true && flag_U == true && lock_1 == false &&  lock_2 == true) {
      delay(10);
      if (distance > Upper_limit) {

        if (U == false) {
          U = true;
          mid_U = false;
          mid_L = false;
        }
        if (L == true) {
          L = false;
          mid_U = false;
          mid_L = false;
          REPS++;
          //Serial.print((String) " SUCCESS ");
           myDFPlayer.play(SUCCESS_Rep_Sound);
          Reps_Count++;
          Total_Reps++;
          setColor(0, 255, 0);
          Serial.print("p5.pic=1");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
          Serial.write(0xff);        // We always have to send this three lines after each command sent to the nextion display.
          Serial.write(0xff);
          Serial.write(0xff);
        }  //------------------Success sound

        if (U == true && mid_U == true) {
          mid_L = false;
          mid_U = false;
          // Serial.print((String) "Upper FAILURE ");
          myDFPlayer.play(FAILURE_Rep_Sound);
          Failed_Reps++;
          Total_Reps++;
          setColor(255, 0, 0);
          Serial.print("p5.pic=2");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
          Serial.write(0xff);        // We always have to send this three lines after each command sent to the nextion display.
          Serial.write(0xff);
          Serial.write(0xff);
        }  //------------------Failure sound
      }

      else if (distance < Lower_limit) {
        if (mid_L == true) {
          //Serial.print((String) " Lower FAILURE ");
          //myDFPlayer.play(1);
          mid_L = false;
          mid_U = false;
        }

        if (U == true) {
          U = false;
          mid_L = false;
          mid_U = false;
        }

        if (L == false) {
          L = true;
          mid_L = false;
          mid_U = false;
        }
      }

      range = Upper_limit - Lower_limit;

      if ((distance > ((range / 4) + Lower_limit)) && L == true)
        mid_L = true;

      if ((distance < (Upper_limit - (range / 4))) && U == true)
        mid_U = true;
    }

    if (flag_L == true && flag_U == true && Set_Btn == true) {
      Set_Btn = false;
      if (Set1 == 0) {
        Set1 = REPS;
        Serial.print("n7.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
        Serial.print(Set1);       // Send remaped value.
        Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
        Serial.write(0xff);
        Serial.write(0xff);
        delay(2000);
        Rest_page();
      } else if (Set2 == 0) {
        Set2 = REPS - Set1;
        Serial.print("n7.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
        Serial.print(Set1);       // Send remaped value.
        Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
        Serial.write(0xff);
        Serial.write(0xff);

        Serial.print("n8.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
        Serial.print(Set2);       // Send remaped value.
        Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
        Serial.write(0xff);
        Serial.write(0xff);
        delay(2000);
        Rest_page();
      } else if (Set3 == 0) {
        Set3 = REPS - (Set1 + Set2);
        Serial.print("n7.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
        Serial.print(Set1);       // Send remaped value.
        Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
        Serial.write(0xff);
        Serial.write(0xff);

        Serial.print("n8.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
        Serial.print(Set2);       // Send remaped value.
        Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
        Serial.write(0xff);
        Serial.write(0xff);

        Serial.print("n9.val=");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
        Serial.print(Set3);       // Send remaped value.
        Serial.write(0xff);       // We always have to send this three lines after each command sent to the nextion display.
        Serial.write(0xff);
        Serial.write(0xff);

        lock_2 = false;
        delay(2000);
        //Rest_page();
      }
    }
  }
}

void Rest_page() {
  flag_U = false;
  screen_start = false;
  Serial.print("page 8");  // This is sent to the nextion display to set what object name (before the dot) and what atribute (after the dot) are you going to change.
  Serial.write(0xff);      // We always have to send this three lines after each command sent to the nextion display.
  Serial.write(0xff);
  Serial.write(0xff);
  myDFPlayer.play(Rest_Page_Sound);
}

void setColor(int red, int green, int blue) {
  for (int pixel = 0; pixel < NUM_PIXELS; pixel++) {
    ws2812b.setPixelColor(pixel, ws2812b.Color(red, green, blue));
  }
  ws2812b.show();
}


void handleSetLapsAndTimeProcess() {
  // Check for button press
  int buttonState = digitalRead(BTN_PIN);
  if (buttonState == LOW && !buttonPressed && (millis() - lastDebounceTime > debounceDelay)) {
    buttonPressed = true;
    lastDebounceTime = millis();
    if (state == 0) {
        Serial.print("page 11");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
      }
    if (state != 4) {
      state = (state + 1) % 5;  // Cycle through states 0, 1, 2, 3, 4
    } else {
      
      lapTimesMinutes[currentLap] = secondaryMinutes;
      lapTimesSeconds[currentLap] = secondarySeconds;
      updateLapDisplay();
      currentLap++;

      if(currentLap == numLaps)
      {timerRunning = false;
      Serial.print("page 14");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
      state = 5;}
      //Serial.print("Current Lap: ");
      //Serial.println(currentLap);
      if(state == 4)
      {
      Serial.print("n4.val=");
      Serial.print(currentLap);
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
      secondaryMinutes = 0;
      secondarySeconds = 0;

      // Check pace after completing a lap
      checkPace();
      }

      if (currentLap >= numLaps) {
        Serial.println("All laps completed!");
        state = 5;
      }
    }
    
  } else if (buttonState == HIGH) {
    buttonPressed = false;
  }

  // Perform actions based on the current state
  if (state == 0) {
    setNumLaps();
  } else if (state == 1) {
    action1();
  } else if (state == 2) {
    action2();
  } else if (state == 3) {
    action3();
  }
}

void setNumLaps() {
  numLaps = getDistanceToLaps();  // Mapping distance to laps
  Serial.print("n2.val=");
  Serial.print(numLaps);
  Serial.write(0xff);
  Serial.write(0xff);
  Serial.write(0xff);
}

void action1() {
  goalMinutes = getDistanceToMinutes();  // Mapping distance to minutes
    Serial.print("n0.val=");
    Serial.print(goalMinutes);
    Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n1.val=");
    Serial.print(goalSeconds);
    Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
    Serial.write(0xff);
    Serial.write(0xff);
}

void action2() {
  goalSeconds = getDistanceToSeconds();  // Mapping distance to seconds
    Serial.print("n0.val=");
    Serial.print(goalMinutes);
    Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
    Serial.write(0xff);
    Serial.write(0xff);

    Serial.print("n1.val=");
    Serial.print(goalSeconds);
    Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
    Serial.write(0xff);
    Serial.write(0xff);
}

void action3() {
  Serial.print("page 12");
  Serial.write(0xff);
  Serial.write(0xff);
  Serial.write(0xff);

  Serial.print("n0.val=");
  Serial.print(goalMinutes);
  Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
  Serial.write(0xff);
  Serial.write(0xff);

  Serial.print("n1.val=");
  Serial.print(goalSeconds);
  Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
  Serial.write(0xff);
  Serial.write(0xff);

  Serial.print("n2.val=");
  Serial.print(numLaps);
  Serial.write(0xff);
  Serial.write(0xff);
  Serial.write(0xff);

  delay(20);

  for (;;) {
    if (Serial.available() > 0) {
      char receivedChar = Serial.read();
      if (receivedChar == 'C') {
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);

        Serial.print("page 15");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        state = 4;
        currentLap = 0;  // Reset current lap counter
        delay(5000);
        Serial.print("page 9");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        updateLapDisplay();
        break;
      } else if (receivedChar == 'L') {
        startProcessW = false;
        startProcessJ = false;
        Serial.print("page 10");
        Serial.write(0xff);
        Serial.write(0xff);
        Serial.write(0xff);
        state = 0;
        break;
      }
    }
  }
}

unsigned int getDistance() {
  unsigned int duration = sonar.ping();
  unsigned int distance = duration / US_ROUNDTRIP_CM;
  return distance;
}

void startTimer() {
  startTimeW = millis();
  lastUpdateTime = startTimeW;
  timerRunning = true;
  secondaryMinutes = 0;
  secondarySeconds = 0;
  intervalW = (goalMinutes * 60 + goalSeconds) / numLaps;
}

void checkTimer() {
  unsigned long currentTime = millis();
   elapsedTime = currentTime - startTimeW;

   elapsedMinutes = (elapsedTime / 1000) / 60;
   elapsedSeconds = (elapsedTime / 1000) % 60;

  // Update only if one second has passed
  if (currentTime - lastUpdateTime >= 1000) {
    lastUpdateTime = currentTime;

    secondarySeconds++;
    if (secondarySeconds == 60) {
      secondaryMinutes++;
      secondarySeconds = 0;
    }

    if (elapsedMinutes >= goalMinutes && elapsedSeconds >= goalSeconds) {
      //Serial.println("Goal time reached!");
      //timerRunning = false; // Stop the timer
      //state = 5; 
      // Do any additional actions when the timer is up
      Serial.print("n0.val=");
      Serial.print(elapsedMinutes);
      Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n1.val=");
      Serial.print(elapsedSeconds);
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n2.val=");
      Serial.print(secondaryMinutes);
      Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n3.val=");
      Serial.print(secondarySeconds);
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
    } else {
      Serial.print("n0.val=");
      Serial.print(elapsedMinutes);
      Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n1.val=");
      Serial.print(elapsedSeconds);
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n2.val=");
      Serial.print(secondaryMinutes);
      Serial.write(0xff);  // Send these three lines after each command sent to the Nextion display
      Serial.write(0xff);
      Serial.write(0xff);

      Serial.print("n3.val=");
      Serial.print(secondarySeconds);
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);
    }
  }
}

void checkPace() {
  unsigned long currentTime = millis();
  unsigned long elapsedTime = (currentTime - startTimeW) / 1000;  // Elapsed time in seconds
  unsigned int paceGoal = intervalW * currentLap;

  if (elapsedTime <= paceGoal) {
    Serial.print("t5.txt=\"On Pace\"");
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.print("t5.pco=2016");
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.write(0xff);
    setColor(0, 255, 0);
  } else {
    Serial.print("t5.txt=\"Off Pace\"");
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.print("t5.pco=63488");
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.write(0xff);
    setColor(255, 0, 0);
  }
}

void updateLapDisplay() {
  // Determine the start and end lap numbers for the current set of 5 laps
  unsigned int startLap = (currentLap / 5) * 5 + 1;
  unsigned int endLap = startLap + 4;

  // Update the display with the current set of 5 laps
  for (int i = 0; i < 5; i++) {
    unsigned int lapNumber = startLap + i;
      Serial.print("t");
      Serial.print(i);
      Serial.print(".txt=\"Lap ");
      Serial.print(lapNumber);
      Serial.print(": ");
      Serial.print(lapTimesMinutes[lapNumber - 1]);
      Serial.print(":");
      Serial.print(lapTimesSeconds[lapNumber - 1]);
      Serial.print("\"");
      Serial.write(0xff);
      Serial.write(0xff);
      Serial.write(0xff);

      if (isLapOnPace(lapNumber - 1)) {
        // Set text box color to green for "on pace"
        Serial.print("t");
        Serial.print(i);
        Serial.print(".bco=2016");
      } else {
        // Set text box color to red for "off pace"
        Serial.print("t");
        Serial.print(i);
        Serial.print(".bco=63488");
      }
    Serial.write(0xff);
    Serial.write(0xff);
    Serial.write(0xff);
  }
}

// Function to check if a lap is on pace
bool isLapOnPace(int lapIndex) {
  unsigned int paceGoal = intervalW * currentLap;
  unsigned long lapTimeInSeconds = lapTimesMinutes[lapIndex] * 60 + lapTimesSeconds[lapIndex];
  return lapTimeInSeconds <= intervalW;
}

void detectHandWave() {
  static unsigned int previousDistance = MAX_DISTANCE;
  unsigned int currentDistance = getDistance();
  unsigned long currentTime = millis();

  if (currentDistance < WAVE_THRESHOLD && abs((int)(currentDistance - previousDistance)) > 10) {
    if (currentTime - lastWaveTime > DEBOUNCE_DELAY) {
      handWaveDetected = true;
      lastWaveTime = currentTime;
    }
  }

  previousDistance = currentDistance;
}
