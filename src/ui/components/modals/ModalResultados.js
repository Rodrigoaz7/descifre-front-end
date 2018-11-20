/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";

export default class ModalHelp extends Component {
    constructor(props) {
        super();
        this.state = {
            resultados: props.resultados
        }
    }
    render() {
        return (
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Suas respostas</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">
                                                    <center>
                                                        Resposta
                                                    </center>
                                                </th>
                                                <th scope="col">
                                                    <center>
                                                        Resultado
                                                    </center>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.resultados.map((resultado, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <th scope="row">{index+1}</th>
                                                            <td>
                                                                <center>
                                                                    {resultado.resposta ? resultado.resposta : "Você pulou esta questão"}
                                                                </center>
                                                            </td>
                                                            <td>
                                                                <center>
                                                                    {
                                                                        resultado.status &&
                                                                        <span>Certo</span>
                                                                    }
                                                                    {
                                                                        !resultado.status &&
                                                                        <span>Errado</span>
                                                                    }
                                                                </center>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                    </div>

                </div>
            </div>
        )
    }

}


