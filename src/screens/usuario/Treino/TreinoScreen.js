/*
*   Autor: Marcus Dantas e Rodrigo Azevedo
*/
import React, { Component } from "react";
import ReactCountdownClock from 'react-countdown-clock';
import providerObterTreino from '../../../providers/usuario/treino/obterTreino';
import providerObterQuestaoTreino from '../../../providers/usuario/treino/obterQuestaoTreino';
import providerEntrarOuCriarTreino from '../../../providers/usuario/treino/entrarOuCriarTreino';
import providerProcessarQuestaoTreino from '../../../providers/usuario/treino/processarQuestaoTreino';
import utilUser from '../../../util/localStorage';
import Swal from 'sweetalert2';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            treino: {},
            statusTreino: false,
            treinoEmAndamento: false,
            questao: [],
            alternativaCorreta: '',
            loading: false,
            tempoQuestao: 30,
            completions: 0
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
        this.setState({ treinoEmAndamento: false, alternativaCorreta: '' })
    }

    handleClickPular = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })

        let data = {
            idTreino: this.state.treino._id,
            idUsuario: utilUser.getUser()._id,
            idQuestao: this.state.questao._id,
            token: utilUser.getToken(),
            respostaQuestao: "Pular"
        }
        const response = await providerProcessarQuestaoTreino.processar(data);
        const questao = await providerObterQuestaoTreino.getQuestao(this.state.treino._id);
        await this.setState({ treino: response.data.treino, questao: questao.data.questao, alternativaCorreta: '', tempoQuestao: 30, completions: this.state.completions+1, loading: false })

    }

    handleResposta = async (e) => {
        e.preventDefault();

        let data = {
            idTreino: this.state.treino._id,
            idUsuario: utilUser.getUser()._id,
            idQuestao: this.state.questao._id,
            token: utilUser.getToken(),
            respostaQuestao: e.target.value
        }
        const response = await providerProcessarQuestaoTreino.processar(data);
        const questao = await providerObterQuestaoTreino.getQuestao(this.state.treino._id);
        await this.setState({ treino: response.data.treino, alternativaCorreta: response.data.correta })
        setTimeout(function () {
            if (this.state.treino.qntdVidas === 0) this.handleClickSair();
            this.setState({ alternativaCorreta: '', questao: questao.data.questao, tempoQuestao: 30, completions: this.state.completions + 1 });
        }.bind(this), 1000);
    }

    handleNovaQuestao = async () => {

        this.setState({ loading: true })

        const questao = await providerObterQuestaoTreino.getQuestao(this.state.treino._id);
        await this.setState({questao: questao.data.questao, alternativaCorreta: '', tempoQuestao: 30, completions: this.state.completions + 1, loading: false })

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
                                                            <span>Suas vidas irão recarregar-se em: {
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
                                                    <div className="row justify-content-center">
                                                        <center>
                                                            <h4>
                                                                Ambiente de treino De$cifre
                                                            </h4>
                                                        </center>
                                                    </div>

                                                    <div className="row justify-content-center">
                                                        <div className="col-6">
                                                            <center>
                                                                <br />
                                                                {
                                                                    this.state.statusTreino &&

                                                                    <div>
                                                                        <h4 style={{ fontSize: '50px', color: '#212121', fontWeight: '400' }}>
                                                                            {this.state.treino.qntdVidas}
                                                                        </h4>
                                                                        <h5 style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>
                                                                            VIDAS RESTANTES
                                                                    </h5>
                                                                    </div>
                                                                }
                                                                <br />
                                                                {
                                                                    this.state.treino.qntdVidas === 0 &&
                                                                    <h4>Suas vidas irão recarregar em: {
                                                                        new Date(this.state.treino.vidaRecuperada.data).toLocaleString()
                                                                    }</h4>
                                                                }
                                                            </center>
                                                        </div>

                                                        <div className="col-6">
                                                            <br />
                                                            <div className="offset-1 col-6">
                                                                <ReactCountdownClock
                                                                    key={this.state.completions}
                                                                    seconds={this.state.tempoQuestao}
                                                                    color="#212121"
                                                                    alpha={1}
                                                                    size={100}
                                                                    onComplete={this.handleNovaQuestao}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr />

                                                    {!this.state.loading &&
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
                                                                                        {
                                                                                            alternativa.descricao.toUpperCase() === this.state.alternativaCorreta.toUpperCase() &&
                                                                                            <span style={{ "color": "green", "fontSize": "110%" }}>
                                                                                                {alternativa.descricao}
                                                                                            </span>
                                                                                        }
                                                                                        {
                                                                                            alternativa.descricao.toUpperCase() !== this.state.alternativaCorreta.toUpperCase() &&
                                                                                            <span>
                                                                                                {alternativa.descricao}
                                                                                            </span>
                                                                                        }
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        this.state.loading &&
                                                        <center>
                                                            <img className="img-fluid" alt="carregando questao" src="/img/public/loading.gif" />
                                                        </center>
                                                    }
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-lg-6 col-6">
                                                            <button onClick={this.handleClickPular} type="button" className="btn btn-block btn-danger">Pular <i className="fas fa-forward" style={{ "color": "#ffffff" }}></i></button>
                                                        </div>
                                                        <div className="col-lg-6 col-6">
                                                            <button onClick={this.handleClickSair} type="button" className="btn btn-block btn-dark">Sair <i className="fas fa-sign-out-alt" style={{ "color": "#ffffff" }}></i></button>
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