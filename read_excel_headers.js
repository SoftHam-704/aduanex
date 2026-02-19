
import pkg from 'xlsx';
const { readFile, utils } = pkg;

async function readHeaders() {
    const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[5]; // Aba 6 (índice 5)
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet, { header: 1 });
    console.log('Headers da aba 6:');
    console.log(data[0]);
}

readHeaders().catch(console.error);
