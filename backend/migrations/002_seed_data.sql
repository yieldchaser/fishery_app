-- ============================================================================
-- Fishing God Platform - Seed Data
-- Hardcoded biological and economic parameters for Indian aquaculture
-- ============================================================================

-- ============================================================================
-- ROOT NODE
-- ============================================================================

INSERT INTO knowledge_nodes (id, node_type, data) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'SYSTEM',
    '{
        "name": "Fishing God Knowledge Base",
        "version": "1.0.0",
        "description": {
            "en": "Comprehensive aquaculture intelligence for Indian subcontinent",
            "hi": "भारतीय उपमहाद्वीप के लिए व्यापक जलकृषि बुद्धि",
            "bn": "ভারতীয় উপমহাদেশের জন্য সমগ্র জলচাষ বুদ্ধিমত্তা"
        }
    }'::jsonb
);

-- ============================================================================
-- SPECIES DATA - INDIAN MAJOR CARPS (Rohu, Catla, Mrigal)
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000001',
    'SPECIES',
    '{
        "scientific_name": "Labeo rohita",
        "common_names": {
            "en": "Rohu",
            "hi": "रोहू",
            "bn": "রুই",
            "te": "రోహు",
            "ta": "ரோகு",
            "ml": "രോഹു",
            "kn": "ರೋಹು"
        },
        "category": "INDIAN_MAJOR_CARP",
        "optimal_systems": ["TRADITIONAL_POND", "BIOFLOC"],
        "biological_parameters": {
            "temperature_celsius": {"min": 25.0, "max": 32.0},
            "dissolved_oxygen_mg_l": {"min": 5.0},
            "ph_range": {"min": 6.5, "max": 8.5},
            "salinity_tolerance_ppt": {"min": 0.0, "max": 2.0},
            "total_alkalinity_ppm": {"min": 50.0, "max": 200.0},
            "ammonia_tolerance_mg_l": {"max": 0.1},
            "nitrite_tolerance_mg_l": {"max": 0.5},
            "hardness_ppm": {"min": 50.0, "max": 300.0}
        },
        "economic_parameters": {
            "feed_conversion_ratio": {"min": 1.35, "max": 1.74},
            "expected_yield_mt_per_acre": {"min": 3.0, "max": 5.0},
            "market_price_per_kg_inr": {"min": 120.0, "max": 180.0},
            "feed_protein_requirements": {
                "traditional": 18,
                "optimal_pellet": 22,
                "grower": 28
            },
            "survival_rate_percent": {"min": 70.0, "max": 85.0}
        },
        "culture_period_months": {"min": 8, "max": 10},
        "stocking_density_per_unit": {
            "TRADITIONAL_POND": {"min": 5000, "max": 8000},
            "BIOFLOC": {"min": 10000, "max": 15000}
        },
        "compatible_species": ["Catla catla", "Cirrhinus mrigala"],
        "prohibited_conditions": [
            {
                "parameter": "dissolved_oxygen_mg_l",
                "threshold": 3.0,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: Dissolved oxygen below 3 mg/L causes mass mortality", "hi": "गंभीर: 3 मिलीग्राम/लीटर से कम घुला हुआ ऑक्सीजन बड़े पैमाने पर मृत्यु का कारण बनता है"}
            },
            {
                "parameter": "salinity_tolerance_ppt",
                "threshold": 5.0,
                "operator": "gt",
                "severity": "FATAL",
                "message": {"en": "Critical: Rohu cannot tolerate salinity above 5 ppt", "hi": "गंभीर: रोहू 5 पीपीटी से अधिक लवणता को सहन नहीं कर सकता"}
            }
        ]
    }'::jsonb
);

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '11111111-1111-1111-1111-111111111112',
    '00000000-0000-0000-0000-000000000001',
    'SPECIES',
    '{
        "scientific_name": "Catla catla",
        "common_names": {
            "en": "Catla",
            "hi": "कतला",
            "bn": "কাতলা",
            "te": "కాట్లా",
            "ta": "கட்லா",
            "ml": "കട്ലാ",
            "kn": "ಕಟ್ಲಾ"
        },
        "category": "INDIAN_MAJOR_CARP",
        "optimal_systems": ["TRADITIONAL_POND", "BIOFLOC"],
        "biological_parameters": {
            "temperature_celsius": {"min": 25.0, "max": 32.0},
            "dissolved_oxygen_mg_l": {"min": 5.0},
            "ph_range": {"min": 6.5, "max": 8.5},
            "salinity_tolerance_ppt": {"min": 0.0, "max": 2.0},
            "total_alkalinity_ppm": {"min": 50.0, "max": 200.0},
            "ammonia_tolerance_mg_l": {"max": 0.1},
            "nitrite_tolerance_mg_l": {"max": 0.5},
            "hardness_ppm": {"min": 50.0, "max": 300.0}
        },
        "economic_parameters": {
            "feed_conversion_ratio": {"min": 1.35, "max": 1.74},
            "expected_yield_mt_per_acre": {"min": 3.0, "max": 5.0},
            "market_price_per_kg_inr": {"min": 130.0, "max": 190.0},
            "feed_protein_requirements": {
                "traditional": 18,
                "optimal_pellet": 22,
                "grower": 28
            },
            "survival_rate_percent": {"min": 70.0, "max": 85.0}
        },
        "culture_period_months": {"min": 8, "max": 10},
        "stocking_density_per_unit": {
            "TRADITIONAL_POND": {"min": 5000, "max": 8000},
            "BIOFLOC": {"min": 10000, "max": 15000}
        },
        "compatible_species": ["Labeo rohita", "Cirrhinus mrigala"],
        "prohibited_conditions": [
            {
                "parameter": "dissolved_oxygen_mg_l",
                "threshold": 3.0,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: Dissolved oxygen below 3 mg/L causes mass mortality", "hi": "गंभीर: 3 मिलीग्राम/लीटर से कम घुला हुआ ऑक्सीजन बड़े पैमाने पर मृत्यु का कारण बनता है"}
            }
        ]
    }'::jsonb
);

-- ============================================================================
-- SPECIES DATA - PANGASIUS (Basa Fish)
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000001',
    'SPECIES',
    '{
        "scientific_name": "Pangasianodon hypophthalmus",
        "common_names": {
            "en": "Pangasius",
            "hi": "पैन्गेशियस",
            "bn": "পাংগাসিয়াস",
            "te": "పాంగాషియస్",
            "ta": "பாங்காசியஸ்"
        },
        "category": "PANGASIUS",
        "optimal_systems": ["RAS", "BIOFLOC"],
        "biological_parameters": {
            "temperature_celsius": {"min": 26.0, "max": 30.0},
            "dissolved_oxygen_mg_l": {"min": 5.0},
            "ph_range": {"min": 6.5, "max": 8.0},
            "salinity_tolerance_ppt": {"min": 0.0, "max": 10.0},
            "total_alkalinity_ppm": {"min": 50.0, "max": 150.0},
            "ammonia_tolerance_mg_l": {"max": 0.05},
            "nitrite_tolerance_mg_l": {"max": 0.3},
            "hardness_ppm": {"min": 30.0, "max": 200.0}
        },
        "economic_parameters": {
            "feed_conversion_ratio": {"min": 1.35, "max": 1.55},
            "expected_yield_mt_per_acre": {"min": 25.0, "max": 30.0},
            "market_price_per_kg_inr": {"min": 80.0, "max": 120.0},
            "feed_protein_requirements": {
                "starter": 32,
                "grower": 28,
                "finisher": 26
            },
            "survival_rate_percent": {"min": 75.0, "max": 90.0}
        },
        "culture_period_months": {"min": 6, "max": 8},
        "stocking_density_per_unit": {
            "RAS": {"min": 86, "max": 97},
            "BIOFLOC": {"min": 15000, "max": 20000}
        },
        "compatible_species": [],
        "prohibited_conditions": [
            {
                "parameter": "temperature_celsius",
                "threshold": 20.0,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: Temperature below 20°C severely affects Pangasius growth", "hi": "गंभीर: 20°C से कम तापमान पैन्गेशियस की वृद्धि को गंभीर रूप से प्रभावित करता है"}
            }
        ]
    }'::jsonb
);

-- ============================================================================
-- SPECIES DATA - VANNAMEI SHRIMP (Whiteleg Shrimp)
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000001',
    'SPECIES',
    '{
        "scientific_name": "Litopenaeus vannamei",
        "common_names": {
            "en": "Vannamei Shrimp",
            "hi": "वनामी झींगा",
            "bn": "ভ্যানামি চিংড়ি",
            "te": "వనామీ రొయ్య",
            "ta": "வண்ணமீ இறால்",
            "ml": "വനാമി ചെമ്മീൻ",
            "kn": "ವನಾಮಿ ಬೆಂಡೆ"
        },
        "category": "VANNAMEI_SHRIMP",
        "optimal_systems": ["BRACKISH_POND"],
        "biological_parameters": {
            "temperature_celsius": {"min": 28.0, "max": 32.0},
            "dissolved_oxygen_mg_l": {"min": 5.0},
            "ph_range": {"min": 7.5, "max": 8.5},
            "salinity_tolerance_ppt": {"min": 10.0, "max": 35.0},
            "total_alkalinity_ppm": {"min": 100.0, "max": 150.0},
            "ammonia_tolerance_mg_l": {"max": 0.05},
            "nitrite_tolerance_mg_l": {"max": 0.2},
            "hardness_ppm": {"min": 150.0, "max": 500.0}
        },
        "economic_parameters": {
            "feed_conversion_ratio": {"min": 1.20, "max": 1.50},
            "expected_yield_mt_per_acre": {"min": 4.0, "max": 8.0},
            "market_price_per_kg_inr": {"min": 250.0, "max": 450.0},
            "feed_protein_requirements": {
                "32_percent": 32,
                "36_percent": 36,
                "38_percent": 38
            },
            "survival_rate_percent": {"min": 60.0, "max": 80.0}
        },
        "culture_period_months": {"min": 4, "max": 5},
        "stocking_density_per_unit": {
            "BRACKISH_POND": {"min": 250000, "max": 400000}
        },
        "compatible_species": [],
        "prohibited_conditions": [
            {
                "parameter": "dissolved_oxygen_mg_l",
                "threshold": 3.5,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: DO below 3.5 mg/L causes immediate mortality in Vannamei", "hi": "गंभीर: 3.5 मिलीग्राम/लीटर से कम DO वनामी में तत्काल मृत्यु का कारण बनता है"}
            },
            {
                "parameter": "salinity_tolerance_ppt",
                "threshold": 5.0,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: Vannamei requires minimum 5 ppt salinity", "hi": "गंभीर: वनामी को न्यूनतम 5 पीपीटी लवणता की आवश्यकता होती है"}
            }
        ]
    }'::jsonb
);

-- ============================================================================
-- SPECIES DATA - SCAMPI (Freshwater Prawn)
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '44444444-4444-4444-4444-444444444444',
    '00000000-0000-0000-0000-000000000001',
    'SPECIES',
    '{
        "scientific_name": "Macrobrachium rosenbergii",
        "common_names": {
            "en": "Scampi",
            "hi": "स्कैम्पी",
            "bn": "স্ক্যাম্পি",
            "te": "స్కాంపి",
            "ta": "ஸ்காம்பி",
            "ml": "സ്കാമ്പി",
            "kn": "ಸ್ಕಾಂಪಿ"
        },
        "category": "SCAMPI",
        "optimal_systems": ["TRADITIONAL_POND"],
        "biological_parameters": {
            "temperature_celsius": {"min": 28.0, "max": 31.0},
            "dissolved_oxygen_mg_l": {"min": 5.0},
            "ph_range": {"min": 7.0, "max": 8.5},
            "salinity_tolerance_ppt": {"min": 0.0, "max": 15.0},
            "total_alkalinity_ppm": {"min": 75.0, "max": 150.0},
            "ammonia_tolerance_mg_l": {"max": 0.08},
            "nitrite_tolerance_mg_l": {"max": 0.4},
            "hardness_ppm": {"min": 30.0, "max": 250.0}
        },
        "economic_parameters": {
            "feed_conversion_ratio": {"min": 1.80, "max": 2.20},
            "expected_yield_mt_per_acre": {"min": 1.5, "max": 2.0},
            "market_price_per_kg_inr": {"min": 300.0, "max": 500.0},
            "feed_protein_requirements": {
                "juvenile": 35,
                "grower": 30,
                "broodstock": 28
            },
            "survival_rate_percent": {"min": 50.0, "max": 70.0}
        },
        "culture_period_months": {"min": 6, "max": 8},
        "stocking_density_per_unit": {
            "TRADITIONAL_POND": {"min": 20000, "max": 40000}
        },
        "compatible_species": ["Labeo rohita", "Catla catla"],
        "prohibited_conditions": [
            {
                "parameter": "temperature_celsius",
                "threshold": 20.0,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: Temperature below 20°C stops Scampi growth", "hi": "गंभीर: 20°C से कम तापमान स्कैम्पी की वृद्धि रोक देता है"}
            }
        ]
    }'::jsonb
);

-- ============================================================================
-- SPECIES DATA - TILAPIA
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '55555555-5555-5555-5555-555555555555',
    '00000000-0000-0000-0000-000000000001',
    'SPECIES',
    '{
        "scientific_name": "Oreochromis niloticus",
        "common_names": {
            "en": "Nile Tilapia",
            "hi": "तिलापिया",
            "bn": "তিলাপিয়া",
            "te": "తిలాపియా",
            "ta": "திலாப்பியா",
            "ml": "തിലാപ്പിയ",
            "kn": "ತಿಲಾಪಿಯಾ"
        },
        "category": "TILAPIA",
        "optimal_systems": ["BIOFLOC", "FLOATING_CAGE"],
        "biological_parameters": {
            "temperature_celsius": {"min": 26.0, "max": 30.0},
            "dissolved_oxygen_mg_l": {"min": 4.0},
            "ph_range": {"min": 6.5, "max": 8.5},
            "salinity_tolerance_ppt": {"min": 0.0, "max": 30.0},
            "total_alkalinity_ppm": {"min": 50.0, "max": 200.0},
            "ammonia_tolerance_mg_l": {"max": 0.2},
            "nitrite_tolerance_mg_l": {"max": 0.5},
            "hardness_ppm": {"min": 20.0, "max": 300.0}
        },
        "economic_parameters": {
            "feed_conversion_ratio": {"min": 1.10, "max": 1.40},
            "expected_yield_mt_per_acre": {"min": 15.0, "max": 20.0},
            "market_price_per_kg_inr": {"min": 100.0, "max": 140.0},
            "feed_protein_requirements": {
                "starter": 32,
                "grower": 28,
                "finisher": 26
            },
            "survival_rate_percent": {"min": 80.0, "max": 95.0}
        },
        "culture_period_months": {"min": 5, "max": 6},
        "stocking_density_per_unit": {
            "BIOFLOC": {"min": 20000, "max": 30000},
            "FLOATING_CAGE": {"min": 50, "max": 100}
        },
        "compatible_species": [],
        "prohibited_conditions": [
            {
                "parameter": "temperature_celsius",
                "threshold": 15.0,
                "operator": "lt",
                "severity": "FATAL",
                "message": {"en": "Critical: Temperature below 15°C causes Tilapia mortality", "hi": "गंभीर: 15°C से कम तापमान तिलापिया मृत्यु का कारण बनता है"}
            }
        ]
    }'::jsonb
);

-- ============================================================================
-- ECONOMIC MODELS - TRADITIONAL POND SYSTEM
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '66666666-6666-6666-6666-666666666661',
    '00000000-0000-0000-0000-000000000001',
    'ECONOMIC_MODEL',
    '{
        "model_name": "Traditional Earthen Pond - Indian Major Carps",
        "system_type": "TRADITIONAL_POND",
        "applicable_species": ["Labeo rohita", "Catla catla", "Cirrhinus mrigala"],
        "capital_expenditure": {
            "land_preparation_inr_per_hectare": 25000,
            "pond_construction_inr_per_hectare": 250000,
            "equipment_costs": {
                "aerator_18w": 1600,
                "net_set": 5000,
                "water_testing_kit": 2500
            },
            "initial_stocking_cost_inr": 30000,
            "contingency_percent": 10
        },
        "operational_expenditure": {
            "feed_cost_inr_per_kg_fish": 45,
            "electricity_cost_inr_per_month": 2000,
            "labor_cost_inr_per_month": 8000,
            "medicine_cost_inr_per_cycle": 15000,
            "miscellaneous_percent": 5
        },
        "revenue_projections": {
            "expected_yield_kg_per_hectare": {"min": 7500, "max": 12500},
            "market_price_inr_per_kg": {"min": 120, "max": 180},
            "harvest_cycles_per_year": 1
        },
        "benefit_cost_ratio": {"min": 1.20, "max": 1.50},
        "break_even_months": {"min": 10, "max": 12},
        "pmmsy_subsidy_applicable": true,
        "unit_cost_ceiling_inr": 400000
    }'::jsonb
);

-- ============================================================================
-- ECONOMIC MODELS - BIOFLOC SYSTEM
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '66666666-6666-6666-6666-666666666662',
    '00000000-0000-0000-0000-000000000001',
    'ECONOMIC_MODEL',
    '{
        "model_name": "Biofloc Technology System",
        "system_type": "BIOFLOC",
        "applicable_species": ["Oreochromis niloticus", "Labeo rohita", "Pangasianodon hypophthalmus"],
        "capital_expenditure": {
            "land_preparation_inr_per_hectare": 10000,
            "pond_construction_inr_per_hectare": 0,
            "equipment_costs": {
                "biofloc_tarpaulin_tank_9m": 31000,
                "vortex_blower_550w": 13500,
                "aeration_stones": 2000,
                "pvc_piping": 3500,
                "water_testing_kit": 5000
            },
            "initial_stocking_cost_inr": 50000,
            "contingency_percent": 15
        },
        "operational_expenditure": {
            "feed_cost_inr_per_kg_fish": 40,
            "electricity_cost_inr_per_month": 8000,
            "labor_cost_inr_per_month": 5000,
            "medicine_cost_inr_per_cycle": 8000,
            "miscellaneous_percent": 5
        },
        "revenue_projections": {
            "expected_yield_kg_per_hectare": {"min": 37500, "max": 50000},
            "market_price_inr_per_kg": {"min": 100, "max": 140},
            "harvest_cycles_per_year": 2
        },
        "benefit_cost_ratio": {"min": 1.89, "max": 2.03},
        "break_even_months": {"min": 8, "max": 10},
        "pmmsy_subsidy_applicable": true,
        "unit_cost_ceiling_inr": 400000
    }'::jsonb
);

-- ============================================================================
-- ECONOMIC MODELS - RAS SYSTEM
-- ============================================================================

INSERT INTO knowledge_nodes (id, parent_id, node_type, data) VALUES (
    '66666666-6666-6666-6666-666666666663',
    '00000000-0000-0000-0000-000000000001',
    'ECONOMIC_MODEL',
    '{
        "model_name": "Recirculating Aquaculture System (RAS)",
        "system_type": "RAS",
        "applicable_species": ["Pangasianodon hypophthalmus"],
        "capital_expenditure": {
            "land_preparation_inr_per_hectare": 50000,
            "pond_construction_inr_per_hectare": 0,
            "equipment_costs": {
                "ras_pump_1hp": 8500,
                "biofilter_tanks": 150000,
                "uv_sterilizer_40w": 12000,
                "oxygen_cone": 45000,
                "monitoring_system": 75000,
                "backup_generator": 125000
            },
            "initial_stocking_cost_inr": 200000,
            "contingency_percent": 20
        },
        "operational_expenditure": {
            "feed_cost_inr_per_kg_fish": 35,
            "electricity_cost_inr_per_month": 35000,
            "labor_cost_inr_per_month": 25000,
            "medicine_cost_inr_per_cycle": 25000,
            "miscellaneous_percent": 10
        },
        "revenue_projections": {
            "expected_yield_kg_per_hectare": {"min": 100000, "max": 150000},
            "market_price_inr_per_kg": {"min": 80, "max": 120},
            "harvest_cycles_per_year": 3
        },
        "benefit_cost_ratio": {"min": 1.50, "max": 1.80},
        "break_even_months": {"min": 18, "max": 24},
        "pmmsy_subsidy_applicable": true,
        "unit_cost_ceiling_inr": 800000
    }'::jsonb
);

-- ============================================================================
-- EQUIPMENT CATALOG
-- ============================================================================

INSERT INTO equipment_catalog (name, category, specifications, cost_inr, lifespan_years, power_consumption_kw, maintenance_cost_annual_inr) VALUES
('18W Electromagnetic Aerator', 'AERATION', '{"power": "18W", "type": "electromagnetic", "airflow": "60 L/min"}'::jsonb, 1600, 3, 0.018, 200),
('550W Vortex Blower', 'AERATION', '{"power": "550W", "type": "vortex", "pressure": "0.2 bar", "airflow": "180 L/min"}'::jsonb, 13500, 5, 0.55, 800),
('9m Diameter PVC Tarpaulin Tank', 'TANK', '{"diameter": "9m", "material": "PVC 650GSM", "capacity": "50000 L"}'::jsonb, 31000, 7, NULL, 1000),
('1HP RAS Pump', 'CIRCULATION', '{"power": "1HP", "type": "centrifugal", "flow_rate": "15000 L/hr"}'::jsonb, 8500, 5, 0.75, 500),
('40W UV Sterilizer', 'FILTRATION', '{"power": "40W", "type": "uv_c", "capacity": "10000 L/hr"}'::jsonb, 12000, 4, 0.04, 600),
('Water Quality Test Kit', 'MONITORING', '{"parameters": ["pH", "DO", "ammonia", "nitrite"], "type": "digital"}'::jsonb, 5000, 2, NULL, 500);

-- ============================================================================
-- GEOGRAPHIC ZONES - Sample data for salinity mapping
-- ============================================================================

INSERT INTO geographic_zones (zone_name, state_code, district_codes, groundwater_salinity_min, groundwater_salinity_max, water_classification, suitable_systems) VALUES
('Northwest Rajasthan Zone', 'RJ', ARRAY['JP', 'BI', 'SR'], 3000.0, 8000.0, 'SALINE', ARRAY['BRACKISH_POND']),
('Haryana-Punjab Belt', 'HR', ARRAY['AM', 'PW', 'KS'], 2000.0, 3500.0, 'BRACKISH', ARRAY['BRACKISH_POND']),
('Andhra Pradesh Coastal', 'AP', ARRAY['EG', 'WG', 'KR'], 500.0, 2500.0, 'FRESHWATER', ARRAY['TRADITIONAL_POND', 'BIOFLOC', 'BRACKISH_POND']),
('West Bengal Delta', 'WB', ARRAY['SD', 'NS', '24P'], 100.0, 1500.0, 'FRESHWATER', ARRAY['TRADITIONAL_POND', 'BIOFLOC', 'BRACKISH_POND']),
('Kerala Backwaters', 'KL', ARRAY['AL', 'KL', 'PT'], 500.0, 3000.0, 'BRACKISH', ARRAY['BRACKISH_POND', 'TRADITIONAL_POND']),
('Gujarat Coastal', 'GJ', ARRAY['AM', 'BK', 'JN'], 1500.0, 5000.0, 'BRACKISH', ARRAY['BRACKISH_POND']);

-- ============================================================================
-- DEFAULT ADMIN USER (for development)
-- ============================================================================

INSERT INTO users (id, phone_number, name, preferred_language, farmer_category, state_code, district_code) VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '+919999999999',
    'Admin User',
    'en',
    'GENERAL',
    'AP',
    'EG'
);