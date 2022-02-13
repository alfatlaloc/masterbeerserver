const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, }); //Si no existe, se crea

const ProvedoresSchema = new mongoose.Schema({
    Razon: {
        type: String,
        required: true
    },
    RFC: {
        type: String,
        unique: true,
        min: 12,
        max: 13,
        required: true
    }
})

module.exports = mongoose.model('Provedores', ProvedoresSchema, 'Provedores')