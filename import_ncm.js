
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';
import pkg from 'xlsx';
const { readFile, utils } = pkg;

dotenv.config({ path: path.resolve('e:/Sistemas_ia/MastersExport/Projeto/.env') });

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
});

async function importNCM() {
    try {
        const unidades = await sql`SELECT id, codigo FROM unidades_medida`;
        const unidadesMap = {};
        unidades.forEach(u => unidadesMap[u.id] = u.codigo);

        const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
        const workbook = readFile(filePath);
        const sheetName = workbook.SheetNames[6];
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet);

        console.log(`Iniciando importação de ${data.length} NCMs...`);

        const batchSize = 100;
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);

            for (const row of batch) {
                if (!row.CO_NCM || !row.NO_NCM_POR) continue;

                const codigo = String(row.CO_NCM).padStart(8, '0');
                const unidadeCodigo = unidadesMap[row.CO_UNID] || 'UNID';
                const id = i + batch.indexOf(row) + 1;

                await sql`
          INSERT INTO ncm (id, codigo, descricao, unidade_medida, ativo)
          VALUES (${id}, ${codigo}, ${row.NO_NCM_POR.substring(0, 300)}, ${unidadeCodigo.substring(0, 6)}, true)
          ON CONFLICT (id) DO UPDATE SET
            codigo = EXCLUDED.codigo,
            descricao = EXCLUDED.descricao,
            unidade_medida = EXCLUDED.unidade_medida;
        `;
            }
            process.stdout.write(`.`);
        }

        console.log(`\n✅ Importação concluída com sucesso!`);
    } catch (error) {
        console.error('\n❌ Erro na importação:', error);
    } finally {
        await sql.end();
    }
}

importNCM();
