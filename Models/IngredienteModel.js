const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, }); //Si no existe, se crea

const IngredienteSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        unique: true,
        required: true
    },
    Tipo: {
        type: String,
        required: true
    },
    Precio: {
        type: Number,
        required: true
    },
    Volumen: {
        Cantidad: { type: Number, required: true },
        Unidad: { type: String, required: true }
    },
    Stock: {
        type: Number,
        min: 0,
        required: true,
    }
})

module.exports = mongoose.model('Ingrediente', IngredienteSchema, 'Ingrediente')