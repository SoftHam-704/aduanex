
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('e:/Sistemas_ia/MastersExport/Projeto/.env') });

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
});

async function analyzePublicSchema() {
    try {
        const tables = ['paises', 'cidades', 'ncm', 'moedas', 'unidades_medida', 'incoterms', 'portos'];
        const analysis = {};

        for (const table of tables) {
            const columns = await sql`
        SELECT column_name, data_type, character_maximum_length, is_nullable
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = ${table}
        ORDER BY ordinal_position;
      `;
            analysis[table] = columns;
        }

        console.log(JSON.stringify(analysis, null, 2));
    } catch (error) {
        console.error('Erro ao analisar schema:', error);
    } finally {
        await sql.end();
    }
}

analyzePublicSchema();
