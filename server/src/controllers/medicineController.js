// server/src/controllers/medicineController.js
const Medicine = require('../models/Medicine.js');

// @desc    Add a new medicine
// @route   POST /api/medicine/add
// @access  Private
exports.addMedicine = async (req, res) => {
  const { name, dosage, time, frequency, startDate, endDate, photoURL } = req.body;
  const userId = req.user._id;

  try {
    const medicine = new Medicine({ userId, name, dosage, time, frequency, startDate, endDate, photoURL });
    const createdMedicine = await medicine.save();
    res.status(201).json(createdMedicine);
  } catch (error) {
    // Log the error to your server console for debugging
    console.error('Error adding medicine:', error);
    
    // Check if the error is a Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    // Send a generic 500 error response to the client
    res.status(500).json({ message: 'Server error: Failed to add medicine' });
  }
};

// @desc    Get all medicines for a user
// @route   GET /api/medicine
// @access  Private
exports.getMedicines = async (req, res) => {
  const userId = req.user._id;
  try {
    const medicines = await Medicine.find({ userId });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a medicine
// @route   PUT /api/medicine/:id
// @access  Private
exports.updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { name, dosage, time, frequency, startDate, endDate, photoURL } = req.body;
  const userId = req.user._id;

  try {
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Ensure the medicine belongs to the authenticated user
    if (medicine.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this medicine' });
    }

    medicine.name = name || medicine.name;
    medicine.dosage = dosage || medicine.dosage;
    medicine.time = time || medicine.time;
    medicine.frequency = frequency || medicine.frequency;
    medicine.startDate = startDate || medicine.startDate;
    medicine.endDate = endDate || medicine.endDate;
    medicine.photoURL = photoURL || medicine.photoURL;

    const updatedMedicine = await medicine.save();
    res.json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicine/:id
// @access  Private
exports.deleteMedicine = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Ensure the medicine belongs to the authenticated user
    if (medicine.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this medicine' });
    }

    await medicine.deleteOne();
    res.status(200).json({ message: 'Medicine removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};