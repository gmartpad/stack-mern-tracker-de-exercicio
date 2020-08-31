//requisitando o necessário pro funcionamento do back-end
const express = require('express');
const cors = require('cors');

//requisitando o mongoose para conexão com o MongoDB Atlas
const mongoose = require('mongoose');

//dotenv para constantes do ambiente de desenvolvimento
require('dotenv').config();

//criando o servidor Express
const app = express(); //criando o servidor
const port = process.env.port || 5000; //ditando em qual porta o servidor vai rodar

//middlewares
app.use(cors());//habilitando cors
app.use(express.json());//habilitando o parse de json

//conexões ao banco do MongoDB Atlas

const uri = process.env.ATLAS_URI //uri do banco de dados

mongoose.connect(uri, { //conectando ao MongoDB Atlas

    useNewUrlParser:true, //ativar o parser de url de conexão com o banco
    useCreateIndex:true, //ativa a criação de indexes
    useUnifiedTopology: true, 

});

const connection = mongoose.connection; //instância da conexão para manipular dados

connection.once('open', () => {
    console.log('Conexão com sucesso');
})

//Routes

const exercisesRouter = require('./routes/exercises');//recebendo o router do CRUD do exercices
const usersRouter = require('./routes/users');//recebendo o router do CRUD do users

app.use('/exercises', exercisesRouter);//determinando o endpoint pro exercicesRouter
app.use('/users', usersRouter);//determinando o endpoint pro usersRouter

app.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
});