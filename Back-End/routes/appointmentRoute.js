const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const validateAppointment = require("../middlewares/validateAppointment");
const {
  createAppointmentController,
  getAppointmentsController,
  updateAppointmentController,
  deleteAppointmentController
} = require("../controllers/appointmentController");

router.post('/add', upload.single('file'),validateAppointment, createAppointmentController);
router.get(`/`, getAppointmentsController);
router.put(`/:id`, updateAppointmentController);
router.delete(`/:id`, deleteAppointmentController);


module.exports = router;