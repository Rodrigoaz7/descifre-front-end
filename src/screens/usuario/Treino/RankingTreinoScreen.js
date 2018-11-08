/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerRanking from '../../../providers/usuario/treino/obterRanking';
import Pagination from "react-ultimate-pagination-bootstrap-4";

export default class ClassificacaoScreen extends Component {
    constructor() {
        super();
        this.state = {
            classificacao: [],
            colocacao: 0,
            ganhadoresTamanho: 5,
            pagina: 1,
            total: 1
        }
    }

    async componentDidMount() {
        let ranking = await providerRanking.obterRanking(1);
        this.setState({ classificacao: ranking.data.ranking, colocacao: ranking.data.colocacao + 1})
        let total = ranking.data.ranking.length;
        if (total < 10) total = 1;
        else total = Math.ceil(total / 10.0);

        this.setState({total: total})
        document.title = `Classificação da rodada - De$cifre, muito mais do que um jogo.`;
    }

    handlePageChange = async (pageNumber) => {
        await this.setState({ pagina: pageNumber });

        const resultado = await providerRanking.obterRanking(this.state.pagina);

        await this.setState({
            classificacao: resultado.data.ranking
        });

        window.scrollTo(0,0);
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
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <h5 style={{ fontSize: '22px', color: '#212121', fontWeight: '400' }}>
                                                        CLASSIFICAÇÃO GERAL
                                                    </h5>
                                                    <span style={{ fontSize: '12px' }}>(Jogadores com fundo verde estão ganhando cifras nessa rodada)</span>
                                                </center>
                                                <br />
                                                <div className="table-responsive">
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
                                                                this.state.classificacao.map((jogador, index) => {
                                                                    return (
                                                                        <tr key={index} bgcolor={index < this.state.ganhadoresTamanho ? "#DCEDC8" : "#FFFFFF"}>
                                                                            <th scope="row">{index + 1}</th>
                                                                            <td>
                                                                                <center>
                                                                                    {jogador.usuario.email}
                                                                                </center>
                                                                            </td>
                                                                            <td>
                                                                                <center>
                                                                                    {
                                                                                        jogador.pontuacao
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
                                        <div className="row justify-content-center">
                                            <Pagination
                                                currentPage={this.state.pagina}
                                                totalPages={this.state.total}
                                                onChange={this.handlePageChange}
                                            />
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