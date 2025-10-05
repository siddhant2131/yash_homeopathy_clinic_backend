const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { validateAppointment } = require('../middleware/validation');

// POST /api/appointments - Create new appointment
router.post('/', validateAppointment, createAppointment);

// GET /api/appointments - Get all appointments
router.get('/', getAppointments);

// GET /api/appointments/:id - Get single appointment
router.get('/:id', getAppointment);

// PUT /api/appointments/:id - Update appointment
router.put('/:id', updateAppointment);

// DELETE /api/appointments/:id - Delete appointment
router.delete('/:id', deleteAppointment);

module.exports = router;