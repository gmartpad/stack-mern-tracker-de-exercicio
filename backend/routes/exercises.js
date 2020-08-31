const router = require('express').Router(); //chamando o router 
const Exercice = require('../models/exercise.model'); //chamando o modelo 
const { response, Router } = require('express');
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercice.find() //exercises do banco
        .then(exercises => res.json(exercises)) // devolve todos os exercícios
        .catch(err => response.status(400).json('Error: '+err)); // devolve o status 400 com a mensagem do erro
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercice({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercício salvo!'))
        .catch(err => res.status(404).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id) //exercício pelo id
        .then(exercise => res.json(exercise)) // devolve o exercício
        .catch(err => res.status(400).json('Error: '+err)); // devolve o status de erro e a mensagem com o erro
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id) //achar o exercício pelo id e deletar ele
        .then(() => res.json("Exercício Deletado"))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/update/:id').post((req, res) => { // localhost:5000/exercises/update/:id e e um requisição POST
    Exercise.findById(req.params.id) //exercício pelo id
        .then(exercise => {
            exercise.username = req.body.username,
            exercise.description = req.body.description,
            exercise.duration = Number(req.body.duration),
            exercise.date =  Date.parse(req.body.date),

            exercise.save() //salvou o exercício atualizado
                .then(() => res.json('Exercício atualizado!'))
                .catch(err => res.status(400).json('Error: '+err))
        })
        .catch(err => res.status(400).json("Error: "+err));
})

module.exports = router;