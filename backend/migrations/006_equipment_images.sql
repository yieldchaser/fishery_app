ALTER TABLE equipment_catalog ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/YQ/EM/SF/SELLER-96799042/1-hp-paddle-wheel-aerator.jpg' WHERE name = '1HP Paddle Wheel Aerator (2-wheel)';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2021/6/ON/CO/BW/106399283/4-impeller-paddle-wheel-aerator-500x500.png' WHERE name = '2HP Paddle Wheel Aerator (4-wheel)';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2022/2/VO/VK/UB/147321287/automatic-solar-fish-feeder-500x500.jpg' WHERE name = 'Automatic Solar Fish Feeder';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2021/11/WW/OQ/YW/31899120/water-pump.jpg' WHERE name = '2HP Submersible Water Pump';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2022/9/VK/UY/ZN/25692095/5kva-diesel-generator.jpg' WHERE name = '5kVA Silent Diesel Generator';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/YY/JJ/SO/SELLER-2078696/multi-parameter-water-quality-meter.jpg' WHERE name = 'Handheld Multiparameter Water Meter';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/IOS/Default/2022/12/OF/GL/ON/7178040/product-jpeg-500x500.png' WHERE name = 'Digital Dissolved Oxygen (DO) Meter';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2022/1/IE/VK/SW/30017163/fish-harvesting-net-500x500.jpg' WHERE name = 'Pond Seining Net (100m x 3m)';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2022/1/IE/VK/SW/30017163/cast-net-500x500.jpg' WHERE name = 'Cast Net (12ft)';
UPDATE equipment_catalog SET image_url = 'https://5.imimg.com/data5/SELLER/Default/2021/11/RS/GL/UK/140228308/plastic-fish-crate.jpg' WHERE name = 'Fingerling Transport Crate (50L)';
