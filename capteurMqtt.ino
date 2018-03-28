#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

int dypOutputPin = D4; // TRIG 
int dypInputPin = D3;  // ECHO 
long distance;
long cm;
const int led = D8;
const char* ssid = "Keena";
const char* password = "123azerty";
long lastMsg = 0;
char msg[50];
int value = 0;
#define AIO_SERVER      "192.168.43.46"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME    ""
#define AIO_KEY         ""
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Publish mqttClient = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "sensor/movements");

void MQTT_connect() {
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0 || retries == 0) { // connect will return 0 for connected
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);  // wait 5 seconds
       retries--;
  }
  Serial.println("MQTT Connected!");
}

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setup () {
    pinMode(dypOutputPin, OUTPUT);
    pinMode(dypInputPin, INPUT);
    pinMode(led, OUTPUT);
    Serial.begin(115200);  // We initialize serial connection so that we could print values from sensor.
    setup_wifi();
    Serial.println("Bienvenue");
}

void loop () {
  digitalWrite(dypOutputPin, LOW);
  delayMicroseconds(2);
  digitalWrite(dypOutputPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(dypOutputPin, LOW);   
  // the distance is proportional to the time interval
  // between HIGH and LOW
  distance = pulseIn(dypInputPin, HIGH); 
  cm = distance / 58;     
  if (cm == 0 || cm > 30)
    digitalWrite(led, LOW);
  else {
    digitalWrite(led, HIGH);
    MQTT_connect();
    char buff[5];
    sprintf(buff, "%lu", cm);
    if (!mqttClient.publish(buff)) {
      Serial.println("Send failed");
    } else {
      Serial.println(" Send OK!");
    }
  }
  Serial.println(cm);                   
  delay(500); // avoids LCD flicker
}
