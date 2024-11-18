require('dotenv').config(); // Carrega variáveis do arquivo `.env`.
const express = require('express');
const connectDB = require('./config/database'); // Conecta ao MongoDB.
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(express.json()); // Permite receber dados em formato JSON.

// Rotas
app.use('/api/auth', require('./routes/auth')); // Rotas de autenticação.
app.use('/api/categories', require('./routes/categories')); // Rotas de categorias.
app.use('/api/products', require('./routes/products')); // Rotas de produtos.

const PORT = process.env.PORT || 5501;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
