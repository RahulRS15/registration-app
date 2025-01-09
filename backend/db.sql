CREATE DATABASE registration_db;

USE registration_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  mobileNumber VARCHAR(10) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdDate DATETIME NOT NULL,
  updatedDate DATETIME NOT NULL
);
