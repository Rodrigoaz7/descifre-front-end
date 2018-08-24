import React from 'react';
import { Link } from 'react-router';
const Slide = () => (
    <section className="section section-lg section-shaped overflow-hidden my-0">
        <div className="shape shape-style-1 shape-default shape-skew">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="container py-0 pb-lg">
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-5 mb-5 mb-lg-0">
                    <h1 className="text-white font-weight-light">Cadastre-se agora para ser um dos nossos beta testers</h1>
                    <p className="lead text-white mt-4">Participe de jogos incríveis e ganhe prêmios</p>
                    <Link to="/usuario/cadastro" className="btn btn-white mt-4">Torne-se membro</Link>
                </div>
                <div className="col-lg-6 mb-lg-auto">
                    <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                        <div id="carousel_example" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carousel_example" data-slide-to="0" className="active"></li>
                                <li data-target="#carousel_example" data-slide-to="1"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="img-fluid" src="./img/theme/img-1-1200x1000.jpg" alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="img-fluid" src="./img/theme/img-2-1200x1000.jpg" alt="Second slide" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carousel_example" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carousel_example" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
export default Slide;