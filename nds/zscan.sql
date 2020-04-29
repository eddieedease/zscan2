-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 29, 2020 at 01:13 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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

-- --------------------------------------------------------

--
-- Table structure for table `cfg`
--

CREATE TABLE `cfg` (
  `id` int(11) NOT NULL,
  `pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `BOR4` decimal(4,2) DEFAULT NULL,
  `BOR5` decimal(4,2) DEFAULT NULL
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
  `numberfilled` int(11) NOT NULL DEFAULT '0',
  `logo` text,
  `validto` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `SMOE7` decimal(4,2) DEFAULT NULL,
  `openq` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ausers`
--
ALTER TABLE `ausers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cfg`
--
ALTER TABLE `cfg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkresults`
--
ALTER TABLE `checkresults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
