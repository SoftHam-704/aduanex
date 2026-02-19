
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

async function listPublicTables() {
    try {
        const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
        console.log('Tabelas no schema PUBLIC do banco masterexport:');
        console.log(JSON.stringify(tables, null, 2));
    } catch (error) {
        console.error('Erro ao listar tabelas:', error);
    } finally {
        await sql.end();
    }
}

listPublicTables();
