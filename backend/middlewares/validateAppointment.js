const validateAppointment = (req, res, next) => {
  const { name, date, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Name is required and must be a non-empty string.' });
  }

  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }

  if (!date || typeof date !== 'string' || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: 'Date is required and must be a valid date string.' });
  }

  next();
};

module.exports = validateAppointment;
