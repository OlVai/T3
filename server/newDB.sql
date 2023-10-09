CREATE TABLE "Kytkimet" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "device" text NULL, "address" text NULL);
CREATE TABLE "NAS" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "device" text NULL, "address" text NULL);
CREATE TABLE "Proxmox" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "volume_group" text NULL);
CREATE TABLE "Reitittimet" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "device" text NULL, "address" text NULL);
CREATE TABLE "Seurantapalvelut" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "device" text NULL, "info" text NULL);
CREATE TABLE "WLAN" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "device" text NULL, "address" text NULL, "ssid1" text NULL, "ssid2" text NULL, "ssid3" text NULL);
CREATE TABLE "ePDU" ("id" serial NOT NULL, PRIMARY KEY ("id"), "ip" text NULL, "device" text NULL, "address" text NULL);