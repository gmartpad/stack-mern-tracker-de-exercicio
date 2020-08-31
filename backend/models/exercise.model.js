const mongoose = require('mongoose');//mongoose para criação de models

const Schema = mongoose.Schema; //estrutura da collection

const exerciseSchema = new Schema({ //estruturando o schema do usuário
    username: { type: String, required: true, },
    description: { type: String, required: true, },
    duration: { type: Number, required: true, },
    date: { type: Date, requited: true, } 
}, {
    timestamps: true, //criados campos de criação e edição
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

