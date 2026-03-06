import { query } from '../src/db';
import { logger } from '../src/utils/logger';

const descriptions: Record<string, string> = {
    "Labeo rohita": "A fast-growing major carp and one of the most popular freshwater fish in India, celebrated for its taste and high market demand.",
    "Catla catla": "The fastest-growing Indian major carp, known for its large head and surface-feeding habits in polyculture systems.",
    "Cirrhinus mrigala": "A bottom-dwelling major carp that thrives in polyculture ponds, prized for its adaptability and steady growth.",
    "Macrobrachium rosenbergii": "The giant freshwater prawn, highly valued for its large size, premium market price, and export potential.",
    "Labeo calbasu": "A hardy minor carp often grown alongside major carps, known for its dark color and bottom-feeding behavior.",
    "Cirrhinus reba": "A warm-water minor carp that efficiently utilizes natural pond food, commonly cultured in eastern India.",
    "Labeo bata": "A mid-water feeding minor carp popular in composite culture ponds across Bihar, West Bengal, and Assam.",
    "Puntius sarana": "A resilient and fast-growing barb used to diversify carp culture systems and improve overall pond yield.",
    "Macrobrachium malcolmsonii": "The monsoon river prawn, a hardy freshwater species with good growth potential and regional market demand.",
    "Clarias magur / Clarias batrachus": "An air-breathing walking catfish highly valued for its medicinal properties and ability to survive in low-oxygen waters.",
    "Heteropneustes fossilis": "The stinging catfish, cherished in eastern India for its nutritional value and exceptionally high market price.",
    "Mystus seenghala (Sperata seenghala)": "A large, predatory river catfish gaining popularity in aquaculture due to its premium flesh and high value.",
    "Ompok pabda": "A premium, high-value small catfish considered a delicacy in Bengali cuisine, known for its excellent taste.",
    "Pangasionodon hypophthalmus": "A fast-growing, high-yielding catfish that dominates commercial intensive farming due to its incredible feed conversion.",
    "Mystus tengara": "A small-sized catfish extremely popular in regional kitchens, increasingly cultured to meet high local demand.",
    "Channa striata": "A resilient, air-breathing striped murrel that tolerates drought and fetches premium prices in South Indian markets.",
    "Channa marulius": "The giant snakehead, a large predatory murrel highly prized for its rapid growth and excellent meat quality.",
    "Channa punctata": "A hardy, spotted snakehead ideal for paddy-cum-fish culture, known for its fast growth and regional popularity.",
    "Cyprinus carpio": "The ubiquitous common carp, an extremely adaptable and fast-growing bottom feeder introduced globally.",
    "Hypophthalmichthys molitrix": "The silver carp, an efficient filter feeder crucial for controlling algal blooms in multi-species ponds.",
    "Aristichthys nobilis": "The bighead carp, a mid-water zooplankton feeder that perfectly complements silver carp in polyculture systems.",
    "Ctenopharyngodon idella": "The grass carp, a voracious herbivore widely used for natural aquatic weed control and fast meat production.",
    "Oreochromis niloticus": "The Nile tilapia, a hardy, fast-growing fish with wide environmental tolerance, globally dominant in aquaculture.",
    "Litopenaeus vannamei": "The white-leg shrimp, India's #1 aquaculture export, renowned for its rapid growth and high-density farming potential.",
    "Penaeus monodon": "The black tiger shrimp, a premium export crustacean known for its large size and exquisite flavor profile.",
    "Penaeus indicus": "The Indian white prawn, an indigenous coastal species widely cultured in traditional brackishwater ponds.",
    "Metapenaeus dobsoni": "The speckled shrimp, a small but commercially important backwater species frequently harvested in coastal estuaries.",
    "Lates calcarifer": "The Barramundi or Asian seabass, a premium, fast-growing euryhaline fish highly sought after in premium markets.",
    "Chanos chanos": "The milkfish, a resilient, fast-growing brackishwater species traditionally cultured in coastal ponds across South India.",
    "Etroplus suratensis": "The pearl spot, Kerala's state fish, commanded by exceptionally high local market prices and a unique flavor.",
    "Mugil cephalus": "The flathead grey mullet, an adaptable, herbivorous coastal fish with remarkably wide temperature and salinity tolerance.",
    "Scylla serrata": "The giant mud crab, a highly lucrative species frequently fattened in mangrove and brackishwater systems for export.",
    "Anabas testudineus": "The climbing perch, an incredibly resilient air-breathing fish capable of surviving in near-zero oxygen environments.",
    "Wallago attu": "A massive, predatory river catfish known as the freshwater shark, valued for its impressive size and meat quality.",
    "Monopterus cuchia": "The Indian swamp eel, an air-breathing, burrowing species fetching premium prices in Northeast India and Bengal.",
    "Oncorhynchus mykiss": "The rainbow trout, a high-value cold-water species thriving in the pristine, fast-flowing streams of the Himalayas.",
    "Salmo trutta fario": "The brown trout, a valued cold-water game and food fish well-adapted to the cooler upland waters of northern India.",
    "Tor tor": "The golden mahseer, a majestic and ecologically significant cold-water species focused on conservation aquaculture.",
    "Epinephelus spp.": "The grouper, a slow-growing but extremely premium marine fish increasingly favored for coastal cage farming.",
    "Rachycentron canadum": "The cobia, a rapidly growing marine fish highly suitable for offshore cage culture and premium seafood markets.",
    "Lutjanus argentimaculatus": "The mangrove red snapper, a highly prized euryhaline fish successfully cultured in estuarine and coastal cages.",
    "Acanthopagrus berda": "The picnic seabream, a hardy coastal and brackishwater fish gaining traction in marine cage aquaculture."
};

async function addDescriptions() {
    try {
        const result = await query(`
      SELECT id, data->>'scientific_name' as scientific_name
      FROM knowledge_nodes
      WHERE node_type = 'SPECIES'
    `);

        let updated = 0;

        for (const row of result.rows) {
            const description = descriptions[row.scientific_name];
            if (description) {
                // Update the JSONB data to include the description field
                await query(`
          UPDATE knowledge_nodes
          SET data = jsonb_set(data, '{description}', $1::jsonb)
          WHERE id = $2
        `, [JSON.stringify(description), row.id]);
                updated++;
            } else {
                console.log(`No description found for: ${row.scientific_name}`);
            }
        }

        console.log(`Successfully added descriptions to ${updated} species notes.`);
    } catch (error) {
        console.error('Error adding descriptions:', error);
    } finally {
        process.exit(0);
    }
}

addDescriptions();
