/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";


export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    componentDidMount() {
        document.title = "Home usuário - Bem vindo ao De$cifre.";
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
                                                        {"Rodada de abertura".toUpperCase()}
                                                    </h4>
                                                </center>
                                                <center>
                                                    Abertura: 12/06 às 15:00<br/>
                                                    Finalização: 15/06 às 15:00
                                                </center>
                                                <hr/>
                                                <center>
                                                    <h4 style={{color:'green'}}>
                                                        {"500 cifras".toUpperCase()}
                                                    </h4>
                                                </center>
                                                <hr/>
                                                <button type="button" className="btn btn-success btn-block">
                                                    Jogar agora<br/>
                                                    (GRÁTIS)
                                                </button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}