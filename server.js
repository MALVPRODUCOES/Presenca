const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicione esta linha
const XLSX = require('xlsx');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST'], // Permite apenas GET e POST
    allowedHeaders: ['Content-Type'] // Permite cabeçalhos específicos
}));

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

const filePath = 'rsvp_data.xlsx';

app.post('/save', (req, res) => {
    const data = req.body;

    let workbook;
    let worksheet;
    
    // Verificar se o arquivo já existe
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
        worksheet = workbook.Sheets['RSVP'];
    } else {
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVP');
    }

    // Obter dados existentes e adicionar o novo
    const existingData = XLSX.utils.sheet_to_json(worksheet);
    existingData.push(data);
    const updatedWorksheet = XLSX.utils.json_to_sheet(existingData);

    workbook.Sheets['RSVP'] = updatedWorksheet;

    // Salvar no arquivo Excel
    XLSX.writeFile(workbook, filePath);
    res.send('Presença confirmada com sucesso!');
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
