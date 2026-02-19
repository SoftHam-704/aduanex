
import pkg from 'xlsx';
const { readFile, utils } = pkg;

async function scanSheets() {
    const filePath = 'e:/Sistemas_ia/SalesMasters/data/TABELAS_AUXILIARES.xlsx';
    const workbook = readFile(filePath);

    for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet, { header: 1 });
        if (data.length > 0) {
            console.log(`Sheet: ${sheetName} | Headers: ${data[0].slice(0, 5).join(', ')}`);
        }
    }
}

scanSheets().catch(console.error);
