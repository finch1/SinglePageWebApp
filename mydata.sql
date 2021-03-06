-- MySQL dump 10.16  Distrib 10.1.29-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: taskmanager
-- ------------------------------------------------------
-- Server version	10.1.29-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `groupt`
--

LOCK TABLES `groupt` WRITE;
/*!40000 ALTER TABLE `groupt` DISABLE KEYS */;
INSERT INTO `groupt` VALUES (1,'Personal','ffff80'),(2,'Family Matter','bc6972'),(3,'Work Work','f069f2'),(4,'Sports Stuff','ff0000'),(8,'Life','f0f0f0'),(13,'Band45','000080');
/*!40000 ALTER TABLE `groupt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sharedprojects`
--

LOCK TABLES `sharedprojects` WRITE;
/*!40000 ALTER TABLE `sharedprojects` DISABLE KEYS */;
INSERT INTO `sharedprojects` VALUES (6,'marketing'),(2,'new item'),(9,'project zero'),(1,'prototype');
/*!40000 ALTER TABLE `sharedprojects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sharedtasks`
--

LOCK TABLES `sharedtasks` WRITE;
/*!40000 ALTER TABLE `sharedtasks` DISABLE KEYS */;
INSERT INTO `sharedtasks` VALUES (2,'start project',1,'2018-05-02','09:05:00'),(3,'meeting',1,'2018-05-02','09:15:00'),(4,'buy parts',1,'2018-05-02','10:00:00'),(5,'new product',2,'2018-05-08','10:05:00'),(7,'buy more parts',1,'2018-05-17','00:01:00');
/*!40000 ALTER TABLE `sharedtasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sharedusers`
--

LOCK TABLES `sharedusers` WRITE;
/*!40000 ALTER TABLE `sharedusers` DISABLE KEYS */;
INSERT INTO `sharedusers` VALUES (3,'adam'),(16,'chino'),(7,'felix'),(5,'lee'),(1,'mike'),(14,'nacho'),(2,'peter'),(4,'terry'),(8,'theres'),(9,'zelda');
/*!40000 ALTER TABLE `sharedusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `shareduserstoproj`
--

LOCK TABLES `shareduserstoproj` WRITE;
/*!40000 ALTER TABLE `shareduserstoproj` DISABLE KEYS */;
INSERT INTO `shareduserstoproj` VALUES (1,1,1),(2,2,1),(5,3,2),(6,5,2),(13,14,1),(14,16,6),(15,7,6);
/*!40000 ALTER TABLE `shareduserstoproj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (4,'eat flakes',2,'2018-04-03 20:00:00'),(5,'sleep',2,'2018-05-02 20:00:00'),(15,'swim',8,'2018-04-29 01:58:00'),(20,'Perform',13,'2018-05-02 19:00:00'),(36,'new task',1,'2018-05-04 17:00:00');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-03 19:50:25
