/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import { browserHistory } from "react-router";
import PatrocinadorRodada from '../../../ui/components/patrocinadorRodada';
import ModalResultados from '../../../ui/components/modals/ModalResultados';
export default class ResultadoScreen extends Component {
    constructor() {
        super();
        this.state = {
            resultados:[],
            respostasCertas: 0,
            pontuacao: 0,
            keyModal: 0
        }
    }

    async componentDidMount() {
        if(localStorage.getItem('resultadoQuiz')!==null){
            await this.setState({
                resultados: JSON.parse(localStorage.getItem('resultadoQuiz'))
            });
            //console.log(this.state.resultados)
            let respostasCertas = 0;
            let pontuacao = 0;
            this.state.resultados.map(result => {
                respostasCertas += result.status ? 1:0;
                pontuacao += result.pontuacao;
                return null;
            });
            await this.setState({
                respostasCertas: respostasCertas,
                pontuacao: pontuacao,
                keyModal: this.state.keyModal+1
            });
        }
        document.title = `Resultados da rodada - De$cifre, muito mais do que um jogo.`;
    }
    verClassificacao = (e) =>{
        e.preventDefault();
        let idRodadaEntrar = localStorage.getItem('idRodadaEntrar');
        browserHistory.push(`/usuario/classificacao/${idRodadaEntrar}`);
        window.location.reload();
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
                                <PatrocinadorRodada idRodada={localStorage.getItem('idRodadaAtiva')}/>
                                <div className="modal" id="myModal">
                                    <ModalResultados key={this.state.keyModal} resultados={this.state.resultados}/>
                                </div>
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-6">

                                                <center>
                                                    <h4 style={{ fontSize: '50px', color: '#212121', fontWeight: '400' }}>
                                                        {this.state.pontuacao}
                                                    </h4>
                                                    <h5 style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>
                                                        PONTOS
                                                    </h5>
                                                </center>
                  
                                            </div>
                                            <div className="col-6">
                                                
                                                <center>
                                                    <h4 style={{ fontSize: '50px', color: '#212121', fontWeight: '400' }}>
                                                        {this.state.respostasCertas}
                                                    </h4>
                                                    <h5 style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>
                                                        QUESTÕES CERTAS
                                                    </h5>
                                                </center>
                                                
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <button type="button" className="btn btn-block btn-primary" data-toggle="modal" data-target="#myModal">Respostas</button>
                                            </div>
                                            <div className="col-lg-6 col-6">
                                                <button onClick={this.verClassificacao} type="button" className="btn btn-block btn-success">Classificação</button>
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
                    </div>
                </section>
            </div>
        );
    }
}