import { query, closePool } from '../db';
import { logger } from '../utils/logger';

async function seed() {
    logger.info('Starting database seeding...');

    try {
        // Check if seeded
        const existing = await query('SELECT count(*) FROM equipment_catalog');
        if (parseInt(existing.rows[0].count) > 0) {
            logger.info('Database already seeded.');
            return;
        }

        // Seed Indian Major Carp Species node
        await query(`
      INSERT INTO knowledge_nodes (node_type, data)
      VALUES (
        'SPECIES',
        $1::jsonb
      )
    `, [
            JSON.stringify({
                scientific_name: "Labeo rohita",
                common_names: { "en": "Rohu", "hi": "Rui" },
                category: "INDIAN_MAJOR_CARP",
                optimal_systems: ["TRADITIONAL_POND", "BIOFLOC"],
                biological_parameters: {
                    temperature_celsius: { min: 25, max: 32 },
                    dissolved_oxygen_mg_l: { min: 5 },
                    ph_range: { min: 6.5, max: 8.5 },
                    salinity_tolerance_ppt: { min: 0, max: 5 },
                    total_alkalinity_ppm: { min: 80, max: 200 },
                    ammonia_tolerance_mg_l: { max: 0.1 },
                    nitrite_tolerance_mg_l: { max: 0.1 },
                    hardness_ppm: { min: 75, max: 150 }
                },
                economic_parameters: {
                    feed_conversion_ratio: { min: 1.2, max: 1.5 },
                    expected_yield_mt_per_acre: { min: 2, max: 4 },
                    market_price_per_kg_inr: { min: 150, max: 250 },
                    survival_rate_percent: { min: 70, max: 85 },
                    feed_protein_requirements: { "starter": 30, "grower": 25 }
                },
                culture_period_months: { min: 8, max: 12 },
                stocking_density_per_unit: {
                    "TRADITIONAL_POND": { min: 5000, max: 10000 }
                },
                compatible_species: ["Catla", "Mrigal"],
                prohibited_conditions: []
            })
        ]);

        // Seed equipment
        await query(`
      INSERT INTO equipment_catalog (name, category, cost_inr, lifespan_years, maintenance_cost_annual_inr)
      VALUES 
        ('Paddle Wheel Aerator 1HP', 'AERATION', 25000, 5, 2000),
        ('Water Quality Test Kit', 'MONITORING', 1500, 1, 500),
        ('Automatic Feeder', 'FEEDING', 12000, 3, 1000)
    `);

        logger.info('Database seeded successfully!');
    } catch (error) {
        logger.error('Failed to run seed:', error);
        process.exit(1);
    } finally {
        await closePool();
    }
}

// Call if executed directly
if (require.main === module) {
    seed();
}
