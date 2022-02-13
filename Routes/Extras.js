const express = require("express");
const router = express.Router();
const ExtraM = require("../Models/ExtrasModel");

router.get("/", async (req, res) => {
  console.log("RES" + req.body);
  try {
    const Extras = await ExtraM.find();
    res.json(Extras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  console.log("req" + req.body.Nombre);
  const Extra = new ExtraM({
    Nombre: req.body.Nombre,
    Precio: req.body.Precio
  });
  try {
    const newExtra = await Extra.save();
    res.status(201).json(newExtra);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/", getExtra, async (req, res) => {
  console.log("patch");
  if (req.body.Nombre !== null) res.Extra.Nombre = req.body.Nombre;
  if (req.body.Precio !== null) res.Extra.Precio = req.body.Precio;
  try {
    const updatedExtra = await res.Extra.save();
    res.json(updatedExtra);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/", getExtra, async (req, res) => {
  console.log(req.query._id);
  try {
    await res.Extra.remove();
    res.json({ message: "Deleted This Extra" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getExtra(req, res, next) {
  try {
    let Extra;
    if (req.query._id) Extra = await ExtraM.findById(req.query._id);
    if (req.params.id) Extra = await ExtraM.findById(req.params.id);
    if (req.body._id) Extra = await ExtraM.findById(req.body._id);
    if (Extra == null) {
      return res.status(404).json({ message: "Cant find subscriber" });
    }
    res.Extra = Extra;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

module.exports = router;