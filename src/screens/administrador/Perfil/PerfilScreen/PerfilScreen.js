/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';
import { Link } from "react-router";
import utilLocalStorage from '../../../../util/localStorage';

export default class PerfilScreen extends Component {
    constructor(){
        super();
        this.state = {
            nome: '',
            email: '',
            permissoes: []
        }
    }
    componentDidMount(){
        let usuario = utilLocalStorage.getUser();
        console.log(usuario)
        this.setState({
            nome: usuario.pessoa.nome,
            email: usuario.email,
            permissoes: usuario.permissoes
        });
        document.title = "Perfil - Tela de administração de$cifre.";
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
                                                    this.state.permissoes.map((permissao, index)=>{
                                                        return (<button key={index} className="btn btn-sm btn-default mr-4 float-right">{permissao}</button>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        <h3>Seus dados</h3>
                                    
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Nome</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.nome} />
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Email</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.email}/>
                                                </div>
                                            </div>
                                        </div>
                                        <Linha tamanho={8}/>
                                        <h3>Alterar senha</h3>
                                        <div className="row justify-content-center">
                                           
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Nova senha</small></center>
                                                    <input type="password" className="form-control form-control-lg form-control-alternative" placeholder="Sua nova senha"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Repetir senha</small></center>
                                                    <input type="password" className="form-control form-control-lg form-control-alternative" placeholder="Sua nova senha"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Linha tamanho={8}/>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-5">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary btn-block">Alterar</button>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-danger btn-block">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}