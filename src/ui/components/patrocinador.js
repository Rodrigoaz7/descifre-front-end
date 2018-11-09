/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";

export default class Patrocinadores extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
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
                                        src={`/img/patrocinadores/${this.props.urlImagem}`} 
                                        alt="Família Picuí"
                                        />
                                    <hr/>
                                    <h3>Restaurante Família Picuí</h3>
                                </center>
                                <hr/>
                                <strong>Telefone: </strong>(84) 2030-1701<br/>
                                <strong>Localização: </strong>Av. Sen. Salgado Filho, - Lagoa Nova, Natal - RN, em frente ao Portugal Center
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
                                            src={`/img/patrocinadores/${this.props.urlImagem}`} 
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
        )
    }

}