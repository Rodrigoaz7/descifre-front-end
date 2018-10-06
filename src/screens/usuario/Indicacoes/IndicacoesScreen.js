/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import providerIndicacoes from '../../../providers/usuario/indicacoes/buscarIndicacoes';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            indicacoes: []
        }
    }
    async componentDidMount() {
        document.title = "Indicações - Indique amigos e ganhe cifras.";
        let usuario = utilUser.getUser();
        const requestIndicacoes = await providerIndicacoes.obterIndicacoes(usuario._id);
        console.log(requestIndicacoes.data)
        await this.setState({
            url: `http://${window.location.hostname}:3000/usuario/cadastro-indicacoes/${usuario._id}`,
            indicacoes: requestIndicacoes.data.indicacoes
        });
    }
    render() {
        return (
            <div className="position-relative alt">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-default">
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
                    <div className="container-fluid pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h4 style={{color:'#212121'}}>
                                                    Envie essa url para que os seus amigos possam se cadastrar, a cada indicação você ganha 5 cifras e seu amigo também.
                                                </h4>
                                                <center>
                                                    <h4>
                                                    {this.state.url}
                                                    </h4>
                                                </center>
                                                <br/>
                                                <h4 style={{color:'#212121'}}>
                                                    Ou se preferir compartilhe com seus amigos no whatsapp:
                                                </h4>
                                                <center>
                                                    <a href={`whatsapp://send?text=Oi estou te indicando para jogar o De$cifre, um incrível jogo onde você pode ganhar dinheiro de verdade, cadastre-se usuando esse link: ${this.state.url}`} className="btn btn-success">Enviar via whatsapp</a>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <h4 style={{color:'#212121'}}>Suas indicações</h4>
                                                </center>
                                                <hr/>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">E-mail indicado</th>
                                                            <th scope="col">Cifras recebidas</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.indicacoes.map((indicacao, index)=>{
                                                        return(
                                                            <tr key={index  }>
                                                                <th scope="row">{index+1}</th>
                                                                <td>{indicacao.idUsuarioIndicado.email}</td>
                                                                <td>{indicacao.valorGanho}</td>
                                                            
                                                            </tr>
                                                        )
                                                    })}
                                                        
                                                        
                                                    </tbody>
                                                </table>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <br/>
                            <br/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}