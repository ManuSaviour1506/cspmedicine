// server/src/routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const { 
  addMedicine, 
  getMedicines, 
  updateMedicine, 
  deleteMedicine 
} = require('../controllers/medicineController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Protect all routes with the `protect` middleware
router.post('/add', protect, addMedicine);
router.get('/', protect, getMedicines);
router.put('/:id', protect, updateMedicine);
router.delete('/:id', protect, deleteMedicine);

module.exports = router;