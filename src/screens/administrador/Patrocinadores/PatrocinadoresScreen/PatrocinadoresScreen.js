/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';
import providerGetPatrocinadores from '../../../../providers/administrador/patrocinadores/listarPatrocinador';
import Erros from '../../../../ui/components/erros';
import swal from 'sweetalert2';
import { browserHistory } from "react-router";

export default class NovoPatrocinadorScreen extends Component {

    constructor() {
        super();
        this.state = {
            patrocinadores: [],
            erros: [],
            filtro: ""
        };
    }

    async componentDidMount() {
        document.title = "Pesquisa de patrocinadores - Tela de administração de$cifre."
        const resultado = await providerGetPatrocinadores.listarPatrocinadores("");
        console.log(resultado)
        this.setState({
            patrocinadores: resultado.data.patrocinadores
        });
    }

    handlerChange = (e) => {
        this.setState({filtro: e.target.value})
    }

    handlerSubmit = async(e) => {
        e.preventDefault();
        let resultado = await providerGetPatrocinadores.listarPatrocinadores(this.state.filtro);
        this.setState({
            patrocinadores: resultado.data.patrocinadores
        });
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
                                            <h3 style={{ color: '#212121' }}>Pesquisar por patrocinadores</h3>
                                        </div>
                                        <Linha tamanho={10} />
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-9 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Nome do patrocinador" onChange={this.handlerChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-1">
                                                    <div className="form-group">
                                                        <button className="btn btn-success btn-sm btn-block form-control form-control-alternative" onClick={this.handlerSubmit}><i className="fa fa-search" arialhidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <Linha tamanho={10} />
                                            <center><h3>Resultado</h3></center>
                                            <br />
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Nome</th>
                                                                        <th>Tipo de patrocinador</th>
                                                                        <th>Email</th>
                                                                        <th>Quantia paga</th>
                                                                        <th>Dados</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <Erros erros={this.state.erros} />

                                                                    {this.state.patrocinadores.map((p, index) =>
                                                                        <tr key={index}>
                                                                            <td style={{ maxWidth: '100px' }}>{p.nome}</td>
                                                                            <td>{p.tipo_patrocinador}</td>
                                                                            <td>{p.email}</td>
                                                                            <td>R$ {p.quantia_paga}</td>
                                                                            <td><center><button className="btn btn-primary" type="button">Ver</button></center></td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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