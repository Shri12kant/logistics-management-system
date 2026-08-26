-- Insert admin user directly into database
-- Password 'admin123' will be encoded by BCrypt
-- For testing purposes, we'll use a known BCrypt hash for 'admin123'

USE pragya_shipping;

-- Clear existing admin with same email
DELETE FROM admin WHERE email = 'admin@pragyashipping.com';

-- Insert admin user
-- BCrypt hash for 'admin123' (generated with BCryptPasswordEncoder)
INSERT INTO admin (username, email, password, role) 
VALUES ('admin', 'admin@pragyashipping.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'ADMIN');

SELECT * FROM admin WHERE email = 'admin@pragyashipping.com';
