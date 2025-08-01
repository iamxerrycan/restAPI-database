const Appointment = require('../models/appointmentModel');

const createAppointment = async (data) => {
  try {
    const { name, email, date, fileUrls, user } = data;

    if (!name || !email || !date || !user) {
      throw new Error('Missing required fields: name, email, date, or user.');
    }

    const files = Array.isArray(fileUrls) ? fileUrls : fileUrls ? [fileUrls] : [];

    const appointment = new Appointment({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      date: new Date(date),
      fileUrls: files,
      user,
    });

    return await appointment.save();
  } catch (error) {
    throw new Error(`Create failed: ${error.message}`);
  }
};

const getAppointments = async (userId) => {
  try {
    return await Appointment.find({ user: userId });
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
};

const updateAppointment = async (id, updatedData) => {
  try {
    const { name, email, date, fileUrls, user } = updatedData;

    const files = Array.isArray(fileUrls) ? fileUrls : [fileUrls];

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, user },
      { name, email, date, fileUrls: files },
      { new: true }
    );

    return appointment;
  } catch (error) {
    throw new Error(`Error updating appointment: ${error.message}`);
  }
};

const deleteAppointment = async (id, userId) => {
  if (!id || !userId) {
    throw new Error("Missing id or userId");
  }

  const deleted = await Appointment.findOneAndDelete({ _id: id, user: userId });
  return deleted;
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
