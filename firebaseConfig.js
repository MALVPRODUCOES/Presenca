// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Papa from 'papaparse';

const firebaseConfig = {
  apiKey: "AIzaSyATbfmmNZhhKwFNwww72AyBN39bkMg8rB8",
  authDomain: "aniversario-2c745.firebaseapp.com",
  projectId: "aniversario-2c745",
  storageBucket: "aniversario-2c745.firebasestorage.app",
  messagingSenderId: "902481257476",
  appId: "1:902481257476:web:c3003195170430e196c151",
  measurementId: "G-X9HFVLN8C3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportToCSV(collectionName: string) {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    const csv = Papa.unparse(data, {
      header: true, // Inclui o cabeçalho com os nomes dos campos
    });

    // Crie um link para download do CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collectionName}.csv`;
    a.click();
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Erro ao exportar para CSV:", error);
  }
}

//Exemplo de uso:
exportToCSV("rsvp"); // Substitua "suaColecao" pelo nome da sua coleção
