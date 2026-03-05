import { query, closePool } from '../db';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

async function runMigration() {
    const migrationPath = path.join(__dirname, '../../migrations/005_update_equipment_prices.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    logger.info('Applying equipment prices migration...');

    try {
        await query(sql);
        logger.info('Equipment prices updated successfully!');
    } catch (error) {
        logger.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await closePool();
    }
}

runMigration();
