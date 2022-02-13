const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //Si no existe, se crea

const BotellaSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        unique: true,
        required: true,
    },
    Marca: {
        type: String,
        required: true,
    },
    Stock: {
        type: Number,
        min: 0,
        required: true,
    },
    Precio: {
        type: Number,
        required: true,
    },
    Desc: {
        type: String,
        required: true,
    },
    Volumen_A: {
        type: Number,
        required: true,
    },
    Tipo: {
        type: String,
        required: true,
    },
    Contenido_N: {
        Cantidad: {
            required: true,
            type: Number
        },
        Unidad: {
            required: true,
            type: String
        },
    },
    volBP: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Botella", BotellaSchema, "Botella");