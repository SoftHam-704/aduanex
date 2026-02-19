
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

async function setupPaises() {
    try {
        console.log('Populando tabela paises...');
        await sql`
      INSERT INTO paises (id, codigo_bacen, codigo_iso, nome_pt, nome_en, ativo)
      VALUES 
        (1, '1058', 'BR', 'Brasil', 'Brazil', true),
        (2, '9999', 'EX', 'Exterior', 'Foreign', true)
      ON CONFLICT (id) DO NOTHING;
    `;
        console.log('✅ Países base (Brasil e Exterior) prontos.');
    } catch (error) {
        console.error('❌ Erro ao popular países:', error);
    } finally {
        await sql.end();
    }
}

setupPaises();
