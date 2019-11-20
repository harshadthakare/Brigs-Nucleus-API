-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2019 at 06:35 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asset_matedb_updated`
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
(1, 'Ajay', 'Khatavkar', 1, '9579368483', 'ajay@stackmint.com', 'admin12345', 1109, 0, '2019-07-16 06:06:35', '2019-11-08 12:01:15', 0);

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
(1, 'asset', 1, 'Check water level', 'index.png', 'Lorem Ipsum is simply dummy text', '2019-07-16 12:45:15', '2019-11-12 12:12:54', 1),
(2, 'asset', 2, 'Submission remaining', 'index.png', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', '2019-07-16 13:16:19', '2019-11-13 10:28:00', 1),
(3, 'doneChecklist', 1, 'Need Inspection', 'index.png', 'Lorem Ipsum is simply dummy text of the printing ', '2019-09-30 10:48:35', '2019-10-23 07:19:58', 0);

-- --------------------------------------------------------

--
-- Table structure for table `alerttracking`
--

CREATE TABLE `alerttracking` (
  `alertTrackingId` int(11) NOT NULL,
  `alertIdFK` int(11) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `isRead` int(11) NOT NULL DEFAULT '0',
  `isDeliver` int(11) NOT NULL DEFAULT '1',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alerttracking`
--

INSERT INTO `alerttracking` (`alertTrackingId`, `alertIdFK`, `typeOfUserIdFK`, `masterId`, `isRead`, `isDeliver`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 3, 1, 0, 1, '2019-10-23 06:20:26', '2019-10-23 06:20:26', 0),
(2, 1, 3, 2, 1, 0, '2019-10-23 06:21:07', '2019-11-12 11:27:16', 0),
(3, 2, 3, 2, 0, 1, '2019-10-23 06:52:06', '2019-10-23 06:52:06', 0);

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
(1, 1, 21, '2019-10-10', 1, '2019-10-09 05:19:19', '2019-10-16 10:58:06', 0),
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
(150, 15, 21, '2019-10-10', 0, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0);

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
(1, '1569909934743', 'Fire Extingushier', '45698', 'A fire extinguisher is an active fire protection device used to extinguish or control small fires, often in emergency situations. It is not intended for use on an out-of-control fire, such as one which has reached the ceiling, endangers the user (i.e., no escape route, smoke, explosion hazard, etc.), or otherwise requires the expertise of a fire brigade.', 'mobile.jpg', '2019-07-25', 1, 'fdfsd', 'document-1569478021270.docx', 2, '2', 1, '1', 1, 2, 1, 3, '2019-07-17 08:49:48', '2019-10-25 08:26:58', 0),
(2, '1569914164674', 'Samsung', 'dfdf45', 'gfdgfdg56', 'printer.jpg', '2019-07-25', 1, 'fdfsd', 'document-1569478021270.docx', 2, '2', 1, '1', 1, 2, 1, 3, '2019-07-22 11:53:10', '2019-10-19 09:25:11', 0),
(3, '1569938834430', 'Mobile', '2145', 'To be checked mobile app', 'mobile.jpg', '0000-00-00', 3, 'Pune', 'hand-portable-dry-chemical-extinguishers-eaf8ef21.pdf', 3, '2', 3, '12', 1, 2, 3, 2, '2019-07-23 09:54:56', '2019-10-19 09:21:58', 0),
(4, '1570081239737', 'Printer 1', '5896321', 'vxfx njioj vcftdd trygyh sdxrddx', 'mobile.jpg', '1970-01-01', 3, 'pune', 'hand-portable-dry-chemical-extinguishers-eaf8ef21.pdf', 3, '2', 3, '2', 1, 1, 1, 3, '2019-07-24 07:18:35', '2019-11-07 11:05:05', 0),
(5, '1569921823594', 'Vivo', 'dfdf45555555', 'gfdgfdg56', 'mobile.jpg', '2019-07-25', 1, 'fdfsd', 'document-1569478021270.docx', 2, '2', 1, '1', 1, 2, 1, 8, '2019-10-09 07:13:06', '2019-10-23 11:20:24', 1),
(6, '1570271971893', 'Refrigrator', 'mod112244', 'aasdasdasd', 'printer.jpg', '2019-07-17', 3, 'Thane', 'hand-portable-dry-chemical-extinguishers-eaf8ef21.pdf', 3, '1', 2, '1', 1, 1, 1, 8, '2019-10-09 13:21:27', '2019-10-23 12:26:53', 1),
(7, '1571480780281', 'Table', 'dfdf45', 'cscsacacasassa', 'image-1571480780208.png', '2019-10-08', 2, 'Home', 'document-1571480780246.docx', 2, '2', 2, '1', 1, 18, 6, 8, '2019-10-19 10:26:20', '2019-10-19 10:26:20', 0),
(8, '1571481464484', 'Printer', '11111111111', 'cavwewevevwevewewvveveve', 'image-1571481464440.jpeg', '2019-10-15', 2, 'Pune', 'document-1571481464456.docx', 2, '2', 1, '1', 1, 15, 6, 1, '2019-10-19 10:37:44', '2019-10-19 10:37:44', 0),
(9, '1571488611891', 'ffewewggw', 'dfdf45', 'ewfwfwfwfwfefewe', 'image-1571488611821.jpeg', '2019-10-15', 1, 'Home', 'document-1571488611881.docx', 2, '2', 2, '1', 1, 17, 6, 15, '2019-10-19 12:36:51', '2019-10-19 12:36:51', 0),
(10, '1571648953393', 'Mobile', 'kkkkkkk123', 'fegwgwgwgwgw', 'image-1571648953369.png', '2019-10-25', 2, 'Home', 'document-1571648953381.docx', 1, '2', 2, '1', 1, 18, 6, 8, '2019-10-21 09:09:13', '2019-10-23 11:19:26', 1),
(11, '1571649057416', 'Mobile', 'llllllllll444443', 'gergegegegereh', 'image-1571649057311.jpeg', '2019-10-16', 2, 'Home', 'document-1571649057395.docx', 2, '2', 2, '1', 1, 18, 6, 8, '2019-10-21 09:10:57', '2019-10-21 09:12:25', 1),
(12, '1571651195694', 'Mobile', 'dssdkkkkllll', 'ghvghvghvggv', 'image-1571651195666.jpeg', '2019-10-17', 2, 'Home', 'document-1571651195682.docx', 2, '2', 2, '1', 1, 15, 6, 8, '2019-10-21 09:46:35', '2019-10-21 09:47:41', 1),
(13, '1571651302553', 'Computer', 'dfdf456u', 'cavdvsvdvsdv', 'image-1571651302527.png', '2019-10-23', 2, 'Home', 'document-1571651302542.docx', 2, '2', 1, '1', 1, 20, 6, 15, '2019-10-21 09:48:22', '2019-10-23 09:25:36', 1),
(14, '1571822489210', 'Computer', 'dssd', 'this is compulsory', 'image-1571822489108.jpeg', '2019-10-26', 2, 'Pune', 'document-1571822489180.pdf', 3, '5', 3, '250', 1, 16, 4, 7, '2019-10-23 09:21:29', '2019-10-23 09:21:29', 0),
(15, '1571829957541', 'gegeggwe', 'dfdf45', 'fwqfqwfqw', 'image-1571829957457.jpeg', '2019-10-25', 2, 'Home', 'document-1571829957482.docx', 1, '2', 1, '1', 1, 15, 3, 1, '2019-10-23 11:25:57', '2019-10-23 11:26:04', 1),
(16, '1571830136088', 'geggwewegew', 'dfdf45', 'wgegewgewe', 'image-1571830136056.jpeg', '2019-10-27', 2, 'Home', 'document-1571830136073.docx', 1, '2', 1, '1', 1, 15, 3, 7, '2019-10-23 11:28:56', '2019-10-23 11:28:56', 0),
(17, '1571833875187', 'JioMobile', 'ABC1234', 'sgjhjkkj nbjhjkkl nuiuijkl', 'image-1571833875141.jpeg', '2019-10-10', 3, 'Pune', 'document-1571833875171.pdf', 2, '6', 3, '2', 1, 20, 6, 5, '2019-10-23 12:31:15', '2019-10-23 12:31:15', 0),
(18, '1571834162939', 'Printer', 'asgaf654232', 'sdfvrhgtgnj', 'image-1571834162861.png', '2019-10-02', 3, 'Mumbai', 'document-1571834162906.docx', 2, '2', 3, '2', 1, 17, 4, 5, '2019-10-23 12:36:02', '2019-10-23 12:36:02', 0),
(19, '1572938954479', 'Mobile', 'dfdf45', 'ggrgggewgewggwgw', 'image-1572938954411.jpeg', '2019-11-19', 1, 'Home', 'document-1572938954461.docx', 1, '2', 1, '1', 1, 20, 6, 17, '2019-11-05 07:29:14', '2019-11-06 06:18:45', 1),
(20, '1573130659226', 'Mobile', 'dggfgfgdg', 'reggegeg', 'image-1573130659154.jpeg', '2019-11-19', 1, 'Home', 'document-1573130659199.docx', 4, '2', 4, '1', 1, 20, 5, 17, '2019-11-07 12:44:19', '2019-11-12 12:21:00', 1),
(21, '1573133710295', 'Desktop PC', 'dfdf45', 'jfhfdhfdjfjd', 'image-1573133710224.jpeg', '2019-11-12', 1, 'Home', 'document-1573133710251.docx', 4, '2', 5, '1', 1, 20, 6, 17, '2019-11-07 13:35:10', '2019-11-11 07:18:43', 0),
(22, '1573465049021', 'sdfsdf', '9898989898', 'sdfsdfsdf', 'image-1573465048956.jpeg', '2019-11-19', 1, 'sdfsdf', 'document-1573465049005.docx', 5, '2', 5, '1', 1, 18, 8, 17, '2019-11-11 09:37:29', '2019-11-12 10:56:29', 1),
(23, '1573465103075', 'sdfsdf', 'asf9897654', 'dwer', 'image-1573465103040.jpeg', '2019-11-12', 2, 'Home', 'document-1573465103054.docx', 4, '2', 5, '1', 1, 18, 7, 15, '2019-11-11 09:38:23', '2019-11-12 11:08:15', 1),
(24, '1573465138047', 'werwer', 'werwer', 'werwer', 'image-1573465138011.jpeg', '2019-11-12', 1, 'Home', 'document-1573465138027.docx', 4, '5', 4, '1', 1, 20, 7, 17, '2019-11-11 09:38:58', '2019-11-14 10:51:33', 1),
(25, '1573472458377', 'Mobile', '11111111111', 'vgergege', 'image-1573472458345.jpeg', '2019-11-12', 1, 'Home', 'document-1573472458361.docx', 5, '2', 4, '1', 1, 20, 6, 17, '2019-11-11 11:40:58', '2019-11-12 12:17:50', 1),
(26, '1573472703418', 'Mobileef', 'dfdf45', 'gegwgewew', 'image-1573472703318.jpeg', '2019-11-20', 2, 'Home', 'document-1573472703382.docx', 5, '2', 5, '1', 1, 20, 5, 17, '2019-11-11 11:45:03', '2019-11-12 12:18:14', 1),
(27, '1573475004865', 'ssssssssss', 'dfdf45', 'thrthrhrhrh', 'image-1573475004845.jpeg', '2019-11-13', 1, 'Home', 'document-1573475004854.docx', 4, '2', 4, '1', 1, 20, 8, 17, '2019-11-11 12:23:24', '2019-11-12 07:28:10', 1),
(28, '1573563304821', 'asdad', 'asd', 'asdasd', 'image-1573563304793.jpeg', '2019-11-05', 1, 'asdasd', 'document-1573563304805.doc', 3, '1', 3, '1', 1, 18, 9, 17, '2019-11-12 12:55:04', '2019-11-13 10:25:49', 1),
(29, '1573563629668', 'asdsad', 'asdasd', 'adfasdff', 'image-1573563629630.jpeg', '2019-11-06', 1, 'asd', 'document-1573563629640.doc', 4, '12', 4, '1', 1, 20, 9, 17, '2019-11-12 13:00:29', '2019-11-13 10:37:40', 1),
(30, '1573564051809', 'test count', 'asdsad', 'gfdfgdfg', 'image-1573564051786.jpeg', '2019-11-05', 1, 'asdsad', 'document-1573564051796.doc', 5, '12', 2, '12', 1, 20, 9, 17, '2019-11-12 13:07:31', '2019-11-13 10:25:49', 1),
(31, '1573564273344', 'doc test', 'sadf', 'sdfsfd', 'image-1573564273308.jpeg', '2019-11-04', 1, 'asdf', 'document-1573564273316.doc', 4, '12', 4, '12', 1, 20, 9, 15, '2019-11-12 13:11:13', '2019-11-13 05:37:22', 1),
(32, '1573649189815', 'asdasd', 'asd', 'sdfsdf', 'image-1573649189795.jpeg', '2019-11-05', 1, 'sdf', 'document-1573649189804.doc', 4, '12', 4, '12', 1, 20, 4, 17, '2019-11-13 12:46:29', '2019-11-15 11:57:56', 1),
(33, '1573649227568', 'wqeqwe', 'wqeqw123123', '12122', 'image-1573649227551.jpeg', '2019-11-06', 1, 'qwe', 'document-1573649227558.doc', 4, '12', 4, '12', 1, 20, 1, 17, '2019-11-13 12:47:07', '2019-11-15 11:57:51', 1),
(34, '1573652291463', 'qwewe', 'qwe', 'qweqwe', 'image-1573652291443.jpeg', '2019-11-06', 1, 'qwe', 'document-1573652291452.doc', 4, '12', 4, '21', 1, 20, 1, 17, '2019-11-13 13:38:11', '2019-11-15 11:57:47', 0),
(35, '1573652321028', 'qweqwe', 'wqeqw123123', 'qwqwe', 'image-1573652321008.jpeg', '2019-11-05', 1, 'qwe', 'document-1573652321016.doc', 4, '12', 4, '12', 1, 20, 1, 17, '2019-11-13 13:38:41', '2019-11-15 11:57:41', 0),
(36, '1573652354221', 'qweqwe', 'qweqwe', 'aff', 'image-1573652354203.jpeg', '2019-11-05', 1, 'qwe', 'document-1573652354212.doc', 4, '12', 4, '12', 1, 20, 4, 17, '2019-11-13 13:39:14', '2019-11-15 11:57:37', 0);

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
(6, 6, 1, '2019-10-09 13:21:27', '2019-10-09 13:21:27', 0),
(7, 7, 9, '2019-10-19 10:26:20', '2019-10-19 10:26:20', 0),
(8, 8, 9, '2019-10-19 10:37:44', '2019-10-19 10:37:44', 0),
(9, 9, 9, '2019-10-19 12:36:51', '2019-10-19 12:36:51', 0),
(10, 10, 2, '2019-10-21 09:09:13', '2019-10-21 09:09:13', 0),
(11, 11, 2, '2019-10-21 09:10:57', '2019-10-21 09:10:57', 0),
(12, 12, 1, '2019-10-21 09:46:35', '2019-10-21 09:46:35', 0),
(13, 13, 1, '2019-10-21 09:48:22', '2019-10-21 09:48:22', 0),
(14, 14, 8, '2019-10-23 09:21:29', '2019-10-23 09:21:29', 0),
(15, 15, 2, '2019-10-23 11:25:57', '2019-10-23 11:25:57', 0),
(16, 16, 2, '2019-10-23 11:28:56', '2019-10-23 11:28:56', 0),
(17, 17, 6, '2019-10-23 12:31:15', '2019-10-23 12:31:15', 0),
(18, 18, 2, '2019-10-23 12:36:02', '2019-11-07 12:41:21', 0),
(19, 19, 1, '2019-11-05 07:29:14', '2019-11-05 07:29:14', 0),
(20, 20, 1, '2019-11-07 12:44:19', '2019-11-07 12:44:19', 0),
(21, 21, 1, '2019-11-07 13:35:10', '2019-11-07 13:35:10', 0),
(22, 22, 1, '2019-11-11 09:37:29', '2019-11-11 09:37:29', 0),
(23, 23, 1, '2019-11-11 09:38:23', '2019-11-11 09:38:23', 0),
(24, 24, 1, '2019-11-11 09:38:58', '2019-11-11 09:38:58', 0),
(25, 25, 1, '2019-11-11 11:40:58', '2019-11-11 11:40:58', 0),
(26, 26, 1, '2019-11-11 11:45:03', '2019-11-11 11:45:03', 0),
(27, 27, 1, '2019-11-11 12:23:24', '2019-11-11 12:23:24', 0),
(28, 28, 1, '2019-11-12 12:55:04', '2019-11-12 12:55:04', 0),
(29, 29, 1, '2019-11-12 13:00:29', '2019-11-12 13:00:29', 0),
(30, 30, 1, '2019-11-12 13:07:31', '2019-11-12 13:07:31', 0),
(31, 31, 1, '2019-11-12 13:11:13', '2019-11-12 13:11:13', 0),
(32, 32, 1, '2019-11-13 12:46:29', '2019-11-13 12:46:29', 0),
(33, 33, 1, '2019-11-13 12:47:07', '2019-11-13 12:47:07', 0),
(34, 34, 1, '2019-11-13 13:38:11', '2019-11-13 13:38:11', 0),
(35, 35, 1, '2019-11-13 13:38:41', '2019-11-13 13:38:41', 0),
(36, 36, 1, '2019-11-13 13:39:14', '2019-11-13 13:39:14', 0);

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
(3, 2, 'Gas', 1, '2019-07-18 06:18:36', '2019-10-18 06:16:34', 0),
(4, 2, 'Tank', 1, '2019-07-18 06:18:36', '2019-10-18 10:41:52', 0),
(5, 3, 'Furniture', 1, '2019-07-18 06:18:36', '2019-10-18 10:42:29', 0),
(6, 1, 'Telephone', 1, '2019-07-22 12:52:55', '2019-10-18 10:42:26', 0),
(7, 5, 'Table', 1, '2019-07-24 07:23:13', '2019-10-18 10:43:45', 0),
(8, 3, 'HPGas', 1, '2019-07-24 09:13:00', '2019-10-18 10:45:55', 0),
(9, 1, 'Refrigerator', 1, '2019-07-24 09:21:27', '2019-09-09 07:06:19', 0),
(10, 1, 'AC', 1, '2019-10-10 13:02:31', '2019-10-10 13:02:31', 0),
(11, 6, 'Mobile', 1, '2019-11-08 09:10:46', '2019-11-08 09:10:46', 0),
(12, 10, 'Blue Star', 1, '2019-11-08 10:34:48', '2019-11-08 10:34:48', 0),
(13, 7, 'Chair', 1, '2019-11-08 10:41:13', '2019-11-08 10:41:13', 0),
(14, 13, 'H Chair', 1, '2019-11-08 10:42:33', '2019-11-08 10:42:33', 0),
(15, 13, 'S Chair', 1, '2019-11-08 10:44:02', '2019-11-08 10:44:02', 0),
(17, 3, 'Indian Gas', 1, '2019-11-08 10:46:01', '2019-11-08 10:46:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `checklist`
--

CREATE TABLE `checklist` (
  `checklistId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `categoryIdFK` int(11) NOT NULL,
  `checkingDuration` varchar(50) NOT NULL,
  `durationTypeIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checklist`
--

INSERT INTO `checklist` (`checklistId`, `title`, `organizationIdFK`, `categoryIdFK`, `checkingDuration`, `durationTypeIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Automatic actuations', 1, 1, '1', 3, '2019-09-16 11:38:30', '2019-11-06 12:42:52', 0),
(2, 'Actuation from fire station', 1, 2, '2', 5, '2019-09-20 13:04:58', '2019-11-06 12:42:12', 0),
(3, 'Fire Brigade Automatics', 1, 1, '10', 4, '2019-10-07 07:19:58', '2019-11-06 12:42:22', 1),
(4, 'abcdef', 1, 1, '1', 2, '2019-10-10 12:34:52', '2019-11-06 12:40:48', 1),
(5, 'dwqfwqffwq', 1, 5, '1', 5, '2019-10-23 06:27:07', '2019-11-06 12:42:29', 0),
(6, 'dwqfwqffwq', 1, 6, '1', 1, '2019-10-23 06:37:49', '2019-11-06 12:42:41', 0),
(7, 'dsssk', 1, 1, '1', 2, '2019-10-23 07:19:28', '2019-11-06 12:40:48', 1),
(8, 'fggeggweegwgge', 1, 1, '1', 2, '2019-10-23 07:33:05', '2019-11-06 12:40:48', 1),
(9, 'WQQFFQW', 1, 1, '1', 2, '2019-10-23 11:29:58', '2019-11-06 12:40:48', 1),
(10, 'samsung', 1, 9, '1', 2, '2019-10-23 12:20:35', '2019-11-06 12:40:48', 0),
(11, 'vgergef', 1, 1, '1', 2, '2019-10-23 12:49:56', '2019-11-06 12:40:48', 1),
(12, 'accacscsak', 1, 1, '1', 2, '2019-10-24 05:23:57', '2019-11-06 12:40:48', 1),
(13, 'checklist1', 1, 1, '3', 5, '2019-11-11 06:07:48', '2019-11-18 12:54:25', 1),
(14, 'asdsad', 1, 1, '12', 4, '2019-11-14 13:50:48', '2019-11-14 14:17:48', 1),
(15, 'asdsad', 1, 1, '12', 5, '2019-11-14 13:51:56', '2019-11-14 13:52:01', 1),
(16, 'Test', 1, 1, '12', 1, '2019-11-14 14:05:31', '2019-11-14 14:17:37', 1),
(17, 'Testt', 1, 1, '12', 5, '2019-11-14 14:17:59', '2019-11-18 11:00:25', 1),
(18, 'Test', 1, 1, '23', 4, '2019-11-15 05:36:21', '2019-11-15 05:36:21', 0),
(19, 'ajdbsb', 1, 1, '2', 3, '2019-11-15 05:51:57', '2019-11-18 09:10:03', 0),
(20, 'Test duration updation', 1, 1, '13', 3, '2019-11-15 06:36:51', '2019-11-18 11:00:25', 1),
(21, 'Test', 1, 1, '12', 4, '2019-11-18 06:51:32', '2019-11-18 06:51:36', 1),
(22, 'retesting Questions?', 1, 1, '4', 2, '2019-11-18 09:21:17', '2019-11-18 12:39:08', 0),
(23, 'kkkkkkkk212', 1, 1, '6', 2, '2019-11-18 13:04:19', '2019-11-18 13:04:26', 1);

-- --------------------------------------------------------

--
-- Table structure for table `checklistimage`
--

CREATE TABLE `checklistimage` (
  `checklistImageId` int(11) NOT NULL,
  `imageId` varchar(255) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`complaintId`, `typeOfComplaintFK`, `assetIdFK`, `complaintStatusIdFK`, `title`, `message`, `typeOfUserIdFK`, `raiseBy`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 2, 1, 1, 'Asset', 'test', 2, 1, '2019-10-22 09:20:15', '2019-10-24 07:27:06', 0),
(2, 2, 1, 1, 'test ', 'test asset', 2, 1, '2019-10-24 09:17:33', '2019-11-07 06:52:34', 0),
(3, 2, 1, 1, 'pqrs', 'test asset2', 3, 2, '2019-10-24 10:28:52', '2019-11-07 06:52:43', 0),
(4, 1, 0, 1, 'General Task', 'Lorem ipsum', 2, 1, '2019-11-16 06:46:59', '2019-11-16 06:46:59', 0);

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

--
-- Dumping data for table `complaintimages`
--

INSERT INTO `complaintimages` (`complaintImagesId`, `complaintIdFK`, `imageName`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(7, 1, 'image-1571736085423.jpeg', '2019-10-22 09:21:25', '2019-10-22 09:21:25', 0),
(8, 4, 'image-1573886969851.jpeg', '2019-11-16 06:49:29', '2019-11-16 06:49:29', 0),
(9, 2, 'image-1573887061507.png', '2019-11-16 06:51:01', '2019-11-16 06:51:01', 0),
(10, 3, 'image-1573887110157.jpeg', '2019-11-16 06:51:50', '2019-11-16 06:51:50', 0);

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
  `complaintIdFK` int(11) NOT NULL,
  `complaintStatusIdFK` int(11) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complainttrack`
--

INSERT INTO `complainttrack` (`complaintTrackId`, `complaintIdFK`, `complaintStatusIdFK`, `typeOfUserIdFK`, `masterId`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 2, 4, 3, 1, '2019-10-24 09:17:33', '2019-11-02 09:34:43', 0),
(2, 2, 4, 3, 2, '2019-10-24 09:17:33', '2019-11-02 09:34:43', 0),
(3, 1, 3, 3, 1, '2019-10-24 09:45:47', '2019-11-07 07:27:53', 0),
(4, 1, 3, 3, 2, '2019-10-24 09:45:47', '2019-11-02 09:35:06', 0),
(5, 3, 1, 3, 1, '2019-10-24 10:29:37', '2019-10-24 10:29:37', 0),
(6, 3, 1, 3, 2, '2019-10-24 10:29:37', '2019-10-24 10:29:37', 0),
(7, 4, 1, 3, 12, '2019-11-16 06:47:00', '2019-11-18 12:40:27', 0),
(8, 4, 1, 3, 11, '2019-11-16 06:47:00', '2019-11-18 12:40:27', 0);

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
(1, 1, 1, 'Purchasing child1', '2019-07-16 06:04:57', '2019-11-18 11:14:19', 0),
(3, 1, 1, 'Telecom', '2019-07-22 12:45:53', '2019-11-18 11:14:21', 0),
(4, 1, 1, 'Purchasing child', '2019-07-24 06:08:28', '2019-11-18 11:14:23', 0),
(5, 1, 5, 'electronics', '2019-10-10 12:25:04', '2019-11-18 11:14:25', 0),
(6, 1, 6, 'Testing department', '2019-10-17 09:14:54', '2019-11-18 11:14:28', 0),
(7, 1, 7, 'sagar sub root update', '2019-10-17 13:51:03', '2019-11-18 09:55:14', 1),
(8, 1, 6, 'ssc', '2019-11-11 05:41:57', '2019-11-18 11:14:34', 0),
(9, 1, 7, 'root1', '2019-11-12 07:00:04', '2019-11-18 11:14:36', 0),
(10, 1, 39, 'Main Root', '2019-11-13 11:55:39', '2019-11-15 12:01:43', 1),
(11, 1, 11, 'kkkkkl', '2019-11-13 11:57:32', '2019-11-15 10:22:55', 1),
(12, 1, 1, 'llllllllll', '2019-11-13 12:17:34', '2019-11-15 07:28:37', 1),
(13, 1, 1, 'qqqqqqqqq', '2019-11-13 12:46:19', '2019-11-15 09:55:47', 1),
(14, 1, 1, 'rrrrrrrrr', '2019-11-13 13:04:26', '2019-11-15 08:55:46', 1),
(15, 1, 5, 'electronics', '2019-11-13 13:07:28', '2019-11-15 12:09:25', 1),
(16, 1, 6, 'Manual Testing', '2019-11-14 05:49:43', '2019-11-15 12:09:28', 1),
(17, 1, 6, 'testing', '2019-11-14 06:02:05', '2019-11-15 12:09:31', 1),
(18, 1, 7, 'root testing', '2019-11-14 06:04:37', '2019-11-15 12:09:33', 1),
(19, 1, 5, 'mobile', '2019-11-14 08:57:53', '2019-11-15 12:09:35', 1),
(20, 1, 1, 'klklklkl', '2019-11-14 09:17:08', '2019-11-15 09:55:43', 1),
(21, 1, 1, 'cwewwe', '2019-11-14 09:40:09', '2019-11-15 07:27:53', 1),
(22, 1, 1, 'ssc', '2019-11-14 09:40:42', '2019-11-15 07:34:38', 1),
(23, 1, 9, 'ssc', '2019-11-14 09:41:30', '2019-11-15 12:09:38', 1),
(24, 1, 7, 'llllllllllllll', '2019-11-14 09:50:01', '2019-11-15 12:09:39', 1),
(25, 1, 7, 'mmmmmmmmmm', '2019-11-14 09:50:29', '2019-11-15 10:59:39', 1),
(26, 1, 3, 'abcd', '2019-11-14 12:02:11', '2019-11-15 07:34:15', 1),
(27, 1, 1, 'bbbbbbb', '2019-11-14 14:05:22', '2019-11-15 07:25:24', 1),
(28, 1, 5, 'fffffff', '2019-11-14 14:22:17', '2019-11-15 10:59:03', 1),
(29, 1, 5, 'ddddkkkk', '2019-11-14 14:26:07', '2019-11-15 10:59:20', 1),
(30, 1, 5, 'llllkkk', '2019-11-14 14:26:23', '2019-11-15 10:58:53', 1),
(31, 1, 1, 'sfergrerge', '2019-11-15 06:20:33', '2019-11-15 07:27:42', 1),
(32, 1, 6, 'development', '2019-11-15 06:29:07', '2019-11-15 12:09:43', 1),
(33, 1, 5, 'development', '2019-11-15 06:32:35', '2019-11-15 12:09:45', 1),
(34, 1, 1, 'bbbb', '2019-11-15 06:35:18', '2019-11-15 07:27:10', 1),
(35, 1, 35, 'kkkl', '2019-11-15 10:11:13', '2019-11-15 10:22:52', 1),
(36, 1, 36, 'fffffkkl', '2019-11-15 10:21:44', '2019-11-15 11:17:34', 1),
(37, 1, 10, 'qqqe', '2019-11-15 10:22:46', '2019-11-15 12:09:47', 1),
(38, 1, 40, 'kkklasdsa', '2019-11-15 10:23:15', '2019-11-15 12:09:49', 1),
(39, 1, 37, 'ffff', '2019-11-15 10:40:48', '2019-11-15 12:09:51', 1),
(40, 1, 38, 'kkkl', '2019-11-15 10:44:05', '2019-11-15 12:09:53', 1),
(41, 1, 5, 'dasda', '2019-11-15 12:32:12', '2019-11-16 09:00:01', 1),
(42, 1, 1, 'sagar', '2019-11-15 12:55:56', '2019-11-18 09:55:19', 1),
(43, 1, 3, 'telecom root update', '2019-11-15 12:57:28', '2019-11-18 09:55:21', 1),
(44, 1, 43, 'qwewqewqk', '2019-11-15 12:57:42', '2019-11-16 09:00:42', 1),
(45, 1, 42, 'qwee', '2019-11-15 13:02:24', '2019-11-15 13:03:11', 1),
(46, 1, 45, 'rty', '2019-11-15 13:02:32', '2019-11-15 13:02:59', 1),
(47, 1, 7, 'sagar sub root sd sagar updated', '2019-11-15 13:04:13', '2019-11-18 09:55:23', 1),
(48, 1, 47, 'sagar sub sub root', '2019-11-15 13:04:24', '2019-11-15 13:04:56', 1),
(49, 1, 47, 'sagar created child update', '2019-11-15 13:20:44', '2019-11-16 05:40:34', 1),
(50, 1, 1, 'Shubham1', '2019-11-16 05:39:06', '2019-11-18 11:15:51', 0),
(51, 1, 4, 'acsaca', '2019-11-16 05:42:38', '2019-11-16 05:42:45', 1),
(52, 1, 42, 'asaaaaa', '2019-11-16 05:42:52', '2019-11-16 05:42:58', 1),
(53, 1, 5, 'vddsv', '2019-11-16 09:22:52', '2019-11-16 09:23:00', 1),
(54, 1, 5, 'svdvs', '2019-11-16 09:23:06', '2019-11-16 09:24:10', 1),
(55, 1, 5, 'vdsvvsv', '2019-11-16 09:24:14', '2019-11-16 09:24:27', 1),
(56, 1, 5, 'vdsvdsv', '2019-11-16 09:24:31', '2019-11-16 09:25:30', 1),
(57, 1, 56, 'csacac', '2019-11-16 09:25:21', '2019-11-16 09:25:25', 1),
(58, 1, 5, 'yukyuykkk', '2019-11-16 09:25:59', '2019-11-18 09:55:25', 1),
(59, 1, 4, 'cdsvs', '2019-11-16 09:37:39', '2019-11-18 09:55:27', 1),
(60, 1, 4, 'cscvsdvvv', '2019-11-16 09:47:34', '2019-11-18 09:55:28', 1),
(61, 1, 4, 'csvsvvdvdvs', '2019-11-16 10:15:26', '2019-11-18 09:55:29', 1),
(62, 1, 4, 'asaavsavavv', '2019-11-16 10:16:39', '2019-11-18 09:55:30', 1),
(63, 1, 58, 'aaaaa', '2019-11-16 10:20:40', '2019-11-16 10:20:52', 1),
(64, 1, 58, 'klklkkaaaak', '2019-11-18 05:27:27', '2019-11-18 05:28:11', 1),
(65, 1, 1, 'klllllllllllllllllll', '2019-11-18 05:28:29', '2019-11-18 09:55:31', 1),
(66, 1, 5, 'Iron', '2019-11-18 09:01:24', '2019-11-18 09:55:32', 1),
(67, 1, 67, 'new', '2019-11-18 10:13:11', '2019-11-18 10:14:17', 1),
(68, 1, 68, 'veregg', '2019-11-18 10:45:21', '2019-11-18 10:46:06', 1),
(69, 1, 69, 'kkkkkkkkk', '2019-11-18 10:46:42', '2019-11-18 10:46:46', 1),
(70, 1, 70, 'vfbbdbdb', '2019-11-18 10:48:19', '2019-11-18 10:48:29', 1),
(71, 1, 71, 'dsgssgsgs', '2019-11-18 10:51:00', '2019-11-18 10:51:35', 1),
(72, 1, 72, 'vfdfdbfbd', '2019-11-18 10:53:25', '2019-11-18 10:53:31', 1),
(73, 1, 73, 'afafafafa', '2019-11-18 11:00:08', '2019-11-18 11:04:56', 1),
(74, 1, 74, 'wcwacscac', '2019-11-18 11:09:20', '2019-11-18 11:09:50', 1),
(75, 1, 74, 'caacaca', '2019-11-18 11:09:42', '2019-11-18 11:09:49', 1);

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
(1, 'Asset', 'Fire extinguishers with a Class C rating are suitable for fires in “live” electrical equipment. Both monoammonium phosphate and sodium bicarbonate are commonly used to fight this type of fire because of their nonconductive properties. Fire extinguishers are classified by fire type', 'document-1571130786701.pdf', 1, 1, '2019-09-20 10:23:36', '2019-10-19 10:11:11', 0),
(2, 'Printer', 'Printers can be divided into two main categories : Impact Printers : In this hammers or pins strike against a ribbon and paper to print the text. This mechanism is known as electro-mechanical mechanism. They are of two types. Character Printer : It prints only one character at a time.', 'document-1571130786701.pdf', 1, 1, '2019-09-20 10:56:31', '2019-10-19 10:11:21', 0),
(3, 'Category', 'Category123', 'document-1571130786701.pdf', 1, 1, '2019-10-15 09:15:11', '2019-11-05 10:15:39', 0),
(5, 'ddddddd', 'asffffa', 'document-1571898421652.docx', 2, 1, '2019-10-24 06:35:54', '2019-11-06 05:33:13', 0),
(6, '123', '2', 'document-1571898421652.docx', 1, 1, '2019-10-24 06:39:56', '2019-10-24 06:47:32', 1),
(7, 'fwffwefwefwkkk', 'wfefwefffwef', 'document-1571916922360.docx', 1, 1, '2019-10-24 11:35:22', '2019-11-04 10:18:07', 1),
(8, 'dsdvegsekkl', 'gseggvwgegwgw', 'document-1572948987080.docx', 2, 1, '2019-11-05 10:16:27', '2019-11-05 10:18:02', 0),
(9, 'aaaaaa', 'acscwevwvewv', 'document-1573022563906.docx', 1, 1, '2019-11-06 06:42:44', '2019-11-06 06:42:44', 0),
(10, 'lllalallalala', 'awwffwff', 'document-1573022683334.docx', 1, 1, '2019-11-06 06:44:43', '2019-11-06 06:44:43', 0),
(11, 'General', 'test data', 'document-1571916922360.docx', 3, 0, '2019-11-11 13:09:01', '2019-11-11 13:14:54', 0),
(12, 'Test doc', 'This is test doc', 'document-1573565501730.doc', 2, 31, '2019-11-12 13:31:41', '2019-11-12 13:31:41', 0),
(14, 'bdbbddvds', 'svdsvsvv', 'document-1573627918247.docx', 3, 0, '2019-11-13 06:51:58', '2019-11-13 06:51:58', 0),
(15, 'SRS Brigs', 'csvdsvsvs', 'document-1573627950695.docx', 2, 0, '2019-11-13 06:52:30', '2019-11-13 06:52:30', 0),
(16, 'Test Refrigerator Checklist', 'Test document upload', 'document-1573629515320.doc', 2, 30, '2019-11-13 07:18:35', '2019-11-13 09:38:24', 0),
(17, 'nfnndnn', 'nnfdnfnnfd', 'document-1573634734784.docx', 3, 0, '2019-11-13 08:45:34', '2019-11-13 08:45:34', 0),
(18, 'brigss', 'fewweggwg', 'document-1573636525350.docx', 2, 0, '2019-11-13 09:15:25', '2019-11-13 09:16:19', 0),
(19, 'ABC docs', 'test desc', 'document-1573636886073.pdf', 1, 3, '2019-11-13 09:28:03', '2019-11-13 09:28:03', 0),
(20, 'asdasd', 'asdasd', 'document-1573639297169.doc', 2, 30, '2019-11-13 10:01:37', '2019-11-13 10:14:57', 1),
(21, 'New Doc', 'adsasdasdk', 'document-1573639858719.doc', 2, 0, '2019-11-13 10:10:58', '2019-11-13 10:15:17', 0),
(22, 'aaadddsa', 'asdasdasd', 'document-1573639875048.doc', 2, 30, '2019-11-13 10:11:15', '2019-11-13 10:13:34', 1),
(23, 'asdtrytryrty', 'cbcb', 'document-1573639997848.doc', 2, 30, '2019-11-13 10:13:17', '2019-11-13 10:13:29', 1),
(24, 'dsgdg', 'dfgdgdfg', 'document-1573640022996.doc', 2, 30, '2019-11-13 10:13:43', '2019-11-13 10:14:41', 1),
(25, 'sdf', 'sdfsdf', 'document-1573640201573.doc', 2, 30, '2019-11-13 10:16:41', '2019-11-13 10:17:16', 1),
(26, 'sdfsdf', 'sdfsf', 'document-1573640209599.doc', 2, 30, '2019-11-13 10:16:49', '2019-11-13 10:17:16', 1),
(27, 'sdas', 'adasd', 'document-1573640285558.doc', 2, 30, '2019-11-13 10:18:05', '2019-11-13 10:20:18', 1),
(28, 'asdasdfddgf', 'dfgdfgdfg', 'document-1573640295221.doc', 2, 30, '2019-11-13 10:18:15', '2019-11-13 10:19:08', 1),
(29, 'gdgsdg', 'sdgsdgfsdg', 'document-1573640431303.doc', 2, 30, '2019-11-13 10:20:31', '2019-11-13 10:21:22', 1),
(30, 'hjkhjk', 'hgkghjkhgk', 'document-1573640437790.doc', 2, 30, '2019-11-13 10:20:37', '2019-11-13 10:21:04', 1),
(31, 'yyutii', 'iopuipo', 'document-1573640444636.doc', 2, 30, '2019-11-13 10:20:44', '2019-11-13 10:20:49', 1),
(32, 'asfasdf', 'asfdasfsdaf', 'document-1573640554817.doc', 2, 30, '2019-11-13 10:22:34', '2019-11-13 10:22:34', 0),
(33, 'ioiuo', 'yuiuio', 'document-1573640561863.doc', 2, 30, '2019-11-13 10:22:41', '2019-11-13 10:25:19', 1),
(34, 'rtyrtye', 'hjlhjl', 'document-1573640569149.doc', 2, 30, '2019-11-13 10:22:49', '2019-11-13 10:23:01', 1),
(35, 'lkjlkjlj', 'klkjlkjkl', 'document-1573640704084.doc', 2, 30, '2019-11-13 10:25:04', '2019-11-13 10:25:19', 1),
(36, 'dsgsdg', 'sdgdsfg', 'document-1573640783182.doc', 2, 29, '2019-11-13 10:26:23', '2019-11-13 10:39:17', 1),
(37, 'hggh', 'fdhgdfg', 'document-1573640791558.doc', 2, 29, '2019-11-13 10:26:31', '2019-11-13 10:26:31', 0),
(38, 'tyutrutyu', 'dfgdfg', 'document-1573640799318.doc', 2, 29, '2019-11-13 10:26:39', '2019-11-13 10:28:04', 1),
(39, 'yuiyui', 'yuiyui', 'document-1573640806863.doc', 2, 29, '2019-11-13 10:26:46', '2019-11-13 10:33:50', 1),
(40, 'sdfsdf', 'sdfsdf', 'document-1573640821483.doc', 2, 29, '2019-11-13 10:27:01', '2019-11-13 10:28:04', 1),
(41, 'dfhgfh', 'dfhdfhgdfh', 'document-1573641259228.doc', 2, 29, '2019-11-13 10:34:19', '2019-11-13 10:39:17', 1),
(42, 'dfhdfh', 'dfhfdhdfh', 'document-1573641265596.doc', 2, 29, '2019-11-13 10:34:25', '2019-11-13 10:35:31', 1),
(43, 'kjhljl', 'hjlhjlk', 'document-1573641274612.doc', 2, 29, '2019-11-13 10:34:34', '2019-11-13 10:35:00', 1),
(44, 'asfdasdf', 'asdfsdafads', 'document-1573641769677.doc', 2, 24, '2019-11-13 10:42:49', '2019-11-13 10:50:31', 1),
(45, 'kjlkjfg', 'ljfjgdfkgj', 'document-1573642331692.doc', 2, 24, '2019-11-13 10:52:11', '2019-11-13 10:52:11', 0),
(46, 'sdfgsdfg', 'dsfgdsffg', 'document-1573642342340.doc', 2, 24, '2019-11-13 10:52:22', '2019-11-13 10:52:22', 0),
(47, 'dsfgdfsg', 'dsfgdsfg', 'document-1573642352236.doc', 2, 24, '2019-11-13 10:52:32', '2019-11-13 10:52:32', 0),
(48, 'asdasd', 'asdasd', 'document-1573642401560.doc', 2, 24, '2019-11-13 10:53:21', '2019-11-13 10:53:21', 0),
(49, 'asdasdaaa', 'asdasd', 'document-1573642409872.doc', 2, 0, '2019-11-13 10:53:29', '2019-11-13 10:55:01', 0),
(50, 'asdasd', 'asdasd', 'document-1573642497459.doc', 2, 24, '2019-11-13 10:54:57', '2019-11-13 10:54:57', 0),
(51, 'asdasd', 'asdasd', 'document-1573642505082.doc', 2, 24, '2019-11-13 10:55:05', '2019-11-13 10:55:05', 0),
(52, 'asdasd', 'aasd', 'document-1573642657323.doc', 2, 24, '2019-11-13 10:57:37', '2019-11-13 12:35:28', 1),
(53, 'sadasd', 'asdasd', 'document-1573642694228.doc', 2, 24, '2019-11-13 10:58:14', '2019-11-13 12:10:40', 1),
(54, 'asdasd', 'asdasd', 'document-1573642701472.doc', 2, 24, '2019-11-13 10:58:21', '2019-11-13 10:58:21', 0),
(55, 'asdasd', 'asdasd', 'document-1573642882351.doc', 2, 24, '2019-11-13 11:01:22', '2019-11-13 11:01:22', 0),
(56, 'asdas', 'asd', 'document-1573642890236.doc', 2, 24, '2019-11-13 11:01:30', '2019-11-13 11:01:30', 0),
(57, 'dfwer', 'sdfsdf', 'document-1573643615036.doc', 2, 24, '2019-11-13 11:13:35', '2019-11-13 11:13:35', 0),
(58, 'zfzf', 'werwer', 'document-1573643633739.doc', 2, 24, '2019-11-13 11:13:53', '2019-11-13 12:35:23', 1),
(59, 'sdfsdf', 'sdf', 'document-1573643650309.doc', 2, 24, '2019-11-13 11:14:10', '2019-11-13 12:35:20', 1),
(60, 'asd', 'asd', 'document-1573643688976.doc', 2, 24, '2019-11-13 11:14:49', '2019-11-13 12:35:04', 1),
(61, 'asddgf', 'fgdfg', 'document-1573643699032.doc', 2, 24, '2019-11-13 11:14:59', '2019-11-13 12:34:16', 1),
(62, 'werwr', 'werwer', 'document-1573643754274.doc', 2, 24, '2019-11-13 11:15:54', '2019-11-13 12:19:53', 1),
(63, 'wer', 'wer', 'document-1573643763574.doc', 2, 24, '2019-11-13 11:16:03', '2019-11-13 12:10:34', 1),
(64, 'tret', 'ertetr', 'document-1573643841743.doc', 2, 24, '2019-11-13 11:17:21', '2019-11-13 12:08:11', 1),
(65, 'yryr', 'rtrty', 'document-1573643853743.doc', 2, 24, '2019-11-13 11:17:33', '2019-11-13 12:05:39', 1),
(66, 'sdf', 'ghfgh', 'document-1573643976567.doc', 2, 24, '2019-11-13 11:19:36', '2019-11-13 12:08:02', 1),
(67, 'fghgfh', 'fghfgh', 'document-1573643990960.doc', 2, 24, '2019-11-13 11:19:50', '2019-11-13 12:05:06', 1),
(68, 'wrwer', 'wer', 'document-1573644050229.doc', 2, 24, '2019-11-13 11:20:50', '2019-11-13 12:10:30', 1),
(69, 'wer', 'wer', 'document-1573644057449.doc', 2, 24, '2019-11-13 11:20:57', '2019-11-13 12:04:52', 1),
(70, 'wer', 'werwer', 'document-1573644070476.doc', 2, 24, '2019-11-13 11:21:10', '2019-11-13 12:03:29', 1),
(71, 'ghjghj', 'ghjghj', 'document-1573645353433.doc', 2, 24, '2019-11-13 11:42:33', '2019-11-13 12:04:38', 1),
(72, 'ghj', 'ghjghj', 'document-1573645362697.doc', 2, 24, '2019-11-13 11:42:42', '2019-11-13 12:01:27', 1),
(73, 'rewerrty', 'rtyrytrty', 'document-1573645892914.doc', 2, 24, '2019-11-13 11:51:32', '2019-11-13 12:00:21', 1),
(74, 'sdfsdf', 'sdfsdf', 'document-1573645926899.doc', 2, 24, '2019-11-13 11:52:06', '2019-11-13 11:58:36', 1),
(75, 'sdfsdf', 'sdfsd', 'document-1573645941815.doc', 2, 24, '2019-11-13 11:52:21', '2019-11-13 11:57:35', 1),
(76, 'gfd', 'dfgdfg', 'document-1573646009036.doc', 2, 24, '2019-11-13 11:53:29', '2019-11-13 11:56:36', 1),
(77, 'sdfsdf', 'sdfsdfs', 'document-1573647609646.doc', 2, 24, '2019-11-13 12:20:09', '2019-11-13 12:34:12', 1),
(78, 'sdfsdfghjgh', 'fddfgdfg', 'document-1573647617070.doc', 2, 24, '2019-11-13 12:20:17', '2019-11-13 12:34:09', 1),
(79, 'sdsdf', 'sdfsdfsdf', 'document-1573648467396.doc', 2, 24, '2019-11-13 12:34:27', '2019-11-13 12:34:57', 1),
(80, 'fdsdf', 'sdfsdf', 'document-1573648568322.doc', 2, 24, '2019-11-13 12:36:08', '2019-11-13 12:36:08', 0),
(81, 'hgh', 'fghfgh', 'document-1573648578144.doc', 2, 24, '2019-11-13 12:36:18', '2019-11-13 12:36:18', 0),
(82, 'fjgfhj', 'gfhj', 'document-1573648628885.doc', 2, 24, '2019-11-13 12:37:08', '2019-11-13 12:37:08', 0),
(83, 'fgjhgj', 'ghjghj', 'document-1573648636809.doc', 2, 24, '2019-11-13 12:37:16', '2019-11-13 13:40:07', 1),
(84, 'asdasd', 'asdasd', 'document-1573649044174.doc', 2, 24, '2019-11-13 12:44:04', '2019-11-13 12:44:04', 0),
(85, 'asdas', 'asdas', 'document-1573649053687.doc', 2, 24, '2019-11-13 12:44:13', '2019-11-13 12:44:13', 0),
(86, 'asdsda', 'asdasd', 'document-1573649143106.doc', 2, 24, '2019-11-13 12:45:43', '2019-11-13 13:39:51', 1),
(87, 'asdas', 'asdas', 'document-1573649152766.doc', 2, 24, '2019-11-13 12:45:52', '2019-11-13 12:45:52', 0),
(88, 'sdfsdf', 'sfdsdf', 'document-1573649258060.doc', 2, 24, '2019-11-13 12:47:38', '2019-11-13 12:47:38', 0),
(89, 'sfghfh', 'fghfgh', 'document-1573649264991.doc', 2, 24, '2019-11-13 12:47:45', '2019-11-13 12:47:45', 0),
(90, 'sdfsdf', 'sdfsdf', 'document-1573649523143.doc', 2, 24, '2019-11-13 12:52:03', '2019-11-13 12:52:03', 0),
(91, 'sdfsdf', 'sdfsdfsd', 'document-1573649530275.doc', 2, 24, '2019-11-13 12:52:10', '2019-11-13 13:26:37', 1),
(92, 'sadfsdf', 'sadfsdaf', 'document-1573649619811.doc', 2, 24, '2019-11-13 12:53:39', '2019-11-13 13:07:12', 1),
(93, 'sdfsdaf', 'sadfsdf', 'document-1573649626268.doc', 2, 24, '2019-11-13 12:53:46', '2019-11-13 13:07:08', 1),
(94, 'wer', 'wer', 'document-1573651606966.doc', 2, 24, '2019-11-13 13:26:46', '2019-11-13 13:28:18', 1),
(95, 'wer', 'wer', 'document-1573651614809.doc', 2, 24, '2019-11-13 13:26:54', '2019-11-13 13:28:15', 1),
(96, 'asdasd', 'ffdfdsssfsffs', 'document-1573651705517.doc', 3, 0, '2019-11-13 13:28:25', '2019-11-18 14:28:33', 0),
(97, 'asdas', 'asdasd', 'document-1573651712332.doc', 2, 24, '2019-11-13 13:28:32', '2019-11-15 10:30:40', 1),
(98, 'asd', 'asdfdsf', 'document-1573706197063.doc', 2, 24, '2019-11-14 04:36:37', '2019-11-14 07:08:41', 1),
(99, 'saf', 'saf', 'document-1573706207078.doc', 2, 24, '2019-11-14 04:36:47', '2019-11-14 04:37:09', 1),
(100, 'sfa', 'asfgh', 'document-1573706218166.doc', 2, 24, '2019-11-14 04:36:58', '2019-11-14 04:37:05', 1),
(101, 'testdff', 'fsdfsdfsdfsd', 'document-1573725764328.doc', 3, 0, '2019-11-14 05:35:58', '2019-11-15 10:30:36', 1),
(102, 'test new update', 'sdfasdf', 'document-1573715343119.doc', 2, 24, '2019-11-14 07:09:03', '2019-11-15 10:27:21', 1),
(103, 'Electronics for you maintenance guidelines', 'sdfsdfsdf', 'document-1573725714920.doc', 1, 1, '2019-11-14 10:01:54', '2019-11-14 12:54:38', 1),
(104, 'test doc', 'fsdfsdfsdfsd', 'document-1573725764328.doc', 1, 1, '2019-11-14 10:02:44', '2019-11-14 12:22:53', 1),
(105, 'sfgfg', 'dfgdfg', 'document-1573725954018.doc', 1, 1, '2019-11-14 10:05:54', '2019-11-14 10:18:47', 1),
(106, 'dfdf', 'sdfsdf', 'document-1573725983017.doc', 1, 1, '2019-11-14 10:06:23', '2019-11-14 10:18:41', 1),
(107, 'ghjghj updated', 'ghjghj', 'document-1573726002151.doc', 1, 1, '2019-11-14 10:06:30', '2019-11-14 10:18:25', 1),
(108, 'Asap', 'asasas', 'document-1573726662279.doc', 1, 1, '2019-11-14 10:17:42', '2019-11-14 10:18:37', 1),
(109, 'asdasd', 'asdasd', 'document-1573736085792.doc', 1, 1, '2019-11-14 12:54:45', '2019-11-15 07:31:48', 1),
(110, 'verbrebrerb', 'brebbebrebb', 'document-1573736421447.docx', 1, 1, '2019-11-14 13:00:15', '2019-11-14 13:00:37', 1),
(111, 'bbbbbbb', 'breberbrbe', 'document-1573736432172.docx', 1, 1, '2019-11-14 13:00:26', '2019-11-14 13:00:32', 1),
(112, 'qqqqqqq', 'cceveveev', 'document-1573797220051.docx', 3, 0, '2019-11-15 05:53:40', '2019-11-15 05:53:59', 1);

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
(15, 3, 1, '2019-10-09', 2, '2019-10-09 05:42:52', '2019-10-09 05:42:52', 0);

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
(3, 'Year', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0),
(4, 'Minute', '2019-11-06 12:34:24', '2019-11-06 12:34:24', 0),
(5, 'Hour', '2019-11-06 12:34:24', '2019-11-06 12:34:24', 0);

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
(7, 'iffalcon', 1, '2019-10-07 13:39:10', '2019-10-23 13:05:53', 1),
(8, 'fsfeffsfdsd', 1, '2019-10-08 05:18:06', '2019-10-23 09:53:06', 1),
(9, 'dfgvre12', 1, '2019-10-09 12:11:43', '2019-10-10 09:39:45', 1),
(10, 'dfvbgfhyth 65', 1, '2019-10-09 12:11:50', '2019-10-10 09:38:20', 1),
(11, 'ngyfhjftyhu', 1, '2019-10-09 12:12:00', '2019-10-09 13:29:56', 1),
(12, 'nhtgyjhjj', 1, '2019-10-09 12:12:06', '2019-10-09 13:27:11', 1),
(13, 'dsvvsvsdvswab', 1, '2019-10-09 13:38:46', '2019-10-10 09:37:06', 1),
(14, 'TATA Motors', 1, '2019-10-09 13:39:04', '2019-10-10 09:36:57', 1),
(15, 'abcdef', 1, '2019-10-10 12:11:07', '2019-11-18 09:00:05', 1),
(16, 'ttt', 1, '2019-10-23 09:53:11', '2019-10-23 09:53:22', 1),
(17, 'abcdf', 1, '2019-10-23 13:05:27', '2019-11-16 06:49:47', 1),
(18, 'dsvssvk', 1, '2019-11-16 06:55:31', '2019-11-16 06:55:43', 1),
(19, 'HP12343', 1, '2019-11-18 05:25:46', '2019-11-18 08:59:54', 0),
(20, 'gyfvghbvhg566', 1, '2019-11-18 09:00:13', '2019-11-18 09:00:47', 1);

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
  `isCompulsory` int(2) NOT NULL DEFAULT '1',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionId`, `title`, `questionTypeIdFK`, `checkListIdFK`, `isRefer`, `isCompulsory`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'What is your Name?', 1, 1, 0, 1, '2019-07-17 13:56:52', '2019-09-21 07:48:04', 0),
(2, 'What is your DOB?', 2, 1, 0, 1, '2019-07-17 13:56:52', '2019-09-21 07:48:07', 0),
(3, 'Your Gender?', 3, 1, 0, 1, '2019-07-17 13:56:52', '2019-09-21 07:48:10', 0),
(4, 'What you Like?', 4, 1, 0, 1, '2019-07-17 13:56:52', '2019-09-21 07:48:37', 0),
(5, 'Is this ok ??', 3, 1, 0, 1, '2019-07-22 12:35:03', '2019-09-21 07:48:45', 0),
(6, 'Telephone is working well ?', 3, 1, 0, 1, '2019-07-22 12:53:42', '2019-11-18 16:00:35', 0),
(7, 'Last date of servicing?', 2, 1, 0, 1, '2019-07-22 12:54:14', '2019-09-16 11:38:55', 1),
(8, 'Enter model number of telephone', 1, 1, 0, 1, '2019-07-22 12:54:43', '2019-09-16 11:38:55', 1),
(9, 'Incoming  voice ', 3, 1, 0, 1, '2019-07-22 12:56:05', '2019-09-21 07:48:41', 0),
(10, 'Physical condition of piping and valve (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:24:27', '2019-09-16 11:38:55', 1),
(11, 'Autometic actuation (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:24:48', '2019-09-16 11:38:55', 1),
(12, 'Actuation from fire station (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:25:20', '2019-09-16 11:38:55', 1),
(13, 'Actuation from control panel  (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:25:36', '2019-09-16 11:38:55', 1),
(14, 'Acuation from field station  (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:25:56', '2019-09-16 11:38:55', 1),
(15, 'Discharge indication in all panel  (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:26:21', '2019-09-16 11:38:55', 1),
(16, 'Drain valve choked/blocked  (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:26:41', '2019-09-16 11:38:55', 0),
(17, 'water supply main valve/Discharge valve  (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:27:00', '2019-09-16 11:38:55', 1),
(18, 'Gland leak fro main supply valve/Discharge valve   (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:27:19', '2019-09-16 11:38:55', 1),
(19, 'Pneumetic valve working condition  (Observation / corrective action)', 1, 1, 0, 1, '2019-07-22 13:27:38', '2019-09-16 11:38:55', 0),
(20, 'Is it Working', 4, 4, 0, 1, '2019-07-22 14:22:09', '2019-10-18 13:30:05', 0),
(21, 'when was the last maintenance done?', 2, 3, 0, 1, '2019-07-22 14:24:52', '2019-10-18 13:16:42', 0),
(22, 'Test question for automatic automation checklist?', 1, 1, 0, 1, '2019-11-18 05:38:52', '2019-11-18 05:38:52', 0),
(33, 'Please answer any one option', 3, 1, 0, 1, '2019-11-18 06:29:02', '2019-11-18 06:29:02', 0),
(34, 'Please select option for test', 3, 1, 0, 1, '2019-11-18 06:31:56', '2019-11-18 06:31:56', 0),
(35, 'safsdaf sfsdf sdfsdaf', 1, 1, 0, 1, '2019-11-18 06:38:47', '2019-11-18 06:38:47', 0),
(36, 'dfgdfg dfgdfg dfg', 1, 1, 0, 1, '2019-11-18 06:39:56', '2019-11-18 06:39:56', 0),
(37, 'Test question sss?', 1, 1, 0, 1, '2019-11-18 06:41:08', '2019-11-18 06:41:08', 0),
(40, 'What is your  asset name?', 1, 20, 0, 1, '2019-11-18 07:01:10', '2019-11-18 07:01:10', 0),
(41, 'When was the last maintenance done?', 2, 19, 0, 1, '2019-11-18 09:12:35', '2019-11-18 09:12:35', 0),
(42, 'upload asset image', 5, 18, 0, 1, '2019-11-18 09:13:39', '2019-11-18 09:13:39', 0),
(43, 'khkjlmkjk kjuk', 3, 13, 0, 1, '2019-11-18 09:15:57', '2019-11-18 09:15:57', 0),
(44, 'bnhfgjgh jnghj', 4, 20, 0, 1, '2019-11-18 09:22:28', '2019-11-18 09:22:28', 0),
(46, 'fbghb gdbh', 2, 22, 0, 1, '2019-11-18 10:32:02', '2019-11-18 10:32:02', 0),
(47, 'shabcjkdasbc', 3, 22, 0, 1, '2019-11-18 10:33:26', '2019-11-18 10:33:26', 0),
(48, 'string 1', 1, 1, 0, 1, '2019-11-18 10:39:50', '2019-11-18 10:39:50', 0),
(50, 'sdsfdsfdsdf', 3, 1, 0, 1, '2019-11-18 11:07:10', '2019-11-18 11:07:10', 0),
(51, 'asdasdasd asdasdasd', 1, 1, 0, 1, '2019-11-18 11:07:43', '2019-11-18 11:07:43', 0),
(52, 'Take Photo', 3, 1, 1, 1, '2019-11-18 11:09:02', '2019-11-18 11:09:02', 0),
(53, 'Take Photo1', 3, 1, 1, 1, '2019-11-18 11:10:56', '2019-11-18 11:10:56', 0),
(60, 'asdasdasdasdasd', 3, 1, 0, 1, '2019-11-18 14:11:05', '2019-11-18 14:11:05', 0),
(61, 'Test this question??', 1, 22, 0, 1, '2019-11-19 05:20:49', '2019-11-19 05:20:49', 0);

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
(3, 4, 'Red', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(4, 4, 'Green', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(5, 4, 'Blue', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(6, 4, 'Orange', 0, 0, '2019-07-18 06:05:19', '2019-07-18 06:05:19', 0),
(7, 5, 'Good', 0, 0, '2019-07-22 12:35:03', '2019-07-22 12:35:03', 0),
(8, 5, 'Fine', 0, 0, '2019-07-22 12:35:03', '2019-07-22 12:35:03', 0),
(9, 5, 'Very good', 0, 0, '2019-07-22 12:35:03', '2019-07-22 12:35:03', 0),
(10, 6, 'Yes', 0, 52, '2019-07-22 12:53:42', '2019-11-18 11:09:02', 0),
(11, 6, 'No', 0, 0, '2019-07-22 12:53:42', '2019-11-19 05:09:33', 0),
(22, 20, 'Yes', 0, 0, '2019-07-22 14:22:09', '2019-11-18 16:05:42', 1),
(23, 20, 'No', 0, 0, '2019-07-22 14:22:09', '2019-07-24 09:16:53', 1),
(25, 20, 'Yes', 0, 0, '2019-07-24 09:16:53', '2019-07-24 09:16:53', 0),
(26, 20, 'No', 0, 0, '2019-07-24 09:16:53', '2019-07-24 09:16:53', 0),
(28, 33, 'option1', 0, 0, '2019-11-18 06:29:02', '2019-11-18 06:29:02', 0),
(29, 33, 'option2', 1, 0, '2019-11-18 06:29:02', '2019-11-18 06:29:02', 0),
(30, 33, 'option3', 0, 0, '2019-11-18 06:29:02', '2019-11-18 06:29:02', 0),
(31, 34, 'option1', 0, 0, '2019-11-18 06:31:56', '2019-11-18 06:31:56', 0),
(32, 34, 'option2', 1, 0, '2019-11-18 06:31:56', '2019-11-18 06:31:56', 0),
(33, 34, 'option3', 1, 0, '2019-11-18 06:31:56', '2019-11-18 06:31:56', 0),
(34, 43, 'fyfg', 0, 0, '2019-11-18 09:15:57', '2019-11-18 09:15:57', 0),
(35, 43, 'fhfh', 0, 0, '2019-11-18 09:15:57', '2019-11-18 09:15:57', 0),
(36, 44, 'nvghnfn ', 0, 0, '2019-11-18 09:22:28', '2019-11-18 09:22:28', 0),
(37, 44, 'vbgnhjj', 0, 0, '2019-11-18 09:22:28', '2019-11-18 09:22:28', 0),
(38, 47, 'bsjhsgdh ygdyugd', 0, 0, '2019-11-18 10:33:26', '2019-11-18 10:33:26', 0),
(39, 47, 'bcjkdsb nbcjkdgbjk', 0, 0, '2019-11-18 10:33:26', '2019-11-18 10:33:26', 0),
(40, 47, 'sabjkhjkf hfwjhf', 0, 0, '2019-11-18 10:33:26', '2019-11-18 10:33:26', 0),
(41, 50, 'option1', 0, 0, '2019-11-18 11:07:10', '2019-11-18 11:07:10', 0),
(42, 52, 'Yes', 0, 0, '2019-11-18 11:09:02', '2019-11-18 11:09:02', 0),
(43, 52, 'No', 0, 0, '2019-11-18 11:09:02', '2019-11-18 11:09:02', 0),
(44, 53, 'No', 0, 0, '2019-11-18 11:10:56', '2019-11-18 11:10:56', 0),
(45, 53, 'Yes', 0, 0, '2019-11-18 11:10:56', '2019-11-18 11:10:56', 0),
(55, 60, 'asdasd', 0, 0, '2019-11-18 14:11:05', '2019-11-18 14:11:05', 0),
(56, 60, 'asdasd', 0, 0, '2019-11-18 14:11:05', '2019-11-18 14:11:05', 0),
(57, 60, 'asdasd', 0, 0, '2019-11-18 14:11:05', '2019-11-18 14:11:05', 0),
(58, 60, 'asdasdasd', 0, 0, '2019-11-18 14:11:05', '2019-11-18 14:11:05', 0);

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
(4, 'MultiOption', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(5, 'Take Photo', '2019-11-11 11:09:50', '2019-11-11 11:09:50', 0);

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

--
-- Dumping data for table `responsibleperson`
--

INSERT INTO `responsibleperson` (`responsiblePersonId`, `complaintIdFK`, `userIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 2, 1, '2019-10-24 09:17:33', '2019-10-24 09:39:50', 0),
(2, 2, 2, '2019-10-24 09:17:33', '2019-10-24 09:39:53', 0),
(3, 1, 12, '2019-10-24 09:46:13', '2019-11-05 06:47:46', 0),
(4, 1, 10, '2019-10-24 09:46:13', '2019-11-05 06:47:53', 0),
(5, 3, 9, '2019-10-24 10:30:12', '2019-11-05 06:48:02', 0),
(6, 3, 18, '2019-10-24 10:30:12', '2019-11-05 06:48:11', 0),
(7, 4, 12, '2019-11-16 06:47:00', '2019-11-16 06:47:00', 0),
(8, 4, 11, '2019-11-16 06:47:00', '2019-11-16 06:47:00', 0);

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

--
-- Dumping data for table `superadmin`
--

INSERT INTO `superadmin` (`superAdminId`, `firstName`, `lastName`, `mobileNumber`, `emailId`, `password`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Brigs', 'Nucleus', '8888888888', 'info@brigsnucleus.com', '123456789', '2019-10-24 10:59:36', '2019-10-24 10:59:36', 0);

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
(3, 'Shital', 'Pawar', 'Amway', '860047917', 'abc1@gmail.com', 2, '2019-07-24 06:12:16', '2019-10-15 10:36:04', 1),
(4, 'Kavita', 'shimpi', 'Oriflame', '8329121551', 'abc2@gmail.com', 2, '2019-07-24 06:17:56', '2019-10-15 10:36:11', 0),
(5, 'Kavita', 'shimpi', 'HP Printer', '8600479173', 'abc3@gmail.com', 3, '2019-07-25 06:30:00', '2019-10-15 10:36:15', 0),
(6, 'Shital', 'Pawar2', 'Oriflame', '832912155', 'abc4@gmail.com', 4, '2019-07-25 06:30:27', '2019-10-15 10:36:23', 1),
(7, 'dafafa', 'ffafsffd', 'fdsfsdfdfffd', '9136542666', 'k@s.com', 1, '2019-10-08 05:18:30', '2019-10-08 05:18:40', 1),
(8, 'abc', 'pqr', 'KP- Kale Patil Infrastructure Pvt. Ltd.', '9822238881', 'abc5@gmail.com', 1, '2019-10-09 10:56:29', '2019-10-15 10:36:26', 0),
(9, 'abc', 'hjutjut', 'gfghbvhgf', '1236549878', 'abc6@gmail.com', 1, '2019-10-09 11:09:27', '2019-11-18 09:00:36', 1),
(10, 'vdfgbf', 'hbtht', 'gsfdhg1', '9876543254', 'abc7@gmail.com', 1, '2019-10-09 11:10:11', '2019-11-18 08:58:37', 1),
(11, 'njrhfnbjhb', 'njrnghijvn', 'printing solution', '9517538524', 'pqr1@gmail.com', 1, '2019-10-09 11:10:55', '2019-11-18 05:30:24', 1),
(12, 'vdfgbfd', 'pqr', 'ahsgkesw23', '8426795138', 'pqr2@gmail.com', 1, '2019-10-09 11:12:45', '2019-11-18 05:29:55', 1),
(13, 'mnvjhhg', 'ifghj', 'sdnjfnbj123', '6549517532', 'pqr3@gmail.com', 1, '2019-10-09 11:20:01', '2019-11-18 05:29:42', 1),
(14, 'vfgvfdhgb', 'bghytyjj', 'asdfgghjkk12', '9822238883', 'abc8@gmail.com', 1, '2019-10-09 11:20:29', '2019-10-15 10:36:52', 1),
(15, 'gffdk', 'thfdr', 'asd123', '7896541235', 'pqr4@gmail.com', 1, '2019-10-09 13:36:36', '2019-11-18 05:25:33', 1),
(16, 'sdavsvdk', 'vsdvvdsv', 'vdsvv11', '6666666665', 'abc9@gmail.com', 1, '2019-10-09 13:38:08', '2019-11-18 05:15:16', 1),
(17, 'cweww', 'ewvwvewv', 'cwcw', '6666666667', 'abc10@gmail.com', 1, '2019-10-09 13:44:50', '2019-11-16 06:31:32', 1),
(18, 'nfghj', 'gvfgh', 'KP123', '9822238883', 'pqr5@gmail.com', 1, '2019-10-10 06:12:22', '2019-11-16 06:31:29', 1),
(19, 'abc', 'ifghj', 'fser', '7895123647', 'abc11@gmail.com', 1, '2019-10-10 06:29:33', '2019-10-15 10:37:19', 1),
(20, 'abcddgfdfgv', 'pqd', 'lkjhgfdsadd', '8888888888', 'abc12@gmail.com', 1, '2019-10-10 11:55:00', '2019-11-16 06:31:18', 1),
(21, 'yttktykt', 'ytkykytkkkk', 'HP Printer', '6666666666', 'abc@gmail.com', 1, '2019-10-23 09:52:44', '2019-10-23 09:52:49', 1),
(23, 'abc', 'pqr', 'KP- Kale Patil Infrastructure Pvt. Ltd.', '9822238883', 'pqr@gmail.com', 1, '2019-10-23 12:53:16', '2019-10-23 13:04:03', 1),
(26, 'qqqqq', 'qqwwwww', 'wqwqqwqw', '9738175888', 'shubham@stackmint.com', 1, '2019-11-16 06:39:48', '2019-11-16 06:39:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transfercomplaint`
--

CREATE TABLE `transfercomplaint` (
  `transferComplaintId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `fromUserIdFK` int(11) NOT NULL,
  `toUserIdFK` int(11) NOT NULL,
  `transferStatusIdFK` int(11) NOT NULL DEFAULT '1',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transfercomplaint`
--

INSERT INTO `transfercomplaint` (`transferComplaintId`, `complaintIdFK`, `fromUserIdFK`, `toUserIdFK`, `transferStatusIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(3, 1, 2, 18, 2, '2019-11-05 06:34:24', '2019-11-05 10:04:54', 0);

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
(1, 'Pending', '2019-10-09 09:51:15', '2019-10-22 06:20:15', 0),
(2, 'Accepted', '2019-10-09 09:51:15', '2019-10-22 06:20:25', 0),
(3, 'Rejected', '2019-10-22 06:20:43', '2019-10-22 06:20:43', 0);

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
(1, 1, 'Ajay', 'Khatavkar', 'user.png', 1, '9579368483', 'ajay@stackmint.com', '123456789', '', 0, '2019-07-16 06:07:26', '2019-10-11 06:35:49', 0),
(2, 2, 'Mahesh', 'Lipane', 'user.png', 1, '9689767931', 'mahesh@stackmint.com', '123', '', 0, '2019-07-16 09:52:43', '2019-10-11 06:35:46', 0),
(3, 3, 'Shital', 'Pawar', 'user.png', 1, '9623785571', 'shital@stackmint.com', 'shital@123', '', 8111, '2019-07-16 12:42:08', '2019-10-11 06:35:42', 0),
(5, 4, 'Mahesh', 'Lipane', 'user.png', 1, '8275912825', 'mahesh@stackmint1.com', '123456789', '', 0, '2019-07-22 12:39:17', '2019-10-11 06:35:39', 0),
(9, 5, 'Shital', 'Pawar', 'user.png', 3, '', 'shital123@stackmint.com', 'shital123', '', 0, '2019-07-22 14:14:15', '2019-10-11 06:35:23', 0),
(10, 6, 'Kavita', 'shimpi', 'user.png', 1, '7350518782', 'kavita@stackmint.com', '123456', '', 0, '2019-07-22 14:16:01', '2019-10-11 06:35:16', 0),
(11, 7, 'Shital', 'Pawar', 'user.png', 3, '8600479179', 'abc@gmail.com', 'shital1234', '', 0, '2019-07-24 06:24:11', '2019-10-11 06:35:13', 0),
(12, 7, 'Aniket', 'Patil', 'user.png', 3, '9561093812', 'anil1@stackmint.com', 'anil123', '', 0, '2019-10-11 06:34:30', '2019-10-11 06:54:30', 0),
(13, 1, 'Anil', 'Bhaskar', 'ajay.jpg', 1, '9561093825', 'anil@stackmint.com', 'anil123', '', 0, '2019-10-11 12:38:54', '2019-10-11 12:38:54', 0),
(15, 1, 'Anil', 'Bhaskar', 'ajay.jpg', 1, '9561093825', 'anil3@stackmint.com', 'anil123', '', 0, '2019-10-11 12:54:27', '2019-10-11 12:54:27', 0),
(16, 2, 'Anil', 'Patil', 'ajay.jpg', 1, '9860887427', 'anilpatil@gmail.com', 'anil1234', '', 0, '2019-10-12 05:06:34', '2019-10-12 05:06:34', 0),
(18, 2, 'Anil', 'Patil', 'ajay.jpg', 1, '9860887427', 'anilpatil12@gmail.com', 'anil1234', '', 0, '2019-10-12 05:47:37', '2019-11-18 12:05:02', 1),
(20, 20, 'hrhehreh', 'hrehrhreher', 'ajay.jpg', 6, '6666666666', 'kk@gmail.com', 'ehrerhehh', '', 0, '2019-10-23 09:57:00', '2019-11-18 11:15:36', 0),
(21, 10, 'Shubham', 'Ganure', 'ajay.jpg', 50, '1234567897', 'shubham@stackmint.com', '123456', '', 0, '2019-11-16 08:39:28', '2019-11-18 11:15:42', 0),
(22, 1, 'Sagar', 'Kale', 'user.png', 6, '7899999999', 'sagar@stackmint.com', '12356478899', '', 0, '2019-11-18 13:10:43', '2019-11-18 14:07:39', 0),
(24, 7, 'Sagar', 'Kale', 'user.png', 1, '1234567855', 'sagar1@stackmint.com', '11516566464545456', '', 0, '2019-11-18 13:14:06', '2019-11-18 14:27:03', 1),
(25, 4, 'chandarashekar', 'luhaniwal', 'user.png', 6, '7899456126', 'chandarashekar@stackmint.com', '13216546464654645', '', 0, '2019-11-18 13:18:10', '2019-11-18 14:07:20', 0);

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

--
-- Dumping data for table `usercatassignment`
--

INSERT INTO `usercatassignment` (`userCatAssignmentId`, `userIdFK`, `assignmentTypeIdFK`, `masterIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(234, 1, 1, 1, '2019-11-14 09:35:52', '2019-11-14 09:35:52', 0),
(235, 2, 1, 1, '2019-11-14 09:35:52', '2019-11-14 09:35:52', 0),
(236, 3, 1, 1, '2019-11-14 09:35:58', '2019-11-14 09:35:58', 0),
(240, 2, 3, 36, '2019-11-14 09:36:46', '2019-11-14 09:36:46', 0),
(242, 3, 3, 36, '2019-11-18 11:11:21', '2019-11-18 11:11:21', 0),
(243, 5, 3, 36, '2019-11-18 11:11:21', '2019-11-18 11:11:21', 0),
(244, 9, 3, 36, '2019-11-18 11:11:21', '2019-11-18 11:11:21', 0),
(249, 11, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0),
(250, 13, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0),
(251, 15, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0),
(252, 16, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0),
(253, 18, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0),
(254, 20, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0),
(255, 21, 3, 36, '2019-11-18 11:13:02', '2019-11-18 11:13:02', 0);

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
(2, 'Supervisor', 1, '2019-10-09 05:43:32', '2019-10-11 06:34:57', 1),
(3, 'Shubham', 1, '2019-10-09 05:57:03', '2019-10-09 05:57:03', 0),
(4, 'kkkkkkkk212', 1, '2019-10-09 09:04:26', '2019-10-09 10:36:29', 0),
(5, 'fcavvvwva', 1, '2019-10-09 09:06:39', '2019-10-09 09:06:39', 0),
(6, 'dsvvsvsdvsae', 1, '2019-10-09 09:09:09', '2019-10-09 10:36:23', 1),
(7, 'hfbsuhdfgunmc', 1, '2019-10-09 10:36:48', '2019-10-09 10:36:48', 0),
(8, 'yjuygkgn', 1, '2019-10-09 10:44:49', '2019-10-09 10:44:49', 0),
(9, 'vgergef', 1, '2019-10-09 10:45:00', '2019-10-09 10:45:00', 0),
(10, 'nhgrfewrthg', 1, '2019-10-09 10:45:11', '2019-11-18 13:35:30', 1),
(11, 'srfegtdcvb12123', 1, '2019-10-09 10:45:25', '2019-11-15 09:41:55', 1),
(12, 'bhtdesawq', 1, '2019-10-09 10:45:37', '2019-11-15 09:41:53', 1),
(13, 'fgrtgtrhhhhh', 1, '2019-10-09 10:45:54', '2019-11-15 09:41:50', 1),
(14, 'sdsadsadsdsad', 1, '2019-10-09 12:23:21', '2019-11-15 09:39:03', 1),
(15, 'sdsadsa2432434324324324324v3432432432432432', 1, '2019-10-09 12:23:28', '2019-10-09 13:27:20', 1),
(16, '2sc', 1, '2019-10-09 14:21:52', '2019-11-15 09:38:48', 1),
(17, '111hj', 1, '2019-10-09 14:22:58', '2019-10-10 10:30:42', 1),
(18, 'asdfgh', 1, '2019-10-10 11:13:38', '2019-11-15 09:36:34', 1),
(19, '1234', 1, '2019-10-11 07:17:51', '2019-11-15 09:36:17', 1),
(20, 'abc', 1, '2019-10-11 07:19:41', '2019-11-15 09:21:29', 1),
(21, 'htrrrhthrhk', 1, '2019-10-23 09:51:57', '2019-10-23 09:52:07', 1),
(22, 'grebebebeb', 1, '2019-11-15 09:27:57', '2019-11-15 09:28:40', 1),
(23, 'qqqqqqqqq', 1, '2019-11-15 09:28:05', '2019-11-15 09:28:10', 1),
(24, 'dvsvsvdsvdv', 1, '2019-11-16 06:23:16', '2019-11-18 08:59:30', 1),
(25, 'Shubham', 1, '2019-11-18 05:12:50', '2019-11-18 05:12:57', 1),
(26, 'fgcgytf', 1, '2019-11-18 08:59:37', '2019-11-18 09:00:22', 1),
(27, 'gbrdbh', 1, '2019-11-18 13:05:13', '2019-11-18 13:05:18', 1);

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
  ADD KEY `categoryIdFK1` (`categoryIdFK`),
  ADD KEY `durationTypeIdFK1` (`durationTypeIdFK`);

--
-- Indexes for table `checklistimage`
--
ALTER TABLE `checklistimage`
  ADD PRIMARY KEY (`checklistImageId`);

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
  ADD KEY `typeOfUserIdFK2` (`typeOfUserIdFK`),
  ADD KEY `complaintIdFK4` (`complaintIdFK`);

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
  ADD UNIQUE KEY `title` (`title`,`organizationIdFK`),
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
  ADD UNIQUE KEY `emailId` (`emailId`),
  ADD KEY `organizationIdFK1` (`organizationIdFK`);

--
-- Indexes for table `transfercomplaint`
--
ALTER TABLE `transfercomplaint`
  ADD PRIMARY KEY (`transferComplaintId`),
  ADD KEY `toUserIdFK` (`toUserIdFK`),
  ADD KEY `complaintIdFK2` (`complaintIdFK`),
  ADD KEY `transferStatusIdFK` (`transferStatusIdFK`),
  ADD KEY `fromUserIdFK` (`fromUserIdFK`);

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
  ADD UNIQUE KEY `userIdFK_2` (`userIdFK`,`assignmentTypeIdFK`,`masterIdFK`),
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
  MODIFY `alertTrackingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `answerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `assetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  MODIFY `assetCatRelationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `assignmenttype`
--
ALTER TABLE `assignmenttype`
  MODIFY `assignmentTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `checklist`
--
ALTER TABLE `checklist`
  MODIFY `checklistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `checklistimage`
--
ALTER TABLE `checklistimage`
  MODIFY `checklistImageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `complaintId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `complaintimages`
--
ALTER TABLE `complaintimages`
  MODIFY `complaintImagesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `complaintstatus`
--
ALTER TABLE `complaintstatus`
  MODIFY `complaintStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `complainttrack`
--
ALTER TABLE `complainttrack`
  MODIFY `complaintTrackId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `documentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `documenttype`
--
ALTER TABLE `documenttype`
  MODIFY `documentTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `donechecklist`
--
ALTER TABLE `donechecklist`
  MODIFY `doneChecklistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `durationtype`
--
ALTER TABLE `durationtype`
  MODIFY `durationTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `manufacturerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `organizationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `questionoption`
--
ALTER TABLE `questionoption`
  MODIFY `questionOptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `questiontype`
--
ALTER TABLE `questiontype`
  MODIFY `questionTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `responsibleperson`
--
ALTER TABLE `responsibleperson`
  MODIFY `responsiblePersonId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `superAdminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplierId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `transfercomplaint`
--
ALTER TABLE `transfercomplaint`
  MODIFY `transferComplaintId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transferstatus`
--
ALTER TABLE `transferstatus`
  MODIFY `transferStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `usercatassignment`
--
ALTER TABLE `usercatassignment`
  MODIFY `userCatAssignmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `userrole`
--
ALTER TABLE `userrole`
  MODIFY `userRoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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
  ADD CONSTRAINT `durationTypeIdFK1` FOREIGN KEY (`durationTypeIdFK`) REFERENCES `durationtype` (`durationTypeId`),
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
  ADD CONSTRAINT `complaintIdFK4` FOREIGN KEY (`complaintIdFK`) REFERENCES `complaint` (`complaintId`),
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
