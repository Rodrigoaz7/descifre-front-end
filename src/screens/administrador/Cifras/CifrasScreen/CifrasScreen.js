/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';

export default class CifrasScreen extends Component {

    componentDidMount() {
        document.title = "Cifras - Tela de administração de$cifre.";
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
                                            <div className="col-lg-1">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Saque</small></center>
                                                <center><input type="radio" id="Saque" name="tt" value="Saque" /></center>
                                            </div>
                                            <div className="col-lg-1">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Compra</small></center>
                                                <center><input type="radio" id="Compra" name="tt" value="Compra" /></center>
                                            </div>
                                            
                                        </div>
                                        <Linha tamanho={10}/>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Data de transação</small></center>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                        </div>
                                                        <input className="form-control datepicker" placeholder="Select date" type="datetime-local" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Pesquisa por usuário</small></center>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-alternative" placeholder="Pesquisa por usuário" />
                                                </div>
                                            </div>
                                        </div>
                                        <Linha tamanho={12}/>
                                        <center><h3>Resultado</h3></center>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Usuário</th>
                                                                    <th>Tipo de transação</th>
                                                                    <th>Quantidade de cifras</th>
                                                                    <th>Data de transação</th>
                                                                    <th>Dados</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ maxWidth: '100px' }}>Fulano de tal</td>
                                                                    <td>Compra ou saque</td>
                                                                    <td>$ 50</td>
                                                                    <td>30/08/2018</td>
                                                                    <td><center><button className="btn btn-primary" type="button">Ver</button></center></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
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