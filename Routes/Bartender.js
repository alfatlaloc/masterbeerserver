const express = require("express");
const router = express.Router();
const BartenderM = require("../Models/BartenderModel");

router.get("/", async (req, res) => {
      try {
        const usuarios = await BartenderM.find();
        res.json(usuarios);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  });

router.post("/", async (req, res) => {
    console.log("llego");
    const bartender = new BartenderM({
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Correo: req.body.Correo,
      RFC: req.body.RFC,
      Contrasena: req.body.Contrasena,
      Fecha: req.body.Fecha,
      Tipo: req.body.Tipo,
      Sueldo: req.body.Sueldo,
      Horario:req.body.Horario
    });
    try {
      const newBartender= await bartender.save();
      res.status(201).json(newBartender);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = router;