
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('e:/Sistemas_ia/MastersExport/Projeto/.env') });

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
});

async function listDatabases() {
    try {
        const dbs = await sql`SELECT datname FROM pg_database WHERE datistemplate = false;`;
        console.log('Bancos de dados no servidor:');
        console.log(JSON.stringify(dbs, null, 2));
    } catch (error) {
        console.error('Erro ao listar bancos:', error);
    } finally {
        await sql.end();
    }
}

listDatabases();
