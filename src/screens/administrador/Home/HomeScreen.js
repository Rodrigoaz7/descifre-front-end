/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Infor from "./componentes/Info";
import Chart from "./componentes/Chart";
import providerListarUsuarios from '../../../providers/administrador/usuarios/listarUsuarios';
// import providerContadorHome from '../../../providers/administrador/contadores/contadorHome';
import { browserHistory } from "react-router";

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: []
        }
    }
    async componentDidMount() {
        document.title = "Administrador - Tela de administração de$cifre.";

        const responsePost = await providerListarUsuarios.getUsuarios(5, "");
        console.log(responsePost)
        if(responsePost.data.status) await this.setState({ usuarios: responsePost.data.usuarios });

    }

    redirect = async (e) => {
        const id_obj = e.target.id;
        let user = null;

        for(var i=0; i<this.state.usuarios.length; i++){
            if(String(this.state.usuarios[i]._id) === String(id_obj)) user = this.state.usuarios[i];
        }

        browserHistory.push({
            pathname: '/administrador/usuario/ver',
            state: { data: user }
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
                                            <Infor/>
                                        <hr />
                                        <div className="row">
                                            <div className="offset-lg-1 col-lg-10">
                                                <Chart />
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
                                                <br /><br />
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Nome</th>
                                                            <th>Email</th>
                                                            <th>Dados</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.usuarios.map((usuario, index) => {
                                                                return (<tr key={index}>
                                                                    <td style={{ maxWidth: '100px' }}>{usuario.pessoa.nome}</td>
                                                                    <td>{usuario.pessoa.email}</td>
                                                                    <td><center><button className="btn btn-primary" type="button" id={usuario._id} onClick={this.redirect}>Ver</button></center></td>
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
                </section>
            </div>
        );
    }
}