-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 03, 2020 at 06:50 AM
-- Server version: 10.2.10-MariaDB
-- PHP Version: 7.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
  `otp` int(11) NOT NULL DEFAULT 0,
  `isDefault` int(11) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `firstName`, `lastName`, `organizationIdFK`, `mobileNumber`, `emailId`, `password`, `otp`, `isDefault`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Ajay', 'Khatavkar', 1, '9579368483', 'ajay@stackmint.com', 'admin12345', 3874, 0, '2019-07-16 06:06:00', '2019-12-19 05:47:00', 0),
(2, 'Brigs', 'Nucleus', 1, '8888888888', 'info@brigsnucleus.com', '123456', 0, 0, '2019-11-20 15:02:00', '2019-12-05 11:59:00', 0),
(3, 'SIDDHARTH', 'PARALIKAR', 3, '7020151937', 'rahul@stackmint.com', '123456', 0, 0, '2019-12-23 05:58:03', '2020-01-02 05:27:57', 1);

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
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alert`
--

INSERT INTO `alert` (`alertId`, `masterIdType`, `masterIdFK`, `title`, `image`, `message`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'task', 1, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-22 05:24:57', '2019-12-22 05:24:57', 0),
(2, 'task', 2, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-22 05:25:07', '2019-12-22 05:25:07', 0),
(3, 'task', 3, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-22 05:25:30', '2019-12-22 05:25:30', 0),
(4, 'task', 4, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-22 05:25:43', '2019-12-22 05:25:43', 0),
(5, 'task', 5, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-22 05:25:54', '2019-12-22 05:25:54', 0),
(6, 'task', 8, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-23 05:05:50', '2019-12-23 05:05:50', 0),
(7, 'task', 9, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-23 05:06:11', '2019-12-23 05:06:11', 0),
(8, 'task', 10, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-23 05:06:42', '2019-12-23 05:06:42', 0),
(9, 'task', 11, 'task Assigned', 'index.png', 'Rahul Jaiswal has assigned a task to you, kindly check your task.', 1, '2019-12-23 05:06:54', '2019-12-23 05:06:54', 0),
(10, 'complaint', 12, 'complaint Assigned', 'index.png', 'Info Brigs has assigned a complaint to you, kindly check your complaint.', 1, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(12, 'complaint', 14, 'complaint Assigned', 'index.png', 'Mahesh Lipane has assigned a complaint to you, kindly check your complaint.', 3, '2019-12-23 06:54:51', '2019-12-23 06:54:51', 0),
(13, 'complaint', 15, 'complaint Assigned', 'index.png', 'Shital Karhekar has assigned a complaint to you, kindly check your complaint.', 1, '2019-12-27 10:18:17', '2019-12-27 10:18:17', 0),
(14, 'complaint', 16, 'complaint Assigned', 'index.png', 'Shital Karhekar has assigned a complaint to you, kindly check your complaint.', 1, '2019-12-27 12:40:05', '2019-12-27 12:40:05', 0),
(15, 'complaint', 17, 'complaint Assigned', 'index.png', 'Shital Karhekar has assigned a complaint to you, kindly check your complaint.', 1, '2019-12-27 12:49:33', '2019-12-27 12:49:33', 0),
(16, 'task', 18, 'task Assigned', 'index.png', 'Info Brigs has assigned a task to you, kindly check your task.', 1, '2019-12-29 08:46:26', '2019-12-29 08:46:26', 0),
(17, 'complaint', 19, 'complaint Assigned', 'index.png', 'Shital Karhekar has assigned a complaint to you, kindly check your complaint.', 1, '2019-12-31 09:11:52', '2019-12-31 09:11:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `alerttracking`
--

CREATE TABLE `alerttracking` (
  `alertTrackingId` int(11) NOT NULL,
  `alertIdFK` int(11) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `isRead` int(11) NOT NULL DEFAULT 0,
  `isDeliver` int(11) NOT NULL DEFAULT 1,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alerttracking`
--

INSERT INTO `alerttracking` (`alertTrackingId`, `alertIdFK`, `typeOfUserIdFK`, `masterId`, `isRead`, `isDeliver`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 3, 3, 26, 0, 1, '2019-12-22 05:25:30', '2019-12-22 05:25:30', 0),
(2, 3, 3, 3, 1, 1, '2019-12-22 05:25:30', '2019-12-27 12:37:27', 0),
(3, 3, 3, 2, 1, 1, '2019-12-22 05:25:30', '2019-12-23 05:43:43', 0),
(4, 6, 3, 26, 0, 1, '2019-12-23 05:05:50', '2019-12-23 05:05:50', 0),
(5, 6, 3, 3, 1, 1, '2019-12-23 05:05:50', '2019-12-27 12:37:30', 0),
(6, 6, 3, 2, 1, 1, '2019-12-23 05:05:50', '2019-12-26 11:52:22', 0),
(7, 10, 3, 4, 0, 1, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(8, 10, 3, 2, 1, 1, '2019-12-23 05:31:10', '2019-12-23 05:42:57', 0),
(12, 12, 3, 13, 1, 1, '2019-12-23 06:54:51', '2019-12-23 06:59:24', 0),
(13, 13, 3, 2, 0, 1, '2019-12-27 10:18:17', '2019-12-27 10:18:17', 0),
(14, 14, 3, 3, 1, 1, '2019-12-27 12:40:05', '2019-12-27 12:40:38', 0),
(16, 16, 3, 8, 1, 1, '2019-12-29 08:46:26', '2019-12-29 08:47:33', 0),
(17, 17, 3, 17, 1, 1, '2019-12-31 09:11:52', '2019-12-31 10:19:44', 0),
(18, 17, 3, 3, 1, 1, '2019-12-31 09:11:52', '2019-12-31 09:14:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answerId` int(11) NOT NULL,
  `doneChecklistIdFK` int(11) NOT NULL,
  `questionIdFK` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `isDanger` int(2) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `assetId` int(11) NOT NULL,
  `assetCode` varchar(255) NOT NULL,
  `assetTitle` varchar(255) NOT NULL,
  `modelNumber` varchar(255) NOT NULL,
  `companyAssetNo` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `installationDate` date NOT NULL,
  `installationLocationTypeIdFK` int(11) NOT NULL,
  `installedLocation` varchar(255) NOT NULL,
  `userGuideBook` varchar(255) DEFAULT NULL,
  `durationTypeIdFK` int(11) NOT NULL,
  `checkingDuration` varchar(50) NOT NULL,
  `warrantyDurationTypeIdFK` int(11) NOT NULL,
  `warrenty` varchar(50) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `supplierIdFK` int(11) NOT NULL,
  `departmentIdFK` int(11) NOT NULL,
  `manufacturerIdFK` int(11) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `addedBy` int(11) NOT NULL,
  `isActive` int(2) NOT NULL DEFAULT 1,
  `isRetired` int(2) NOT NULL DEFAULT 0,
  `isVerified` int(11) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`assetId`, `assetCode`, `assetTitle`, `modelNumber`, `companyAssetNo`, `description`, `image`, `installationDate`, `installationLocationTypeIdFK`, `installedLocation`, `userGuideBook`, `durationTypeIdFK`, `checkingDuration`, `warrantyDurationTypeIdFK`, `warrenty`, `organizationIdFK`, `supplierIdFK`, `departmentIdFK`, `manufacturerIdFK`, `typeOfUserIdFK`, `addedBy`, `isActive`, `isRetired`, `isVerified`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'MOD548781235', 'Fire Extingushier', 'INV54439834', 'FIRE11124', 'ECO FIRE ABC Powder Type (Stored Pressure) Fire Extinguisher 4 Kg. Capacity ISI Mark IS: 15683 operating temperature (-0) ºC to (+55) ºC and Fire Rating 2A & 21B type of fire filled with MAP Powders', '41rw7lJQ3aL.jpg', '2019-07-25', 3, 'Pune', 'document-1574864593377.pdf', 2, '2', 1, '1', 1, 2, 1, 6, 2, 1, 1, 0, 1, '2019-07-17 08:49:00', '2019-12-27 09:33:31', 0),
(2, '1574607955412', 'CNG BOILER', 'URJ500', 'BRIG4533', 'Capacity 500Kg/Hr\nPressure - 15 Kg/cm2', 'image-1574607952077.png', '2019-11-01', 2, 'Utility', 'document-1574607954321.pdf', 1, '1', 3, '5', 1, 1, 2, 5, 2, 1, 1, 0, 1, '2019-11-24 15:05:00', '2019-12-27 08:40:49', 0),
(3, '1574608190857', '40 Bar Compressor & Dryer', 'Atlas 40', 'BRIG11339', 'Compressor & Dryer', 'image-1574608182549.png', '2019-06-12', 2, 'Utility', 'document-1574608190042.pdf', 2, '1', 3, '5', 1, 2, 3, 1, 2, 1, 1, 0, 1, '2019-11-24 15:09:00', '2019-12-27 08:40:52', 0),
(4, '1574608623641', 'LOADING PUMP', 'L&T580', 'BRIG12445', 'Pump used for Loading and unloading', 'image-1574608620498.png', '2018-06-05', 1, 'Banglore', 'document-1574608190042.pdf', 2, '1', 3, '5', 1, 1, 3, 1, 2, 1, 1, 0, 1, '2019-11-24 15:17:00', '2019-12-27 12:17:26', 0),
(5, 'AM191577082703096', 'TATA CNC MACHINE', 'CNC2019', 'RJ82', '', 'image-1577082702528.png', '2015-12-10', 7, 'SHOP FLOOR', 'document-1577082703057.docx', 1, '2', 3, '5', 3, 5, 9, 7, 2, 1, 1, 0, 1, '2019-12-23 06:31:43', '2019-12-27 08:41:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `assetcatrelation`
--

CREATE TABLE `assetcatrelation` (
  `assetCatRelationId` int(11) NOT NULL,
  `assetIdFK` int(11) NOT NULL,
  `categoryIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assetcatrelation`
--

INSERT INTO `assetcatrelation` (`assetCatRelationId`, `assetIdFK`, `categoryIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 1, '2019-12-21 09:10:12', '2019-12-21 09:10:12', 0),
(2, 2, 2, '2019-12-21 09:10:12', '2019-12-21 09:10:12', 0),
(3, 3, 2, '2019-12-21 09:10:38', '2019-12-21 09:10:38', 0),
(4, 4, 2, '2019-12-21 09:10:38', '2019-12-21 09:10:38', 0),
(5, 5, 5, '2019-12-23 06:31:43', '2019-12-23 06:31:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `assetLocations`
--

CREATE TABLE `assetLocations` (
  `assetLocationId` int(11) NOT NULL,
  `assetIdFK` int(11) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assetLocations`
--

INSERT INTO `assetLocations` (`assetLocationId`, `assetIdFK`, `latitude`, `longitude`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, '18.4875095', '73.7963192', '2019-12-23 05:29:09', '2019-12-23 05:29:09', 0),
(2, 1, '18.4875155', '73.7963359', '2019-12-23 05:29:09', '2019-12-23 05:29:09', 0),
(3, 5, '18.4875043', '73.7963175', '2019-12-23 06:50:03', '2019-12-23 06:50:03', 0),
(4, 5, '18.4875028', '73.7963321', '2019-12-23 06:50:04', '2019-12-23 06:50:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `assettransferlog`
--

CREATE TABLE `assettransferlog` (
  `assetTransferLogId` int(11) NOT NULL,
  `assetIdFK` int(11) NOT NULL,
  `oldLocationTypeIdFK` int(11) NOT NULL,
  `oldLocation` varchar(255) NOT NULL,
  `newLocationtypeIdFK` int(11) NOT NULL,
  `newLocation` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assettransferlog`
--

INSERT INTO `assettransferlog` (`assetTransferLogId`, `assetIdFK`, `oldLocationTypeIdFK`, `oldLocation`, `newLocationtypeIdFK`, `newLocation`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 3, 'Pune', 1, 'Banglore', '2019-12-21 09:17:29', '2019-12-21 09:17:29', 0),
(2, 1, 1, 'Banglore', 3, 'Pune', '2019-12-21 09:26:49', '2019-12-21 09:26:49', 0),
(3, 4, 2, 'Yard', 1, 'Banglore', '2019-12-21 10:34:40', '2019-12-21 10:34:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `assignmenttype`
--

CREATE TABLE `assignmenttype` (
  `assignmentTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
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
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `parentId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 'Fire Brigade', 1, '2019-07-18 06:18:00', '2019-12-19 13:28:00', 0),
(2, 2, 'Machine', 1, '2019-11-23 13:30:00', '2019-12-19 13:29:00', 0),
(3, 3, 'Electronic', 2, '2019-12-13 12:19:00', '2019-12-13 12:19:00', 0),
(4, 4, 'Home Furniture', 2, '2019-12-13 12:19:00', '2019-12-13 12:19:00', 0),
(5, 5, 'MACHINES', 3, '2019-12-23 06:12:53', '2019-12-23 06:12:53', 0),
(6, 6, 'ELECTRONICS', 3, '2019-12-23 06:13:03', '2019-12-23 06:13:03', 0),
(7, 5, 'CNC MACHINE', 3, '2019-12-23 06:13:18', '2019-12-23 06:13:18', 0),
(8, 7, '3000*6000', 3, '2019-12-23 06:13:56', '2019-12-23 06:13:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `checklist`
--

CREATE TABLE `checklist` (
  `checklistId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `categoryIdFK` int(11) NOT NULL,
  `checkingDuration` varchar(255) NOT NULL,
  `durationTypeIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checklist`
--

INSERT INTO `checklist` (`checklistId`, `title`, `organizationIdFK`, `categoryIdFK`, `checkingDuration`, `durationTypeIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Automatic actuation', 2, 3, '1', 1, '2019-09-16 11:38:00', '2019-11-20 15:09:00', 0),
(2, 'Actuation from fire station', 1, 2, '1', 2, '2019-09-20 13:04:00', '2019-12-21 10:28:53', 1),
(3, 'Fire Brigade Automatic', 1, 1, '2', 2, '2019-10-07 07:19:00', '2019-11-12 11:07:00', 0),
(4, 'Bolier checklist', 1, 2, '2', 1, '2019-11-11 12:50:00', '2019-11-20 10:06:00', 0),
(5, 'Boiler', 1, 1, '1', 2, '2019-11-23 18:19:00', '2019-12-21 10:22:22', 1),
(6, 'Preventive Maintenance', 1, 2, '1', 1, '2019-11-24 15:31:00', '2019-11-24 15:31:00', 0),
(7, 'Annual Preventive Maintenance', 1, 1, '1', 3, '2019-12-09 12:28:00', '2019-12-21 10:21:16', 1),
(8, 'Portable Fire Extinguisher Inspection Audit', 1, 2, '1', 2, '2019-12-11 09:00:00', '2019-12-16 11:10:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `checklistimage`
--

CREATE TABLE `checklistimage` (
  `checklistImageId` int(11) NOT NULL,
  `imageId` varchar(255) NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `complaintId` int(11) NOT NULL,
  `typeOfComplaintFK` int(11) NOT NULL,
  `assetIdFK` int(11) NOT NULL DEFAULT 0,
  `complaintStatusIdFK` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `typeOfUserIdFK` int(11) NOT NULL,
  `raiseBy` int(11) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`complaintId`, `typeOfComplaintFK`, `assetIdFK`, `complaintStatusIdFK`, `title`, `message`, `typeOfUserIdFK`, `raiseBy`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 0, 4, 'test', 'test', 3, 38, 1, '2019-12-22 05:24:57', '2019-12-23 05:42:37', 1),
(2, 1, 0, 2, 'test', 'test', 3, 38, 1, '2019-12-22 05:25:07', '2019-12-23 05:40:57', 1),
(3, 1, 0, 2, 'test', 'test', 3, 38, 1, '2019-12-22 05:25:30', '2019-12-23 05:41:00', 1),
(4, 1, 0, 2, 'test', 'test', 3, 38, 1, '2019-12-22 05:25:43', '2019-12-23 05:41:05', 1),
(8, 1, 0, 2, 'test', 'test', 3, 38, 1, '2019-12-23 05:05:50', '2019-12-23 05:41:08', 1),
(10, 1, 0, 2, 'test', 'test', 3, 38, 1, '2019-12-23 05:06:42', '2019-12-23 05:41:10', 1),
(12, 2, 1, 2, 'kindly check on priority', 'kindly check this asset on priority', 3, 1, 1, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(13, 1, 0, 2, 'test', 'test', 3, 8, 1, '2019-12-23 05:41:36', '2019-12-23 05:41:36', 0),
(14, 2, 5, 2, 'Not working', 'hello, this asset not working. check ASAP', 3, 11, 3, '2019-12-23 06:54:51', '2019-12-23 06:54:51', 0),
(15, 2, 1, 2, 'Gas leak Complaint', 'Gas leakage from cylinder.', 3, 15, 1, '2019-12-27 10:18:17', '2019-12-27 10:18:17', 0),
(16, 2, 4, 5, 'Pump Installation', 'pump is not installed properly', 3, 15, 1, '2019-12-27 12:40:05', '2019-12-27 12:40:53', 0),
(17, 2, 4, 2, 'Checking pump capacity', 'complaint is about pump', 3, 15, 1, '2019-12-27 12:49:33', '2019-12-27 12:49:33', 0),
(18, 1, 0, 5, 'Rubin', 'front', 3, 1, 1, '2019-12-29 08:46:26', '2019-12-29 08:47:58', 0),
(19, 2, 2, 5, 'complaint to test for user role of transfer user', 'This complaint is for testing', 3, 15, 1, '2019-12-31 09:11:52', '2019-12-31 09:14:38', 0);

-- --------------------------------------------------------

--
-- Table structure for table `complaintimages`
--

CREATE TABLE `complaintimages` (
  `complaintImagesId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `imageName` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaintimages`
--

INSERT INTO `complaintimages` (`complaintImagesId`, `complaintIdFK`, `imageName`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 12, 'image-1577079070831.jpeg', '2019-12-23 05:31:11', '2019-12-23 05:31:11', 0),
(4, 15, 'image-1577441897615.jpeg', '2019-12-27 10:18:20', '2019-12-27 10:18:20', 0),
(5, 16, 'image-1577450405403.jpeg', '2019-12-27 12:40:06', '2019-12-27 12:40:06', 0),
(6, 17, 'image-1577450974052.jpeg', '2019-12-27 12:49:36', '2019-12-27 12:49:36', 0),
(7, 18, 'image-1577609187142.jpeg', '2019-12-29 08:46:34', '2019-12-29 08:46:34', 0),
(8, 18, 'image-1577609187402.jpeg', '2019-12-29 08:46:52', '2019-12-29 08:46:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `complaintstatus`
--

CREATE TABLE `complaintstatus` (
  `complaintStatusId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaintstatus`
--

INSERT INTO `complaintstatus` (`complaintStatusId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Raised', '2019-10-09 09:52:39', '2019-11-04 10:07:33', 0),
(2, 'Assigned', '2019-10-09 09:52:39', '2019-11-20 13:12:39', 0),
(3, 'Cancel', '2019-10-09 09:52:55', '2019-11-04 10:07:50', 0),
(4, 'Transfer', '2019-10-09 09:52:55', '2019-11-04 10:07:54', 0),
(5, 'Done', '2019-10-09 09:53:01', '2019-11-04 10:07:45', 0),
(6, 'Pending', '2019-12-11 10:22:12', '2019-12-11 10:22:12', 0);

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
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complainttrack`
--

INSERT INTO `complainttrack` (`complaintTrackId`, `complaintIdFK`, `complaintStatusIdFK`, `typeOfUserIdFK`, `masterId`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 2, 3, 26, '2019-12-22 05:24:57', '2019-12-23 05:40:52', 1),
(2, 1, 2, 3, 3, '2019-12-22 05:24:57', '2019-12-23 05:40:52', 1),
(3, 1, 2, 3, 2, '2019-12-22 05:24:57', '2019-12-23 05:40:52', 1),
(28, 10, 2, 3, 26, '2019-12-23 05:06:42', '2019-12-23 05:41:10', 1),
(29, 10, 2, 3, 3, '2019-12-23 05:06:42', '2019-12-23 05:41:10', 1),
(30, 10, 2, 3, 2, '2019-12-23 05:06:42', '2019-12-23 05:41:10', 1),
(34, 12, 2, 3, 4, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(35, 12, 2, 3, 2, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(39, 1, 4, 3, 8, '2019-12-23 05:42:37', '2019-12-23 05:42:37', 0),
(40, 14, 2, 3, 13, '2019-12-23 06:54:51', '2019-12-23 06:54:51', 0),
(41, 15, 2, 3, 2, '2019-12-27 10:18:17', '2019-12-27 10:18:17', 0),
(42, 16, 2, 3, 3, '2019-12-27 12:40:05', '2019-12-27 12:40:05', 0),
(43, 16, 5, 3, 3, '2019-12-27 12:40:53', '2019-12-27 12:40:53', 0),
(44, 17, 2, 3, 3, '2019-12-27 12:49:33', '2019-12-27 12:49:33', 0),
(45, 18, 2, 3, 8, '2019-12-29 08:46:26', '2019-12-29 08:46:26', 0),
(47, 18, 5, 3, 8, '2019-12-29 08:47:58', '2019-12-29 08:47:58', 0),
(48, 19, 2, 3, 17, '2019-12-31 09:11:52', '2019-12-31 09:11:52', 0),
(49, 19, 2, 3, 3, '2019-12-31 09:11:52', '2019-12-31 09:11:52', 0),
(50, 19, 5, 3, 3, '2019-12-31 09:14:38', '2019-12-31 09:14:38', 0);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `parentId` int(11) NOT NULL,
  `departmentTitle` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmentId`, `organizationIdFK`, `parentId`, `departmentTitle`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 1, 'Purchasing', '2019-07-16 06:04:00', '2019-12-19 13:28:00', 0),
(2, 1, 1, 'Telecommunication', '2019-07-22 12:45:00', '2019-11-21 06:44:00', 0),
(3, 1, 3, 'HR Department', '2019-07-24 06:08:00', '2019-11-21 06:44:00', 0),
(4, 1, 3, 'EmployeeList', '2019-11-19 13:12:00', '2019-11-21 06:44:00', 0),
(5, 1, 4, 'Manager', '2019-11-19 13:13:00', '2019-11-21 06:45:00', 0),
(6, 2, 6, 'Manufacturing', '2019-11-25 05:50:00', '2019-12-13 12:37:00', 0),
(7, 2, 7, 'Production', '2019-12-13 12:37:00', '2019-12-13 12:37:00', 0),
(8, 3, 8, 'Quality', '2019-12-23 06:05:34', '2019-12-23 06:05:34', 0),
(9, 3, 9, 'Shop Floor', '2019-12-23 06:05:44', '2019-12-23 06:05:44', 0),
(10, 3, 10, 'Purchase', '2019-12-23 06:05:54', '2019-12-23 06:05:54', 0),
(11, 3, 11, 'Human Resource', '2019-12-23 06:06:25', '2019-12-23 06:06:25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `documentId` int(11) NOT NULL,
  `documentCode` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `documentTypeIdFK` int(11) NOT NULL,
  `masterId` int(11) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`documentId`, `documentCode`, `title`, `description`, `filepath`, `documentTypeIdFK`, `masterId`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'BRIG1576919652370', 'hhj,jhjh,jh,', 'hj,hj,jh,h,j', 'document-1576919652328.docx', 3, 0, 1, '2019-12-21 09:14:12', '2019-12-21 09:14:15', 1),
(2, 'BRIG1576921729649', 'Information about asset', 'Fire extinguishers with a Class C rating are suitable for fires in “live” electrical equipment. Both monoammonium phosphate and sodium bicarbonate are commonly used to fight this type of fire because of their nonconductive properties. Fire extinguishers are classified by fire type', 'document-1576921728107.pdf', 2, 1, 1, '2019-12-21 09:48:49', '2019-12-21 09:48:49', 0),
(3, 'BRIG1576922019190', 'Fire Saftey', 'Fire is a rapid chemical reaction of oxidant with fuel accompanied by the release of energy, indicated by incandescence or flame.', 'document-1576922017966.pdf', 3, 0, 1, '2019-12-21 09:53:39', '2019-12-21 09:53:39', 0),
(4, 'BRIG1576922095203', 'Printer Document', 'Impact printers leave an image on the paper by physically striking an inked ribbon against the surface of the paper.', 'document-1576922094056.pdf', 3, 0, 1, '2019-12-21 09:54:55', '2019-12-21 09:54:55', 0),
(5, 'AM191577083092385', 'PRODUCT SPECIFICATION', 'ALL TECH SPECIFICATION ', 'image-1577083092325.jpeg', 2, 5, 3, '2019-12-23 06:38:12', '2019-12-23 06:38:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `documenttype`
--

CREATE TABLE `documenttype` (
  `documentTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
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
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `durationtype`
--

CREATE TABLE `durationtype` (
  `durationTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `durationtype`
--

INSERT INTO `durationtype` (`durationTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Day', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0),
(2, 'Month', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0),
(3, 'Year', '2019-07-17 07:19:00', '2019-07-17 07:19:00', 0),
(4, 'Minute', '2019-11-20 09:31:36', '2019-11-20 09:31:36', 0),
(5, 'Hour', '2019-11-20 09:31:36', '2019-11-20 09:31:36', 0);

-- --------------------------------------------------------

--
-- Table structure for table `feature`
--

CREATE TABLE `feature` (
  `featureId` int(11) NOT NULL,
  `featureCode` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feature`
--

INSERT INTO `feature` (`featureId`, `featureCode`, `purpose`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'BN1', 'Asset Creation', '2019-12-16 06:49:32', '2019-12-16 06:49:32', 0),
(2, 'BN2', 'Complaint Raise', '2019-12-16 06:49:32', '2019-12-16 06:49:32', 0),
(3, 'BN3', 'Task Creation', '2019-12-16 06:49:50', '2019-12-16 06:49:50', 0),
(4, 'BN4', 'Asstemate', '2019-12-26 07:11:08', '2019-12-26 07:12:16', 0),
(5, 'BN5', 'Documate', '2019-12-26 07:11:08', '2019-12-26 07:11:08', 0),
(6, 'BN6', 'View Task', '2019-12-26 07:11:42', '2019-12-26 07:11:42', 0),
(7, 'BN7', 'View Complaint', '2019-12-26 07:11:42', '2019-12-26 07:11:42', 0);

-- --------------------------------------------------------

--
-- Table structure for table `featureassignment`
--

CREATE TABLE `featureassignment` (
  `featureAssignmentId` int(11) NOT NULL,
  `featureIdFK` int(11) NOT NULL,
  `userRoleIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `featureassignment`
--

INSERT INTO `featureassignment` (`featureAssignmentId`, `featureIdFK`, `userRoleIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(4, 1, 9, '2019-12-23 06:01:09', '2019-12-23 06:01:09', 0),
(5, 2, 9, '2019-12-23 06:01:09', '2019-12-23 06:01:09', 0),
(6, 3, 9, '2019-12-23 06:01:09', '2019-12-23 06:01:09', 0),
(7, 2, 10, '2019-12-23 06:01:36', '2019-12-23 06:01:36', 0),
(8, 3, 10, '2019-12-23 06:01:36', '2019-12-23 06:01:36', 0),
(111, 5, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(112, 1, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(113, 2, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(114, 3, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(115, 4, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(116, 7, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(117, 6, 2, '2019-12-27 05:46:13', '2019-12-27 05:46:13', 0),
(123, 2, 3, '2019-12-27 12:39:12', '2019-12-27 12:39:12', 0),
(124, 6, 3, '2019-12-27 12:39:12', '2019-12-27 12:39:12', 0),
(125, 7, 3, '2019-12-27 12:39:12', '2019-12-27 12:39:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `installationlocationtype`
--

CREATE TABLE `installationlocationtype` (
  `installationLocationTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `installationlocationtype`
--

INSERT INTO `installationlocationtype` (`installationLocationTypeId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Home', 1, '2019-07-17 07:18:00', '2019-12-09 11:19:00', 0),
(2, 'Store', 1, '2019-07-17 07:18:00', '2019-12-09 05:45:00', 0),
(3, 'Office', 1, '2019-07-17 07:18:00', '2019-12-09 05:45:00', 0),
(4, 'Office', 2, '2019-12-13 12:35:00', '2019-12-13 12:35:00', 0),
(5, 'Store', 2, '2019-12-13 12:36:00', '2019-12-13 12:36:00', 0),
(6, '3RD-FLOOR', 3, '2019-12-23 06:23:21', '2019-12-23 06:23:21', 0),
(7, '1ST-FLOOR', 3, '2019-12-23 06:23:30', '2019-12-23 06:23:30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturerId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturerId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Volkswagen Group', 1, '2019-07-17 07:05:00', '2019-09-09 07:02:00', 0),
(2, 'Telecommunication', 2, '2019-07-22 12:54:00', '2019-09-09 07:02:00', 0),
(3, 'HP', 1, '2019-07-25 06:16:00', '2019-09-09 07:02:00', 0),
(4, 'Samsung', 2, '2019-07-25 06:19:00', '2019-09-09 07:02:00', 0),
(5, 'AtlasCopo', 1, '2019-11-24 16:55:00', '2019-11-24 16:55:00', 0),
(6, 'TCS', 1, '2019-11-25 09:59:00', '2019-11-25 09:59:00', 0),
(7, 'Tata Ltd.', 3, '2019-12-23 06:03:57', '2019-12-23 06:04:26', 0),
(8, 'Mahindra', 3, '2019-12-23 06:04:04', '2019-12-23 06:04:04', 0),
(9, 'Schindler LTD.', 3, '2019-12-23 06:04:15', '2019-12-23 06:04:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `organizationId` int(11) NOT NULL,
  `organizationName` varchar(255) NOT NULL,
  `organizationCode` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`organizationId`, `organizationName`, `organizationCode`, `description`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Brigs Nucleus', 'BRIG', 'Headquartered in Pune, Maharashtra, the Volkswagen Group in India is represented by five brands: SKODA, Volkswagen, Audi, Porsche and Lamborghini. The Indian journey began with the launch of SKODA in 2001. Audi and Volkswagen entered in 2007, while Lamborghini and Porsche were introduced in 2012. Today, the Group upholds its mantle of superior engineering, with plants in Pune and Aurangabad working seamlessly to manufacture the world\'s most loved cars.', '2019-07-16 06:04:00', '2019-12-05 06:51:00', 0),
(2, 'Stackmint Pvt Ltd', 'STAC', 'Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.', '2019-07-22 12:31:00', '2019-12-05 06:51:00', 0),
(3, 'Amphiminds Pvt. Ltd.', 'AM19', 'Manages all solar-related activities.', '2019-12-23 05:54:38', '2020-01-02 05:27:12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `questionId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `questionTypeIdFK` int(11) NOT NULL,
  `checkListIdFK` int(11) NOT NULL,
  `isRefer` int(11) NOT NULL DEFAULT 0,
  `isCompulsory` int(2) NOT NULL DEFAULT 1,
  `sequenceNo` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionId`, `title`, `questionTypeIdFK`, `checkListIdFK`, `isRefer`, `isCompulsory`, `sequenceNo`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Does the gauge show in the green – fully charged?', 3, 8, 0, 1, 1, '2019-12-21 10:01:59', '2019-12-21 10:01:59', 0),
(2, 'Is the fire extinguisher unobstructed and accessible?', 3, 8, 0, 1, 2, '2019-12-21 10:05:36', '2019-12-21 10:05:36', 0),
(3, 'Are the operating instructions on nameplate legible?', 3, 8, 0, 1, 3, '2019-12-21 10:06:54', '2019-12-21 10:06:54', 0),
(4, 'Is it hung on a bracket', 3, 8, 0, 1, 4, '2019-12-21 10:07:59', '2019-12-21 10:07:59', 0),
(5, 'Is the Asset Working', 4, 6, 0, 1, 5, '2019-12-21 10:11:30', '2019-12-21 10:11:30', 0),
(6, 'Is the Equipment Neat and Clean', 4, 6, 0, 1, 6, '2019-12-21 10:12:22', '2019-12-21 10:12:22', 0),
(7, 'Does the Equipment requires greecing?', 4, 6, 0, 1, 7, '2019-12-21 10:13:29', '2019-12-21 10:13:29', 0),
(8, 'Take the Photo of the Equipment', 5, 6, 0, 1, 8, '2019-12-21 10:14:11', '2019-12-21 10:14:11', 0),
(9, 'What is the Compressor Size?', 3, 3, 0, 1, 9, '2019-12-21 10:16:51', '2019-12-21 10:16:51', 0),
(10, 'Is Component are working Fine', 1, 3, 0, 1, 10, '2019-12-21 10:17:25', '2019-12-21 10:17:25', 0),
(11, 'What is the Condition of Compressor?', 4, 3, 0, 1, 11, '2019-12-21 10:18:17', '2019-12-21 10:18:17', 0),
(12, 'Is there any leakage of Water around and under boiler', 4, 4, 0, 1, 12, '2019-12-21 10:23:23', '2019-12-21 10:23:23', 0),
(13, 'Any kind of Obstruction or blockage around the boiler with any materials', 4, 4, 0, 1, 13, '2019-12-21 10:24:06', '2019-12-21 10:24:06', 0),
(14, 'Temperature Readings', 1, 4, 0, 1, 14, '2019-12-21 10:24:27', '2019-12-21 10:24:27', 0),
(15, 'Pressure Readings', 1, 4, 0, 1, 15, '2019-12-21 10:24:50', '2019-12-21 10:24:50', 0),
(16, 'Error codes or service codes ( if any) on the display panel.', 4, 4, 0, 1, 16, '2019-12-21 10:25:31', '2019-12-21 10:25:31', 0),
(17, 'Any obstruction or debris, ice/snow blocking the vent termination.', 4, 4, 0, 1, 17, '2019-12-21 10:26:18', '2019-12-21 10:26:18', 0),
(18, 'Any Blockage at the combustion air opening.', 4, 4, 0, 1, 18, '2019-12-21 10:27:07', '2019-12-21 10:27:07', 0),
(19, 'Any unusual vibrations or noises from the equipment.', 4, 4, 0, 1, 19, '2019-12-21 10:27:51', '2019-12-21 10:27:51', 0),
(20, 'Photo of any abnormality', 5, 4, 0, 1, 20, '2019-12-21 10:28:14', '2019-12-21 10:28:14', 0),
(21, 'Take compressor photo', 5, 3, 1, 1, 21, '2019-12-23 05:11:29', '2019-12-23 05:13:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questionoption`
--

CREATE TABLE `questionoption` (
  `questionOptionId` int(11) NOT NULL,
  `questionIdFK` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isDanger` int(2) NOT NULL DEFAULT 0,
  `referQuestionId` int(11) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionoption`
--

INSERT INTO `questionoption` (`questionOptionId`, `questionIdFK`, `title`, `isDanger`, `referQuestionId`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 'Yes', 0, 0, '2019-12-21 10:01:59', '2019-12-21 10:01:59', 0),
(2, 1, 'No', 0, 0, '2019-12-21 10:01:59', '2019-12-21 10:01:59', 0),
(3, 2, 'Yes', 0, 0, '2019-12-21 10:05:36', '2019-12-21 10:05:36', 0),
(4, 2, 'No', 0, 0, '2019-12-21 10:05:36', '2019-12-21 10:05:36', 0),
(5, 3, 'Yes', 0, 0, '2019-12-21 10:06:54', '2019-12-21 10:06:54', 0),
(6, 3, 'No', 0, 0, '2019-12-21 10:06:54', '2019-12-21 10:06:54', 0),
(7, 4, 'Yes', 0, 0, '2019-12-21 10:07:59', '2019-12-21 10:07:59', 0),
(8, 4, 'No', 0, 0, '2019-12-21 10:07:59', '2019-12-21 10:07:59', 0),
(9, 5, 'Yes', 0, 0, '2019-12-21 10:11:30', '2019-12-21 10:11:30', 0),
(10, 5, 'No', 0, 0, '2019-12-21 10:11:30', '2019-12-21 10:11:30', 0),
(11, 6, 'Yes', 0, 0, '2019-12-21 10:12:22', '2019-12-21 10:12:22', 0),
(12, 6, 'No', 0, 0, '2019-12-21 10:12:22', '2019-12-21 10:12:22', 0),
(13, 7, 'Yes', 0, 0, '2019-12-21 10:13:29', '2019-12-21 10:13:29', 0),
(14, 7, 'No', 0, 0, '2019-12-21 10:13:29', '2019-12-21 10:13:29', 0),
(15, 9, 'Large', 0, 21, '2019-12-21 10:16:51', '2019-12-23 05:11:29', 0),
(16, 9, 'Medium', 0, 0, '2019-12-21 10:16:51', '2019-12-21 10:16:51', 0),
(17, 9, 'Small', 0, 0, '2019-12-21 10:16:51', '2019-12-21 10:16:51', 0),
(18, 11, 'Good', 0, 0, '2019-12-21 10:18:17', '2019-12-21 10:18:17', 0),
(19, 11, 'Better', 0, 0, '2019-12-21 10:18:17', '2019-12-21 10:18:17', 0),
(20, 11, 'Bad', 0, 0, '2019-12-21 10:18:17', '2019-12-21 10:18:17', 0),
(21, 12, 'Yes', 0, 0, '2019-12-21 10:23:23', '2019-12-21 10:23:23', 0),
(22, 12, 'No', 0, 0, '2019-12-21 10:23:23', '2019-12-21 10:23:23', 0),
(23, 13, 'Yes', 0, 0, '2019-12-21 10:24:06', '2019-12-21 10:24:06', 0),
(24, 13, 'No', 0, 0, '2019-12-21 10:24:06', '2019-12-21 10:24:06', 0),
(25, 16, 'Yes', 0, 0, '2019-12-21 10:25:31', '2019-12-21 10:25:31', 0),
(26, 16, 'No', 0, 0, '2019-12-21 10:25:31', '2019-12-21 10:25:31', 0),
(27, 17, 'Yes', 0, 0, '2019-12-21 10:26:18', '2019-12-21 10:26:18', 0),
(28, 17, 'No', 0, 0, '2019-12-21 10:26:18', '2019-12-21 10:26:18', 0),
(29, 18, 'Yes', 0, 0, '2019-12-21 10:27:07', '2019-12-21 10:27:07', 0),
(30, 18, 'No', 0, 0, '2019-12-21 10:27:07', '2019-12-21 10:27:07', 0),
(31, 19, 'Yes', 0, 0, '2019-12-21 10:27:51', '2019-12-21 10:27:51', 0),
(32, 19, 'No', 0, 0, '2019-12-21 10:27:51', '2019-12-21 10:27:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questiontype`
--

CREATE TABLE `questiontype` (
  `questionTypeId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questiontype`
--

INSERT INTO `questiontype` (`questionTypeId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Input', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(2, 'Date', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(3, 'SingleOption', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(4, 'MultiOption', '2019-07-17 13:54:56', '2019-07-17 13:54:56', 0),
(5, 'TakePhoto', '2019-11-12 06:09:43', '2019-11-12 06:09:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `responsibleperson`
--

CREATE TABLE `responsibleperson` (
  `responsiblePersonId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `userIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `responsibleperson`
--

INSERT INTO `responsibleperson` (`responsiblePersonId`, `complaintIdFK`, `userIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(34, 12, 4, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(35, 12, 2, '2019-12-23 05:31:10', '2019-12-23 05:31:10', 0),
(36, 13, 7, '2019-12-23 05:41:36', '2019-12-23 05:41:36', 0),
(37, 13, 5, '2019-12-23 05:41:36', '2019-12-23 05:41:36', 0),
(38, 13, 4, '2019-12-23 05:41:36', '2019-12-23 05:41:36', 0),
(39, 14, 13, '2019-12-23 06:54:51', '2019-12-23 06:54:51', 0),
(40, 15, 2, '2019-12-27 10:18:17', '2019-12-27 10:18:17', 0),
(41, 16, 3, '2019-12-27 12:40:05', '2019-12-27 12:40:05', 0),
(42, 17, 3, '2019-12-27 12:49:33', '2019-12-27 12:49:33', 0),
(43, 18, 8, '2019-12-29 08:46:26', '2019-12-29 08:46:26', 0),
(44, 19, 17, '2019-12-31 09:11:52', '2019-12-31 09:11:52', 0),
(45, 19, 3, '2019-12-31 09:11:52', '2019-12-31 09:11:52', 0);

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
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `superadmin`
--

INSERT INTO `superadmin` (`superAdminId`, `firstName`, `lastName`, `mobileNumber`, `emailId`, `password`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Brigs', 'Nucleus', '8888888888', 'info@brigs-espro.com', '123456', '2019-12-03 11:29:13', '2019-12-03 11:29:13', 0);

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
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplierId`, `firstName`, `lastName`, `businessName`, `mobileNumber`, `emailId`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Spectrum ', 'Mapping', 'Motor Mechanic', '9999696595', 'spectrum.mapping@gmail.com', 1, '2019-07-17 07:01:00', '2019-09-09 07:00:00', 0),
(2, 'Shravan', 'Kumar', 'Water supplier', '1234567890', 'shravan@stackmint.com', 1, '2019-07-22 12:55:00', '2019-12-13 12:47:00', 0),
(3, 'Shital', 'Karhekar', 'Plastic industry', '2658574411', 'shital@rediffmail.com', 2, '2019-12-06 11:45:00', '2019-12-13 11:22:00', 0),
(4, 'Mayur', 'Shirude', 'Gridsmart Enterprises', '9763770068', 'mayur@stackmint.com', 3, '2019-12-23 06:02:55', '2019-12-23 06:02:55', 0),
(5, 'Rajesh', 'Patil', 'Autowell Industries', '9090909090', 'rajesh@stackmint.com', 3, '2019-12-23 06:03:40', '2019-12-23 06:03:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `transfercomplaint`
--

CREATE TABLE `transfercomplaint` (
  `transferComplaintId` int(11) NOT NULL,
  `complaintIdFK` int(11) NOT NULL,
  `fromUserIdFK` int(11) NOT NULL,
  `toUserIdFK` int(11) NOT NULL,
  `transferStatusIdFK` int(11) NOT NULL DEFAULT 1,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transferstatus`
--

CREATE TABLE `transferstatus` (
  `transferStatusId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transferstatus`
--

INSERT INTO `transferstatus` (`transferStatusId`, `title`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'Pending', '2019-10-09 09:51:15', '2019-10-17 09:54:29', 0),
(2, 'Accepted', '2019-10-09 09:51:15', '2019-10-17 09:54:36', 0),
(3, 'Rejected', '2019-10-17 09:54:50', '2019-10-17 09:54:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `typeofcomplaint`
--

CREATE TABLE `typeofcomplaint` (
  `typeComplaintId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
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
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(11) NOT NULL DEFAULT 0
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
  `deviceId` varchar(255) NOT NULL DEFAULT '0',
  `otp` int(11) NOT NULL DEFAULT 0,
  `isActive` int(2) NOT NULL DEFAULT 1,
  `token` varchar(255) NOT NULL DEFAULT '0',
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userRoleIdFK`, `firstName`, `lastName`, `profileImage`, `departmentIdFK`, `mobileNumber`, `emailId`, `password`, `deviceId`, `otp`, `isActive`, `token`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 4, 'Info', 'Brigs', 'image-1576919916899.png', 1, '8888888888', 'info@brigs-espro.com', '123456', '1234', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib3JnYW5pemF0aW9uSWQiOjEsIm5hbWUiOiJJbmZvIEJyaWdzIiwidXNlclJvbGVJZCI6NCwiaWF0IjoxNTc3OTYzOTY2LCJleHAiOjE1Nzc5NjY5NjZ9.vwOR1eWANW0K3fNsrtEYBJlzFo-5HTSDGKmHnFvv0qg', '2019-12-21 09:18:36', '2020-01-02 11:19:26', 0),
(2, 2, 'Mahesh', 'Lipane', 'user.png', 1, '8830614235', 'mahesh@stackmint.com', '123456', 'dnuyqsrU3Uo:APA91bF2Sq0NDc1Cj4To_jRf7icD6zDx6ZP5JeUdpsJTmjksY_Se3f-Lf6SNVxlUN6zU8seRENklRYr5WhYircxnQqatOjPflfA8vRErO7h8iqj40--XrsVn5WyJqfXrbJFnjWmaDnrM', 0, 1, 'NA', '2019-12-21 09:19:49', '2020-01-02 05:22:27', 0),
(3, 3, 'Ajay', 'Khatavkar', 'user.png', 1, '9579368483', 'ajay@stackmint.com', 'admin12345', 'dtrmAjK1KLU:APA91bFQfvRi0QLDSfy0lHDlkIyAQu4D7ovCXaRWd1Sv00axoE9kogismPFopl5QQhCSRfKXID2XXX4Gk38RCcRVhOC4FuLVOqOaKTqtXyogZV8Mn7f4gjTkVqJbawuGQvh8CewwYmVc', 0, 1, 'NA', '2019-12-21 09:20:38', '2020-01-02 05:22:21', 0),
(4, 3, 'Kavita', 'Shimpi', 'image-1577942596613.jpeg', 3, '7350518782', 'kavita@stackmint.com', '123456', 'stringd', 0, 1, 'NA', '2019-12-21 09:21:29', '2020-01-02 05:23:16', 0),
(5, 3, 'Shital', 'Pawar', 'user.png', 4, '9623785571', 'shital@stackmint.com', '123456', '0', 0, 1, 'NA', '2019-12-21 09:22:47', '2020-01-02 05:26:32', 0),
(6, 3, 'Hardik', 'Patil', 'image-1576920233939.jpeg', 5, '9637995045', 'hardik@stackmint.com', '123456', '12', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwib3JnYW5pemF0aW9uSWQiOjEsIm5hbWUiOiJIYXJkaWsgUGF0aWwiLCJ1c2VyUm9sZUlkIjozLCJpYXQiOjE1NzY5MjM3NzAsImV4cCI6MTU3OTMyMzc3MH0.LJ0zmCoJDkWN1lHY7zoJW1ET7tw4yhKrIXodKLUg-as', '2019-12-21 09:23:54', '2019-12-21 10:22:50', 0),
(7, 3, 'Sagar', 'Kale', 'image-1576920279285.jpeg', 5, '8551913973', 'sagar@stackmint.com', '123456', '0', 0, 1, '0', '2019-12-21 09:24:39', '2019-12-21 09:24:39', 0),
(8, 3, 'Rahul', 'Jaiswal', 'user.png', 5, '7020151937', 'rahul@stackmint.com', '123456', 'e57BC9NR_hQ:APA91bHVTwg5YINHZeTbsaPJXCyNVHRd_ZOBcexJZyG40vncWZiUAl9S5k7-Vi7krVXJW-1ub138PNaEvo3p8j9RnpdFZLggkOWR5Aicw3YH8ByuLHPMiiC0aimd5hOHN3v2d5gNyNOs', 0, 1, 'NA', '2019-12-23 05:14:30', '2019-12-27 12:43:19', 0),
(11, 10, 'Mahesh', 'Lipane', 'image-1577081340689.jpeg', 8, '8830614235', 'mahi@stackmint.com', '123456', 'eYhe3xbtP5A:APA91bE5Y0P9S7-1AcwREonmLKgMJOBA8jxgZ38zVwOSJb-iSVkJV_zxMPQioYeKDVHk8JP1C4WrwN5l0ZaUwM1qYemxX8ezqR4ncrCvzZrK3sfvA9v-is_dV0ILV5gGvWOyS6MdXxZN', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm9yZ2FuaXphdGlvbklkIjozLCJuYW1lIjoiTWFoZXNoIExpcGFuZSIsInVzZXJSb2xlSWQiOjEwLCJpYXQiOjE1NzcwODM3MDUsImV4cCI6MTU3NzA4NjcwNX0.Too6KrQitTWclGy8AySHEXmVpfZMvLFAQpR32fFofWo', '2019-12-23 06:09:00', '2019-12-23 06:48:25', 0),
(13, 9, 'Sagar', 'Kale', 'image-1577081408239.jpeg', 9, '8551913973', 'sagarkale@stackmint.com', '123456', 'ctAWrgTDS7s:APA91bF0Jfdx5Cpjo4w49GRtSyseRKK1IQrA7De5CKGQ11qZG7HIb2a_xpgkaSzYKBZRV_P9-VI7vpe6vtSKSaZ2K9HWOaptAbFSnMHGyRS6uro4wTXRQsYxEj2uOUdbtHj6qbIoZMcT', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm9yZ2FuaXphdGlvbklkIjozLCJuYW1lIjoiU2FnYXIgS2FsZSIsInVzZXJSb2xlSWQiOjksImlhdCI6MTU3NzA4NDM0OCwiZXhwIjoxNTc3MDg3MzQ4fQ.N9EVjt7fZ_KMl6ggDoTEPOIZwj4tTNOvnUoneXWNsQA', '2019-12-23 06:10:08', '2019-12-23 06:59:08', 0),
(14, 9, 'Harshad', 'Thkare', 'image-1577085974733.png', 11, '9561093814', 'harshad@stackmint.com', '123456', '0', 0, 1, '0', '2019-12-23 07:26:14', '2019-12-23 07:26:14', 0),
(15, 2, 'Shital', 'Karhekar', 'user.png', 5, '8329121551', 'shital@gmail.com', 'shital@123', ' ', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsIm9yZ2FuaXphdGlvbklkIjoxLCJuYW1lIjoiU2hpdGFsIEthcmhla2FyIiwidXNlclJvbGVJZCI6MiwiaWF0IjoxNTc3OTcxOTQxLCJleHAiOjE1Nzc5NzQ5NDF9.LMtuvIDhvGIx-qHWUiaOAolU7HEH3Dznki-ZrTbXAJo', '2019-12-27 09:15:43', '2020-01-02 13:35:13', 0),
(17, 1, 'Harshad', 'Thakare', 'user.png', 5, '9517538524', 'harshad1@stackmint.com', '123456', 'f4FPkBfU0pg:APA91bF0zuQNDDVWkyzlDaoj0JNyY4BLFcBD0T-Hwseo2-7TDd0KEkbSP9kP1vRv2vUANl5JrhvI4QBKOfV6mlarCMQV2nFA2teo9pg5ibzMSq_c1f7HBzrpxzIkdZK_OfA-EFtjbFql', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm9yZ2FuaXphdGlvbklkIjoxLCJuYW1lIjoiSGFyc2hhZCBUaGFrYXJlIiwidXNlclJvbGVJZCI6MSwiaWF0IjoxNTc3OTcyMTMxLCJleHAiOjE1Nzc5NzUxMzF9.RxWI-9dxFjgyKQiQzcutoiguFwnn7Pkm_r2qG6Yfq40', '2019-12-27 11:00:21', '2020-01-02 13:35:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usercatassignment`
--

CREATE TABLE `usercatassignment` (
  `userCatAssignmentId` int(11) NOT NULL,
  `userIdFK` int(11) NOT NULL,
  `assignmentTypeIdFK` int(11) NOT NULL,
  `masterIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usercatassignment`
--

INSERT INTO `usercatassignment` (`userCatAssignmentId`, `userIdFK`, `assignmentTypeIdFK`, `masterIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 1, 3, 1, '2019-12-21 09:27:36', '2019-12-21 09:27:36', 0),
(2, 2, 3, 1, '2019-12-21 09:27:36', '2019-12-21 09:27:36', 0),
(3, 1, 3, 4, '2019-12-21 09:55:33', '2019-12-21 09:55:33', 0),
(4, 2, 3, 4, '2019-12-21 09:55:33', '2019-12-21 09:55:33', 0),
(5, 3, 3, 4, '2019-12-21 09:55:33', '2019-12-21 09:55:33', 0),
(6, 4, 3, 4, '2019-12-21 09:55:33', '2019-12-21 09:55:33', 0),
(7, 1, 3, 3, '2019-12-21 09:55:50', '2019-12-21 09:55:50', 0),
(8, 2, 3, 3, '2019-12-21 09:55:50', '2019-12-21 09:55:50', 0),
(9, 5, 3, 3, '2019-12-21 09:55:50', '2019-12-21 09:55:50', 0),
(10, 6, 3, 3, '2019-12-21 09:55:50', '2019-12-21 09:55:50', 0),
(11, 1, 3, 2, '2019-12-21 09:56:05', '2019-12-21 09:56:05', 0),
(12, 2, 3, 2, '2019-12-21 09:56:05', '2019-12-21 09:56:05', 0),
(13, 5, 3, 2, '2019-12-21 09:56:05', '2019-12-21 09:56:05', 0),
(14, 6, 3, 2, '2019-12-21 09:56:05', '2019-12-21 09:56:05', 0),
(15, 5, 3, 4, '2019-12-21 09:56:30', '2019-12-21 09:56:30', 0),
(16, 6, 3, 4, '2019-12-21 09:56:30', '2019-12-21 09:56:30', 0),
(17, 1, 1, 2, '2019-12-21 09:56:50', '2019-12-21 09:56:50', 0),
(18, 1, 1, 1, '2019-12-21 09:57:05', '2019-12-21 09:57:05', 0),
(19, 8, 1, 1, '2019-12-23 05:16:30', '2019-12-23 05:16:30', 0),
(20, 8, 1, 2, '2019-12-23 05:16:46', '2019-12-23 05:16:46', 0),
(21, 11, 3, 5, '2019-12-23 06:41:07', '2019-12-23 06:41:07', 0),
(22, 13, 1, 7, '2019-12-23 07:08:10', '2019-12-23 07:08:10', 0),
(23, 13, 3, 5, '2019-12-23 07:09:26', '2019-12-23 07:09:26', 0),
(24, 15, 1, 1, '2019-12-27 09:18:29', '2019-12-27 09:18:29', 0),
(25, 15, 1, 2, '2019-12-27 09:31:35', '2019-12-27 09:31:35', 0);

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--

CREATE TABLE `userrole` (
  `userRoleId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizationIdFK` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userrole`
--

INSERT INTO `userrole` (`userRoleId`, `title`, `organizationIdFK`, `createdOn`, `updatedOn`, `isDeleted`) VALUES
(1, 'System Admin', 1, '2019-10-07 06:53:00', '2019-10-10 06:41:00', 0),
(2, 'Manager', 1, '2019-10-09 05:57:00', '2019-10-14 05:33:00', 0),
(3, 'Human resource', 1, '2019-10-09 09:04:00', '2019-12-26 05:18:49', 0),
(4, 'Supervisor', 1, '2019-11-20 05:54:00', '2019-11-20 15:13:00', 0),
(5, 'Manager', 2, '2019-12-06 11:44:00', '2019-12-06 11:44:00', 0),
(6, 'Employee', 2, '2019-12-06 11:44:00', '2019-12-06 11:44:00', 0),
(7, 'User', 2, '2019-12-06 11:44:00', '2019-12-06 11:44:00', 0),
(8, 'Admin', 2, '2019-12-06 11:44:00', '2019-12-06 11:44:00', 0),
(9, 'Assistant Manager', 3, '2019-12-23 06:01:09', '2019-12-23 06:01:09', 0),
(10, 'Shop Floor Manager', 3, '2019-12-23 06:01:36', '2019-12-23 06:01:36', 0);

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
  ADD PRIMARY KEY (`alertId`),
  ADD KEY `organizationIdFK12` (`organizationIdFK`);

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
  ADD UNIQUE KEY `assetCode` (`assetCode`),
  ADD KEY `installationLocationTypeIdFK` (`installationLocationTypeIdFK`),
  ADD KEY `durationTypeIdFK` (`durationTypeIdFK`),
  ADD KEY `warrentDurationTypeIdFK` (`warrantyDurationTypeIdFK`),
  ADD KEY `supplierIdFK` (`supplierIdFK`),
  ADD KEY `departmentIdFK2` (`departmentIdFK`),
  ADD KEY `manufracturerIdFK` (`manufacturerIdFK`),
  ADD KEY `organizationIdFK4` (`organizationIdFK`),
  ADD KEY `typeOfUserIdFK4` (`typeOfUserIdFK`);

--
-- Indexes for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  ADD PRIMARY KEY (`assetCatRelationId`),
  ADD KEY `assetIdFK` (`assetIdFK`),
  ADD KEY `categoryIdFK` (`categoryIdFK`);

--
-- Indexes for table `assetLocations`
--
ALTER TABLE `assetLocations`
  ADD PRIMARY KEY (`assetLocationId`);

--
-- Indexes for table `assettransferlog`
--
ALTER TABLE `assettransferlog`
  ADD PRIMARY KEY (`assetTransferLogId`),
  ADD KEY `oldLocationTypeIdFK1` (`oldLocationTypeIdFK`),
  ADD KEY `newLocationTypeIdFK1` (`newLocationtypeIdFK`);

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
  ADD KEY `typeOfUserId` (`typeOfUserIdFK`),
  ADD KEY `organizationIdFK13` (`organizationIdFK`);

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
  ADD KEY `complaintIdFK3` (`complaintIdFK`);

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
  ADD KEY `documentTypeIdFK` (`documentTypeIdFK`),
  ADD KEY `organizationIdFK11` (`organizationIdFK`);

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
  ADD PRIMARY KEY (`featureId`);

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
  ADD PRIMARY KEY (`installationLocationTypeId`),
  ADD KEY `organizationIdFK14` (`organizationIdFK`);

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
  ADD PRIMARY KEY (`organizationId`),
  ADD UNIQUE KEY `organizationCode` (`organizationCode`);

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
  ADD KEY `userIdFK4` (`userIdFK`),
  ADD KEY `complaintIdFK` (`complaintIdFK`);

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
  ADD KEY `transferStatusIdFK` (`transferStatusIdFK`),
  ADD KEY `complaintIdFK2` (`complaintIdFK`),
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
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `alert`
--
ALTER TABLE `alert`
  MODIFY `alertId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `alerttracking`
--
ALTER TABLE `alerttracking`
  MODIFY `alertTrackingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `answerId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `assetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  MODIFY `assetCatRelationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assetLocations`
--
ALTER TABLE `assetLocations`
  MODIFY `assetLocationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assettransferlog`
--
ALTER TABLE `assettransferlog`
  MODIFY `assetTransferLogId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `assignmenttype`
--
ALTER TABLE `assignmenttype`
  MODIFY `assignmentTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `checklist`
--
ALTER TABLE `checklist`
  MODIFY `checklistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `checklistimage`
--
ALTER TABLE `checklistimage`
  MODIFY `checklistImageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `complaintId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `complaintimages`
--
ALTER TABLE `complaintimages`
  MODIFY `complaintImagesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `complaintstatus`
--
ALTER TABLE `complaintstatus`
  MODIFY `complaintStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `complainttrack`
--
ALTER TABLE `complainttrack`
  MODIFY `complaintTrackId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `documentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `documenttype`
--
ALTER TABLE `documenttype`
  MODIFY `documentTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `donechecklist`
--
ALTER TABLE `donechecklist`
  MODIFY `doneChecklistId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `durationtype`
--
ALTER TABLE `durationtype`
  MODIFY `durationTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feature`
--
ALTER TABLE `feature`
  MODIFY `featureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `featureassignment`
--
ALTER TABLE `featureassignment`
  MODIFY `featureAssignmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `installationlocationtype`
--
ALTER TABLE `installationlocationtype`
  MODIFY `installationLocationTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `organizationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `questionoption`
--
ALTER TABLE `questionoption`
  MODIFY `questionOptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `questiontype`
--
ALTER TABLE `questiontype`
  MODIFY `questionTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `responsibleperson`
--
ALTER TABLE `responsibleperson`
  MODIFY `responsiblePersonId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `superAdminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplierId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transfercomplaint`
--
ALTER TABLE `transfercomplaint`
  MODIFY `transferComplaintId` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `usercatassignment`
--
ALTER TABLE `usercatassignment`
  MODIFY `userCatAssignmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `userrole`
--
ALTER TABLE `userrole`
  MODIFY `userRoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `organizationIdFK9` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `alert`
--
ALTER TABLE `alert`
  ADD CONSTRAINT `organizationIdFK12` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

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
  ADD CONSTRAINT `doneCheckListIdFK` FOREIGN KEY (`doneChecklistIdFK`) REFERENCES `donechecklist` (`doneChecklistId`),
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
  ADD CONSTRAINT `typeOfUserIdFK4` FOREIGN KEY (`typeOfUserIdFK`) REFERENCES `typeofuser` (`typeOfUserId`),
  ADD CONSTRAINT `warrentDurationTypeIdFK` FOREIGN KEY (`warrantyDurationTypeIdFK`) REFERENCES `durationtype` (`durationTypeId`);

--
-- Constraints for table `assetcatrelation`
--
ALTER TABLE `assetcatrelation`
  ADD CONSTRAINT `assetIdFK` FOREIGN KEY (`assetIdFK`) REFERENCES `asset` (`assetId`),
  ADD CONSTRAINT `categoryIdFK` FOREIGN KEY (`categoryIdFK`) REFERENCES `category` (`categoryId`);

--
-- Constraints for table `assettransferlog`
--
ALTER TABLE `assettransferlog`
  ADD CONSTRAINT `newLocationTypeIdFK1` FOREIGN KEY (`newLocationtypeIdFK`) REFERENCES `installationlocationtype` (`installationLocationTypeId`),
  ADD CONSTRAINT `oldLocationTypeIdFK1` FOREIGN KEY (`oldLocationTypeIdFK`) REFERENCES `installationlocationtype` (`installationLocationTypeId`);

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
  ADD CONSTRAINT `organizationIdFK8` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`),
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
  ADD CONSTRAINT `complaintIdFK3` FOREIGN KEY (`complaintIdFK`) REFERENCES `complaint` (`complaintId`),
  ADD CONSTRAINT `complaintStatusIdFK1` FOREIGN KEY (`complaintStatusIdFK`) REFERENCES `complaintstatus` (`complaintStatusId`),
  ADD CONSTRAINT `typeOfUserIdFK2` FOREIGN KEY (`typeOfUserIdFK`) REFERENCES `typeofuser` (`typeOfUserId`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `organizationIdFK2` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`),
  ADD CONSTRAINT `parentId` FOREIGN KEY (`parentId`) REFERENCES `department` (`departmentId`);

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `documentTypeIdFK` FOREIGN KEY (`documentTypeIdFK`) REFERENCES `documenttype` (`documentTypeId`),
  ADD CONSTRAINT `organizationIdFK11` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `donechecklist`
--
ALTER TABLE `donechecklist`
  ADD CONSTRAINT `assetIdFK2` FOREIGN KEY (`assetIdFK`) REFERENCES `asset` (`assetId`),
  ADD CONSTRAINT `checkListIdFK1` FOREIGN KEY (`checkListIdFK`) REFERENCES `checklist` (`checklistId`),
  ADD CONSTRAINT `userIdFK1` FOREIGN KEY (`doneBy`) REFERENCES `user` (`userId`);

--
-- Constraints for table `featureassignment`
--
ALTER TABLE `featureassignment`
  ADD CONSTRAINT `featureIdFK` FOREIGN KEY (`featureIdFK`) REFERENCES `feature` (`featureId`),
  ADD CONSTRAINT `userRoleIdFK` FOREIGN KEY (`userRoleIdFK`) REFERENCES `userrole` (`userRoleId`);

--
-- Constraints for table `installationlocationtype`
--
ALTER TABLE `installationlocationtype`
  ADD CONSTRAINT `organizationIdFK5` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

--
-- Constraints for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD CONSTRAINT `organizationIdFK` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);

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
  ADD CONSTRAINT `organizationIdFK6` FOREIGN KEY (`organizationIdFK`) REFERENCES `organization` (`organizationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
