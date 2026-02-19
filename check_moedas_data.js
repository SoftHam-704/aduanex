
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

async function checkMoedas() {
    try {
        const data = await sql`SELECT * FROM moedas`;
        console.log('Dados na tabela moedas:');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erro ao buscar moedas:', error);
    } finally {
        await sql.end();
    }
}

checkMoedas();
