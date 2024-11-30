-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 07:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `e_learning_test`;
CREATE DATABASE IF NOT EXISTS `e_learning_test`;
USE `e_learning_test`;

--
-- Database: `e_learning_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` varchar(36) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `student_id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `option_id` varchar(36) DEFAULT NULL,
  `attempt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `answer`, `student_id`, `question_id`, `option_id`, `attempt`) VALUES
('00c37bfa-bb38-4fe3-a43d-ffb3bcf92ee0', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '39a8515b-229a-4f3b-b419-a33aed6a52cd', 10),
('02b79947-f5b5-4904-badd-1ec5c77910f5', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 2),
('0580d4c2-b3cc-4fc5-bde1-03f9c5105359', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e35d5ca9-936c-40e9-b751-a19e43501f5e', 5),
('1e1be081-06a4-4e8b-aa82-b63e08cf5372', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '13024411-ae9b-4b3e-8b8b-da64913ddb57', 2),
('1f379791-a21e-4823-9e42-f43e9a21a7e4', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e7eeb3eb-48eb-4f9b-83ea-e8808488c167', 6),
('258d9e37-4f86-408b-acbb-7525fe42b2d7', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 15),
('28174616-ebf3-4791-92a3-a443e1bda472', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '8b335fe2-e5c3-4009-a2dd-f670fe464f77', 5),
('28bcce31-a83b-4d60-8007-08c58bb76fd8', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '940d8178-4b72-4c10-a169-d03849598c5a', 8),
('2951902b-73fc-4f96-b82e-f3495f4905c3', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'q13', 'o37', 1),
('2db27b76-9eb9-4e7d-8916-2c3840d5710c', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '940d8178-4b72-4c10-a169-d03849598c5a', 1),
('346b4f21-c973-49cb-be20-f55e6b41482f', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e7eeb3eb-48eb-4f9b-83ea-e8808488c167', 8),
('36a6bf8e-51df-4a49-a97b-8620ea5fdd2e', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', NULL, 14),
('37e15af1-cf9a-4f69-8bc1-53bec464a979', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', NULL, 4),
('3a98d87a-a2ec-44f3-aa38-adb19447c53c', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 8),
('3e14b03a-beeb-4d90-a208-5105f8056372', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 10),
('4355fb76-355e-4c82-8052-5b31fe8845f3', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', NULL, 16),
('4e6eef07-fcf2-457f-8688-6a1bc31d6612', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '6dfcb190-8013-44d6-9b86-b40d06f20ac2', 3),
('50bd277b-cb49-4abb-82f1-58883659c1ac', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'q4', 'o11', 1),
('52b2b6fd-8141-4a10-a23b-0861c4a805b2', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '3c10d8e9-17d0-45f8-affa-680c478590e0', 7),
('55d16371-e921-4ada-8d93-bda00c93cc85', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '13024411-ae9b-4b3e-8b8b-da64913ddb57', 5),
('5879ab5f-102b-4dd3-b25a-e0c1a9f73e18', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', '932278ad-d6c0-4853-8e49-9f9f0e6ab8cd', 10),
('5b35a551-6957-4a2e-87aa-c0f11f142d9d', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '254a8133-f3bb-4b16-8e7b-5b3c51973a52', 9),
('5f3655c0-aa62-43cd-830b-56f789d417d9', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '39a8515b-229a-4f3b-b419-a33aed6a52cd', 6),
('5fe52a82-6740-4a0a-ab86-80cc9cb799f9', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'q14', 'o40', 1),
('63eed58f-22e2-4cbd-892c-7bffc0968254', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'q22', 'o65', 1),
('65974718-15ba-44f5-8f9b-82d3ee9e43b3', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', NULL, 3),
('686ed2ab-4ceb-4ffa-a1f3-b781210b2760', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e7eeb3eb-48eb-4f9b-83ea-e8808488c167', 1),
('6bd980e5-10a2-4654-bc68-60010e20bd57', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '254a8133-f3bb-4b16-8e7b-5b3c51973a52', 14),
('6e193fdb-3d7a-4759-a31c-d4ff73f2bf12', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '247f2f46-5290-4707-81d5-40edbc0d1d66', 17),
('700cdb46-8e11-4d33-bf3a-b24bd8e3193e', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'aa1106d3-0153-44f7-beaa-f679e19e9ac5', 2),
('72a1f62e-3ae4-4f5e-a094-0b118c4f9bff', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '87ed9722-d2b5-4166-9d54-092e062c86ae', 9),
('742749f3-914d-4fb2-957b-3285343b23e3', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '6dfcb190-8013-44d6-9b86-b40d06f20ac2', 10),
('751c122a-8235-4a20-9eb0-dac9fbd41905', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '8b335fe2-e5c3-4009-a2dd-f670fe464f77', 6),
('7c2f9359-509f-4b91-8c1b-870d90e6d5f7', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '8b335fe2-e5c3-4009-a2dd-f670fe464f77', 4),
('84ad2838-7815-44c8-b50c-2802e678b4f4', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '39a8515b-229a-4f3b-b419-a33aed6a52cd', 9),
('87ad32f4-7dbf-4ade-843f-001b9e2d4a4b', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 7),
('8f1fbdc3-c842-463b-8828-a1cd8bc0836b', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', NULL, 17),
('925b2451-72cc-4671-bd1d-0ee521f00ffb', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '247f2f46-5290-4707-81d5-40edbc0d1d66', 3),
('98f7578e-230b-47d2-83cb-1d03b0b50918', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e7eeb3eb-48eb-4f9b-83ea-e8808488c167', 7),
('9fb3ef76-a37d-446b-a83f-2c02f5da5923', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '3c10d8e9-17d0-45f8-affa-680c478590e0', 8),
('a2c45b0a-ccbc-4214-b5ed-60464c499242', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '6dfcb190-8013-44d6-9b86-b40d06f20ac2', 2),
('a520c017-c2c2-4602-9026-df5a4950876b', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', NULL, 13),
('aa91cb4a-cf09-46ab-be88-4e6822b498e3', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '6dfcb190-8013-44d6-9b86-b40d06f20ac2', 1),
('abee4514-9d68-4b9b-9410-8f6c4dfb540e', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 1),
('b0381c92-dfa1-4145-8f37-a912fde0228e', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'd5521ef2-9f0a-4187-94de-c8f67f5b9f89', 12),
('b080c1f5-70b7-4e7a-9074-70643bc959f8', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', '254a8133-f3bb-4b16-8e7b-5b3c51973a52', 11),
('b693521b-ddc7-4e48-b92e-d7ded5425cbe', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '87ed9722-d2b5-4166-9d54-092e062c86ae', 6),
('b9259d5d-aaf5-4c7e-8689-09460a6ac4ba', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'q3', 'o7', 1),
('bd185567-8f05-4c1d-add7-f5586a3a0733', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', NULL, 13),
('c4542a52-c9d2-4405-8098-f2f1b0ba96f2', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', '932278ad-d6c0-4853-8e49-9f9f0e6ab8cd', 11),
('c7ba31fe-765d-4ad2-a001-202260ae5149', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '940d8178-4b72-4c10-a169-d03849598c5a', 3),
('cb9a1116-056d-4c59-a68e-769473beecdf', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', NULL, 16),
('d21da977-d95b-45d7-a63e-06d9b31e546c', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', NULL, 4),
('d2f3878c-e6b8-42d9-98af-9d4205e0fac7', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', '6dfcb190-8013-44d6-9b86-b40d06f20ac2', 5),
('ddbb5a03-6f63-44c0-8fc0-fa32a7510c1f', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', 'fbd777c5-a6b6-4f6c-8643-9756da9d10b3', 15),
('e1f6362e-9517-41b7-9c4f-08d17181a2a4', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e35d5ca9-936c-40e9-b751-a19e43501f5e', 10),
('f029f40d-f854-4934-bdb0-9b9c151ecfd5', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'add12020-34c1-44f1-be21-b73929c82857', '2572fedc-2b60-4c7c-8407-7b155bf959bf', 7),
('f4d00264-8bdb-4344-9bf1-7bdd2618bc23', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'a651761e-2dd1-4c58-8e19-75346d13668d', NULL, 4),
('fafa8317-4c22-475a-b617-83ef7f31e4f3', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', '75dd6d24-92ed-4079-b9a1-59923445f77e', 'e7eeb3eb-48eb-4f9b-83ea-e8808488c167', 9),
('ffa666f7-fb21-4fce-9d4c-d19b430eb8ee', NULL, '8f2e6682-dc87-484f-929b-abac2e193963', 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45', NULL, 12);

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `course_id` varchar(36) NOT NULL,
  `time_limit` int(11) DEFAULT NULL,
  `attempt_limit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `name`, `description`, `deadline`, `course_id`, `time_limit`, `attempt_limit`) VALUES
('9e826f42-cdbd-4051-9f87-a6fa6da7756e', 'Data Structures & Algorithm Exam', 'Students must achieve 80/100 to pass.', '2024-11-10 22:00:00', 'c8d1e4f1-223b-4cdd-9f0e-0123456789ab', 2, 0),
('a1d1e4f1-223b-4cdd-9f0e-0123456789ab', 'HTML Basics Assignment', 'Complete the HTML Basics quiz.', '2024-11-10 23:59:00', 'c1d1e4f1-223b-4cdd-9f0e-0123456789ab', 10, 10),
('a2d1e4f1-223b-4cdd-9f0e-0123456789ab', 'CSS Fundamentals Assignment', 'Submit the CSS styling project.', '2024-08-18 23:59:59', 'c2d1e4f1-223b-4cdd-9f0e-0123456789ab', NULL, NULL),
('a3d1e4f1-223b-4cdd-9f0e-0123456789ab', 'JavaScript Introduction Assignment', 'Complete the JavaScript coding challenge.', '2024-08-19 23:59:59', 'c3d1e4f1-223b-4cdd-9f0e-0123456789ab', NULL, NULL),
('a4d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Cybersecurity Basics Assignment', 'Submit the cybersecurity essay.', '2024-08-20 23:59:59', 'c4d1e4f1-223b-4cdd-9f0e-0123456789ab', NULL, NULL),
('a5d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Python Basics Assignment', 'Complete the Python Basics exercises.', '2024-08-21 23:59:59', 'c5d1e4f1-223b-4cdd-9f0e-0123456789ab', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `instructor_id` varchar(36) NOT NULL,
  `sub_instructor_id` varchar(36) DEFAULT NULL,
  `assignment_id` varchar(36) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `level` enum('Beginner','Intermediate','Advanced','Expert') NOT NULL DEFAULT 'Beginner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `instructor_id`, `sub_instructor_id`, `assignment_id`, `duration`, `image_url`, `level`) VALUES
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'Web Development Fundamentals', 'Learn how to build websites.', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', '00e813f9-59f4-40aa-bd60-1825d7606314', NULL, '5 weeks', 'https://elearningindustry.com/wp-content/uploads/2021/03/shutterstock_745932934.png', 'Intermediate'),
('c11d1e4f1-223b-4cdd-9f0e-0123456789a', 'Cybersecurity Essentials', 'Understand the basics of cybersecurity.', '00e813f9-59f4-40aa-bd60-1825d7606314', NULL, NULL, '3 weeks', 'https://img.freepik.com/free-vector/organic-flat-people-business-training_23-2148919413.jpg', 'Beginner'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'Python for Data Science', 'Learn Python for data analysis and visualization.', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', '00e813f9-59f4-40aa-bd60-1825d7606314', NULL, '8 weeks', NULL, 'Intermediate'),
('c13d1e4f1-223b-4cdd-9f0e-0123456789a', 'Database Management', 'Introduction to database concepts and SQL.', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', NULL, NULL, '5 weeks', 'https://animationexplainers.com/wp-content/uploads/2022/04/Employee-Training.jpg', 'Beginner'),
('c14d1e4f1-223b-4cdd-9f0e-0123456789a', 'Cloud Computing Essentials', 'Understand cloud services and architecture.', '00e813f9-59f4-40aa-bd60-1825d7606314', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', NULL, '4 weeks', NULL, 'Advanced'),
('c15d1e4f1-223b-4cdd-9f0e-0123456789a', 'Artificial Intelligence', 'Explore AI concepts and applications.', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', NULL, '10 weeks', 'https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-team-work-business_516790-1332.jpg', 'Expert'),
('c1d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Introduction to Programming', 'Learn the basics of programming.', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', NULL, 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '4 weeks', NULL, 'Beginner'),
('c2d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Digital Marketing Strategy', 'Learn to create effective digital marketing plans.', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', NULL, 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '6 weeks', 'https://elearningindustry.com/wp-content/uploads/2021/03/shutterstock_745932934.png', 'Intermediate'),
('c3d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Blockchain Fundamentals', 'Introduction to blockchain technology and its uses.', '00e813f9-59f4-40aa-bd60-1825d7606314', NULL, 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab', '7 weeks', NULL, 'Beginner'),
('c4d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Cybersecurity Advanced Practices', 'Advanced cybersecurity techniques and strategies.', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', '00e813f9-59f4-40aa-bd60-1825d7606314', 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab', '9 weeks', 'https://as2.ftcdn.net/v2/jpg/02/24/04/75/1000_F_224047592_T6VWHi0A74jGZogmE3faVK7dcmteIMvc.jpg', 'Advanced'),
('c5d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Mobile App Development', 'Learn to develop mobile applications.', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '8 weeks', NULL, 'Intermediate'),
('c6d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Project Management Essentials', 'Understand the basics of project management.', '00e813f9-59f4-40aa-bd60-1825d7606314', NULL, NULL, '5 weeks', 'https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-team-work-business_516790-1332.jpg', 'Beginner'),
('c7d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Advanced Networking', 'Deep dive into networking protocols and configurations.', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', NULL, '10 weeks', NULL, 'Advanced'),
('c8d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Advanced Data Structures', 'Deep dive into data structures.', '00e813f9-59f4-40aa-bd60-1825d7606314', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '6 weeks', 'https://t3.ftcdn.net/jpg/02/25/25/54/360_F_225255468_JIVcux271IOhuPqqrsRtvXeKmq5iu944.jpg', 'Advanced'),
('c9d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Machine Learning Techniques', 'Explore machine learning algorithms.', 'ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', NULL, NULL, '8 weeks', 'https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-team-work-business_516790-1332.jpg', 'Expert');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` varchar(36) NOT NULL,
  `status` enum('Approved','Pending','Rejected') NOT NULL DEFAULT 'Pending',
  `done` tinyint(4) NOT NULL DEFAULT 0,
  `enrollment_date` datetime NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `course_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `status`, `done`, `enrollment_date`, `student_id`, `course_id`) VALUES
('0111779e-3523-4ca9-8aa5-c85a8f110efe', 'Pending', 0, '2024-08-25 12:07:52', '54a859af-3995-441b-9537-695ae8215f7f', 'c8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('01b6fff1-a70e-49fa-8b33-1b01f46c9454', 'Approved', 0, '2024-08-12 23:32:39', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('073f7a53-510c-4f7d-8459-427171bd954a', 'Approved', 0, '2024-11-09 00:44:58', '8f2e6682-dc87-484f-929b-abac2e193963', 'c8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('18f74b54-d822-4c02-a61f-9c6d6b54b598', 'Approved', 0, '2024-08-13 15:20:13', '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'c9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('1999cec6-b75e-404a-8929-9269c72720b3', 'Rejected', 0, '2024-11-09 00:46:02', '8f2e6682-dc87-484f-929b-abac2e193963', 'c2d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('2ad9044b-59c4-474e-b883-700eedc349bf', 'Pending', 0, '2024-10-14 09:04:39', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('2f7cca1b-645f-466e-b0c5-fa0478e08e55', 'Pending', 0, '2024-08-20 23:34:47', 'b6281679-02c0-4543-a7fb-210429105267', 'c12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('3549dcbd-4619-4473-8167-e525dc15a5fa', 'Rejected', 0, '2024-08-25 02:12:20', '8f2e6682-dc87-484f-929b-abac2e193963', 'c15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('36b2603c-b635-42d6-8432-4922b7b90e73', 'Rejected', 0, '2024-08-12 14:19:01', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('38761653-4531-42fe-9eab-5229fef1e398', 'Pending', 0, '2024-08-25 11:49:56', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c13d1e4f1-223b-4cdd-9f0e-0123456789a'),
('3f1904cd-86ac-4865-ac07-9c0db9c897d8', 'Approved', 0, '2024-08-13 15:20:20', '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('44f8f9c7-6339-4887-b3ef-852e1cc87657', 'Pending', 0, '2024-08-25 11:56:01', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('452cc0db-e6fb-4a40-b1ff-310c97702f66', 'Rejected', 0, '2024-08-12 14:16:24', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('47bf8cda-c0f8-4577-aa5b-4527bf6fb1de', 'Rejected', 0, '2024-08-13 15:20:28', '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'c15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('5471386f-5b73-4362-a210-1604b69ee14b', 'Pending', 0, '2024-08-13 15:19:36', '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'c12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('5b25e221-19b4-4382-b917-d0e600eeef7f', 'Approved', 0, '2024-08-13 09:53:22', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('5bc4dec6-87a5-4a49-a353-bf45fc3e7c86', 'Pending', 0, '2024-08-20 23:34:54', 'b6281679-02c0-4543-a7fb-210429105267', 'c15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('67b77884-7f50-4007-81c4-55995bb17e12', 'Approved', 0, '2024-11-09 00:38:36', '8f2e6682-dc87-484f-929b-abac2e193963', 'c1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('691ac922-dfc4-4b61-83df-7ac829e727d2', 'Pending', 0, '2024-08-25 11:47:34', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c2d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('6b8e4e63-54d0-4155-aa7d-66dd978df0ed', 'Pending', 0, '2024-08-25 11:58:39', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c13d1e4f1-223b-4cdd-9f0e-0123456789a'),
('794efc8e-bef1-47d2-9dcb-b74b8b3e31a3', 'Approved', 0, '2024-08-12 22:11:07', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('7d31121b-282d-42c7-892f-3cbfa6aa3e17', 'Approved', 0, '2024-08-12 14:26:29', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('8151e9dc-c6a5-4a04-8069-00f208a8b402', 'Pending', 0, '2024-08-13 15:14:26', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c6d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('8e9bd88c-5b75-4b56-bca4-d6ade00b7ce6', 'Approved', 0, '2024-10-29 10:59:02', '2bff352d-325d-4e5d-b81c-97593a8285fe', 'c15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('928053be-243c-4b11-8e0a-904180f34b53', 'Rejected', 0, '2024-08-13 00:32:14', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('95adf5a3-0dbf-4b95-b5a1-bc5fe46ed89a', 'Pending', 0, '2024-08-17 13:49:56', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('9b375b0f-13ca-4652-8bbe-d3622d21ad32', 'Approved', 0, '2024-08-12 14:46:06', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c11d1e4f1-223b-4cdd-9f0e-0123456789a'),
('a661c75a-464a-4734-a573-3e1a25284809', 'Approved', 0, '2024-08-13 09:53:44', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('aaa005ee-247b-4169-ad10-a2b4c784f00c', 'Approved', 0, '2024-08-12 14:19:13', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('b361a649-f131-4a7f-983c-f047b3cafe02', 'Approved', 0, '2024-08-13 15:19:51', '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'c14d1e4f1-223b-4cdd-9f0e-0123456789a'),
('b4bbec27-72c4-4286-8c4f-8dff42240773', 'Approved', 0, '2024-08-17 14:43:30', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('b5274f02-70d7-497d-91cd-76296ac70ede', 'Pending', 0, '2024-08-20 23:35:01', 'b6281679-02c0-4543-a7fb-210429105267', 'c4d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('b6866f62-c5ff-486f-b685-f0706e21c673', 'Approved', 0, '2024-08-13 02:02:49', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('b835a498-76f2-4a30-9e24-a5ea38b4d8ac', 'Approved', 0, '2024-11-09 00:44:21', '8f2e6682-dc87-484f-929b-abac2e193963', 'c5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('bf128894-d897-4986-bed1-88ed8f6b74b3', 'Approved', 0, '2024-08-13 00:27:52', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c14d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c32b3824-21d5-4321-acdc-9e2823cd2539', 'Approved', 0, '2024-08-12 14:22:31', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c14d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c52e9482-e8e5-4f3e-8477-0a821e752594', 'Approved', 0, '2024-11-09 00:45:53', '8f2e6682-dc87-484f-929b-abac2e193963', 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('d8a7deac-f26c-460f-911a-964072856ff5', 'Approved', 0, '2024-08-25 01:54:56', '8f2e6682-dc87-484f-929b-abac2e193963', 'c12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('dc6a67fa-f3f4-4506-91c5-4d95be11c296', 'Approved', 0, '2024-08-13 09:53:35', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c4d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('e9cf4a52-51ed-4155-bb56-dcb6d0e5cfe2', 'Pending', 0, '2024-08-25 12:00:52', '378e1954-1a85-458b-bfa1-d904070f1d58', 'c10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('eae2fb1a-13f4-4b6f-88e7-bd1f490129c8', 'Rejected', 0, '2024-08-12 14:19:23', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('ef13a7c4-abb4-4293-86dc-d9dd73faaf9a', 'Pending', 0, '2024-11-16 20:32:35', '8f2e6682-dc87-484f-929b-abac2e193963', 'c10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('f23f5c32-803d-43a0-a452-64a74653b329', 'Approved', 0, '2024-08-14 13:17:36', '5877df58-ad78-4833-8b04-175e72b6e3db', 'c4d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('ff586b78-dea7-41b4-af0d-3734939ee81c', 'Pending', 0, '2024-08-20 23:34:40', 'b6281679-02c0-4543-a7fb-210429105267', 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` varchar(36) NOT NULL,
  `status` enum('Todo','Doing','Pass','Fail') NOT NULL DEFAULT 'Todo',
  `grade` float NOT NULL,
  `max_grade` float NOT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `assignment_id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  `attempt` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `status`, `grade`, `max_grade`, `feedback`, `assignment_id`, `student_id`, `start_time`, `submit_time`, `attempt`) VALUES
('05af0e93-11f4-46bc-a04c-d7d3805d8ea4', 'Fail', 1, 3, 'Bad', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-10 23:54:12', '2024-11-10 23:56:56', 6),
('0ac04ad5-5443-4238-bb79-e9a7b31d0435', 'Fail', 1, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-25 13:03:44', '2024-11-25 13:04:35', 10),
('1138a5e1-ca7d-48bf-9fa8-6ab285cc13ff', 'Fail', 0, 1, 'Not pass', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-10 23:57:52', '2024-11-11 08:36:16', 4),
('1d5206e8-d805-470e-a49a-3a6ba6db5b36', 'Pass', 1, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 20:26:50', '2024-11-09 20:27:01', 2),
('206a5253-2734-4109-b3a8-3f50c56228dc', 'Fail', 1, 3, 'Needs more effort.', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 19:15:54', '2024-11-09 19:16:03', 2),
('26634a68-05a0-4288-b4ab-8dccc5c3c220', 'Fail', 0, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:09:24', '2024-11-11 20:10:01', 8),
('33bc4ff5-3380-4389-bdc5-b13b4a42af8c', 'Fail', 2, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 08:40:56', '2024-11-11 08:41:19', 7),
('3f40ec14-6955-428e-8b4c-cfd506a8654a', 'Fail', 0, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:36:05', '2024-11-11 20:36:18', 16),
('453da5a7-e524-4743-b1a7-9875fc6d4939', 'Fail', 0, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:35:42', '2024-11-11 20:36:03', 15),
('51bcc716-6ee5-4d20-b026-d24ca2ab3563', 'Fail', 1, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:12:47', '2024-11-11 20:14:47', 10),
('5ab26f03-5475-4d36-b8d3-c1778d923c8a', 'Fail', 0, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 19:19:19', '2024-11-09 19:19:21', 4),
('6284b04a-7ec0-46e2-b61e-22516ae6b547', 'Fail', 0, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-10 23:57:32', '2024-11-10 23:57:40', 3),
('83292cb6-5dc7-4d93-a163-a7ee6f9c2794', 'Fail', 1, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:30:05', '2024-11-11 20:30:10', 11),
('87af2c9d-cf02-4d82-99f7-75bf6eb30ee7', 'Fail', 1, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 19:19:26', '2024-11-09 19:19:33', 5),
('9132287e-f7fa-463d-a47d-1386406662ec', 'Pass', 3, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:07:00', '2024-11-11 20:07:12', 8),
('960cf02e-4d7e-4251-8834-a963ae767701', 'Fail', 1, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:49:51', '2024-11-11 20:50:08', 9),
('b000bd5b-2ed6-4b17-8b40-c817862f26dd', 'Fail', 0, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:07:42', '2024-11-11 20:08:01', 6),
('b40c593a-b8bf-4822-a53e-d3acffba5796', 'Pass', 1, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 20:13:30', '2024-11-09 20:13:58', 1),
('c25d7385-e659-4220-992f-98375afb3030', 'Fail', 3, 5, '', 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 21:00:53', '2024-11-09 21:01:34', 1),
('ca969ec5-c6b4-47fa-ba64-5cbadc345aad', 'Fail', 2, 3, '', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 19:19:07', '2024-11-09 19:19:13', 3),
('cace7fd3-faac-4dbb-98e5-d897bba4ba59', 'Fail', 0, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 08:43:12', '2024-11-11 20:07:38', 5),
('d5b4d12c-4032-4122-958f-f0becc43acdd', 'Pass', 3, 3, 'This result is very good!', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-09 19:15:15', '2024-11-09 19:15:48', 1),
('e1dddffe-7d41-43d2-ab96-756d213214a2', 'Fail', 0, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:33:40', '2024-11-11 20:33:43', 13),
('f29dbd54-6676-429c-bb74-ab8a7621dffd', 'Fail', 0, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:30:28', '2024-11-11 20:30:30', 12),
('f53f1c1c-6a9e-401c-88d1-581e0d81a7d9', 'Pass', 1, 1, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:08:09', '2024-11-11 20:09:18', 7),
('fafb5071-896d-47c6-b9b1-af6944c3e25d', 'Fail', 1, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:34:57', '2024-11-11 20:35:39', 14),
('fd96054a-e9e9-4a0f-a915-e2d3cd85ab54', 'Pass', 2, 2, '', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '8f2e6682-dc87-484f-929b-abac2e193963', '2024-11-11 20:12:25', '2024-11-11 20:12:37', 9);

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `study_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `content`, `file_url`, `study_time`) VALUES
('73cd077e-8ea2-4068-8081-c5f4306ffe4c', 'Template Engine for HTML', 'Learn template engine Pug/Jade.', '', '2024-11-16 09:00:00'),
('b299da16-e0d5-420b-b2e8-899a9c9a02a3', 'My Lesson', 'Learn AI', '', '2024-08-22 08:00:00'),
('l10d1e4f1-223b-4cdd-9f0e-0123456789a', 'Networking Basics', 'Learn about basic networking protocols.', '', '2024-11-05 09:00:00'),
('l11d1e4f1-223b-4cdd-9f0e-0123456789a', 'Advanced Data Structures', 'In-depth study of data structures.', 'https://example.com/advanced_data_structures.pdf', '2024-08-22 10:00:00'),
('l12d1e4f1-223b-4cdd-9f0e-0123456789a', 'Machine Learning Introduction', 'Basics of machine learning algorithms.', 'https://example.com/ml_intro.pdf', '2024-08-23 11:00:00'),
('l13d1e4f1-223b-4cdd-9f0e-0123456789a', 'Introduction to HTML', 'Learn the basics of HTML structure.', 'https://example.com/html-intro.pdf', '2024-08-01 09:00:00'),
('l14d1e4f1-223b-4cdd-9f0e-0123456789a', 'CSS Styling', 'Explore how to style HTML with CSS.', 'https://example.com/css-styling.pdf', '2024-08-02 10:00:00'),
('l15d1e4f1-223b-4cdd-9f0e-0123456789a', 'JavaScript Basics', 'Introduction to JavaScript programming.', 'https://example.com/js-basics.pdf', '2024-08-03 11:00:00'),
('l16d1e4f1-223b-4cdd-9f0e-0123456789a', 'Advanced CSS Techniques', 'Deep dive into advanced CSS.', 'https://example.com/css-advanced.pdf', '2024-08-04 12:00:00'),
('l17d1e4f1-223b-4cdd-9f0e-0123456789a', 'React.js Introduction', 'Learn the basics of React.js.', 'https://example.com/react-intro.pdf', '2024-08-05 13:00:00'),
('l18d1e4f1-223b-4cdd-9f0e-0123456789a', 'Node.js Fundamentals', 'Introduction to server-side programming with Node.js.', 'https://example.com/nodejs-fundamentals.pdf', '2024-08-06 14:00:00'),
('l19d1e4f1-223b-4cdd-9f0e-0123456789a', 'Database Design', 'Learn how to design relational databases.', 'https://example.com/database-design.pdf', '2024-08-07 15:00:00'),
('l1d1e4f1-223b-4cdd-9f0e-0123456789ab', 'HTML Basics', 'Introduction to HTML and its basic elements.', 'https://example.com/html_basics.pdf', '2024-08-12 09:00:00'),
('l20d1e4f1-223b-4cdd-9f0e-0123456789a', 'SQL Queries', 'Introduction to SQL queries for database interaction.', 'https://example.com/sql-queries.pdf', '2024-08-08 16:00:00'),
('l21d1e4f1-223b-4cdd-9f0e-0123456789a', 'Web Security Basics', 'Learn the fundamentals of web security.', 'https://example.com/web-security.pdf', '2024-08-09 17:00:00'),
('l22d1e4f1-223b-4cdd-9f0e-0123456789a', 'RESTful API Design', 'Introduction to designing RESTful APIs.', 'https://example.com/restful-api.pdf', '2024-08-10 18:00:00'),
('l23d1e4f1-223b-4cdd-9f0e-0123456789a', 'Git and Version Control', 'Learn the basics of Git for version control.', 'https://example.com/git-version-control.pdf', '2024-08-11 19:00:00'),
('l24d1e4f1-223b-4cdd-9f0e-0123456789a', 'Agile Methodologies', 'Understand Agile frameworks like Scrum and Kanban.', 'https://example.com/agile-methodologies.pdf', '2024-08-12 20:00:00'),
('l25d1e4f1-223b-4cdd-9f0e-0123456789a', 'Test-Driven Development', 'Learn the principles of Test-Driven Development (TDD).', 'https://example.com/tdd.pdf', '2024-08-13 21:00:00'),
('l26d1e4f1-223b-4cdd-9f0e-0123456789a', 'CI/CD Pipelines', 'Introduction to Continuous Integration and Continuous Deployment.', 'https://example.com/cicd-pipelines.pdf', '2024-08-14 22:00:00'),
('l27d1e4f1-223b-4cdd-9f0e-0123456789a', 'Cloud Deployment', 'Learn how to deploy applications to the cloud.', 'https://example.com/cloud-deployment.pdf', '2024-08-15 23:00:00'),
('l2d1e4f1-223b-4cdd-9f0e-0123456789ab', 'CSS Fundamentals', 'Learn about CSS and how to style web pages.', 'https://example.com/css_fundamentals.pdf', '2024-08-13 10:00:00'),
('l3d1e4f1-223b-4cdd-9f0e-0123456789ab', 'JavaScript Introduction', 'Basic concepts of JavaScript for web development.', 'https://example.com/js_introduction.pdf', '2024-08-14 11:00:00'),
('l4d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Introduction to Cybersecurity', 'Overview of cybersecurity principles.', 'https://example.com/cybersecurity_intro.pdf', '2024-08-15 09:00:00'),
('l5d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Python Basics', 'Learn Python programming basics.', 'https://res.cloudinary.com/duminopj4/image/upload/v1724322496/files/d7tao8ojnezh4zakgsm7.pdf', '2024-08-16 10:00:00'),
('l6d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Data Analysis with Python', 'Using Python for data analysis.', 'https://example.com/data_analysis_python.pdf', '2024-08-17 11:00:00'),
('l7d1e4f1-223b-4cdd-9f0e-0123456789ab', 'SQL Basics', 'Introduction to SQL and database management.', 'https://example.com/sql_basics.pdf', '2024-08-18 09:00:00'),
('l8d1e4f1-223b-4cdd-9f0e-0123456789ab', 'Cloud Computing Concepts', 'Learn about cloud services and architectures.', 'https://example.com/cloud_computing_concepts.pdf', '2024-08-19 10:00:00'),
('l9d1e4f1-223b-4cdd-9f0e-0123456789ab', 'AI Fundamentals', 'Introduction to AI concepts and techniques.', 'https://example.com/ai_fundamentals.pdf', '2024-08-20 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `lesson_course`
--

CREATE TABLE `lesson_course` (
  `course_id` varchar(36) NOT NULL,
  `lesson_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lesson_course`
--

INSERT INTO `lesson_course` (`course_id`, `lesson_id`) VALUES
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'l13d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'l14d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'l1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'l2d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'l3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c10d1e4f1-223b-4cdd-9f0e-0123456789a', 'l6d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c11d1e4f1-223b-4cdd-9f0e-0123456789a', 'l21d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c11d1e4f1-223b-4cdd-9f0e-0123456789a', 'l4d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c11d1e4f1-223b-4cdd-9f0e-0123456789a', 'l8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'b299da16-e0d5-420b-b2e8-899a9c9a02a3'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'l18d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'l19d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'l27d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'l5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'l6d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c12d1e4f1-223b-4cdd-9f0e-0123456789a', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c13d1e4f1-223b-4cdd-9f0e-0123456789a', 'l11d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c13d1e4f1-223b-4cdd-9f0e-0123456789a', 'l12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c13d1e4f1-223b-4cdd-9f0e-0123456789a', 'l20d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c13d1e4f1-223b-4cdd-9f0e-0123456789a', 'l7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c14d1e4f1-223b-4cdd-9f0e-0123456789a', 'l27d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c14d1e4f1-223b-4cdd-9f0e-0123456789a', 'l8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c15d1e4f1-223b-4cdd-9f0e-0123456789a', 'l17d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c15d1e4f1-223b-4cdd-9f0e-0123456789a', 'l25d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c15d1e4f1-223b-4cdd-9f0e-0123456789a', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c1d1e4f1-223b-4cdd-9f0e-0123456789ab', '73cd077e-8ea2-4068-8081-c5f4306ffe4c'),
('c1d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c1d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l23d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c2d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l16d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c2d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l2d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c2d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c3d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l22d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c3d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l4d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c4d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l26d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c4d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c5d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c5d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l24d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c5d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c6d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c7d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c8d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l11d1e4f1-223b-4cdd-9f0e-0123456789a'),
('c9d1e4f1-223b-4cdd-9f0e-0123456789ab', 'l12d1e4f1-223b-4cdd-9f0e-0123456789a');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(3, 1721893879711, 'InitDatabase1721893879711'),
(9, 1722737566500, 'InsertUserData1722737566500'),
(13, 1722737899063, 'InsertCourseData1722737899063');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `is_correct` tinyint(4) NOT NULL,
  `question_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `content`, `is_correct`, `question_id`) VALUES
('03580dba-7a83-4e5f-a885-21dc7c14be97', '1', 0, 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45'),
('13024411-ae9b-4b3e-8b8b-da64913ddb57', 'pop()', 0, 'add12020-34c1-44f1-be21-b73929c82857'),
('1c02514c-3c81-4411-a898-1b28718c6a6c', 'CSS', 0, 'a651761e-2dd1-4c58-8e19-75346d13668d'),
('247f2f46-5290-4707-81d5-40edbc0d1d66', 'A', 0, '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6'),
('254a8133-f3bb-4b16-8e7b-5b3c51973a52', 'C', 0, '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6'),
('2572fedc-2b60-4c7c-8407-7b155bf959bf', 'shift()', 0, 'add12020-34c1-44f1-be21-b73929c82857'),
('27057ee0-4421-4293-a3c5-876d4eaf25ae', 'A', 0, 'c376c24f-6838-43bb-850f-a93edea64c30'),
('39a8515b-229a-4f3b-b419-a33aed6a52cd', 'slice()', 0, 'add12020-34c1-44f1-be21-b73929c82857'),
('3c10d8e9-17d0-45f8-affa-680c478590e0', 'Python', 1, 'a651761e-2dd1-4c58-8e19-75346d13668d'),
('3fc66732-d67a-4ee1-93df-2f36b967423d', '4', 0, '5424d241-3874-4a27-aac7-667aee76c7da'),
('47c28f58-1dc8-413c-9639-f327ad7a3c17', 'C', 0, 'c376c24f-6838-43bb-850f-a93edea64c30'),
('55b35019-51ee-4c38-8add-af5d3b3dff7f', '1', 0, '5424d241-3874-4a27-aac7-667aee76c7da'),
('6dc26ae9-717b-4bf6-bfb5-5f04645590c3', 'A', 1, '31e83b5f-05f5-45cc-a74b-69a04f5d9ee4'),
('6dfcb190-8013-44d6-9b86-b40d06f20ac2', 'C++', 1, 'a651761e-2dd1-4c58-8e19-75346d13668d'),
('74beea45-0549-45e4-a6e5-0705827cc755', '3', 0, '5424d241-3874-4a27-aac7-667aee76c7da'),
('752ebc0a-0a3c-4cd6-b6a0-0e31a8fa2ea9', 'D', 0, 'c376c24f-6838-43bb-850f-a93edea64c30'),
('80e91a97-b0ab-4ab1-a8b8-7966106575de', 'B', 0, 'c376c24f-6838-43bb-850f-a93edea64c30'),
('87ed9722-d2b5-4166-9d54-092e062c86ae', 'HTML', 0, 'a651761e-2dd1-4c58-8e19-75346d13668d'),
('8b335fe2-e5c3-4009-a2dd-f670fe464f77', 'D', 0, '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6'),
('914760ba-28f9-4023-b036-12997fc5fcc9', '2', 1, '5424d241-3874-4a27-aac7-667aee76c7da'),
('932278ad-d6c0-4853-8e49-9f9f0e6ab8cd', '3', 1, 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45'),
('93b50b62-f111-457b-aad7-f1071e4d0277', 'D', 1, '31e83b5f-05f5-45cc-a74b-69a04f5d9ee4'),
('940d8178-4b72-4c10-a169-d03849598c5a', 'push()', 1, 'add12020-34c1-44f1-be21-b73929c82857'),
('a9a4bafc-839c-4984-94f5-ad58f91b4673', '2', 0, 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45'),
('aa1106d3-0153-44f7-beaa-f679e19e9ac5', '105', 0, '75dd6d24-92ed-4079-b9a1-59923445f77e'),
('b3d783f8-5b35-4ffe-b4b2-f725cd4c16e6', 'B', 0, '31e83b5f-05f5-45cc-a74b-69a04f5d9ee4'),
('d5521ef2-9f0a-4187-94de-c8f67f5b9f89', 'B', 1, '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6'),
('e35d5ca9-936c-40e9-b751-a19e43501f5e', 'Lỗi', 0, '75dd6d24-92ed-4079-b9a1-59923445f77e'),
('e7eeb3eb-48eb-4f9b-83ea-e8808488c167', '510', 1, '75dd6d24-92ed-4079-b9a1-59923445f77e'),
('eca0e35c-1bcb-4e6b-b71f-24dd59125af8', 'C', 1, '31e83b5f-05f5-45cc-a74b-69a04f5d9ee4'),
('f888e374-d873-43a2-9f2a-376cb8209463', '15', 0, '75dd6d24-92ed-4079-b9a1-59923445f77e'),
('fbd777c5-a6b6-4f6c-8643-9756da9d10b3', '4', 0, 'd568bdd8-c8c8-42b3-810b-ee61e9c93a45'),
('o10', 'Mars', 1, 'q4'),
('o11', 'Venus', 0, 'q4'),
('o12', 'Jupiter', 0, 'q4'),
('o13', 'Au', 1, 'q5'),
('o14', 'Ag', 0, 'q5'),
('o15', 'Fe', 0, 'q5'),
('o16', 'Leonardo da Vinci', 1, 'q6'),
('o17', 'Michelangelo', 0, 'q6'),
('o18', 'Raphael', 0, 'q6'),
('o19', 'Pacific Ocean', 1, 'q7'),
('o20', 'Atlantic Ocean', 0, 'q7'),
('o21', 'Indian Ocean', 0, 'q7'),
('o22', '1945', 1, 'q8'),
('o23', '1944', 0, 'q8'),
('o24', '1946', 0, 'q8'),
('o25', 'Tokyo', 1, 'q9'),
('o26', 'Kyoto', 0, 'q9'),
('o27', 'Osaka', 0, 'q9'),
('o28', 'Albert Einstein', 1, 'q10'),
('o29', 'Isaac Newton', 0, 'q10'),
('o30', 'Niels Bohr', 0, 'q10'),
('o37', '8', 1, 'q13'),
('o38', '6', 0, 'q13'),
('o39', '10', 0, 'q13'),
('o40', 'Oxygen', 1, 'q14'),
('o41', 'Gold', 0, 'q14'),
('o42', 'Silver', 0, 'q14'),
('o43', '1789', 1, 'q15'),
('o44', '1776', 0, 'q15'),
('o45', '1804', 0, 'q15'),
('o46', 'Canberra', 1, 'q16'),
('o47', 'Sydney', 0, 'q16'),
('o48', 'Melbourne', 0, 'q16'),
('o49', 'Vincent van Gogh', 1, 'q17'),
('o50', 'Pablo Picasso', 0, 'q17'),
('o51', 'Claude Monet', 0, 'q17'),
('o52', 'Blue Whale', 1, 'q18'),
('o53', 'African Elephant', 0, 'q18'),
('o54', 'Giraffe', 0, 'q18'),
('o55', 'Nitrogen', 1, 'q19'),
('o56', 'Oxygen', 0, 'q19'),
('o57', 'Carbon Dioxide', 0, 'q19'),
('o58', 'Alexander Graham Bell', 1, 'q20'),
('o59', 'Thomas Edison', 0, 'q20'),
('o60', 'Nikola Tesla', 0, 'q20'),
('o64', 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune', 1, 'q22'),
('o65', 'Venus, Earth, Mars, Mercury, Jupiter, Saturn, Uranus, Neptune', 0, 'q22'),
('o66', 'Mercury, Venus, Earth, Mars, Saturn, Jupiter, Uranus, Neptune', 0, 'q22'),
('o67', '2', 1, 'q23'),
('o68', '3', 1, 'q23'),
('o69', '4', 0, 'q23'),
('o7', '4', 1, 'q3'),
('o70', '5', 1, 'q23'),
('o71', '6', 0, 'q23'),
('o72', '7', 1, 'q23'),
('o73', 'World War I', 0, 'q24'),
('o74', 'Moon Landing', 0, 'q24'),
('o75', 'French Revolution', 0, 'q24'),
('o76', 'Fall of the Berlin Wall', 0, 'q24'),
('o77', 'Hydrogen - 1', 1, 'q25'),
('o78', 'Helium - 2', 1, 'q25'),
('o79', 'Carbon - 6', 1, 'q25'),
('o8', '3', 0, 'q3'),
('o80', 'Oxygen - 8', 1, 'q25'),
('o9', '5', 0, 'q3');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `assignment_id` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `content`, `assignment_id`, `created_at`) VALUES
('31e83b5f-05f5-45cc-a74b-69a04f5d9ee4', 'Testinh', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 23:01:43'),
('5424d241-3874-4a27-aac7-667aee76c7da', 'Test', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 23:01:15'),
('5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6', 'My Quiz', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '2024-11-09 16:32:01'),
('75dd6d24-92ed-4079-b9a1-59923445f77e', 'Kết quả của biểu thức 5 + \"10\" trong JavaScript là gì?', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-09 00:52:20'),
('a651761e-2dd1-4c58-8e19-75346d13668d', 'Ngôn ngữ nào dưới đây là ngôn ngữ lập trình hướng đối tượng?', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('add12020-34c1-44f1-be21-b73929c82857', 'Trong JavaScript, phương thức nào dưới đây dùng để thêm một phần tử vào cuối của một mảng?', 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('c376c24f-6838-43bb-850f-a93edea64c30', 'New question', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 22:58:47'),
('d568bdd8-c8c8-42b3-810b-ee61e9c93a45', 'New Question', '9e826f42-cdbd-4051-9f87-a6fa6da7756e', '2024-11-11 20:11:29'),
('q10', 'Who developed the theory of relativity?', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q13', 'What is the square root of 64?', 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q14', 'Which element has the chemical symbol \"O\"?', 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q15', 'In what year did the French Revolution begin?', 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q16', 'What is the capital of Australia?', 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q17', 'Who painted \"The Starry Night\"?', 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q18', 'What is the largest mammal on Earth?', 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q19', 'What is the main component of the Earth atmosphere?', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q20', 'Who is credited with inventing the telephone?', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q22', 'What is the correct order of planets from the Sun?', 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q23', 'Select all prime numbers from the list:', 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q24', 'Arrange the following events in chronological order:', 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q25', 'Match the element to its correct atomic number:', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q3', 'What is 2 + 2?', 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q4', 'Which planet is known as the Red Planet?', 'a2d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q5', 'What is the chemical symbol for gold?', 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q6', 'Who painted the Mona Lisa?', 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q7', 'What is the largest ocean on Earth?', 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q8', 'In which year did World War II end?', 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04'),
('q9', 'What is the capital of Japan?', 'a5d1e4f1-223b-4cdd-9f0e-0123456789ab', '2024-11-08 17:27:04');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Dh7RZEk2P6JPL2N01_DfuUKh7z342Pof', 1731969747, '{\"cookie\":{\"originalMaxAge\":10800000,\"expires\":\"2024-11-18T22:41:59.675Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"passport\":{\"user\":{\"id\":\"8f2e6682-dc87-484f-929b-abac2e193963\",\"googleId\":null,\"email\":\"21020425@vnu.edu.vn\",\"hash_password\":\"$2b$10$omQrH5lNMvwvpzt1kWKVC.8YsUOb/BYIb6LRrmnKfJh/Pra1Z..P2\",\"auth_type\":\"local\",\"username\":\"21020425\",\"role\":\"Student\",\"name\":\"21020425 Phạm Minh Vương\",\"phone\":null,\"about\":null,\"birthday\":null,\"avatar_url\":\"https://lh3.googleusercontent.com/a/ACg8ocJpyghwyPptuWuJyOY6dbmZZ3jysRGpFEtN-tapQpbfIQYRPIYv=s96-c\",\"specialization\":\"\",\"authCode\":null,\"authCodeExpires\":null,\"isVerify\":null,\"isActivate\":false}},\"flash\":{},\"user\":{\"id\":\"531fcba4-b7cd-45da-8ec3-184b8e88e949\",\"googleId\":null,\"email\":\"admin@smart-edu.com\",\"hash_password\":\"$2b$10$DjxAkWALpyHKWtdxyxCwYO4l5ZF7jyRcRTBr56OOruPLelb8El.cy\",\"auth_type\":\"local\",\"username\":\"admin\",\"role\":\"Admin\",\"name\":\"Admin\",\"phone\":null,\"about\":\"Administrator of the e-learning system\",\"birthday\":null,\"avatar_url\":\"https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg\",\"specialization\":\"\",\"authCode\":\"191979\",\"authCodeExpires\":\"2024-11-11T12:42:20.000Z\",\"isVerify\":true,\"isActivate\":true}}'),
('LnAmWGi7H6aXM0BP683lA1HpgFVeI_yb', 1731954322, '{\"cookie\":{\"originalMaxAge\":10800000,\"expires\":\"2024-11-18T15:32:05.906Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"flash\":{},\"user\":{\"id\":\"531fcba4-b7cd-45da-8ec3-184b8e88e949\",\"googleId\":null,\"email\":\"admin@smart-edu.com\",\"hash_password\":\"$2b$10$DjxAkWALpyHKWtdxyxCwYO4l5ZF7jyRcRTBr56OOruPLelb8El.cy\",\"auth_type\":\"local\",\"username\":\"admin\",\"role\":\"Admin\",\"name\":\"Admin\",\"phone\":null,\"about\":\"Administrator of the e-learning system\",\"birthday\":null,\"avatar_url\":\"https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg\",\"specialization\":\"\",\"authCode\":\"191979\",\"authCodeExpires\":\"2024-11-11T12:42:20.000Z\",\"isVerify\":true}}'),
('vJhNfhA6lu2IfDKffq83iS1NAtZjmukM', 1732527256, '{\"cookie\":{\"originalMaxAge\":10800000,\"expires\":\"2024-11-25T09:33:50.204Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"flash\":{},\"user\":{\"id\":\"531fcba4-b7cd-45da-8ec3-184b8e88e949\",\"googleId\":null,\"email\":\"admin@smart-edu.com\",\"hash_password\":\"$2b$10$DjxAkWALpyHKWtdxyxCwYO4l5ZF7jyRcRTBr56OOruPLelb8El.cy\",\"auth_type\":\"local\",\"username\":\"admin\",\"role\":\"Admin\",\"name\":\"Admin\",\"phone\":null,\"about\":\"Administrator of the e-learning system\",\"birthday\":null,\"avatar_url\":\"https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg\",\"specialization\":\"\",\"authCode\":\"191979\",\"authCodeExpires\":\"2024-11-11T12:42:20.000Z\",\"isVerify\":true,\"isActivate\":true}}');

-- --------------------------------------------------------

--
-- Table structure for table `student_lesson`
--

CREATE TABLE `student_lesson` (
  `id` varchar(36) NOT NULL,
  `done` tinyint(4) NOT NULL DEFAULT 0,
  `student_id` varchar(36) NOT NULL,
  `lesson_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_lesson`
--

INSERT INTO `student_lesson` (`id`, `done`, `student_id`, `lesson_id`) VALUES
('0181a588-e96d-432c-8ffa-ca702c7ce00e', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l27d1e4f1-223b-4cdd-9f0e-0123456789a'),
('0e97f617-f35b-4716-92d6-5ebf57c1126a', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l6d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('1dd5e3ed-2f4d-47b8-83f5-20f667dc6117', 0, '2bff352d-325d-4e5d-b81c-97593a8285fe', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('248122d6-d0b8-4f91-8d0a-9580105edf38', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('2fd173b0-68e3-4503-b30b-66fd06d9ee35', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l23d1e4f1-223b-4cdd-9f0e-0123456789a'),
('31323df8-864d-4629-88f0-cbd1cb10d5b7', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('36be9b2a-e32d-490d-a029-6d1ddc9af23f', 0, '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'l8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('3ac7674e-6f32-4a7c-8a9a-9c363695c2bc', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('3da83842-929f-4a02-bd49-8d39a97312bf', 1, '8f2e6682-dc87-484f-929b-abac2e193963', 'l23d1e4f1-223b-4cdd-9f0e-0123456789a'),
('408580d3-788e-4c45-943b-a06c2d17f8c6', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l19d1e4f1-223b-4cdd-9f0e-0123456789a'),
('5187539c-1017-43d9-a59c-b2d95780e0ad', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l26d1e4f1-223b-4cdd-9f0e-0123456789a'),
('54a28521-0d07-457c-afc4-740d7c9a8415', 0, '2bff352d-325d-4e5d-b81c-97593a8285fe', 'l25d1e4f1-223b-4cdd-9f0e-0123456789a'),
('558965f8-dd29-48a7-b0a1-470a67c7b188', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'b299da16-e0d5-420b-b2e8-899a9c9a02a3'),
('5a14e767-7e14-4e6c-a509-e4237a95c896', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('5f7264e5-b00b-4038-b4cb-846b513c9c80', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l11d1e4f1-223b-4cdd-9f0e-0123456789a'),
('60a2334c-d26f-4cc9-b5a2-feb9dff0fc30', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l24d1e4f1-223b-4cdd-9f0e-0123456789a'),
('62dd9b51-583c-4722-b5b8-590abefd25e9', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('6602e96f-ced3-4a35-a3a0-c282c67831f8', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l6d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('83900e0a-63e8-4aa2-9096-9fd3fc110239', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('8c02a383-6716-4df5-b2cb-1e22e729029e', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'b299da16-e0d5-420b-b2e8-899a9c9a02a3'),
('8cabe3ed-53bf-4cf0-a7c1-19221a83b85d', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('95fbeba1-de7b-4c7e-8a15-398d730a59aa', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l24d1e4f1-223b-4cdd-9f0e-0123456789a'),
('971ecd84-f1c9-467d-b5ed-254d50376ff6', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'b299da16-e0d5-420b-b2e8-899a9c9a02a3'),
('98631bbb-f03a-450b-acde-45bd535abb21', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('a338add9-2c73-47b2-936b-64e12b6e31b9', 0, '2bff352d-325d-4e5d-b81c-97593a8285fe', 'l17d1e4f1-223b-4cdd-9f0e-0123456789a'),
('a3ac0d27-6b0a-4615-b091-8005b804ec0a', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l18d1e4f1-223b-4cdd-9f0e-0123456789a'),
('a61282a7-fb83-4cd6-9848-613e41a28791', 0, '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'l10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('a6cc0ac1-14ba-4d3d-a7bc-66d25e3d1a91', 0, '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'l12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('a6dfdcd4-836f-4288-8e6f-876ab74fb061', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l17d1e4f1-223b-4cdd-9f0e-0123456789a'),
('a72fa5e2-3aaf-4565-b4e5-162abb7d2d3a', 1, '8f2e6682-dc87-484f-929b-abac2e193963', '73cd077e-8ea2-4068-8081-c5f4306ffe4c'),
('a80c2f3c-1502-4e57-8bc6-492fbcd930b8', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l2d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('ade96438-386e-48b5-9ff3-bdb8e36da565', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l27d1e4f1-223b-4cdd-9f0e-0123456789a'),
('bd1955d7-075d-4cd0-9c39-cb348d2e1d44', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c020324a-b755-4c30-8105-479cb2716f3e', 1, '8f2e6682-dc87-484f-929b-abac2e193963', 'l1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('c48e23a0-ae77-4d48-8961-75aa14d790ff', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l16d1e4f1-223b-4cdd-9f0e-0123456789a'),
('cc173c11-24de-44e9-bd2c-833b6741ce71', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('cc883549-be93-464f-beb5-f9a65e0e2118', 0, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l19d1e4f1-223b-4cdd-9f0e-0123456789a'),
('d264fe59-1cd3-45ac-927b-919fe45736ec', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('daa82a6c-2b02-481f-b5c7-83dc02163b1d', 1, '378e1954-1a85-458b-bfa1-d904070f1d58', 'l25d1e4f1-223b-4cdd-9f0e-0123456789a'),
('e3ce98f3-473f-4b30-a38e-6daad8eb31ec', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l17d1e4f1-223b-4cdd-9f0e-0123456789a'),
('e9c53a78-2d86-4b6f-a4bf-7449f3e58573', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l25d1e4f1-223b-4cdd-9f0e-0123456789a'),
('f1339945-e702-4f36-9f6e-b46d1bc67164', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('f5f5254d-d3f5-4f11-81fe-b4b69c13174e', 0, '7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'l27d1e4f1-223b-4cdd-9f0e-0123456789a'),
('ffb8c903-ab65-4290-819e-0f802fe26293', 0, '8f2e6682-dc87-484f-929b-abac2e193963', 'l18d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl10d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l10d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl11d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l11d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl12d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l12d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl1d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l1d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl21d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l13d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl22d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l14d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl23d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l15d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl24d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l16d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl25d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l17d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl26d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l18d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl27d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l19d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl28d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l20d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl29d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l21d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl2d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l2d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl30d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l22d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl31d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l23d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl32d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l24d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl33d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l25d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl34d1e4f1-223b-4cdd-9f0e-0123456789', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l26d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl35d1e4f1-223b-4cdd-9f0e-0123456789', 0, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l27d1e4f1-223b-4cdd-9f0e-0123456789a'),
('sl3d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l3d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl4d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l4d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl5d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l5d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl6d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l6d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl7d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl8d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l8d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('sl9d1e4f1-223b-4cdd-9f0e-0123456789a', 1, '5877df58-ad78-4833-8b04-175e72b6e3db', 'l9d1e4f1-223b-4cdd-9f0e-0123456789ab');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hash_password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role` enum('Admin','Instructor','Student','Pending Approval') NOT NULL DEFAULT 'Student',
  `name` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `specialization` enum('Software Engineering','Data Science','Cyber Security','Networking','AI Machine Learning','None') NOT NULL DEFAULT 'None',
  `googleId` varchar(255) DEFAULT NULL,
  `auth_type` enum('local','google','facebook','github') NOT NULL DEFAULT 'local',
  `authCode` varchar(255) DEFAULT NULL,
  `authCodeExpires` datetime DEFAULT NULL,
  `isVerify` tinyint(4) DEFAULT NULL,
  `isActivate` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `hash_password`, `username`, `role`, `name`, `birthday`, `avatar_url`, `phone`, `about`, `specialization`, `googleId`, `auth_type`, `authCode`, `authCodeExpires`, `isVerify`, `isActivate`) VALUES
('00e813f9-59f4-40aa-bd60-1825d7606314', 'nguyen.quang.anh@smart-edu.com', '$2b$10$cBvpEOwiSgshDbkhyi1.h.chwJDUydU9eXXcU1rAAwuu4utoCSIqC', 'anhnq', 'Instructor', 'Nguyen Quang Anh', '2003-11-26', 'https://wallpapers-clan.com/wp-content/uploads/2024/04/avatar-the-last-airbender-aang-beautiful-desktop-wallpaper-preview.jpg', NULL, 'Data Engineer', '', NULL, 'local', NULL, NULL, NULL, 1),
('123878ff-cd3d-4c94-aee3-cab0e0f6b27e', 'phamminhv26@gmail.com', '$2b$10$WUum/TayekSCg7P2Guq69.aX02txwngO6Mfmo7uuMf6MdErhHjcwS', 'pmv', 'Instructor', 'Pham Minh Vuong', NULL, 'https://img.freepik.com/premium-photo/teacher-man-avatar-icon-illustration-vector-style_131965-789.jpg', NULL, 'Fullstack Engineer', '', NULL, 'local', NULL, NULL, NULL, 1),
('2bff352d-325d-4e5d-b81c-97593a8285fe', 'pham.minh.vuong.vnu@gmail.com', '$2b$10$uyQC3pS4ORpg/TuRFYeQE.k/tTz8yIsub1ZZ1mnoMDTmnBlSbnUe.', 'Vuong', 'Student', 'Vuong Pham Minh', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJTimKMnz4KSTMJ6KZoNS6RQFQt3crUBj0BbcCYfaAFDBnSFn8=s96-c', NULL, NULL, '', NULL, 'local', NULL, NULL, NULL, 1),
('378e1954-1a85-458b-bfa1-d904070f1d58', 'hoa.student@smart-edu.com', '$2b$10$icM9rab8qK4mTumhXFIhMOGVay16oCHZkArBfWnXhpJ4H/z9NhaWK', 'hoastudent', 'Student', 'Nguyen Xuan Hoa', NULL, NULL, NULL, NULL, '', NULL, 'local', NULL, NULL, NULL, 1),
('531fcba4-b7cd-45da-8ec3-184b8e88e949', 'admin@smart-edu.com', '$2b$10$DjxAkWALpyHKWtdxyxCwYO4l5ZF7jyRcRTBr56OOruPLelb8El.cy', 'admin', 'Admin', 'Admin', NULL, 'https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg', NULL, 'Administrator of the e-learning system', '', NULL, 'local', '191979', '2024-11-11 19:42:20', 1, 1),
('54a859af-3995-441b-9537-695ae8215f7f', 'pham.minh.vuong@smart-edu.com', '$2b$10$BLbF9caDi4vwDoamEtdRJu.3P8eDhwDXlZrq3j8LBHvuA2nsezIjm', 'Pham', 'Student', 'Pham Minh Vuong', NULL, 'https://png.pngtree.com/png-vector/20240204/ourlarge/pngtree-avatar-job-student-flat-portrait-of-man-png-image_11606889.png', NULL, NULL, '', NULL, 'local', NULL, NULL, NULL, 1),
('5877df58-ad78-4833-8b04-175e72b6e3db', 'pham.minh.vuong@smart-edu.vn', '$2b$10$WG07nnnu2oTuocMBH.j99.GUsqMfsgtPvyQExBp3pFivu.VaeZlzG', 'vuongpm', 'Student', 'Pham Minh Vuong', '2003-07-11', 'https://res.cloudinary.com/deo4yrltl/image/upload/v1728870304/avatars/s8wrycortcufizkbg1mq.jpg', '', '', '', NULL, 'local', '982558', '2024-11-04 23:00:30', 1, 1),
('6f3ffac2-de66-47bd-baaf-eb14ae1f1a15', 'new@gmail.com', '$2b$10$wraplDzyaa/ptpsBJdq55uE2U0Wm/jSMirxr7XjdRY//1taXozdWO', 'new-instructor', 'Pending Approval', 'New Instructor', NULL, NULL, NULL, '', 'None', NULL, 'local', '307982', '2024-11-25 13:14:01', 1, 1),
('7b1719e9-338a-4f8e-a8e3-918c8f9663c3', 'quang.anh.student@smart-edu.com', '$2b$10$8Am90XB9ErV./evmEAvlgubarZXfz1euBTqUuIsXrxu.5vZ6Vyosm', 'quanganh', 'Student', 'Nguyen Quang Anh', NULL, NULL, NULL, NULL, '', NULL, 'local', NULL, NULL, NULL, 1),
('8f2e6682-dc87-484f-929b-abac2e193963', '21020425@vnu.edu.vn', '$2b$10$omQrH5lNMvwvpzt1kWKVC.8YsUOb/BYIb6LRrmnKfJh/Pra1Z..P2', '21020425', 'Student', '21020425 Phạm Minh Vương', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJpyghwyPptuWuJyOY6dbmZZ3jysRGpFEtN-tapQpbfIQYRPIYv=s96-c', NULL, NULL, '', NULL, 'local', NULL, NULL, NULL, 1),
('ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce', 'zuanki@gmail.com', '$2b$10$dzOiO8hEwb/gjc4uPgaMWudDud43ta32ObURJP/WuWALjrk/CKYa2', 'hoanx', 'Instructor', 'Nguyen Xuan Hoa', '2003-07-31', 'https://res.cloudinary.com/deo4yrltl/image/upload/v1728872310/avatars/tixe0fsihuvvntrgsfny.png', '0123456789', 'AI Engineer', '', NULL, 'local', '792367', '2024-11-04 15:17:12', 1, 1),
('b6281679-02c0-4543-a7fb-210429105267', 'harry@gmail.com', '$2b$10$4vkwdob2tienYniKNc3AiOQbf7.evvwc7H9LH4StoNVAkGy3r5ulK', 'Tom', 'Student', 'My Tom', NULL, NULL, NULL, NULL, '', NULL, 'local', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `forums`
--

CREATE TABLE `forums` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `hidden` tinyint(4) NOT NULL,
  `course_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forums`
--

INSERT INTO `forums` (`id`, `title`, `content`, `created_at`, `hidden`, `course_id`) VALUES
('cb829160-569d-4f76-b65a-01ee373fc574', 'My forum', 'Notifications for students', '2024-11-29 01:54:34', 0, 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab'),
('ec75341a-b565-47f8-9c56-6215013a2735', 'New discussion', 'Đăng ký chấm điểm bài tập lớn', '2024-11-29 11:31:46', 0, 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(36) NOT NULL,
  `forum_id` varchar(36) NOT NULL,
  `parent_comment_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `created_at`, `user_id`, `forum_id`, `parent_comment_id`) VALUES
('04d01783-8462-4e27-9cc0-b57a8f10d47c', 'Pham Minh Vuong', '2024-11-29 16:52:14', '8f2e6682-dc87-484f-929b-abac2e193963', 'cb829160-569d-4f76-b65a-01ee373fc574', 'e7336e09-90d5-4091-88ad-8befb7192f14'),
('56f6db80-e25c-4975-a751-f434f8446415', 'Reply comment', '2024-11-29 16:11:59', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', 'cb829160-569d-4f76-b65a-01ee373fc574', '9a4f9203-7618-438d-9d89-152073b76bad'),
('5e650f71-1013-4e71-8c65-acdbf1fe8d6b', 'vuongpm@gmail.com', '2024-11-29 19:28:13', '8f2e6682-dc87-484f-929b-abac2e193963', 'cb829160-569d-4f76-b65a-01ee373fc574', 'e7336e09-90d5-4091-88ad-8befb7192f14'),
('84b00810-b7f7-4a98-9b7c-3336cccbaedb', 'Notification comment', '2024-11-29 17:32:44', '8f2e6682-dc87-484f-929b-abac2e193963', 'cb829160-569d-4f76-b65a-01ee373fc574', NULL),
('9a4f9203-7618-438d-9d89-152073b76bad', 'My comment', '2024-11-29 12:54:15', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', 'cb829160-569d-4f76-b65a-01ee373fc574', NULL),
('d491a73a-cced-4a6c-bb31-cb346eaf3816', 'Oke good', '2024-11-29 16:49:11', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', 'cb829160-569d-4f76-b65a-01ee373fc574', 'e7336e09-90d5-4091-88ad-8befb7192f14'),
('e7336e09-90d5-4091-88ad-8befb7192f14', 'New comment', '2024-11-29 16:03:47', '123878ff-cd3d-4c94-aee3-cab0e0f6b27e', 'cb829160-569d-4f76-b65a-01ee373fc574', NULL);

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5599e6557440fcc9a843e62b99b` (`student_id`),
  ADD KEY `FK_677120094cf6d3f12df0b9dc5d3` (`question_id`),
  ADD KEY `FK_67e979b8942acc80137116b6f12` (`option_id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_33f833f305070d2d4e6305d8a0` (`course_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_53507595a85e67bfa5c8206799` (`assignment_id`),
  ADD KEY `FK_4fdc83dd6b261101401ec259342` (`instructor_id`),
  ADD KEY `FK_3d51c7bc0a2aa26907d7b0e4a51` (`sub_instructor_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_307813fe255896d6ebf3e6cd55c` (`student_id`),
  ADD KEY `FK_b79d0bf01779fdf9cfb6b092af3` (`course_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_361ad24212a796fb219e19b3f08` (`assignment_id`),
  ADD KEY `FK_9acca493883cee3b9e8f9e01cd1` (`student_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lesson_course`
--
ALTER TABLE `lesson_course`
  ADD PRIMARY KEY (`course_id`,`lesson_id`),
  ADD KEY `IDX_42a784f3dab0ad201b5d4bb33a` (`course_id`),
  ADD KEY `IDX_24723c8385d4fb37f5492757b1` (`lesson_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2bdd03245b8cb040130fe16f21d` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_fd156d20b66a5f26eed9cac60dc` (`assignment_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `student_lesson`
--
ALTER TABLE `student_lesson`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ee05e947a4876f2cb6f20e5ad37` (`student_id`),
  ADD KEY `FK_1b1e669a97eabf06df2012766b9` (`lesson_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  ADD UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`);

--
-- Indexes for table `forums`
--
ALTER TABLE `forums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a5d077d153111a52670f747cf4f` (`course_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4309ad990ed370dcf2f94e7df0a` (`forum_id`),
  ADD KEY `FK_4c675567d2a58f0b07cef09c13d` (`user_id`),
  ADD KEY `FK_93ce08bdbea73c0c7ee673ec35a` (`parent_comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `FK_5599e6557440fcc9a843e62b99b` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_677120094cf6d3f12df0b9dc5d3` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_67e979b8942acc80137116b6f12` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `FK_33f833f305070d2d4e6305d8a0c` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `FK_3d51c7bc0a2aa26907d7b0e4a51` FOREIGN KEY (`sub_instructor_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4fdc83dd6b261101401ec259342` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_53507595a85e67bfa5c8206799a` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `FK_307813fe255896d6ebf3e6cd55c` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b79d0bf01779fdf9cfb6b092af3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `FK_361ad24212a796fb219e19b3f08` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9acca493883cee3b9e8f9e01cd1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `lesson_course`
--
ALTER TABLE `lesson_course`
  ADD CONSTRAINT `FK_24723c8385d4fb37f5492757b1a` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_42a784f3dab0ad201b5d4bb33a5` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `FK_2bdd03245b8cb040130fe16f21d` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `FK_fd156d20b66a5f26eed9cac60dc` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `student_lesson`
--
ALTER TABLE `student_lesson`
  ADD CONSTRAINT `FK_1b1e669a97eabf06df2012766b9` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ee05e947a4876f2cb6f20e5ad37` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

--
-- Constraints for table `forums`
--
ALTER TABLE `forums`
  ADD CONSTRAINT `FK_a5d077d153111a52670f747cf4f` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_4309ad990ed370dcf2f94e7df0a` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4c675567d2a58f0b07cef09c13d` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_93ce08bdbea73c0c7ee673ec35a` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
