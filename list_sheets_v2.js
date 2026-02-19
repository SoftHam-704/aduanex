
import pkg from 'xlsx';
const { readFile } = pkg;

async function listSheets() {
    const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
    try {
        const workbook = readFile(filePath);
        console.log('Abas disponíveis:');
        workbook.SheetNames.forEach((name, index) => {
            console.log(`${index + 1}: ${name}`);
        });
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error.message);
    }
}

listSheets().catch(console.error);
