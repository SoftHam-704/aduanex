
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

async function run() {
    try {
        // 1. Corrigir o CNPJ da Colorado (ID 26) para apenas números
        await sql`UPDATE empresas SET cnpj = '01524628000159' WHERE id = 26`;
        console.log('✅ CNPJ da Colorado atualizado para apenas números.');

        // 2. Inserir a Cosmos
        const result = await sql`
      INSERT INTO empresas (
        cnpj, 
        razao_social, 
        nome_fantasia, 
        email_contato, 
        telefone, 
        status, 
        ramoatv, 
        db_schema,
        db_host,
        db_nome,
        db_usuario,
        db_senha,
        db_porta
      ) VALUES (
        '15463649000116',
        'COSMOS EXPORTACAO DE MATERIAL DE CONSTRUCAO LTDA',
        'COSMOS EXPORTADORA',
        'cosmos.exportacao@terra.com.br',
        '(67) 3431-2333',
        'Ativo',
        'Aduaneiro',
        'cosmos',
        'node254557-salesmaster.sp1.br.saveincloud.net.br',
        'masterexport',
        'webadmin',
        'ytAyO0u043',
        13062
      ) RETURNING id;
    `;
        console.log('✅ Empresa Cosmos inserida com sucesso! ID:', result[0].id);
    } catch (error) {
        console.error('❌ Erro na operação:', error);
    } finally {
        await sql.end();
    }
}

run();
