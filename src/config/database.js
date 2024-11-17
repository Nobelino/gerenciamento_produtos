// src/config/database.js
const mongoose = require('mongoose'); // Importa o driver para se conectar ao MongoDB.

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose.connect('mongodb+srv://gnobelino:Fc1UAz0BiKbtVuhj@cluster0.6lwal.mongodb.net/', options); // Conecta ao banco de dados usando a URL do MongoDB.
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message); // Mostra erros, caso ocorram.
    process.exit(1); // Encerra o aplicativo se a conexão falhar.
  }
};

module.exports = connectDB; // Exporta a função para ser usada em outros arquivos.
