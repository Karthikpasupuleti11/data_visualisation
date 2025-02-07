const express = require('express');
const router = express.Router();
const Structure = require('../models/Structure');
const mongoose = require('mongoose');

router.get('/structures', async (req, res) => {
  try {
    // If MongoDB is connected, fetch from database
    if (mongoose.connection.readyState === 1) {
      const structures = await Structure.find({});
      return res.json({ structures });
    }
    // If MongoDB is not connected, use mock data
    return res.json({ structures: Structure.mockData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/structures/:id', async (req, res) => {
  try {
    let structure;
    // If MongoDB is connected, fetch from database
    if (mongoose.connection.readyState === 1) {
      structure = await Structure.findById(req.params.id);
    } else {
      // If MongoDB is not connected, use mock data
      structure = Structure.mockData.find(s => s._id === req.params.id);
    }
    
    if (!structure) {
      return res.status(404).json({ error: 'Structure not found' });
    }
    res.json({ structure });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;