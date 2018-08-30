/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";

export default class VerRodadaScreen extends Component {
    
    constructor() {
        super();
        this.state = {
            
        };
        this.numeroPremiados = null; // Variavel para ajudar na adição dos inputs.
        this.usuariosPremiados = []; // Array de usuários premiados.
    }

    componentDidMount() {
        document.title = "Adicionar nova rodada - Tela de administração de$cifre.";
        
    }

    render() {
    	/* 
		*	Autor: Rodrigo Azevedo	
    	*/
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
                                                <h3 style={{color: '#212121'}}>Pesquisar rodadas</h3>
                                            </div>
                                            <hr />
                                            
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                     <center><input type="text" className="form-control form-control-lg form-control-alternative"  placeholder="Titulo da rodada"/></center>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Fechado</small></center>
                                                                    <center><input type="radio" id="Fechado" name="fr" value="Fechado"/></center>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Aberto</small></center>
                                                                    <center><input type="radio" id="Aberto" name="fr" value="Aberto"/></center>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <small className="d-block text-uppercase font-weight-bold mb-3">Data de abertura da rodada</small>
                                                                    <div className="form-group">
                                                                        <div className="input-group">
                                                                            <div className="input-group-prepend">
                                                                            <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                                            </div>
                                                                            <input className="form-control datepicker" placeholder="Select date" type="datetime-local"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <small className="d-block text-uppercase font-weight-bold mb-3">Data de término da rodada</small>
                                                                    <div className="form-group">
                                                                        <div className="input-group">
                                                                            <div className="input-group-prepend">
                                                                            <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                                            </div>
                                                                            <input className="form-control datepicker" placeholder="Select date" type="datetime-local"/>
                                                                        </div>
                                                                    </div>
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
                                                                                        <th>Título</th>
                                                                                        <th>Estado</th>
                                                                                        <th>Duração</th>
                                                                                        <th>Premiação</th>
                                                                                        <th>Editar</th>
                                                                                        <th>Apagar</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style={{maxWidth:'100px'}}>Rodada xyxyaycgaydsgadhsakdhkj</td>
                                                                                        <td>Aberto</td>
                                                                                        <td>30 minutos</td>

                                                                                        <td>50 $</td>

                                                                                        <td><center><button className="btn btn-primary" type="button">editar</button></center></td>
                                                                                        <td><center><button className="btn btn-danger" type="button">apagar</button></center></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style={{maxWidth:'100px'}}>Rodada 2 koasdksoadko</td>
                                                                                        <td>Aberto</td>
                                                                                        <td>24 minutos</td>

                                                                                        <td>50 $</td>

                                                                                        <td><center><button className="btn btn-primary" type="button">editar</button></center></td>
                                                                                        <td><center><button className="btn btn-danger" type="button">apagar</button></center></td>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
                );
            }
}