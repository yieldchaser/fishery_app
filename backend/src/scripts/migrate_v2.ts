import { query, closePool } from '../db';
import { logger } from '../utils/logger';

async function migrate() {
  logger.info('Running expanded equipment and feed migration...');

  try {
    // 1. Add Expanded Equipment
    await query(`
      INSERT INTO equipment_catalog (name, category, specifications, cost_inr, lifespan_years, power_consumption_kw, maintenance_cost_annual_inr) VALUES
      ('1HP Paddle Wheel Aerator (2-wheel)', 'AERATION', '{"hp": "1", "wheels": 2, "dissolved_oxygen_rate": "1.2 kg/hr"}'::jsonb, 28000, 5, 0.75, 1500),
      ('2HP Paddle Wheel Aerator (4-wheel)', 'AERATION', '{"hp": "2", "wheels": 4, "dissolved_oxygen_rate": "2.5 kg/hr"}'::jsonb, 42000, 5, 1.5, 2500),
      ('Automatic Solar Fish Feeder', 'FEEDING', '{"capacity": "50kg", "power": "Solar/Battery", "dispense_rate": "Adjustable"}'::jsonb, 18500, 3, NULL, 500),
      ('2HP Submersible Water Pump', 'CIRCULATION', '{"hp": "2", "head": "15m", "flow_rate": "25000 L/hr"}'::jsonb, 12500, 6, 1.5, 800),
      ('5kVA Silent Diesel Generator', 'POWER', '{"output": "5kVA", "fuel": "Diesel", "phase": "Single"}'::jsonb, 65000, 10, NULL, 5000),
      ('Handheld Multiparameter Water Meter', 'MONITORING', '{"parameters": ["pH", "DO", "Temp", "Conductivity"], "type": "Professional Digital"}'::jsonb, 22000, 4, NULL, 1200),
      ('Digital Dissolved Oxygen (DO) Meter', 'MONITORING', '{"parameters": ["DO", "Temp"], "type": "Handheld Digital"}'::jsonb, 12000, 3, NULL, 800),
      ('Pond Seining Net (100m x 3m)', 'HARVESTING', '{"length": "100m", "depth": "3m", "mesh_size": "20mm"}'::jsonb, 15000, 3, NULL, 500),
      ('Cast Net (12ft)', 'HARVESTING', '{"radius": "12ft", "weight": "4kg", "material": "Nylon Mono"}'::jsonb, 3500, 2, NULL, 200),
      ('Fingerling Transport Crate (50L)', 'LOGISTICS', '{"capacity": "50L", "material": "HDPE Plastic", "stackable": true}'::jsonb, 850, 5, NULL, 0)
    `);

    // 2. Create Feed Catalog
    await query(`
      CREATE TABLE IF NOT EXISTS feed_catalog (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100),
        feed_type VARCHAR(50) CHECK (feed_type IN ('FLOATING', 'SINKING', 'POWDER', 'CRUMBLES')),
        protein_percent NUMERIC(4, 2),
        fat_percent NUMERIC(4, 2),
        cost_per_kg_inr NUMERIC(10, 2) NOT NULL,
        packaging_size_kg INTEGER,
        suitable_for VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await query(`CREATE INDEX IF NOT EXISTS idx_feed_type ON feed_catalog(feed_type);`);

    // 3. Populate Feed Catalog
    await query(`
      INSERT INTO feed_catalog (name, brand, feed_type, protein_percent, fat_percent, cost_per_kg_inr, packaging_size_kg, suitable_for) VALUES
      ('Premium Floating Fish Feed (24%)', 'Godrej Agrovet', 'FLOATING', 24.0, 4.0, 42.00, 35, 'Carp Grower'),
      ('High Protein Floating Feed (28%)', 'CP Foods', 'FLOATING', 28.0, 5.0, 48.00, 40, 'Tilapia/Pangasius'),
      ('Standard Sinking Feed (20%)', 'Regional Coop', 'SINKING', 20.0, 3.0, 35.00, 50, 'Traditional Carp'),
      ('Shrimp Starter (35% Protein)', 'Avanti Feeds', 'CRUMBLES', 35.0, 6.0, 75.00, 25, 'Vannamei/Scampi Post-Larvae'),
      ('Shrimp Grower (38% Protein)', 'Avanti Feeds', 'FLOATING', 38.0, 7.0, 85.00, 25, 'Vannamei Adult'),
      ('Organic Rice Bran', 'Local Mill', 'POWDER', 12.0, 10.0, 18.00, 50, 'Traditional Carp Supplemental'),
      ('Mustard Oil Cake', 'Local Mill', 'SINKING', 30.0, 8.0, 28.00, 50, 'Organic Protein Source')
    `);

    logger.info('Expansion migration successful!');
  } catch (error) {
    logger.error('Expansion migration failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

migrate();
