/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';
import { browserHistory } from "react-router";
import providerAtualizarStatusTransacao from '../../../../providers/administrador/transacoes/atualizarStatusTransacao';
import utilToken from '../../../../util/localStorage/index';
import swal from 'sweetalert2';

export default class CifrasScreen extends Component {

    constructor() {
        super();
        this.state = {
            transacao: {},
            status: null,
            erros: []
        }
    }

    async componentDidMount() {
        const dados = this.props.location.state.data;
        console.log(dados)
        if (dados) {
            this.setState({
                data_transferencia: dados.data_transferencia,
                tipo: dados.tipo,
                quantia_transferida: dados.quantia_transferida,
                enviado_por: dados.enviado_por.email,
                recebido_por: dados.recebido_por.email,
                status: dados.status,
                _id: dados._id
            })
        } else {
            browserHistory.push({
                pathname: '/administrador/cifras',
            })
            window.location.reload()
        }

        document.title = "Cifras - Tela de administração de$cifre.";
    }

    selectHandle = async (e) => {
        this.setState({status: parseInt(e.target.value,10)})
    }

    handleSubmit = async () => {
        let token = utilToken.getToken();
        let data = {
            token: token,
            idTransacao: this.state._id,
            status: this.state.status
        }

        const response = await providerAtualizarStatusTransacao.atualizarStatusTransacao(data);

        if(!response.status){
            this.setState({ erros: response.erros });
        } else {
            swal(
                'Transação editada!',
                'O status da transação foi editado com sucesso.',
                'success'
            ).then(()=>{
                browserHistory.push('/administrador/cifras');
                window.location.reload();
            })
        }
    }

    handlerBack = () => {
        browserHistory.push({
            pathname: '/administrador/cifras',
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
                                            <h3 style={{ color: '#212121' }}>Transação </h3>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Saque</small></center>
                                                <center><input type="radio" id="Saque" name="tt" value="saque" checked={this.state.tipo === "saque"} readOnly /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Compra</small></center>
                                                <center><input type="radio" id="Compra" name="tt" value="compra" checked={this.state.tipo === "compra"} readOnly /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="text-uppercase font-weight-bold        mb-3">Transferência</small></center>
                                                <center><input type="radio" id="Transferencia" name="tt" value="transferencia" checked={this.state.tipo === "transferencia"} readOnly /></center>
                                            </div>
                                        </div>
                                        <Linha tamanho={10} />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Usuário enviatário</small></center>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-alternative" placeholder="Pesquisa por usuário" value={this.state.enviado_por} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Usuário receptário</small></center>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-alternative" placeholder="Pesquisa por usuário" value={this.state.recebido_por} readOnly />
                                                </div>
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
                                                        <input className="form-control datepicker" placeholder="Select date" type="datetime-local" value={this.state.data_transferencia} readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Quantia transferida</small></center>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input className="form-control datepicker" placeholder="Select date" type="text" value={this.state.quantia_transferida} readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Linha tamanho={10} />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Status</small></center>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <select className="form-control" onChange={this.selectHandle}>
                                                            <option value="0">Enviado e processando</option>
                                                            <option value="1">Aceito</option>
                                                            <option value="2">Recusado</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Linha tamanho={12} />
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-3">
                                                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}> Atualizar status </button>
                                            </div>
                                            <div className="col-lg-3">
                                                <button type="submit" className="btn btn-danger btn-block" onClick={this.handlerBack}> Voltar </button>
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