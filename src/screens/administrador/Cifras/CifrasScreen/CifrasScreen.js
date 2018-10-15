/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';
import providerCifras from '../../../../providers/administrador/transacoes/listarTransacoes';
import quantTransacoes from '../../../../providers/administrador/contadores/contadorTransacoes';
import { browserHistory } from "react-router";
import Erros from '../../../../ui/components/erros';
import statusCodes from '../../../../util/statusCodes';
import Pagination from "react-ultimate-pagination-bootstrap-4";

export default class CifrasScreen extends Component {

    constructor() {
        super();
        this.state = {
            transacoes: [],
            erros: [],
            radio: "",
            data: "",
            user: "",
            pagina: 1,
            total: 1
        }
    }

    async componentDidMount() {
        const response = await providerCifras.getTransacoes(this.state.pagina, "", "", "");
        let resultado_tamanho = await quantTransacoes.getNumeroDeTransacoes();
        let total = parseInt(resultado_tamanho.data.quantidade, 10);

        //Se houver menos de 20 usuarios, entao precisamos de apenas uma pagina
        if(total < 20) total = 1;
        else total = Math.ceil(total/20.0);

        this.setState({ transacoes: response.data.transacoes, total: total });
        document.title = "Cifras - Tela de administração de$cifre.";
    }

    handlePageChange = async (pageNumber) => {
        let resultado = [];
        await this.setState({ pagina: pageNumber });

        resultado = await providerCifras.getTransacoes(this.state.pagina, this.state.radio, this.state.data, this.state.user);
        await this.setState({ transacoes: resultado.data.transacoes})
    }

    handlerRadio = async (e) => {
        await this.setState({radio: e.target.value})
    }

    handlerData = async (e) => {
        await this.setState({data: e.target.value})
    }

    handlerUser = async (e) => {
        await this.setState({user: e.target.value})
    }

    handlerSubmit = async () => {
        const response = await providerCifras.getTransacoes(1, this.state.radio, this.state.data, this.state.user);
        await this.setState({transacoes: response.data.transacoes, pagina: 1})
    }

    handlerRedirect = async(e) => {
        const id_obj = e.target.id;
        let transacao = null;
        for (var i = 0; i < this.state.transacoes.length; i++) {
            if (String(this.state.transacoes[i]._id) === String(id_obj)) transacao = this.state.transacoes[i];
        }

        browserHistory.push({
            pathname: '/administrador/cifras/ver',
            state: { data: transacao }
        })
        window.location.reload()
    }

    render() {
        return (
            <div className="position-relative alt">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-dark">
                    </div>
                    <div className="container-fluid pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="col-lg-1 col-lg-10">
                                            <h3 style={{ color: '#212121' }}>Pesquisar transações</h3>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Premiação</small></center>
                                                <center><input type="radio" id="Premiacao" name="tt" value="premio" onClick={this.handlerRadio} /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Indicação</small></center>
                                                <center><input type="radio" id="Indicacao" name="tt" value="indicacao" onClick={this.handlerRadio} /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Saque</small></center>
                                                <center><input type="radio" id="Saque" name="tt" value="saque" onClick={this.handlerRadio} /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Compra</small></center>
                                                <center><input type="radio" id="Compra" name="tt" value="compra" onClick={this.handlerRadio} /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Transferência</small></center>
                                                <center><input type="radio" id="Transferencia" name="tt" value="transferencia" onClick={this.handlerRadio} /></center>
                                            </div>

                                        </div>
                                        <Linha tamanho={10} />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Data de transação</small></center>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                        </div>
                                                        <input className="form-control datepicker" placeholder="Select date" type="datetime-local" onChange={this.handlerData} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Pesquisa por usuário</small></center>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-alternative" placeholder="Pesquisa por usuário" onChange={this.handlerUser} />
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-2">
                                                <button className="btn btn-success btn-sm btn-block form-control form-control-alternative" onClick={this.handlerSubmit}><i className="fa fa-search" arialhidden="true"> Pesquisar</i></button>
                                            </div>
                                        </div>
                                        <Linha tamanho={12} />
                                        <center><h3>Resultados</h3></center>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="table-responsive">
                                                        <Erros erros={this.state.erros} />
                                                        <table className="table table-bordered">
                                                            <thead>

                                                                <tr>
                                                                    <th>Usuário Recepitário</th>
                                                                    <th>Tipo de transação</th>
                                                                    <th>Quantidade de cifras</th>
                                                                    <th>Data de transação</th>
                                                                    <th>Status</th>
                                                                    <th>Dados</th>
                                                                </tr>

                                                            </thead>
                                                            <tbody>
                                                                {this.state.transacoes.map((tr, index) =>
                                                                    <tr key={index}>
                                                                        <td>{tr.recebido_por===undefined? "":tr.recebido_por.email}</td>
                                                                        <td>{tr.tipo}</td>
                                                                        <td>C$ {tr.quantia_transferida}</td>
                                                                        <td>{tr.data_transferencia.substr(0, 10)}</td>
                                                                        <td>{statusCodes.getValue(`${tr.status}`)}</td>
                                                                        <td><center><button className="btn btn-primary" type="button" id={tr._id} onClick={this.handlerRedirect}>Ver</button></center></td>
                                                                    </tr>
                                                                )}
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
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}