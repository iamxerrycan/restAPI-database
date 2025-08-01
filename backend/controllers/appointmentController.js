const appointmentService = require('../services/appointmentService');

const createAppointmentController = async (req, res) => {
  try {
    const fileUrls = req.file ? [`/uploads/${req.file.filename}`] : [];

    const appointment = await appointmentService.createAppointment({
      ...req.body,
      fileUrls,
      user: req.user._id,
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

const getAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments(req.user._id);
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

const updateAppointmentController = async (req, res) => {
  try {
    const fileUrls = req.file ? [`/uploads/${req.file.filename}`] : [];

    const updatedData = {
      ...req.body,
      ...(fileUrls.length > 0 && { fileUrls }),
    };

    const appointment = await appointmentService.updateAppointment(req.params.id, updatedData);

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

const deleteAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.deleteAppointment(id, req.user._id);

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
