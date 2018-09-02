/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';


export default class NovoPatrocinadorScreen extends Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        document.title = "Pesquisa de patrocinadores - Tela de administração de$cifre."
    }

   
    render() {
        const { selectedOption } = this.state;
    
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
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Nome do patrocinador" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-md form-control-alternative" placeholder="Email do patrocinador" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Tipo de patrocínio" />
                                                    </div>
                                                </div>
                                            </div>

                                            <Linha tamanho={10}/>
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
                                                                        <th>Tipo de patrocínio</th>
                                                                        <th>Quantia</th>
                                                                        <th>Dados</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ maxWidth: '100px' }}>Nordestão</td>
                                                                        <td>Rede alimentícia</td>
                                                                        <td>Rodada #33</td>
                                                                        <td>R$ 1.000,00</td>
                                                                        <td><center><button className="btn btn-primary" type="button">Ver</button></center></td>
                                                                    </tr>
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