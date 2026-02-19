
import pkg from 'xlsx';
const { readFile, utils } = pkg;

async function previewData() {
    const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[5]; // Aba 6
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet);
    console.log('Primeiras 5 linhas da aba 6:');
    console.log(JSON.stringify(data.slice(0, 5), null, 2));
}

previewData().catch(console.error);
