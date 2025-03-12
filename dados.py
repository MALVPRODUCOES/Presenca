import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# Inicializar o aplicativo Firebase
cred = credentials.Certificate('caminho/para/seu/arquivo-json-de-conta-de-servico.json')
firebase_admin.initialize_app(cred)

# Conectar ao Firestore
db = firestore.client()

# Recuperar os dados do Firebase
docs = db.collection('convidados').stream()

# Converter os dados para um DataFrame do pandas
data = [doc.to_dict() for doc in docs]
df = pd.DataFrame(data)

# Filtrar os convidados confirmados
convidados_confirmados = df[df['confirmado'] == True]

# Gerar a planilha dos convidados confirmados
convidados_confirmados.to_excel('convidados_confirmados.xlsx', index=False)

print('Planilha gerada com sucesso!')
