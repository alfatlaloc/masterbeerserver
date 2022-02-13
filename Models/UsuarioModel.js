const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const UsuarioSchema = new mongoose.Schema({
    Correo: {
        type: String,
        unique: true,
        required: true,
    },
    Nombre: {
        type: String,
        required: true,
    },
    Contrasena: {
        type: String,
        minlength: 6,
        required: true,
    },
    RFC: {
        type: String,
        minlength: 12,
        maxlength: 13,
        required: false,
    },
    Fecha: {
        type: Date,
        required: true,
    },
    Tipo: {
        type: String,
        required: true,
    }

});

module.exports.Usuario = mongoose.model("Usuario", UsuarioSchema, "Usuario");