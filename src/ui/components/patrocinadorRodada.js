/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";
import axios from 'axios';
import variables from '../../variables';
import utilLocalStorage from '../../util/localStorage';
export default class Patrocinadores extends Component {
    constructor(props) {
        super();
        this.state = {
            idRodada: props.idRodada,
            urlImg:'',
            showImg: false,
            patrocinador:''
        }
    }
    async componentDidMount(){
        //let urlApi;
        
        const requestPatrocinador = await axios.get(`${variables.urlApi}/usuario/patrocinador/${this.props.idRodada}/${utilLocalStorage.getToken()}`);
        
        // if(variables.host==='http://localhost:8080'){
        //     urlApi = `${variables.host}${variables.urlApi}/usuario/patrocinadores/${this.props.idRodada}/${utilLocalStorage.getToken()}`;
        // }else{
        //     urlApi = `${variables.urlApi}/usuario/patrocinadores/${this.props.idRodada}/${utilLocalStorage.getToken()}`;
        // }
        
        await this.setState({
            urlImg:requestPatrocinador.data.patrocinador.urlExterna,
            showImg: true,
            patrocinador: requestPatrocinador.data.patrocinador
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.showImg &&
                    <div>
                        
                        <div className="modal" id="myModal">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h4 className="modal-title">Informações do patrocinador</h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div className="modal-body">
                                        <center>
                                            <img className="img-fluid"
                                                src={this.state.urlImg} 
                                                alt="Família Picuí"
                                                />
                                            <hr/>
                                            <h3>{this.state.patrocinador.nome}</h3>
                                        </center>
                                        <hr/>
                                        <strong>Telefone: </strong>{this.state.patrocinador.telefone}<br/>
                                        <strong>Localização: </strong>{this.state.patrocinador.localizacao}
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="card bg-secondary shadow border-0">
                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <center>
                                            <button type="button" className="btn " data-toggle="modal" data-target="#myModal">
                                                <img className="img-fluid"
                                                    src={this.state.urlImg} 
                                                    alt="Família Picuí"
                                                    />
                                            </button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        
                    </div>
                }
            </div>
        )
    }

}