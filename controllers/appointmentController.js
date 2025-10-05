const Appointment = require('../models/Appointment');

// Create new appointment
const createAppointment = async (req, res, next) => {
  try {
    const { name, email, number, serviceType, message } = req.body;

    const appointment = await Appointment.create({
      name,
      email,
      number,
      serviceType,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully! We will contact you soon.',
      data: {
        id: appointment._id,
        name: appointment.name,
        email: appointment.email,
        serviceType: appointment.serviceType,
        status: appointment.status
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all appointments
const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// Get single appointment
const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// Update appointment
const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// Delete appointment
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment
};