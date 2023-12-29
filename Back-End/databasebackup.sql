--
-- PostgreSQL database cluster dump
--

-- Started on 2023-12-29 05:41:25

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:hn07aIbVhRAX08Ee75k/iA==$otYor9k+w5maSFfyBomMTqJNd2i8EzwPpt3k8Z2D26g=:uUfmL6yRM/sVczzRjGk7MEWl0l8YXYZi4O5/3NTyOXs=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

