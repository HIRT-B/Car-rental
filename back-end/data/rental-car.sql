-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 24 juil. 2025 à 18:05
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rental-car`
--

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` year(4) NOT NULL,
  `licenseplate` varchar(50) DEFAULT NULL,
  `mileage` int(11) DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `status` enum('available','rented','maintenance') DEFAULT 'available',
  `color` varchar(30) DEFAULT NULL,
  `fuel_type` enum('gasoline','diesel','electric','hybrid','other') DEFAULT 'gasoline',
  `transmission` enum('manual','automatic','other') DEFAULT 'manual',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `year`, `licenseplate`, `mileage`, `price`, `status`, `color`, `fuel_type`, `transmission`, `created_at`, `updated_at`, `filename`) VALUES
(1, 'Toyota', 'Corolla', '2020', 'ABC123', 15000, 250.00, 'available', 'Red', 'gasoline', 'automatic', '2025-07-20 18:52:57', '2025-07-20 18:58:21', 'images-1753037901052-102267619.jpg'),
(2, 'Honda', 'Civic', '2019', 'XYZ789', 20000, 230.00, 'rented', 'Blue', 'diesel', 'manual', '2025-07-20 18:52:57', '2025-07-20 18:58:58', 'images-1753037938227-682198589.png'),
(3, 'Tesla', 'Model 3', '2021', 'TESLA3', 5000, 500.00, 'maintenance', 'White', 'electric', 'automatic', '2025-07-20 18:52:57', '2025-07-20 18:59:24', 'images-1753037947786-947750601.png');

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `payment_id` varchar(20) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `car_model` varchar(100) DEFAULT NULL,
  `rental_code` varchar(20) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`id`, `payment_id`, `customer_name`, `car_model`, `rental_code`, `amount`, `payment_method`, `payment_date`, `status`) VALUES
(1, 'PAY001', 'John Smith', 'Toyota Camry', 'R001', 225.00, 'Credit Card', '2025-07-15', 'Completed'),
(2, 'PAY002', 'Sarah Johnson', 'Honda Civic', 'R002', 160.00, 'Cash', '2025-07-14', 'Completed'),
(3, 'PAY003', 'Mike Brown', 'BMW X5', 'R003', 0.00, 'Bank Transfer', '2025-07-18', 'Pending'),
(4, 'PAY004', 'Emily Davis', 'Nissan Altima', 'R004', 400.00, 'Credit Card', '2025-07-21', 'Failed'),
(5, 'PAY005', 'David Wilson', 'Mercedes C-Class', 'R005', 10.00, 'Cash', '2025-07-08', 'Completed');

-- --------------------------------------------------------

--
-- Structure de la table `rentals`
--

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `rental_date` date NOT NULL,
  `return_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('active','completed','inprocess','cancelled') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','client') DEFAULT 'client',
  `status` enum('active','inactive','pending','banned') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `phone`, `password`, `role`, `status`, `created_at`, `updated_at`, `address`) VALUES
(4, 'bouchra hirt', 'hirt@gmail.com', '0604089575', '$2b$10$v8EPCQkvaTUDnPw5xZZys.h5CJ6ysqDd5Fs8G7HgFtLdS40NRQOem', 'admin', 'active', '2025-07-23 16:39:56', '2025-07-23 21:43:53', 'hay tichibit'),
(9, 'zakaria out', 'zakaria@gmail.com', '0607235874', '$2b$10$f2bOLcN/wUG4qtFlqTcNrO0zoB3mYqGdmgCUMq9pI/6HWYtGV5d62', 'admin', 'active', '2025-07-24 15:47:34', '2025-07-24 15:50:39', 'oulbachir'),
(10, 'ali ', 'ali@gmai.com', '06259874', '$2b$10$7yoKu8WRSOiPxXSOuivPhesU5PCoCuKYDlrgo.l1I5m42r.htUWe2', 'client', 'active', '2025-07-24 16:01:45', '2025-07-24 16:01:45', 'tichibit');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_plate` (`licenseplate`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rentals_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
