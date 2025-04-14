const appointmentService = require('../services/appointmentService');

// ✅ CREATE CONTROLLER
const createAppointmentController = async (req, res) => {
  try {
    // ✅ Fixed path and fallback if no files
    const fileUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const appointment = await appointmentService.createAppointment({
      ...req.body,
      fileUrls, // ✅ Make sure model field name is 'files'
    });

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET CONTROLLER
const getAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments();
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ UPDATE CONTROLLER
const updateAppointmentController = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
    
    // ✅ Added 404 check if not found
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ DELETE CONTROLLER
const deleteAppointmentController = async (req, res) => {
  try {
    const appointment = await appointmentService.deleteAppointment(req.params.id);

    // ✅ Added 404 check if not found
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAppointmentController,
  getAppointmentsController,
  updateAppointmentController,
  deleteAppointmentController,
};
