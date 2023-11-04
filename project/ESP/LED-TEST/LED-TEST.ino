#include <Adafruit_NeoPixel.h>

#define LED_PIN    23 // GPIO 23 (D23) on ESP32
#define NUM_LEDS   7  // Number of LEDs in your strip

Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
}

void loop() {
  // Turn all LEDs red
  colorWipe(strip.Color(255, 0, 0), 50); // Red color, 50 ms delay
}

// Fill the dots one after the other with a color
void colorWipe(uint32_t color, int wait) {
  for(int i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, color);
    strip.show();
    delay(wait);
  }
}
