const validateAppointment = (req, res, next) => {
  const { name, email, number, serviceType } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters long');
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!number || number.trim().length < 10) {
    errors.push('Phone number is required and must be at least 10 digits');
  }

  if (!serviceType || serviceType.trim().length === 0) {
    errors.push('Service type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

module.exports = {
  validateAppointment
};