const Appointment = require('../models/appointmentModel');

// ✅ Create a new appointment
const createAppointment = async (req, res) => {
  const { name, email, date, fileUrls } = req.body;

  // Ensure fileUrls is an array (even for a single file)
  const files = Array.isArray(fileUrls) ? fileUrls : [fileUrls];

  const appointment = new Appointment({
    name,
    email,
    date,
    fileUrls: files,  // Use the validated fileUrls
    user: req.user._id,  // Associate appointment with the user
  });

  try {
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(400).json({
      message: `Error creating appointment: ${error.message}`,
    });
  }
};

// ✅ Get all appointments for the logged-in user
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(400).json({
      message: `Error fetching appointments: ${error.message}`,
    });
  }
};

// ✅ Update an existing appointment
const updateAppointment = async (req, res) => {
  const { name, email, date, fileUrls } = req.body;
  const { id } = req.params;

  // Ensure fileUrls is an array (even for a single file)
  const files = Array.isArray(fileUrls) ? fileUrls : [fileUrls];

  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.user._id },  // Ensure the user owns the appointment
      { name, email, date, fileUrls: files },
      { new: true }  // Return the updated appointment
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(400).json({
      message: `Error updating appointment: ${error.message}`,
    });
  }
};

// ✅ Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      user: req.user._id,  // Ensure the user owns the appointment
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(400).json({
      message: `Error deleting appointment: ${error.message}`,
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
