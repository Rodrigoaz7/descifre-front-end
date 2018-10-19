/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import utilLocalStorage from '../../../util/localStorage';
import providerListarTransacoes from '../../../providers/administrador/transacoes/listarTransacoesUsuario';
import statusCodes from '../../../util/statusCodes';
import Pagination from "react-ultimate-pagination-bootstrap-4";

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            transacoes: [],
            pagina: 1,
            total: 1
        }
    }
    async componentDidMount() {
        document.title = "Compra de cifras - compre suas próprias cifras.";

        const resultado_transacoes = await providerListarTransacoes.getTransacoes(1);
        let total = resultado_transacoes.data.tamanhoTransacoes;

        if (total < 10) total = 1;
        else total = Math.ceil(total / 10.0);

        this.setState({ transacoes: resultado_transacoes.data.transacoes.reverse(), total: total })
    }

    handlePageChange = async (pageNumber) => {
        await this.setState({ pagina: pageNumber });

        let usuario = utilLocalStorage.getUser();
        const resultado_transacoes = await providerListarTransacoes.getTransacoes(this.state.pagina);

        await this.setState({
            transacoes: resultado_transacoes.data.transacoes.reverse()
        });

        window.scrollTo(0,0);
    }

    handleClick = async (e) => {
        e.preventDefault();
        // Aqui sera redirecionado para o pagseguro
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
                                                        Histórico de transações
                                                    </h4>
                                                </center>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr style={{ textAlign: 'center' }}>

                                                                    <th>Tipo</th>
                                                                    <th>Cifras movimentadas</th>
                                                                    <th>Data de transação</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.transacoes.reverse().map((transacao, index) => {
                                                                        let dataTransacao = new Date(transacao.data_transferencia);
                                                                        let stringData = dataTransacao.toLocaleString();

                                                                        return (
                                                                            <tr style={{ textAlign: 'center' }} key={index}>
                                                                                <td style={{ maxWidth: '100px' }}>{transacao.tipo.toUpperCase()}</td>
                                                                                <td>
                                                                                    {

                                                                                        parseFloat(transacao.quantia_transferida) > 0 && transacao.tipo.toUpperCase() === "COMPRA" ? <span>-{transacao.quantia_transferida}</span> :
                                                                                            <span>{transacao.quantia_transferida}</span>

                                                                                    }
                                                                                </td>

                                                                                <td>{stringData}</td>

                                                                                <td>{statusCodes.getValue(`${transacao.status}`)}</td>
                                                                            </tr>)
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
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