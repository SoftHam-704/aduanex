
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

async function checkEnum() {
    try {
        const enumValues = await sql`
      SELECT e.enumlabel
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid  
      WHERE t.typname = 'TipoUnidade';
    `;
        console.log('Valores permitidos para TipoUnidade:');
        console.log(JSON.stringify(enumValues, null, 2));
    } catch (error) {
        console.error('Erro ao buscar o enum:', error);
    } finally {
        await sql.end();
    }
}

checkEnum();
