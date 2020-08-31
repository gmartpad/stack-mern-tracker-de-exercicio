import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; //dependência para realizar a conexão do front-end com o back-end da aplicação

const Exercise = (props) => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>Editar</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Deletar</a>
            </td>
        </tr>
    )
}

export default class ExercisesList extends Component {
    
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};

    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/') //requisição GET que pega todos os exercícios
            .then(res => {
                this.setState({ exercises: res.data }) //setta os exercícios para o array que é extraído do res.data
            })
            .catch(err => console.log(err))//printa o erro no console.log do navegador
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id) //requisição DELETE recebendo o id do exercício como argumento
            .then(res => console.log(res.data)); //printa a mensagem no console de que o exercício foi deletado
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id) //vai settar os exercícios para todos os exercícios atuais, menos o com id igual ao que acabou de ser deletado do banco
        })

    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }
    
    render() {
        return (
            <div>
                <h3>Entradas de exercícios</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nome de usuário</th>
                            <th>Descrição</th>
                            <th>Duração</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}