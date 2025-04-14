const Appointment = require('../models/appointmentModel');

// ✅ CREATE APPOINTMENT
const createAppointment = async ({name ,email,date,fileUrls}) => {
const newAppointment = new Appointment({
  name,
  email,
  date,
  fileUrls,
});

console.log("name", name ,"email", email, "date", date, "fileUrls", fileUrls);
try {
  return await newAppointment.save();
} catch (error) {
  throw new Error("Error creating appointment: " + error.message);
}
};

// ✅ UPDATE APPOINTMENT
const updateAppointment = async (id, data) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, data, { new: true });
    
    // ✅ Added check if appointment not found
    if (!updatedAppointment) {
      throw new Error("Appointment not found.");
    }

    return updatedAppointment;
  } catch (error) {
    throw new Error("Error updating appointment: " + error.message);
  }
};

// ✅ DELETE APPOINTMENT
const deleteAppointment = async (id) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    // ✅ Added check if appointment not found
    if (!deletedAppointment) {
      throw new Error("Appointment not found.");
    }

    return deletedAppointment;
  } catch (error) {
    throw new Error("Error deleting appointment: " + error.message);
  }
};

// ✅ GET ALL APPOINTMENTS
const getAppointments = async () => {
  try {
    return await Appointment.find();
  } catch (error) {
    throw new Error("Error getting appointments: " + error.message);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};

