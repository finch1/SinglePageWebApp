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
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `groupt`
--

DROP TABLE IF EXISTS `groupt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupt` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(50) NOT NULL,
  `groupColor` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `groupName` (`groupName`),
  UNIQUE KEY `groupColor` (`groupColor`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sharedprojects`
--

DROP TABLE IF EXISTS `sharedprojects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sharedprojects` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `sharedprojectname` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sharedprojectname` (`sharedprojectname`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sharedtasks`
--

DROP TABLE IF EXISTS `sharedtasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sharedtasks` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `sharedtaskname` varchar(50) NOT NULL,
  `projectID` int(3) NOT NULL,
  `sharedtaskdate` date DEFAULT NULL,
  `sharedtasktime` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_projectID` (`projectID`),
  CONSTRAINT `sharedtasks_ibfk_1` FOREIGN KEY (`projectID`) REFERENCES `sharedprojects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sharedusers`
--

DROP TABLE IF EXISTS `sharedusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sharedusers` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shareduserstoproj`
--

DROP TABLE IF EXISTS `shareduserstoproj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shareduserstoproj` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `usernameID` int(3) NOT NULL,
  `projectID` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_usernameID` (`usernameID`),
  KEY `idx_projectID` (`projectID`),
  CONSTRAINT `shareduserstoproj_ibfk_1` FOREIGN KEY (`usernameID`) REFERENCES `sharedusers` (`id`),
  CONSTRAINT `shareduserstoproj_ibfk_2` FOREIGN KEY (`projectID`) REFERENCES `sharedprojects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `taskName` varchar(50) NOT NULL,
  `groupId` int(3) DEFAULT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_taskName` (`taskName`),
  KEY `groupId` (`groupId`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `groupt` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-03 19:51:18
