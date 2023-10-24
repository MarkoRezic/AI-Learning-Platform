-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: learning_platform
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `learning_platform`
--

/*!40000 DROP DATABASE IF EXISTS `learning_platform`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `learning_platform` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `learning_platform`;

--
-- Table structure for table `card_set_cards`
--

DROP TABLE IF EXISTS `card_set_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_set_cards` (
  `card_set_card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_set_id` int(10) unsigned NOT NULL,
  `card_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`card_set_card_id`),
  KEY `fk_card_set_cards_card_set_id_idx` (`card_set_id`),
  KEY `fk_card_set_cards_card_id_idx` (`card_id`),
  CONSTRAINT `fk_card_set_cards_card_id` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_card_set_cards_card_set_id` FOREIGN KEY (`card_set_id`) REFERENCES `card_sets` (`card_set_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_set_cards`
--

LOCK TABLES `card_set_cards` WRITE;
/*!40000 ALTER TABLE `card_set_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_set_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_sets`
--

DROP TABLE IF EXISTS `card_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_sets` (
  `card_set_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`card_set_id`),
  KEY `fk_card_sets_user_id_idx` (`user_id`),
  CONSTRAINT `fk_card_sets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_sets`
--

LOCK TABLES `card_sets` WRITE;
/*!40000 ALTER TABLE `card_sets` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_types`
--

DROP TABLE IF EXISTS `card_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_types` (
  `card_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`card_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_types`
--

LOCK TABLES `card_types` WRITE;
/*!40000 ALTER TABLE `card_types` DISABLE KEYS */;
INSERT INTO `card_types` VALUES (1,'DEFINITION','Definicija'),(2,'QUESTION','Pitanje'),(3,'INFO','Info');
/*!40000 ALTER TABLE `card_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_users`
--

DROP TABLE IF EXISTS `card_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_users` (
  `card_user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`card_user_id`),
  KEY `fk_card_users_card_id_idx` (`card_id`),
  KEY `fk_card_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_card_users_card_id` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_card_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_users`
--

LOCK TABLES `card_users` WRITE;
/*!40000 ALTER TABLE `card_users` DISABLE KEYS */;
INSERT INTO `card_users` VALUES (5,3,2),(6,3,7),(7,7,7),(8,7,8);
/*!40000 ALTER TABLE `card_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `lecture_id` int(10) unsigned DEFAULT NULL,
  `file_id` int(10) unsigned DEFAULT NULL,
  `card_type_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`card_id`),
  KEY `fk_cards_user_id_idx` (`user_id`),
  KEY `fk_cards_lecture_id_idx` (`lecture_id`),
  KEY `fk_cards_file_id_idx` (`file_id`),
  KEY `fk_cards_card_type_id_idx` (`card_type_id`),
  CONSTRAINT `fk_cards_card_type_id` FOREIGN KEY (`card_type_id`) REFERENCES `card_types` (`card_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cards_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cards_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cards_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,1,NULL,NULL,1,'Test kartica 1','JavaScript je programski jezik za razvoj web stranica i web aplikacija.\r\n',NULL,1),(2,1,NULL,NULL,1,'Računalno inženjerstvo','Računalno inženjerstvo je studija koja kombinira elektronički inženjering i računalne znanosti za dizajn i razvoj računalnih sustava i drugih tehnoloških uređaja. Stručnjaci u ovom području imaju stručnost u dizajnu softvera, elektroničkom inženjeringu i integraciji softvera i hardvera. Računalno inženjerstvo omogućava profesionalcima da se bave različitim područjima kao što su analiza i dizajn mikroprocesora, softvera i operacijskih sustava.','',1),(3,1,NULL,NULL,2,'Python','Python je programski jezik opće namjene, interpretiran i visoke razine kojeg je stvorio Guido van Rossum 1990. godine. Python dopušta programerima korištenje nekoliko stilova programiranja, uključujući objektno orijentirano, strukturno i aspektno orijentirano programiranje. Python se najviše koristi na Linuxu, ali postoje i inačice za druge operacijske sustave. Iako je Python sporiji od kompajlerskih jezika poput C i C++, on se i dalje široko koristi u industriji, posebno kao back-end programski jezik. Python se često uspoređuje s Javom, ali svaki jezik ima svoje prednosti i primjene.','Koji stilovi programiranja su dopušteni u Pythonu?',0),(4,1,NULL,1,1,'JavaScript-skripta.pdf','U ovom tekstu se daje uvod u JavaScript, objašnjava se njegova svrha i osnovne mogućnosti. Također se opisuju različiti načini postavljanja JavaScript koda unutar HTML dokumenta, kao i metode za prikazivanje podataka u HTML-u korištenjem JavaScripta. Ove metode uključuju korištenje funkcija poput window.alert() za prikazivanje iskočnih prozora, document.write() za pisanje u sam HTML dokument i document.getElementById().innerHTML za mijenjanje sadržaja određenog elementa unutar HTML-a.','',0),(5,1,23,NULL,1,'Python','Python je programski jezik opće namjene visoke razine koji podržava više programskih paradigmi. Njegova filozofija dizajna naglašava čitljivost koda kroz značajno uvlačenje. Python se dinamički tipka i skuplja smeće.','',0),(6,2,23,NULL,1,'Python','Python je programski jezik opće namjene visoke razine koji podržava različite programerske paradigme. Njegova filozofija dizajna ističe čitljivost koda i korištenje uvlačenja. Python se dinamički tipka i skuplja smeće.','',0),(7,2,15,NULL,3,'Pregled frontend frameworka','Prednji okviri su skupovi unaprijed napisanog koda koji programerima pružaju skalabilnu strukturu koju je moguće održavati za učinkovitije stvaranje korisničkih sučelja. Oni sadrže HTML, CSS i JavaScript komponente koje programeri mogu ponovno koristiti u drugim projektima. Ti okviri olakšavaju pisanje dosljednog i dobro organiziranog koda te automatiziraju zadatke koji se ponavljaju.','',1),(8,2,15,NULL,3,'Pregled frontend frameworka pitanje','prednji okviri, prednji kraj, web stranica, aplikacija, korisnici, dizajn, izgled, korisničko iskustvo, interaktivni elementi, obrazac, gumb, skalabilna struktura, održavanje, korisničko sučelje, HTML, CSS, JavaScript, ponovna upotreba, baza koda, organizacija, web razvoj, generiranje, responzivni dizajn, optimizacija, platforma, automatizacija, upravljanje, ažuriranje.','',1),(9,9,NULL,NULL,3,'Autentifikacija','Autentifikacija i autorizacija su dva ključna procesa informacijske sigurnosti. Autentifikacija se koristi za provjeru identiteta korisnika ili usluge, dok autorizacija određuje njihova prava pristupa. Ovi procesi su bitni za zaštitu sustava i informacija. Autentifikacija se provodi putem provjere korisničkog imena i lozinke, dok se autorizacija odnosi na odobravanje pristupa na temelju autentifikacije. Razumijevanje razlika između ova dva pojma je ključno za osiguravanje sigurnosti sustava.','',1),(10,9,NULL,NULL,2,'Autorizacija vs Autentifikacija','Autentifikacija i autorizacija su dva vitalna procesa informacijske sigurnosti. Autentifikacija provjerava identitet korisnika ili usluge, dok autorizacija određuje prava pristupa. Ova dva pojma igraju različite, ali jednako bitne uloge u osiguravanju aplikacija i podataka. Autentifikacija potvrđuje da je netko ili nešto ono za što se predstavlja, obično kroz unos korisničkog imena i lozinke. Autorizacija određuje pristup na temelju autentifikacije.','Koja je razlika između autentifikacije i autorizacije?',1);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `parent_comment_id` int(10) unsigned DEFAULT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `anonymous` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comments_post_id_idx` (`post_id`),
  KEY `fk_comments_user_id_idx` (`user_id`),
  KEY `fk_comments_parent_comment_id_idx` (`parent_comment_id`),
  CONSTRAINT `fk_comments_parent_comment_id` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_types`
--

DROP TABLE IF EXISTS `file_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_types` (
  `file_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`file_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_types`
--

LOCK TABLES `file_types` WRITE;
/*!40000 ALTER TABLE `file_types` DISABLE KEYS */;
INSERT INTO `file_types` VALUES (1,'GENERIC','Datoteka'),(2,'HOMEWORK','Zadaća'),(3,'SCRIPT','Skripta'),(4,'CODE','Kod');
/*!40000 ALTER TABLE `file_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_users`
--

DROP TABLE IF EXISTS `file_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_users` (
  `file_user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`file_user_id`),
  UNIQUE KEY `file_users_file_id_user_id_UNIQUE` (`file_id`,`user_id`),
  KEY `fk_file_users_file_id_idx` (`file_id`),
  KEY `fk_file_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_file_users_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_file_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_users`
--

LOCK TABLES `file_users` WRITE;
/*!40000 ALTER TABLE `file_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `file_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `file_type_id` int(10) unsigned NOT NULL,
  `uuid_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `uuid_name_UNIQUE` (`uuid_name`),
  KEY `fk_files_user_id_idx` (`user_id`),
  KEY `fk_files_file_type_id_idx` (`file_type_id`),
  CONSTRAINT `fk_files_file_type_id` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`file_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_files_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,1,1,'8c169455-ec55-4608-b3a6-b0418d26a829.pdf','JavaScript-skripta.pdf',0),(2,2,1,'4f329cae-99da-4267-9b11-b932f960fe50.pdf','MarkoRezicCV',1),(3,2,1,'c72985a0-e7c1-47a7-8d95-624f2aecb551.zip','zadaća1.zip',0),(4,2,2,'bb573a8e-4ce8-4a39-9536-e656cc180290.zip','zadaća2.zip',1),(5,2,1,'eb471357-39b5-4355-a596-8b13577cab0f.PNG','Slika1.PNG',1),(6,2,1,'578444ab-c4b5-46ba-8cd9-142fd3b318c8.docx','Diplomski rad_Marko_Rezić_590_RM.docx',0),(7,2,1,'e7893870-598e-4db4-acca-05b899e3aff9.docx','Predložak za diplomski rad.docx',1),(8,2,1,'5933febc-cf84-4772-930d-c6bd957446dc.jpg','Profilna.jpg',0),(9,2,4,'20220298-74db-4f81-9009-ccba636c1752.json','API Specifikacija.json',1),(10,9,3,'c8c2429b-6eb6-457d-863d-e6cf4e2b51be.pdf','JavaScript-skripta.pdf',1),(11,9,1,'fba7e91d-0e4c-479c-9ce5-8ae60ee16fff.zip','PRIMJERI ISPITA',1);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_files`
--

DROP TABLE IF EXISTS `lecture_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_files` (
  `lecture_file_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lecture_id` int(10) unsigned NOT NULL,
  `file_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`lecture_file_id`),
  KEY `fk_lecture_files_lecture_id_idx` (`lecture_id`),
  KEY `fk_lecture_files_file_id_idx` (`file_id`),
  CONSTRAINT `fk_lecture_files_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_lecture_files_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_files`
--

LOCK TABLES `lecture_files` WRITE;
/*!40000 ALTER TABLE `lecture_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_technologies`
--

DROP TABLE IF EXISTS `lecture_technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_technologies` (
  `lecture_technology_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lecture_id` int(10) unsigned NOT NULL,
  `technology_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`lecture_technology_id`),
  UNIQUE KEY `lecture_technologies_lecture_id_technology_id_UNIQUE` (`lecture_id`,`technology_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_technologies`
--

LOCK TABLES `lecture_technologies` WRITE;
/*!40000 ALTER TABLE `lecture_technologies` DISABLE KEYS */;
INSERT INTO `lecture_technologies` VALUES (10,3,26),(11,4,26),(12,4,27),(56,5,27),(1,7,1),(4,7,12),(5,7,13),(6,7,14),(7,7,15),(8,7,16),(9,7,17),(2,7,31),(3,7,32),(13,8,31),(14,8,32),(15,9,31),(16,10,32),(54,15,14),(53,15,15),(55,15,16),(17,16,15),(18,17,14),(19,18,16),(20,19,2),(21,19,8),(22,19,11),(23,19,18),(24,19,19),(25,19,20),(26,19,21),(27,19,22),(28,19,23),(29,19,24),(30,20,2),(32,20,8),(31,20,18),(33,21,18),(34,22,8),(35,23,2),(36,24,19),(37,24,20),(38,24,21),(39,24,22),(40,24,23),(41,24,24),(42,25,19),(43,26,20),(44,27,22),(45,28,21),(46,30,26),(47,30,29),(49,35,28),(48,35,29),(51,36,28),(50,36,30),(52,37,29);
/*!40000 ALTER TABLE `lecture_technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_users`
--

DROP TABLE IF EXISTS `lecture_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_users` (
  `lecture_user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lecture_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`lecture_user_id`),
  KEY `fk_lecture_users_lecture_id_idx` (`lecture_id`),
  KEY `fk_lecture_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_lecture_users_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_lecture_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_users`
--

LOCK TABLES `lecture_users` WRITE;
/*!40000 ALTER TABLE `lecture_users` DISABLE KEYS */;
INSERT INTO `lecture_users` VALUES (2,1,2),(3,5,2),(4,3,2),(5,21,2),(6,15,2);
/*!40000 ALTER TABLE `lecture_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `lecture_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_lecture_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `html` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`lecture_id`),
  KEY `fk_lectures_parent_lecture_id_idx` (`parent_lecture_id`),
  CONSTRAINT `fk_lectures_parent_lecture_id` FOREIGN KEY (`parent_lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES (1,NULL,'Uvod u Web Development','Što je to web development, šta obuhvaća, pregled alata za kolaboraciju','web,development,git,github,aplikacije','Web razvoj je rad uključen u razvoj web stranice za Internet (World Wide Web) ili intranet (privatna mreža).[1] Web razvoj može varirati od razvoja jednostavne jedne statične stranice običnog teksta do složenih web aplikacija, elektroničkih poslova i usluga društvenih mreža. Sveobuhvatniji popis zadataka na koje se web razvoj obično odnosi može uključivati ​​web inženjering, web dizajn, razvoj web sadržaja, vezu s klijentom, skriptiranje na strani klijenta/poslužitelja, sigurnosnu konfiguraciju web poslužitelja i mreže i razvoj e-trgovine.\n\nMeđu web profesionalcima, \"web razvoj\" obično se odnosi na glavne nedizajnerske aspekte izgradnje web stranica: pisanje oznaka i kodiranje.[2] Web razvoj može koristiti sustave za upravljanje sadržajem (CMS) kako bi izmjene sadržaja bile lakše i dostupne uz osnovne tehničke vještine.\n\nZa veće organizacije i tvrtke, timovi za web razvoj mogu se sastojati od stotina ljudi (web programera) i slijediti standardne metode kao što su Agile metodologije dok razvijaju web stranice.[1] Manje organizacije mogu zahtijevati samo jednog stalnog ili ugovornog programera, ili sekundarni raspored na povezana radna mjesta kao što je grafički dizajner ili tehničar za informacijske sustave. Web razvoj može biti zajednički napor između odjela, a ne domena određenog odjela. Postoje tri vrste specijalizacije web programera: front-end developer, back-end developer i full-stack developer.[3] Front-end programeri odgovorni su za ponašanje i vizualne elemente koji se pokreću u korisničkom pregledniku, dok se back-end programeri bave poslužiteljima.[4] Od komercijalizacije weba, industrija je procvjetala i postala jedna od najkorištenijih tehnologija ikada.',0),(2,1,'Osnove web developmenta i arhitekture web aplikacija',NULL,'web,development,aplikacije,arhitekture aplikacija','Pregled arhitekture web aplikacije\nArhitektura web-aplikacije predstavlja izgled sa svim softverskim komponentama (kao što su baze podataka, aplikacije i međuslojni softver) i načinom na koji one međusobno djeluju. Definira kako se podaci isporučuju putem HTTP-a i osigurava da poslužitelj na strani klijenta i pozadinski poslužitelj mogu razumjeti. Štoviše, također osigurava prisutnost valjanih podataka u svim zahtjevima korisnika. Stvara zapise i upravlja njima dok pruža pristup i provjeru autentičnosti na temelju dopuštenja. Odabir pravog dizajna definira rast vaše tvrtke, pouzdanost i interoperabilnost te buduće IT potrebe. Kao takvo, važno je razumjeti komponente koje čine arhitekturu web-aplikacija.\n\nKomponente arhitekture web aplikacije\nArhitektura aplikacije temeljene na webu obično se sastoji od 3 osnovne komponente:\n\n1) Web-preglednik: preglednik ili komponenta na strani klijenta ili komponenta na prednjoj strani je ključna komponenta koja komunicira s korisnikom, prima unos i upravlja logikom prezentacije dok kontrolira interakciju korisnika s aplikacijom. Korisnički unosi se također provjeravaju, ako je potrebno.\n\n2) Web poslužitelj: Web poslužitelj poznat i kao pozadinska komponenta ili komponenta na strani poslužitelja upravlja poslovnom logikom i obrađuje korisničke zahtjeve usmjeravanjem zahtjeva na pravu komponentu i upravljanjem cjelokupnim operacijama aplikacije. Može pokretati i nadzirati zahtjeve širokog spektra klijenata.\n\n3) Poslužitelj baze podataka: Poslužitelj baze podataka daje potrebne podatke za aplikaciju. Obrađuje zadatke povezane s podacima. U višeslojnoj arhitekturi, poslužitelji baze podataka mogu upravljati poslovnom logikom uz pomoć pohranjenih procedura.\n\nŠto je 3-slojna arhitektura?\nU tradicionalnoj 2-slojnoj arhitekturi postoje dvije komponente, naime sustav na strani klijenta ili korisničko sučelje i pozadinski sustav koji je obično poslužitelj baze podataka. Ovdje je poslovna logika ugrađena u korisničko sučelje ili poslužitelj baze podataka. Loša strana 2-slojne arhitekture je da s povećanim brojem korisnika opada izvedba. Štoviše, izravna interakcija baze podataka i korisničkog uređaja također izaziva neke sigurnosne probleme. Željeznički rezervacijski sustavi, sustavi za upravljanje sadržajem su nekoliko aplikacija koje se obično grade pomoću ove arhitekture.\n\nPostoje tri sloja 3-slojne arhitekture:\n\nPrezentacijski sloj / sloj klijenta\nAplikacijski sloj / Poslovni sloj\nPodatkovni sloj\nstandardna arhitektura web aplikacije\nU ovom modelu posrednički poslužitelji primaju klijentske zahtjeve i obrađuju ih koordinirajući s podređenim poslužiteljima primjenom poslovne logike. Komunikacijom između klijenta i baze podataka upravlja srednji aplikacijski sloj, čime se klijentima omogućuje pristup podacima iz različitih DBMS rješenja.',0),(3,1,'GitHub Education Pack i besplatni alati za studente',NULL,'web,development,alati za studente,github','Za mnoge studente koji su strastveni u tehnologiji, ograničeni pristup ključnim alatima i resursima čest je izazov.\n\nSrećom, GitHub Student Developer Pack dolazi u pomoć. Ovaj paket studentima pruža ekskluzivan pristup nizu vrhunskih razvojnih alata, omogućujući im učenje kroz praktično iskustvo.\n\nŠto je GitHub Student Developer Pack?\nStudent Developer Pack sastoji se od izbora pogodnosti koje velikodušno pružaju GitHubovi partneri i suradnici. Ovi su partneri udružili snage s GitHubom kako bi ove vrijedne ponude proširili na provjerene studente.\n\nZašto? Zato što razumiju da je najučinkovitiji način podrške budućim programerima pružanje praktičnog iskustva s proizvodima i alatima industrijskim standardima.\n\nU biti, GitHub Student Developer Pack eliminira prepreke s kojima se suočavaju studenti koji su strastveni oko tehnologije, ali možda nemaju resurse da plate punu cijenu za sve te alate.\n\nPaket studentima daje pristup zbirci izvora i omogućuje im stjecanje znanja i vještina iz prve ruke korištenjem vrhunskih alata.\n\nU ovom ću se članku dotaknuti nekih od istaknutih značajki GitHub Student Developer Packa i načina na koji mu možete pristupiti.\n\nIstaknute značajke Student Developer Packa\nOvaj paket dolazi s mnoštvom ponuda u različitim domenama u tehnološkom prostoru. Za svaku specijalnost vjerojatno postoji ponuda koja će vam pomoći da napredujete u svojoj karijeri i besplatno pristupite najboljim razvojnim alatima koji se koriste u toj industriji.\n\nOvi alati pokrivaju mnoge teme, uključujući računalstvo u oblaku, dizajn, razvoj igara, infrastrukturu i API-je, internet stvari (IoT), marketing, mobilni razvoj, sigurnosnu analitiku i više. Stoga je pošteno reći da ovaj paket nije prevrnuo kamen.',0),(4,1,'Alati za rad i kolaboraciju',NULL,'web,development,alati za studente,github,kolaboracija','Koje alate koristite za suradnju s web programerima i klijentima?\n\nRazvoj je proces suradnje koji uključuje rad s drugim programerima, dizajnerima, klijentima i dionicima. Za učinkovitu komunikaciju, razmjenu ideja i postizanje kvalitetnih rezultata morate koristiti prave alate za svaku fazu projekta. U ovom ćemo članku istražiti neke od najčešćih i najkorisnijih alata koje web programeri koriste za suradnju s web programerima i klijentima.',0),(5,4,'GIT',NULL,'web,development,alati za studente,github,kolaboracija,razvoj,verzioniranje','Što je Git?\nDakle, što je Git ukratko? Ovo je važan odjeljak za usvajanje, jer ako razumijete što je Git i osnove kako funkcionira, učinkovito korištenje Gita vjerojatno će vam biti puno lakše. Dok učite Git, pokušajte razbistriti svoj um od stvari koje možda znate o drugim VCS-ovima, kao što su CVS, Subversion ili Perforce — to će vam pomoći da izbjegnete suptilnu zabunu prilikom korištenja alata. Iako je Gitovo korisničko sučelje prilično slično ovim drugim VCS-ovima, Git pohranjuje i razmišlja o informacijama na vrlo drugačiji način, a razumijevanje ovih razlika pomoći će vam da se ne zbunite dok ga koristite.\n\nSnimke, a ne razlike\nGlavna razlika između Gita i bilo kojeg drugog VCS-a (uključujući Subverziju i prijatelje) je način na koji Git razmišlja o svojim podacima. Konceptualno, većina drugih sustava pohranjuje informacije kao popis promjena temeljenih na datotekama. Ovi drugi sustavi (CVS, Subversion, Perforce i tako dalje) razmišljaju o informacijama koje pohranjuju kao o skupu datoteka i promjenama napravljenim na svakoj datoteci tijekom vremena (ovo se obično opisuje kao kontrola verzije temeljena na delti).',0),(6,4,'Trello i Figma',NULL,'web,development,alati za studente,github,kolaboracija,razvoj,verzioniranje','Što je Trello?\n\nTrello je alat za suradnju koji organizira vaše projekte u ploče. Jednim pogledom Trello vam govori na čemu se radi, tko na čemu radi i gdje se nešto nalazi u procesu.\n\nZamislite bijelu ploču ispunjenu popisima ljepljivih bilješki, sa svakom bilješkom kao zadatkom za vas i vaš tim. Sada zamislite da svaka od tih ljepljivih bilježaka ima fotografije, privitke iz drugih izvora podataka kao što su Jira ili Salesforce, dokumente i mjesto za komentiranje i suradnju sa suigračima.\n\nSada zamislite da tu bijelu ploču možete ponijeti kamo god idete na svom pametnom telefonu i možete joj pristupiti s bilo kojeg računala putem weba.\n\nŠto je Figma? Figma je alat za dizajn temeljen na oblaku koji je sličan Sketchu u funkcionalnosti i značajkama, ali s velikim razlikama koje Figmu čine boljom za timsku suradnju. Za one koji su skeptični prema takvim tvrdnjama, objasnit ćemo kako Figma pojednostavljuje proces dizajna i kako je učinkovitija od drugih programa u pomaganju dizajnerima i timovima da rade zajedno.\n\nDizajn sučelja u Figmi\nFigma radi na bilo kojoj platformi\nFigma radi na bilo kojem operativnom sustavu koji pokreće web preglednik. Macovi, Windows računala, Linux strojevi, pa čak i Chromebookovi mogu se koristiti s Figmom. To je jedini alat za dizajn te vrste koji to čini, a u trgovinama koje koriste hardver s različitim operativnim sustavima, svatko i dalje može dijeliti, otvarati i uređivati ​​Figma datoteke.',0),(7,NULL,'Frontend tehnologije',NULL,'web,development,framework,tehnologije','Što su front-end tehnologije u web razvoju?\nFront-end tehnologije su skup tehnologija koje se koriste za razvoj korisničkog sučelja web stranica i aplikacija.\n\nS front-end tehnologijama, programeri stvaraju sve, od dizajna i strukture do animacije koju vidimo na zaslonu dok otvaramo web stranicu, web aplikaciju ili mobilnu aplikaciju.\n\nTe tehnologije igraju ključnu ulogu u angažiranju korisnika te ih potiču i tjeraju na željenu akciju. Besprijekorna front-end tehnologija aplikacije čini aplikaciju jednostavnom za korištenje i preporučljivom drugima.',0),(8,7,'Frontend Package manageri',NULL,'web,development,framework,tehnologije,paketi','Upravitelj paketa ili sustav za upravljanje paketima skup je softverskih alata koji automatiziraju proces instaliranja, nadogradnje, konfiguracije i uklanjanja softverskih paketa za operativni sustav računala na dosljedan način. Obično održava bazu podataka o softverskim ovisnostima i informacijama o verziji kako bi se spriječilo nepodudaranje softvera i nedostatak preduvjeta.',0),(9,8,'NPM',NULL,'web,development,framework,tehnologije,paketi','npm je najveći svjetski registar softvera. Programeri otvorenog koda sa svih kontinenata koriste npm za dijeljenje i posuđivanje paketa, a mnoge organizacije koriste npm i za upravljanje privatnim razvojem.\n\nnpm se sastoji od tri različite komponente:\n\nInternet stranica\nsučelje naredbenog retka (CLI)\nregistar\nKoristite web mjesto za otkrivanje paketa, postavljanje profila i upravljanje drugim aspektima vašeg npm iskustva. Na primjer, možete postaviti organizacije za upravljanje pristupom javnim ili privatnim paketima.\n\nCLI radi s terminala i to je način na koji većina programera komunicira s npm-om.\n\nRegistar je velika javna baza podataka JavaScript softvera i metainformacija koje ga okružuju.\n\nKoristite npm za . . .\nPrilagodite pakete koda za svoje aplikacije ili uključite pakete takve kakvi jesu.\nPreuzmite samostalne alate koje možete odmah koristiti.\nPokretanje paketa bez preuzimanja pomoću npx-a.\nDijelite kod s bilo kojim npm korisnikom, bilo gdje.\nOgraničite kod na određene programere.\nStvorite organizacije za koordinaciju održavanja paketa, kodiranja i programera.\nFormirajte virtualne timove pomoću organizacija.\nUpravljajte višestrukim verzijama koda i ovisnosti koda.\nLako ažurirajte aplikacije kada se temeljni kod ažurira.\nOtkrijte više načina za rješavanje iste zagonetke.\nPronađite druge programere koji rade na sličnim problemima i projektima.',0),(10,8,'Yarn',NULL,'web,development,framework,tehnologije,paketi','Yarn je upravitelj paketa za vaš kod. Omogućuje vam korištenje i dijeljenje (npr. JavaScript) koda s drugim programerima iz cijelog svijeta. Yarn to čini brzo, sigurno i pouzdano tako da se ne morate brinuti.\n\nYarn vam omogućuje korištenje rješenja drugih programera za različite probleme, što vam olakšava razvoj softvera. Ako imate problema, možete prijaviti probleme ili dati doprinos, a kada se problem riješi, možete koristiti Yarn da sve bude ažurno.\n\nKod se dijeli kroz nešto što se naziva paket (ponekad se naziva modul). Paket sadrži sav kod koji se dijeli kao i datoteku package.json koja opisuje paket.',0),(11,7,'CSS Frameworks',NULL,'web,development,framework,tehnologije,paketi','CSS okvir je pripremljena i spremna za korištenje CSS biblioteka (Cascading Style Sheets). Zbirka listova stilova olakšava posao programera korisničkog sučelja.\n\nUmjesto pokretanja svakog projekta od nule, CSS okvir im daje alate za brzu izradu korisničkog sučelja koje ponavljaju i prilagođavaju tijekom projekta. Također omogućuju stvaranje web stranica usklađenijih sa standardima.\n\nIako su vrlo zahtjevni za korištenje ili dvosmisleni za početnike, stariji programeri koji poznaju opise i poštapalice CSS okvirnih stranica smatraju ih iznimno korisnima.\n\nZašto vam je potreban CSS okvir?\nCSS okviri dizajnirani su za korištenje u tipičnim scenarijima kao što su uspostavljanje navigacijskih traka, podnožja, klizača, hamburger izbornika, izgleda u 3 stupca i više.\n\nOkviri također omogućuju proširenje na JavaScript, SASS i druge tehnologije. Ako su dizajneri ograničeni vremenom, okviri omogućuju postavljanje web stranica – ne samo početnih stranica, bez poniranja u CSS.',0),(12,11,'Bootstrap',NULL,'web,development,framework,tehnologije,paketi','Bootstrap je besplatni front-end razvojni okvir otvorenog koda za izradu web stranica i web aplikacija. Dizajniran kako bi omogućio responzivni razvoj mobilnih web stranica, Bootstrap pruža zbirku sintakse za dizajn predložaka.\n\nKao okvir, Bootstrap uključuje osnove responzivnog web razvoja, tako da programeri trebaju samo umetnuti kod u unaprijed definirani mrežni sustav. Okvir Bootstrap izgrađen je na Hypertext Markup Language (HTML), cascading style sheets (CSS) i JavaScriptu. Web programeri koji koriste Bootstrap mogu puno brže izraditi web stranice bez trošenja vremena na brigu o osnovnim naredbama i funkcijama.',0),(13,11,'Vuetify',NULL,'web,development,framework,tehnologije,paketi','Vuetify je u skladu sa specifikacijom Material Designa, što znači da su temeljne značajke Vue i Materiala dostupne prema zadanim postavkama i obje zajednice ih mogu poboljšati. Osim toga, Vuetify nudi sljedeće značajke:\n\nKompatibilnost s Vue CLI-3 i RTL\nPredlošci za različite okvire, kao što su Cordova, webpack itd.\nInternacionalizacija\nSSR i PWA\nKorištenje Vuetifyja znači da morate prihvatiti materijalni dizajn. Stoga aplikacije namijenjene iOS svemiru nisu dobri kandidati za Vuetify. Isto tako, ako trebate prilagođeni dizajn u pogledu stila u cjelini, Vuetify vam možda neće odgovarati. Kao i uvijek, i dalje ćete morati izvršiti prethodnu, dublju analizu potreba vašeg projekta.',0),(14,11,'Tailwind',NULL,'web,development,framework,tehnologije,paketi','Tailwind CSS je CSS okvir otvorenog koda. Glavna značajka ove biblioteke je da, za razliku od drugih CSS okvira kao što je Bootstrap, ne pruža niz unaprijed definiranih klasa za elemente kao što su gumbi ili tablice.',0),(15,7,'Pregled frontend frameworka',NULL,'web,development,framework,tehnologije,frontend','Prije nego što uđemo u detalje o najboljim prednjim okvirima, prvo definirajmo što su oni.\n\nDa biste razumjeli što su prednji okviri, prvo morate znati što je prednji kraj. Prednji dio web stranice ili aplikacije je strana klijenta – dio s kojim korisnici komuniciraju. To uključuje dizajn, izgled, korisničko iskustvo (UX) i sve interaktivne elemente, poput obrazaca i gumba.\n\nPrednji okviri su skupovi unaprijed napisanog koda koji programerima pružaju skalabilnu strukturu koju je moguće održavati za učinkovitije stvaranje korisničkih sučelja. Sadrže HTML, CSS i JavaScript komponente koje programeri mogu ponovno koristiti u drugim projektima, pomažući da baza koda bude dosljedna i organizirana.\n\nOvi okviri za web razvoj daju strukturu razvojnom procesu i olakšavaju pisanje dosljednog i dobro organiziranog koda.\n\nNeki od zadataka u kojima front end okviri pomažu uključuju:\n\nGeneriranje HTML i CSS koda\nStvaranje responzivnog dizajna koji je optimiziran za više uređaja\nStvaranje dosljednog izgleda i dojma na svim platformama\nAutomatiziranje zadataka koji se ponavljaju kao što su modifikacija, kompresija i optimizacija\nUpravljanje i ažuriranje koda',0),(16,15,'Vue',NULL,'web,development,framework,tehnologije,frontend','Vue je okvir i ekosustav koji pokriva većinu uobičajenih značajki potrebnih za razvoj sučelja. No web je iznimno raznolik - stvari koje gradimo na webu mogu se drastično razlikovati u obliku i veličini. Imajući to na umu, Vue je dizajniran da bude fleksibilan i postupno prilagodljiv. Ovisno o vašem slučaju upotrebe, Vue se može koristiti na različite načine:\n\nPoboljšanje statičkog HTML-a bez koraka izgradnje\nUgradnja kao web komponente na bilo koju stranicu\nAplikacija na jednoj stranici (SPA)\nFullstack / iscrtavanje na strani poslužitelja (SSR)\nJamstack/Static Site Generation (SSG)\nCiljano računalo, mobilni uređaj, WebGL, pa čak i terminal',0),(17,15,'React',NULL,'web,development,framework,tehnologije,frontend','React je okvir koji koristi Webpack za automatsko kompiliranje React, JSX i ES6 koda dok rukuje prefiksima CSS datoteka. React je biblioteka za razvoj korisničkog sučelja temeljena na JavaScriptu. Iako je React biblioteka, a ne jezik, naširoko se koristi u web razvoju. Knjižnica se prvi put pojavila u svibnju 2013. i sada je jedna od najčešće korištenih frontend biblioteka za web razvoj.\n\nReact nudi različita proširenja za cjelokupnu arhitektonsku podršku aplikacije, kao što su Flux i React Native, izvan pukog korisničkog sučelja.\n\nPovijest ReactJS\nU usporedbi s drugim tehnologijama na tržištu, React je nova tehnologija. Jordan Walke, softverski inženjer u Facebooku, osnovao je knjižnicu 2011. i dao joj život. Poput XHP-a, jednostavnog okvira HTML komponente za PHP, ima utjecaja na React. Reactov newsfeed bio je njegova debitantska aplikacija 2011. Kasnije ju je Instagram preuzeo i ugradio u svoju platformu.',0),(18,15,'Angular',NULL,'web,development,framework,tehnologije,frontend','Angular je razvojna platforma izgrađena na TypeScriptu. Kao platforma, Angular uključuje:\n\nOkvir temeljen na komponentama za izgradnju skalabilnih web aplikacija\nZbirka dobro integriranih knjižnica koje pokrivaju širok raspon značajki, uključujući usmjeravanje, upravljanje obrascima, komunikaciju klijent-poslužitelj i više\nPaket alata za razvojne programere koji će vam pomoći da razvijete, izgradite, testirate i ažurirate svoj kod\nS Angularom iskorištavate prednosti platforme koja se može skalirati od projekata jednog programera do aplikacija na razini poduzeća. Angular je osmišljen kako bi ažuriranje učinio što jednostavnijim, stoga iskoristite najnovija dostignuća uz minimalan napor. Najbolje od svega, Angular ekosustav sastoji se od raznolike grupe od preko 1,7 milijuna programera, autora knjižnica i kreatora sadržaja.',0),(19,NULL,'Backend tehnologije',NULL,'web,development,framework,tehnologije,frontend','Obično se pozadinske tehnologije odnose na biblioteke poslužiteljskih jezika koji se koriste za kreiranje poslužiteljske konfiguracije web stranice. Pozadinske tehnologije čine temelj razvoja softvera. Bez specijaliziranih pozadinskih programera, otmjeni dizajni i intuitivna sučelja stvorena korištenjem front-end jezika za kodiranje nisu dovoljni.\n\nTo je pozadina web stranice ili aplikacije koja joj omogućuje da dobro funkcionira te da bude brza i responzivna. No, zbog eksponencijalnog rasta pozadinskih tehnologija u posljednjih nekoliko godina, programerima može biti teško držati korak s ogromnom količinom tehnologije koja im je na raspolaganju. Međutim, važno je, bez obzira na to jeste li IT menadžer, osnivač startupa ili korporativni donositelj odluka, odabrati pravu pozadinsku tehnologiju prije nego krenete dalje sa svojim projektom.\n\nPrednosti pozadinskih tehnologija\n\nAutomatizirajte zadatke kako biste pojednostavili tijek rada\nPovećajte produktivnost programera\nPojednostavite razvojne procese\nDobro dođe kada ste u kratkom roku\nUbrzati razvoj\nPoboljšati kvalitetu proizvoda\nSkalabilnost i robusnost\nPovećajte sigurnost i jednostavnost integracije',0),(20,19,'Pregled tehnologija za backend razvoj',NULL,'web,development,framework,tehnologije,frontend','Backend okviri igraju ključnu ulogu u web razvoju. Bez tih okvira, izgradnja i implementacija web aplikacija oduzeli bi ogromnu količinu vremena i resursa, što bi značajno povećalo složenost procesa razvoja.\n\nBackend okviri pružaju programerima potrebne alate i podršku za obavljanje svakodnevnih zadataka kao što su konfiguracija poslužitelja, upravljanje bazom podataka i usmjeravanje, između nekoliko drugih.\n\nPrenošenjem takvih odgovornosti okviru, programeri mogu u potpunosti usmjeriti svoj fokus na poslovnu logiku web aplikacije, što rezultira bržim procesom razvoja i, u konačnici, proizvodom visoke kvalitete.\n\nŠto se tiče popularnosti, neki pozadinski okviri prikupili su značajnije sljedbenike od drugih:\n\nNode.js i dalje je jedan od najčešće korištenih pozadinskih okvira među web programerima, s više od milijardu preuzimanja.\nU siječnju 2023. korisnici su pozadinske okvire s najviše glasanja uključivali Laravel sa 71 903 zvjezdice repozitorija; Django sa 67.941 i Spring sa 64.405.\nNode.js koristi 47,12% programera diljem svijeta, a slijede ga React.js (42,62%) i jQuery (28,57%)',0),(21,20,'NodeJS',NULL,'web,development,framework,tehnologije,frontend','Node.js je open-source, cross-platformsko JavaScript runtime okruženje i biblioteka za pokretanje web aplikacija izvan preglednika klijenta. Ryan Dahl razvio ga je 2009., a njegova najnovija iteracija, verzija 15.14, objavljena je u travnju 2021. Programeri koriste Node.js za izradu web aplikacija na strani poslužitelja, a savršen je za aplikacije s velikim brojem podataka budući da koristi asinkroni događaj -pogonski model.',0),(22,20,'PHP',NULL,'web,development,framework,tehnologije,backend','PHP je skriptni jezik opće namjene usmjeren na web razvoj. Izvorno ga je stvorio dansko-kanadski programer Rasmus Lerdorf 1993., a objavljen 1995. PHP referentnu implementaciju sada proizvodi PHP grupa.',0),(23,20,'Python',NULL,'web,development,framework,tehnologije,backend','Python je programski jezik opće namjene visoke razine. Njegova filozofija dizajna naglašava čitljivost koda uz korištenje značajnog uvlačenja. Python se dinamički tipka i skuplja smeće. Podržava više programskih paradigmi, uključujući strukturirano, objektno orijentirano i funkcionalno programiranje.',0),(24,19,'Rad s bazama podataka',NULL,'web,development,framework,tehnologije,backend','Baza podataka je organizirana zbirka strukturiranih informacija ili podataka, obično elektronički pohranjenih u računalnom sustavu. Bazom podataka obično upravlja sustav za upravljanje bazom podataka (DBMS). Zajedno, podaci i DBMS, zajedno s aplikacijama koje su s njima povezane, nazivaju se sustavom baze podataka, često skraćeno na samo baza podataka.\n\nPodaci unutar najčešćih vrsta baza podataka koje danas rade obično su modelirani u redovima i stupcima u nizu tablica kako bi obrada i upiti podataka bili učinkoviti. Podacima se tada može lako pristupiti, njima se može upravljati, mijenjati, ažurirati, kontrolirati i organizirati. Većina baza podataka koristi strukturirani jezik upita (SQL) za pisanje i postavljanje upita podacima.\n\nŠto je Structured Query Language (SQL)?\nSQL je programski jezik koji koriste gotovo sve relacijske baze podataka za postavljanje upita, manipuliranje i definiranje podataka te za pružanje kontrole pristupa. SQL je prvi put razvijen u IBM-u 1970-ih s Oracleom kao glavnim doprinositeljem, što je dovelo do implementacije standarda SQL ANSI, SQL je potaknuo mnoga proširenja tvrtki kao što su IBM, Oracle i Microsoft. Iako se SQL i danas široko koristi, počinju se pojavljivati ​​novi programski jezici.',0),(25,24,'MySQL',NULL,'web,development,framework,tehnologije,backend','MySQL je sustav za upravljanje relacijskim bazama podataka otvorenog koda. Ime mu je kombinacija \"My\", imena kćeri suosnivača Michaela Wideniusa, i \"SQL\", akronima za Structured Query Language.',0),(26,24,'MariaDB',NULL,'web,development,framework,tehnologije,backend','MariaDB je komercijalno podržan račvak MySQL sustava za upravljanje relacijskom bazom podataka koji je razvila zajednica, a namijenjen je da ostane besplatan softver otvorenog koda pod GNU Općom javnom licencom.',0),(27,24,'PostgreSQL',NULL,'web,development,framework,tehnologije,backend','PostgreSQL, poznat i kao Postgres, besplatan je sustav za upravljanje relacijskom bazom podataka otvorenog koda koji naglašava proširivost i usklađenost sa SQL-om. Izvorno je nazvana POSTGRES, upućujući na svoje podrijetlo kao nasljednika baze podataka Ingres razvijene na Sveučilištu Kalifornija, Berkeley.',0),(28,24,'MongoDB',NULL,'web,development,framework,tehnologije,backend','MongoDB je višeplatformski program baze podataka orijentiran na dokumente koji je dostupan na izvornom jeziku. Klasificiran kao NoSQL program baze podataka, MongoDB koristi dokumente slične JSON-u s izbornim shemama.',0),(29,24,'Firebase',NULL,'web,development,framework,tehnologije,backend','Firebase, Inc. skup je pozadinskih usluga računalstva u oblaku i platformi za razvoj aplikacija koje pruža Google. U njemu se nalaze baze podataka, usluge, autentifikacija i integracija za razne aplikacije, uključujući Android, iOS, JavaScript, Node.js, Java, Unity, PHP i C++.',0),(30,NULL,'Razvoj web aplikacija',NULL,'web,development,framework,tehnologije,backend','Razvoj web aplikacija opisuje proces dizajniranja, izgradnje, testiranja i implementacije web aplikacija koje će biti instalirane na udaljenim poslužiteljima i isporučene korisnicima ili kupcima putem interneta. Nakon što se web aplikacija postavi na aplikacijski poslužitelj, korisnici mogu pristupiti aplikaciji i njezinim funkcijama i uslugama pomoću bilo kojeg web preglednika (Google Chrome, Mozilla Firefox, Microsoft Edge, itd.)',0),(31,30,'Autentifikacija i autorizacija korisnika',NULL,'web,development,framework,tehnologije,backend','Autentifikacija i autorizacija dva su vitalna procesa informacijske sigurnosti koje administratori koriste za zaštitu sustava i informacija. Autentifikacijom se provjerava identitet korisnika ili usluge, a autorizacijom se određuju njihova prava pristupa. Iako ova dva pojma zvuče slično, igraju različite, ali jednako bitne uloge u osiguravanju aplikacija i podataka. Razumijevanje razlika je ključno. U kombinaciji, oni određuju sigurnost sustava. Ne možete imati sigurno rješenje ako niste ispravno konfigurirali i provjeru autentičnosti i autorizaciju.\nŠto je autentifikacija (AuthN)?\nAutentikacija (AuthN) je proces koji potvrđuje da je netko ili nešto ono za što se predstavlja. Tehnološki sustavi obično koriste neki oblik provjere autentičnosti kako bi osigurali pristup aplikaciji ili njenim podacima. Na primjer, kada trebate pristupiti online stranici ili usluzi, obično morate unijeti svoje korisničko ime i lozinku. Zatim, iza kulisa, uspoređuje korisničko ime i lozinku koje ste unijeli sa zapisom koji ima u svojoj bazi podataka. Ako se podaci koje ste dostavili podudaraju, sustav pretpostavlja da ste važeći korisnik i odobrava vam pristup. Autentifikacija sustava u ovom primjeru pretpostavlja da samo vi znate ispravno korisničko ime i lozinku. Stoga vas autentificira korištenjem principa nečega što samo vi znate.',0),(32,30,'Izrada CRUD operacija u web aplikaciji',NULL,'web,development,CRUD,web aplikacije','CRUD se odnosi na četiri osnovne operacije koje bi softverska aplikacija trebala moći izvoditi – stvaranje, čitanje, ažuriranje i brisanje.\n\nU takvim aplikacijama korisnici moraju moći stvarati podatke, imati pristup podacima u korisničkom sučelju čitanjem podataka, ažuriranjem ili uređivanjem podataka i brisanjem podataka.\n\nU potpunim aplikacijama, CRUD aplikacije se sastoje od 3 dijela: API-ja (ili poslužitelja), baze podataka i korisničkog sučelja (UI).\n\nAPI sadrži kod i metode, baza podataka pohranjuje i pomaže korisniku da dohvati informacije, dok korisničko sučelje pomaže korisnicima u interakciji s aplikacijom.\n\nMožete napraviti CRUD aplikaciju s bilo kojim programskim jezikom koji postoji. I aplikacija ne mora biti full stack – možete napraviti CRUD aplikaciju s JavaScriptom na strani klijenta.\n\nZapravo, aplikacija s kojom ću vam pokazati kako funkcioniraju operacije stvaranja, čitanja, ažuriranja i brisanja napravljena je s JavaScriptom na strani klijenta.\n\nSvako slovo u CRUD akronimu ima odgovarajuću metodu HTTP zahtjeva.\n\nCRUD OPERACIJA METODA HTTP ZAHTJEVA\nIzradi POST\nPročitaj GET\nAžurirajte PUT ili PATCH\nIzbriši DELETE',0),(33,30,'REST API',NULL,'web,development,REST,web aplikacije','REST is a software architectural style that was created to guide the design and development of the architecture for the World Wide Web. REST defines a set of constraints for how the architecture of an Internet-scale distributed hypermedia system, such as the Web, should behave.\n',0),(34,33,'Postman',NULL,'web,development,REST,web aplikacije','Postman je API platforma za programere. Sjedište tvrtke je u San Franciscu i ima ured u Bangaloreu, gdje je i osnovana. Od veljače 2023., Postman izvješćuje da ima više od 25 milijuna registriranih korisnika i 75 000 otvorenih API-ja, za koje kaže da predstavlja najveće svjetsko javno API središte.\n',0),(35,NULL,'Deploy na web server i sigurnost',NULL,'web,development,web aplikacije,sigurnost','Implementacija u softverskom i web razvoju znači guranje promjena ili ažuriranja iz jednog okruženja za implementaciju u drugo. Prilikom postavljanja web stranice uvijek ćete imati svoju živu web stranicu, koja se naziva živo okruženje ili proizvodno okruženje.\n\nAko želite mogućnost unosa promjena, a da one ne utječu na vaše aktivno web mjesto, možete dodati dodatna okruženja. Ta se okruženja nazivaju razvojnim okruženjima ili okruženjima za implementaciju. Dodatna razvojna okruženja obično će biti lokalno okruženje, razvojno okruženje i pripremno okruženje (također poznato kao pripremno mjesto). Koliko vam okruženja treba ovisi o vama i složenosti projekta na kojem radite.\nOpćenito, web sigurnost odnosi se na zaštitne mjere i protokole koje organizacije usvajaju kako bi zaštitile organizaciju od cyber kriminalaca i prijetnji koje koriste web kanal. Web sigurnost ključna je za kontinuitet poslovanja i zaštitu podataka, korisnika i tvrtki od rizika.',0),(36,35,'Postavljanje web aplikacije na Studentski server i AWS',NULL,'web,development,web aplikacije,sigurnost','1. Gdje se nalazi moja stranica?\nStudentske stranice se nalaze na web serveru web.studenti.math.hr. Ako je Vaše korisničko ime (u računalnom sustavu fakulteta) username, onda se Vaša početna stranica nalazi na adresi http://web.studenti.math.hr/~username/, preciznije rečeno, Vaša početna stranica je http://web.studenti.math.hr/~username/index.html, no ako se u adresi ne navede dokument, onda većina web servera (pa tako i ovaj naš) pretpostavlja da se radi o dokumentu index.html unutar navedenog direktorija.\n\nStvarna lokacija direktorija http://web.studenti.math.hr/~username/ je public_html direktorij u home direktoriju korisnika username na računalu student.math.hr. Skraćena oznaka za home direktorij na UNIX-oidnim sustavima je ~. Kako bi imali funkcionalnu početnu stranicu, trebate kreirati direktorij ~/public_html i unutar njega imati datoteku index.html.\n\nAli, to nije sve! Kako bi svijet mogao pristupiti vašoj stranici, trebate postaviti odgovarajuća dopuštenja na svoj home direktorij, ~/public_html direktorij i sve datoteke i direktorije unutar ~/public_html direktorija.\n\n2. Dopuštenja pristupa datotekama na UNIX-oidnim sustavima\n2.1. Korisničke grupe i vlasništvo nad datotekom\nNa UNIX-oidnim sustavima za svaku datoteku (direktoriji su posebna vrsta datoteka!) se zna kome ta datoteka pripada, odnosno tko je vlasnik (eng. owner) te datoteke. U pravilu, vlasnik datoteke je onaj tko je tu datoteku kreirao, no moguće je mijenjati vlasništvo nad datotekom. Za promjenu vlasništva koristi se naredba chown.\n\nAmazon Web Services, Inc. je podružnica Amazona koja pruža platforme za računalstvo u oblaku na zahtjev i API-je pojedincima, tvrtkama i vladama, na temelju mjerenja, pay-as-you-go osnovi. Klijenti će ovo često koristiti u kombinaciji s automatskim skaliranjem.\n',0),(37,35,'Sigurnost web aplikacija: SSL i HTTPS',NULL,'web,development,web aplikacije,sigurnost','Secure Sockets Layer (SSL) is a security protocol that provides privacy, authentication, and integrity to Internet communications. SSL eventually evolved into Transport Layer Security (TLS).\n\nHypertext Transfer Protocol Secure je proširenje Hypertext Transfer Protocol-a. Koristi enkripciju za sigurnu komunikaciju preko računalne mreže, a naširoko se koristi na Internetu. U HTTPS-u, komunikacijski protokol je šifriran korištenjem Transport Layer Security ili, ranije, Secure Sockets Layer.\n',0),(38,35,'QA Testing',NULL,'web,development,web aplikacije,testiranje','Testiranje osiguranja kvalitete ili QA testiranje vitalan je korak u ciklusu razvoja softvera. Učinkovito testiranje kvalitete otkriva pogreške i nedosljednosti koje mogu utjecati na korištenje softvera koji se razvija u stvarnom svijetu. Kada se ispravno izvede, QA testiranje osigurava dugotrajnost proizvoda, dok tvrtkama štedi vrijeme i novac.\n\nProgrameri koji rade s ograničenim proračunom mogli bi doći u iskušenje da preskoče QA testiranje. Međutim, trošak ispravljanja pogrešaka nakon uvođenja proizvoda može biti veći od troška početnog QA testiranja.\n',0);
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_files`
--

DROP TABLE IF EXISTS `post_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_files` (
  `post_file_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `file_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`post_file_id`),
  KEY `fk_post_files_post_id_idx` (`post_id`),
  KEY `fk_post_files_file_id_idx` (`file_id`),
  CONSTRAINT `fk_post_files_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_files_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_files`
--

LOCK TABLES `post_files` WRITE;
/*!40000 ALTER TABLE `post_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `lecture_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `anonymous` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`post_id`),
  KEY `fk_posts_user_id_idx` (`user_id`),
  KEY `fk_posts_lecture_id_idx` (`lecture_id`),
  CONSTRAINT `fk_posts_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_posts_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(10) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_reviews`
--

DROP TABLE IF EXISTS `team_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_reviews` (
  `team_review_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `review_score` int(11) NOT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`team_review_id`),
  KEY `team_review_team_id_idx` (`team_id`),
  KEY `fk_team_review_user_id_idx` (`user_id`),
  CONSTRAINT `fk_team_review_team_id` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_review_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_reviews`
--

LOCK TABLES `team_reviews` WRITE;
/*!40000 ALTER TABLE `team_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_users`
--

DROP TABLE IF EXISTS `team_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_users` (
  `team_user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`team_user_id`),
  UNIQUE KEY `team_users_team_id_user_id_UNIQUE` (`team_id`,`user_id`),
  KEY `fk_team_users_team_id_idx` (`team_id`),
  KEY `fk_team_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_team_users_team_id` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_users`
--

LOCK TABLES `team_users` WRITE;
/*!40000 ALTER TABLE `team_users` DISABLE KEYS */;
INSERT INTO `team_users` VALUES (1,1,2),(2,1,7),(3,1,8),(4,2,4),(5,2,5),(6,2,6),(7,4,7),(8,5,8),(28,9,4),(29,9,5),(30,9,6);
/*!40000 ALTER TABLE `team_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `team_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_github_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `academic_year` int(11) NOT NULL,
  `approved` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Grupa 1','Todo App','https://github.com/MarkoRezic/Todo-App',2022,1),(2,'Grupa 2','Calculator App','https://github.com/TestTest1/Calculator',2022,1),(3,'Grupa 3','Foto Editor','https://github.com/TestTest2/Foto-Editor',2022,1),(4,'Grupa 4','Movies App','https://github.com/AnteAntić/Movies-App',2022,1),(5,'Grupa 5','Calorie Counter','https://github.com/BoboBobić/Calorie-Counter',2022,0),(6,'Grupa 6','Blog','https://github.com/TestTest3/Blog',2022,1),(7,'Grupa 15','Test projekt',NULL,2023,0),(8,'Grupa 16','Test projekt',NULL,2023,1),(9,'Grupa 17','Test projekt',NULL,2023,1);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technologies` (
  `technology_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`technology_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies`
--

LOCK TABLES `technologies` WRITE;
/*!40000 ALTER TABLE `technologies` DISABLE KEYS */;
INSERT INTO `technologies` VALUES (1,'Javascript','https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png'),(2,'Python','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/935px-Python-logo-notext.svg.png'),(3,'C','https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/380px-C_Programming_Language.svg.png?20201031132917'),(4,'C++','https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png'),(5,'C#','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1200px-Logo_C_sharp.svg.png'),(6,'Java','https://static.vecteezy.com/system/resources/previews/022/101/050/original/java-logo-transparent-free-png.png'),(7,'Ruby','https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/2048px-Ruby_logo.svg.png'),(8,'PHP','https://www.svgrepo.com/show/452088/php.svg'),(9,'Typescript','https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201'),(10,'Swift','https://i.pinimg.com/originals/8f/50/63/8f50630ae0e1775196e4c270c573ce67.png'),(11,'Go','https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png'),(12,'HTML','https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/800px-HTML5_Badge.svg.png'),(13,'CSS','https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png'),(14,'React','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'),(15,'Vue','https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png'),(16,'Angular','https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png'),(17,'Laravel','https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png'),(18,'NodeJS','https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png'),(19,'MySQL','https://planet.mysql.com/images/planet-logo.svg'),(20,'MariaDB','https://mariadb.com/wp-content/uploads/2019/11/mariadb-logo-vert_blue-transparent.png'),(21,'MongoDB','https://seeklogo.com/images/M/mongodb-logo-D13D67C930-seeklogo.com.png'),(22,'PostgreSQL','https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png'),(23,'SQL Server','https://martinsblog.dk/wp-content/uploads/2021/07/sql-logo.png'),(24,'ORACLE','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Oracle_Corporation_logo.svg/2560px-Oracle_Corporation_logo.svg.png'),(25,'Docker','https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png'),(26,'GitHub','https://cdn-icons-png.flaticon.com/512/25/25231.png'),(27,'Git','https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png'),(28,'Bash','https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/2048px-Bash_Logo_Colored.svg.png'),(29,'OAuth','https://upload.wikimedia.org/wikipedia/commons/d/d2/Oauth_logo.svg'),(30,'eduID','https://aai.sum.ba/sso/module.php/sumbagui/imgs/Logo.svg'),(31,'npm','https://authy.com/wp-content/uploads/npm-logo.png'),(32,'yarn','https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/yarn-package-manager-icon.png');
/*!40000 ALTER TABLE `technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `edu_id` int(10) unsigned DEFAULT NULL,
  `edu_uid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iss_username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_profile_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `edu_id_UNIQUE` (`edu_id`),
  UNIQUE KEY `edu_uid_UNIQUE` (`edu_uid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_role_id_idx` (`role_id`),
  CONSTRAINT `fk_users_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'Admin','Admin',NULL,'https://cdn2.vectorstock.com/i/1000x1000/16/66/call-center-customer-service-assistant-avatar-icon-vector-16601666.jpg',2,'admin@admin.com','$2b$10$eBchIXsjBUMO0WTJDNOoheRda4ofr/zuoKCYdosBFsQB3n46UxybK',NULL),(2,4958,'mrezic1','Marko','Rezić','FSRE590-RM','https://api.eduid.sum.ba/files/f657a930-6510-49d3-86bd-6bbb7f5bf56f',1,'marko.rezic@fsre.sum.ba',NULL,NULL),(3,NULL,NULL,'Test','Test',NULL,NULL,2,'test@test.com','$2b$10$43IWqAEXD3XkCEltqOriFesXouAmChhApTpNSndnaWTmeeWU/AgMa',NULL),(4,1,'ttest1','Test','Test1','FSRE101-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'test1@test.com',NULL,'https://github.com/TestTest1'),(5,2,'ttest2','Test','Test2','FSRE102-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'test2@test.com',NULL,'https://github.com/TestTest2'),(6,3,'ttest3','Test','Test3','FSRE103-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'test3@test.com',NULL,'https://github.com/TestTest3'),(7,4,'aantic1','Ante','Antić','FSRE104-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'anteantic@test.com',NULL,'https://github.com/AnteAntic'),(8,5,'bbobic','Bobo','Bobić','FSRE105-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'bobobobic@test.com',NULL,'https://github.com/BoboBobic'),(9,NULL,NULL,'Admin2','Admin2',NULL,'https://i.pinimg.com/1200x/34/60/3c/34603ce8a80b1ce9a768cad7ebf63c56.jpg',2,'admin2@admin.com','$2b$10$MZDvu3kO/YN/dJISPjNXNuy8pW4ihWVa.TUaSLwgD0q7HsGa8TWlK',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `vote_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned DEFAULT NULL,
  `comment_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `value` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`vote_id`),
  KEY `fk_votes_post_id_idx` (`post_id`),
  KEY `fk_votes_comment_id_idx` (`comment_id`),
  KEY `fk_votes_user_id_idx` (`user_id`),
  CONSTRAINT `fk_votes_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_votes_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_votes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25  1:15:46
