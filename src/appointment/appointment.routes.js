import { Router } from "express";
import { getAppoiment, saveAppointment, updateAppointment, cancelarAppointment } from "./appointment.controller.js";
import { createAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/", getAppoiment);

router.put("/updateAppointment/:uid", createAppointmentValidator, updateAppointment);

router.patch("/cancelarAppointment/:uid", cancelarAppointment)

export default router;