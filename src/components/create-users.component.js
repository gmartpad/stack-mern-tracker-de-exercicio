import React, { Component } from 'react';
import axios from 'axios'; //dependência para realizar a conexão do front-end com o back-end da aplicação

export default class CreateUsers extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }

    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit (e) {
        e.preventDefault();
        
        const user = {
            username: this.state.username,
        }

        console.log(user)

        axios.post('http://localhost:5000/users/add', user) //enviando uma requisição de POST com o usuário para ser adicionado ao banco
            .then(res => console.log(res.data))// printará no console do navegador as informações da resposta da requisição

        this.setState({
            username: '',
        })

    }
    
    render() {
        return (
            <div>
                <h3>Criar novo usuário</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome de Usuário: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Criar novo usuário"
                            className="btn btn-primary"
                        />
                    </div>
                </form>                    
            </div>
        )
    }
}