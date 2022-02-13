const express = require("express");
const router = express.Router();
const RecipienteM = require("../Models/RecipienteModel");

router.get("/", async (req, res) => {
  console.log("RES" + req.body);
  try {
    const recipientes = await RecipienteM.find();
    res.json(recipientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  console.log("req" + req.body.Nombre);
  const recipiente = new RecipienteM({
    Tipo: req.body.Tipo,
    Material: req.body.Material,
    Volumen: req.body.Volumen,
    Stock: req.body.Stock,
    AlcoholP: req.body.AlcoholP,
  });
  try {
    const newRecipiente = await recipiente.save();
    res.status(201).json(newRecipiente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/", getRecipiente, async (req, res) => {
  console.log("patch");
  if (req.body.AlcoholP !== null) res.Recipiente.AlcoholP = req.body.AlcoholP;
  if (req.body.Volumen !== null) res.Recipiente.Volumen = req.body.Volumen;
  if (req.body.Stock !== null) res.Recipiente.Stock = req.body.Stock;
  if (req.body.Material !== null) res.Recipiente.Material = req.body.Material;
  if (req.body.Tipo !== null) res.Recipiente.Tipo = req.body.Tipo;
  try {
    const updatedRecipiente = await res.Recipiente.save();
    res.json(updatedRecipiente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/", getRecipiente, async (req, res) => {
  console.log(req.query._id);
  try {
    await res.Recipiente.remove();
    res.json({ message: "Deleted This Recipiente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRecipiente(req, res, next) {
  try {
    let Recipiente;
    if (req.query._id) Recipiente = await RecipienteM.findById(req.query._id);
    if (req.params.id) Recipiente = await RecipienteM.findById(req.params.id);
    if (req.body._id) Recipiente = await RecipienteM.findById(req.body._id);
    if (Recipiente == null) {
      return res.status(404).json({ message: "Cant find subscriber" });
    }
    res.Recipiente = Recipiente;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

module.exports = router;
