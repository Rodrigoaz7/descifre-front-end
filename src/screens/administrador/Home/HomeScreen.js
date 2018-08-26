/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Infor from "./componentes/Info";
import Chart from "./componentes/Chart";
export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        document.title = "Administrador - Tela de administração de$cifre."
    }

    render() {
        return (
            <div className="position-relative alt">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-default">
                    </div>
                    <div className="container-fluid pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <Infor />
                                        <hr />
                                        <div className="row">
                                            <div className="offset-lg-1 col-lg-10">
                                                <Chart props={"kkkkk"} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h4>Últimos usuários cadastrados</h4>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <br/><br/>
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Nome</th>
                                                            <th scope="col">E-mail</th>
                                                            <th scope="col">Telefone</th>
                                                            <th scope="col">Data cadastro</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>Mark</td>
                                                            <td>Otto</td>
                                                            <td>@mdo</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">2</th>
                                                            <td>Jacob</td>
                                                            <td>Thornton</td>
                                                            <td>@fat</td>
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
                </section>
            </div>
        );
    }
}