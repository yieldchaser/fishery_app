ALTER TABLE feed_catalog ADD COLUMN IF NOT EXISTS shop_url VARCHAR(1024);

UPDATE feed_catalog SET shop_url = 'https://dir.indiamart.com/impcat/godrej-fish-feed.html' WHERE name = 'Premium Floating Fish Feed (24%)';
UPDATE feed_catalog SET shop_url = 'https://dir.indiamart.com/impcat/cp-fish-feed.html' WHERE name = 'High Protein Floating Feed (28%)';
UPDATE feed_catalog SET shop_url = 'https://dir.indiamart.com/impcat/fish-feed.html' WHERE name = 'Standard Sinking Feed (20%)';
UPDATE feed_catalog SET shop_url = 'https://dir.indiamart.com/impcat/avanti-shrimp-feed.html' WHERE name LIKE 'Shrimp%';
UPDATE feed_catalog SET shop_url = 'https://dir.indiamart.com/impcat/rice-bran.html' WHERE name = 'Organic Rice Bran';
UPDATE feed_catalog SET shop_url = 'https://dir.indiamart.com/impcat/mustard-oil-cake.html' WHERE name = 'Mustard Oil Cake';

-- Add a few more
INSERT INTO feed_catalog (name, brand, feed_type, protein_percent, fat_percent, cost_per_kg_inr, packaging_size_kg, suitable_for, shop_url) VALUES
('IB Group Floating Fish Feed (32%)', 'IB Group', 'FLOATING', 32.0, 5.0, 52.00, 35, 'Catfish/Pangasius', 'https://dir.indiamart.com/impcat/ib-fish-feed.html'),
('Growel Nutra 40 Shrump Feed', 'Growel Feeds', 'CRUMBLES', 40.0, 8.0, 95.00, 25, 'Vannamei Intensive', 'https://dir.indiamart.com/impcat/growel-fish-feed.html'),
('Godrej Aqua Grower (28% Protein)', 'Godrej Agrovet', 'FLOATING', 28.0, 4.0, 46.00, 40, 'Mixed Carp / Tilapia', 'https://dir.indiamart.com/impcat/godrej-fish-feed.html'),
('Cargill Super Starter Feed (45%)', 'Cargill', 'POWDER', 45.0, 10.0, 110.00, 10, 'Hatchery/Fry Stage', 'https://dir.indiamart.com/impcat/cargill-fish-feed.html'),
('UNO Feeds Sinking Pellet (22%)', 'UNO Feeds', 'SINKING', 22.0, 3.5, 38.00, 50, 'Rohu/Mrigal Grow-out', 'https://dir.indiamart.com/search.mp?ss=UNO+Feeds');
