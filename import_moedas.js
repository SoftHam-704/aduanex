
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

async function importMoedas() {
    try {
        const moedas = [
            { id: 220, codigo: 'USD', nome: 'Dólar Americano', simbolo: 'US$' },
            { id: 978, codigo: 'EUR', nome: 'Euro', simbolo: '€' },
            { id: 790, codigo: 'BRL', nome: 'Real Brasileiro', simbolo: 'R$' },
            { id: 826, codigo: 'GBP', nome: 'Libra Esterlina', simbolo: '£' },
            { id: 756, codigo: 'CHF', nome: 'Franco Suíço', simbolo: 'CHF' },
            { id: 11, codigo: 'ARS', nome: 'Peso Argentino', simbolo: '$' },
            { id: 159, codigo: 'CLP', nome: 'Peso Chileno', simbolo: '$' },
            { id: 858, codigo: 'UYU', nome: 'Peso Uruguaio', simbolo: '$U' },
            { id: 690, codigo: 'PYG', nome: 'Guarani', simbolo: '₲' },
            { id: 124, codigo: 'CAD', nome: 'Dólar Canadense', simbolo: 'C$' },
            { id: 388, codigo: 'JPY', nome: 'Iene Japonês', simbolo: '¥' },
            { id: 156, codigo: 'CNY', nome: 'Yuan Chinês', simbolo: '¥' }
        ];

        console.log('Populando tabela moedas...');

        for (const moeda of moedas) {
            await sql`
        INSERT INTO moedas (id, codigo, nome, simbolo, ativo)
        VALUES (${moeda.id}, ${moeda.codigo}, ${moeda.nome}, ${moeda.simbolo}, true)
        ON CONFLICT (id) DO UPDATE SET
          codigo = EXCLUDED.codigo,
          nome = EXCLUDED.nome,
          simbolo = EXCLUDED.simbolo;
      `;
        }

        console.log('✅ Moedas importadas com sucesso!');
    } catch (error) {
        console.error('❌ Erro na importação:', error);
    } finally {
        await sql.end();
    }
}

importMoedas();
