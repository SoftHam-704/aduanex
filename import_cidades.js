
import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve('e:/Sistemas_ia/MastersExport/Projeto/.env') });

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
});

async function importCidades() {
    try {
        const rawData = fs.readFileSync('E:/Sistemas_ia/SalesMasters/data/cidades.json', 'utf8');
        const { RecordSet } = JSON.parse(rawData);

        console.log(`Iniciando importação de ${RecordSet.length} cidades...`);

        const batchSize = 100;
        for (let i = 0; i < RecordSet.length; i += batchSize) {
            const batch = RecordSet.slice(i, i + batchSize);

            for (const item of batch) {
                const id = item.CODIGO;
                const codigo_ibge = String(item.CODMUN).padStart(7, '0').substring(0, 7);
                const nome = item.NOME;
                const uf = item.UF;
                const codigo_uf = item.CODUF || 0;
                const pais_id = item.UF === 'EX' ? 2 : 1;

                // Se for cidade do Exterior (UF=EX), usamos o ID como código IBGE para evitar conflitos
                // Já que várias cidades do exterior podem vir com o mesmo código genérico (5860) no JSON
                const final_ibge = uf === 'EX' ? `EX${id}`.padEnd(7, '0').substring(0, 7) : codigo_ibge;

                await sql`
          INSERT INTO cidades (id, codigo_ibge, nome, uf, codigo_uf, pais_id, ativo)
          VALUES (${id}, ${final_ibge}, ${nome}, ${uf}, ${codigo_uf}, ${pais_id}, true)
          ON CONFLICT (id) DO UPDATE SET
            codigo_ibge = EXCLUDED.codigo_ibge,
            nome = EXCLUDED.nome,
            uf = EXCLUDED.uf,
            codigo_uf = EXCLUDED.codigo_uf,
            pais_id = EXCLUDED.pais_id;
        `;
            }
            process.stdout.write(`.`);
        }

        console.log('\n✅ Importação de cidades concluída com sucesso!');
    } catch (error) {
        console.error('\n❌ Erro na importação:', error);
    } finally {
        await sql.end();
    }
}

importCidades();
