--This file is for setting up the database of the app

-- Create database
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania;
USE groupomania;

--Create users table
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = INNODB;

--Create posts table
CREATE TABLE IF NOT EXISTS posts(
    post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    title VARCHAR(150) NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    user_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = INNODB;

--Create comments table
CREATE TABLE IF NOT EXISTS comments(
    comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
) ENGINE = INNODB;

--Insert admin user. Password is : 'adminpass'
INSERT INTO users (email, name, password, is_admin) VALUES ('admin@groupomania.com', 'Groupomania', '$2b$10$4JckKr6DhpUC3b1kZbl.WeRVt41ukAoyIvWZ8ePr5T7hWsy9woWHC', '1');
