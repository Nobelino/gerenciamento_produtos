// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose.connect('mongodb+srv://gnobelino:Fc1UAz0BiKbtVuhj@cluster0.6lwal.mongodb.net/', options);
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;