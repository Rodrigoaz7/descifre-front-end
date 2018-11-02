import React from 'react';
import { Link } from 'react-router';
const Apresentacao = () => (
    <section className="section-hero section-shaped my-0">
        <div className="shape shape-style-1 shape-primary">
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
        </div>
        <div className="container shape-container d-flex align-items-center">
            <div className="col px-0">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-7 text-center pt-lg">
                        <img alt="Logo principal" src="./img/brand/white.png" style={{width: "200px"}} className="img-fluid"/>
                        <p className="lead text-white mt-4 mb-5">Conecte-se ao De$cifre e ganhe créditos para iniciar sua trajetória rumo as cifras.</p>
                        <div className="btn-wrapper">
                            <Link to="/usuario/cadastro" className="btn btn-success btn-block btn-icon mb-3 mb-sm-0" data-toggle="scroll">
                                <span className="btn-inner--icon"><i className="ni ni-favourite-28"></i></span>
                                <span className="btn-inner--text">Junte-se a nós</span>
                            </Link>
                            <Link  to="/usuario/login" className="btn btn-white btn-block btn-icon mb-3 mb-sm-0">
                                <span className="btn-inner--icon"><i className="ni ni-controller"></i></span>
                                <span className="btn-inner--text">JOGAR AGORA</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-around stars-and-coded">
                    <br/><br/><br/>
                </div>
            </div>
        </div>
    </section>
);
export default Apresentacao;