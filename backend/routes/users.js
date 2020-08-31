const router = require('express').Router(); //chamando o router 
let User = require('../models/user.model'); //chamando o modelo 

router.route('/').get((req, res) => {
    User.find() //todos os usuários
        .then(users => res.json(users)) //devolve todos os usuários
        .catch(err => res.status(400).json('Error: ' + err)); //devolve o status 400 e a mensagem com o erro
});

router.route('/add').post((req, res) => { 
    const username = req.body.username;

    const newUser = new User({username}); //instancia nova de usuário

    newUser.save() //salva a instancia nova
        .then(() => res.json('Usuário adicionado!')) // o usuario foi adicionado
        .catch(err => res.status(400).json('Error: '+err)); //devolve código 404 e um aviso com o erro

});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id) //o usuário pelo id
        .then(user => res.json(user)) //devolve o usuário
        .catch(err => res.status(400).json('Error: '+err)); //devolve o status 404 e a mensagem de erro
});

router.route('/:id').delete((req, res) => { 
    User.findByIdAndDelete(req.params.id) //o usuário pelo id e deleta ele
        .then(() => res.json("Usuário Deletado!")) //o usuário foi deletado
        .catch(err => res.status(400).json('Error: '+err)) //devolve o status 404 e a mensagem com o erro
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id) //o usuário pelo id
        .then(user => {
            username = req.body.username

            user.save() // usuário atualizado
                .then(() => res.json("Usuário atualizado!"))// o usuário foi atualizado
                .catch(err => res.status(400).json('Error: '+err))// devolve status 400 e a mensagem com o erro
        })
        .catch(err => res.status(400).json('Error: '+err))// devolve status 400 e a mensagem com o erro
});

module.exports = router;