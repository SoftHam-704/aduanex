
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('e:/Sistemas_ia/MastersExport/Projeto/.env') });

const sql = postgres({
    host: process.env.MASTER_DB_HOST,
    port: process.env.MASTER_DB_PORT,
    database: process.env.MASTER_DB_DATABASE,
    username: process.env.MASTER_DB_USER,
    password: process.env.MASTER_DB_PASSWORD,
    ssl: process.env.MASTER_DB_SSL === 'true'
});

async function updatePorta() {
    try {
        // Atualiza a porta para 5432 (acesso interno SaveInCloud) para as empresas cadastradas
        const result = await sql`
      UPDATE empresas 
      SET db_porta = 5432 
      WHERE db_porta = 13062
    `;
        console.log('✅ Porta DB atualizada para 5432 (interno) para todas as empresas que estavam com 13062.');
    } catch (error) {
        console.error('❌ Erro ao atualizar porta:', error);
    } finally {
        await sql.end();
    }
}

updatePorta();
