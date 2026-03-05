import { synchronize } from '@nozbe/watermelondb/sync';
import database from '../database';
import api from './apiService';

/**
 * SyncService — bridges WatermelonDB's offline-first sync protocol
 * with our backend API.
 *
 * Pull  →  GET /api/v1/sync/changes?userId=&since=
 * Push  →  POST /api/v1/sync { userId, changes }
 *
 * WatermelonDB sync reference:
 * https://nozbe.github.io/WatermelonDB/Advanced/Sync.html
 */
export const syncService = {
    sync: async (userId: string): Promise<{ success: boolean; error?: string }> => {
        try {
            await synchronize({
                database,

                pullChanges: async ({ lastPulledAt }) => {
                    const since = lastPulledAt
                        ? new Date(lastPulledAt).toISOString()
                        : new Date(0).toISOString();

                    const response = await api.get('/api/v1/sync/changes', {
                        params: { userId, since },
                    });

                    if (!response.data.success) {
                        throw new Error(response.data.error || 'Pull changes failed');
                    }

                    const { changes, timestamp } = response.data.data;

                    // WatermelonDB needs timestamp as milliseconds integer
                    const serverTimestamp = new Date(timestamp).getTime();

                    return { changes, timestamp: serverTimestamp };
                },

                pushChanges: async ({ changes, lastPulledAt }) => {
                    const response = await api.post('/api/v1/sync', {
                        userId,
                        lastSyncTimestamp: lastPulledAt
                            ? new Date(lastPulledAt).toISOString()
                            : new Date(0).toISOString(),
                        changes,
                    });

                    if (!response.data.success) {
                        throw new Error(response.data.error || 'Push changes failed');
                    }

                    // Log conflicts back to console for debugging
                    const { conflicts } = response.data.data;
                    if (conflicts && conflicts.length > 0) {
                        console.warn('[Sync] Server reported conflicts:', conflicts);
                    }
                },

                migrationsEnabledAtVersion: 1,
            });

            return { success: true };
        } catch (error: any) {
            console.error('[Sync] Error:', error?.message || error);
            return {
                success: false,
                error: error?.message || 'Sync failed. Please check your internet connection.',
            };
        }
    },
};
