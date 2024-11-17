const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { // Nome da categoria.
    type: String,
    required: true
  }, 
  description: { // Descrição da categoria.
    type: String,
    required: true
  }
}, { timestamps: true }); // Adiciona data de criação e atualização automaticamente.

module.exports = mongoose.model('Category', categorySchema);
