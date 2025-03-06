const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const PORT = process.env.PORT || 3000;

// Inicializar o Firebase Admin SDK
const serviceAccount = require('./caminho/para/credenciais-firebase.json'); // Baixe as credenciais no Firebase Console
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Rota base
app.get('/', (req, res) => {
    res.send('Bem-vindo ao backend do RSVP com Firebase!');
});

// Rota para salvar dados no Firestore
app.post('/save', async (req, res) => {
    try {
        const data = req.body;
        const docRef = db.collection('rsvp').doc(); // 'rsvp' é a coleção
        await docRef.set(data);
        res.send('Presença confirmada com sucesso no Firebase!');
    } catch (error) {
        console.error('Erro ao salvar no Firebase:', error);
        res.status(500).send('Erro ao salvar dados.');
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
