/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import { browserHistory } from "react-router/lib";
import providerBuscarRodadasEmQuiz from '../../../providers/usuario/quiz/buscarRodadasEmQuiz';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            quantidadeCifras: 0
        }
    }
    async componentDidMount() {
        document.title = "Compra de cifras - compre suas próprias cifras.";
    }

    handleCalculaCifras = async (e) => {
        let preco = e.target.value;
        if(preco === ""){
            this.setState({ quantidadeCifras: 0 });
        }else {
            //posso chamar alguma funcao do back para calcular a quantidade de cifras, p.e 10
            this.setState({ quantidadeCifras: parseInt(parseFloat(preco)*10) });
        }
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
                                                        Compre suas próprias cifras
                                                    </h4>
                                                </center>

                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-6">
                                                Escolha a plataforma de pagamento
                                                <select className="form-control">
                                                    <option>
                                                        Pagseguro
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                Valor da compra que você deseja pagar (em R$)
                                                <input type="text" className="form-control" onChange={this.handleCalculaCifras} />
                                                <br />
                                                {
                                                this.state.quantidadeCifras > 0 && 
                                                    (
                                                        <center><h6>Esta quantidade resultará em {this.state.quantidadeCifras} cifras ! </h6>
                                                        </center>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Continuar compra</button>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-danger btn-block">Cancelar</button>
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