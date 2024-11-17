const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Lê o token JWT.
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Valida o token.
    req.userId = decoded.userId; // Armazena o ID do usuário no `req`.
    next(); // Permite o acesso à rota.
  } catch (error) {
    res.status(401).json({ error: 'Por favor, autentique-se.' }); // Se falhar, retorna erro.
  }
};

module.exports = auth;
