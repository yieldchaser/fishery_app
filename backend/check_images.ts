import { query, closePool } from './src/db';

async function checkSpeciesImages() {
    try {
        console.log('--- Checking Species Images ---');
        const species = await query("SELECT data->>'scientific_name' as sci_name, data->>'image_url' as image_url, data->'common_names'->>'en' as common_name FROM knowledge_nodes WHERE node_type = 'SPECIES'");
        console.log('Species List:');
        species.rows.forEach(r => {
            console.log(`- ${r.common_name || r.sci_name}: ${r.image_url ? 'OK' : 'MISSING'}`);
        });
        await closePool();
    } catch (error) {
        console.error('Error checking data:', error);
    }
}

checkSpeciesImages();
