/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerObterTreino from '../../../providers/usuario/treino/obterTreino';
import providerObterQuestaoTreino from '../../../providers/usuario/treino/obterQuestaoTreino';
import providerEntrarOuCriarTreino from '../../../providers/usuario/treino/entrarOuCriarTreino';
import utilUser from '../../../util/localStorage';
import providerCriarQuiz from '../../../providers/usuario/quiz/criarQuiz';
import { browserHistory } from "react-router/lib";
import Swal from 'sweetalert2';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            treino: {},
            statusTreino: false,
            treinoEmAndamento: false,
            questao: []
        }
    }
    async componentDidMount() {
        document.title = "Treino usuário - Ambiente de treino.";
        const requestTreino = await providerObterTreino.obterTreino();

        if (requestTreino.data.status) {
            await this.setState({ statusTreino: true, treino: requestTreino.data.treino })
        } else {
            Swal({
                type: 'error',
                title: 'Oops...',
                text: `${requestTreino.data.msg}`,
                footer: ''
            })
        }
    }
    handleClick = async (e) => {
        e.preventDefault();
        const requestTreino = await providerEntrarOuCriarTreino.processar();

        if (requestTreino.data.status) {
            const questao = await providerObterQuestaoTreino.getQuestao(this.state.treino._id);
            await this.setState({ questao: questao.data.questao, treinoEmAndamento: true });
        } else {
            Swal({
                type: 'error',
                title: 'Oops...',
                text: `${requestTreino.data.msg}`,
                footer: ''
            })
        }
    }

    handleClickSair = async () => {
        this.setState({treinoEmAndamento: false})
    }

    handleClickPular = async () => {
        // Pular questao
    }

    handleResposta = async (e) => {
        // Responder questao
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
                                            {
                                                !this.state.treinoEmAndamento &&

                                                <div className="col-lg-12">
                                                    <center>
                                                        <h4>
                                                            Ambiente de treino De$cifre
                                                        </h4>
                                                    </center>
                                                    <center>
                                                        {
                                                            this.state.statusTreino &&
                                                            <span>Você tem {this.state.treino.qntdVidas} vidas</span>
                                                        }
                                                        <br />
                                                        {
                                                            this.state.treino.qntdVidas === 0 &&
                                                            <span>Suas vidas irão recarregar em: {
                                                                new Date(this.state.treino.vidaRecuperada.data).toLocaleString()
                                                            }</span>
                                                        }
                                                        <hr />
                                                    </center>
                                                    <center>
                                                        {
                                                            this.state.statusTreino &&
                                                            <div className="row">
                                                                <div className="col-6 col-lg-6">
                                                                    <i className="fas fa-child" style={{ color: "#212121", fontSize: '3.5em' }}></i>
                                                                </div>
                                                                <div className="col-6 col-lg-6">
                                                                    <h4>{this.state.treino.pontuacao}<br />
                                                                        Pontos
                                                            </h4>
                                                                </div>
                                                            </div>
                                                        }

                                                        {!this.state.statusTreino &&
                                                            <h4 style={{ color: '#212121' }}>
                                                                Você ainda não entrou no treino
                                                            </h4>
                                                        }
                                                    </center>
                                                    <hr />
                                                    <button onClick={this.handleClick} type="button" className="btn btn-success btn-block">
                                                        Ir para o treino<br />
                                                    </button>
                                                </div>
                                            }
                                            {
                                                this.state.treinoEmAndamento &&

                                                <div className="col-lg-12">
                                                    <center>
                                                        <h4>
                                                            Ambiente de treino De$cifre
                                                        </h4>
                                                    </center>
                                                    <center>
                                                        {
                                                            this.state.statusTreino &&
                                                            <span>Você tem {this.state.treino.qntdVidas} vidas</span>
                                                        }
                                                        <br />
                                                        {
                                                            this.state.treino.qntdVidas === 0 &&
                                                            <span>Suas vidas irão recarregar em: {
                                                                new Date(this.state.treino.vidaRecuperada.data).toLocaleString()
                                                            }</span>
                                                        }
                                                        <hr />
                                                    </center>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <p style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>({this.state.questao.categoria.nome}) - {this.state.questao.enunciado}</p>

                                                            <div onChange={e => this.handleResposta(e)}>
                                                                {
                                                                    this.state.questao.alternativas.map((alternativa, indexAlternativa) => {
                                                                        return (
                                                                            <div className="custom-control custom-radio mb-3 radio" key={indexAlternativa}>
                                                                                <input name="resposta" className="custom-control-input" id={`alternativa${indexAlternativa}`} type="radio" value={alternativa.descricao}
                                                                                    checked={this.state.respostaSelecionada === alternativa.descricao}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={`alternativa${indexAlternativa}`}>
                                                                                    <span>{alternativa.descricao}</span>
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button onClick={this.handleClickPular} type="button" className="btn btn-block btn-danger">Pular <i className="fas fa-forward" style={{ "color": "#ffffff" }}></i></button>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button onClick={this.handleClickSair} type="button" className="btn btn-block btn-dark">Sair do treino <i className="fas fa-sign-out-alt" style={{ "color": "#ffffff" }}></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
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