const express = require("express");
const router = express.Router();
const Usuario = require("../Models/UsuarioModel").Usuario;

// Getting all

router.get("/", async (req, res) => {
  if (req.query.Correo && req.query.Contrasena) {
    loginUser(req, res);
  }
  else {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

// Getting One
router.get("/:id", getUsuario, (req, res) => {
  res.json(res.Usuario);
});

// Creating one
router.post("/", async (req, res) => {
  const usuario = new Usuario({
    Nombre: req.body.Nombre,
    Correo: req.body.Correo,
    Contrasena: req.body.Contrasena,
    Fecha: req.body.Fecha,
    Tipo: req.body.Tipo,
  });
  try {
    const newUsuario = await usuario.save();
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getUsuario, async (req, res) => {
  if (req.body.Correo != null) {
    res.Usuario.Correo = req.body.Correo;
  }
  if (req.body.Nombre != null) {
    res.Usuario.Nombre = req.body.Nombre;
  }
  if (req.body.Contraseña != null) {
    res.Usuario.Contraseña = req.body.Contraseña;
  }
  try {
    const updatedUsuario = await res.Usuario.save();
    res.json(updatedUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getUsuario, async (req, res) => {
  try {
    await res.Usuario.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUsuario(req, res, next) {
  try {
    const user = await Usuario.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.Usuario = user;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

async function loginUser(req, res) {
  try {
    const usuario = await Usuario.findOne({ Correo: req.query.Correo });
    console.log(req.query.Correo);
    //res.Usuario=usuario;
    if (usuario == null)
      return res.status(404).json({ message: "Usuario no registrado" });
    console.log(usuario.Contrasena);
    if (req.query.Contrasena === usuario.Contrasena) 
    {
      console.log("Logueado");
      return res.json(usuario);
    }
    else{
      console.log("Error pass");
      return res.status(500).json({ message: "bad pass" });
    }

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
