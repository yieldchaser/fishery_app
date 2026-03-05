
import { query, closePool } from '../db';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

async function runMigration() {
    const migrationPath = path.join(__dirname, '../../migrations/004_excel_species_update.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    logger.info('Applying Excel species migration...');

    try {
        await query(sql);
        logger.info('Migration successful!');
    } catch (error) {
        logger.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await closePool();
    }
}

runMigration();
