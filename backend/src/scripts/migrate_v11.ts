import fs from 'fs';
import path from 'path';
import { pool } from '../db';
import { logger } from '../utils/logger';

async function runMigration() {
    const client = await pool.connect();
    try {
        const sqlPath = path.join(__dirname, '../../migrations/011_add_password_to_users.sql');
        const sql = fs.readFileSync(sqlPath, 'utf-8');

        logger.info('Starting migration: 011_add_password_to_users');
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        logger.info('Migration v11 completed successfully');
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
