/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerAlterarSenha from '../../../providers/public/autenticacao/providerAlterarSenha';
import Swal from 'sweetalert2';
import {browserHistory} from "react-router/lib";

export default class AlterarSenhaScreen extends Component {
    constructor() {
        super();
        this.state = {
            load: false
        }
    }
    componentDidMount() {
        document.title = "Recuperar senha - Alterar senha.";
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({senha: this.senha.value, repetirSenha: this.repetirSenha.value, load: !this.state.load});
        
        const token = this.props.params.token;
        
        const requestAlterarSenha = await providerAlterarSenha.alterarSenha({senha:this.state.senha, repetirSenha:this.state.repetirSenha, token: token});
        
        if(requestAlterarSenha.status){
            Swal({
                type: 'success',
                title: 'Senha alterada com sucesso.',
                text: `Faça login para entrar no De$cifre.`
            }).then(async (result) => {
                if (result.value) {
                    browserHistory.push('/usuario/login');
                }
            });
        }else{
            
            Swal({
                type: 'error',
                title: 'Oops...',
                text: `${requestAlterarSenha.erros.map(erro=>{return erro.msg})}`
            });
            await this.setState({load: !this.state.load});
        }
        
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
                                            <small>Digite sua nova senha para realizar a alteração.</small>
                                        </div>
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group mb-3">
                                                <div className="form-group">
                                                    <div className="input-group input-group-alternative">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                        </div>
                                                        <input className="form-control" placeholder="Digite sua senha" ref={input => this.senha = input} type="password" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group input-group-alternative">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                        </div>
                                                        <input className="form-control" placeholder="Repita sua senha" ref={input => this.repetirSenha = input} type="password" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block my-4" disabled={this.state.load}>
                                                    {this.state.load?"Alterando...":"Alterar senha"}
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