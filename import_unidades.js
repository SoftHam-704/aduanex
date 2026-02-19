
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

async function importUnidades() {
    try {
        const unidades = [
            { id: 10, codigo: 'KGL', descricao: 'QUILOGRAMA LIQUIDO' },
            { id: 11, codigo: 'UNID', descricao: 'NUMERO (UNIDADE)' },
            { id: 12, codigo: 'MIL', descricao: 'MILHEIRO' },
            { id: 13, codigo: 'PARES', descricao: 'PARES' },
            { id: 14, codigo: 'M', descricao: 'METRO' },
            { id: 15, codigo: 'M2', descricao: 'METRO QUADRADO' },
            { id: 16, codigo: 'M3', descricao: 'METRO CUBICO' },
            { id: 17, codigo: 'LITRO', descricao: 'LITRO' },
            { id: 18, codigo: 'MKW/H', descricao: 'MIL QUILOWATT HORA' },
            { id: 19, codigo: 'QUILT', descricao: 'QUILATE' },
            { id: 20, codigo: 'DUZIA', descricao: 'DUZIA' },
            { id: 21, codigo: 'TML', descricao: 'TONELADA METRICA LIQUIDA' },
            { id: 22, codigo: 'GRAMA', descricao: 'GRAMA LIQUIDO' },
            { id: 23, codigo: 'BUI', descricao: 'BILHOES DE UNIDADES INTERNACIONAIS' },
            { id: 24, codigo: 'KGBR', descricao: 'QUILOGRAMA BRUTO' }
        ];

        console.log('Populando tabela unidades_medida...');

        for (const uni of unidades) {
            await sql`
        INSERT INTO unidades_medida (id, codigo, descricao, tipo, ativo)
        VALUES (${uni.id}, ${uni.codigo}, ${uni.descricao}, 'COMERCIAL', true)
        ON CONFLICT (id) DO UPDATE SET
          codigo = EXCLUDED.codigo,
          descricao = EXCLUDED.descricao,
          tipo = EXCLUDED.tipo;
      `;
        }

        console.log('✅ Unidades de medida importadas com sucesso!');
    } catch (error) {
        console.error('❌ Erro na importação:', error);
    } finally {
        await sql.end();
    }
}

importUnidades();
