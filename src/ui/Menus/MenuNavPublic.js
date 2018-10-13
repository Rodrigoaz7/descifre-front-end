import React, { Component } from "react";
import { Link } from "react-router";
export default class MenuNavPublic extends Component{
    render(){
        return(
            <ul className="navbar-nav align-items-lg-center ml-lg-auto" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation" role="button">
                <li className="nav-item" >
                    <Link to='/' className="nav-link" >
                        <span className="nav-link-inner--text">Início</span>
                    
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/cadastro' className="nav-link">Cadastrar-se</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/login' className="nav-link">Entrar</Link>
                </li>
            </ul>
        );
    }
}