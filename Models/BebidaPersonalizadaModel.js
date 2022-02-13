const mongoose = require('mongoose')
const Botella = require('./BotellaModel')
const BotellaSchema = mongoose.model('Botella').schema
const Ingrediente = require('./IngredienteModel')
const IngredienteSchema = mongoose.model('Ingrediente').schema
const Extra = require('./ExtrasModel')
const ExtrasSchema = mongoose.model('Extra').schema
const Recipiente = require('./RecipienteModel')
const RecipienteSchema = mongoose.model('Recipiente').schema

mongoose.connect("mongodb+srv://aternam:masterbeer@cluster0.h0bpw.mongodb.net/MasterBeer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const BebidaPersonalizadaSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        unique: true,
        required: true
    },
    Precio: {
        type: Number,
        required: true,
    },
    Botellas: [BotellaSchema],
    Ingredientes: [IngredienteSchema],
    Extras: [ExtrasSchema],
    Recipientes: [RecipienteSchema]
})

module.exports = mongoose.model('BebidaPersonalizada', BebidaPersonalizadaSchema, 'BebidaPersonalizada');