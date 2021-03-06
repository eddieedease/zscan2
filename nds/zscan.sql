-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2020 at 06:06 PM
-- Server version: 5.7.24
-- PHP Version: 7.3.0

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

--
-- Dumping data for table `admin_to_groups`
--

INSERT INTO `admin_to_groups` (`id`, `userid`, `groupid`, `date`) VALUES
(1, 1, 25, '2020-05-25 21:41:33');

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
  `BOR4` decimal(4,2) DEFAULT NULL,
  `BOR5` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `checkresults`
--

INSERT INTO `checkresults` (`id`, `grouplink`, `date`, `CW1`, `CW2`, `VB1`, `VB2`, `VB3`, `OPL1`, `OPL2`, `OPL3`, `PRO1`, `PRO2`, `PRO3`, `COM1`, `COM2`, `COM3`, `BOR1`, `BOR2`, `BOR3`, `BOR4`, `BOR5`) VALUES
(7, 5, '2020-03-12 10:52:55', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00', '5.00');

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
  `orgcolor` text NOT NULL,
  `validto` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `status`, `made`, `numberfilled`, `logo`, `orgcolor`, `validto`) VALUES
(22, 'Testgroeptest', 1, '2020-05-19 12:59:48', 0, '15899006605a032dc38294e86a.JPG', '75ff00', '2020-06-20'),
(23, 'wauwie', 1, '2020-05-19 15:00:47', 0, NULL, '00fff4', '2037-08-11'),
(24, 'nieuw', 1, '2020-05-19 15:18:21', 0, NULL, '0000FF', NULL),
(25, 'Testgroeptest (Copy)', 1, '2020-05-25 21:41:33', 0, '1591112889531db47f212480e4.jpg', '75ff00', NULL),
(26, 'sdfds', 1, '2020-06-02 15:25:13', 0, '1591112536be2d848f25d3c7a4.jpg', '0000FF', NULL);

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
  `SMOE8` decimal(4,2) DEFAULT NULL,
  `openq` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `grouplink`, `date`, `IZ1`, `IZ2`, `IZ3`, `IW1`, `IW2`, `IW3`, `IWE1`, `IWE2`, `IWE3`, `IWE4`, `IK1`, `IK2`, `IK3`, `SMOE1`, `SMOE2`, `SMOE3`, `SMOE4`, `SMOE5`, `SMOE6`, `SMOE7`, `SMOE8`, `openq`) VALUES
(1, 25, '2020-05-25 21:57:34', '3.40', '3.50', '1.50', '3.40', '2.75', '3.00', '2.00', '5.00', '3.00', '3.50', '1.00', '2.67', '5.00', '3.00', '5.00', '2.00', '4.00', '2.00', '4.00', NULL, NULL, 'sdfdsfwef');

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
(63, 22, 'test@test.nl', 'kucrrt', 1, 0, 0),
(64, 23, 'eddasda@asda.as', 'jdmzrs', 1, 0, 0),
(65, 24, 'sdf@asdfas.nl', 'qnzfzi', 1, 0, 0),
(66, 25, 'test@test.nl', 'brwzek', 1, 0, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
