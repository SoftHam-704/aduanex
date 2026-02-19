
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

async function importPaises() {
    try {
        const paises = [
            { id: 1, codigo_bacen: '1058', codigo_iso: 'BR', nome_pt: 'Brasil', nome_en: 'Brazil' },
            { id: 249, codigo_bacen: '2496', codigo_iso: 'US', nome_pt: 'Estados Unidos', nome_en: 'United States' },
            { id: 160, codigo_bacen: '1600', codigo_iso: 'CN', nome_pt: 'China', nome_en: 'China' },
            { id: 23, codigo_bacen: '0639', codigo_iso: 'AR', nome_pt: 'Argentina', nome_en: 'Argentina' },
            { id: 247, codigo_bacen: '2470', codigo_iso: 'DE', nome_pt: 'Alemanha', nome_en: 'Germany' },
            { id: 386, codigo_bacen: '3653', codigo_iso: 'JP', nome_pt: 'Japão', nome_en: 'Japan' },
            { id: 275, codigo_bacen: '2758', codigo_iso: 'FR', nome_pt: 'França', nome_en: 'France' },
            { id: 361, codigo_bacen: '3611', codigo_iso: 'IT', nome_pt: 'Itália', nome_en: 'Italy' },
            { id: 149, codigo_bacen: '1498', codigo_iso: 'CA', nome_pt: 'Canadá', nome_en: 'Canada' },
            { id: 845, codigo_bacen: '8451', codigo_iso: 'GB', nome_pt: 'Reino Unido', nome_en: 'United Kingdom' },
            { id: 158, codigo_bacen: '1589', codigo_iso: 'CH', nome_pt: 'Suíça', nome_en: 'Switzerland' },
            { id: 586, codigo_bacen: '5860', codigo_iso: 'PY', nome_pt: 'Paraguai', nome_en: 'Paraguay' },
            { id: 848, codigo_bacen: '8486', codigo_iso: 'UY', nome_pt: 'Uruguai', nome_en: 'Uruguay' },
            { id: 154, codigo_bacen: '1546', codigo_iso: 'CL', nome_pt: 'Chile', nome_en: 'Chile' },
            { id: 493, codigo_bacen: '4936', codigo_iso: 'MX', nome_pt: 'México', nome_en: 'Mexico' },
            { id: 245, codigo_bacen: '2453', codigo_iso: 'ES', nome_pt: 'Espanha', nome_en: 'Spain' },
            { id: 676, codigo_bacen: '6769', codigo_iso: 'PT', nome_pt: 'Portugal', nome_en: 'Portugal' },
            { id: 2, codigo_bacen: '9999', codigo_iso: 'EX', nome_pt: 'Exterior', nome_en: 'Foreign' }
        ];

        console.log('Populando tabela paises com países estratégicos...');

        for (const pais of paises) {
            await sql`
        INSERT INTO paises (id, codigo_bacen, codigo_iso, nome_pt, nome_en, ativo)
        VALUES (${pais.id}, ${pais.codigo_bacen}, ${pais.codigo_iso}, ${pais.nome_pt}, ${pais.nome_en}, true)
        ON CONFLICT (id) DO UPDATE SET
          codigo_bacen = EXCLUDED.codigo_bacen,
          codigo_iso = EXCLUDED.codigo_iso,
          nome_pt = EXCLUDED.nome_pt,
          nome_en = EXCLUDED.nome_en;
      `;
        }

        console.log('✅ Países importados com sucesso!');
    } catch (error) {
        console.error('❌ Erro na importação:', error);
    } finally {
        await sql.end();
    }
}

importPaises();
