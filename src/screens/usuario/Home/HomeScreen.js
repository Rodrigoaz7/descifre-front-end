/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerListarRodadasAbertas from '../../../providers/usuario/rodadas/obterRodadasInicio';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            rodadas: []
        }
    }
    async componentDidMount() {
        document.title = "Home usuário - Bem vindo ao De$cifre.";
        const rodadasPost = await providerListarRodadasAbertas.listarRodadas();
        const rodadas = rodadasPost.data.rodadas;
        await this.setState({
            rodadas: rodadas
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
                                    {
                                    this.state.rodadas.length>0 &&
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <h4>
                                                        {"Rodada de abertura".toUpperCase()}
                                                    </h4>
                                                </center>
                                                <center>
                                                    Abertura: 12/06 às 15:00<br/>
                                                    Finalização: 15/06 às 15:00
                                                </center>
                                                <hr/>
                                                <center>
                                                    <h4 style={{color:'green'}}>
                                                        {"500 cifras".toUpperCase()}
                                                    </h4>
                                                </center>
                                                <hr/>
                                                <button type="button" className="btn btn-success btn-block">
                                                    Jogar agora<br/>
                                                    (GRÁTIS)
                                                </button>
                                            </div>
                                        </div>
                                    </div>}
                                    {
                                    this.state.rodadas.length==0 &&
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <img class="img-fluid" alt="Responsive image" src="/img/public/menino-triste.gif"/>
                                                    <h4 style={{color: '#212121'}}><br/>
                                                        Não exite nenhuma rodada aberta.
                                                    </h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}