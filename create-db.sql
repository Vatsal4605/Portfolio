-- Create Database Script for Dynamic Portfolio
-- Run this script in PostgreSQL to create the database

-- Create the database (run this as a superuser)
CREATE DATABASE portfolio_db;

-- Connect to the database and create the user (if needed)
-- \c portfolio_db;

-- Create a user for the application (optional - you can use existing postgres user)
-- CREATE USER portfolio_user WITH PASSWORD 'your_password';
-- GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;

-- Note: The actual tables will be created by the init.js script
-- This script just creates the database

-- To run this script:
-- 1. Open psql as superuser: sudo -u postgres psql
-- 2. Run: \i create-db.sql
-- 3. Or run: psql -U postgres -f create-db.sql

-- Alternative: Create database from command line
-- createdb -U postgres portfolio_db 