const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, }); //Si no existe, se crea

const RecipienteSchema = new mongoose.Schema({
    Tipo: {
        type: String,
        required: true
    },
    Volumen: {
        Cantidad: { type: Number, required: true },
        Unidad: { type: String, required: true }
    },
    Material: {
        type: String,
        required: true
    },
    Stock: {
        type: Number,
        min: 0,
        required: true,
    },
    AlcoholP: {
        type: Number,
        min: 0,
        required: true
    }

})

module.exports = mongoose.model('Recipiente', RecipienteSchema, 'Recipiente')