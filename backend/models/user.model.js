const mongoose = require('mongoose');//mongoose para criação de models

const Schema = mongoose.Schema; //estrutura da collection

const userSchema = new Schema({ //estruturando o schema do usuário
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    }
}, {
    timestamps: true, //criados campos de criação e edição
});

const User = mongoose.model('User', userSchema);

module.exports = User;

