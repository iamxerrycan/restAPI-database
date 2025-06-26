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
const protect = require("../middlewares/authMiddleware");

router.post('/add' , protect ,  upload.single('file'),validateAppointment, createAppointmentController);
router.get(`/`,protect, getAppointmentsController);
router.put('/:id',protect,  upload.single('file'),validateAppointment, updateAppointmentController);
router.delete(`/:id`,protect, deleteAppointmentController);


module.exports = router;

