
import pkg from 'xlsx';
const { readFile, utils } = pkg;

async function checkAllCols() {
    const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[5];
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet);
    console.log('Chaves disponíveis na linha 0:');
    console.log(Object.keys(data[0]));
}

checkAllCols().catch(console.error);
