/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import { browserHistory } from "react-router/lib";
import providerBuscarRodadasEmQuiz from '../../../providers/usuario/quiz/buscarRodadasEmQuiz';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            rodadas: [],
            quizzes: []
        }
    }
    async componentDidMount() {
        document.title = "Histórico de rodadas - Todas as rodadas que você já jogou.";
        let usuario = utilUser.getUser();
        const responseQuiz = await providerBuscarRodadasEmQuiz.obterQuizzes(usuario._id);
        let rodadas = responseQuiz.data.quizzes.map(quiz => { return quiz.idRodada });

        await this.setState({
            rodadas: rodadas,
            quizzes: responseQuiz.data.quizzes
        });
    }
    handleClick = async (e) => {
        e.preventDefault();
        let idRodada = e.target.value;
        let index = this.state.quizzes.findIndex(x => x.idRodada._id === idRodada);
        let jogadas = this.state.quizzes[index].jogadas;
        localStorage.setItem('resultadoQuiz', JSON.stringify(jogadas));
        localStorage.setItem('idRodadaEntrar', idRodada);
        browserHistory.push('/usuario/resultados');
        window.location.reload();
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
                                                <center>
                                                    <h4>
                                                        Compre suas próprias cifras
                                                    </h4>
                                                </center>

                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-6">
                                                Escolha a plataforma de pagamento
                                                <select className="form-control">
                                                    <option>
                                                        Pagseguro
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                Escolha o valor da compra em R$
                                                <select className="form-control">
                                                    <option>
                                                        R$ 100.00 (150 cifras)
                                                    </option>
                                                    <option>
                                                        R$ 250.00 (350 cifras)
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Continuar compra</button>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-danger btn-block">Cancelar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}