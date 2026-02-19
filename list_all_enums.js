
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

async function listAllEnums() {
    try {
        const enums = await sql`
      SELECT t.typname, e.enumlabel
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid  
      ORDER BY t.typname, e.enumsortorder;
    `;
        console.log('Todos os Enums no banco:');
        console.log(JSON.stringify(enums, null, 2));
    } catch (error) {
        console.error('Erro ao listar enums:', error);
    } finally {
        await sql.end();
    }
}

listAllEnums();
