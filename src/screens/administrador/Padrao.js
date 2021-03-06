
/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import MenuNavAdmin from '../../ui/Menus/MenuAdmin';
import Footer from '../../ui/Footer/Footer';
import { Link } from "react-router";
export default class Padrao extends Component{
    render(){
        return(
            <div>
                <header className="header-global">
                    <nav id="navbar-main" className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light">
                    <div className="container">
                        <Link to='/administrador/' className="navbar-brand mr-lg-5">
                            <img alt="nav-brand" src="/img/brand/white.png"/>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse" id="navbar_global">
                            <div className="navbar-collapse-header">
                                <div className="row">
                                <div className="col-6 collapse-brand">
                                    <Link to='/administrador/' className="navbar-brand mr-lg-5">
                                        <img alt="Nav" src="/img/brand/blue.png"/>
                                    </Link>
                                </div>
                                <div className="col-6 collapse-close">
                                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                    </button>
                                </div>
                                </div>
                            </div>
                            <MenuNavAdmin/>
                        </div>
                    </div>
                    </nav>
                </header>
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        );
    }
}