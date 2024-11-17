const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { // Nome do produto.
    type: String,
    required: true
  },
  description: { // Descrição.
    type: String,
    required: true
  },
  amount: { // Quantidade em estoque.
    type: Number,
    required: true
  },
  price: { // Preço.
    type: Number,
    required: true
  },
  categories: [{ // Relaciona com categorias (uma ou mais).
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
