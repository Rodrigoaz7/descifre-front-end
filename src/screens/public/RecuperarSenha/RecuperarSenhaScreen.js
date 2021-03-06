/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerRecuperarSenha from '../../../providers/public/autenticacao/providerRecuperarSenha';
import Swal from 'sweetalert2';
import {browserHistory} from "react-router/lib";

export default class RecuperarSenhaScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            load: false
        }
    }
    componentDidMount() {
        document.title = "Recuperar senha - Tela de recuperação de senha."
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({email: this.email.value, load: !this.stateload});
        const requestPost = await providerRecuperarSenha.recuperarSenha({email:this.state.email});
        if(requestPost.status){
            Swal({
                type: 'success',
                title: 'Email enviado',
                text: `Um e-mail de recuperação foi enviado para ${this.state.email}`
            }).then(async (result) => {
                if (result.value) {
                    browserHistory.push('/usuario/login');
                }
            });
        }else{
            Swal({
                type: 'error',
                title: 'Oops...',
                text: 'Nenhum e-mail foi encontrado na nossa base de dados :('
            });
        }
        await this.setState({load: !this.state.load});
    }
    render() {
        return (
            <div className="position-relative">
                <section  className="section section-shaped section-lg my-0 altura-max">
                    <div  className="shape shape-style-1 bg-gradient-default">
                        <span className="span-150"></span>
                        <span className="span-50"></span>
                        <span className="span-50"></span>
                        <span className="span-75"></span>
                        <span className="span-100"></span>
                        <span className="span-75"></span>
                        <span className="span-50"></span>
                        <span className="span-100"></span>
                        <span className="span-50"></span>
                        <span className="span-100"></span>
                        <span className="span-75"></span>
                        <span className="span-100"></span>
                        <span className="span-75"></span>
                        <span className="span-50"></span>
                        <span className="span-100"></span>
                        <span className="span-50"></span>
                    </div>
                    <div className="container pt-lg-md altura-mobile">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="text-muted text-center mb-3">
                                            <small>Digite seu e-mail para recuperar a sua senha</small>
                                        </div>
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group mb-3">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                    </div>
                                                    <input ref={input => this.email = input} className="form-control" placeholder="Email" type="email"/>
                                                </div>
                                            </div>
                                            
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block my-4" disabled={this.state.load}>
                                                    {this.state.load?"Enviando...":"Enviar e-mail de recuperação"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}