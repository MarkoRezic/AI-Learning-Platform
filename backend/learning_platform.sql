-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: learning_platform
-- ------------------------------------------------------
-- Server version	8.0.33

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

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `learning_platform` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `learning_platform`;

--
-- Table structure for table `card_set_cards`
--

DROP TABLE IF EXISTS `card_set_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_set_cards` (
  `card_set_card_id` int unsigned NOT NULL AUTO_INCREMENT,
  `card_set_id` int unsigned NOT NULL,
  `card_id` int unsigned NOT NULL,
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
  `card_set_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `public` tinyint unsigned NOT NULL DEFAULT '0',
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
  `card_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `text` varchar(100) NOT NULL,
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
  `card_user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `card_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`card_user_id`),
  KEY `fk_card_users_card_id_idx` (`card_id`),
  KEY `fk_card_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_card_users_card_id` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_card_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_users`
--

LOCK TABLES `card_users` WRITE;
/*!40000 ALTER TABLE `card_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `card_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `lecture_id` int unsigned DEFAULT NULL,
  `file_id` int unsigned DEFAULT NULL,
  `card_type_id` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `question` text,
  `public` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`card_id`),
  KEY `fk_cards_user_id_idx` (`user_id`),
  KEY `fk_cards_lecture_id_idx` (`lecture_id`),
  KEY `fk_cards_file_id_idx` (`file_id`),
  KEY `fk_cards_card_type_id_idx` (`card_type_id`),
  CONSTRAINT `fk_cards_card_type_id` FOREIGN KEY (`card_type_id`) REFERENCES `card_types` (`card_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cards_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cards_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cards_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `parent_comment_id` int unsigned DEFAULT NULL,
  `text` text NOT NULL,
  `anonymous` tinyint unsigned NOT NULL DEFAULT '0',
  `deleted` tinyint unsigned NOT NULL DEFAULT '0',
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
  `file_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `text` varchar(100) NOT NULL,
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
  `file_user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`file_user_id`),
  KEY `fk_file_users_file_id_idx` (`file_id`),
  KEY `fk_file_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_file_users_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_file_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `file_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `file_type_id` int unsigned NOT NULL,
  `uuid_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `public` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `uuid_name_UNIQUE` (`uuid_name`),
  KEY `fk_files_user_id_idx` (`user_id`),
  KEY `fk_files_file_type_id_idx` (`file_type_id`),
  CONSTRAINT `fk_files_file_type_id` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`file_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_files_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture_files`
--

DROP TABLE IF EXISTS `lecture_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_files` (
  `lecture_file_id` int unsigned NOT NULL AUTO_INCREMENT,
  `lecture_id` int unsigned NOT NULL,
  `file_id` int unsigned NOT NULL,
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
-- Table structure for table `lecture_users`
--

DROP TABLE IF EXISTS `lecture_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture_users` (
  `lecture_user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `lecture_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`lecture_user_id`),
  KEY `fk_lecture_users_lecture_id_idx` (`lecture_id`),
  KEY `fk_lecture_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_lecture_users_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_lecture_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture_users`
--

LOCK TABLES `lecture_users` WRITE;
/*!40000 ALTER TABLE `lecture_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `lecture_id` int unsigned NOT NULL AUTO_INCREMENT,
  `parent_lecture_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `keywords` text,
  `text` text NOT NULL,
  `html` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`lecture_id`),
  KEY `fk_lectures_parent_lecture_id_idx` (`parent_lecture_id`),
  CONSTRAINT `fk_lectures_parent_lecture_id` FOREIGN KEY (`parent_lecture_id`) REFERENCES `lectures` (`lecture_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_files`
--

DROP TABLE IF EXISTS `post_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_files` (
  `post_file_id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `file_id` int unsigned NOT NULL,
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
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `lecture_id` int unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `anonymous` tinyint unsigned NOT NULL DEFAULT '0',
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
  `role_id` int unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
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
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('649eS_B_LYnlQSNKPqh4XLBS2oWhNGeq',1696332437,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"lax\"},\"userInfo\":{\"user_id\":1,\"edu_id\":null,\"edu_uid\":null,\"firstname\":\"Admin\",\"lastname\":\"Admin\",\"iss_username\":null,\"avatar_url\":null,\"role_id\":2,\"email\":\"admin@admin.com\",\"github_profile_link\":null,\"role_name\":\"admin\"}}'),('CIbCrCEjTsP73Fyt6by5AhdmAYKNr_Jo',1696331945,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":false,\"path\":null,\"sameSite\":\"lax\"},\"userInfo\":{\"user_id\":1,\"edu_id\":null,\"edu_uid\":null,\"firstname\":\"Admin\",\"lastname\":\"Admin\",\"iss_username\":null,\"avatar_url\":null,\"role_id\":2,\"email\":\"admin@admin.com\",\"github_profile_link\":null,\"role_name\":\"admin\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_reviews`
--

DROP TABLE IF EXISTS `team_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_reviews` (
  `team_review_id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `review_score` int NOT NULL,
  `review_text` text,
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
  `team_user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`team_user_id`),
  KEY `fk_team_users_team_id_idx` (`team_id`),
  KEY `fk_team_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_team_users_team_id` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_users`
--

LOCK TABLES `team_users` WRITE;
/*!40000 ALTER TABLE `team_users` DISABLE KEYS */;
INSERT INTO `team_users` VALUES (1,1,2),(2,1,7),(3,1,8),(4,2,4),(5,2,5),(6,2,6),(7,4,7),(8,5,8);
/*!40000 ALTER TABLE `team_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `team_id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_github_link` varchar(255) DEFAULT NULL,
  `academic_year` int NOT NULL,
  `approved` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Grupa 1','Todo App','https://github.com/MarkoRezic/Todo-App',2022,1),(2,'Grupa 2','Calculator App','https://github.com/TestTest1/Calculator',2022,1),(3,'Grupa 3','Foto Editor','https://github.com/TestTest2/Foto-Editor',2022,1),(4,'Grupa 4','Movies App','https://github.com/AnteAntić/Movies-App',2022,1),(5,'Grupa 5','Calorie Counter','https://github.com/BoboBobić/Calorie-Counter',2022,0),(6,'Grupa 6','Blog','https://github.com/TestTest3/Blog',2022,1);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `edu_id` int unsigned DEFAULT NULL,
  `edu_uid` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `iss_username` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `role_id` int unsigned NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `github_profile_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `edu_id_UNIQUE` (`edu_id`),
  UNIQUE KEY `edu_uid_UNIQUE` (`edu_uid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_role_id_idx` (`role_id`),
  CONSTRAINT `fk_users_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'Admin','Admin',NULL,NULL,2,'admin@admin.com','$2b$10$eBchIXsjBUMO0WTJDNOoheRda4ofr/zuoKCYdosBFsQB3n46UxybK',NULL),(2,4958,'mrezic1','Marko','Rezić','FSRE590-RM','https://api.eduid.sum.ba/files/f657a930-6510-49d3-86bd-6bbb7f5bf56f',1,'marko.rezic@fsre.sum.ba',NULL,NULL),(3,NULL,NULL,'Test','Test',NULL,NULL,2,'test@test.com','$2b$10$43IWqAEXD3XkCEltqOriFesXouAmChhApTpNSndnaWTmeeWU/AgMa',NULL),(4,1,'ttest1','Test','Test1','FSRE101-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'test1@test.com',NULL,'https://github.com/TestTest1'),(5,2,'ttest2','Test','Test2','FSRE102-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'test2@test.com',NULL,'https://github.com/TestTest2'),(6,3,'ttest3','Test','Test3','FSRE103-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'test3@test.com',NULL,'https://github.com/TestTest3'),(7,4,'aantic1','Ante','Antić','FSRE104-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'anteantic@test.com',NULL,'https://github.com/AnteAntic'),(8,5,'bbobic','Bobo','Bobić','FSRE105-RM','https://cdn-icons-png.flaticon.com/512/6596/6596121.png',1,'bobobobic@test.com',NULL,'https://github.com/BoboBobic');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `vote_id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned DEFAULT NULL,
  `comment_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  `value` tinyint NOT NULL DEFAULT '0',
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

-- Dump completed on 2023-10-03 12:34:06
