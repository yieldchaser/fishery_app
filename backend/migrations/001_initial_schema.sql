-- ============================================================================
-- Fishing God Platform - Initial Database Schema
-- PostgreSQL with JSONB hierarchical knowledge graph
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================================================
-- CORE KNOWLEDGE GRAPH - HIERARCHICAL JSONB TREE
-- ============================================================================

CREATE TABLE knowledge_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
    node_type VARCHAR(50) NOT NULL CHECK (node_type IN (
        'SYSTEM', 'SPECIES', 'PARAMETER', 'ECONOMIC_MODEL', 
        'GEOGRAPHIC_ZONE', 'EQUIPMENT', 'MARKET_DATA'
    )),
    data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    version INTEGER DEFAULT 1,
    
    -- Ensure no circular references
    CONSTRAINT no_self_reference CHECK (id != parent_id)
);

-- GIN index for efficient JSONB queries
CREATE INDEX idx_knowledge_nodes_data_gin ON knowledge_nodes USING GIN (data);

-- Index for node type queries
CREATE INDEX idx_knowledge_nodes_type ON knowledge_nodes(node_type);

-- Index for tree traversal
CREATE INDEX idx_knowledge_nodes_parent ON knowledge_nodes(parent_id);

-- Index for timestamp-based sync queries
CREATE INDEX idx_knowledge_nodes_updated ON knowledge_nodes(updated_at);

-- ============================================================================
-- USERS AND AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    preferred_language VARCHAR(10) DEFAULT 'en',
    farmer_category VARCHAR(20) CHECK (farmer_category IN ('GENERAL', 'WOMEN', 'SC', 'ST')),
    state_code VARCHAR(10) NOT NULL,
    district_code VARCHAR(10) NOT NULL,
    village VARCHAR(255),
    location GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_location ON users USING GIST (location);

-- ============================================================================
-- FARMER PONDS/UNITS
-- ============================================================================

CREATE TABLE ponds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    area_hectares DECIMAL(10, 4) NOT NULL,
    water_source_type VARCHAR(50) CHECK (water_source_type IN (
        'BOREWELL', 'OPEN_WELL', 'CANAL', 'RIVER', 'TANK'
    )),
    location GEOGRAPHY(POINT, 4326),
    system_type VARCHAR(50),
    species_id UUID REFERENCES knowledge_nodes(id),
    stocking_date DATE,
    expected_harvest_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'HARVESTED', 'FALLOW')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ponds_user ON ponds(user_id);
CREATE INDEX idx_ponds_location ON ponds USING GIST (location);

-- ============================================================================
-- WATER QUALITY LOGS
-- ============================================================================

CREATE TABLE water_quality_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pond_id UUID NOT NULL REFERENCES ponds(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    -- Water quality parameters
    temperature DECIMAL(5, 2),
    dissolved_oxygen DECIMAL(5, 2),
    ph DECIMAL(4, 2),
    salinity DECIMAL(6, 2),
    alkalinity DECIMAL(6, 2),
    ammonia DECIMAL(6, 3),
    nitrite DECIMAL(6, 3),
    turbidity DECIMAL(6, 2),
    
    -- Metadata
    device_type VARCHAR(50),
    sync_status VARCHAR(20) DEFAULT 'SYNCED' CHECK (sync_status IN ('PENDING', 'SYNCED', 'FAILED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_water_quality_pond ON water_quality_logs(pond_id);
CREATE INDEX idx_water_quality_timestamp ON water_quality_logs(timestamp);
CREATE INDEX idx_water_quality_sync ON water_quality_logs(sync_status);

-- ============================================================================
-- MARKET PRICE DATA
-- ============================================================================

CREATE TABLE market_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    species_id UUID REFERENCES knowledge_nodes(id),
    species_name VARCHAR(255) NOT NULL,
    market_name VARCHAR(255) NOT NULL,
    state_code VARCHAR(10) NOT NULL,
    price_inr_per_kg DECIMAL(10, 2) NOT NULL,
    grade VARCHAR(50),
    date DATE NOT NULL,
    source VARCHAR(50) CHECK (source IN ('NFDB_FMPI', 'AGMARKNET', 'MANUAL_ENTRY')),
    volume_kg DECIMAL(12, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_market_prices_species ON market_prices(species_id);
CREATE INDEX idx_market_prices_date ON market_prices(date);
CREATE INDEX idx_market_prices_state ON market_prices(state_code);
CREATE INDEX idx_market_prices_source ON market_prices(source);

-- ============================================================================
-- ECONOMICS SIMULATION RESULTS (for caching/history)
-- ============================================================================

CREATE TABLE economics_simulations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    input_params JSONB NOT NULL,
    results JSONB NOT NULL,
    recommended_species UUID[],
    recommended_system VARCHAR(50),
    projected_revenue DECIMAL(15, 2),
    breakeven_months INTEGER,
    benefit_cost_ratio DECIMAL(5, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_economics_user ON economics_simulations(user_id);
CREATE INDEX idx_economics_created ON economics_simulations(created_at);

-- ============================================================================
-- SYNC QUEUE (for offline-first synchronization)
-- ============================================================================

CREATE TABLE sync_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    operation VARCHAR(20) CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    data JSONB,
    client_timestamp TIMESTAMPTZ NOT NULL,
    server_timestamp TIMESTAMPTZ DEFAULT NOW(),
    sync_status VARCHAR(20) DEFAULT 'PENDING' CHECK (sync_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    retry_count INTEGER DEFAULT 0,
    error_message TEXT
);

CREATE INDEX idx_sync_queue_status ON sync_queue(sync_status);
CREATE INDEX idx_sync_queue_user ON sync_queue(user_id);
CREATE INDEX idx_sync_queue_device ON sync_queue(device_id);

-- ============================================================================
-- GEOGRAPHIC ZONES (Salinity Mapping)
-- ============================================================================

CREATE TABLE geographic_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_name VARCHAR(255) NOT NULL,
    state_code VARCHAR(10) NOT NULL,
    district_codes VARCHAR(10)[],
    boundary GEOGRAPHY(POLYGON, 4326),
    groundwater_salinity_min DECIMAL(8, 2),
    groundwater_salinity_max DECIMAL(8, 2),
    water_classification VARCHAR(20) CHECK (water_classification IN ('FRESHWATER', 'BRACKISH', 'SALINE')),
    suitable_systems VARCHAR(50)[],
    recommended_species UUID[],
    data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_geographic_zones_state ON geographic_zones(state_code);
CREATE INDEX idx_geographic_zones_boundary ON geographic_zones USING GIST (boundary);

-- ============================================================================
-- EQUIPMENT CATALOG
-- ============================================================================

CREATE TABLE equipment_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    specifications JSONB NOT NULL DEFAULT '{}',
    cost_inr DECIMAL(12, 2) NOT NULL,
    lifespan_years INTEGER,
    power_consumption_kw DECIMAL(6, 3),
    maintenance_cost_annual_inr DECIMAL(10, 2),
    supplier_info JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_equipment_category ON equipment_catalog(category);

-- ============================================================================
-- UPDATE TRIGGER FOR updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_knowledge_nodes_updated_at 
    BEFORE UPDATE ON knowledge_nodes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ponds_updated_at 
    BEFORE UPDATE ON ponds 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_geographic_zones_updated_at 
    BEFORE UPDATE ON geographic_zones 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_catalog_updated_at 
    BEFORE UPDATE ON equipment_catalog 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View for species with biological parameters
CREATE VIEW species_view AS
SELECT 
    kn.id,
    kn.data->>'scientific_name' as scientific_name,
    kn.data->'common_names' as common_names,
    kn.data->>'category' as category,
    kn.data->'biological_parameters' as biological_parameters,
    kn.data->'economic_parameters' as economic_parameters,
    kn.created_at,
    kn.updated_at
FROM knowledge_nodes kn
WHERE kn.node_type = 'SPECIES';

-- View for active market prices with trends
CREATE VIEW market_price_latest AS
SELECT DISTINCT ON (species_id, state_code)
    id,
    species_id,
    species_name,
    market_name,
    state_code,
    price_inr_per_kg,
    grade,
    date,
    source
FROM market_prices
ORDER BY species_id, state_code, date DESC;