/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";


export default class HomeScreen extends Component {
    constructor() {
        super();
        
    }
    componentDidMount() {
        document.title = "Home usuário - Bem vindo ao De$cifre.";
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
                                        {/*Conteúdo do site*/}
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