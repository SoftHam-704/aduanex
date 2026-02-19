
import pkg from 'xlsx';
const { readFile, utils } = pkg;

async function checkSheet7() {
    const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[6]; // Aba "6" (índice 6)
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet);
    console.log(`Chaves na aba "${sheetName}":`);
    console.log(Object.keys(data[0]));
    console.log('Primeira linha:');
    console.log(JSON.stringify(data[0], null, 2));
}

checkSheet7().catch(console.error);
