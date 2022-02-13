const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //Si no existe, se crea

const ExtrasSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Precio: {
        type: Number,
        min: 0,
        required: true,
    },
});

module.exports = mongoose.model("Extras", ExtrasSchema, "Extras");