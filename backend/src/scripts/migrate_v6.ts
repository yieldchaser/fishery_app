import { query, closePool } from '../db';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

async function runMigration() {
    const migrationPath = path.join(__dirname, '../../migrations/006_equipment_images.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    logger.info('Applying equipment images migration...');

    try {
        await query(sql);
        logger.info('Equipment images updated successfully!');
    } catch (error) {
        logger.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await closePool();
    }
}

runMigration();
