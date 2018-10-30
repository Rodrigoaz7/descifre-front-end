/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerListarRodadasAbertas from '../../../providers/usuario/rodadas/obterRodadasInicio';
import utilUser from '../../../util/localStorage';
import providerCriarQuiz from '../../../providers/usuario/quiz/criarQuiz';
import { browserHistory } from "react-router/lib";
import Swal from 'sweetalert2';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    async componentDidMount() {
        document.title = "Treino usuário - Ambiente de treino.";

    }
    handleClick = async (e) => {
        e.preventDefault();

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
                            <div className="card bg-secondary shadow border-0">
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <center>
                                                <h4>
                                                    Ambiente de treino De$cifre
                                                </h4>
                                            </center>
                                            <center>
                                                Você tem x vidas
                                            <hr />
                                            </center>
                                            <center>
                                                <i className="fas fa-child" style={{ color: "#212121", fontSize: '3em' }}></i>
                                                <h4 style={{ color: '#212121' }}>
                                                    Você está no 15º lugar
                                                </h4>

                                            </center>
                                            <hr />
                                            <button type="button" className="btn btn-success btn-block">
                                                Ir para o treino<br />

                                            </button>
                                        </div>
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