/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import { Link } from "react-router";
export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
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
                                                <img style={{width:'25%'}} className="img-fluid" alt="User neutro" src="https://png.pngtree.com/svg/20170602/person_1058425.png"/>
                                            </center>
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
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                    </div>
                                                    <input ref={input => this.senha = input} className="form-control" placeholder="Password" type="password"/>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block my-4">Entrar</button>
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