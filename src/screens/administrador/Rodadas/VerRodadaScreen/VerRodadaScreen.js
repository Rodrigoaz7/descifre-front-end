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
                                                <h3 style={{color: '#212121'}}>Nova rodada</h3>
                                            </div>
                                            <hr />
                                            
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