
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da pasta Projeto
dotenv.config({ path: path.resolve('e:/Sistemas_ia/MastersExport/Projeto/.env') });

const sql = postgres({
    host: process.env.MASTER_DB_HOST,
    port: process.env.MASTER_DB_PORT,
    database: process.env.MASTER_DB_DATABASE,
    username: process.env.MASTER_DB_USER,
    password: process.env.MASTER_DB_PASSWORD,
    ssl: process.env.MASTER_DB_SSL === 'true'
});

async function listColumns() {
    try {
        const columns = await sql`
      SELECT column_name, data_type, character_maximum_length 
      FROM information_schema.columns 
      WHERE table_name = 'empresas' 
      ORDER BY ordinal_position;
    `;
        console.log(JSON.stringify(columns, null, 2));
    } catch (error) {
        console.error('Erro ao conectar ou buscar colunas:', error);
    } finally {
        await sql.end();
    }
}

listColumns();
