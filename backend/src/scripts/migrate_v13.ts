import fs from 'fs';
import path from 'path';
import { pool } from '../db';
import { logger } from '../utils/logger';

async function runMigration() {
    const client = await pool.connect();
    try {
        const sqlPath = path.join(__dirname, '../../migrations/013_add_feed_shop_url.sql');
        const sql = fs.readFileSync(sqlPath, 'utf-8');

        logger.info('Starting migration: 013_add_feed_shop_url');
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        logger.info('Migration v13 completed successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        logger.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
        pool.end();
    }
}

runMigration().catch(console.error);
