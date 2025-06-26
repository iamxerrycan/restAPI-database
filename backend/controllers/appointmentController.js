const appointmentService = require('../services/appointmentService');

// ✅ CREATE CONTROLLER
const createAppointmentController = async (req, res) => {
  try {
    // ✅ Correct for single file upload
    const fileUrls = req.file ? [`/uploads/${req.file.filename}`] : [];

    console.log('Received data:', req.body);
    console.log('req.file:', req.file);
    console.log('File URLs:', fileUrls); 
    console.log("BODY TYPE:", typeof req.body);
console.log("BODY VALUE:", req.body);   

    const appointment = await appointmentService.createAppointment({
      ...req.body,
      fileUrls, // Include fileUrls in the appointment data
      user: req.user._id, // Associate appointment with the user
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

    const fileUrls = req.file ? [`/uploads/${req.file.filename}`] : [];

    const updatedData = {
      ...req.body,  // Spread other data (name, email, date)
      ...(fileUrls.length > 0 && { fileUrls }), // If file uploaded, include fileUrls
    };

    const appointment = await appointmentService.updateAppointment(req.params.id, updatedData);
    
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
