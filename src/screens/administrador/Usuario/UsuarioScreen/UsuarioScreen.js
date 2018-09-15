/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import providerListarUsuarios from '../../../../providers/administrador/usuarios/listarUsuarios';
import { browserHistory } from "react-router";

export default class VerQuestoesScreen extends Component {
    constructor(){
        super();
        this.state = {
            usuarios: [],
            filtro: ""
        }
    }
    async componentDidMount() {
        const responsePost = await providerListarUsuarios.getUsuarios(10, "");
        await this.setState({usuarios: responsePost.data.usuarios});
        
        document.title = "Usuarios - Tela de administração de$cifre.";
    }

    handlerFiltro = async(e) => {
        this.setState({filtro: e.target.value})
    }

    handleSubmit = async (e) => {
        const responsePost = await providerListarUsuarios.getUsuarios(10, this.state.filtro);
        await this.setState({usuarios: responsePost.data.usuarios});
    }

    redirect = async(e) => {
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
                                        <div className="col-lg-1 col-lg-10">
                                            <h3 style={{ color: '#212121' }}>Pesquisar usuários</h3>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8">
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-alternative" placeholder="Pesquisa por nome ou email" value={this.state.filtro} onChange={this.handlerFiltro}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-1">
                                                <div className="form-group">
                                                    <button className="btn btn-success btn-sm btn-block form-control form-control-alternative" type="button"onClick={this.handleSubmit}>
                                                        <i className="fa fa-search" arialhidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-lg-2 col-lg-8">
                                                <div className="form-group">
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="table-responsive">
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
                                                                    this.state.usuarios.map((usuario, index)=>{
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
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}