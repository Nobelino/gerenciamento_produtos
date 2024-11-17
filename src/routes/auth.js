const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuário
router.post('/register', async (req, res) => {
    try {
      const user = new User(req.body); // Cria um novo usuário com os dados recebidos.
      await user.save(); // Salva o usuário no banco.
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Credenciais inválidas');
      }
      
      const isMatch = await bcrypt.compare(password, user.password); // Valida a senha.
      if (!isMatch) {
        throw new Error('Credenciais inválidas');
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '24h' }); // Gera um token JWT.
      res.json({ token }); // Retorna o token.
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;
