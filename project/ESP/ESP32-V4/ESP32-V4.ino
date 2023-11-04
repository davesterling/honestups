 
#include "Arduino.h"
#include "SoftwareSerial.h"
#include "DFRobotDFPlayerMini.h"
SoftwareSerial mySoftwareSerial(27, 26); // RX, TX
DFRobotDFPlayerMini myDFPlayer;

const int trigPin = 32;
const int echoPin = 33;
const int Btn = 25;
float duration, distance; 
 
int limit=1;
int Lower_limit, Upper_limit;
bool Start=false,flag_L=false,flag_U=false,U=false,L=false,mid=false;
int REPS,range;
bool flagBtn=true;
unsigned long prevmlsBtn;
short result = -1;

void setup() {
  Serial.begin(9600); 
  mySoftwareSerial.begin(9600); 
  Serial2.begin(9600); 
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(Btn, INPUT_PULLUP);
  
  Serial.println();
  Serial.println(F("DFRobot DFPlayer Mini Demo"));
  Serial.println(F("Initializing DFPlayer ... (May take 3~5 seconds)"));
  
  if (!myDFPlayer.begin(Serial2)) {  //Use softwareSerial to communicate with mp3.
    Serial.println(F("Unable to begin:"));
    Serial.println(F("1.Please recheck the connection!"));
    Serial.println(F("2.Please insert the SD card!"));
    while(true){
      delay(0); // Code to compatible with ESP8266 watch dog.
    }
  }
  Serial.println(F("DFPlayer Mini online."));
   
   myDFPlayer.volume(30);  //Set volume value. From 0 to 30 

 
}

void loop() {   
   Read_Button();
   Get_Distance();
         
   delay(100);  
}

void Read_Button()
{       result = Btn_state();

        if (result == 1) {          
        if (Start!=true)
        {Start=true; limit=0;
        Serial.println("\tDevice ON!\t");} 
      else if (limit==0)
      {Lower_limit=distance;limit=1; flag_L=true;
        Serial.println((String)"Lower Limit Set to :"+Lower_limit); delay(1000);
      } 
      else if (limit==1)
      {Upper_limit=distance;limit=0; flag_U=true;
       Serial.println((String)"Upper Limit Set to :"+Upper_limit);  delay(1000);
      } }
      else if (result == -1) {
      Start=false;
      Serial.println("\tDevice OFF!\t");        
    } 
  }

int Btn_state()
{  int state=0;
  if (digitalRead(Btn)==LOW&&flagBtn==true)
   {flagBtn=false;
    prevmlsBtn=millis();
    
    }
  else if (digitalRead(Btn)==HIGH&&flagBtn==false)
   {flagBtn=true;
    
    if (millis()-prevmlsBtn<1000)
    {state=1;}
    else if (millis()-prevmlsBtn>2000)
    {state=-1;}    
    }
   return state; 
  
  }



void Get_Distance()
{ if (Start==true){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;
  Serial.print("Dist: ");
  Serial.print((int)distance);

  Serial.print((String)"   REPS :"+REPS+"   ");
  if (flag_L==true&&flag_U==true)
  {
    if (distance<Lower_limit)
     {if (L==false)
      {L=true; mid=false;}
      
      if (U==true)
      {U=false; mid=false;
       REPS++; Serial.print((String)" SUCCESS "); myDFPlayer.play(2);} //------------------Success sound
      
     if (L==true&&mid==true) 
      {mid=false; Serial.print((String)" FAILURE "); myDFPlayer.play(1);}  //------------------Failure sound
      }
    else if (distance>Upper_limit)  
    {
      if (L==true)
      {L=false; mid=false; }

      if (U==false)
      {U=true; mid=false; }      
      }
    range=Upper_limit-Lower_limit;
    
    if (distance>(range/2)+Lower_limit)
    mid=true;  
    
    

  }
  Serial.println(" ");
  } }

 
