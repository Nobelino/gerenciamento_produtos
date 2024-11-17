const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  }, // Nome de usuário (obrigatório e único).
  password: {
    type: String,
    required: true
  } // Senha (obrigatório).
}, { timestamps: true }); // Adiciona data de criação e atualização automaticamente.

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Antes de salvar, criptografa a senha.
  }
  next(); // Continua com o salvamento.
});

module.exports = mongoose.model('User', userSchema)
