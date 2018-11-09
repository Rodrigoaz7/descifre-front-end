/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import ReactCountdownClock from 'react-countdown-clock';
import providerQuestaoAleatoria from '../../../providers/usuario/questao/providerQuestaoAleatoria';
import providerProcessarQuiz from '../../../providers/usuario/quiz/processarQuiz';
import Swal from 'sweetalert2';
import { browserHistory } from "react-router";
import Patrocinadores from '../../../ui/components/patrocinador';

export default class JogoScreen extends Component {
    constructor() {
        super();
        this.state = {
            respostaSelecionada: "",
            tempoQuestao: 30,
            completions: 0,
            questao: [],
            perguntasRespondidas: 0,
            loading: false
        }
    }
    gerarNovaQuestao = async () => {

        let idQuiz;
        if (localStorage.getItem('idQuizAtivo') !== undefined) idQuiz = localStorage.getItem('idQuizAtivo');
        let usuario = utilUser.getUser();
        let requestQuestao = await providerQuestaoAleatoria.questaoAleatoria({ idQuiz: idQuiz, idUsuario: usuario._id });
        if (requestQuestao.data !== undefined && requestQuestao.data.status && !requestQuestao.data.finalizado) {
            await this.setState({
                questao: [
                    requestQuestao.data.questao
                ]
            });
        } else if (requestQuestao.finalizado) {
            let questoes = [];
            if (localStorage.getItem('jogoDescifre') !== null) questoes = JSON.parse(localStorage.getItem('jogoDescifre'));
            const requestProcessarQuiz = await providerProcessarQuiz.processarQuiz({ questoes, idQuiz });
            localStorage.setItem('idRodadaEntrar', requestProcessarQuiz.data.idRodada);
            localStorage.setItem('resultadoQuiz', JSON.stringify(requestProcessarQuiz.data.resultado));
            browserHistory.push('/usuario/resultados');
            window.location.reload();
        }
    }

    async componentDidMount() {
        document.title = "Jogo usuário - A melhor platahtmlForma de entreterimento do Brasil.";
        await this.gerarNovaQuestao()
    }
    handleResposta = async (e) => {
        await this.setState({
            loading: true,
            respostaSelecionada: e.target.value
        });
        if (this.state.respostaSelecionada === null || this.state.respostaSelecionada === "") {
            Swal({
                type: 'error',
                title: 'Oops...',
                text: `Você deve selecionar uma resposta.`,
                footer: 'Volte para o quiz e marque uma alternativa'
            });
            return;
        }
        setTimeout(async () => {
            // Array de jogadas
            let jogadas = [];
            if (localStorage.getItem('jogoDescifre') !== null) jogadas = JSON.parse(localStorage.getItem('jogoDescifre'));

            let item = {
                idQuestao: this.state.questao[0]._id,
                alternativa: this.state.respostaSelecionada
            }

            if (!jogadas.find(x => x.idQuestao === this.state.questao[0]._id)) {
                jogadas.push(item);
                localStorage.setItem('jogoDescifre', JSON.stringify(jogadas));
                await this.setState({
                    respostaSelecionada: null,
                    perguntasRespondidas: jogadas.length
                });
            }
            await this.gerarNovaQuestao();
            await this.setState({
                tempoQuestao: 30,
                completions: this.state.completions + 1,
                loading: false
            });
            window.scrollTo(0, 0);
        }, 200);
    }

    handleNovaQuestao = async () => {
        await this.gerarNovaQuestao();
        await this.setState({
            tempoQuestao: 30,
            completions: this.state.completions + 1
        });
    }
    // Aprovar possível remoção
    // handleClick = async (e) => {
    //     e.preventDefault();
    //     if(this.state.respostaSelecionada===null || this.state.respostaSelecionada===""){
    //         Swal({
    //             type: 'error',
    //             title: 'Oops...',
    //             text: `Você deve selecionar uma resposta.`,
    //             footer: 'Volte para o quiz e marque uma alternativa'
    //         });
    //         return;
    //     }
    //     // Array de jogadas
    //     let jogadas = [];
    //     if(localStorage.getItem('jogoDescifre')!==null) jogadas = JSON.parse(localStorage.getItem('jogoDescifre'));

    //     let item = {
    //         idQuestao: this.state.questao[0]._id,
    //         alternativa: this.state.respostaSelecionada
    //     }

    //     if(!jogadas.find(x => x.idQuestao === this.state.questao[0]._id)){
    //         jogadas.push(item);
    //         localStorage.setItem('jogoDescifre', JSON.stringify(jogadas));
    //         await this.setState({
    //             respostaSelecionada:null,
    //             perguntasRespondidas: jogadas.length
    //         });
    //     }
    //     await this.gerarNovaQuestao();
    //     await this.setState({
    //         tempoQuestao: 30,
    //         completions: this.state.completions + 1
    //     });  
    //     window.scrollTo(0,0);  
    // }

    handleClickPular = async (e) => {
        this.setState({loading: true})
        e.preventDefault();
        // Array de jogadas
        let jogadas = [];
        if (localStorage.getItem('jogoDescifre') !== null) jogadas = JSON.parse(localStorage.getItem('jogoDescifre'));

        let item = {
            idQuestao: this.state.questao[0]._id,
            alternativa: null
        }

        if (!jogadas.find(x => x.idQuestao === this.state.questao[0]._id)) {
            jogadas.push(item);
            localStorage.setItem('jogoDescifre', JSON.stringify(jogadas));
            await this.setState({
                respostaSelecionada: null,
                perguntasRespondidas: jogadas.length
            });
        }
        await this.gerarNovaQuestao();
        await this.setState({
            tempoQuestao: 30,
            completions: this.state.completions + 1,
            loading: false
        });
        window.scrollTo(0, 0);
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
                                <Patrocinadores urlImagem={'familia-picui.png'}/>
                                <div className="card bg-secondary shadow border-0">
                                    {!this.state.loading &&
                                        <div className="card-body px-lg-5 py-lg-5">
                                            <div className="row">
                                                <div className="col-6">

                                                    <center>
                                                        <h4 style={{ fontSize: '50px', color: '#212121', fontWeight: '400' }}>
                                                            {this.state.perguntasRespondidas}
                                                        </h4>
                                                        <h5 style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>
                                                            PERGUNTAS RESPONDIDAS
                                                    </h5>
                                                    </center>

                                                </div>
                                                <div className="col-6">
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
                                            <div className="row">
                                                {this.state.questao.map((questao, index) => {
                                                    return (
                                                        <div key={index} className="col-lg-12">
                                                            <p style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>({questao.categoria.nome}) - {questao.enunciado}</p>

                                                            <div onChange={e => this.handleResposta(e)}>
                                                                {
                                                                    questao.alternativas.map((alternativa, indexAlternativa) => {
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

                                                    )
                                                })}


                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button onClick={this.handleClickPular} type="button" className="btn btn-block btn-danger">Pular <i className="fas fa-forward" style={{ "color": "#ffffff" }}></i></button>
                                                </div>
                                            </div>

                                        </div>
                                    }
                                    {this.state.loading &&
                                        <center>
                                            <img className="img-fluid" alt="Menino triste" src="/img/public/loading.gif" />
                                        </center>
                                    }
                                </div>
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}