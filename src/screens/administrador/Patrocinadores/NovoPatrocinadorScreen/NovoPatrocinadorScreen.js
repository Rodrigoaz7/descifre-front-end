/*
*   Autor: Marcus Dantas e Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';

export default class NovoPatrocinadorScreen extends Component {

    constructor() {
        super();
        this.state = {
            FileInputValue: ''
        };
    }

    componentDidMount() {
        document.title = "Adicionar novo patrocinador - Tela de administração de$cifre."
    }

    handleChange = (e) => {
        this.setState({ FileInputValue: e.target.files[0].name })
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
                                            <h3 style={{ color: '#212121' }}>Adicionar um novo patrocinador</h3>
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
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Tipo de patrocinador" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <div className="input-group">

                                                            <label className="input-group-btn">
                                                                <span className="btn btn-primary">
                                                                    Logo<input type="file" style={{ display: 'none' }} onChange={this.handleChange} />
                                                                </span>
                                                            </label>

                                                            <input type="text" className="form-control" value={this.state.FileInputValue} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Linha tamanho={10} />
                                            <center><h4>Dados extras</h4></center>
                                            <br />
                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Telefone de contato" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-md form-control-alternative" placeholder="Email de contato" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Tipo de patrocínio" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <input type="number" className="form-control form-control-md form-control-alternative" placeholder="Quantia paga" />
                                                    </div>
                                                </div>
                                            </div>
                                            <Linha tamanho={10} />
                                            <div className="row">
                                                <div className="offset-lg-1 col-lg-10">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-primary btn-block" type="submit">Cadastrar</button>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-danger btn-block" type="submit">Cancelar</button>
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
            </div >
        );
    }
}