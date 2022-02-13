const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const BartenderSchema = new mongoose.Schema({
    Correo: {
        type: String,
        unique: true,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Contrasena: {
        type: String,
        minlength: 6,
        required: true,
    },
    Apellido: {
        type: String,
        required: true,
    },
    RFC: {
        type: String,
        minlength: 12,
        maxlength: 13,
        required: true,
    },
    Fecha: {
        type: Date,
        required: true,
    },
    TIpo: {
        type: String,
        required: true,
    },
    Sueldo: {
        type: Number,
        required: true,
    },
    Horario: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('Bartender', BartenderSchema, 'Usuario');