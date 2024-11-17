const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');


// Criar produto
router.post('/', auth, async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Listar todos os produtos
  router.get('/', auth, async (req, res) => {
    try {
      const products = await Product.find().populate('categories');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Buscar produto específico
  router.get('/:id', auth, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('categories');
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Atualizar produto
  router.put('/:id', auth, async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('categories');
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Deletar produto
  router.delete('/:id', auth, async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Buscar produtos por categoria
  router.get('/category/:categoryId', auth, async (req, res) => {
    try {
      const products = await Product.find({
        categories: req.params.categoryId
      }).populate('categories');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Buscar todas as categorias com seus produtos
  router.get('/categories/all', auth, async (req, res) => {
    try {
      const products = await Product.find().populate('categories');
      const categoriesWithProducts = {};
      
      products.forEach(product => {
        product.categories.forEach(category => {
          if (!categoriesWithProducts[category._id]) {
            categoriesWithProducts[category._id] = {
              ...category.toObject(),
              products: []
            };
          }
          categoriesWithProducts[category._id].products.push(product);
        });
      });
      
      res.json(Object.values(categoriesWithProducts));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;