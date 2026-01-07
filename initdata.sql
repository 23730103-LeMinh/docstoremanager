use docstoremanager;
-- DROP TABLE IF EXISTS log_entry;
-- DROP TABLE IF EXISTS document;
-- DROP TABLE IF EXISTS shelf;
-- DROP TABLE IF EXISTS storage;
-- DROP TABLE IF EXISTS user;


-- ===================CREATE TABLES===============
-- Create user table
CREATE TABLE user (
    id VARCHAR(10) PRIMARY KEY,
    username VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL DEFAULT 'password',
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create storage table
CREATE TABLE storage (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create shelf table
CREATE TABLE shelf (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    storage_id VARCHAR(10) NOT NULL,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storage_id) REFERENCES storage(id) ON DELETE CASCADE
);

-- Create document table
CREATE TABLE document (
    id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    document_type VARCHAR(100) NOT NULL DEFAULT 'report',
    shelf_id VARCHAR(10) NOT NULL,
    storage_id VARCHAR(10) NOT NULL,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shelf_id) REFERENCES shelf(id) ON DELETE CASCADE,
    FOREIGN KEY (storage_id) REFERENCES storage(id) ON DELETE CASCADE
);

-- Create log_entry table
CREATE TABLE log_entry (
    id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    action VARCHAR(255) NOT NULL,
    object_type VARCHAR(255) NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO user (id, username, email, password, full_name, role, date_added) VALUES
('US000001', 'user1', 'user1@example.com', 'password123', 'User One', 'admin', NOW()),
('US000002', 'user2', 'user2@example.com', 'password123', 'User Two', 'user', NOW()),
('US000003', 'user3', 'user3@example.com', 'password123', 'User Three', 'user', NOW()),
('US000004', 'user4', 'user4@example.com', 'password123', 'User Four', 'user', NOW()),
('US000005', 'user5', 'user5@example.com', 'password123', 'User Five', 'user', NOW());


-- Insert 5 storages
INSERT INTO storage (id, name, location, date_added) VALUES
('ST000001', 'Storage 1', 'New York', NOW()),
('ST000002', 'Storage 2', 'Los Angeles', NOW()),
('ST000003', 'Storage 3', 'Chicago', NOW()),
('ST000004', 'Storage 4', 'Houston', NOW()),
('ST000005', 'Storage 5', 'Phoenix', NOW());

-- Insert 5 users with US prefix
INSERT INTO user (id, username, email, password, full_name, role, date_added) VALUES
('US000001', 'user1', 'user1@example.com', 'password123', 'User One', 'admin', NOW()),
('US000002', 'user2', 'user2@example.com', 'password123', 'User Two', 'user', NOW()),
('US000003', 'user3', 'user3@example.com', 'password123', 'User Three', 'user', NOW()),
('US000004', 'user4', 'user4@example.com', 'password123', 'User Four', 'user', NOW()),
('US000005', 'user5', 'user5@example.com', 'password123', 'User Five', 'user', NOW());

-- Insert 5 storages with ST prefix
INSERT INTO storage (id, name, location, date_added) VALUES
('ST000001', 'Storage 1', 'New York', NOW()),
('ST000002', 'Storage 2', 'Los Angeles', NOW()),
('ST000003', 'Storage 3', 'Chicago', NOW()),
('ST000004', 'Storage 4', 'Houston', NOW()),
('ST000005', 'Storage 5', 'Phoenix', NOW());

-- Insert shelves for Storage 1 (5 shelves) with SH prefix
INSERT INTO shelf (id, name, storage_id, date_added) VALUES
('SH000001', 'Shelf 1', 'ST000001', NOW()),
('SH000002', 'Shelf 2', 'ST000001', NOW()),
('SH000003', 'Shelf 3', 'ST000001', NOW()),
('SH000004', 'Shelf 4', 'ST000001', NOW()),
('SH000005', 'Shelf 5', 'ST000001', NOW());

-- Insert shelves for Storage 2 (7 shelves) with SH prefix
INSERT INTO shelf (id, name, storage_id, date_added) VALUES
('SH000006', 'Shelf 1', 'ST000002', NOW()),
('SH000007', 'Shelf 2', 'ST000002', NOW()),
('SH000008', 'Shelf 3', 'ST000002', NOW()),
('SH000009', 'Shelf 4', 'ST000002', NOW()),
('SH000010', 'Shelf 5', 'ST000002', NOW()),
('SH000011', 'Shelf 6', 'ST000002', NOW()),
('SH000012', 'Shelf 7', 'ST000002', NOW());

-- Insert shelves for Storage 3 (4 shelves) with SH prefix
INSERT INTO shelf (id, name, storage_id, date_added) VALUES
('SH000013', 'Shelf 1', 'ST000003', NOW()),
('SH000014', 'Shelf 2', 'ST000003', NOW()),
('SH000015', 'Shelf 3', 'ST000003', NOW()),
('SH000016', 'Shelf 4', 'ST000003', NOW());

-- Insert shelves for Storage 4 (6 shelves) with SH prefix
INSERT INTO shelf (id, name, storage_id, date_added) VALUES
('SH000017', 'Shelf 1', 'ST000004', NOW()),
('SH000018', 'Shelf 2', 'ST000004', NOW()),
('SH000019', 'Shelf 3', 'ST000004', NOW()),
('SH000020', 'Shelf 4', 'ST000004', NOW()),
('SH000021', 'Shelf 5', 'ST000004', NOW()),
('SH000022', 'Shelf 6', 'ST000004', NOW());

-- Insert shelves for Storage 5 (8 shelves) with SH prefix
INSERT INTO shelf (id, name, storage_id, date_added) VALUES
('SH000023', 'Shelf 1', 'ST000005', NOW()),
('SH000024', 'Shelf 2', 'ST000005', NOW()),
('SH000025', 'Shelf 3', 'ST000005', NOW()),
('SH000026', 'Shelf 4', 'ST000005', NOW()),
('SH000027', 'Shelf 5', 'ST000005', NOW()),
('SH000028', 'Shelf 6', 'ST000005', NOW()),
('SH000029', 'Shelf 7', 'ST000005', NOW()),
('SH000030', 'Shelf 8', 'ST000005', NOW());

-- Insert 40 documents per shelf with DC prefix
-- Documents for Shelf 1 (SH000001)
INSERT INTO document (id, title, document_type, shelf_id, storage_id, date_added) VALUES
('DC000001', 'Document 1 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000002', 'Document 2 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000003', 'Document 3 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000004', 'Document 4 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000005', 'Document 5 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000006', 'Document 6 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000007', 'Document 7 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000008', 'Document 8 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000009', 'Document 9 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000010', 'Document 10 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000011', 'Document 11 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000012', 'Document 12 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000013', 'Document 13 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000014', 'Document 14 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000015', 'Document 15 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000016', 'Document 16 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000017', 'Document 17 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000018', 'Document 18 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000019', 'Document 19 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000020', 'Document 20 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000021', 'Document 21 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000022', 'Document 22 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000023', 'Document 23 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000024', 'Document 24 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000025', 'Document 25 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000026', 'Document 26 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000027', 'Document 27 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000028', 'Document 28 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000029', 'Document 29 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000030', 'Document 30 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000031', 'Document 31 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000032', 'Document 32 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000033', 'Document 33 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000034', 'Document 34 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000035', 'Document 35 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000036', 'Document 36 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW()),
('DC000037', 'Document 37 - Shelf 1', 'report', 'SH000001', 'ST000001', NOW()),
('DC000038', 'Document 38 - Shelf 1', 'invoice', 'SH000001', 'ST000001', NOW()),
('DC000039', 'Document 39 - Shelf 1', 'contract', 'SH000001', 'ST000001', NOW()),
('DC000040', 'Document 40 - Shelf 1', 'memo', 'SH000001', 'ST000001', NOW());

-- Insert log entries with LG prefix (sample logs)
INSERT INTO log_entry (id, user_id, action, object_type, timestamp) VALUES
('LG000001', 'US000001', 'added', 'storage', NOW()),
('LG000002', 'US000002', 'added', 'shelf', NOW()),
('LG000003', 'US000003', 'viewed', 'document', NOW()),
('LG000004', 'US000001', 'updated', 'document', NOW()),
('LG000005', 'US000004', 'deleted', 'document', NOW());