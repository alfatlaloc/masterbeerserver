const express = require("express");
const router = express.Router();
const IngredienteM = require("../Models/IngredienteModel");

router.get("/", async (req, res) => {
  try {
    const ingredientes = await IngredienteM.find();
    res.json(ingredientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  console.log("req" + req.body.Nombre);
  const Ingrediente = new IngredienteM({
    Nombre: req.body.Nombre,
    Volumen: req.body.Volumen,
    Stock: req.body.Stock,
    Precio: req.body.Precio,
    Tipo: req.body.Tipo,
  });
  try {
    const newIngrediente = await Ingrediente.save();
    res.status(201).json(newIngrediente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/", getIngrediente, async (req, res) => {
  console.log("patch");
  if (req.body.Nombre !== null) res.Ingrediente.Nombre = req.body.Nombre;
  if (req.body.Volumen !== null) res.Ingrediente.Volumen = req.body.Volumen;
  if (req.body.Stock !== null) res.Ingrediente.Stock = req.body.Stock;
  if (req.body.Precio !== null) res.Ingrediente.Precio = req.body.Precio;
  if (req.body.Tipo !== null) res.Ingrediente.Tipo = req.body.Tipo;
  try {
    const updatedIngrediente = await res.Ingrediente.save();
    res.json(updatedIngrediente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/", getIngrediente, async (req, res) => {
  console.log(req.query._id);
  try {
    await res.Ingrediente.remove();
    res.json({ message: "Deleted This Ingrediente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getIngrediente(req, res, next) {
  try {
    let Ingrediente;
    if (req.query._id) Ingrediente = await IngredienteM.findById(req.query._id);
    if (req.params.id) Ingrediente = await IngredienteM.findById(req.params.id);
    if (req.body._id) Ingrediente = await IngredienteM.findById(req.body._id);
    if (Ingrediente == null) {
      return res.status(404).json({ message: "Cant find subscriber" });
    }
    res.Ingrediente = Ingrediente;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

module.exports = router;
