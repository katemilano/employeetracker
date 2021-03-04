DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT unsigned auto_increment primary key,
    name varchar(30) unique not null
);

CREATE TABLE role (
    id INT unsigned auto_increment primary key,
    title VARCHAR(30) unique NOT NULL,
    salary DECIMAL(10,2),
    department_id INT 
);

CREATE TABLE employee (
    id INT unsigned auto_increment primary key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id DECIMAL(10,2) NULL,
    manager_id INT NULL
);