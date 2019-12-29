-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 29, 2019 at 11:11 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zscan`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_to_groups`
--

CREATE TABLE `admin_to_groups` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `groupid` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_to_groups`
--

INSERT INTO `admin_to_groups` (`id`, `userid`, `groupid`, `date`) VALUES
(3, 1, 4, '2019-11-29 07:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `ausers`
--

CREATE TABLE `ausers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` text NOT NULL,
  `ww` text NOT NULL,
  `type` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ausers`
--

INSERT INTO `ausers` (`id`, `name`, `lastname`, `email`, `ww`, `type`) VALUES
(1, 'Eddie', 'Maas', 'demo@demo.nl', 'fe01ce2a7fbac8fafaed7c982a04e229', 2);

-- --------------------------------------------------------

--
-- Table structure for table `cfg`
--

CREATE TABLE `cfg` (
  `id` int(11) NOT NULL,
  `pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cfg`
--

INSERT INTO `cfg` (`id`, `pwd`) VALUES
(1, 'goudvis');

-- --------------------------------------------------------

--
-- Table structure for table `checkresults`
--

CREATE TABLE `checkresults` (
  `id` int(11) NOT NULL,
  `grouplink` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CW1` decimal(4,2) NOT NULL,
  `CW2` decimal(4,2) NOT NULL,
  `VB1` decimal(4,2) NOT NULL,
  `VB2` decimal(4,2) NOT NULL,
  `VB3` decimal(4,2) NOT NULL,
  `OPL1` decimal(4,2) DEFAULT NULL,
  `OPL2` decimal(4,2) DEFAULT NULL,
  `OPL3` decimal(4,2) DEFAULT NULL,
  `PRO1` decimal(4,2) DEFAULT NULL,
  `PRO2` decimal(4,2) DEFAULT NULL,
  `PRO3` decimal(4,2) DEFAULT NULL,
  `COM1` decimal(4,2) DEFAULT NULL,
  `COM2` decimal(4,2) DEFAULT NULL,
  `COM3` decimal(4,2) DEFAULT NULL,
  `BOR1` decimal(4,2) DEFAULT NULL,
  `BOR2` decimal(4,2) DEFAULT NULL,
  `BOR3` decimal(4,2) DEFAULT NULL,
  `BOR4` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL,
  `made` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `numberfilled` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `status`, `made`, `numberfilled`) VALUES
(1, 'groep1', 1, '2019-07-06 20:18:58', 0),
(2, 'nieuw', 1, '2019-07-15 21:10:04', 0),
(3, ' nieuw', 1, '2019-11-22 10:30:31', 0),
(4, 'test', 1, '2019-11-22 10:31:11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `grouplink` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IZ1` decimal(4,2) NOT NULL,
  `IZ2` decimal(4,2) NOT NULL,
  `IZ3` decimal(4,2) NOT NULL,
  `IW1` decimal(4,2) NOT NULL,
  `IW2` decimal(4,2) NOT NULL,
  `IW3` decimal(4,2) DEFAULT NULL,
  `IWE1` decimal(4,2) DEFAULT NULL,
  `IWE2` decimal(4,2) DEFAULT NULL,
  `IWE3` decimal(4,2) DEFAULT NULL,
  `IWE4` decimal(4,2) DEFAULT NULL,
  `IK1` decimal(4,2) DEFAULT NULL,
  `IK2` decimal(4,2) DEFAULT NULL,
  `IK3` decimal(4,2) DEFAULT NULL,
  `SMOE1` decimal(4,2) DEFAULT NULL,
  `SMOE2` decimal(4,2) DEFAULT NULL,
  `SMOE3` decimal(4,2) DEFAULT NULL,
  `SMOE4` decimal(4,2) DEFAULT NULL,
  `SMOE5` decimal(4,2) DEFAULT NULL,
  `SMOE6` decimal(4,2) DEFAULT NULL,
  `SMOE7` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `grouplink`, `date`, `IZ1`, `IZ2`, `IZ3`, `IW1`, `IW2`, `IW3`, `IWE1`, `IWE2`, `IWE3`, `IWE4`, `IK1`, `IK2`, `IK3`, `SMOE1`, `SMOE2`, `SMOE3`, `SMOE4`, `SMOE5`, `SMOE6`, `SMOE7`) VALUES
(1, 1, '2019-07-06 20:45:50', '3.63', '3.38', '3.86', '3.14', '3.75', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, '2019-07-08 19:30:34', '0.75', '0.63', '0.00', '1.57', '0.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `grouplink` int(11) DEFAULT NULL,
  `email` text NOT NULL,
  `unlockkey` text NOT NULL,
  `type` int(11) NOT NULL,
  `mailsend` int(11) NOT NULL DEFAULT '0',
  `filled` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `grouplink`, `email`, `unlockkey`, `type`, `mailsend`, `filled`) VALUES
(1, 1, 'test@test.nl', 'vpbiat', 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_to_groups`
--
ALTER TABLE `admin_to_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ausers`
--
ALTER TABLE `ausers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cfg`
--
ALTER TABLE `cfg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkresults`
--
ALTER TABLE `checkresults`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_to_groups`
--
ALTER TABLE `admin_to_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ausers`
--
ALTER TABLE `ausers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cfg`
--
ALTER TABLE `cfg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `checkresults`
--
ALTER TABLE `checkresults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
