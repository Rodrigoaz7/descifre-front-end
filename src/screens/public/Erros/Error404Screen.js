/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
export default class Error404Screen extends Component {
    
    componentDidMount() {
        document.title = "Error 404 - Página não encontrada."
    }

    render() {
        return (
            <div className="position-relative">
                <section  className="section section-shaped section-lg my-0 altura-max">
                    <div  className="shape shape-style-1 bg-gradient-default">
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
                    <div className="container pt-lg-md altura-mobile">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <center>
                                            <h1 style={{fontSize:'30vh', color: '#212121'}}>
                                                404
                                            </h1>
                                            <center>
                                                <h2 style={{color:'#212121'}}>
                                                    A Página que você está procurando não foi encontrada.
                                                </h2>
                                            </center>
                                            <center>
                                                <h6 style={{color:'#212121'}}>
                                                    Normalmente culpamos os estágiarios por esses problemas
                                                </h6>
                                            </center>
                                        </center>
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