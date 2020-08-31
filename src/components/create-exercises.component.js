import React, { Component } from 'react';
import axios from 'axios'; //dependência para realizar a conexão do front-end com o back-end da aplicação
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercises extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/users') //requisição GET para pegar todos os usuários
            .then(res => {
                if (res.data.length > 0){ // se houver mais de 0 usuários no banco, pode passar
                    this.setState({
                        users: res.data.map(user => user.username), //itera por todes es usuáries, adicionando elus ao array users
                        username: res.data[0].username, // setta o valor de username como o username de primeire usuárie do banco
                    });
                }
            });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date
        });
    }

    onSubmit (e) {
        e.preventDefault();
        
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise) //enviando uma requisição de POST com o exercício para ser adicionado ao banco
            .then(res => console.log(res.data)) // printará no console do navegador as informações da resposta da requisição

        window.location = '/';

    }

    
    render() {
        return (
            <div>
                <h3>Criar uma nova entrada de Exercício</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome de usuário: </label>
                        <select 
                            ref="userInput"
                            required    
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >

                            {
                                this.state.users.map(function(user, k) {
                                    return <option
                                        key={k}
                                        value={user}
                                    >
                                        {user}
                                    </option>;
                                })
                            }

                        </select>
                        <label>Descrição: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                        <label>Duração (em minutos): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}                            
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Criar uma nova entrada de Exercício" className="bt btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}