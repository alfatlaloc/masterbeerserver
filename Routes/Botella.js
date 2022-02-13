const express = require("express");
const router = express.Router();
const BotellaM = require("../Models/BotellaModel");

// Getting all
//Obtiene todas las botellas de la BD
router.get("/", async(req, res) => {
    try {
        const botellas = await BotellaM.find();
        res.json(botellas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting all
//Obtiene todas las botellas de la para preview del menu
router.get("/preview", async(req, res) => {
    try {
        const botellas = await BotellaM.find(null, 'Nombre Marca Precio Contenido_N _id');
        res.json(botellas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Creating one
router.post("/", async(req, res) => {
    const botella = new BotellaM({
        Nombre: req.body.Nombre,
        Marca: req.body.Marca,
        Stock: req.body.Stock,
        Precio: req.body.Precio,
        Desc: req.body.Desc,
        Contenido_N: req.body.Contenido_N,
        Tipo: req.body.Tipo,
        Volumen_A: req.body.Volumen_A,
        volBP: req.body.volBP,
    });
    try {
        const newBotella = await botella.save();
        res.status(201).json(newBotella);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/", getBotella, async(req, res) => {
    console.log("Llego aqui");
    try {
        await res.Botella.remove();
        res.json({ message: "Deleted This Botella" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/", getBotella, async(req, res) => {
    console.log("patch");
    if (req.body.Nombre !== null) res.Botella.Nombre = req.body.Nombre;
    if (req.body.Marca !== null) res.Botella.Marca = req.body.Marca;
    if (req.body.Stock !== null) res.Botella.Stock = req.body.Stock;
    if (req.body.Precio !== null) res.Botella.Precio = req.body.Precio;
    if (req.body.Desc !== null) res.Botella.Desc = req.body.Desc;
    if (req.body.Contenido_N !== null)
        res.Botella.Contenido_N = req.body.Contenido_N;
    if (req.body.Tipo !== null) res.Botella.Tipo = req.body.Tipo;
    if (req.body.Volumen_A !== null) res.Botella.Volumen_A = req.body.Volumen_A;
    if (req.body.volBP !== null) res.Botella.volBP = req.body.volBP;

    try {
        const updatedBotella = await res.Botella.save();
        res.json(updatedBotella);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Getting One

router.get("/:id", getBotella, (req, res) => {
    res.json(res.Botella);
});

async function getBotella(req, res, next) {
    try {
        let Botella;
        if (req.query._id) Botella = await BotellaM.findById(req.query._id);
        if (req.params.id) Botella = await BotellaM.findById(req.params.id);
        if (req.body._id) Botella = await BotellaM.findById(req.body._id);

        if (Botella == null) {
            return res.status(404).json({ message: "Cant find Botella" });
        }
        res.Botella = Botella;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
}

module.exports = router;