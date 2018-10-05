/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import { browserHistory } from "react-router/lib";
import utilLocalStorage from '../../../util/localStorage';
import providerListarTransacoes from '../../../providers/administrador/transacoes/listarTransacoesUsuario';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            transacoes: []
        }
    }
    async componentDidMount() {
        document.title = "Compra de cifras - compre suas próprias cifras.";

        const resultado_transacoes = await providerListarTransacoes.getTransacoes(30, "", "", utilLocalStorage.getUser()._id);

        this.setState({ transacoes: resultado_transacoes.data.transacoes })
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
                                                                <tr>
                                                                    <th>Tipo</th>
                                                                    <th>Cifras movimentadas</th>
                                                                    <th>Data de transação</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.transacoes.map((transacao, index) => {

                                                                        return (
                                                                            <tr key={index}>
                                                                                <td style={{ maxWidth: '100px' }}>{transacao.tipo}</td>

                                                                                <td>{transacao.quantia_transferida}</td>

                                                                                <td>{transacao.data_transferencia.substr(0, 10)}</td>

                                                                                <td>{transacao.status}</td>
                                                                            </tr>)
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
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