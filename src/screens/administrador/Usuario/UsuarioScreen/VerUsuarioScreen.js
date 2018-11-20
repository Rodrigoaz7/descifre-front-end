/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import { browserHistory } from "react-router";
import variables from '../../../../variables';
import utilLocalStorage from '../../../../util/localStorage';

export default class PerfilScreen extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            contaBancaria: '',
            banco: '',
            agencia: '',
            sexo: '',
            telefone: '',
            foto: '',
            idPessoa: '',
            quantidade_cifras: 0,
            permissoes: [],
            erros: []
        }
    }
    componentDidMount() {

        if (this.props.location.state !== undefined) {
            const usuario = this.props.location.state.data;
            this.setState({
                nome: usuario.pessoa.nome,
                email: usuario.email,
                conta: usuario.pessoa.conta,
                banco: usuario.pessoa.banco,
                agencia: usuario.pessoa.agencia,
                sexo: usuario.pessoa.sexo,
                telefone: usuario.pessoa.telefone,
                permissoes: usuario.permissoes,
                foto: usuario.pessoa.foto,
                idPessoa: usuario.pessoa._id,
                quantidade_cifras: usuario.quantidade_cifras
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
                                        <div className="order-lg-1 col-lg-3 order-lg-2">
                                            <div className="card-profile-image">
                                                {this.state.foto !== '' && this.state.foto !== undefined ? (
                                                    <a href={`${variables.urlFoto}/imagem/${utilLocalStorage.getToken()}?tipo=usuario&id=${this.state.idPessoa}`}>
                                                        <img src={`${variables.urlFoto}/imagem/${utilLocalStorage.getToken()}?tipo=usuario&id=${this.state.idPessoa}`} name="logomarca" className="img-fluid rounded-circle" style={{ width: '100%', marginTop: '-15%', boxShadow: '0 4px 10px 0' }} alt="imagem-perfil" />
                                                    </a>
                                                ) :
                                                    <img src="/img/public/person.png" className="img-fluid rounded-circle" style={{ width: '100%', marginTop: '-15%', boxShadow: '0 4px 10px 0' }} alt="imagem-perfil" />
                                                }
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
                                        <div className="col-lg-4 order-lg-1 text-lg-right align-self-lg-center">
                                            <div className="card-profile-actions py-4 mt-lg-0" style={{float: 'left'}}>
                                                <button type="button" className="btn btn-sm btn-default mr-4 float-right">{this.state.nome.split(' ')[0]} possui {this.state.quantidade_cifras} cifras</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        <h3>{this.state.nome}</h3>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Nome</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.nome} onChange={this.handlerNomeChange} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Email</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.email} onChange={this.handlerEmailChange} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Telefone</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.telefone} onChange={this.handlerTelefoneChange} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Banco</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.banco} readOnly />
                                                    
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-lg-9">
                                                            <center><small className="d-block text-uppercase font-weight-bold mb-3">Conta bancária</small></center>
                                                            <input type="text" className="form-control form-control-alternative" value={this.state.conta} onChange={this.handlerContaChange} readOnly />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <center><small className="d-block text-uppercase font-weight-bold mb-3">Agência</small></center>
                                                            <input type="text" className="form-control form-control-alternative" value={this.state.agencia} onChange={this.handlerAgenciaChange} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">

                                            <div className="col-lg-2">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Masculino</small></center>
                                                <center><input type="radio" id="Masculino" name="sexo" value="Masculino" checked={this.state.sexo === "Masculino"} onClick={this.handlerSexoChange} readOnly /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Feminino</small></center>
                                                <center><input type="radio" id="Feminino" name="sexo" value="Feminino" checked={this.state.sexo === "Feminino"} onClick={this.handlerSexoChange} readOnly /></center>
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