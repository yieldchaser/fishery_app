/**
 * Sync API Routes
 * Handles offline-first data synchronization
 */

import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db';
import { logger } from '../utils/logger';
import { SyncPayload, SyncResponse, SyncChange } from '../types';

const router = Router();

// Validation schema for sync request
const syncSchema = z.object({
  deviceId: z.string(),
  userId: z.string().uuid(),
  lastSyncTimestamp: z.string().datetime(),
  changes: z.array(z.object({
    table: z.string(),
    recordId: z.string(),
    operation: z.enum(['INSERT', 'UPDATE', 'DELETE']),
    data: z.record(z.unknown()),
    timestamp: z.string().datetime()
  }))
});

/**
 * POST /api/v1/sync
 * Synchronize data between client and server
 */
router.post('/', async (req, res, next) => {
  try {
    const validated = syncSchema.parse(req.body);
    
    logger.info('Sync request received', {
      deviceId: validated.deviceId,
      userId: validated.userId,
      changeCount: validated.changes.length
    });

    // Process incoming changes
    const conflicts: any[] = [];
    
    for (const change of validated.changes) {
      try {
        await processChange(change, validated.userId);
      } catch (error) {
        logger.error('Failed to process change', {
          recordId: change.recordId,
          error: (error as Error).message
        });
        conflicts.push({
          table: change.table,
          recordId: change.recordId,
          error: (error as Error).message
        });
      }
    }

    // Get server changes since last sync
    const serverChanges = await getServerChanges(
      validated.userId,
      new Date(validated.lastSyncTimestamp)
    );

    const response: SyncResponse = {
      serverTimestamp: new Date(),
      changes: serverChanges,
      conflicts
    };

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.errors
      });
    } else {
      next(error);
    }
  }
});

/**
 * GET /api/v1/sync/changes
 * Get changes since timestamp (for initial sync)
 */
router.get('/changes', async (req, res, next) => {
  try {
    const { userId, since } = req.query;
    
    if (!userId || !since) {
      return res.status(400).json({
        success: false,
        error: 'userId and since parameters are required'
      });
    }

    const changes = await getServerChanges(
      userId as string,
      new Date(since as string)
    );

    res.json({
      success: true,
      data: {
        changes,
        timestamp: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
});

async function processChange(change: any, userId: string): Promise<void> {
  const client = await (await import('../db')).pool.connect();
  
  try {
    await client.query('BEGIN');

    const existing = await client.query(`
      SELECT updated_at FROM ${change.table}
      WHERE id = $1
    `, [change.recordId]);

    if (existing.rowCount && existing.rowCount > 0) {
      const serverTimestamp = new Date(existing.rows[0].updated_at);
      const clientTimestamp = new Date(change.timestamp);
      
      if (serverTimestamp > clientTimestamp) {
        throw new Error('Conflict: Server version is newer');
      }
    }

    switch (change.operation) {
      case 'INSERT':
        await client.query(`
          INSERT INTO ${change.table} (id, user_id, data, created_at, updated_at)
          VALUES ($1, $2, $3, NOW(), NOW())
          ON CONFLICT (id) DO UPDATE SET
            data = EXCLUDED.data,
            updated_at = NOW()
        `, [change.recordId, userId, JSON.stringify(change.data)]);
        break;
        
      case 'UPDATE':
        await client.query(`
          UPDATE ${change.table}
          SET data = $1, updated_at = NOW()
          WHERE id = $2 AND user_id = $3
        `, [JSON.stringify(change.data), change.recordId, userId]);
        break;
        
      case 'DELETE':
        await client.query(`
          DELETE FROM ${change.table}
          WHERE id = $1 AND user_id = $2
        `, [change.recordId, userId]);
        break;
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function getServerChanges(userId: string, since: Date): Promise<SyncChange[]> {
  const changes: SyncChange[] = [];
  
  const knowledgeResult = await query(`
    SELECT id, node_type, data, updated_at
    FROM knowledge_nodes
    WHERE updated_at > $1
  `, [since]);
  
  for (const row of knowledgeResult.rows) {
    changes.push({
      table: 'knowledge_nodes',
      recordId: row.id,
      operation: 'UPDATE',
      data: row,
      timestamp: row.updated_at
    });
  }

  const pondResult = await query(`
    SELECT id, data, updated_at
    FROM ponds
    WHERE user_id = $1 AND updated_at > $2
  `, [userId, since]);
  
  for (const row of pondResult.rows) {
    changes.push({
      table: 'ponds',
      recordId: row.id,
      operation: 'UPDATE',
      data: row,
      timestamp: row.updated_at
    });
  }

  return changes;
}

export { router as syncRouter };