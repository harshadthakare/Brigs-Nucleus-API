-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 10, 2019 at 01:21 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brigsnucleus`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `mobileNumber` varchar(50) NOT NULL,
  `emailId` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` int(11) NOT NULL,
  `isDefault` int(11) NOT NULL DEFAULT '0',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `firstName`, `lastName`, `organizationIdFK`, `mobileNumber`, `emailId`, `password`, `otp`, `isDefault`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Ajay', 'Khatavkar', 1, '9579368483', 'ajay@stackmint.com', 'admin12345', 0, 0, '2019-07-16 06:06:35', '2019-10-03 14:22:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `alert`
--

CREATE TABLE `alert` (
  `alertId` int(11) NOT NULL,
  `masterIdType` varchar(255) NOT NULL,
  `masterIdFK` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alert`
--

INSERT INTO `alert` (`alertId`, `masterIdType`, `masterIdFK`, `title`, `image`, `message`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'asset', 1, 'Check water level', 'index.png', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2019-07-16 12:45:15', '2019-09-30 13:31:24', 0),
(2, 'asset', 2, 'Checklist submission remaining', 'index.png', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2019-07-16 13:16:19', '2019-09-30 13:31:39', 0),
(3, 'doneChecklist', 1, 'Need Inspection', 'index.png', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2019-09-30 10:48:35', '2019-09-30 13:31:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `alerttracking`
--

CREATE TABLE `alerttracking` (
  `alertTrackingId` int(11) NOT NULL,
  `alertIdFK` int(11) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `isRead` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answerId` int(11) NOT NULL,
  `doneChecklistIdFK` int(11) NOT NULL,
  `questionIdFK` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `isDanger` int(2) NOT NULL DEFAULT '0',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`answerId`, `doneChecklistIdFK`, `questionIdFK`, `answer`, `isDanger`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 21, '2019-10-10', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(2, 1, 1, 'Mahesh', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(3, 1, 19, 'Jdjjd', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(4, 1, 2, '2019-10-10', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(5, 1, 3, 'Male', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(6, 1, 4, 'Green, Red, ', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(7, 1, 5, 'Good', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(8, 1, 9, 'Bad', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(9, 1, 16, 'Hsjsj', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(10, 1, 20, 'Yes, ', 0, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(11, 2, 21, '2019-10-10', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(12, 2, 1, 'Mahesh', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(13, 2, 2, '2019-10-10', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(14, 2, 3, 'Male', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(15, 2, 4, 'Green, Red, ', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(16, 2, 5, 'Good', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(17, 2, 9, 'Bad', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(18, 2, 16, 'Hsjsj', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(19, 2, 19, 'Jdjjd', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(20, 2, 20, 'Yes, ', 0, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(21, 3, 19, 'Jdjjd', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(22, 3, 16, 'Hsjsj', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(23, 3, 9, 'Bad', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(24, 3, 1, 'Mahesh', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(25, 3, 5, 'Good', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(26, 3, 2, '2019-10-10', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(27, 3, 4, 'Green, Red, ', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(28, 3, 20, 'Yes, ', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(29, 3, 3, 'Male', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(30, 3, 21, '2019-10-10', 0, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(31, 4, 4, 'Green, Red, ', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(32, 4, 5, 'Good', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(33, 4, 3, 'Male', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(34, 4, 2, '2019-10-10', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(35, 4, 1, 'Mahesh', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(36, 4, 9, 'Bad', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(37, 4, 16, 'Hsjsj', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(38, 4, 20, 'Yes, ', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(39, 4, 19, 'Jdjjd', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(40, 4, 21, '2019-10-10', 0, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(41, 5, 16, 'Hsjsj', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(42, 5, 9, 'Bad', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(43, 5, 19, 'Jdjjd', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(44, 5, 20, 'Yes, ', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(45, 5, 5, 'Good', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(46, 5, 4, 'Green, Red, ', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(47, 5, 3, 'Male', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(48, 5, 2, '2019-10-10', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(49, 5, 1, 'Mahesh', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(50, 5, 21, '2019-10-10', 0, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(51, 6, 19, 'Jdjjd', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(52, 6, 3, 'Male', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(53, 6, 5, 'Good', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(54, 6, 20, 'Yes, ', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(55, 6, 16, 'Hsjsj', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(56, 6, 4, 'Green, Red, ', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(57, 6, 1, 'Mahesh', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(58, 6, 9, 'Bad', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(59, 6, 2, '2019-10-10', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(60, 6, 21, '2019-10-10', 0, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(61, 7, 4, 'Green, Red, ', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(62, 7, 1, 'Mahesh', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(63, 7, 3, 'Male', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(64, 7, 5, 'Good', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(65, 7, 16, 'Hsjsj', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(66, 7, 2, '2019-10-10', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(67, 7, 9, 'Bad', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(68, 7, 20, 'Yes, ', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(69, 7, 19, 'Jdjjd', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(70, 7, 21, '2019-10-10', 0, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(71, 8, 5, 'Good', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(72, 8, 4, 'Green, Red, ', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(73, 8, 3, 'Male', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(74, 8, 2, '2019-10-10', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(75, 8, 19, 'Jdjjd', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(76, 8, 9, 'Bad', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(77, 8, 16, 'Hsjsj', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(78, 8, 20, 'Yes, ', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(79, 8, 1, 'Mahesh', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(80, 8, 21, '2019-10-10', 0, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(81, 9, 4, 'Green, Red, ', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(82, 9, 3, 'Male', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(83, 9, 2, '2019-10-10', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(84, 9, 1, 'Mahesh', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(85, 9, 20, 'Yes, ', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(86, 9, 19, 'Jdjjd', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(87, 9, 16, 'Hsjsj', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(88, 9, 9, 'Bad', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(89, 9, 5, 'Good', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(90, 9, 21, '2019-10-10', 0, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(91, 10, 19, 'Jdjjd', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(92, 10, 16, 'Hsjsj', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(93, 10, 4, 'Green, Red, ', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(94, 10, 3, 'Male', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(95, 10, 9, 'Bad', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(96, 10, 2, '2019-10-10', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(97, 10, 1, 'Mahesh', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(98, 10, 20, 'Yes, ', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(99, 10, 5, 'Good', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(100, 10, 21, '2019-10-10', 0, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(101, 11, 21, '2019-10-10', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(102, 11, 1, 'Mahesh', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(103, 11, 2, '2019-10-10', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(104, 11, 3, 'Male', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(105, 11, 4, 'Green, Red, ', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(106, 11, 5, 'Good', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(107, 11, 9, 'Bad', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(108, 11, 16, 'Hsjsj', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(109, 11, 19, 'Jdjjd', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(110, 11, 20, 'Yes, ', 0, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(111, 12, 21, '2019-10-10', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(112, 12, 1, 'Mahesh', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(113, 12, 2, '2019-10-10', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(114, 12, 3, 'Male', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(115, 12, 4, 'Green, Red, ', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(116, 12, 5, 'Good', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(117, 12, 9, 'Bad', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(118, 12, 16, 'Hsjsj', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(119, 12, 19, 'Jdjjd', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(120, 12, 20, 'Yes, ', 0, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(121, 13, 5, 'Good', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(122, 13, 4, 'Green, Red, ', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(123, 13, 1, 'Mahesh', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(124, 13, 2, '2019-10-10', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(125, 13, 9, 'Bad', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(126, 13, 20, 'Yes, ', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(127, 13, 3, 'Male', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(128, 13, 16, 'Hsjsj', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(129, 13, 19, 'Jdjjd', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(130, 13, 21, '2019-10-10', 0, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(131, 14, 3, 'Male', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(132, 14, 16, 'Hsjsj', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(133, 14, 20, 'Yes, ', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(134, 14, 1, 'Mahesh', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(135, 14, 9, 'Bad', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(136, 14, 4, 'Green, Red, ', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(137, 14, 5, 'Good', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(138, 14, 19, 'Jdjjd', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(139, 14, 2, '2019-10-10', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(140, 14, 21, '2019-10-10', 0, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(141, 15, 5, 'Good', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(142, 15, 1, 'Mahesh', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(143, 15, 16, 'Hsjsj', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(144, 15, 2, '2019-10-10', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(145, 15, 3, 'Male', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(146, 15, 9, 'Bad', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(147, 15, 4, 'Green, Red, ', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(148, 15, 20, 'Yes, ', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(149, 15, 19, 'Jdjjd', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(150, 15, 21, '2019-10-10', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(151, 16, 3, 'Male', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(152, 16, 20, 'Yes, ', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(153, 16, 1, 'Shital', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(154, 16, 9, 'Bad', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(155, 16, 4, 'Red, Green, ', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(156, 16, 2, '2019-10-26', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(157, 16, 5, 'Fine', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(158, 16, 21, '2019-10-24', 0, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(159, 17, 3, 'Female', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(160, 17, 9, 'Good ', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(161, 17, 19, 'Jyccbnj', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(162, 17, 4, 'Green, Blue, ', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(163, 17, 16, 'Bfdyjjbg', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(164, 17, 21, '2019-08-10', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(165, 17, 2, '2019-02-25', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(166, 17, 1, 'Kavi', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(167, 17, 20, 'No, ', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0),
(168, 17, 5, 'Fine', 0, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `assetId` int(11) NOT NULL,
  `assetCode` varchar(255) NOT NULL,
  `assetTitle` varchar(255) NOT NULL,
  `modelNumber` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `installationDate` date NOT NULL,
  `installationLocationTypeIdFK` int(11) NOT NULL,
  `installedLocation` varchar(255) NOT NULL,
  `userGuideBook` varchar(255) NOT NULL,
  `durationTypeIdFK` int(11) NOT NULL,
  `checkingDuration` varchar(50) NOT NULL,
  `warrantyDurationTypeIdFK` int(11) NOT NULL,
  `warrenty` varchar(50) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `supplierIdFK` int(11) NOT NULL,
  `departmentIdFK` int(11) NOT NULL,
  `manufacturerIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`assetId`, `assetCode`, `assetTitle`, `modelNumber`, `description`, `image`, `installationDate`, `installationLocationTypeIdFK`, `installedLocation`, `userGuideBook`, `durationTypeIdFK`, `checkingDuration`, `warrantyDurationTypeIdFK`, `warrenty`, `organizationIdFK`, `supplierIdFK`, `departmentIdFK`, `manufacturerIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'MOD548781235', 'Eco Fire ABC Powder Fire Extinguisher', ' INV54439834', 'ECO FIRE ABC Powder Type (Stored Pressure) Fire Extinguisher 4 Kg. Capacity ISI Mark IS: 15683 operating temperature (-0) ºC to (+55) ºC and Fire Rating 2A & 21B type of fire filled with MAP Powder', '41rw7lJQ3aL.jpg', '2019-07-25', 3, 'Pune', 'hand-portable-dry-chemical-extinguishers-eaf8ef21.pdf', 2, '2', 1, '1', 1, 2, 1, 3, '2019-07-17 08:49:48', '2019-10-10 11:15:30', 0),
(2, '1563796390', 'Telephone', 'INV54439835', 'The definition of a telephone is a system used to send speech or data over distances using a device called a telephone that functions as the transmitter and receiver. An example of a telephone is a network or system that transmits electrical signals so you can call someone in Japan from your home in New york.', 'telephone.jpg', '2019-07-25', 1, 'fdfsd', 'document-1569478021270.docx', 2, '2', 1, '1', 2, 2, 1, 3, '2019-07-22 11:53:10', '2019-10-10 11:18:08', 0),
(3, '1569937983067', 'Mobile', 'INV54439836', 'To be checked mobile app', 'mobile.jpg', '0000-00-00', 3, 'Pune', '1.pdf', 3, '2', 3, '12', 3, 2, 3, 2, '2019-07-23 09:54:56', '2019-10-10 11:16:49', 0),
(4, '1570081239737', 'Printer', 'INV544398347', 'vxfx njioj vcftdd trygyh sdxrddx', 'printer.jpg', '0000-00-00', 3, 'pune', '1.pdf', 3, '2', 3, '2 ', 4, 1, 1, 3, '2019-07-24 07:18:35', '2019-10-10 11:16:53', 1),
(5, '1570605186517', 'test2', 'INV544398348', 'gfdgfdg56', 'image-1569478072592.jpeg', '2019-07-25', 1, 'fdfsd', 'document-1569478021270.docx', 2, '2', 1, '1', 1, 2, 1, 3, '2019-10-09 07:13:06', '2019-10-10 11:16:58', 1),
(6, '1570627287517', 'Refrigrator', 'INV544398349', 'aasdasdasd', 'image-1570626534072.png', '2019-07-17', 3, 'Thane', 'document-1570626663600.pdf', 3, '1', 2, '1', 1, 1, 1, 2, '2019-10-09 13:21:27', '2019-10-10 11:17:03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `assetcatrelation`
--

CREATE TABLE `assetcatrelation` (
  `assetCatRelationId` int(11) NOT NULL,
  `assetIdFK` int(11) NOT NULL,
  `categoryIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assetcatrelation`
--

INSERT INTO `assetcatrelation` (`assetCatRelationId`, `assetIdFK`, `categoryIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 2, '2019-07-18 06:19:54', '2019-10-09 11:23:16', 0),
(2, 2, 2, '2019-07-22 11:53:10', '2019-10-09 13:20:45', 0),
(3, 3, 6, '2019-07-23 09:54:56', '2019-07-23 09:54:56', 0),
(4, 4, 1, '2019-07-24 07:18:35', '2019-07-24 07:18:35', 0),
(5, 5, 2, '2019-10-09 07:13:06', '2019-10-09 07:13:06', 0),
(6, 6, 1, '2019-10-09 13:21:27', '2019-10-09 13:21:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `assignmenttype`
--

CREATE TABLE `assignmenttype` (
  `assignmentTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assignmenttype`
--

INSERT INTO `assignmenttype` (`assignmentTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Category', '2019-10-10 09:49:20', '2019-10-10 09:49:20', 0),
(2, 'Checklist', '2019-10-10 09:49:20', '2019-10-10 09:49:20', 0),
(3, 'Asset', '2019-10-10 09:49:30', '2019-10-10 09:49:30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `parentId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `parentId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 'Electronic', 1, '2019-07-18 06:18:36', '2019-09-09 07:05:55', 0),
(2, 2, 'Fire Brigade', 1, '2019-07-18 06:18:36', '2019-09-09 07:05:58', 0),
(3, 2, 'Gas', 2, '2019-07-18 06:18:36', '2019-09-09 07:06:01', 0),
(4, 2, 'Tank', 2, '2019-07-18 06:18:36', '2019-09-09 07:06:03', 0),
(5, 3, 'Furniture', 3, '2019-07-18 06:18:36', '2019-09-09 07:06:06', 0),
(6, 1, 'Telephone', 3, '2019-07-22 12:52:55', '2019-09-09 07:06:10', 0),
(7, 5, 'Table', 4, '2019-07-24 07:23:13', '2019-09-09 07:06:13', 0),
(8, 3, 'HPGas', 4, '2019-07-24 09:13:00', '2019-09-09 07:06:16', 1),
(9, 1, 'Refrigerator', 1, '2019-07-24 09:21:27', '2019-09-09 07:06:19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `checklist`
--

CREATE TABLE `checklist` (
  `checklistId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `categoryIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checklist`
--

INSERT INTO `checklist` (`checklistId`, `title`, `organizationIdFK`, `categoryIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Automatic actuation', 2, 1, '2019-09-16 11:38:30', '2019-10-03 14:23:47', 0),
(2, 'Actuation from fire station', 1, 3, '2019-09-20 13:04:58', '2019-10-03 14:23:54', 0),
(3, 'Fire Brigade Automatic', 1, 2, '2019-10-07 07:19:58', '2019-10-10 12:05:09', 0);

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `complaintId` int(11) NOT NULL,
  `typeOfComplaintFK` int(11) NOT NULL,
  `assetIdFK` int(11) NOT NULL DEFAULT '0',
  `complaintStatusIdFK` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `raiseBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `complaintimages`
--

CREATE TABLE `complaintimages` (
  `complaintImagesId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `imageName` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `complaintstatus`
--

CREATE TABLE `complaintstatus` (
  `complaintStatusId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaintstatus`
--

INSERT INTO `complaintstatus` (`complaintStatusId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'raised', '2019-10-09 09:52:39', '2019-10-09 09:53:11', 0),
(2, 'pending', '2019-10-09 09:52:39', '2019-10-09 09:52:39', 0),
(3, 'cancel', '2019-10-09 09:52:55', '2019-10-09 09:52:55', 0),
(4, 'transfer', '2019-10-09 09:52:55', '2019-10-09 09:52:55', 0),
(5, 'done', '2019-10-09 09:53:01', '2019-10-09 09:53:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `complainttrack`
--

CREATE TABLE `complainttrack` (
  `complaintTrackId` int(11) NOT NULL,
  `complaintStatusIdFK` int(11) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `parentId` int(11) NOT NULL,
  `departmentTitle` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmentId`, `organizationIdFK`, `parentId`, `departmentTitle`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 1, 'Purchasing', '2019-07-16 06:04:57', '2019-07-17 07:06:39', 0),
(3, 2, 1, 'Telecommunicatiom', '2019-07-22 12:45:53', '2019-07-22 12:45:53', 0),
(4, 4, 1, 'Purchasing', '2019-07-24 06:08:28', '2019-07-24 06:08:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `documentId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `documentTypeIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`documentId`, `title`, `description`, `filepath`, `documentTypeIdFK`, `masterId`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Information about asset', 'Fire extinguishers with a Class C rating are suitable for fires in “live” electrical equipment. Both monoammonium phosphate and sodium bicarbonate are commonly used to fight this type of fire because of their nonconductive properties. Fire extinguishers are classified by fire type', 'Fire Safety_0.pdf', 1, 1, '2019-09-20 10:23:36', '2019-10-10 11:49:33', 0),
(2, 'Information about printer', 'Printers can be divided into two main categories : Impact Printers : In this hammers or pins strike against a ribbon and paper to print the text. This mechanism is known as electro-mechanical mechanism. They are of two types. Character Printer : It prints only one character at a time.', 'printers.pdf', 2, 1, '2019-09-20 10:56:31', '2019-10-10 12:15:32', 0);

-- --------------------------------------------------------

--
-- Table structure for table `documenttype`
--

CREATE TABLE `documenttype` (
  `documentTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `documenttype`
--

INSERT INTO `documenttype` (`documentTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Category', '2019-09-09 09:20:15', '2019-09-09 09:20:15', 0),
(2, 'Asset', '2019-09-09 09:20:15', '2019-09-09 09:20:15', 0),
(3, 'General', '2019-09-09 09:20:30', '2019-09-09 09:20:30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `donechecklist`
--

CREATE TABLE `donechecklist` (
  `doneChecklistId` int(11) NOT NULL,
  `checkListIdFK` int(11) DEFAULT NULL,
  `assetIdFK` int(11) NOT NULL,
  `doneOn` date NOT NULL,
  `doneBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `donechecklist`
--

INSERT INTO `donechecklist` (`doneChecklistId`, `checkListIdFK`, `assetIdFK`, `doneOn`, `doneBy`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 3, 1, '2019-10-09', 2, '2019-10-09 05:19:19', '2019-10-09 05:19:19', 0),
(2, 3, 1, '2019-10-09', 2, '2019-10-09 05:20:00', '2019-10-09 05:20:00', 0),
(3, 3, 1, '2019-10-09', 2, '2019-10-09 05:20:11', '2019-10-09 05:20:11', 0),
(4, 3, 1, '2019-10-09', 2, '2019-10-09 05:22:34', '2019-10-09 05:22:34', 0),
(5, 3, 1, '2019-10-09', 2, '2019-10-09 05:25:11', '2019-10-09 05:25:11', 0),
(6, 3, 1, '2019-10-09', 2, '2019-10-09 05:27:33', '2019-10-09 05:27:33', 0),
(7, 3, 1, '2019-10-09', 2, '2019-10-09 05:29:41', '2019-10-09 05:29:41', 0),
(8, 3, 1, '2019-10-09', 2, '2019-10-09 05:30:28', '2019-10-09 05:30:28', 0),
(9, 3, 1, '2019-10-09', 2, '2019-10-09 05:32:40', '2019-10-09 05:32:40', 0),
(10, 3, 1, '2019-10-09', 2, '2019-10-09 05:34:34', '2019-10-09 05:34:34', 0),
(11, 3, 1, '2019-10-09', 2, '2019-10-09 05:35:33', '2019-10-09 05:35:33', 0),
(12, 3, 1, '2019-10-09', 2, '2019-10-09 05:36:27', '2019-10-09 05:36:27', 0),
(13, 3, 1, '2019-10-09', 2, '2019-10-09 05:37:37', '2019-10-09 05:37:37', 0),
(14, 3, 1, '2019-10-09', 2, '2019-10-09 05:40:44', '2019-10-09 05:40:44', 0),
(15, 3, 1, '2019-10-09', 2, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0),
(16, 3, 1, '2019-10-10', 3, '2019-10-10 12:08:09', '2019-10-10 12:08:09', 0),
(17, 3, 1, '2019-10-10', 3, '2019-10-10 12:12:48', '2019-10-10 12:12:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `durationtype`
--

CREATE TABLE `durationtype` (
  `durationTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `durationtype`
--

INSERT INTO `durationtype` (`durationTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Day', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0),
(2, 'Month', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0),
(3, 'Year', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `feature`
--

CREATE TABLE `feature` (
  `featureId` int(11) NOT NULL,
  `featureCode` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `featureassignment`
--

CREATE TABLE `featureassignment` (
  `featureAssignmentId` int(11) NOT NULL,
  `featureIdFK` int(11) NOT NULL,
  `userRoleIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `installationlocationtype`
--

CREATE TABLE `installationlocationtype` (
  `installationLocationTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `installationlocationtype`
--

INSERT INTO `installationlocationtype` (`installationLocationTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Home', '2019-07-17 07:18:01', '2019-07-17 07:18:01', 0),
(2, 'Store', '2019-07-17 07:18:01', '2019-07-17 07:18:01', 0),
(3, 'Office', '2019-07-17 07:18:01', '2019-07-17 07:18:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturerId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturerId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Volkswagen Group', 1, '2019-07-17 07:05:22', '2019-09-09 07:02:11', 0),
(2, 'Telecommunication', 2, '2019-07-22 12:54:26', '2019-09-09 07:02:13', 0),
(3, 'TATA Motors', 3, '2019-07-24 06:09:25', '2019-09-09 07:02:15', 0),
(4, 'Mahindra Automobiles', 4, '2019-07-24 06:09:46', '2019-09-09 07:02:18', 1),
(5, 'HP', 1, '2019-07-25 06:16:31', '2019-09-09 07:02:23', 0),
(6, 'Samsung', 2, '2019-07-25 06:19:44', '2019-09-09 07:02:20', 0),
(7, 'iffalcon', 1, '2019-10-07 13:39:10', '2019-10-07 13:39:10', 0),
(8, 'fsfeffsfdsd', 1, '2019-10-08 05:18:06', '2019-10-10 11:02:19', 1),
(9, 'dfgvre12', 1, '2019-10-09 12:11:43', '2019-10-10 09:39:45', 1),
(10, 'dfvbgfhyth 65', 1, '2019-10-09 12:11:50', '2019-10-10 09:38:20', 1),
(11, 'ngyfhjftyhu', 1, '2019-10-09 12:12:00', '2019-10-09 13:29:56', 1),
(12, 'nhtgyjhjj', 1, '2019-10-09 12:12:06', '2019-10-09 13:27:11', 1),
(13, 'dsvvsvsdvswab', 1, '2019-10-09 13:38:46', '2019-10-10 09:37:06', 1),
(14, 'TATA Motors', 1, '2019-10-09 13:39:04', '2019-10-10 09:36:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `organizationId` int(11) NOT NULL,
  `organizationName` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`organizationId`, `organizationName`, `description`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Brigs Nucleus', 'Headquartered in Pune, Maharashtra, the Volkswagen Group in India is represented by five brands: SKODA, Volkswagen, Audi, Porsche and Lamborghini. The Indian journey began with the launch of SKODA in 2001. Audi and Volkswagen entered in 2007, while Lamborghini and Porsche were introduced in 2012. Today, the Group upholds its mantle of superior engineering, with plants in Pune and Aurangabad working seamlessly to manufacture the world\'s most loved cars.', '2019-07-16 06:04:15', '2019-10-10 07:07:24', 0),
(2, 'Stackmint Pvt Ltd', 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.', '2019-07-22 12:31:33', '2019-07-22 12:31:33', 0),
(3, 'Saga City Pvt Ltd. ', 'fg jhgf jhgufg ughu hguify ygyftg yufgu yfgui ghnjghj yghty fgh', '2019-07-24 06:06:08', '2019-07-24 06:06:32', 1),
(4, 'Saga City Pvt Ltd.', 'sbc uihn mnvgioreh jkvguih gfscrtdw mkik basgdyu', '2019-07-24 06:08:00', '2019-07-24 06:08:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `questionId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `questionTypeIdFK` int(11) NOT NULL,
  `checkListIdFK` int(11) NOT NULL,
  `isRefer` int(11) NOT NULL DEFAULT '0',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionId`, `title`, `questionTypeIdFK`, `checkListIdFK`, `isRefer`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'What is your Name?', 1, 1, 0, '2019-07-17 13:56:52', '2019-09-21 07:48:04', 0),
(2, 'What is your DOB?', 2, 1, 0, '2019-07-17 13:56:52', '2019-09-21 07:48:07', 0),
(3, 'Your Gender?', 3, 1, 0, '2019-07-17 13:56:52', '2019-09-21 07:48:10', 0),
(4, 'What you Like?', 4, 1, 0, '2019-07-17 13:56:52', '2019-09-21 07:48:37', 0),
(5, 'Is this ok ??', 3, 1, 0, '2019-07-22 12:35:03', '2019-09-21 07:48:45', 0),
(6, 'Telephone is working well ?', 3, 1, 0, '2019-07-22 12:53:42', '2019-09-16 11:38:55', 1),
(7, 'Last date of servicing?', 2, 1, 0, '2019-07-22 12:54:14', '2019-09-16 11:38:55', 1),
(8, 'Enter model number of telephone', 1, 1, 0, '2019-07-22 12:54:43', '2019-09-16 11:38:55', 1),
(9, 'Incoming  voice ', 3, 1, 0, '2019-07-22 12:56:05', '2019-09-21 07:48:41', 0),
(10, 'Physical condition of piping and valve (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:24:27', '2019-09-16 11:38:55', 1),
(11, 'Autometic actuation (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:24:48', '2019-09-16 11:38:55', 1),
(12, 'Actuation from fire station (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:25:20', '2019-09-16 11:38:55', 1),
(13, 'Actuation from control panel  (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:25:36', '2019-09-16 11:38:55', 1),
(14, 'Acuation from field station  (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:25:56', '2019-09-16 11:38:55', 1),
(15, 'Discharge indication in all panel  (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:26:21', '2019-09-16 11:38:55', 1),
(16, 'Drain valve choked/blocked  (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:26:41', '2019-09-16 11:38:55', 0),
(17, 'water supply main valve/Discharge valve  (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:27:00', '2019-09-16 11:38:55', 1),
(18, 'Gland leak fro main supply valve/Discharge valve   (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:27:19', '2019-09-16 11:38:55', 1),
(19, 'Pneumetic valve working condition  (Observation / corrective action)', 1, 1, 0, '2019-07-22 13:27:38', '2019-09-16 11:38:55', 0),
(20, 'Is it Working', 4, 1, 0, '2019-07-22 14:22:09', '2019-09-16 11:38:55', 0),
(21, 'when was the last maintenance done?', 2, 1, 0, '2019-07-22 14:24:52', '2019-09-16 11:38:55', 0),
(22, 'What?', 3, 1, 0, '2019-07-23 09:56:03', '2019-09-16 11:38:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `questionoption`
--

CREATE TABLE `questionoption` (
  `questionOptionId` int(11) NOT NULL,
  `questionIdFK` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isDanger` int(2) NOT NULL DEFAULT '0',
  `referQuestionId` int(11) NOT NULL DEFAULT '0',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionoption`
--

INSERT INTO `questionoption` (`questionOptionId`, `questionIdFK`, `title`, `isDanger`, `referQuestionId`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 3, 'Male', 0, 0, '2019-07-17 14:04:47', '2019-07-17 14:04:47', 0),
(2, 3, 'Female', 0, 0, '2019-07-17 14:04:47', '2019-07-17 14:04:47', 0),
(3, 4, 'Red', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(4, 4, 'Green', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(5, 4, 'Blue', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(6, 4, 'Orange', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(7, 5, 'Good', 0, 0, '2019-07-22 12:35:03', '2019-07-22 12:35:03', 0),
(8, 5, 'Fine', 0, 0, '2019-07-22 12:35:03', '2019-07-22 12:35:03', 0),
(9, 5, 'Very good', 0, 0, '2019-07-22 12:35:03', '2019-07-22 12:35:03', 0),
(10, 6, 'Yes', 0, 0, '2019-07-22 12:53:42', '2019-07-22 12:53:42', 0),
(11, 6, 'No', 0, 0, '2019-07-22 12:53:42', '2019-07-22 12:53:42', 0),
(12, 9, 'Good ', 0, 0, '2019-07-22 12:56:05', '2019-07-22 13:09:22', 1),
(13, 9, 'Bad', 0, 0, '2019-07-22 12:56:05', '2019-07-22 13:09:22', 1),
(14, 9, 'Best', 0, 0, '2019-07-22 12:56:05', '2019-07-22 13:09:22', 1),
(15, 9, 'Better', 0, 0, '2019-07-22 12:56:05', '2019-07-22 13:09:22', 1),
(16, 9, 'Worst ', 0, 0, '2019-07-22 12:56:05', '2019-07-22 13:09:22', 1),
(17, 9, 'Good ', 0, 0, '2019-07-22 13:09:22', '2019-07-22 13:09:22', 0),
(18, 9, 'Bad', 0, 0, '2019-07-22 13:09:22', '2019-07-22 13:09:22', 0),
(19, 9, 'Best', 0, 0, '2019-07-22 13:09:22', '2019-07-22 13:09:22', 0),
(20, 9, 'Better', 0, 0, '2019-07-22 13:09:22', '2019-07-22 13:09:22', 0),
(21, 9, 'Worst ', 0, 0, '2019-07-22 13:09:22', '2019-07-22 13:09:22', 0),
(22, 20, 'Yes', 0, 0, '2019-07-22 14:22:09', '2019-07-24 09:16:53', 1),
(23, 20, 'No', 0, 0, '2019-07-22 14:22:09', '2019-07-24 09:16:53', 1),
(24, 22, 'klashda', 0, 0, '2019-07-23 09:56:03', '2019-07-23 09:56:03', 0),
(25, 20, 'Yes', 0, 0, '2019-07-24 09:16:53', '2019-07-24 09:16:53', 0),
(26, 20, 'No', 0, 0, '2019-07-24 09:16:53', '2019-07-24 09:16:53', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questiontype`
--

CREATE TABLE `questiontype` (
  `questionTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questiontype`
--

INSERT INTO `questiontype` (`questionTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Input', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(2, 'Date', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(3, 'SingleOption', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(4, 'MultiOption', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `responsibleperson`
--

CREATE TABLE `responsibleperson` (
  `responsiblePersonId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `userIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--

CREATE TABLE `superadmin` (
  `superAdminId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `mobileNumber` varchar(50) NOT NULL,
  `emailId` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplierId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `businessName` varchar(255) NOT NULL,
  `mobileNumber` varchar(50) NOT NULL,
  `emailId` varchar(100) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplierId`, `firstName`, `lastName`, `businessName`, `mobileNumber`, `emailId`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Spectrum ', 'Mapping', 'Motor Mechanic', '9999696595', 'spectrum.mapping@gmail.com', 1, '2019-07-17 07:01:37', '2019-09-09 07:00:03', 0),
(2, 'Shravan', 'Kumar', 'Chairs', '1234567890', 'shravan@stackmint.com', 1, '2019-07-22 12:55:04', '2019-09-09 07:00:06', 0),
(3, 'Shital', 'Pawar', 'Amway', '860047917', 'abcgmail.com', 2, '2019-07-24 06:12:16', '2019-09-09 07:00:09', 1),
(4, 'Kavita', 'shimpi', 'Oriflame', '8329121551', 'abc@gmail.com', 2, '2019-07-24 06:17:56', '2019-10-09 11:08:43', 0),
(5, 'Kavita', 'shimpi', 'HP Printer', '8600479173', 'abc@gmail.com', 3, '2019-07-25 06:30:00', '2019-10-09 05:49:18', 0),
(6, 'Shital', 'Pawar2', 'Oriflame', '832912155', 'abcgmail.com', 4, '2019-07-25 06:30:27', '2019-09-09 07:00:15', 1),
(7, 'dafafa', 'ffafsffd', 'fdsfsdfdfffd', '9136542666', 'k@s.com', 1, '2019-10-08 05:18:30', '2019-10-08 05:18:40', 1),
(8, 'abc', 'pqr', 'KP- Kale Patil Infrastructure Pvt. Ltd.', '9822238881', 'abc@gmail.com', 1, '2019-10-09 10:56:29', '2019-10-09 10:56:55', 0),
(9, 'abc', 'hjutjut', 'gfghbvhgf', '1236549878', 'abc@gmail.com', 1, '2019-10-09 11:09:27', '2019-10-09 11:09:27', 0),
(10, 'vdfgbfd', 'hbthth', 'gsfdhg12', '9876543259', 'abc@gmail.com', 1, '2019-10-09 11:10:11', '2019-10-09 11:10:11', 0),
(11, 'njrhfnbjhb', 'njrnghijvn', 'printing solution', '9517538524', 'pqr@gmail.com', 1, '2019-10-09 11:10:55', '2019-10-09 11:10:55', 0),
(12, 'vdfgbfd', 'pqr', 'ahsgkesw23', '8426795138', 'pqr@gmail.com', 1, '2019-10-09 11:12:45', '2019-10-09 11:12:45', 0),
(13, 'mnvjhhg', 'ifghj', 'sdnjfnbj123', '6549517532', 'pqr@gmail.com', 1, '2019-10-09 11:20:01', '2019-10-09 11:20:01', 0),
(14, 'vfgvfdhgb', 'bghytyjj', 'asdfgghjkk12', '9822238883', 'abc@gmail.com', 1, '2019-10-09 11:20:29', '2019-10-09 13:29:21', 1),
(15, 'gffd', 'thfdr', 'asd123', '7896541235', 'pqr@gmail.com', 1, '2019-10-09 13:36:36', '2019-10-09 13:36:36', 0),
(16, 'sdavsvd', 'vsdvvdsv', 'vdsvv11', '6666666666', 'abc@gmail.com', 1, '2019-10-09 13:38:08', '2019-10-09 13:38:08', 0),
(17, 'cweww', 'ewvwvewv', 'cwcw', '6666666667', 'abc@gmail.com', 1, '2019-10-09 13:44:50', '2019-10-09 14:24:10', 0),
(18, 'nfghj', 'gvfgh', 'KP123', '9822238883', 'pqr@gmail.com', 1, '2019-10-10 06:12:22', '2019-10-10 10:36:07', 1),
(19, 'abc', 'ifghj', 'fser', '7895123647', 'abc@gmail.com', 1, '2019-10-10 06:29:33', '2019-10-10 09:35:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transfercomplaint`
--

CREATE TABLE `transfercomplaint` (
  `transferComplaintId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `fromUserIdFK` int(11) NOT NULL,
  `toUserIdFK` int(11) NOT NULL,
  `transferStatusIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transferstatus`
--

CREATE TABLE `transferstatus` (
  `transferStatusId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transferstatus`
--

INSERT INTO `transferstatus` (`transferStatusId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Accepted', '2019-10-09 09:51:15', '2019-10-09 09:51:15', 0),
(2, 'Rejected', '2019-10-09 09:51:15', '2019-10-09 09:51:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `typeofcomplaint`
--

CREATE TABLE `typeofcomplaint` (
  `typeComplaintId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `typeofcomplaint`
--

INSERT INTO `typeofcomplaint` (`typeComplaintId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Generic', '2019-10-09 09:49:43', '2019-10-09 09:49:43', 0),
(2, 'Asset Related', '2019-10-09 09:49:43', '2019-10-10 09:54:23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `typeofuser`
--

CREATE TABLE `typeofuser` (
  `typeOfUserId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `typeofuser`
--

INSERT INTO `typeofuser` (`typeOfUserId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Super Admin', '2019-10-10 06:58:56', '2019-10-10 06:58:56', 0),
(2, 'Admin', '2019-10-10 06:58:56', '2019-10-10 06:58:56', 0),
(3, 'User', '2019-10-10 06:59:24', '2019-10-10 06:59:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userRoleIdFK` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profileImage` varchar(255) NOT NULL,
  `departmentIdFK` int(11) NOT NULL,
  `mobileNumber` varchar(50) NOT NULL,
  `emailId` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deviceId` varchar(255) NOT NULL,
  `otp` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userRoleIdFK`, `firstName`, `lastName`, `profileImage`, `departmentIdFK`, `mobileNumber`, `emailId`, `password`, `deviceId`, `otp`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 'Ajay', 'Khatavkar', 'ajay.jpg', 1, '9579368483', 'ajay@stackmint.com', '123456789', '', 0, '2019-07-16 06:07:26', '2019-10-09 13:29:40', 0),
(2, 2, 'Mahesh', 'Lipane', 'mahesh.jpg', 1, '9689767931', 'mahesh@stackmint.com', '123', '', 0, '2019-07-16 09:52:43', '2019-10-09 13:29:45', 0),
(3, 3, 'Shital', 'Pawar', 'shital.jpg', 1, '9623785571', 'shital@stackmint.com', 'shital@123', '', 8111, '2019-07-16 12:42:08', '2019-10-09 13:29:49', 0),
(5, 4, 'Mahesh', 'Lipane', 'mahesh.jpg', 1, '8275912825', 'mahesh@stackmint1.com', '123456789', '', 0, '2019-07-22 12:39:17', '2019-10-09 13:29:52', 0),
(9, 5, 'Shital', 'Pawar', 'ASHWINI_MAM_(1)2.JPG', 3, '', 'shital123@stackmint.com', 'shital123', '', 0, '2019-07-22 14:14:15', '2019-10-09 13:29:55', 0),
(10, 6, 'Kavita', 'shimpi', 'shital.jpg', 1, '7350518782', 'kavita@stackmint.com', '123456', '', 0, '2019-07-22 14:16:01', '2019-10-09 13:29:57', 0),
(11, 7, 'Shital', 'Pawar', 'photo-1496857239036-1fb137683000.jpg', 3, '8600479179', 'abc@gmail.com', 'shital1234', '', 0, '2019-07-24 06:24:11', '2019-10-09 13:30:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usercatassignment`
--

CREATE TABLE `usercatassignment` (
  `userCatAssignmentId` int(11) NOT NULL,
  `userIdFK` int(11) NOT NULL,
  `assignmentTypeIdFK` int(11) NOT NULL,
  `masterIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--

CREATE TABLE `userrole` (
  `userRoleId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userrole`
--

INSERT INTO `userrole` (`userRoleId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'System Admin', 1, '2019-10-07 06:53:07', '2019-10-10 06:41:38', 0),
(2, '123', 1, '2019-10-09 05:43:32', '2019-10-09 06:43:30', 1),
(3, 'Shubham', 1, '2019-10-09 05:57:03', '2019-10-09 05:57:03', 0),
(4, 'kkkkkkkk212', 1, '2019-10-09 09:04:26', '2019-10-09 10:36:29', 0),
(5, 'fcavvvwva', 1, '2019-10-09 09:06:39', '2019-10-09 09:06:39', 0),
(6, 'dsvvsvsdvsae', 1, '2019-10-09 09:09:09', '2019-10-09 10:36:23', 1),
(7, 'hfbsuhdfgunmc', 1, '2019-10-09 10:36:48', '2019-10-09 10:36:48', 0),
(8, 'yjuygkgn', 1, '2019-10-09 10:44:49', '2019-10-09 10:44:49', 0),
(9, 'vgergef', 1, '2019-10-09 10:45:00', '2019-10-09 10:45:00', 0),
(10, 'nhgrfewrthgdd', 1, '2019-10-09 10:45:11', '2019-10-09 10:45:11', 0),
(11, 'srfegtdcvb12123', 1, '2019-10-09 10:45:25', '2019-10-09 10:45:25', 0),
(12, 'bhtdesaw', 1, '2019-10-09 10:45:37', '2019-10-10 12:32:18', 1),
(13, 'fgrtgtrhhhhh', 1, '2019-10-09 10:45:54', '2019-10-10 10:36:02', 1),
(14, 'sdsadsadsdsad', 1, '2019-10-09 12:23:21', '2019-10-10 10:35:15', 1),
(15, 'sdsadsa2432434324324324324v3432432432432432', 1, '2019-10-09 12:23:28', '2019-10-09 13:27:20', 1),
(16, '111', 1, '2019-10-09 14:21:52', '2019-10-10 10:34:00', 1),
(17, '111hj', 1, '2019-10-09 14:22:58', '2019-10-10 10:30:42', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminId`),
  ADD KEY `departmentIdFK` (`organizationIdFK`);

--
-- Indexes for table `alert`
--
ALTER TABLE `alert`
  ADD PRIMARY KEY (`alertId`);

--
-- Indexes for table `alerttracking`
--
ALTER TABLE `alerttracking`
  ADD PRIMARY KEY (`alertTrackingId`),
  ADD KEY `typeOfUserIdFK1` (`typeOfUserIdFK`),
  ADD KEY `alertIdFK` (`alertIdFK`);

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answerId`),
  ADD KEY `questionIdFK1` (`questionIdFK`),
  ADD KEY `doneCheckListIdFK` (`doneChecklistIdFK`);

--
-- Indexes for table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`assetId`),
  ADD KEY `installationLocationTypeIdFK` (`installationLocationTypeIdFK`),
  ADD KEY `durationTypeIdFK` (`durationTypeIdFK`),
  ADD KEY `warrentDurationTypeIdFK` (`warrantyDurationTypeIdFK`),
  ADD KEY `supplierIdFK` (`supplierIdFK`),
  ADD KEY `departmentIdFK2` (`departmentIdFK`),
  ADD KEY `manufracturerIdFK` (`manufacturerIdFK`),
  ADD KEY `organizationIdFK4` (`organizationIdFK`);

--
-- Indexes for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  ADD PRIMARY KEY (`assetCatRelationId`),
  ADD KEY `assetIdFK` (`assetIdFK`),
  ADD KEY `categoryIdFK` (`categoryIdFK`);

--
-- Indexes for table `assignmenttype`
--
ALTER TABLE `assignmenttype`
  ADD PRIMARY KEY (`assignmentTypeId`),
  ADD UNIQUE KEY `assignmentTypeId` (`assignmentTypeId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`),
  ADD KEY `parentIdFK1` (`parentId`),
  ADD KEY `organizationIdFK3` (`organizationIdFK`);

--
-- Indexes for table `checklist`
--
ALTER TABLE `checklist`
  ADD PRIMARY KEY (`checklistId`),
  ADD KEY `organizationIdFK7` (`organizationIdFK`),
  ADD KEY `categoryIdFK1` (`categoryIdFK`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`complaintId`),
  ADD KEY `complaintStatusIdFK` (`complaintStatusIdFK`),
  ADD KEY `typeOfComplaintFK` (`typeOfComplaintFK`),
  ADD KEY `typeOfUserId` (`typeOfUserIdFK`);

--
-- Indexes for table `complaintimages`
--
ALTER TABLE `complaintimages`
  ADD PRIMARY KEY (`complaintImagesId`),
  ADD KEY `complaintIdFK1` (`complaintIdFK`);

--
-- Indexes for table `complaintstatus`
--
ALTER TABLE `complaintstatus`
  ADD PRIMARY KEY (`complaintStatusId`);

--
-- Indexes for table `complainttrack`
--
ALTER TABLE `complainttrack`
  ADD PRIMARY KEY (`complaintTrackId`),
  ADD KEY `complaintStatusIdFK1` (`complaintStatusIdFK`),
  ADD KEY `typeOfUserIdFK2` (`typeOfUserIdFK`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departmentId`),
  ADD KEY `organizationIdFK` (`organizationIdFK`),
  ADD KEY `parentIdFK` (`parentId`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`documentId`),
  ADD KEY `documentTypeIdFK` (`documentTypeIdFK`);

--
-- Indexes for table `documenttype`
--
ALTER TABLE `documenttype`
  ADD PRIMARY KEY (`documentTypeId`);

--
-- Indexes for table `donechecklist`
--
ALTER TABLE `donechecklist`
  ADD PRIMARY KEY (`doneChecklistId`),
  ADD KEY `checkListIdFK1` (`checkListIdFK`),
  ADD KEY `assetIdFK2` (`assetIdFK`),
  ADD KEY `userIdFK1` (`doneBy`);

--
-- Indexes for table `durationtype`
--
ALTER TABLE `durationtype`
  ADD PRIMARY KEY (`durationTypeId`);

--
-- Indexes for table `feature`
--
ALTER TABLE `feature`
  ADD PRIMARY KEY (`featureId`),
  ADD KEY `organizationIdFK6` (`organizationIdFK`);

--
-- Indexes for table `featureassignment`
--
ALTER TABLE `featureassignment`
  ADD PRIMARY KEY (`featureAssignmentId`),
  ADD KEY `featureIdFK` (`featureIdFK`),
  ADD KEY `userRoleIdFK` (`userRoleIdFK`);

--
-- Indexes for table `installationlocationtype`
--
ALTER TABLE `installationlocationtype`
  ADD PRIMARY KEY (`installationLocationTypeId`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturerId`),
  ADD KEY `organizationIdFK2` (`organizationIdFK`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`organizationId`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`questionId`),
  ADD KEY `questionTypeIdFK` (`questionTypeIdFK`),
  ADD KEY `checkListIdFK` (`checkListIdFK`);

--
-- Indexes for table `questionoption`
--
ALTER TABLE `questionoption`
  ADD PRIMARY KEY (`questionOptionId`),
  ADD KEY `questionIdFK` (`questionIdFK`);

--
-- Indexes for table `questiontype`
--
ALTER TABLE `questiontype`
  ADD PRIMARY KEY (`questionTypeId`);

--
-- Indexes for table `responsibleperson`
--
ALTER TABLE `responsibleperson`
  ADD PRIMARY KEY (`responsiblePersonId`),
  ADD KEY `complaintIdFK` (`complaintIdFK`),
  ADD KEY `userIdFK4` (`userIdFK`);

--
-- Indexes for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`superAdminId`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplierId`),
  ADD KEY `organizationIdFK1` (`organizationIdFK`);

--
-- Indexes for table `transfercomplaint`
--
ALTER TABLE `transfercomplaint`
  ADD PRIMARY KEY (`transferComplaintId`),
  ADD KEY `fromUserIdFK` (`fromUserIdFK`),
  ADD KEY `toUserIdFK` (`toUserIdFK`),
  ADD KEY `complaintIdFK2` (`complaintIdFK`),
  ADD KEY `transferStatusIdFK` (`transferStatusIdFK`);

--
-- Indexes for table `transferstatus`
--
ALTER TABLE `transferstatus`
  ADD PRIMARY KEY (`transferStatusId`);

--
-- Indexes for table `typeofcomplaint`
--
ALTER TABLE `typeofcomplaint`
  ADD PRIMARY KEY (`typeComplaintId`);

--
-- Indexes for table `typeofuser`
--
ALTER TABLE `typeofuser`
  ADD PRIMARY KEY (`typeOfUserId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `emailId` (`emailId`),
  ADD KEY `departmentIdFK1` (`departmentIdFK`),
  ADD KEY `userRoleIdFK2` (`userRoleIdFK`);

--
-- Indexes for table `usercatassignment`
--
ALTER TABLE `usercatassignment`
  ADD PRIMARY KEY (`userCatAssignmentId`),
  ADD KEY `userIdFK` (`userIdFK`),
  ADD KEY `assignmentTypeIdFK` (`assignmentTypeIdFK`);

--
-- Indexes for table `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`userRoleId`),
  ADD KEY `organizationIdFK5` (`organizationIdFK`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `alert`
--
ALTER TABLE `alert`
  MODIFY `alertId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `alerttracking`
--
ALTER TABLE `alerttracking`
  MODIFY `alertTrackingId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `answerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `assetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  MODIFY `assetCatRelationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `assignmenttype`
--
ALTER TABLE `assignmenttype`
  MODIFY `assignmentTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `checklist`
--
ALTER TABLE `checklist`
  MODIFY `checklistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `complaintimages`
--
ALTER TABLE `complaintimages`
  MODIFY `complaintImagesId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `complaintstatus`
--
ALTER TABLE `complaintstatus`
  MODIFY `complaintStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `complainttrack`
--
ALTER TABLE `complainttrack`
  MODIFY `complaintTrackId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `documentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `documenttype`
--
ALTER TABLE `documenttype`
  MODIFY `documentTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `donechecklist`
--
ALTER TABLE `donechecklist`
  MODIFY `doneChecklistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `durationtype`
--
ALTER TABLE `durationtype`
  MODIFY `durationTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `feature`
--
ALTER TABLE `feature`
  MODIFY `featureId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `featureassignment`
--
ALTER TABLE `featureassignment`
  MODIFY `featureAssignmentId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `installationlocationtype`
--
ALTER TABLE `installationlocationtype`
  MODIFY `installationLocationTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `organizationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `questionoption`
--
ALTER TABLE `questionoption`
  MODIFY `questionOptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `questiontype`
--
ALTER TABLE `questiontype`
  MODIFY `questionTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `superAdminId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplierId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `transfercomplaint`
--
ALTER TABLE `transfercomplaint`
  MODIFY `transferComplaintId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `transferstatus`
--
ALTER TABLE `transferstatus`
  MODIFY `transferStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `typeofcomplaint`
--
ALTER TABLE `typeofcomplaint`
  MODIFY `typeComplaintId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `typeofuser`
--
ALTER TABLE `typeofuser`
  MODIFY `typeOfUserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `usercatassignment`
--
ALTER TABLE `usercatassignment`
  MODIFY `userCatAssignmentId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `userrole`
--
ALTER TABLE `userrole`
  MODIFY `userRoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `organizationIdFK9` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `alerttracking`
--
ALTER TABLE `alerttracking`
  ADD CONSTRAINT `alertIdFK` FOREIGN KEY (`alertIdFK`) REFERENCES `alert` (`alertId`),
  ADD CONSTRAINT `typeOfUserIdFK1` FOREIGN KEY (`typeOfUserIdFK`) REFERENCES `typeofuser` (`typeOfUserId`);

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `questionIdFK1` FOREIGN KEY (`questionIdFK`) REFERENCES `question` (`questionId`);

--
-- Constraints for table `asset`
--
ALTER TABLE `asset`
  ADD CONSTRAINT `departmentIdFK2` FOREIGN KEY (`departmentIdFK`) REFERENCES `department` (`departmentId`),
  ADD CONSTRAINT `durationTypeIdFK` FOREIGN KEY (`durationTypeIdFK`) REFERENCES `durationtype` (`durationTypeId`),
  ADD CONSTRAINT `installationLocationTypeIdFK` FOREIGN KEY (`installationLocationTypeIdFK`) REFERENCES `installationlocationtype` (`installationLocationTypeId`),
  ADD CONSTRAINT `manufracturerIdFK` FOREIGN KEY (`manufacturerIdFK`) REFERENCES `manufacturer` (`manufacturerId`),
  ADD CONSTRAINT `organizationIdFK4` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`),
  ADD CONSTRAINT `supplierIdFK` FOREIGN KEY (`supplierIdFK`) REFERENCES `supplier` (`supplierId`),
  ADD CONSTRAINT `warrentDurationTypeIdFK` FOREIGN KEY (`warrantyDurationTypeIdFK`) REFERENCES `durationtype` (`durationTypeId`);

--
-- Constraints for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  ADD CONSTRAINT `assetIdFK` FOREIGN KEY (`assetIdFK`) REFERENCES `asset` (`assetId`),
  ADD CONSTRAINT `categoryIdFK` FOREIGN KEY (`categoryIdFK`) REFERENCES `category` (`categoryId`);

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `organizationIdFK3` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`),
  ADD CONSTRAINT `parentIdFK1` FOREIGN KEY (`parentId`) REFERENCES `category` (`categoryId`);

--
-- Constraints for table `checklist`
--
ALTER TABLE `checklist`
  ADD CONSTRAINT `categoryIdFK1` FOREIGN KEY (`categoryIdFK`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `organizationIdFK7` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `complaintStatusIdFK` FOREIGN KEY (`complaintStatusIdFK`) REFERENCES `complaintstatus` (`complaintStatusId`),
  ADD CONSTRAINT `typeOfComplaintFK` FOREIGN KEY (`typeOfComplaintFK`) REFERENCES `typeofcomplaint` (`typeComplaintId`),
  ADD CONSTRAINT `typeOfUserId` FOREIGN KEY (`typeOfUserIdFK`) REFERENCES `typeofuser` (`typeOfUserId`);

--
-- Constraints for table `complaintimages`
--
ALTER TABLE `complaintimages`
  ADD CONSTRAINT `complaintIdFK1` FOREIGN KEY (`complaintIdFK`) REFERENCES `complaint` (`complaintId`);

--
-- Constraints for table `complainttrack`
--
ALTER TABLE `complainttrack`
  ADD CONSTRAINT `complaintStatusIdFK1` FOREIGN KEY (`complaintStatusIdFK`) REFERENCES `complaintstatus` (`complaintStatusId`),
  ADD CONSTRAINT `typeOfUserIdFK2` FOREIGN KEY (`typeOfUserIdFK`) REFERENCES `typeofuser` (`typeOfUserId`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `organizationIdFK` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`),
  ADD CONSTRAINT `parentIdFK` FOREIGN KEY (`parentId`) REFERENCES `department` (`departmentId`);

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `documentTypeIdFK` FOREIGN KEY (`documentTypeIdFK`) REFERENCES `documenttype` (`documentTypeId`);

--
-- Constraints for table `donechecklist`
--
ALTER TABLE `donechecklist`
  ADD CONSTRAINT `assetIdFK2` FOREIGN KEY (`assetIdFK`) REFERENCES `asset` (`assetId`),
  ADD CONSTRAINT `checkListIdFK1` FOREIGN KEY (`checkListIdFK`) REFERENCES `checklist` (`checklistId`),
  ADD CONSTRAINT `userIdFK1` FOREIGN KEY (`doneBy`) REFERENCES `user` (`userId`);

--
-- Constraints for table `feature`
--
ALTER TABLE `feature`
  ADD CONSTRAINT `organizationIdFK6` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `featureassignment`
--
ALTER TABLE `featureassignment`
  ADD CONSTRAINT `featureIdFK` FOREIGN KEY (`featureIdFK`) REFERENCES `feature` (`featureId`),
  ADD CONSTRAINT `userRoleIdFK` FOREIGN KEY (`userRoleIdFK`) REFERENCES `userrole` (`userRoleId`);

--
-- Constraints for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD CONSTRAINT `organizationIdFK2` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `checkListIdFK` FOREIGN KEY (`checkListIdFK`) REFERENCES `checklist` (`checklistId`),
  ADD CONSTRAINT `questionTypeIdFK` FOREIGN KEY (`questionTypeIdFK`) REFERENCES `questiontype` (`questionTypeId`);

--
-- Constraints for table `questionoption`
--
ALTER TABLE `questionoption`
  ADD CONSTRAINT `questionIdFK` FOREIGN KEY (`questionIdFK`) REFERENCES `question` (`questionId`);

--
-- Constraints for table `responsibleperson`
--
ALTER TABLE `responsibleperson`
  ADD CONSTRAINT `complaintIdFK` FOREIGN KEY (`complaintIdFK`) REFERENCES `complaint` (`complaintId`),
  ADD CONSTRAINT `userIdFK4` FOREIGN KEY (`userIdFK`) REFERENCES `user` (`userId`);

--
-- Constraints for table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `organizationIdFK1` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `transfercomplaint`
--
ALTER TABLE `transfercomplaint`
  ADD CONSTRAINT `complaintIdFK2` FOREIGN KEY (`complaintIdFK`) REFERENCES `complaint` (`complaintId`),
  ADD CONSTRAINT `fromUserIdFK` FOREIGN KEY (`fromUserIdFK`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `toUserIdFK` FOREIGN KEY (`toUserIdFK`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `transferStatusIdFK` FOREIGN KEY (`transferStatusIdFK`) REFERENCES `transferstatus` (`transferStatusId`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `departmentIdFK1` FOREIGN KEY (`departmentIdFK`) REFERENCES `department` (`departmentId`),
  ADD CONSTRAINT `userRoleIdFK2` FOREIGN KEY (`userRoleIdFK`) REFERENCES `userrole` (`userRoleId`);

--
-- Constraints for table `usercatassignment`
--
ALTER TABLE `usercatassignment`
  ADD CONSTRAINT `assignmentTypeIdFK` FOREIGN KEY (`assignmentTypeIdFK`) REFERENCES `assignmenttype` (`assignmentTypeId`),
  ADD CONSTRAINT `userIdFK` FOREIGN KEY (`userIdFK`) REFERENCES `user` (`userId`);

--
-- Constraints for table `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `organizationIdFK5` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
