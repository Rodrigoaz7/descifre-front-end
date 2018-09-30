/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerObterRodada from '../../../providers/usuario/rodadas/obterRodada';
import utilUsuario from '../../../util/localStorage';

export default class ClassificacaoScreen extends Component {
    constructor() {
        super();
        this.state = {
           classificacao: [],
           colocacao: 0 
        }
    }

    async componentDidMount() {
        let idRodada = this.props.params.idRodada;
        const rodada = await providerObterRodada.obterRodada(idRodada);
        let usuario = utilUsuario.getUser();
        let colocacao = rodada.data.rodadas.jogadores.findIndex(jogada => jogada.quiz.idUsuario===usuario._id);
        
        await this.setState({
            classificacao: rodada.data.rodadas.jogadores,
            colocacao: colocacao+1,
            ganhadoresTamanho: rodada.data.rodadas.ganhadores.length
        });
        document.title = `Classificação da rodada - De$cifre, muito mais do que um jogo.`;
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
                                            <div className="col-6">

                                                <center>
                                                    <h4 style={{ fontSize: '50px', color: '#212121', fontWeight: '400' }}>
                                                        {this.state.classificacao.length}
                                                    </h4>
                                                    <h5 style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>
                                                        JOGADORES
                                                    </h5>
                                                </center>
                  
                                            </div>
                                            <div className="col-6">
                                                
                                                <center>
                                                    <h4 style={{ fontSize: '50px', color: '#212121', fontWeight: '400' }}>
                                                        {this.state.colocacao}º
                                                    </h4>
                                                    <h5 style={{ fontSize: '16px', color: '#212121', fontWeight: '400' }}>
                                                        SUA COLOCAÇÃO
                                                    </h5>
                                                </center>
                                                
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <h5 style={{ fontSize: '22px', color: '#212121', fontWeight: '400' }}>
                                                        CLASSIFICAÇÃO GERAL
                                                    </h5>
                                                    <span style={{fontSize:'12px'}}>(Jogadores com fundo verde estão ganhando cifras nessa rodada)</span>
                                                </center>
                                                <br/>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">
                                                                <center>
                                                                    Nome
                                                                </center>
                                                            </th>
                                                            <th scope="col">
                                                                <center>
                                                                    Pontuação
                                                                </center>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.classificacao.map((jogador, index)=>{
                                                                return(
                                                                    <tr key={index} bgcolor={index<=this.state.ganhadoresTamanho?"#DCEDC8":"#FFFFFF"}>
                                                                        <th scope="row">{index+1}</th>
                                                                        <td>
                                                                            <center>
                                                                                {jogador.quiz.nomeUsuario}
                                                                            </center>
                                                                        </td>
                                                                        <td>
                                                                            <center>
                                                                                {
                                                                                    jogador.quiz.pontuacao
                                                                                }
                                                                                
                                                                            </center>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                               
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