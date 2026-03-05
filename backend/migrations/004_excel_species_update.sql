
-- Migration to add/update species data from India_Aquaculture_Economics_v2.xlsx

-- Update Scampi (Prawn)
UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 300.0, "capital_investment_lakh_ha": 4.57, "operational_cost_lakh_ha_crop": 16.1, "culture_period_months": 12, "harvest_survival_percent": 70.0, "crops_per_year": 1}'::jsonb,
    'harvest_weight_g', '90 g',
    'stocking_density_ha', '120,000 / Ha'
)
WHERE id = '44444444-4444-4444-4444-444444444444';

-- Update Rohu
UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 100.0, "capital_investment_lakh_ha": 2.61, "operational_cost_lakh_ha_crop": 1.686, "culture_period_months": 6, "harvest_survival_percent": 88.0, "crops_per_year": 2}'::jsonb,
    'harvest_weight_g', '750 g',
    'stocking_density_ha', '10,000 / Ha'
)
WHERE id = '11111111-1111-1111-1111-111111111111';

-- Update Catla
UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 150.0, "capital_investment_lakh_ha": 2.81, "operational_cost_lakh_ha_crop": 2.858, "culture_period_months": 12, "harvest_survival_percent": 70.0, "crops_per_year": 1}'::jsonb,
    'harvest_weight_g', '900 g',
    'stocking_density_ha', '20,000 / Ha'
)
WHERE id = '11111111-1111-1111-1111-111111111112';

-- Add Mrigal
INSERT INTO knowledge_nodes (id, parent_id, node_type, data)
SELECT '11111111-1111-1111-1111-111111111113', '00000000-0000-0000-0000-000000000001', 'SPECIES', 
'{
    "scientific_name": "Cirrhinus mrigala",
    "common_names": {"en": "Mrigal"},
    "category": "EXTRACTED_FROM_EXCEL"
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM knowledge_nodes WHERE id = '11111111-1111-1111-1111-111111111113');

UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 100.0, "capital_investment_lakh_ha": 1.95, "operational_cost_lakh_ha_crop": 1.923, "culture_period_months": 12, "harvest_survival_percent": 80.0, "crops_per_year": 1}'::jsonb,
    'harvest_weight_g', '1200 g',
    'stocking_density_ha', '8,000 / Ha'
)
WHERE id = '11111111-1111-1111-1111-111111111113';

-- Update Pangasius
UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 175.0, "capital_investment_lakh_ha": 3.62, "operational_cost_lakh_ha_crop": 12.4, "culture_period_months": 8, "harvest_survival_percent": 85.0, "crops_per_year": 2}'::jsonb,
    'harvest_weight_g', '800 g',
    'stocking_density_ha', '20,000 / Ha'
)
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Update Vannamei Shrimp
UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 400.0, "capital_investment_lakh_ha": 11.04, "operational_cost_lakh_ha_crop": 18.97, "culture_period_months": 5, "harvest_survival_percent": 70.0, "crops_per_year": 3}'::jsonb,
    'harvest_weight_g', '20 g',
    'stocking_density_ha', '500,000 / Ha'
)
WHERE id = '33333333-3333-3333-3333-333333333333';

-- Update Tilapia
UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 160.0, "capital_investment_lakh_ha": 2.91, "operational_cost_lakh_ha_crop": 5.544, "culture_period_months": 5, "harvest_survival_percent": 85.0, "crops_per_year": 3}'::jsonb,
    'harvest_weight_g', '450 g',
    'stocking_density_ha', '30,000 / Ha'
)
WHERE id = '55555555-5555-5555-5555-555555555555';

-- Add Black Tiger Shrimp
INSERT INTO knowledge_nodes (id, parent_id, node_type, data)
SELECT '33333333-3333-3333-3333-333333333334', '00000000-0000-0000-0000-000000000001', 'SPECIES', 
'{
    "scientific_name": "Penaeus monodon",
    "common_names": {"en": "Black Tiger Shrimp"},
    "category": "EXTRACTED_FROM_EXCEL"
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM knowledge_nodes WHERE id = '33333333-3333-3333-3333-333333333334');

UPDATE knowledge_nodes 
SET data = data || jsonb_build_object(
    'excel_economics', '{"market_price_inr_kg": 600.0, "capital_investment_lakh_ha": 7.68, "operational_cost_lakh_ha_crop": 13.32, "culture_period_months": 5, "harvest_survival_percent": 70.0, "crops_per_year": 2}'::jsonb,
    'harvest_weight_g', '25 g',
    'stocking_density_ha', '200,000 / Ha'
)
WHERE id = '33333333-3333-3333-3333-333333333334';
