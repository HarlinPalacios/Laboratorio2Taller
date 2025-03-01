import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    });
  }
};

//listar citas
export const getAppoiment = async (req, res) => {
  try{
      const { limite = 5, desde = 0 } = req.query
      const query = { status: "CREATED" }

      const [total, appointments ] = await Promise.all([
          Appointment.countDocuments(query),
          Appointment.find(query)
              .skip(Number(desde))
              .limit(Number(limite))
      ])

      return res.status(200).json({
          success: true,
          message: "Lista de las citas",
          total,
          appointments
      })
  }catch(err){
      return res.status(500).json({
          success: false,
          message: "Error al obtener los las citas",
          error: err.message
      })
  }
}

//Actualizar Citas
export const updateAppointment = async (req, res) => {
  try {
      const { uid } = req.params;
      const  data  = req.body;

      const appointment = await Appointment.findByIdAndUpdate(uid, data, { new: true });

      res.status(200).json({
          success: true,
          msg: 'Cita Actualizada',
          appointment
      })
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: 'Error al actualizar cita',
          error: err.message
      });
  }
}

//Cancelar cita
export const cancelarAppointment = async (req, res) => {
  try{
      const { uid } = req.params

      await Appointment.findByIdAndUpdate(uid, {status: "CANCELLED"}, {new: true})

      return res.status(200).json({
          success: true,
          message: "Cita cancelada",
      })
  }catch(err){
      return res.status(500).json({
          success: false,
          message: "Error al cancelar la cita",
          error: err.message
      })
  }
}