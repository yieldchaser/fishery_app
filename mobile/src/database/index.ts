/**
 * WatermelonDB Database Initialization
 */

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import Species from './models/Species';
import Pond from './models/Pond';
import WaterQualityLog from './models/WaterQualityLog';
import KnowledgeNode from './models/KnowledgeNode';
import EconomicsSimulation from './models/EconomicsSimulation';
import MarketPrice from './models/MarketPrice';
import SyncQueueItem from './models/SyncQueueItem';

// Initialize adapter
const adapter = new SQLiteAdapter({
  schema,
  dbName: 'fishing_god_db',
  jsi: true, // Enable JSI for better performance
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  }
});

// Initialize database
export const database = new Database({
  adapter,
  modelClasses: [
    Species,
    Pond,
    WaterQualityLog,
    KnowledgeNode,
    EconomicsSimulation,
    MarketPrice,
    SyncQueueItem,
  ],
});

export { default as Species } from './models/Species';
export { default as Pond } from './models/Pond';
export { default as WaterQualityLog } from './models/WaterQualityLog';
export { default as KnowledgeNode } from './models/KnowledgeNode';
export { default as EconomicsSimulation } from './models/EconomicsSimulation';
export { default as MarketPrice } from './models/MarketPrice';
export { default as SyncQueueItem } from './models/SyncQueueItem';

export default database;