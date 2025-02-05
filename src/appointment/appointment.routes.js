import { Router } from "express";
import { getCitas, saveAppointment, updateCitas } from "./appointment.controller.js";
import { createAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/", getCitas);

router.put("/updateCitas/:uid", updateCitas);

export default router;