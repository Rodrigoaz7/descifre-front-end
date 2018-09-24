/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import { Link } from "react-router";
import { browserHistory } from "react-router";

export default class PerfilScreen extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            contaBancaria: '',
            agencia: '',
            sexo: '',
            telefone: '',
            permissoes: [],
            erros: []
        }
    }
    componentDidMount() {
       
        if(this.props.location.state !== undefined){
            const usuario = this.props.location.state.data;
            this.setState({
                nome: usuario.pessoa.nome,
                email: usuario.email,
                conta: usuario.pessoa.conta,
                agencia: usuario.pessoa.agencia,
                sexo: usuario.pessoa.sexo,
                telefone: usuario.pessoa.telefone,
                permissoes: usuario.permissoes
            });
        }
        else {
            browserHistory.push({
                pathname: '/administrador/usuarios',
            })
            window.location.reload()
        }

        document.title = "Usuário - Tela de administração de$cifre.";
    }

    render() {
        return (
            <div className="position-relative">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-dark">
                    </div>
                    <form>
                        <div className="container pt-lg-md" style={{ marginTop: '20%' }}>
                            <div className="card card-profile shadow mt--300">
                                <div className="px-4">
                                    <div className="row justify-content-center">
                                        <div className="offset-lg-4 order-lg-1 col-lg-3 order-lg-2">
                                            <div className="card-profile-image">
                                                <Link to="/administrador/">
                                                    <img src="/img/public/person.png" className="rounded-circle" style={{ width: '100%', marginTop: '-15%', boxShadow: '0 4px 10px 0' }} alt="imagem-perfil" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                            <div className="card-profile-actions py-4 mt-lg-0">
                                                {
                                                    this.state.permissoes.map((permissao, index) => {
                                                        return (<button key={index} className="btn btn-sm btn-default mr-4 float-right">{permissao}</button>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        <h3>{this.state.nome}</h3>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Nome</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.nome} onChange={this.handlerNomeChange} readOnly/>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Email</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.email} onChange={this.handlerEmailChange} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-lg-9">
                                                            <center><small className="d-block text-uppercase font-weight-bold mb-3">Conta bancária</small></center>
                                                            <input type="text" className="form-control form-control-alternative" value={this.state.conta} onChange={this.handlerContaChange} readOnly/>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <center><small className="d-block text-uppercase font-weight-bold mb-3">Agência</small></center>
                                                            <input type="text" className="form-control form-control-alternative" value={this.state.agencia} onChange={this.handlerAgenciaChange} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Telefone</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.telefone} onChange={this.handlerTelefoneChange} readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">

                                            <div className="col-lg-2">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Masculino</small></center>
                                                <center><input type="radio" id="Masculino" name="sexo" value="Masculino" checked={this.state.sexo === "Masculino"} onClick={this.handlerSexoChange} readOnly/></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Feminino</small></center>
                                                <center><input type="radio" id="Feminino" name="sexo" value="Feminino" checked={this.state.sexo === "Feminino"} onClick={this.handlerSexoChange} readOnly/></center>
                                            </div>

                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}