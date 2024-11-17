const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Criar categoria
router.post('/', auth, async (req, res) => {
    try {
      const category = new Category(req.body); // Cria nova categoria.
      await category.save(); // Salva no banco.
      res.status(201).json(category); // Retorna a categoria criada.
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Listar todas as categorias
  router.get('/', auth, async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Buscar categoria específica
  router.get('/:id', auth, async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Atualizar categoria
  router.put('/:id', auth, async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Deletar categoria
  router.delete('/:id', auth, async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
