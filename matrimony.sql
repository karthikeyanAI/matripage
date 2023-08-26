-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: matrimony
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chats` (
  `username` varchar(255) DEFAULT NULL,
  `friendname` varchar(255) DEFAULT NULL,
  `userchat` varchar(255) DEFAULT NULL,
  `msgtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES ('madhu','undefined','hello','2018-12-30 04:59:05'),('madhu','himaja','waaasuuuup','2018-12-30 05:01:02'),('madhu','himaja','ok','2018-12-30 05:06:50'),('madhu','priya','hiiiiiiiiiiiiiiiii','2018-12-30 06:52:03'),('madhu','himaja','will marry','2018-12-30 07:41:50'),('himaja','madhu','will see','2018-12-30 08:28:18'),('himaja','madhu','kk','2018-12-30 09:22:03'),('himaja','madhu','dksd','2018-12-30 09:22:09'),('himaja','madhu','respond naa','2018-12-30 09:49:30'),('himaja','madhu','scrolllll','2018-12-30 09:49:43'),('madhu','elizabeth','holaa','2018-12-30 10:52:36'),('elizabeth','madhu','hellooo','2018-12-30 10:55:28'),('madhu','elizabeth','wassup','2018-12-30 12:57:16'),('elizabeth','madhu','nothing','2018-12-30 12:57:40'),('madhu','Tarun','jagan','2019-05-01 07:41:05'),('madhu','Tarun','hello','2019-05-01 07:41:17'),('madhu','Tarun','a','2019-05-01 07:41:21'),('madhu','Tarun','a','2019-05-01 07:41:25'),('madhu','Tarun','a','2019-05-01 07:41:28'),('madhu','Tarun','a','2019-05-01 07:41:31'),('madhu','Tarun','hello','2019-11-14 13:26:27');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `user` varchar(255) DEFAULT NULL,
  `liked` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('madhu','.Pooja..Tarun..madhu..elizabeth..Nivetha..himaja..priya.......'),('navani','.priya.'),('Pooja','.himaja..sharuk..obreyn..jessy..Nivetha..elizabeth..Lucky..madhu..navani..Tarun..........'),('himaja','.madhu..navani..Tarun..sharuk....'),('thomas','.elizabeth..Nivetha..'),('elizabeth','.Lucky..navani..madhu...');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `firstInsert` BEFORE INSERT ON `likes` FOR EACH ROW set NEW.liked=concat(".",NEW.liked,".") */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `likes` BEFORE UPDATE ON `likes` FOR EACH ROW set NEW.liked=concat(".",NEW.liked,".",OLD.liked,".") */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rlikes`
--

DROP TABLE IF EXISTS `rlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rlikes` (
  `user` varchar(255) DEFAULT NULL,
  `likedBy` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rlikes`
--

LOCK TABLES `rlikes` WRITE;
/*!40000 ALTER TABLE `rlikes` DISABLE KEYS */;
INSERT INTO `rlikes` VALUES ('navani','elizabeth'),('madhu','elizabeth'),('Nivetha','thomas'),('elizabeth','thomas'),('Lucky','elizabeth'),('Tarun','madhu');
/*!40000 ALTER TABLE `rlikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shortlist`
--

DROP TABLE IF EXISTS `shortlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shortlist` (
  `user` varchar(255) DEFAULT NULL,
  `shortlisted` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shortlist`
--

LOCK TABLES `shortlist` WRITE;
/*!40000 ALTER TABLE `shortlist` DISABLE KEYS */;
INSERT INTO `shortlist` VALUES ('Pooja','.sharuk..obreyn..Nivetha...'),('thomas','.elizabeth.'),('elizabeth','.navani.');
/*!40000 ALTER TABLE `shortlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertFirst` BEFORE INSERT ON `shortlist` FOR EACH ROW set NEW.shortlisted=concat(".",NEW.shortlisted,".") */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `updateFirst` BEFORE UPDATE ON `shortlist` FOR EACH ROW set NEW.shortlisted=concat(".",NEW.shortlisted,".",OLD.shortlisted,".") */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `pname` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `about` varchar(250) NOT NULL,
  `dob` date NOT NULL,
  `religion` varchar(25) NOT NULL,
  `motherTongue` varchar(25) NOT NULL,
  `height` int(5) NOT NULL,
  `mStatus` varchar(25) NOT NULL,
  `privacy` int(2) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `college` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL,
  `flag` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `feedback` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'madhu','babu','madhu','male','madhubabu@gmail.com','madhu','I come from an upper middle class family. The most important thing in my life is religious believes, moral values & respect for elders. I am modern thinker but also believe in good values given by our ancestors','1990-10-24','Hindu','telugu',154,'Never Married',0,'B.Tech','NITT','bussinessman','INDIA',25000,0,'madhu.jpg',5),(2,'navanesh','reddy','navani','male','navani@gmail.com','navani',' have always been an achiever; be it academics or professional life or sports or any other field in my life. I believe in success through hard work & dedication','1996-07-18','Hindu','telugu',160,'Never Married',0,'B.Tech','NITT','cotton bussiness','INDIA',125500,0,'navani.jpg',NULL),(3,'tarun','kumar','Tarun','male','tarun143@gmail.com','tarun','I am a soft spoken, honest & talented person. I have a good job, decent salary & a nice house to live in. I think family as the first priority of my life.my friends call me lipstick spoiler.','1993-02-14','Hindu','Telugu',165,'Never Married',0,'B.Tech','NITT','priest','INDIA',150000,0,'Tarun.jpg',NULL),(4,'himaja','reddy','himaja','female','himaja345@gmail.com','himaja','I am a ambitious, self-made, work alcoholic but down to earth person. I like to balance professional & family life.','1988-03-10','Hindu','kannada',154,'Never Married',0,'MBBS','sastra','Nurse','INDIA',35000,0,'himaja.jpg',NULL),(5,'priya','soundar','priya','female','priya234@gmail.com','priya','I am a warm, caring, loving & trustworthy person. I share a very special bond with all my friends & family.','1995-02-09','Hindu','gujarathi',156,'Never Married',0,'M.tech','manipal','software engineer','INDIA',50000,0,'priya.jpg',NULL),(6,'jessica','david','jessy','female','jessica1231@gmail.com','jessica',' I love to keep secrets & all the people around me confide their problems to me. I like to help people to find solutions to their problems & also do a lot of social service .','1994-07-13','Christian','malayalam',156,'Never Married',0,'M.s','LPU','model','INDIA',75000,0,NULL,NULL),(7,'obreyn','martell','obreyn','male','obreyn23@gmail.com','obreyn','I would describe myself as someone who is honest, caring, intelligent, hardworking, and ambitious. I have a great sense of humour. I am an easy going person.','1990-11-22','Christian','Assameese',176,'Never Married',0,'C.A.','IIM-B','Analyst','INDIA',45000,0,'obreyn.jpg',NULL),(8,'sharuk','khan','sharuk','male','sharuk@gmail.com','sharuk','I would describe myself as someone who is honest, caring, intelligent, hardworking, and ambitious. I have a great sense of humour. I am an easy going person .','1985-12-12','Muslim','Gujarathi',154,'Never Married',0,'M.Tech','BITS Pilani','Bussiness','INDIA',200000,0,NULL,NULL),(9,'Lakshman','Tammineedi','Lucky','male','hematiger@gmail.com','tiger','I am looking for bride who is quite educated,caring and can be from any religion or caste. ','1994-10-04','Hindu','Telugu',174,'Never Married',0,'B.tech','NIT Trichy','Senior Software Developer','India',2500000,0,'Lucky.jpg',NULL),(10,'Pooja','Rao','Pooja','female','pooja@gmail.com','pooja','I believe in emotions not anger and give value for the people i love','1985-06-21','Hindu','Hindi',169,'Never Married',0,'MBA','IIM Calcutta','Marketing Exectuive','India',3500000,0,'Pooja.jpg',2),(11,'Nivetha','Thomas','Nivetha','female','nivetha@gmail.com','nivetha','i come from decent family and i am well educated. I am very calm and siimple. I want every thing to be minimal so that its shines','1978-05-05','Christian','English',159,'Never Married',0,'Fashion Designing','NIFT','Fashion Designer','India',1500000,0,'Nivetha.jpg',NULL),(12,'Sravani','Pendota','Sravani','female','sravani@gmail.com','sravani','I am from well settled family. My family always supported me in the things i wanted to do. I love them more than anyone else','1990-09-19','Sikh','Other',166,'Never Married',0,'Degree','Lovely Professional University','Boxer','India',1000000,0,'Sravani.jpg',NULL),(13,'Mumtaj','Begum','Mumtaj','female','mumtaj@gmail.com','mumtaj','do what you do and move on','1987-12-21','Muslim','urdu',157,'Never Married',0,'M.tech','Delhi University','Computer Engineer','India',900000,0,NULL,NULL),(14,'Elizabeth','keen','elizabeth','female','elizabeth@gmail.com','elizabeth','I  am 22 years old, 5’6? tall, with a medium build and cheerful outlook towards life. I am a commerce graduate from Delhi University and I am currently figuring out the options I have in terms of pursuing my studies further or finding a job.','1994-06-29','Christian','English',145,'Never Married',0,'UG','Delhi University','Teacher','India',500000,0,NULL,NULL),(16,'thomas','shelby','thomas','male','thomas@gmail.com','thomas','lkdwmslfsal;c,al;scl;s,c;z,xc','1985-10-21','Hindu','Malayali',175,'Never Married',0,'B.Tech','NITT','bussinessman','INDIA',12500,0,'thomas.jpg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-06 12:49:29
