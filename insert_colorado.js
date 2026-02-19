
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

async function insertEmpresa() {
    try {
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
        '01.524.628/0001-59',
        'COMERCIAL EXPORTADORA DE CIMENTO COLORADO LTDA',
        'COLORADO EXPORTADORA',
        'colexpci@terra.com.br',
        '(67) 3431-3897',
        'Ativo',
        'Aduaneiro',
        'colorado',
        'node254557-salesmaster.sp1.br.saveincloud.net.br',
        'masterexport',
        'webadmin',
        'ytAyO0u043',
        13062
      ) RETURNING id;
    `;
        console.log('✅ Empresa Colorado inserida com sucesso! ID:', result[0].id);
    } catch (error) {
        if (error.code === '23505') {
            console.log('⚠️ Empresa já cadastrada (CNPJ ou Schema existente).');
        } else {
            console.error('❌ Erro ao inserir empresa:', error);
        }
    } finally {
        await sql.end();
    }
}

insertEmpresa();
