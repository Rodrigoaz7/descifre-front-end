/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import { Link } from "react-router";

import providerLogin from "../../../providers/public/autenticacao/providerLogin";

import Erros from '../../../ui/components/erros';
import {browserHistory} from "react-router/lib";
import BotaoLoad from "../../../ui/components/botaoLoad";

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
            erros: [],
            loading: false
        }
        this.erros = [];
    }
    componentDidMount() {
        document.title = "Login - Tela de login"
    }
    /*
    *   Handle para mudar os valores da senha e email.
    *   Autor: Marcus Dantas
    */
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({email: this.email.value, senha: this.senha.value});
        const data = {
            email: this.state.email,
            senha: this.state.senha
        };

        await this.setState({loading: !this.state.loading});
        
        const postLogin = await providerLogin.realizarLogin(data);
        
        await this.setState({loading: !this.state.loading});
        /* Caso ocorra algum erro */
        if(!postLogin.status){
            if(postLogin.erros === undefined){
                this.erros = [{msg:postLogin.msg}];
            }else{
                this.erros = postLogin.erros;
            }

            this.setState({erros:this.erros});
            return;
        } 
        
        localStorage.setItem('descifre_tokenUsuario', JSON.stringify(postLogin.data.token));
        localStorage.setItem('descifre_userData', JSON.stringify(postLogin.data.usuario));
        
        let admin = false;
        let patrocinador = false;

        postLogin.data.usuario.permissoes.map((permissao, index) =>{
            if(permissao==="Administrador") admin = true;
            if(permissao==="Patrocinador") patrocinador = true;
            return null;
        });
        if(admin) browserHistory.push(`/administrador/`);
        else if(patrocinador) browserHistory.push(`/patrocinador/`);
        else browserHistory.push(`/usuario/`);
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
                                            <center>
                                                <img style={{width:'25%'}} className="img-fluid" alt="User neutro" src="/img/public/person.png"/>
                                            </center>
                                        </div>
                                        <form onSubmit={this.handleSubmit}>
                                            <Erros erros={this.state.erros}/>
                                            <div className="form-group mb-3">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                    </div>
                                                    <input ref={input => this.email = input} className="form-control" placeholder="Email" type="email"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                    </div>
                                                    <input ref={input => this.senha = input} className="form-control" placeholder="Password" type="password"/>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <BotaoLoad
                                                    classeBotao="btn btn-primary btn-block my-4"
                                                    tipo="submit"
                                                    carregando={this.state.loading}
                                                    nome="Entrar"
                                                    nomeCarregando="Carregando"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <Link to="/usuario/recuperar-senha" className="text-light">
                                        <small>Esqueceu a senha?</small>
                                        </Link>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/usuario/cadastro" className="text-light">
                                        <small>Criar uma conta</small>
                                        </Link>
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